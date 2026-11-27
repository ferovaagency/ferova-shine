/**
 * ============================================================================
 *  scripts/generate-llms.ts
 * ============================================================================
 *  Genera public/llms.txt desde el registro central (src/config/routes.ts).
 *  Se ejecuta dentro de `vite build` vía el plugin `seoBuildPlugin`
 *  (vite.config.ts), igual que el sitemap.
 *
 *  Antes llms.txt era un archivo estático mantenido a mano: describía la
 *  agencia anterior ("web apps, entrega en 1 semana"), enlazaba páginas que
 *  hoy devuelven 301 (/nosotros, /sobre-maria-fer, /precios…) y no listaba las
 *  páginas nuevas. Ahora:
 *    - Solo entran rutas con `indexable: true`, en los idiomas de `LANGS`
 *      (es, en). El portugués es legado fuera del SEO, como en el sitemap.
 *    - Los precios y las descripciones de las páginas de servicio se leen del
 *      mismo contenido que renderiza la página (src/content/*).
 *    - El build se CAE si una ruta indexable no tiene descripción aquí, si una
 *      URL del archivo coincide con un `source` de redirección de vercel.json,
 *      o si en src/App.tsx no existe como <Route> o es un <Navigate>.
 *
 *  Cómo añadir una página: regístrala en routes.ts y añade su entrada en
 *  ENTRIES (sección + una línea por idioma, basada en el contenido real).
 * ============================================================================
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { ROUTES, LANGS, SITE_ORIGIN, type Lang } from "../src/config/routes";
import { SEO_SPECIALTIES, SEO_HOURS_ES } from "../src/content/seoSpecialties";
import { POSITIONING } from "../src/content/positioning";
import { PERSONAL_HOME } from "../src/content/personalHome";
import { WL_SEO } from "../src/content/whiteLabelVsInHouse";
import { BEST_PROVIDERS } from "../src/content/bestProviders";
import { FOUNDER, DIRECTORIES } from "../src/data/founder";

type Section = "servicios" | "comparativas" | "sobre" | "geo" | "contenido" | "legal";

const SECTION_TITLES: Record<Section, string> = {
  servicios: "Servicios",
  comparativas: "Comparativas (inglés)",
  sobre: "Sobre María Fernanda y Ferova",
  geo: "Búsqueda con IA (GEO)",
  contenido: "Contenido, casos y contacto",
  legal: "Optional",
};

const SECTION_ORDER: Section[] = ["servicios", "comparativas", "sobre", "geo", "contenido", "legal"];

interface Entry {
  section: Section;
  /** Título del enlace por idioma. */
  title: Partial<Record<Lang, string>>;
  /** Una línea por idioma, basada en el contenido real de la página. */
  desc: Partial<Record<Lang, string>>;
}

const S = SEO_SPECIALTIES;

