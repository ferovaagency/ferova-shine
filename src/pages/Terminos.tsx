import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const sectionsEs = [
  ['1. Alcance y documentos aplicables', 'Estos términos regulan servicios B2B prestados por Ferova Agency a agencias, consultoras y equipos digitales. Cada propuesta aceptada define entregables, tiempos, precio, moneda, impuestos, revisiones y forma de trabajo. Si existe una diferencia, prevalecen la propuesta o contrato específico y sus anexos.'],
  ['2. Servicios para agencias', 'Los servicios pueden incluir SEO técnico white label, auditorías, migraciones, SEO para ecommerce, mantenimiento web mensual, diseño y desarrollo de landing pages y otras tareas expresamente incluidas en la propuesta. Todo elemento no incluido se cotiza como cambio de alcance.'],
  ['3. Agencia, cliente final y marca blanca', 'La agencia contratante conserva la relación comercial con su cliente final. Ferova puede trabajar bajo marca blanca cuando se pacte. La agencia debe asegurar que puede compartir los accesos, instrucciones, contenidos y datos necesarios. Ferova no contactará al cliente final ni utilizará su identidad públicamente sin autorización escrita.'],
  ['4. Cotización, precio y pagos', 'La información del sitio y de Fera es orientativa y no constituye una oferta definitiva. El precio vinculante es el de la propuesta aceptada. El trabajo inicia cuando se cumplen el pago inicial, la entrega de accesos e insumos y las demás condiciones de inicio. Ante mora, Ferova podrá pausar entregas y reprogramar capacidad, previa notificación.'],
  ['5. Entregables, revisiones y aprobaciones', 'La propuesta establece formatos, responsables y rondas de revisión. Las solicitudes adicionales, cambios posteriores a una aprobación o retrabajos causados por información incompleta pueden modificar el precio y el cronograma. Las aprobaciones y decisiones relevantes deben quedar por escrito en correo, Slack o el canal acordado.'],
  ['6. Obligaciones de la agencia', 'La agencia entregará información veraz, accesos autorizados, contenidos con derechos de uso, una persona responsable de aprobar y respuestas dentro de los tiempos acordados. Los retrasos en insumos, accesos o aprobaciones desplazan proporcionalmente las fechas de entrega.'],
  ['7. SEO: obligación de medio', 'Ferova aplica criterio profesional y buenas prácticas, pero no garantiza posiciones, tráfico, indexación, ventas, ingresos ni fechas de respuesta de Google u otras plataformas. Los resultados dependen, entre otros factores, del sitio, la competencia, la implementación aprobada y cambios de algoritmos o plataformas de terceros.'],
  ['8. Mantenimiento y desarrollo web', 'El mantenimiento cubre únicamente las tareas y horas contratadas. No incluye licencias, hosting, servicios de terceros, rediseños, nuevas funcionalidades, incidentes causados por terceros o emergencias fuera del alcance, salvo pacto escrito. Las garantías sobre desarrollos cubren defectos reproducibles del entregable original durante el periodo indicado en la propuesta, no cambios de alcance.'],
  ['9. Accesos, seguridad y datos', 'Las partes aplicarán medidas razonables de seguridad y compartirán solo los accesos indispensables. Para datos del cliente final, la agencia actúa normalmente como responsable y Ferova como encargado, según las instrucciones documentadas y la Ley 1581 de 2012 cuando corresponda. La agencia debe informar restricciones especiales antes de entregar datos o accesos.'],
  ['10. Confidencialidad y casos de experiencia', 'La información no pública, credenciales, estrategias, precios y datos de clientes finales son confidenciales. Ferova solo podrá publicar el nombre, logotipo, resultados o capturas de una agencia o cliente final con autorización previa y escrita. Los casos anónimos no deberán permitir identificar razonablemente al cliente.'],
  ['11. Propiedad intelectual', 'La agencia conserva sus activos y los de sus clientes. Una vez pagados en su totalidad, los entregables finales se licencian o transfieren según la propuesta. Ferova conserva sus métodos, conocimientos previos, plantillas genéricas, herramientas y componentes reutilizables; su inclusión no transfiere la propiedad de esos recursos subyacentes.'],
  ['12. Vigencia, terminación y entrega', 'La duración, renovación y preaviso son los indicados en la propuesta. Al terminar, cada parte pagará las obligaciones causadas. Ferova entregará los archivos y accesos incluidos en el alcance y podrá eliminar copias operativas cuando ya no exista obligación legal o contractual de conservarlas.'],
  ['13. Responsabilidad y terceros', 'Cada parte responde por sus propios actos y obligaciones. Ferova no controla caídas, cambios, bloqueos o decisiones de motores de búsqueda, CMS, hosting, analítica, pasarelas u otros terceros. Nada en estos términos excluye responsabilidades que legalmente no puedan limitarse ni los derechos de una persona que tenga la calidad legal de consumidor.'],
  ['14. Ley aplicable y solución directa', 'Se aplica la ley colombiana. Antes de acudir a la autoridad o jurisdicción competente, las partes procurarán resolver por escrito la controversia mediante negociación directa. La autoridad competente se determinará según la ley y el contrato específico.'],
  ['15. Actualizaciones y contacto', 'La versión vigente se publica en esta página. Los cambios no alteran retroactivamente una propuesta ya aceptada, salvo acuerdo entre las partes o exigencia legal. Contacto: gerencia@seoparaecommerce.co, WhatsApp +1 (786) 578-7671 y Slack de Ferova.'],
];

