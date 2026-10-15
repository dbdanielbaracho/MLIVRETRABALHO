// CI-only failure injection. No production database, migration, delivery provider or retry policy.
const assert = require('node:assert/strict');
const {randomUUID} = require('node:crypto');
const {createRequire} = require('node:module');
const path = require('node:path');
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validateFixtureEnvironment(env) {
  assert.ok(['true', '1'].includes(env.CI), 'CI fixture required');
  const database = new URL(env.DATABASE_URL || 'invalid:');
  const base = new URL(env.BASE_URL || 'http://127.0.0.1:3000');
  assert.ok(['postgres:', 'postgresql:'].includes(database.protocol), 'PostgreSQL required');
  assert.ok(['localhost', '127.0.0.1'].includes(database.hostname) && database.port, 'explicit local PostgreSQL port required');
  assert.equal(database.pathname, '/mlivretrabalho_http', 'disposable HTTP CI database required');
  assert.equal(database.search, '', 'database connection overrides forbidden');
  assert.equal(database.hash, '', 'database fragment forbidden');
  assert.equal(base.protocol, 'http:', 'local HTTP required');
  assert.ok(['localhost', '127.0.0.1'].includes(base.hostname) && base.port, 'explicit local HTTP port required');
  assert.ok(!base.username && !base.password && base.pathname === '/' && !base.search && !base.hash, 'plain local API origin required');
  return {database, base};
}

function failureDDL(suffix, tenant, recipient, type) {
  assert.match(suffix, /^[a-f0-9]{24}$/);
  assert.match(tenant, uuid); assert.match(recipient, uuid);
  assert.ok(['assignment_confirmed', 'new_message', 'replacement_confirmed'].includes(type));
  const name = 'ci_notify_' + suffix;
  // nextval is deliberately non-transactional: it witnesses that THIS HTTP call reached
  // the guarded AFTER INSERT hook, even though all application rows must roll back.
  // SECURITY DEFINER is limited to this fixture sequence; no existing grants are changed.
  const create = `CREATE SEQUENCE public.${name}_seq CACHE 1;
CREATE FUNCTION public.${name}_fn() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $fixture$
BEGIN
 IF current_setting('role') <> 'app_runtime' OR current_setting('app.tenant_id',true) IS DISTINCT FROM '${tenant}' THEN
  RAISE EXCEPTION 'ci_notification_wrong_runtime_context';
 END IF;
 PERFORM pg_catalog.nextval('public.${name}_seq'::pg_catalog.regclass);
 RAISE EXCEPTION USING ERRCODE='P0001', MESSAGE='ci_notification_insert_failure';
END $fixture$;
REVOKE ALL ON FUNCTION public.${name}_fn() FROM PUBLIC;
CREATE TRIGGER ${name}_trigger AFTER INSERT ON public.notifications FOR EACH ROW
 WHEN (NEW.tenant_id='${tenant}'::uuid AND NEW.identity_id='${recipient}'::uuid AND NEW.type='${type}')
 EXECUTE FUNCTION public.${name}_fn();`;
  const drop = `DROP TRIGGER ${name}_trigger ON public.notifications;
DROP FUNCTION public.${name}_fn(); DROP SEQUENCE public.${name}_seq;`;
  return {name, create, drop};
}

