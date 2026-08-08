import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Code2, FileSearch, LayoutTemplate, MessageSquareQuote, Wrench } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import AgencyCapacity3D from "@/components/visuals/AgencyCapacity3D";
import AgencyVideoElement from "@/components/visuals/AgencyVideoElement";
import heroVisual from "@/assets/seo-agency-hero-3d.webp";

const capabilities = [
  { icon: FileSearch, title: "SEO técnico white label", text: "Auditorías, arquitectura, indexación, migraciones y QA técnico entregados bajo tu marca o como especialista visible.", href: "/auditoria-seo-tecnica" },
  { icon: Wrench, title: "Mantenimiento web mensual", text: "Correcciones, rendimiento, seguridad, actualizaciones y soporte continuo para los sitios de tus clientes.", href: "/seo-para-agencias" },
  { icon: LayoutTemplate, title: "Diseño de landing pages", text: "Landing pages rápidas, medibles y listas para campañas, contenidos o captación de leads de tus clientes.", href: "/servicios/diseno-web" },
  { icon: Code2, title: "Capacidad técnica flexible", text: "Apoyo por proyecto o bolsa mensual para absorber picos de trabajo sin ampliar nómina ni improvisar proveedores.", href: "/seo-para-agencias" },
];

const faq = [
  { q: "¿Puedes trabajar bajo la marca de mi agencia?", a: "Sí. Podemos trabajar de forma completamente white label, como apoyo interno o presentarnos como especialista técnico ante el cliente cuando la agencia lo prefiera." },
  { q: "¿Qué información necesitas para cotizar?", a: "La habilidad requerida, cantidad de clientes o entregables, plataforma, fechas, nivel de contacto con el cliente final y si necesitas una capacidad puntual o mensual." },
  { q: "¿Puedo contratar solo mantenimiento web o landing pages?", a: "Sí. La contratación puede concentrarse en una sola capacidad: mantenimiento mensual, landing pages, SEO técnico, migraciones o una combinación definida por volumen." },
  { q: "¿Cómo manejas la confidencialidad y los accesos?", a: "El alcance define canales, responsables, permisos mínimos y tratamiento de información. Podemos firmar NDA y trabajar con accesos revocables administrados por la agencia." },
  { q: "¿Entregas precios antes de una llamada?", a: "Fera recopila el alcance y permite preparar una cotización inicial. Si existen dependencias técnicas, se solicitan los datos faltantes antes de confirmar precio y cronograma." },
];

const openFera = () => window.dispatchEvent(new CustomEvent("open-fera-quote"));

export default function SeoHome() {
  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SEO para Agencias by Ferova",
    url: "https://seoparaecommerce.co/",
    areaServed: ["Latin America", "Spain", "United States"],
    serviceType: ["SEO técnico white label", "Mantenimiento web mensual", "Diseño de landing pages", "Migraciones SEO"],
    telephone: "+1-786-578-7671",
    email: "gerencia@seoparaecommerce.co",
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };

  return (
    <div className="seo-brand min-h-screen text-slate-950">
      <SEO title="SEO técnico y producción web white label para agencias | Ferova" description="Capacidad especializada para agencias: SEO técnico, mantenimiento web mensual, migraciones y diseño de landing pages bajo marca blanca." path="/" lang="es" image={heroVisual} jsonLd={[professionalService, faqSchema]} />
      <Header lang="es" />
      <main>
        <section className="seo-agency-hero relative overflow-hidden pb-24 pt-36 text-white md:pb-28 md:pt-44">
          <div className="container relative z-10 mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-[#e0bd52]">Capacidad senior · White label · Entrega para agencias</p>
              <h1 className="font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl md:text-7xl">La capacidad técnica que tu agencia puede vender sin ampliar su nómina.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">SEO técnico, mantenimiento web y landing pages para los clientes de tu agencia, con alcance, confidencialidad y precios definidos antes de empezar.</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={openFera} className="seo-primary-button">Cotizar con Fera <MessageSquareQuote className="h-4 w-4" /></button>
                <Link to="/seo-para-agencias" className="seo-secondary-button">Ver habilidades disponibles</Link>
              </div>
            </div>
            <AgencyCapacity3D className="seo-hero-visual" />
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <p className="seo-kicker">Lo que contratan las agencias</p>
            <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <h2 className="max-w-3xl font-display text-3xl font-bold md:text-5xl">Capacidad especializada por proyecto o como extensión mensual del equipo.</h2>
              <p className="max-w-md text-slate-600">Tú conservas la relación con el cliente. Ferova aporta ejecución, documentación y criterio técnico.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {capabilities.map(({ icon: Icon, title, text, href }) => (
                <Link key={title} to={href} className="seo-bento-card group rounded-3xl p-7 md:p-9">
                  <div className="flex items-start justify-between"><span className="rounded-2xl bg-[#f1e5ce] p-3 text-[#6a4c30]"><Icon className="h-7 w-7" /></span><ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></div>
                  <h3 className="mt-8 font-display text-2xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f4eadb] py-20 md:py-28">
          <div className="container mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[1fr_.9fr] lg:items-center">
            <AgencyVideoElement />
            <div><p className="seo-kicker">Cómo se contrata</p><h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Dime qué habilidad falta, para cuántos clientes y cuándo debe estar lista.</h2><ul className="mt-7 space-y-4 text-slate-700">{["Alcance puntual, bolsa de horas o retainer mensual.", "Trabajo white label, interno o visible ante el cliente.", "Precio y cronograma según volumen, accesos y complejidad.", "Canales directos por correo, WhatsApp o Slack."].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8c6905]" />{item}</li>)}</ul><button type="button" onClick={openFera} className="seo-primary-button mt-9">Solicitar cotización <ArrowRight className="h-4 w-4" /></button></div>
          </div>
        </section>

        <section className="py-20 md:py-28"><div className="container mx-auto max-w-5xl px-4 md:px-6"><p className="seo-kicker">Preguntas de contratación</p><h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Habilidades, experiencia, operación y precio.</h2><div className="mt-10 divide-y divide-[#6a4c30]/20 border-y border-[#6a4c30]/20">{faq.map((item) => <article key={item.q} className="py-6"><h3 className="font-display text-xl font-bold">{item.q}</h3><p className="mt-3 leading-7 text-slate-600">{item.a}</p></article>)}</div></div></section>

        <section className="bg-[#541014] py-20 text-white"><div className="container mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-end md:px-6"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e0bd52]">Cotización inicial</p><h2 className="mt-4 max-w-3xl font-display text-3xl font-bold md:text-5xl">Cuéntale a Fera qué necesita entregar tu agencia.</h2><p className="mt-4 max-w-2xl text-white/70">Fera recopila el alcance para preparar precio, disponibilidad y próximos pasos. No es una evaluación ni una sesión de asesoría.</p></div><button type="button" onClick={openFera} className="seo-primary-button shrink-0">Cotizar con Fera <MessageSquareQuote className="h-4 w-4" /></button></div></section>
      </main>
      <Footer lang="es" />
    </div>
  );
}
