import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, FileSearch, LayoutTemplate, Wrench } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import AgencyCapacity3D from "@/components/visuals/AgencyCapacity3D";
import deliveryVisual from "@/assets/agency-delivery-services-3d.webp";
import { caseCms, type CaseResultHighlight } from "@/integrations/supabase/cms-types";

type PublishedCase = { id: string; slug: string; client_public_name: string | null; sector: string; country: string | null; summary: string; result_highlights: CaseResultHighlight[] };

const cases = [
  {
    icon: FileSearch,
    location: "Agencia digital · Estados Unidos",
    service: "SEO técnico white label",
    title: "Capacidad técnica para atender el ecommerce de un cliente sin contratar un perfil interno",
    need: "La agencia necesitaba revisar arquitectura, rastreo e indexación sin exponer un cambio de proveedor ante su cliente.",
    delivery: "Diagnóstico priorizado, documentación bajo marca de la agencia y soporte para presentar las decisiones al cliente final.",
  },
  {
    icon: Wrench,
    location: "Agencia de marketing · Colombia",
    service: "Mantenimiento web mensual",
    title: "Soporte recurrente para los sitios de una cartera de clientes",
    need: "El equipo creativo acumulaba correcciones, actualizaciones y solicitudes técnicas que interrumpían la operación diaria.",
    delivery: "Bolsa mensual con priorización, mantenimiento, mejoras de rendimiento y trazabilidad de cada solicitud.",
  },
  {
    icon: LayoutTemplate,
    location: "Agencia de performance · Mercado hispano",
    service: "Diseño de landing pages",
    title: "Producción de landings para campañas sin ampliar el equipo de desarrollo",
    need: "La agencia requería páginas rápidas y consistentes con distintas marcas, fechas de lanzamiento y objetivos de conversión.",
    delivery: "Diseño y construcción por lotes, componentes reutilizables, analítica preparada y QA antes de cada publicación.",
  },
];

export default function SeoCases() {
  const [publishedCases, setPublishedCases] = useState<PublishedCase[]>([]);
  useEffect(() => { void (async () => { const { data } = await caseCms.from("case_studies").select("id,slug,client_public_name,sector,country,summary,result_highlights").eq("status", "published").order("published_at", { ascending: false }); setPublishedCases((data ?? []) as PublishedCase[]); })(); }, []);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Experiencia de Ferova trabajando con agencias",
    itemListElement: cases.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title })),
  };

  return (
    <div className="seo-brand min-h-screen text-slate-950">
      <SEO title="SEO por horas y tareas: experiencia con agencias | Ferova" description="Experiencia white label en SEO técnico, mantenimiento web y landing pages por tarea, bolsa de horas o capacidad mensual para agencias." path="/casos-de-exito" lang="es" image={deliveryVisual} jsonLd={itemList} breadcrumbs={[{ name: "Inicio", path: "/" }, { name: "Experiencia", path: "/casos-de-exito" }]} />
      <Header lang="es" />
      <main className="pt-20">
        <section className="relative overflow-hidden bg-[#541014] py-20 text-white md:py-28"><div className="container mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[1fr_.8fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#e0bd52]">Experiencia con agencias</p><h1 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-6xl">Lo que una agencia contrata cuando necesita entregar más.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-white/70">Los ejemplos describen el tipo de necesidad, el modelo de colaboración y la entrega. No publicamos nombres, cifras ni información de clientes finales sin autorización.</p></div><AgencyCapacity3D compact className="seo-hero-visual" /></div></section>
        {publishedCases.length > 0 && <section className="py-20 md:py-28"><div className="container mx-auto max-w-6xl px-4 md:px-6"><p className="seo-kicker">Casos publicados</p><h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Resultados autorizados y actualizables.</h2><div className="mt-10 grid gap-6 lg:grid-cols-2">{publishedCases.map((item) => <Link key={item.id} to={`/casos-de-exito/${item.slug}`} className="seo-bento-card rounded-3xl p-7 transition hover:-translate-y-1"><p className="text-sm font-semibold text-[#6a4c30]">{item.sector}{item.country ? ` · ${item.country}` : ""}</p><h3 className="mt-3 font-display text-2xl font-bold">{item.client_public_name || "Cliente confidencial"}</h3><p className="mt-4 leading-7 text-slate-600">{item.summary}</p>{item.result_highlights.length > 0 && <div className="mt-6 grid grid-cols-2 gap-3">{item.result_highlights.slice(0, 4).map((result) => <div key={`${result.label}-${result.value}`} className="rounded-2xl bg-[#f4eadb] p-4"><strong className="block text-xl text-[#541014]">{result.value}</strong><span className="text-xs text-slate-600">{result.label}</span></div>)}</div>}<span className="mt-6 inline-flex items-center gap-2 font-semibold text-[#6a4c30]">Ver caso <ArrowRight className="h-4 w-4" /></span></Link>)}</div></div></section>}
        <section className={`${publishedCases.length ? "bg-slate-50" : ""} py-20 md:py-28`}><div className="container mx-auto max-w-6xl px-4 md:px-6"><p className="seo-kicker">Modalidades habituales</p><div className="mt-8 grid gap-6 lg:grid-cols-3">{cases.map(({ icon: Icon, location, service, title, need, delivery }) => <article key={title} className="seo-bento-card flex h-full flex-col rounded-3xl p-7"><div className="flex items-center justify-between gap-4"><span className="rounded-2xl bg-[#f1e5ce] p-3 text-[#6a4c30]"><Icon className="h-6 w-6" /></span><span className="text-right text-xs font-bold uppercase tracking-wider text-[#8c6905]">{service}</span></div><p className="mt-7 text-sm font-semibold text-[#6a4c30]">{location}</p><h2 className="mt-3 font-display text-2xl font-bold">{title}</h2><div className="mt-6 space-y-5 text-sm leading-6 text-slate-600"><div><strong className="block text-[#3c3c3b]">Qué necesitaba</strong><p className="mt-1">{need}</p></div><div><strong className="block text-[#3c3c3b]">Qué se entregó</strong><p className="mt-1">{delivery}</p></div></div></article>)}</div></div></section>
        <section className="bg-[#f4eadb] py-20"><div className="container mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-2"><div><p className="seo-kicker">Condiciones de colaboración</p><h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">La agencia conserva el control comercial.</h2></div><ul className="space-y-4">{["Confidencialidad y alcance definidos antes de recibir accesos.", "Trabajo bajo marca blanca o participación visible según el proyecto.", "Entregas documentadas para que la agencia pueda presentarlas y operarlas.", "Contratación por tarea, bolsa de horas o capacidad mensual."].map((item) => <li key={item} className="flex gap-3 rounded-2xl bg-white p-5"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8c6905]" />{item}</li>)}</ul></div></section>
        <section className="py-20 text-center"><div className="container mx-auto px-4 md:px-6"><h2 className="mx-auto max-w-3xl font-display text-3xl font-bold md:text-5xl">Cotiza las horas o tareas que necesita tu agencia.</h2><p className="mx-auto mt-5 max-w-2xl text-slate-600">Indica habilidad, volumen, fecha y modalidad de colaboración para preparar alcance, precio y disponibilidad.</p><Link to="/contacto" className="seo-primary-button mt-9">Cotizar horas o tareas <ArrowRight className="h-4 w-4" /></Link></div></section>
      </main>
      <Footer lang="es" />
    </div>
  );
}
