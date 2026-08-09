import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, Code2, FileCheck2, FileSearch, LayoutTemplate, MessageSquareQuote, Wrench } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import AgencyDeliveryConsole from "@/components/visuals/AgencyDeliveryConsole";
import AgencyVideoElement from "@/components/visuals/AgencyVideoElement";
import consoleVisual from "@/assets/agency-delivery-console-hero.png";

const capabilities = [
  { icon: FileSearch, title: "SEO técnico white label", text: "Auditorías, arquitectura, indexación, migraciones y QA técnico bajo tu marca o como especialista visible.", href: "/auditoria-seo-tecnica", mode: "Proyecto o capacidad mensual" },
  { icon: Wrench, title: "Mantenimiento web mensual", text: "Rendimiento, seguridad, actualizaciones y correcciones continuas para los sitios de tus clientes.", href: "/seo-para-agencias", mode: "Bolsa mensual priorizada" },
  { icon: LayoutTemplate, title: "Landing pages para campañas", text: "Páginas rápidas, medibles y listas para contenidos, pauta o captación de leads.", href: "/servicios/diseno-web", mode: "Producción por volumen" },
  { icon: Code2, title: "Migraciones y soporte técnico", text: "Capacidad senior para cambios de plataforma, integraciones y picos de trabajo sin ampliar nómina.", href: "/migraciones-seo", mode: "Alcance y cronograma definidos" },
];

const workflow = [
  { title: "Tu agencia define la necesidad", text: "Habilidad, volumen, plataforma, fecha y nivel de contacto con el cliente final." },
  { title: "Ferova configura la capacidad", text: "Acordamos alcance, confidencialidad, responsables, precio y ritmo de entrega." },
  { title: "Tú recibes una entrega utilizable", text: "Ejecución, QA y documentación listos para presentar bajo tu marca." },
];

const faq = [
  { q: "¿Puedes trabajar bajo la marca de mi agencia?", a: "Sí. Podemos operar de forma completamente white label, como apoyo interno o presentarnos como especialista técnico ante el cliente cuando la agencia lo prefiera." },
  { q: "¿Qué información necesitas para cotizar?", a: "La habilidad requerida, cantidad de clientes o entregables, plataforma, fechas, nivel de contacto con el cliente final y si necesitas capacidad puntual o mensual." },
  { q: "¿Puedo contratar solo mantenimiento web o landing pages?", a: "Sí. La contratación puede concentrarse en una sola capacidad: mantenimiento mensual, landing pages, SEO técnico, migraciones o una combinación definida por volumen." },
  { q: "¿Cómo manejas la confidencialidad y los accesos?", a: "El alcance define canales, responsables, permisos mínimos y tratamiento de información. Podemos firmar NDA y trabajar con accesos revocables administrados por la agencia." },
  { q: "¿Entregas precios antes de una llamada?", a: "Fera recopila el alcance para preparar una cotización inicial. Si existen dependencias técnicas, solicitamos los datos faltantes antes de confirmar precio y cronograma." },
];

const openFera = () => window.dispatchEvent(new CustomEvent("open-fera-quote"));

export default function SeoHome() {
  const professionalService = {
    "@context": "https://schema.org", "@type": "ProfessionalService", name: "SEO para Agencias by Ferova", url: "https://seoparaecommerce.co/",
    areaServed: ["Latin America", "Spain", "United States"],
    serviceType: ["SEO técnico white label", "Mantenimiento web mensual", "Diseño de landing pages", "Migraciones SEO"],
    telephone: "+1-786-578-7671", email: "gerencia@seoparaecommerce.co",
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };

  return (
    <div className="seo-brand agency-site min-h-screen">
      <SEO title="Capacidad SEO y web white label para agencias | Ferova" description="SEO técnico, mantenimiento web, landing pages y migraciones para los clientes de tu agencia, bajo tu marca y sin ampliar nómina." path="/" lang="es" image={consoleVisual} jsonLd={[professionalService, faqSchema]} />
      <Header lang="es" />

      <main>
        <section className="agency-hero">
          <div className="agency-hero-shell">
            <div className="agency-hero-copy">
              <div className="agency-status-line" aria-label="Modalidades de trabajo"><span>White label</span><span>Bajo tu marca</span><span>Sin ampliar nómina</span></div>
              <h1>La capacidad técnica que tu agencia puede vender.</h1>
              <p>SEO técnico, mantenimiento web, landing pages y migraciones para tus clientes, con alcance, confidencialidad y precio definidos antes de empezar.</p>
              <div className="agency-hero-actions">
                <button type="button" onClick={openFera} className="seo-primary-button">Cotizar capacidad <MessageSquareQuote aria-hidden="true" /></button>
                <Link to="/seo-para-agencias" className="seo-secondary-button">Ver habilidades <ArrowRight aria-hidden="true" /></Link>
              </div>
            </div>
            <AgencyDeliveryConsole />
          </div>
          <a className="agency-hero-anchor" href="#capacidades">Explorar la consola <span aria-hidden="true">↓</span></a>
        </section>

        <section id="capacidades" className="agency-capabilities">
          <div className="agency-section-heading">
            <h2>Activa solo la capacidad que falta en tu equipo.</h2>
            <p>Tú conservas la estrategia y la relación con el cliente. Ferova aporta ejecución senior, documentación y criterio técnico.</p>
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
              <p>No vendemos una llamada de asesoría. Fera recoge los datos necesarios para preparar precio, disponibilidad y próximos pasos.</p>
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
            <h2>Capacidad que se integra a la operación de tu agencia.</h2>
            <p>Contrata por proyecto, bolsa de horas o retainer mensual. El canal y la visibilidad frente al cliente final los decide tu agencia.</p>
            <ul>
              <li><FileCheck2 aria-hidden="true" /> Alcance y entregables documentados</li>
              <li><FileCheck2 aria-hidden="true" /> Operación interna, visible o white label</li>
              <li><FileCheck2 aria-hidden="true" /> Contacto por correo, WhatsApp o Slack</li>
            </ul>
            <Link to="/casos-de-exito" className="agency-text-link">Ver experiencia de entrega <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="agency-faq">
          <div className="agency-faq-heading"><h2>Lo que una agencia necesita saber antes de contratar.</h2><p>Habilidades, modalidad, confidencialidad y precio, sin rodeos.</p></div>
          <div className="agency-faq-list">
            {faq.map((item) => <details key={item.q}><summary><span>{item.q}</span><ChevronDown aria-hidden="true" /></summary><p>{item.a}</p></details>)}
          </div>
        </section>

        <section className="agency-final-cta">
          <div className="agency-final-copy"><h2>¿Qué necesita entregar tu agencia?</h2><p>Cuéntale a Fera la habilidad, el volumen y la fecha. Con esa información preparamos una cotización inicial.</p></div>
          <button type="button" onClick={openFera} className="seo-primary-button">Cotizar con Fera <MessageSquareQuote aria-hidden="true" /></button>
        </section>
      </main>
      <Footer lang="es" />
    </div>
  );
}
