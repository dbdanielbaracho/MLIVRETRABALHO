'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { isAdminRole, isCompanyRole, tenantHeaders } from './web-contract';

type Membership={tenantId:string;role:string;displayName?:string;slug?:string};
type Session={accessToken:string;identity:{id:string;email:string};memberships:Membership[]};
type Dashboard={openJobs:number;confirmedWorkers:number;activeWorkers:number;completedAssignments:number};
type Analytics={jobsCreated:number;openJobs:number;jobsWithInterest:number;jobsWithConfirmation:number;completedAssignments:number;cancelledAssignments:number;interestToConfirmationRate:number|null;assignmentCompletionRate:number|null};
type PlannerRow={id:string;title:string;jobStatus:string;workCity?:string|null;startsAt?:string|null;interestCount:number;confirmedCount:number;activeCount:number;completedCount:number;cancelledCount:number};
type Team={id:string;name?:string;displayName?:string;memberCount?:number};
type Replacement={id:string;status:string;assignmentId?:string;createdAt?:string};
type TalentPool={pool:string;professionalId?:string;professionalName?:string};
type PaymentEvent={assignmentId:string;title:string;professionalName:string;payableCents:number|null;earningStatus:string|null;capturedCents:number;refundedCents:number;paidOutCents:number;reconciliationStatus:string};
type SafetyCase={id:string;status:string;createdAt?:string;category?:string};
type SafetyAppeal={id:string;safetyCaseId:string;status:string;createdAt?:string};
const API=(process.env.NEXT_PUBLIC_API_BASE_URL||'https://mlivretrabalho.predibeacon.com').replace(/\/$/,'');

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
  const [teams,setTeams]=useState<Team[]>([]);
  const [replacements,setReplacements]=useState<Replacement[]>([]);
  const [talentPools,setTalentPools]=useState<TalentPool[]>([]);
  const [payments,setPayments]=useState<PaymentEvent[]>([]);
  const [safetyCases,setSafetyCases]=useState<SafetyCase[]>([]);
  const [safetyAppeals,setSafetyAppeals]=useState<SafetyAppeal[]>([]);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);

  useEffect(()=>{const raw=sessionStorage.getItem('mlivre:web:session');if(raw){try{const s=JSON.parse(raw) as Session;setSession(s);setTenantId(s.memberships[0]?.tenantId||'');}catch{sessionStorage.removeItem('mlivre:web:session');}}},[]);
  const membership=useMemo(()=>session?.memberships.find(m=>m.tenantId===tenantId),[session,tenantId]);

  useEffect(()=>{
    if(!session||!tenantId){setDashboard(null);setAnalytics(null);setPlanner([]);setTeams([]);setReplacements([]);setTalentPools([]);setPayments([]);setSafetyCases([]);setSafetyAppeals([]);setSafetyAppeals([]);return;}
    setLoading(true);setError('');
    const admin=isAdminRole(membership?.role);
    Promise.all([
      api<Dashboard>('/v1/company/dashboard',session,tenantId),
      api<Analytics>('/v1/company/analytics',session,tenantId),
      api<PlannerRow[]>('/v1/company/planner',session,tenantId),
      api<Team[]>('/v1/company/teams',session,tenantId),
      api<Replacement[]>('/v1/company/replacements',session,tenantId),
      api<TalentPool[]>('/v1/company/talent-pools',session,tenantId),
      admin?api<PaymentEvent[]>('/v1/company/payment-events/reconciliation',session,tenantId):Promise.resolve([]),
      admin?api<SafetyCase[]>('/v1/company/safety-cases',session,tenantId):Promise.resolve([]),
      admin?api<SafetyAppeal[]>('/v1/company/safety-appeals',session,tenantId):Promise.resolve([])
    ]).then(([d,a,p,t,r,tp,pe,sc,sa])=>{setDashboard(d);setAnalytics(a);setPlanner(p);setTeams(t);setReplacements(r);setTalentPools(tp);setPayments(pe);setSafetyCases(sc);setSafetyAppeals(sa);}).catch(e=>setError(e instanceof Error?e.message:'Falha ao carregar operação')).finally(()=>setLoading(false));
  },[session,tenantId,membership?.role]);

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

  async function signout(){
    if(session){await fetch(`${API}/v1/auth/signout`,{method:'POST',headers:{Authorization:`Bearer ${session.accessToken}`}}).catch(()=>undefined);}
    sessionStorage.removeItem('mlivre:web:session');setSession(null);setTenantId('');setDashboard(null);setAnalytics(null);setPlanner([]);setTeams([]);setReplacements([]);setTalentPools([]);setPayments([]);setSafetyCases([]);
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
    <section className="card tableCard"><h2>Planner</h2>{planner.length===0?<p className="muted">Nenhuma vaga no planner.</p>:<div className="tableWrap"><table><thead><tr><th>Vaga</th><th>Status</th><th>Cidade</th><th>Interesse</th><th>Confirmados</th><th>Ativos</th><th>Concluídos</th></tr></thead><tbody>{planner.map(x=><tr key={x.id}><td>{x.title}</td><td>{x.jobStatus}</td><td>{x.workCity||'—'}</td><td>{x.interestCount}</td><td>{x.confirmedCount}</td><td>{x.activeCount}</td><td>{x.completedCount}</td></tr>)}</tbody></table></div>}</section>
  </main>;
}
