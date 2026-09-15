import "./redesign-case-story.css";

const metrics = [
  ["Clics orgánicos", "153", "1.180"],
  ["Impresiones en Google", "4.300", "22.000"],
  ["Usuarios orgánicos", "188", "1.550"],
  ["CTR orgánico", "3,6 %", "5,4 %"],
  ["Posición media", "23,9", "10,2"],
  ["Páginas indexadas", "4", "96"],
];

export default function RecoveryCaseStory() {
  return (
    <section className="redesign-case" aria-label="Caso anónimo de limpieza y recuperación SEO">
      <div className="redesign-case-heading">
        <h2>Caso real: el problema SEO escondido dentro de los artículos</h2>
        <p>Una revisión manual reveló frases intrusas y enlaces maliciosos. Así limpié el sitio y trabajé su recuperación SEO, con resultados documentados de noviembre de 2024 a mayo de 2025.</p>
      </div>
      <iframe src="/case-stories/recuperacion-seo.html?embed=1" title="Historia interactiva: detección de contenido comprometido, limpieza y recuperación SEO" loading="lazy" className="redesign-case-frame" />
      <details className="redesign-case-data">
        <summary>Ver cifras, intervención y contexto del caso</summary>
        <p>Firma de servicios profesionales cuya identidad se mantiene confidencial. La penalización anterior ya estaba resuelta cuando comenzó mi intervención; la revisión artículo por artículo descubrió contenido que seguía comprometido.</p>
        <p>Limpié las inserciones maliciosas, migré el hosting, apliqué bloqueos de seguridad y envié un archivo de desautorización a Search Console. El trabajo SEO también incluyó robots.txt, sitemap, canonicals, redirecciones, optimización de imágenes y metadatos, y contenido informativo.</p>
        <table><caption>Comparación de indicadores del reporte de seguimiento</caption><thead><tr><th scope="col">Indicador</th><th scope="col">Noviembre 2024</th><th scope="col">Mayo 2025</th></tr></thead><tbody>{metrics.map(([label, before, after]) => <tr key={label}><th scope="row">{label}</th><td>{before}</td><td>{after}</td></tr>)}</tbody></table>
        <p>Fuente: reporte de seguimiento proporcionado por María Fer. Comparación de dos periodos; no se dispone aquí de una serie mensual. El crecimiento corresponde al periodo de limpieza, migración y trabajo SEO, sin atribuirlo a una única acción.</p>
        <p>Según mi seguimiento, no se volvieron a detectar enlaces maliciosos durante el tiempo que trabajé con la firma. La animación es una representación con texto ficticio; no muestra contenido, enlaces ni identidad del cliente.</p>
      </details>
    </section>
  );
}
