import { Link } from "react-router-dom";
import { ArrowRight, Bot, FileSearch, GitBranch, Library, Network } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { SEO_EDITORIAL } from "@/content/seoEditorial";
import type { Lang } from "@/config/routes";

/**
 * Página de recursos, la MISMA en los dos idiomas.
 *
 * Antes /recursos lo servía este componente y /en/resources otro distinto
 * (Recursos.tsx), con secciones que apuntaban a los lead magnets retirados.
 * Eran dos páginas diferentes bajo el mismo nombre: exactamente la incoherencia
 * entre idiomas que estamos eliminando.
 */

const ICONS = [FileSearch, Library, Network, Bot, GitBranch];
const TOOL = "/recursos/herramientas/evaluador-preparacion-ai-search";

const COPY = {
  es: {
    path: "/recursos",
    seoTitle: "Recursos SEO para agencias y ecommerce | Ferova",
    seoDesc: "Guías y herramientas en español sobre SEO técnico, ecommerce, trabajo white label, migraciones y búsqueda con IA.",
    home: "Inicio", crumb: "Recursos",
    eyebrow: "Biblioteca para agencias",
    h1: "Recursos para vender, dirigir y entregar mejor el trabajo SEO.",
    lede: "Contenido para equipos que necesitan evaluar problemas técnicos, explicar decisiones a clientes y ampliar su capacidad de entrega.",
    exploreKicker: "Explorar por necesidad",
    seeMore: "Ver recursos",
    readingKicker: "Lecturas recomendadas",
    readingTitle: "Artículos seleccionados por problema.",
    allPosts: "Ver todos los artículos",
    blog: "/blog",
    toolsTitle: "Herramienta para preparar una conversación técnica",
    toolsLede: "Una utilidad orientativa para detectar brechas y ordenar información antes de cotizar o intervenir.",
    toolsCta: "Abrir la herramienta",
    collections: [
      { title: "SEO técnico", text: "Rastreo, indexación, renderizado, arquitectura y rendimiento.", href: "/blog" },
      { title: "SEO para ecommerce", text: "Categorías, productos, facetas, demanda y crecimiento orgánico.", href: "/servicios/seo-ecommerce" },
      { title: "SEO para agencias", text: "Operación white label, QA técnico y capacidad especializada.", href: "/seo-para-agencias" },
      { title: "Búsqueda con IA", text: "Entidades, contenido citable, datos estructurados y medición.", href: "/que-es-geo" },
      { title: "Migraciones SEO", text: "Inventario, mapeo, lanzamiento y monitoreo de cambios críticos.", href: "/migraciones-seo" },
    ],
    categoryLabel: {
      "Technical SEO": "SEO técnico",
      "Ecommerce SEO": "SEO para ecommerce",
      "SEO for Agencies": "SEO para agencias",
      "AI Search": "Búsqueda con IA",
      "SEO Migrations": "Migraciones SEO",
    } as Record<string, string>,
  },
  en: {
    path: "/en/resources",
    seoTitle: "SEO resources for agencies and ecommerce | Ferova",
    seoDesc: "Guides and tools on technical SEO, ecommerce, white-label work, migrations and AI search.",
    home: "Home", crumb: "Resources",
    eyebrow: "A library for agencies",
    h1: "Resources to sell, run and deliver SEO work better.",
    lede: "For teams that need to judge technical problems, explain decisions to a client, and extend their delivery capacity.",
    exploreKicker: "Explore by need",
    seeMore: "See resources",
    readingKicker: "Recommended reading",
    readingTitle: "Articles picked by the problem they solve.",
    allPosts: "See all articles",
    blog: "/en/blog",
    toolsTitle: "A tool to prepare a technical conversation",
    toolsLede: "An indicative utility for spotting gaps and organising information before quoting or intervening.",
    toolsCta: "Open the tool",
    collections: [
      { title: "Technical SEO", text: "Crawling, indexation, rendering, architecture and performance.", href: "/en/blog" },
      { title: "Ecommerce SEO", text: "Categories, products, facets, demand and organic growth.", href: "/en/services/ecommerce-seo" },
      { title: "SEO for agencies", text: "White-label delivery, technical QA and senior capacity.", href: "/en/white-label-seo-for-agencies" },
      { title: "AI search", text: "Entities, citable content, structured data and measurement.", href: "/en/what-is-geo" },
      { title: "SEO migrations", text: "Inventory, mapping, launch and monitoring of critical changes.", href: "/en/seo-migration-services" },
    ],
    categoryLabel: {
      "Technical SEO": "Technical SEO",
      "Ecommerce SEO": "Ecommerce SEO",
      "SEO for Agencies": "SEO for agencies",
      "AI Search": "AI search",
      "SEO Migrations": "SEO migrations",
    } as Record<string, string>,
  },
};

export default function SeoResources({ lang = "es" }: { lang?: Lang }) {
  const t = COPY[lang === "en" ? "en" : "es"];
  const isEn = lang === "en";

  return (
    <div className="seo-brand personal-interior-page min-h-screen text-slate-950">
      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        path={t.path}
        lang={lang}
        breadcrumbs={[{ name: t.home, path: isEn ? "/en" : "/" }, { name: t.crumb, path: t.path }]}
      />
      <Header lang={lang} />

      <main className="pt-20">
        <section className="bg-[#541014] py-20 text-white md:py-28">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#e0bd52]">{t.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-tight md:text-6xl">{t.h1}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70">{t.lede}</p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <p className="seo-kicker">{t.exploreKicker}</p>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {t.collections.map((c, i) => {
                const Icon = ICONS[i] ?? FileSearch;
                return (
                  <Link key={c.title} to={c.href} className="seo-bento-card group rounded-3xl p-7">
                    <Icon className="h-7 w-7 text-[#6a4c30]" />
                    <h2 className="mt-7 font-display text-2xl font-bold">{c.title}</h2>
                    <p className="mt-3 leading-7 text-slate-600">{c.text}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[#6a4c30]">
                      {t.seeMore} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#f4eadb] py-20 md:py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="seo-kicker">{t.readingKicker}</p>
                <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">{t.readingTitle}</h2>
              </div>
              <Link to={t.blog} className="inline-flex items-center gap-2 font-semibold text-[#6a4c30]">
                {t.allPosts} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {SEO_EDITORIAL.slice(0, 6).map((post) => (
                <Link key={post.slug} to={`${t.blog}/${post.slug}`} className="seo-bento-card rounded-2xl p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8c6905]">{t.categoryLabel[post.category]}</span>
                  <h3 className="mt-4 font-display text-xl font-bold">{isEn ? post.titleEn : post.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{isEn ? post.excerptEn : post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 rounded-3xl bg-[#3c3c3b] px-8 py-12 text-white md:flex-row md:items-center md:px-12">
            <div>
              <Bot className="h-8 w-8 text-[#e0bd52]" />
              <h2 className="mt-6 font-display text-3xl font-bold">{t.toolsTitle}</h2>
              <p className="mt-3 max-w-2xl text-white/70">{t.toolsLede}</p>
            </div>
            <Link to={TOOL} className="seo-primary-button shrink-0">
              {t.toolsCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