const sectionsEn = [
  ['1. Scope and controlling documents', 'These terms govern B2B services supplied by Ferova Agency to agencies, consultancies and digital teams. Each accepted proposal defines deliverables, timing, fees, currency, taxes, revisions and workflow. If documents conflict, the specific proposal or contract and its exhibits control.'],
  ['2. Agency services', 'Services may include white-label technical SEO, audits, migrations, e-commerce SEO, monthly website maintenance, landing-page design and development, and any other task expressly listed in the proposal. Work outside scope requires a new quote.'],
  ['3. Agency, end client and white label', 'The hiring agency owns its commercial relationship with the end client. Ferova may work white label when agreed. The agency confirms it is authorized to share required access, instructions, content and data. Ferova will not contact or publicly identify the end client without written permission.'],
  ['4. Quotes, fees and payment', 'Website and Fera information is indicative, not a final offer. Only an accepted proposal sets a binding fee. Work begins after the initial payment, required access and materials, and any other start conditions are satisfied. Late payment may pause delivery and reschedule reserved capacity after notice.'],
  ['5. Delivery, review and approval', 'The proposal defines formats, owners and revision rounds. Extra requests, post-approval changes, or rework caused by incomplete information may change fees and timing. Material approvals and decisions must be recorded by email, Slack or the agreed channel.'],
  ['6. Agency responsibilities', 'The agency supplies accurate information, authorized access, properly licensed content, an approval owner, and timely responses. Delays in inputs, access or approval move delivery dates accordingly.'],
  ['7. SEO is a best-efforts service', 'Ferova applies professional judgment and accepted practices but does not guarantee rankings, traffic, indexing, sales, revenue or platform response dates. Outcomes depend on the site, competition, approved implementation and third-party algorithm or platform changes.'],
  ['8. Web maintenance and development', 'Maintenance covers only contracted tasks and hours. Unless agreed, it excludes licenses, hosting, third-party services, redesigns, new features and third-party incidents. Development warranties cover reproducible defects in the original deliverable during the proposal period, not scope changes.'],
  ['9. Access, security and data', 'Both parties use reasonable safeguards and share only necessary access. For end-client data, the agency normally acts as controller and Ferova as processor under documented instructions and applicable law. Special data restrictions must be disclosed before access is provided.'],
  ['10. Confidentiality and experience', 'Non-public information, credentials, strategy, pricing and end-client data are confidential. Ferova may publish names, logos, results or screenshots only with prior written approval. Anonymous examples must not reasonably identify the client.'],
  ['11. Intellectual property', 'The agency retains its assets and those of its clients. Once fully paid, final deliverables are licensed or assigned as stated in the proposal. Ferova retains pre-existing knowledge, generic templates, tools and reusable components.'],
  ['12. Termination and handover', 'Term, renewal and notice follow the proposal. On termination, accrued fees remain due. Ferova supplies in-scope files and access and may delete operating copies once no legal or contractual retention duty remains.'],
  ['13. Liability and third parties', 'Each party remains responsible for its own acts. Ferova does not control outages, changes, bans or decisions by search engines, CMS, hosting, analytics, payment providers or other third parties. Nothing excludes liability or rights that cannot legally be limited.'],
  ['14. Governing law and direct resolution', 'Colombian law applies. Before seeking relief from a competent authority or court, the parties will attempt written good-faith negotiation. Jurisdiction is determined by applicable law and the specific contract.'],
  ['15. Updates and contact', 'The current version appears on this page. Updates do not retroactively change an accepted proposal unless agreed or legally required. Contact: gerencia@seoparaecommerce.co, WhatsApp +1 (786) 578-7671, or Ferova Slack.'],
];

const Terminos = ({ lang = 'es' }: Props) => {
  const english = lang === 'en';
  const sections = english ? sectionsEn : sectionsEs;
  return <>
    <SEO title={english ? 'Agency SEO Service Terms | Ferova' : 'Términos de servicios SEO para agencias | Ferova'} description={english ? 'B2B terms for white-label SEO, web maintenance and landing-page services supplied to agencies.' : 'Términos B2B para SEO white label, mantenimiento web y landing pages prestados a agencias.'} path={english ? '/en/terms' : '/terminos'} lang={english ? 'en' : 'es'} noindex={lang === 'pt'} />
    <Header currentLang={english ? 'en' : 'es'} />
    <main className="seo-brand pt-20">
      <section className="py-16 md:py-24"><div className="container mx-auto px-4 md:px-6"><article className="prose prose-sm mx-auto max-w-4xl dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Ferova Agency · B2B</p>
        <h1>{english ? 'Service terms for agency partners' : 'Términos de prestación de servicios para agencias'}</h1>
        <p className="lead">{english ? 'Operational framework for white-label technical SEO, web maintenance and landing-page delivery.' : 'Marco operativo para SEO técnico white label, mantenimiento web y producción de landing pages.'}</p>
        <div className="not-prose my-8 rounded-2xl border border-gold/30 bg-gold/10 p-5 text-sm text-foreground">{english ? 'The accepted proposal defines the specific engagement and prevails over these general terms.' : 'La propuesta aceptada define cada contratación y prevalece sobre estos términos generales.'}</div>
        <p className="text-sm">{english ? 'Effective date: August 8, 2026.' : 'Vigencia: 8 de agosto de 2026.'}</p>
        {sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}
        <h2>{english ? 'Official information' : 'Información oficial'}</h2>
        <p>{english ? 'For consumer and commerce information in Colombia, visit the ' : 'Para información de protección al consumidor y comercio en Colombia, consulta la '}<a href="https://www.sic.gov.co/" target="_blank" rel="noopener noreferrer" className="text-gold">{english ? 'Superintendence of Industry and Commerce (SIC)' : 'Superintendencia de Industria y Comercio (SIC)'}</a>.</p>
      </article></div></section>
    </main>
    <Footer currentLang={english ? 'en' : 'es'} />
  </>;
};

export default Terminos;
