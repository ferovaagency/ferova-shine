import { Link } from "react-router-dom";
import { Bot, FileSearch, GitBranch, Library, Network } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { SEO_EDITORIAL } from "@/content/seoEditorial";
import { SITE_ORIGIN, type Lang } from "@/config/routes";
import { CtaBand, Eyebrow, FeraButton, FxLink, IconTile, PageHero, Section, SectionHeading } from "@/components/fx/primitives";

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
  const crumbs = [{ name: t.home, path: isEn ? "/en" : "/" }, { name: t.crumb, path: t.path }];
  const reading = SEO_EDITORIAL.slice(0, 6);

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.seoTitle,
    description: t.seoDesc,
    url: `${SITE_ORIGIN}${t.path}`,
    inLanguage: isEn ? "en" : "es",
    isPartOf: { "@type": "WebSite", url: SITE_ORIGIN },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        ...t.collections.map((c) => ({ name: c.title, url: `${SITE_ORIGIN}${c.href}` })),
        ...reading.map((post) => ({ name: isEn ? post.titleEn : post.title, url: `${SITE_ORIGIN}${t.blog}/${post.slug}` })),
        { name: t.toolsTitle, url: `${SITE_ORIGIN}${TOOL}` },
      ].map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })),
    },
  };

  return (
    <div className="fx-site min-h-screen">
      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        path={t.path}
        lang={lang}
        breadcrumbs={crumbs}
        jsonLd={collectionLd}
      />
      <Header lang={lang} />

      <main id="contenido-principal" className="pt-20">
        <PageHero eyebrow={t.eyebrow} title={t.h1} intro={t.lede} breadcrumbs={crumbs.slice(1)} lang={lang} />

        <Section>
          <Eyebrow>{t.exploreKicker}</Eyebrow>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.collections.map((c, i) => {
              const Icon = ICONS[i] ?? FileSearch;
              return (
                <li key={c.title}>
                  <Link to={c.href} className="panel-card group flex h-full flex-col">
                    <IconTile icon={Icon} />
                    <h2 className="text-2xl">{c.title}</h2>
                    <p className="fx-muted mt-3 leading-relaxed">{c.text}</p>
                    <span className="mt-auto pt-6 font-semibold text-[#541014] group-hover:underline">{t.seeMore} →</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section tone="surface">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.readingKicker} title={t.readingTitle} />
            <FxLink to={t.blog} variant="outline" className="shrink-0">{t.allPosts}</FxLink>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reading.map((post) => (
              <li key={post.slug}>
                <Link to={`${t.blog}/${post.slug}`} className="link-tile !p-6">
                  <span className="fx-muted block text-sm font-semibold">{t.categoryLabel[post.category]}</span>
                  <h3 className="mt-3 text-xl leading-snug">{isEn ? post.titleEn : post.title}</h3>
                  <p className="fx-muted mt-3 text-sm leading-relaxed">{isEn ? post.excerptEn : post.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <CtaBand
          title={<><Bot aria-hidden="true" className="mx-auto mb-6 block h-9 w-9 text-[#ffe7a3]" />{t.toolsTitle}</>}
          body={t.toolsLede}
        >
          <FxLink to={TOOL}>{t.toolsCta}</FxLink>
          <FeraButton variant="outline" source={`resources_${isEn ? "en" : "es"}_final`}>{isEn ? "Talk to Fera" : "Hablar con Fera"}</FeraButton>
        </CtaBand>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
