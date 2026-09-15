import "./redesign-case-story.css";

export default function MaintenanceCaseStory() {
  return (
    <section className="redesign-case" aria-labelledby="maintenance-case-title">
      <div className="redesign-case-heading">
        <h2 id="maintenance-case-title">Tres sitios, tres prioridades: proteger, captar y medir</h2>
        <p>Proyecto en curso: detecté contenido no autorizado, consultas enterradas entre spam y datos de analítica mezclados. Explora qué encontré, qué hice y qué sigue pendiente.</p>
      </div>
      <iframe src="/case-stories/mantenimiento-seo.html?embed=1" title="Caso interactivo: seguridad, captación y medición en tres sitios anónimos" loading="lazy" className="redesign-case-frame" />
      <details className="redesign-case-data">
        <summary>Ver intervenciones, resultados técnicos y pendientes</summary>
        <p>Muestra anonimizada de un servicio de mantenimiento web y SEO básico sobre tres sitios. Estado según la documentación de agosto de 2026 y el análisis de cierre del 1 de septiembre. Los tres frentes se solapan; no representan un problema exclusivo de cada sitio.</p>
        <ul>
          <li><strong>Proteger:</strong> retiré contenido no autorizado en dos sitios, apliqué mejoras técnicas y SEO y activé medidas de seguridad. La revisión completa de seguridad y parte del trabajo de hosting siguen pendientes; retirar el contenido no demuestra que la intrusión esté resuelta.</li>
          <li><strong>Captar:</strong> clasifiqué envíos de formularios e identifiqué consultas legítimas entre el spam. Configuré protección y ajustes de campos, pendientes de publicación según el registro. No consta que los contactos identificados hayan sido atendidos.</li>
          <li><strong>Medir:</strong> documenté datos de dos sitios mezclados en una propiedad de analítica. La causa técnica y su corrección siguen pendientes. El acceso a Search Console ya está disponible para los tres sitios.</li>
        </ul>
        <table>
          <caption>Revisión técnica de uno de los sitios intervenidos</caption>
          <thead><tr><th scope="col">Indicador de auditoría</th><th scope="col">Antes</th><th scope="col">Después</th></tr></thead>
          <tbody><tr><th scope="row">Incidencias detectadas</th><td>44</td><td>11</td></tr><tr><th scope="row">Puntuación de salud técnica</th><td>77</td><td>83</td></tr></tbody>
        </table>
        <p>Fuente: auditorías e informes de intervención proporcionados por María Fer. Son indicadores de una herramienta de auditoría, no resultados de ventas, posicionamiento ni una certificación de seguridad. No se atribuye crecimiento orgánico a este trabajo sin una comparación validada.</p>
        <p>Las pantallas son recreaciones ilustrativas. Se omiten identidades, dominios, ubicaciones, contactos, marcas de clientes y detalles de sus accesos. Los documentos originales no se publican.</p>
      </details>
    </section>
  );
}
