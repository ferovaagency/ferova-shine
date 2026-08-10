import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, Code2, FileCheck2, FileSearch, LayoutTemplate, MessageSquareQuote, TimerReset, Wrench } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import AgencyDeliveryConsole from "@/components/visuals/AgencyDeliveryConsole";
import AgencyTaglineReveal from "@/components/visuals/AgencyTaglineReveal";
import AgencyVideoElement from "@/components/visuals/AgencyVideoElement";
import ferovaLogo from "@/assets/ferova-logo.png.png";

const engagements = [
  { name: "Por tarea cerrada", fit: "Cuando el entregable está claro", text: "Cotizamos alcance, fecha y QA antes de empezar. Funciona para auditorías, landings, migraciones o correcciones concretas.", query: "tarea" },
  { name: "Bolsa de horas", fit: "Cuando el backlog cambia", text: "Reservas capacidad senior y priorizas las tareas que más presionan la entrega de tus clientes.", query: "horas" },
  { name: "Capacidad mensual", fit: "Cuando necesitas continuidad", text: "Mantienes un bloque recurrente para mantenimiento, SEO técnico y producción sin crear un cargo permanente.", query: "mensual" },
];

const capabilities = [
  { icon: FileSearch, title: "SEO técnico white label", text: "Auditorías, arquitectura, indexación, migraciones y QA técnico bajo tu marca o como especialista visible.", href: "/auditoria-seo-tecnica", mode: "Tarea, horas o mes" },
  { icon: Wrench, title: "Mantenimiento web", text: "Rendimiento, seguridad, actualizaciones y correcciones para los sitios de tus clientes.", href: "/seo-para-agencias", mode: "Horas o capacidad mensual" },
  { icon: LayoutTemplate, title: "Landing pages", text: "Páginas rápidas, medibles y listas para contenido, pauta o captación de leads.", href: "/servicios/diseno-web", mode: "Por tarea o volumen" },
  { icon: Code2, title: "Migraciones y soporte", text: "Apoyo senior para cambios de plataforma, integraciones y picos de trabajo técnico.", href: "/migraciones-seo", mode: "Alcance definido" },
];

const workflow = [
  { title: "Defines lo que debe salir", text: "Habilidad, tarea, volumen, plataforma, fecha y nivel de contacto con el cliente final." },
  { title: "Eliges cómo comprar capacidad", text: "Tarea cerrada, bolsa de horas o bloque mensual, con precio y disponibilidad confirmados." },
  { title: "Recibes una entrega utilizable", text: "Ejecución, QA y documentación listos para presentar bajo la marca de tu agencia." },
];

const faq = [
  { q: "¿Qué es una especialista SEO por horas para agencias?", a: "Es capacidad técnica que una agencia contrata solo durante el bloque acordado. Ferova ejecuta tareas de SEO y web, documenta el trabajo y puede operar bajo la marca de la agencia, sin crear un cargo permanente." },
  { q: "¿Cuándo conviene contratar por horas en lugar de un perfil full time?", a: "Conviene cuando el backlog cambia, existen picos de entrega o necesitas una habilidad especializada que no ocupa una jornada estable. Un cargo full time tiene más sentido cuando existe trabajo diario, continuo y suficiente para una función permanente." },
  { q: "¿Puedo empezar con una sola tarea?", a: "Sí. Puedes comenzar con una auditoría, una landing, un QA de migración, una corrección técnica o cualquier entregable que pueda delimitarse antes de empezar." },
  { q: "¿Cómo se calcula el precio por tarea o por horas?", a: "La cotización considera habilidad, volumen, plataforma, accesos, fecha y nivel de interacción con el cliente final. Antes de iniciar recibes la unidad de contratación, el alcance y los supuestos." },
  { q: "¿Qué puedo incluir en una bolsa de horas?", a: "Puedes priorizar SEO técnico, mantenimiento, QA, correcciones, landings o soporte de migración, siempre dentro de las capacidades y condiciones acordadas para la bolsa." },
  { q: "¿Puedes trabajar bajo la marca de mi agencia?", a: "Sí. Podemos operar completamente white label, como apoyo interno o como especialista visible ante el cliente final, según lo que defina la agencia." },
  { q: "¿Cómo manejas la confidencialidad y los accesos?", a: "Definimos responsables, permisos mínimos, canales y tratamiento de información antes de recibir accesos. Podemos firmar NDA y trabajar con credenciales revocables administradas por la agencia." },
  { q: "¿Necesito una llamada para recibir precio?", a: "No necesariamente. Fera o el formulario recopilan el contexto para preparar una cotización inicial. Solo pedimos una conversación cuando falta una dependencia que cambia el alcance o el cronograma." },
];

