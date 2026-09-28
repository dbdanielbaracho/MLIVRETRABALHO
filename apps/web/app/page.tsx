const modules = [
  ['Operação', 'Vagas, candidatos, confirmações e assignments.'],
  ['Planejamento', 'Planner, equipes, substituições e talent pools.'],
  ['Indicadores', 'Dashboard e analytics operacionais do tenant.'],
  ['Financeiro', 'Reconciliação somente leitura enquanto FIN-RISK estiver aberto.'],
  ['Trust & Safety', 'Revisão humana de casos, evidências e recursos.'],
  ['Membros', 'Gestão tenant-safe de membros e convites da empresa.'],
];

export default function Home() {
  return (
    <main className="shell">
      <div className="top">
        <div>
          <h1>MLIVRETRABALHO</h1>
          <p>Console empresarial complementar</p>
        </div>
        <span className="badge">Mobile continua sendo o produto operacional primário</span>
      </div>
      <section className="grid">
        {modules.map(([title, description]) => (
          <article className="card" key={title}>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
      <div className="notice">
        Regras de negócio permanecem na API. A Web não amplia permissões, não executa pagamento real e não aplica punições automáticas.
      </div>
    </main>
  );
}
