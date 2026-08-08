import { Link } from "react-router-dom";
import { ArrowRight, Bot, FileSearch, GitBranch, Library, Network } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { SEO_EDITORIAL } from "@/content/seoEditorial";

const collections = [
  { icon: FileSearch, title: "SEO técnico", text: "Rastreo, indexación, renderizado, arquitectura y rendimiento.", href: "/blog?categoria=Technical%20SEO" },
  { icon: Library, title: "SEO para ecommerce", text: "Categorías, productos, facetas, demanda y crecimiento orgánico.", href: "/blog?categoria=Ecommerce%20SEO" },
  { icon: Network, title: "SEO para agencias", text: "Operación white label, QA técnico y capacidad especializada.", href: "/seo-para-agencias" },
  { icon: Bot, title: "Búsqueda con IA", text: "Entidades, contenido citable, datos estructurados y medición.", href: "/recursos/herramientas/evaluador-preparacion-ai-search" },
  { icon: GitBranch, title: "Migraciones SEO", text: "Inventario, mapeo, lanzamiento y monitoreo de cambios críticos.", href: "/migraciones-seo" },
];

const categoryLabel: Record<string, string> = {
  "Technical SEO": "SEO técnico",
  "Ecommerce SEO": "SEO para ecommerce",
  "SEO for Agencies": "SEO para agencias",
  "AI Search": "Búsqueda con IA",
  "SEO Migrations": "Migraciones SEO",
};

export default function SeoResources() {
  return (
    <div className="seo-brand min-h-screen text-slate-950">
      <SEO title="Recursos SEO para agencias y ecommerce | Ferova" description="Guías y herramientas en español sobre SEO técnico, ecommerce, trabajo white label, migraciones y búsqueda con IA." path="/recursos" lang="es" breadcrumbs={[{ name: "Inicio", path: "/" }, { name: "Recursos", path: "/recursos" }]} />
      <Header lang="es" />
      <main className="pt-20">
        <section className="bg-[#541014] py-20 text-white md:py-28"><div className="container mx-auto max-w-6xl px-4 md:px-6"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#e0bd52]">Biblioteca para agencias</p><h1 className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-tight md:text-6xl">Recursos para vender, dirigir y entregar mejor el trabajo SEO.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-white/70">Contenido en español para equipos que necesitan evaluar problemas técnicos, explicar decisiones a clientes y ampliar su capacidad de entrega.</p></div></section>
        <section className="py-20 md:py-28"><div className="container mx-auto max-w-6xl px-4 md:px-6"><p className="seo-kicker">Explorar por necesidad</p><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{collections.map(({ icon: Icon, title, text, href }) => <Link key={title} to={href} className="seo-bento-card group rounded-3xl p-7"><Icon className="h-7 w-7 text-[#6a4c30]" /><h2 className="mt-7 font-display text-2xl font-bold">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p><span className="mt-6 inline-flex items-center gap-2 font-semibold text-[#6a4c30]">Ver recursos <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>)}</div></div></section>
        <section className="bg-[#f4eadb] py-20 md:py-24"><div className="container mx-auto max-w-6xl px-4 md:px-6"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="seo-kicker">Lecturas recomendadas</p><h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Artículos seleccionados por problema.</h2></div><Link to="/blog" className="inline-flex items-center gap-2 font-semibold text-[#6a4c30]">Ver todos los artículos <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-10 grid gap-5 md:grid-cols-3">{SEO_EDITORIAL.slice(0, 6).map((post) => <Link key={post.slug} to={`/blog/${post.slug}`} className="seo-bento-card rounded-2xl p-6"><span className="text-xs font-bold uppercase tracking-wider text-[#8c6905]">{categoryLabel[post.category]}</span><h3 className="mt-4 font-display text-xl font-bold">{post.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p></Link>)}</div></div></section>
        <section className="py-20"><div className="container mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 rounded-3xl bg-[#3c3c3b] px-8 py-12 text-white md:flex-row md:items-center md:px-12"><div><Bot className="h-8 w-8 text-[#e0bd52]" /><h2 className="mt-6 font-display text-3xl font-bold">Herramientas para preparar una conversación técnica</h2><p className="mt-3 max-w-2xl text-white/70">Utilidades orientativas para detectar brechas y organizar información antes de cotizar o intervenir.</p></div><Link to="/recursos/herramientas" className="seo-primary-button shrink-0">Abrir herramientas <ArrowRight className="h-4 w-4" /></Link></div></section>
      </main>
      <Footer lang="es" />
    </div>
  );
}