const openFera = () => window.dispatchEvent(new CustomEvent("open-fera-quote"));

export default function SeoHome() {
  const professionalService = {
    "@context": "https://schema.org", "@type": "ProfessionalService", "@id": "https://seoparaecommerce.co/#professional-service",
    name: "SEO para Agencias by Ferova", url: "https://seoparaecommerce.co/", audience: { "@type": "BusinessAudience", audienceType: "Agencias de marketing, SEO, performance y desarrollo web" },
    areaServed: ["Latin America", "Spain", "United States"],
    serviceType: ["Especialista SEO por horas", "SEO técnico white label", "Mantenimiento web por horas", "Diseño de landing pages", "Migraciones SEO"],
    telephone: "+1-786-578-7671", email: "gerencia@seoparaecommerce.co",
    hasOfferCatalog: {
      "@type": "OfferCatalog", name: "Modalidades de capacidad para agencias",
      itemListElement: engagements.map((item) => ({ "@type": "Offer", name: item.name, itemOffered: { "@type": "Service", name: item.name, description: item.text } })),
    },
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };

  return (
    <div className="seo-brand agency-site min-h-screen">
      <SEO title="Especialista SEO por horas para agencias | Ferova" description="Contrata SEO técnico, mantenimiento web y landings por tarea, bolsa de horas o capacidad mensual. White label, sin sumar un cargo full time." path="/" lang="es" image={ferovaLogo} jsonLd={[professionalService, faqSchema]} />
      <Header lang="es" />

      <main id="contenido-principal">
        <section className="agency-hero">
          <div className="agency-hero-shell">
            <div className="agency-hero-copy">
              <div className="agency-status-line" aria-label="Formas de contratación"><span>Por tarea</span><span>Bolsa de horas</span><span>Capacidad mensual</span></div>
              <h1>Entrega más sin contratar otro full time.</h1>
              <p>Contrata una especialista senior para SEO técnico, mantenimiento web, landings y migraciones. Pagas por la capacidad que necesitas, con alcance y precio definidos antes de empezar.</p>
              <div className="agency-hero-actions">
                <button type="button" onClick={openFera} className="seo-primary-button">Cotizar horas o tareas <MessageSquareQuote aria-hidden="true" /></button>
              </div>
              <p className="agency-hero-assurance"><TimerReset aria-hidden="true" /> Puedes empezar con una sola tarea delimitada.</p>
            </div>
            <AgencyDeliveryConsole />
          </div>
          <a className="agency-hero-anchor" href="#modalidades">Ver cómo contratar <span aria-hidden="true">↓</span></a>
        </section>

        <section className="agency-tagline" aria-label="Por qué contratar capacidad flexible">
          <AgencyTaglineReveal />
        </section>

        <section id="modalidades" className="agency-engagements">
          <div className="agency-section-heading">
            <h2>Compra la unidad que mejor encaja con tu backlog.</h2>
            <p>No necesitas convertir un pico de trabajo en un cargo permanente. Empieza por una tarea y amplía la capacidad cuando la operación lo justifique.</p>
          </div>
          <div className="agency-engagement-rail">
            {engagements.map((item) => (
              <article key={item.name}>
                <span>{item.fit}</span>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
                <Link to={`/contacto?contratacion=${item.query}`}>Cotizar esta modalidad <ArrowRight aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
          <Link to="/precios" className="agency-text-link agency-engagement-more">Comparar todas las modalidades <ArrowRight aria-hidden="true" /></Link>
        </section>

        <section className="agency-comparison">
          <div className="agency-comparison-heading">
            <h2>Especialista por horas o contratación full time: ¿qué conviene?</h2>
            <p>La respuesta depende de la estabilidad del trabajo. La capacidad flexible suele encajar mejor con picos, tareas especializadas y backlogs variables. Un cargo fijo encaja mejor cuando existe una función diaria y permanente.</p>
          </div>
          <div className="agency-comparison-table-wrap">
            <table className="agency-comparison-table">
              <thead><tr><th scope="col">Decisión</th><th scope="col">Ferova por horas o tareas</th><th scope="col">Perfil full time</th></tr></thead>
              <tbody>
                <tr><th scope="row">Compromiso inicial</th><td>Una tarea delimitada, una bolsa o un bloque mensual.</td><td>Proceso de selección, incorporación y función permanente.</td></tr>
                <tr><th scope="row">Carga de trabajo</th><td>Se ajusta al backlog acordado y a los picos de entrega.</td><td>Necesita una carga diaria estable para aprovechar el rol.</td></tr>
                <tr><th scope="row">Especialidad</th><td>Activas SEO técnico, web, landings o migraciones según la necesidad.</td><td>La capacidad queda asociada al perfil contratado.</td></tr>
                <tr><th scope="row">Relación con el cliente</th><td>White label, apoyo interno o especialista visible.</td><td>Opera como parte permanente del equipo.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="agency-comparison-note"><strong>No siempre debes externalizar.</strong> Si necesitas disponibilidad diaria para una función estable, un cargo interno puede ser la mejor decisión. Ferova está diseñada para capacidad variable o especializada.</p>
        </section>

        <section id="capacidades" className="agency-capabilities">
          <div className="agency-section-heading">
            <h2>Activa solo la habilidad que falta en tu equipo.</h2>
            <p>Tú conservas la estrategia y la relación comercial. Ferova aporta ejecución senior, QA y documentación.</p>
          </div>
          <div className="agency-capability-rack">
            {capabilities.map(({ icon: Icon, title, text, href, mode }) => (
              <Link key={title} to={href} className="agency-capability-row">
                <span className="agency-capability-icon"><Icon aria-hidden="true" /></span>
                <span className="agency-capability-copy"><strong>{title}</strong><span>{text}</span></span>
                <span className="agency-capability-mode">{mode}</span>
                <ArrowRight className="agency-capability-arrow" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="agency-routing">
          <div className="agency-routing-shell">
            <div className="agency-routing-intro">
              <h2>Un brief entra.<br />Una entrega usable sale.</h2>
              <p>Fera recoge los datos necesarios para preparar unidad de contratación, alcance, precio y disponibilidad. No tienes que comprar una asesoría para saber cómo empezar.</p>
              <button type="button" onClick={openFera} className="seo-primary-button">Dejar datos para cotizar <ArrowRight aria-hidden="true" /></button>
            </div>
            <ol className="agency-routing-list">
              {workflow.map((item) => <li key={item.title}><span className="agency-routing-node"><Check aria-hidden="true" /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section className="agency-proof">
          <div className="agency-proof-media"><AgencyVideoElement /></div>
          <div className="agency-proof-copy">
            <h2>Capacidad que entra a trabajar sin quitarte el control.</h2>
            <p>Tu agencia decide prioridades, canal, marca y nivel de contacto. Cada tarea mantiene un alcance reconocible y una entrega que el equipo puede revisar.</p>
            <ul>
              <li><FileCheck2 aria-hidden="true" /> Alcance y entregables documentados</li>
              <li><FileCheck2 aria-hidden="true" /> Operación interna, visible o white label</li>
              <li><FileCheck2 aria-hidden="true" /> Contacto por correo, WhatsApp o Slack</li>
            </ul>
            <Link to="/casos-de-exito" className="agency-text-link">Ver tipos de entrega <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="agency-faq">
          <div className="agency-faq-heading"><h2>Preguntas sobre SEO por horas para agencias.</h2><p>Respuestas directas sobre modalidad, precio, confidencialidad y alcance.</p></div>
          <div className="agency-faq-list">
            {faq.map((item) => <details key={item.q}><summary><span>{item.q}</span><ChevronDown aria-hidden="true" /></summary><p>{item.a}</p></details>)}
          </div>
        </section>

        <section className="agency-final-cta">
          <div className="agency-final-copy"><h2>Empieza con la tarea que hoy bloquea una entrega.</h2><p>Indica habilidad, volumen y fecha. Recibirás una modalidad recomendada, alcance inicial, precio y disponibilidad.</p></div>
          <button type="button" onClick={openFera} className="seo-primary-button">Cotizar horas o tareas <MessageSquareQuote aria-hidden="true" /></button>
        </section>
      </main>
      <Footer lang="es" />
    </div>
  );
}
