import "./redesign-case-story.css";

export default function RedesignCaseStory() {
  return (
    <section className="redesign-case" aria-label="Caso anónimo de rediseño web y SEO">
      <iframe
        src="/case-stories/redisenio-web.html?embed=1"
        title="Historia interactiva: rediseño de una tienda y evolución de sus ventas"
        loading="lazy"
        className="redesign-case-frame"
      />
      <details className="redesign-case-data">
        <summary>Consultar los datos y el contexto del caso</summary>
        <p>Trabajo iniciado en diciembre de 2024. Rediseño en WordPress con Divi publicado en febrero de 2025. Limpieza de plugins duplicados y trabajo SEO técnico sobre sitemap, robots.txt y URLs rotas con error 404.</p>
        <table><caption>Ventas exclusivamente online · pesos colombianos · 2025</caption><thead><tr><th scope="col">Mes</th><th scope="col">Ventas COP</th></tr></thead><tbody>
          {[["Enero", "1.025.689"], ["Febrero", "2.548.080"], ["Marzo", "3.587.456"], ["Abril", "8.081.879"], ["Mayo", "13.289.661"]].map(([month, value]) => <tr key={month}><th scope="row">{month}</th><td>${value}</td></tr>)}
        </tbody></table>
        <p>Fuente: registro compartido por María Fer. Hubo campañas dirigidas a WhatsApp. La evolución observada no permite atribuir todo el crecimiento a una sola intervención. Cliente anónimo; tienda ilustrada.</p>
      </details>
    </section>
  );
}
