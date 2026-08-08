import { Link } from "react-router-dom";
import { ArrowRight, Bot, CheckCircle2, Layers3, Search, ShoppingBag, Waypoints } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";

const pillars = [
  { icon: Search, title: "Base técnica", text: "Rastreo, indexación, renderizado, Core Web Vitals, canonicals y control de deuda técnica." },
  { icon: Layers3, title: "Arquitectura del catálogo", text: "Categorías, facetas, productos, enlazado interno y reglas para catálogos que cambian continuamente." },
  { icon: ShoppingBag, title: "Demanda y conversión", text: "Priorización de consultas y páginas según intención, margen, disponibilidad y capacidad comercial." },
  { icon: Waypoints, title: "Autoridad y contenido", text: "Contenido útil, señales externas y cobertura temática conectada con decisiones de compra reales." },
];

const faqs = [
  { q: "¿Qué diferencia el SEO para ecommerce?", a: "Un ecommerce combina catálogos extensos, inventario cambiante, variantes, filtros y múltiples rutas hacia productos similares. La estrategia debe controlar esa complejidad sin perder intención comercial." },
  { q: "¿La consultoría incluye implementación?", a: "El alcance se define según el equipo y la plataforma. Puedo acompañar a desarrollo y contenidos, validar entregas o asumir bloques concretos cuando sea viable." },
  { q: "¿Cuándo se pueden esperar resultados?", a: "Depende del estado técnico, la autoridad, la competencia y la velocidad de implementación. Se acuerdan indicadores y ventanas de evaluación, pero no se garantizan posiciones ni plazos universales." },
  { q: "¿AI Search está separado del SEO?", a: "No. Se trabaja como una capa del sistema SEO mediante entidades claras, contenido rastreable, datos estructurados, autoridad externa y medición específica." },
];

export default function SeoEcommerceEs() {
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SEO title="SEO para Ecommerce: estrategia técnica y crecimiento orgánico | Ferova" description="Consultoría SEO senior para ecommerce: arquitectura de catálogo, SEO técnico, migraciones, contenido y preparación para AI Search." path="/servicios/seo-ecommerce" lang="es" jsonLd={faqLd} breadcrumbs={[{ name: "Inicio", path: "/" }, { name: "SEO para ecommerce", path: "/servicios/seo-ecommerce" }]} />
      <Header lang="es" />
      <main className="pt-20">
        <section className="relative overflow-hidden bg-[#541014] py-20 text-white md:py-28">
          <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#c0930e]/20 blur-3xl" />
          <div className="container relative mx-auto max-w-6xl px-4 md:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e0bd52]">SEO para ecommerce</p>
            <h1 className="mt-5 max-w-5xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">Convierte la complejidad de tu ecommerce en una arquitectura que Google pueda entender y el negocio pueda aprovechar.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">Trabajo con catálogos, categorías, facetas, productos y equipos técnicos para detectar bloqueos, priorizar oportunidades y construir crecimiento orgánico sostenible.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link to="/contacto" className="seo-primary-button">Cotizar SEO para ecommerce <ArrowRight className="h-4 w-4" /></Link><Link to="/casos-de-exito" className="seo-secondary-button">Ver evidencia disponible</Link></div>
          </div>
        </section>

        <section className="py-20 md:py-28"><div className="container mx-auto max-w-6xl px-4 md:px-6"><p className="seo-kicker">El sistema completo</p><h2 className="mt-4 max-w-3xl font-display text-3xl font-bold md:text-5xl">El problema rara vez está en una sola etiqueta o palabra clave.</h2><div className="mt-12 grid gap-5 md:grid-cols-2">{pillars.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-slate-200 p-7"><Icon className="h-6 w-6 text-[#6a4c30]" /><h3 className="mt-7 font-display text-2xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div></div></section>

        <section className="bg-slate-50 py-20 md:py-24"><div className="container mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[.8fr_1.2fr]"><div><p className="seo-kicker">Cuándo intervenir</p><h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Señales de que necesitas criterio senior.</h2></div><ul className="space-y-4">{["El tráfico orgánico no crece aunque el equipo publique y optimice.","Google indexa URLs que no deberían competir entre sí.","El catálogo cambió y la arquitectura ya no representa el negocio.","Hay una migración, replatforming o rediseño próximo.","El backlog SEO crece, pero nadie puede defender qué va primero."].map((x) => <li key={x} className="flex gap-3 rounded-xl bg-white p-5 shadow-sm"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8c6905]" /><span>{x}</span></li>)}</ul></div></section>

        <section className="py-20 md:py-28"><div className="container mx-auto max-w-6xl px-4 md:px-6"><div className="grid gap-12 lg:grid-cols-2 lg:items-center"><div><p className="seo-kicker">AI Search dentro del SEO</p><h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Preparar la marca para nuevas interfaces sin abandonar los fundamentos.</h2><p className="mt-6 leading-7 text-slate-600">La comprensión de entidades, el contenido citable, los datos estructurados y la autoridad multifuente complementan el SEO técnico y editorial. Ninguna intervención garantiza una mención o recomendación.</p><Link to="/recursos/herramientas/evaluador-preparacion-ai-search" className="mt-8 inline-flex items-center gap-2 font-semibold text-[#6a4c30]">Usar el evaluador <ArrowRight className="h-4 w-4" /></Link></div><div className="rounded-3xl bg-[#541014] p-8 text-white"><Bot className="h-9 w-9 text-[#e0bd52]" /><h3 className="mt-6 font-display text-2xl font-bold">Medición antes que afirmaciones</h3><p className="mt-4 leading-7 text-slate-300">Para hablar de visibilidad real se requiere un conjunto de consultas, plataformas, fechas de corte y competidores. Una autoevaluación no sustituye esa medición.</p></div></div></div></section>

        <section className="border-y border-slate-200 bg-slate-50 py-20"><div className="container mx-auto max-w-4xl px-4 md:px-6"><p className="seo-kicker">Preguntas frecuentes</p><div className="mt-8 divide-y divide-slate-200">{faqs.map((f) => <article key={f.q} className="py-6"><h2 className="font-display text-xl font-bold">{f.q}</h2><p className="mt-3 leading-7 text-slate-600">{f.a}</p></article>)}</div></div></section>
        <section className="bg-[#541014] py-20 text-center text-white"><div className="container mx-auto px-4 md:px-6"><h2 className="mx-auto max-w-3xl font-display text-3xl font-bold md:text-5xl">Empecemos por identificar qué está frenando el crecimiento.</h2><Link to="/contacto" className="seo-primary-button mt-9">Cotizar SEO para ecommerce <ArrowRight className="h-4 w-4" /></Link></div></section>
      </main><Footer lang="es" />
    </div>
  );
}