/** Una entrada por `id` de ROUTES. Las rutas indexables sin entrada rompen el build. */
const ENTRIES: Record<string, Entry> = {
  home: {
    section: "contenido",
    title: { es: "Inicio", en: "Home (EN)" },
    desc: { es: PERSONAL_HOME.es.seoDesc, en: PERSONAL_HOME.en.seoDesc },
  },
  "seo-para-agencias": {
    section: "servicios",
    title: { es: "SEO marca blanca para agencias", en: "White label SEO for agencies (EN)" },
    desc: { es: S.es.agencies.description, en: S.en.agencies.description },
  },
  "seo-por-horas": {
    section: "servicios",
    title: { es: "SEO por horas para agencias" },
    desc: { es: SEO_HOURS_ES.description },
  },
  "auditoria-seo-tecnica": {
    section: "servicios",
    title: { es: "Auditoría SEO técnica", en: "Technical SEO audit services (EN)" },
    desc: { es: S.es.audit.description, en: S.en.audit.description },
  },
  "migraciones-seo": {
    section: "servicios",
    title: { es: "Migraciones SEO", en: "SEO migration services (EN)" },
    desc: { es: S.es.migrations.description, en: S.en.migrations.description },
  },
  "seo-ecommerce": {
    section: "servicios",
    title: { es: "SEO para ecommerce", en: "Ecommerce SEO (EN)" },
    desc: {
      es: "Consultoría SEO senior para ecommerce: arquitectura de catálogo, SEO técnico, migraciones, contenido y preparación para AI Search.",
      en: "SEO for online stores aimed at Google rankings and at being cited by ChatGPT, Perplexity and AI Overviews, with GEO included.",
    },
  },
  "map-ranking-alternative": {
    section: "comparativas",
    title: { en: "Map Ranking alternative for ecommerce white label SEO" },
    desc: { en: POSITIONING["map-ranking-alternative"].metaDescription },
  },
  "best-white-label-seo-providers": {
    section: "comparativas",
    title: { en: "Best white label SEO providers for ecommerce" },
    desc: { en: BEST_PROVIDERS.metaDescription },
  },
  "white-label-vs-in-house": {
    section: "comparativas",
    title: { en: "White label SEO vs in-house SEO" },
    desc: { en: WL_SEO.description },
  },
  "sobre-nosotros-seo": {
    section: "sobre",
    title: { es: "María Fernanda Calderón, Fractional SEO", en: "María Fernanda Calderón, Fractional SEO (EN)" },
    desc: {
      es: `Perfil de María Fernanda Calderón, Fractional SEO en Ferova, con ${FOUNDER.yearsExperience} años en SEO y marketing digital: especialidades, principios de trabajo, formación y certificaciones.`,
      en: `Profile of María Fernanda Calderón, Fractional SEO at Ferova, with ${FOUNDER.yearsExperience} years in SEO and digital marketing: specialties, working principles, education and certifications.`,
    },
  },
  "que-es-geo": {
    section: "geo",
    title: { es: "¿Qué es GEO?", en: "What is GEO? (EN)" },
    desc: {
      es: "Definición de Generative Engine Optimization: optimizar una marca para que la citen ChatGPT, Perplexity, Gemini y Claude; pilares y diferencias con el SEO.",
      en: "Definition of Generative Engine Optimization: optimizing a brand to be cited by ChatGPT, Perplexity, Gemini and Claude; pillars and how it differs from SEO.",
    },
  },
  "geo-vs-seo": {
    section: "geo",
    title: { es: "GEO vs SEO", en: "GEO vs SEO (EN)" },
    desc: {
      es: "Comparación de objetivo, canal, señales y métricas de GEO y SEO para decidir cuál necesita un ecommerce.",
      en: "Comparison of goal, channel, signals and metrics for GEO and SEO, to decide which an ecommerce needs.",
    },
  },
  "geo-para-shopify": {
    section: "geo",
    title: { es: "GEO para Shopify", en: "GEO for Shopify (EN)" },
    desc: {
      es: "GEO para tiendas Shopify: metafields, schema Product/Offer y feeds estructurados para que los LLM citen el catálogo.",
      en: "GEO for Shopify stores: metafields, Product/Offer schema and structured feeds so LLMs can cite the catalog.",
    },
  },
  "geo-para-woocommerce": {
    section: "geo",
    title: { es: "GEO para WooCommerce", en: "GEO for WooCommerce (EN)" },
    desc: {
      es: "GEO para tiendas WooCommerce/WordPress: schema sin conflictos entre plugins, feeds de producto y contenido citable por IA.",
      en: "GEO for WooCommerce/WordPress stores: schema without plugin conflicts, product feeds and AI-citable content.",
    },
  },
  "geo-para-vtex": {
    section: "geo",
    title: { es: "GEO para VTEX", en: "GEO for VTEX (EN)" },
    desc: {
      es: "GEO para operaciones VTEX en LATAM: catálogos grandes, VTEX IO, arquitectura headless y datos estructurados a escala.",
      en: "GEO for VTEX operations in LATAM: large catalogs, VTEX IO, headless architecture and structured data at scale.",
    },
  },
  "estudio-visibilidad-ia": {
    section: "geo",
    title: { es: "Estudio de visibilidad IA en ecommerce hispano 2026", en: "AI visibility study of Spanish-speaking ecommerce 2026 (EN)" },
    desc: {
      es: "Metodología abierta para medir si ChatGPT, Perplexity, Gemini y Claude citan a tiendas online hispanohablantes, con consultas no branded por categoría.",
      en: "Open methodology to measure whether ChatGPT, Perplexity, Gemini and Claude cite Spanish-speaking online stores, using non-branded queries by category.",
    },
  },
  "calculadora-visibilidad-ia": {
    section: "geo",
    title: { es: "Evaluador de preparación para AI Search", en: "AI visibility calculator (EN)" },
    desc: {
      es: "Autoevaluación gratuita de las bases técnicas, de contenido y de autoridad de un ecommerce para AI Search. Resultado orientativo; no mide menciones reales.",
      en: "Free questionnaire that estimates how citable an online store is for ChatGPT, Perplexity and Gemini.",
    },
  },
  "evaluador-preparacion-ai-search": {
    section: "geo",
    title: { es: "Evaluador de preparación para AI Search (recursos)" },
    desc: {
      es: "La misma autoevaluación de preparación para AI Search, enlazada desde la sección de recursos.",
    },
  },
  "casos-de-exito": {
    section: "contenido",
    title: { es: "Experiencia con agencias", en: "Case studies (EN)" },
    desc: {
      es: "Experiencia white label en SEO técnico, mantenimiento web y landing pages por tarea, bolsa de horas o capacidad mensual para agencias.",
      en: "Client case studies with the work done and its results.",
    },
  },
  blog: {
    section: "contenido",
    title: { es: "Blog", en: "Blog (EN)" },
    desc: {
      es: "Análisis y guías sobre SEO técnico, ecommerce, trabajo con agencias, migraciones y búsqueda con IA.",
      en: "Articles on SEO, ecommerce and AI search in English.",
    },
  },
  recursos: {
    section: "contenido",
    title: { es: "Recursos", en: "Resources (EN)" },
    desc: {
      es: "Guías y herramientas sobre SEO técnico, ecommerce, trabajo white label, migraciones y búsqueda con IA.",
      en: "Guides and tools on technical SEO, ecommerce, white-label work, migrations and AI search.",
    },
  },
  newsletter: {
    section: "contenido",
    title: { es: "Newsletter de SEO técnico para agencias", en: "Technical SEO newsletter for agencies (EN)" },
    desc: {
      es: "Newsletter de María Fernanda Calderón, Fractional SEO en Ferova: SEO técnico, ecommerce y migraciones explicados para dueños de agencia.",
      en: "Newsletter by María Fernanda Calderón, Fractional SEO at Ferova: technical SEO, ecommerce and migrations explained for agency owners.",
    },
  },
  contacto: {
    section: "contenido",
    title: { es: "Contacto", en: "Contact (EN)" },
    desc: {
      es: "Formulario para describir la habilidad, el volumen y la fecha que necesita la agencia, y recibir alcance, precio y disponibilidad.",
      en: "Contact form and direct channels.",
    },
  },
  terminos: { section: "legal", title: { es: "Términos", en: "Terms (EN)" }, desc: {} },
  privacidad: { section: "legal", title: { es: "Política de privacidad", en: "Privacy policy (EN)" }, desc: {} },
  cookies: { section: "legal", title: { es: "Cookies", en: "Cookies (EN)" }, desc: {} },
};