async function main(env = process.env) {
  const {database, base} = validateFixtureEnvironment(env); // BEFORE loading pg or connecting.
  const {Client} = createRequire(path.resolve(__dirname, '../apps/api/package.json'))('pg');
  const db = new Client({connectionString: database.toString()});
  let installed;
  const request = async (method, route, actor, tenant, body, expected = method === 'POST' ? 201 : 200) => {
    const response = await fetch(new URL(route, base), {
      method, redirect: 'error', signal: AbortSignal.timeout(15000),
      headers: {...(actor ? {authorization: 'Bearer ' + actor.token} : {}), ...(tenant ? {'x-tenant-id': tenant} : {}), ...(body === undefined ? {} : {'content-type': 'application/json'})},
      ...(body === undefined ? {} : {body: JSON.stringify(body)})
    });
    const value = await response.json();
    assert.equal(response.status, expected, method + ' ' + route + ' status');
    return value;
  };
  const rows = async (sql, values = []) => (await db.query(sql, values)).rows;
  const transaction = async work => {
    await db.query('BEGIN');
    try { const result = await work(); await db.query('COMMIT'); return result; }
    catch (error) { await db.query('ROLLBACK'); throw error; }
  };
  const schema = async () => ({
    tables: await rows(`SELECT c.relname,c.relrowsecurity,c.relforcerowsecurity,c.relacl::text
      FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
      WHERE n.nspname='public' AND c.relkind='r' ORDER BY c.relname`),
    policies: await rows('SELECT * FROM pg_policies WHERE schemaname=\'public\' ORDER BY tablename,policyname'),
    roles: await rows("SELECT rolname,rolsuper,rolbypassrls,rolcreaterole,rolcreatedb FROM pg_roles WHERE rolname='app_runtime'")
  });
  const tableNames = ['tenant_memberships', 'company_jobs', 'work_assignments', 'conversations', 'conversation_messages', 'replacement_requests', 'notifications', 'marketplace_jobs'];
  const snapshot = async tenant => {
    const result = {};
    for (const table of tableNames) result[table] = await rows(`SELECT to_jsonb(x) AS row FROM public.${table} x WHERE tenant_id=$1 ORDER BY to_jsonb(x)::text`, [tenant]);
    result.interests = await rows('SELECT to_jsonb(mi) AS row FROM marketplace_interests mi JOIN company_jobs j ON j.id=mi.job_id WHERE j.tenant_id=$1 ORDER BY mi.id', [tenant]);
    return result;
  };
  const signups = [];
  async function account(label, accountType) {
    const email = 'notify-atomic-' + label + '-' + randomUUID() + '@example.test';
    const password = 'AtomicFixture123!';
    const signup = await request('POST', '/v1/auth/signup', null, null, {email, password, accountType, ...(accountType === 'company' ? {workspaceName: 'Atomic fixture ' + label} : {})});
    const signin = await request('POST', '/v1/auth/signin', null, null, {email, password});
    assert.match(signup.id, uuid); assert.ok(signin.accessToken); assert.equal(signin.identity.id, signup.id);
    const actor = {id: signup.id, token: signin.accessToken, tenant: signup.tenantId};
    signups.push(actor);
    if (accountType === 'professional') {
      const profile = await request('PUT', '/v1/professional-profile', actor, null, {displayName: 'Atomic fixture ' + label, primaryRole: 'Bartender', homeCity: 'São Paulo'});
      assert.match(profile.id, uuid); actor.professional = profile.id;
    } else assert.match(actor.tenant, uuid);
    return actor;
  }
  async function job(company, label, day) {
    const startsAt = new Date(Date.now() + day * 86400000).toISOString();
    const endsAt = new Date(Date.parse(startsAt) + 3600000).toISOString();
    const value = await request('POST', '/v1/company/jobs', company, company.tenant, {title: 'Atomic fixture ' + label, requiredRole: 'Bartender', workCity: 'São Paulo', startsAt, endsAt, payCents: 12345});
    assert.match(value.id, uuid); return value;
  }
  const confirm = (company, j, pro, status = 201) => request('POST', '/v1/company/jobs/' + j.id + '/confirm', company, company.tenant, {professionalId: pro.professional}, status);
  async function failAndProve(label, company, recipient, type, operation, other) {
    const before = await snapshot(company.tenant), foreign = await snapshot(other.tenant);
    const hook = failureDDL(randomUUID().replaceAll('-', '').slice(0, 24), company.tenant, recipient.id, type);
    await transaction(() => db.query(hook.create));
    installed = hook;
    const sequence = await rows(`SELECT last_value::text,is_called FROM public.${installed.name}_seq`);
    assert.equal(sequence[0].is_called, false);
    await operation(); // A single deliberate failure-injection HTTP call, not an application retry.
    const attempt = (await rows(`SELECT last_value::text,is_called FROM public.${installed.name}_seq`))[0];
    assert.deepEqual(attempt, {last_value: '1', is_called: true}, 'exactly one targeted notification insert reached app_runtime/tenant hook');
    assert.deepEqual(await snapshot(company.tenant), before, label + ' must roll back ALL fixture tenant rows');
    assert.deepEqual(await snapshot(other.tenant), foreign, label + ' must preserve the other tenant');
    await transaction(() => db.query(installed.drop));
    const name = installed.name; installed = undefined;
    assert.equal((await rows('SELECT 1 FROM pg_trigger WHERE tgname=$1', [name + '_trigger'])).length, 0);
    assert.equal((await rows('SELECT 1 FROM pg_proc WHERE proname=$1', [name + '_fn'])).length, 0);
    assert.equal((await rows('SELECT 1 FROM pg_class WHERE relname=$1', [name + '_seq'])).length, 0);
    console.log('NOTIFICATION_ATOMICITY_ROLLBACK_PASS ' + JSON.stringify({flow: label, http: 500, targetedInsertAttempts: 1, runtime: 'app_runtime', tenantRowsUnchanged: true, otherTenantUnchanged: true, hookRemoved: true}));
  }
  await db.connect();
  try {
    const databaseIdentity = (await rows('SELECT current_database() AS name,inet_server_addr()::text AS address,inet_server_port() AS port'))[0];
    assert.equal(databaseIdentity.name, 'mlivretrabalho_http');
    // The client endpoint is loopback. In CI Docker port forwarding, inet_server_addr()
    // can legitimately be the ephemeral container IP, not 127.0.0.1. Never rewrite the URL.
    assert.ok(databaseIdentity.address && databaseIdentity.port, 'actual PostgreSQL server identity required');
    const originalSchema = await schema();
    assert.deepEqual(originalSchema.roles, [{rolname: 'app_runtime', rolsuper: false, rolbypassrls: false, rolcreaterole: false, rolcreatedb: false}]);
    const company = await account('company', 'company'), other = await account('other', 'company');
    const pro = await account('original', 'professional'), candidate = await account('candidate', 'professional');
    const target = await job(company, 'target', 12), foreignJob = await job(other, 'foreign-control', 13);
    // Bind HTTP and SQL to the same disposable database BEFORE installing any hook.
    assert.equal((await rows('SELECT 1 FROM company_jobs WHERE id=$1 AND tenant_id=$2', [target.id, company.tenant])).length, 1);
    assert.equal((await rows('SELECT 1 FROM company_jobs WHERE id=$1 AND tenant_id=$2', [foreignJob.id, other.tenant])).length, 1);
    await transaction(async () => {
      await db.query('SET LOCAL ROLE app_runtime');
      await db.query("SELECT set_config('app.tenant_id',$1,true)", [company.tenant]);
      assert.equal((await rows('SELECT 1 FROM company_jobs WHERE id=$1', [target.id])).length, 1);
      assert.equal((await rows('SELECT 1 FROM company_jobs WHERE id=$1', [foreignJob.id])).length, 0);
    });
    await request('POST', '/v1/jobs/' + target.id + '/interest', pro, null, {});
    assert.equal((await rows('SELECT 1 FROM tenant_memberships WHERE tenant_id=$1 AND identity_id=$2', [company.tenant, pro.id])).length, 0);
    assert.equal((await rows('SELECT status FROM marketplace_interests WHERE job_id=$1 AND professional_id=$2', [target.id, pro.professional]))[0].status, 'interested');
    await failAndProve('company-confirm', company, pro, 'assignment_confirmed', () => confirm(company, target, pro, 500), other);
    const assignment = await confirm(company, target, pro); // Explicit positive control after rollback and hook removal.
    assert.equal(assignment.status, 'confirmed'); assert.match(assignment.id, uuid);
    assert.deepEqual(await rows('SELECT id,status FROM work_assignments WHERE tenant_id=$1 AND job_id=$2 AND professional_id=$3', [company.tenant, target.id, pro.professional]), [{id: assignment.id, status: 'confirmed'}]);
    assert.equal((await rows('SELECT status FROM marketplace_interests WHERE job_id=$1 AND professional_id=$2', [target.id, pro.professional]))[0].status, 'confirmed');
    assert.equal((await rows('SELECT 1 FROM tenant_memberships WHERE tenant_id=$1 AND identity_id=$2', [company.tenant, pro.id])).length, 1);
    const confirmationState = await snapshot(company.tenant);
    assert.deepEqual(await confirm(company, target, pro), assignment, 'existing confirmation replay contract');
    assert.deepEqual(await snapshot(company.tenant), confirmationState, 'confirmation replay adds no notification or membership');
    const countNotifications = async type => (await rows('SELECT count(*)::int AS n FROM notifications WHERE tenant_id=$1 AND type=$2', [company.tenant, type]))[0].n;
    assert.equal(await countNotifications('assignment_confirmed'), 1);
    console.log('NOTIFICATION_ATOMICITY_POSITIVE_PASS company-confirm real ACK, one assignment/membership/notification, exact replay');

    const send = (body, status = 201) => request('POST', '/v1/conversations/' + assignment.id + '/messages', company, company.tenant, {body}, status);
    assert.equal((await rows('SELECT 1 FROM conversations WHERE tenant_id=$1', [company.tenant])).length, 0);
    await failAndProve('chat-new-conversation', company, pro, 'new_message', () => send('Injected failure, not delivered', 500), other);
    const message = await send('Committed fixture message');
    assert.match(message.id, uuid); assert.equal(message.body, 'Committed fixture message');
    assert.ok(Number.isFinite(Date.parse(message.createdAt)));
    const visible = await request('GET', '/v1/conversations/' + assignment.id + '/messages', pro, company.tenant);
    assert.deepEqual(visible.map(x => x.id), [message.id]);
    assert.equal((await rows('SELECT 1 FROM conversations WHERE tenant_id=$1 AND assignment_id=$2', [company.tenant, assignment.id])).length, 1);
    assert.equal(await countNotifications('new_message'), 1);
    // Existing-conversation UPSERT and message writes must also roll back, without removing prior history.
    await failAndProve('chat-existing-conversation', company, pro, 'new_message', () => send('Second injected failure, not delivered', 500), other);
    assert.deepEqual(await request('GET', '/v1/conversations/' + assignment.id + '/messages', pro, company.tenant), visible);
    console.log('NOTIFICATION_ATOMICITY_POSITIVE_PASS chat real message ACK/read, one conversation/message/notification, prior history retained');

    const seed = await job(company, 'candidate-membership', 14);
    await request('POST', '/v1/jobs/' + seed.id + '/interest', candidate, null, {});
    await confirm(company, seed, candidate);
    await request('POST', '/v1/availability/mine', candidate, null, {startsAt: new Date(Date.now() + 11 * 86400000).toISOString(), endsAt: new Date(Date.now() + 15 * 86400000).toISOString()});
    await request('POST', '/v1/company/talent-pools', company, company.tenant, {professionalId: candidate.professional, pool: 'preferred'});
    const replacement = await request('POST', '/v1/company/replacements/' + assignment.id, company, company.tenant, {reason: 'Atomicity fixture'});
    assert.equal(replacement.status, 'open'); assert.match(replacement.id, uuid);
    const select = status => request('POST', '/v1/company/replacements/' + replacement.id + '/select', company, company.tenant, {professionalId: candidate.professional}, status);
    await failAndProve('replacement-select', company, candidate, 'replacement_confirmed', () => select(500), other);
    const matched = await select(201);
    assert.equal(matched.status, 'matched'); assert.equal(matched.replacedAssignmentId, assignment.id);
    assert.equal(matched.replacementRequestId, replacement.id); assert.equal(matched.professionalId, candidate.professional); assert.match(matched.assignmentId, uuid);
    assert.equal((await rows('SELECT status FROM work_assignments WHERE id=$1 AND tenant_id=$2', [assignment.id, company.tenant]))[0].status, 'cancelled');
    assert.equal((await rows('SELECT status FROM work_assignments WHERE id=$1 AND tenant_id=$2', [matched.assignmentId, company.tenant]))[0].status, 'confirmed');
    const storedReplacement = (await rows('SELECT status,replacement_professional_id,resolved_at FROM replacement_requests WHERE id=$1 AND tenant_id=$2', [replacement.id, company.tenant]))[0];
    assert.equal(storedReplacement.status, 'matched'); assert.equal(storedReplacement.replacement_professional_id, candidate.professional); assert.ok(storedReplacement.resolved_at);
    assert.equal(await countNotifications('replacement_confirmed'), 1);
    const inbox = await request('GET', '/v1/notifications/mine', candidate, company.tenant);
    assert.equal(inbox.filter(n => n.type === 'replacement_confirmed').length, 1);
    console.log('NOTIFICATION_ATOMICITY_POSITIVE_PASS replacement real matched ACK, original cancelled, new confirmed, request resolved, one notification');
    assert.deepEqual(await schema(), originalSchema, 'table RLS/policies/grants/runtime privileges unchanged');
    for (const actor of signups) await request('POST', '/v1/auth/signout', actor, null, {});
    console.log('NOTIFICATION_ATOMICITY_PASS four injected HTTP500 rollbacks plus three positive flows; no delivery/provider/outbox claim');
  } finally {
    try { if (installed) await transaction(() => db.query(installed.drop)); }
    finally { await db.end(); }
  }
}

module.exports = {validateFixtureEnvironment, failureDDL};
if (require.main === module) main().catch(error => {
  // Never dump request objects, connection strings, tokens or passwords.
  console.error('NOTIFICATION_ATOMICITY_FAIL ' + error.name + ': ' + error.message);
  process.exitCode = 1;
});
