'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { isAdminRole, isCompanyRole, localDateTimeToIso, reaisToCents, tenantHeaders } from './web-contract';

type Membership={tenantId:string;role:string;displayName?:string;slug?:string};
type Session={accessToken:string;identity:{id:string;email:string};memberships:Membership[]};
type Dashboard={openJobs:number;confirmedWorkers:number;activeWorkers:number;completedAssignments:number};
type Analytics={jobsCreated:number;openJobs:number;jobsWithInterest:number;jobsWithConfirmation:number;completedAssignments:number;cancelledAssignments:number;interestToConfirmationRate:number|null;assignmentCompletionRate:number|null};
type Job={id:string;title:string;status:string;location?:string|null;workCity?:string|null;startsAt?:string|null;endsAt?:string|null;payCents?:number|null};
type Assignment={id:string;status:string;professionalId:string;professionalName:string;title:string;location?:string|null;startsAt?:string|null;endsAt?:string|null;replacementOpen?:boolean};
type CompletedAssignment={id:string;professionalId:string;professionalName:string;title:string;location?:string|null;completedAt?:string|null;ratingScore?:number|null;ratingComment?:string|null};
type PlannerRow={id:string;title:string;jobStatus:string;workCity?:string|null;startsAt?:string|null;interestCount:number;confirmedCount:number;activeCount:number;completedCount:number;cancelledCount:number};
type Team={id:string;name?:string;displayName?:string;memberCount?:number};
type TeamMember={professionalId:string;displayName:string;primaryRole?:string|null;homeCity?:string|null};
type Replacement={id:string;status:string;assignmentId?:string;reason?:string|null;createdAt?:string};
type ReplacementCandidate={professionalId:string;displayName:string;score:number;reasons?:string[]};
type TalentPool={pool:string;professionalId?:string;professionalName?:string};
type PaymentEvent={assignmentId:string;title:string;professionalName:string;payableCents:number|null;earningStatus:string|null;capturedCents:number;refundedCents:number;paidOutCents:number;reconciliationStatus:string};
type SafetyCase={id:string;status:string;createdAt?:string;category?:string};
type SafetyAppeal={id:string;safetyCaseId:string;status:string;createdAt?:string};
const API=(process.env.NEXT_PUBLIC_API_BASE_URL||'https://mlivretrabalho.predibeacon.com').replace(/\/$/,'');

async function remove(path:string,session:Session,tenantId:string):Promise<void>{
  const r=await fetch(`${API}${path}`,{method:'DELETE',headers:tenantHeaders(session.accessToken,tenantId)});
  if(!r.ok)throw new Error(`HTTP ${r.status}`);
}

async function mutate<T>(path:string,session:Session,tenantId:string,body:unknown):Promise<T>{
  const r=await fetch(`${API}${path}`,{method:'POST',headers:{...tenantHeaders(session.accessToken,tenantId),'content-type':'application/json'},body:JSON.stringify(body)});
  if(!r.ok)throw new Error(`HTTP ${r.status}`);
  return r.json() as Promise<T>;
}

async function api<T>(path:string,session:Session,tenantId?:string):Promise<T>{
  const headers=tenantHeaders(session.accessToken,tenantId);
  const r=await fetch(`${API}${path}`,{headers,cache:'no-store'});
  if(!r.ok)throw new Error(`HTTP ${r.status}`);
  return r.json() as Promise<T>;
}