/** Enlaces fuera de seoparaecommerce.co que sí forman parte del perfil. */
const EXTERNAL_LINKS: { section: Section; title: string; url: string; desc: string }[] = [
  {
    section: "sobre",
    title: "Portafolio",
    url: FOUNDER.portfolio,
    desc: "Proyectos seleccionados de María Fer Calderón, publicados en ferova.com.co.",
  },
  {
    section: "sobre",
    title: "LinkedIn",
    url: FOUNDER.linkedin,
    desc: "Perfil profesional, credenciales y recomendaciones.",
  },
  {
    section: "sobre",
    title: "Ferova",
    url: "https://ferova.com.co",
    desc: "Software, SaaS y automatizaciones a la medida con IA y low-code.",
  },
  // Directorios verificados de src/data/founder.ts (los mismos que muestra "Sobre mí").
  ...DIRECTORIES.map((d) => ({
    section: "sobre" as Section,
    title: `Ferova en ${d.name}`,
    url: d.url,
    desc: `${d.status.es}.`,
  })),
  {
    section: "sobre",
    title: "Ferova en Notion Marketplace",
    url: "https://www.notion.com/es/@ferova",
    desc: "Plantillas de Notion publicadas por Ferova.",
  },
];

/** "1250" → "1.250" (separador de miles en español), sin depender de ICU. */
function formatUsd(n: number): string {
  const [int, dec] = n.toFixed(2).split(".");
  const miles = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `USD ${miles}${dec === "00" ? "" : `,${dec}`}`;
}

function header(): string {
  const pricing = S.es.agencies.pricing;
  const plans = pricing?.plans ?? [];
  const line = (p: { name: string; price: number; unit: string; description: string }) =>
    `- ${p.name}: ${formatUsd(p.price)} ${p.unit}. ${p.description}`;
  const priceLines = plans.map(line);
  // /seo-por-horas publica la hora suelta y paquetes; el bloque de 20 h ya está arriba.
  const listed = new Set(plans.map((p) => `${p.price}|${p.unit}`));
  const hourLines = (SEO_HOURS_ES.pricing?.plans ?? [])
    .filter((p) => !listed.has(`${p.price}|${p.unit}`))
    .map(line);

  return [
    `# Ferova · ${FOUNDER.name}, Fractional SEO`,
    "",
    `> En Ferova, ${FOUNDER.name} (${FOUNDER.alternateName}) trabaja como Fractional SEO: SEO técnico senior y SEO marca blanca (white label) para agencias de marketing, enfocado en ecommerce. Auditorías técnicas, arquitectura de catálogo, navegación facetada y migraciones de plataforma, entregadas bajo la marca de la agencia.`,
    "",
    `Trato directo con ${FOUNDER.alternateName}, que suma ${FOUNDER.yearsExperience} años en SEO y marketing digital. Trabajo remoto desde Colombia, con agencias y clientes en varios países. No hace SEO local ni campañas centradas en Google Maps. El sitio está en español (raíz) y en inglés (/en).`,
    "",
    "## Precios publicados",
    "",
    `${pricing?.intro ?? ""}`.trim(),
    "",
    ...priceLines,
    ...(hourLines.length
      ? ["", `SEO por horas (${SITE_ORIGIN}${SEO_HOURS_ES.path}), al mismo valor por hora que el bloque de 20 horas:`, "", ...hourLines]
      : []),
    "",
    [pricing?.guarantee, pricing?.currencyNote].filter(Boolean).join(" "),
  ].join("\n");
}

function readRedirectSources(root: string): Set<string> {
  const vercel = JSON.parse(readFileSync(resolve(root, "vercel.json"), "utf8")) as {
    redirects?: { source: string; has?: unknown }[];
  };
  // Las reglas con `has` (host) solo aplican al dominio seoforecommerces.co.
  return new Set((vercel.redirects ?? []).filter((r) => !r.has).map((r) => r.source));
}

export interface GenerateLlmsOptions {
  outPath?: string;
}

export interface GenerateLlmsResult {
  errors: string[];
  count: number;
}

export function generateLlms(opts: GenerateLlmsOptions = {}): GenerateLlmsResult {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const root = resolve(__dirname, "..");
  const out = opts.outPath ?? resolve(root, "public/llms.txt");
  const errors: string[] = [];

  const redirects = readRedirectSources(root);
  const appSrc = readFileSync(resolve(root, "src/App.tsx"), "utf8");
  const langs = LANGS.filter((l) => l !== "pt");

  const lines: Record<Section, string[]> = {
    servicios: [], comparativas: [], sobre: [], geo: [], contenido: [], legal: [],
  };

  for (const route of ROUTES) {
    if (!route.indexable) continue;
    const entry = ENTRIES[route.id];
    if (!entry) {
      errors.push(`Ruta indexable sin entrada en scripts/generate-llms.ts: "${route.id}"`);
      continue;
    }
    for (const lang of langs) {
      const path = route.paths[lang];
      if (!path) continue;
      const title = entry.title[lang];
      const desc = entry.desc[lang];
      if (!title || (entry.section !== "legal" && !desc)) {
        errors.push(`Falta título o descripción (${lang}) para "${route.id}" en scripts/generate-llms.ts`);
        continue;
      }
      if (redirects.has(path)) {
        errors.push(`"${path}" (${route.id}) es origen de una redirección en vercel.json`);
      }
      const routeLine = appSrc.split("\n").find((l) => l.includes(`path="${path}"`));
      if (!routeLine) {
        errors.push(`"${path}" (${route.id}) no tiene <Route> literal en src/App.tsx`);
      } else if (routeLine.includes("<Navigate")) {
        errors.push(`"${path}" (${route.id}) redirige en src/App.tsx (<Navigate>)`);
      }
      const url = path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
      lines[entry.section].push(desc ? `- [${title}](${url}): ${desc}` : `- [${title}](${url})`);
    }
  }

  for (const link of EXTERNAL_LINKS) {
    lines[link.section].push(`- [${link.title}](${link.url}): ${link.desc}`);
  }

  const body = SECTION_ORDER.filter((s) => lines[s].length)
    .map((s) => `## ${SECTION_TITLES[s]}\n\n${lines[s].join("\n")}`)
    .join("\n\n");

  const count = Object.values(lines).reduce((n, l) => n + l.length, 0);
  if (!errors.length) {
    writeFileSync(out, `${header()}\n\n${body}\n`, "utf8");
    console.log(`[llms] ${count} enlaces escritos en ${out}`);
  }
  return { errors, count };
}