export default function Home(){
  const [session,setSession]=useState<Session|null>(null);
  const [tenantId,setTenantId]=useState('');
  const [dashboard,setDashboard]=useState<Dashboard|null>(null);
  const [analytics,setAnalytics]=useState<Analytics|null>(null);
  const [planner,setPlanner]=useState<PlannerRow[]>([]);
  const [jobs,setJobs]=useState<Job[]>([]);
  const [assignments,setAssignments]=useState<Assignment[]>([]);
  const [completed,setCompleted]=useState<CompletedAssignment[]>([]);
  const [teams,setTeams]=useState<Team[]>([]);
  const [selectedTeamId,setSelectedTeamId]=useState('');
  const [teamMembers,setTeamMembers]=useState<TeamMember[]>([]);
  const [replacements,setReplacements]=useState<Replacement[]>([]);
  const [selectedReplacementId,setSelectedReplacementId]=useState('');
  const [replacementCandidates,setReplacementCandidates]=useState<ReplacementCandidate[]>([]);
  const [talentPools,setTalentPools]=useState<TalentPool[]>([]);
  const [payments,setPayments]=useState<PaymentEvent[]>([]);
  const [safetyCases,setSafetyCases]=useState<SafetyCase[]>([]);
  const [safetyAppeals,setSafetyAppeals]=useState<SafetyAppeal[]>([]);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const [revision,setRevision]=useState(0);

  useEffect(()=>{const raw=sessionStorage.getItem('mlivre:web:session');if(raw){try{const s=JSON.parse(raw) as Session;setSession(s);setTenantId(s.memberships[0]?.tenantId||'');}catch{sessionStorage.removeItem('mlivre:web:session');}}},[]);
  const membership=useMemo(()=>session?.memberships.find(m=>m.tenantId===tenantId),[session,tenantId]);

  useEffect(()=>{
    if(!session||!tenantId){setDashboard(null);setAnalytics(null);setPlanner([]);setJobs([]);setAssignments([]);setCompleted([]);setTeams([]);setReplacements([]);setTalentPools([]);setPayments([]);setSafetyCases([]);setSafetyAppeals([]);return;}
    setLoading(true);setError('');
    const admin=isAdminRole(membership?.role);
    Promise.all([
      api<Dashboard>('/v1/company/dashboard',session,tenantId),
      api<Analytics>('/v1/company/analytics',session,tenantId),
      api<PlannerRow[]>('/v1/company/planner',session,tenantId),
      api<Job[]>('/v1/company/jobs',session,tenantId),
      api<Assignment[]>('/v1/company/dashboard/assignments',session,tenantId),
      api<CompletedAssignment[]>('/v1/company/dashboard/completed',session,tenantId),
      api<Team[]>('/v1/company/teams',session,tenantId),
      api<Replacement[]>('/v1/company/replacements',session,tenantId),
      api<TalentPool[]>('/v1/company/talent-pools',session,tenantId),
      admin?api<PaymentEvent[]>('/v1/company/payment-events/reconciliation',session,tenantId):Promise.resolve([]),
      admin?api<SafetyCase[]>('/v1/company/safety-cases',session,tenantId):Promise.resolve([]),
      admin?api<SafetyAppeal[]>('/v1/company/safety-appeals',session,tenantId):Promise.resolve([])
    ]).then(([d,a,p,j,wa,done,t,r,tp,pe,sc,sa])=>{setDashboard(d);setAnalytics(a);setPlanner(p);setJobs(j);setAssignments(wa);setCompleted(done);setTeams(t);setReplacements(r);setTalentPools(tp);setPayments(pe);setSafetyCases(sc);setSafetyAppeals(sa);}).catch(e=>setError(e instanceof Error?e.message:'Falha ao carregar operação')).finally(()=>setLoading(false));
  },[session,tenantId,membership?.role,revision]);

  useEffect(()=>{
    if(!session||!tenantId||!selectedTeamId){setTeamMembers([]);return;}
    api<TeamMember[]>(`/v1/company/teams/${selectedTeamId}/members`,session,tenantId).then(setTeamMembers).catch(e=>setError(e instanceof Error?e.message:'Falha ao carregar membros'));
  },[session,tenantId,selectedTeamId,revision]);

  async function signin(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setLoading(true);setError('');
    const fd=new FormData(e.currentTarget);
    try{
      const r=await fetch(`${API}/v1/auth/signin`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:fd.get('email'),password:fd.get('password')})});
      if(!r.ok)throw new Error(r.status===429?'Muitas tentativas. Tente novamente mais tarde.':'E-mail ou senha inválidos.');
      const s=await r.json() as Session;
      const companyMemberships=s.memberships.filter(m=>isCompanyRole(m.role));
      if(!companyMemberships.length)throw new Error('Esta conta não possui acesso empresarial.');
      const normalized={...s,memberships:companyMemberships};
      sessionStorage.setItem('mlivre:web:session',JSON.stringify(normalized));
      setSession(normalized);setTenantId(companyMemberships[0].tenantId);
    }catch(e){setError(e instanceof Error?e.message:'Falha no login');}finally{setLoading(false);}
  }

  async function createJob(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!session||!tenantId)return;setLoading(true);setError('');
    const fd=new FormData(e.currentTarget);
    try{
      await mutate('/v1/company/jobs',session,tenantId,{title:fd.get('title'),requiredRole:fd.get('requiredRole'),location:fd.get('location'),workCity:fd.get('workCity'),startsAt:localDateTimeToIso(fd.get('startsAt')),endsAt:localDateTimeToIso(fd.get('endsAt')),payCents:reaisToCents(fd.get('payReais'))});
      e.currentTarget.reset();setRevision(x=>x+1);
    }catch(err){setError(err instanceof Error?err.message:'Falha ao criar vaga');}finally{setLoading(false);}
  }

  async function createTeam(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!session||!tenantId)return;setLoading(true);setError('');
    const fd=new FormData(e.currentTarget);
    try{await mutate('/v1/company/teams',session,tenantId,{name:fd.get('name')});e.currentTarget.reset();setRevision(x=>x+1);}
    catch(err){setError(err instanceof Error?err.message:'Falha ao criar equipe');}finally{setLoading(false);}
  }

  async function addTeamMember(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!session||!tenantId||!selectedTeamId)return;const fd=new FormData(e.currentTarget);const professionalId=String(fd.get('professionalId')||'');if(!professionalId)return;
    setLoading(true);setError('');try{await mutate(`/v1/company/teams/${selectedTeamId}/members`,session,tenantId,{professionalId});setRevision(x=>x+1);}catch(err){setError(err instanceof Error?err.message:'Falha ao adicionar membro');}finally{setLoading(false);}
  }

  async function removeTeamMember(professionalId:string){
    if(!session||!tenantId||!selectedTeamId)return;setLoading(true);setError('');try{await remove(`/v1/company/teams/${selectedTeamId}/members/${encodeURIComponent(professionalId)}`,session,tenantId);setRevision(x=>x+1);}catch(err){setError(err instanceof Error?err.message:'Falha ao remover membro');}finally{setLoading(false);}
  }

  useEffect(()=>{
    if(!session||!tenantId||!selectedReplacementId){setReplacementCandidates([]);return;}
    api<ReplacementCandidate[]>(`/v1/company/replacements/${selectedReplacementId}/candidates`,session,tenantId).then(setReplacementCandidates).catch(e=>setError(e instanceof Error?e.message:'Falha ao carregar candidatos'));
  },[session,tenantId,selectedReplacementId,revision]);

  async function requestReplacement(assignmentId:string){
    if(!session||!tenantId)return;setLoading(true);setError('');try{const r=await mutate<Replacement>(`/v1/company/replacements/${assignmentId}`,session,tenantId,{reason:'Solicitação operacional via console Web'});setSelectedReplacementId(r.id);setRevision(x=>x+1);}catch(err){setError(err instanceof Error?err.message:'Falha ao abrir substituição');}finally{setLoading(false);}
  }

  async function selectReplacement(professionalId:string){
    if(!session||!tenantId||!selectedReplacementId)return;setLoading(true);setError('');try{await mutate(`/v1/company/replacements/${selectedReplacementId}/select`,session,tenantId,{professionalId});setSelectedReplacementId('');setRevision(x=>x+1);}catch(err){setError(err instanceof Error?err.message:'Falha ao confirmar substituto');}finally{setLoading(false);}
  }

  async function addTalentPool(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!session||!tenantId)return;const fd=new FormData(e.currentTarget);setLoading(true);setError('');try{await mutate('/v1/company/talent-pools',session,tenantId,{professionalId:fd.get('professionalId'),pool:fd.get('pool')});setRevision(x=>x+1);}catch(err){setError(err instanceof Error?err.message:'Falha ao atualizar talent pool');}finally{setLoading(false);}
  }

  async function removeTalentPool(pool:string,professionalId:string){
    if(!session||!tenantId)return;setLoading(true);setError('');try{await remove(`/v1/company/talent-pools/${encodeURIComponent(pool)}/${encodeURIComponent(professionalId)}`,session,tenantId);setRevision(x=>x+1);}catch(err){setError(err instanceof Error?err.message:'Falha ao remover talent pool');}finally{setLoading(false);}
  }

  async function signout(){
    if(session){await fetch(`${API}/v1/auth/signout`,{method:'POST',headers:{Authorization:`Bearer ${session.accessToken}`}}).catch(()=>undefined);}
    sessionStorage.removeItem('mlivre:web:session');setSession(null);setTenantId('');setDashboard(null);setAnalytics(null);setPlanner([]);setJobs([]);setAssignments([]);setCompleted([]);setTeams([]);setReplacements([]);setTalentPools([]);setPayments([]);setSafetyCases([]);setSafetyAppeals([]);
  }

  if(!session)return <main className="shell auth"><section className="login card"><h1>MLIVRETRABALHO</h1><p>Console empresarial complementar</p><form onSubmit={signin}><label>E-mail<input name="email" type="email" required autoComplete="username"/></label><label>Senha<input name="password" type="password" required minLength={8} autoComplete="current-password"/></label><button disabled={loading}>{loading?'Entrando…':'Entrar'}</button></form>{error&&<p role="alert" className="error">{error}</p>}<p className="muted">A sessão fica apenas nesta aba do navegador. A API continua sendo a autoridade de autenticação e autorização.</p></section></main>;

  return <main className="shell">
    <header className="top"><div><h1>Operação</h1><p>{session.identity.email} · {membership?.role}</p></div><div className="actions"><select aria-label="Empresa ativa" value={tenantId} onChange={e=>setTenantId(e.target.value)}>{session.memberships.map(m=><option value={m.tenantId} key={m.tenantId}>{m.displayName||m.tenantId} · {m.role}</option>)}</select><button className="secondary" onClick={signout}>Sair</button></div></header>
    {error&&<p role="alert" className="error">{error}</p>}
    {loading&&<p>Atualizando dados…</p>}
    <section className="grid metrics">
      <article className="card"><span>Vagas abertas</span><strong>{dashboard?.openJobs??'—'}</strong></article>
      <article className="card"><span>Confirmados</span><strong>{dashboard?.confirmedWorkers??'—'}</strong></article>
      <article className="card"><span>Em atividade</span><strong>{dashboard?.activeWorkers??'—'}</strong></article>
      <article className="card"><span>Concluídos</span><strong>{dashboard?.completedAssignments??'—'}</strong></article>
    </section>
    <section className="grid">
      <article className="card"><h2>Conversão operacional</h2><p>Vagas com interesse: <b>{analytics?.jobsWithInterest??'—'}</b></p><p>Com confirmação: <b>{analytics?.jobsWithConfirmation??'—'}</b></p><p>Interesse → confirmação: <b>{analytics?.interestToConfirmationRate==null?'Sem denominador':analytics.interestToConfirmationRate+'%'}</b></p></article>
      <article className="card"><h2>Conclusão</h2><p>Assignments concluídos: <b>{analytics?.completedAssignments??'—'}</b></p><p>Cancelados: <b>{analytics?.cancelledAssignments??'—'}</b></p><p>Taxa de conclusão: <b>{analytics?.assignmentCompletionRate==null?'Sem denominador':analytics.assignmentCompletionRate+'%'}</b></p></article>
      <article className="card"><h2>Equipes</h2><p>Equipes visíveis: <b>{teams.length}</b></p><p>Gestão continua autorizada pela API; a Web não amplia papéis.</p></article>
      <article className="card"><h2>Substituições</h2><p>Solicitações: <b>{replacements.length}</b></p><p>A seleção continua uma ação humana explícita.</p></article>
      <article className="card"><h2>Talent pools</h2><p>Registros: <b>{talentPools.length}</b></p><p>Preferência operacional não é classificação empregatícia ou punição.</p></article>
      <article className="card"><h2>Financeiro</h2><p>Eventos de reconciliação: <b>{payments.length}</b></p><p>Somente leitura enquanto FIN-RISK estiver aberto. Nenhuma ação de dinheiro é criada pela Web.</p></article>
      <article className="card"><h2>Trust & Safety</h2><p>Casos autorizados visíveis: <b>{safetyCases.length}</b> · Recursos: <b>{safetyAppeals.length}</b></p><p>Casos e recursos permanecem sujeitos à autorização da API e revisão humana; nenhuma punição automática é aplicada pela interface.</p></article>
    </section>
    <section className="grid">
      <article className="card"><h2>Nova vaga</h2><form onSubmit={createJob}><label>Título<input name="title" required maxLength={120}/></label><label>Função<input name="requiredRole" maxLength={120}/></label><label>Local<input name="location" maxLength={200}/></label><label>Cidade<input name="workCity" maxLength={120}/></label><label>Início<input name="startsAt" type="datetime-local" required/></label><label>Fim<input name="endsAt" type="datetime-local" required/></label><label>Valor (R$)<input name="payReais" type="number" min="0" step="0.01" required/></label><button disabled={loading}>Criar vaga</button></form></article>
      <article className="card"><h2>Nova equipe</h2><form onSubmit={createTeam}><label>Nome<input name="name" required maxLength={120}/></label><button disabled={loading}>Criar equipe</button></form><p className="muted">Membros continuam validados pela API e pelo tenant ativo.</p></article>
    </section>
    <section className="grid">
      <article className="card"><h2>Equipe ativa</h2><label>Equipe<select value={selectedTeamId} onChange={e=>setSelectedTeamId(e.target.value)}><option value="">Selecione</option>{teams.map(t=><option key={t.id} value={t.id}>{t.name||t.displayName||t.id}</option>)}</select></label>{selectedTeamId&&<><form onSubmit={addTeamMember}><label>Profissional<select name="professionalId" required><option value="">Selecione</option>{Array.from(new Map(assignments.map(a=>[a.professionalId,a.professionalName])).entries()).map(([id,name])=><option key={id} value={id}>{name}</option>)}</select></label><button disabled={loading}>Adicionar membro</button></form><ul>{teamMembers.map(m=><li key={m.professionalId}>{m.displayName} {m.primaryRole?` · ${m.primaryRole}`:''} <button className="secondary" onClick={()=>removeTeamMember(m.professionalId)} disabled={loading}>Remover</button></li>)}</ul></>}</article>
      <article className="card"><h2>Talent pools</h2><form onSubmit={addTalentPool}><label>Profissional<select name="professionalId" required><option value="">Selecione</option>{Array.from(new Map(assignments.map(a=>[a.professionalId,a.professionalName])).entries()).map(([id,name])=><option key={id} value={id}>{name}</option>)}</select></label><label>Pool<select name="pool"><option value="preferred">Preferidos</option><option value="network">Rede</option><option value="open">Aberto</option></select></label><button disabled={loading}>Adicionar ao pool</button></form><ul>{talentPools.map(x=><li key={`${x.pool}:${x.professionalId}`}>{x.professionalName||x.professionalId} · {x.pool} <button className="secondary" onClick={()=>x.professionalId&&removeTalentPool(x.pool,x.professionalId)} disabled={loading}>Remover</button></li>)}</ul></article>
    </section>
    <section className="card tableCard"><h2>Vagas</h2>{jobs.length===0?<p className="muted">Nenhuma vaga cadastrada.</p>:<div className="tableWrap"><table><thead><tr><th>Vaga</th><th>Status</th><th>Local</th><th>Início</th><th>Valor</th></tr></thead><tbody>{jobs.map(x=><tr key={x.id}><td>{x.title}</td><td>{x.status}</td><td>{x.location||x.workCity||'—'}</td><td>{x.startsAt?new Date(x.startsAt).toLocaleString('pt-BR'):'—'}</td><td>{x.payCents==null?'—':(x.payCents/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</td></tr>)}</tbody></table></div>}</section>
    <section className="card tableCard"><h2>Assignments ativos</h2>{assignments.length===0?<p className="muted">Nenhum assignment ativo.</p>:<div className="tableWrap"><table><thead><tr><th>Trabalho</th><th>Profissional</th><th>Status</th><th>Substituição</th></tr></thead><tbody>{assignments.map(x=><tr key={x.id}><td>{x.title}</td><td>{x.professionalName}</td><td>{x.status}</td><td>{x.replacementOpen?'Aberta':<button className="secondary" onClick={()=>requestReplacement(x.id)} disabled={loading}>Solicitar</button>}</td></tr>)}</tbody></table></div>}</section>
    <section className="card tableCard"><h2>Substituições</h2>{replacements.length===0?<p className="muted">Nenhuma solicitação.</p>:<><label>Solicitação<select value={selectedReplacementId} onChange={e=>setSelectedReplacementId(e.target.value)}><option value="">Selecione</option>{replacements.filter(r=>r.status==='open').map(r=><option key={r.id} value={r.id}>{r.reason||r.assignmentId||r.id}</option>)}</select></label>{selectedReplacementId&&<div className="tableWrap"><table><thead><tr><th>Candidato</th><th>Score</th><th>Ação humana</th></tr></thead><tbody>{replacementCandidates.map(x=><tr key={x.professionalId}><td>{x.displayName}</td><td>{x.score}</td><td><button onClick={()=>selectReplacement(x.professionalId)} disabled={loading}>Confirmar substituto</button></td></tr>)}</tbody></table></div>}</>}</section>
    <section className="card tableCard"><h2>Concluídos recentes</h2>{completed.length===0?<p className="muted">Nenhum trabalho concluído.</p>:<div className="tableWrap"><table><thead><tr><th>Trabalho</th><th>Profissional</th><th>Conclusão</th><th>Avaliação</th></tr></thead><tbody>{completed.map(x=><tr key={x.id}><td>{x.title}</td><td>{x.professionalName}</td><td>{x.completedAt?new Date(x.completedAt).toLocaleString('pt-BR'):'—'}</td><td>{x.ratingScore??'Pendente'}</td></tr>)}</tbody></table></div>}</section>
    <section className="card tableCard"><h2>Planner</h2>{planner.length===0?<p className="muted">Nenhuma vaga no planner.</p>:<div className="tableWrap"><table><thead><tr><th>Vaga</th><th>Status</th><th>Cidade</th><th>Interesse</th><th>Confirmados</th><th>Ativos</th><th>Concluídos</th></tr></thead><tbody>{planner.map(x=><tr key={x.id}><td>{x.title}</td><td>{x.jobStatus}</td><td>{x.workCity||'—'}</td><td>{x.interestCount}</td><td>{x.confirmedCount}</td><td>{x.activeCount}</td><td>{x.completedCount}</td></tr>)}</tbody></table></div>}</section>
  </main>;
}
