/**
 * ============================================================================
 *  FEROVA · REGISTRO CENTRAL DE RUTAS  (single source of truth)
 * ============================================================================
 *
 *  Este archivo es la ÚNICA fuente de verdad para las rutas estáticas del sitio.
 *  De aquí se derivan automáticamente:
 *    - Las rutas que se prerenderizan  (vite.config.ts → STATIC_ROUTES)
 *    - El sitemap.xml                  (scripts/generate-sitemap.mjs)
 *    - Los hreflang / alternates       (src/components/SEO.tsx)
 *    - Las validaciones de build       (scripts/validate-routes.mjs)
 *
 *  ⚠️ Antes existía duplicación manual en: App.tsx, vite.config.ts,
 *  public/sitemap.xml, public/llms.txt y la navegación. Añadir una página
 *  significaba tocar 4-5 sitios y era fácil olvidar el sitemap o el prerender.
 *  Ahora se declara UNA vez aquí y el resto se genera.
 *
 *  Cómo añadir una página nueva:
 *    1. Añade un objeto a ROUTES con los paths de los idiomas que sí mantendrás,
 *       además de type e indexable.
 *    2. Declara sus <Route> en App.tsx (esto sigue siendo manual: el registro
 *       describe la arquitectura SEO, no reemplaza al Router).
 *    3. Corre `npm run build` — sitemap y prerender se actualizan solos.
 *
 *  Las rutas DINÁMICAS (blog/:slug, casos/:id, newsletter/edicion/:slug) NO
 *  viven aquí: se descubren en build desde Supabase (ver src/prerender.tsx y
 *  scripts/generate-sitemap.mjs).
 * ============================================================================
 */

export type Lang = "es" | "en" | "pt";
/** Mercados públicos mantenidos: español e inglés. Portugués queda como legado fuera del SEO. */
export const LANGS: Lang[] = ["es", "en"];

/**
 * El dominio de producción es único para los 3 idiomas (i18n por path):
 * raíz = español, /en = inglés, /pt = portugués.
 *
 * ⚠️ Hasta 2026-08 `en` apuntaba a https://seoforecommerces.co. Como los paths
 * de ROUTES YA incluyen el prefijo /en, la canónica salía como
 * `https://seoforecommerces.co/en`, y la redirección de vercel.json le añadía
 * otro prefijo: el destino real era `/en/en`, que no existe en App.tsx. Es
 * decir, las páginas en inglés le declaraban a Google una canónica que
 * redirigía a una URL inexistente. Decisión de SEO: dominio canónico único.
 * seoforecommerces.co se conserva SOLO como redirección de entrada.
 */
export const SITE_ORIGIN = "https://seoparaecommerce.co";
export const SITE_ORIGINS: Record<Lang, string> = {
  es: SITE_ORIGIN,
  en: SITE_ORIGIN,
  pt: SITE_ORIGIN,
};

export type RouteType =
  | "core" // home, contacto, nosotros, precios
  | "service" // servicios que se venden
  | "solution" // (Fase 1) hubs por problema — /soluciones/*
  | "method" // (Fase 1) /metodo-ferova
  | "geo" // clúster GEO
  | "content" // blog index, estudios, casos
  | "resource" // recursos / lead magnets
  | "tool" // herramientas interactivas
  | "newsletter"
  | "product" // (Fase 9) /productos, Ferova One
  | "legal";

export type ChangeFreq = "daily" | "weekly" | "monthly" | "yearly";

export interface RouteDef {
  /** Identificador estable, independiente del idioma. */
  id: string;
  /**
   * Path por idioma. Una ruta puede existir solo en los idiomas realmente
   * mantenidos; no se crean traducciones de relleno para completar la matriz.
   */
  paths: Partial<Record<Lang, string>>;
  type: RouteType;
  /** ¿Aparece en sitemap y es indexable? (false = noindex, fuera del sitemap) */
  indexable: boolean;
  /** ¿Se prerenderiza a HTML estático en build? */
  prerender: boolean;
  /** Prioridad para el sitemap (0.0–1.0). Default por tipo si se omite. */
  priority?: number;
  /** changefreq para el sitemap. Default por tipo si se omite. */
  changefreq?: ChangeFreq;
}

/** Defaults de sitemap por tipo, usados cuando la ruta no los especifica. */
const TYPE_DEFAULTS: Record<RouteType, { priority: number; changefreq: ChangeFreq }> = {
  core: { priority: 0.7, changefreq: "monthly" },
  service: { priority: 0.9, changefreq: "monthly" },
  solution: { priority: 0.8, changefreq: "monthly" },
  method: { priority: 0.7, changefreq: "monthly" },
  geo: { priority: 0.8, changefreq: "monthly" },
  content: { priority: 0.8, changefreq: "weekly" },
  resource: { priority: 0.7, changefreq: "monthly" },
  tool: { priority: 0.8, changefreq: "monthly" },
  newsletter: { priority: 0.6, changefreq: "weekly" },
  product: { priority: 0.8, changefreq: "monthly" },
  legal: { priority: 0.3, changefreq: "yearly" },
};

/**
 * ROUTES — arquitectura estática actual de seoparaecommerce.co.
 *
 * ⚠️ Estos paths están CONGELADOS (Fase 0, Paso 2): Google ya los conoce.
 * No cambiar los `paths` de rutas existentes sin añadir el 301 correspondiente
 * en vercel.json. Añadir rutas nuevas es seguro.
 */
export const ROUTES: RouteDef[] = [
  // ── Core ──────────────────────────────────────────────────────────────
  { id: "home", type: "core", indexable: true, prerender: true, priority: 1.0, changefreq: "weekly",
    paths: { es: "/", en: "/en", pt: "/pt" } },

  // ── Fase 1: nuevas puertas de entrada (Sprint 2) ──────────────────────
  // /soluciones = hub por problema empresarial (no por servicio).
  // /metodo-ferova = cómo trabaja Ferova (diferenciación).
  { id: "soluciones", type: "solution", indexable: true, prerender: true, priority: 0.9,
    paths: { es: "/soluciones", en: "/en/solutions", pt: "/pt/solucoes" } },
  // Puerta comercial principal (Sprint 4): diagnóstico interactivo + captura.
  { id: "diagnostico-empresarial", type: "solution", indexable: true, prerender: true, priority: 0.9,
    paths: {
      es: "/soluciones/diagnostico-empresarial",
      en: "/en/solutions/business-diagnosis",
      pt: "/pt/solucoes/diagnostico-empresarial",
    } },
  { id: "metodo-ferova", type: "method", indexable: true, prerender: true, priority: 0.8,
    paths: { es: "/metodo-ferova", en: "/en/ferova-method", pt: "/pt/metodo-ferova" } },

  { id: "servicios", type: "service", indexable: true, prerender: true, priority: 0.9,
    paths: { es: "/servicios", en: "/en/services", pt: "/pt/servicos" } },
  // Fase 9 (Sprint 6): productos e ingresos recurrentes. Aún NO en la nav
  // principal (plan Paso 23) — vive en el footer.
  { id: "productos", type: "product", indexable: true, prerender: true, priority: 0.8,
    paths: { es: "/productos", en: "/en/products", pt: "/pt/produtos" } },
  { id: "precios", type: "core", indexable: true, prerender: true, priority: 0.8,
    paths: { es: "/precios", en: "/en/pricing", pt: "/pt/precos" } },
  { id: "casos-de-exito", type: "content", indexable: true, prerender: true, priority: 0.8, changefreq: "monthly",
    paths: { es: "/casos-de-exito", en: "/en/case-studies", pt: "/pt/casos-de-sucesso" } },
  { id: "contacto", type: "core", indexable: true, prerender: true, priority: 0.6,
    paths: { es: "/contacto", en: "/en/contact", pt: "/pt/contato" } },
  { id: "blog", type: "content", indexable: true, prerender: true, priority: 0.8, changefreq: "daily",
    paths: { es: "/blog", en: "/en/blog", pt: "/pt/blog" } },
  { id: "recursos", type: "resource", indexable: true, prerender: true, priority: 0.7,
    paths: { es: "/recursos", en: "/en/resources", pt: "/pt/recursos" } },
  { id: "nosotros", type: "core", indexable: true, prerender: true, priority: 0.6,
    paths: { es: "/nosotros", en: "/en/about", pt: "/pt/sobre-nos" } },

  // ── Servicios ─────────────────────────────────────────────────────────
  { id: "seo-ecommerce", type: "service", indexable: true, prerender: true, priority: 0.9,
    paths: { es: "/servicios/seo-ecommerce", en: "/en/services/ecommerce-seo", pt: "/pt/seo-ecommerce" } },
  { id: "seo-para-agencias", type: "service", indexable: true, prerender: true, priority: 0.9,
    paths: { es: "/seo-para-agencias" } },
  { id: "auditoria-seo-tecnica", type: "service", indexable: true, prerender: true, priority: 0.9,
    paths: { es: "/auditoria-seo-tecnica" } },

  // ── Páginas de posicionamiento (plantilla PositioningPage) ────────────
  // Atacan consultas de comparación en EE.UU. Contenido en src/content/positioning.ts.
  // ⚠️ indexable/prerender en false MIENTRAS falten los datos con fuente
  // (tabla de tarifas y bloque de prueba). Ver los TODO del archivo de
  // contenido. Cuando lleguen las fuentes, ambos pasan a true en un commit.
  { id: "outsource-seo-services", type: "service", indexable: false, prerender: false, priority: 0.9,
    paths: { en: "/en/outsource-seo-services" } },
  { id: "migraciones-seo", type: "service", indexable: true, prerender: true, priority: 0.9,
    paths: { es: "/migraciones-seo" } },
  { id: "sobre-nosotros-seo", type: "core", indexable: true, prerender: true, priority: 0.7,
    paths: { es: "/sobre-nosotros" } },
  { id: "diseno-web", type: "service", indexable: true, prerender: true, priority: 0.9,
    paths: { es: "/servicios/diseno-web", en: "/en/services/web-design", pt: "/pt/design-web" } },
  { id: "consultoria-estrategica", type: "service", indexable: true, prerender: true, priority: 0.9,
    paths: { es: "/consultoria-estrategica", en: "/en/strategy-advisory", pt: "/pt/consultoria-estrategica" } },
  { id: "capacitacion-ia", type: "service", indexable: true, prerender: true, priority: 0.9,
    paths: { es: "/capacitacion-ia", en: "/en/ai-training", pt: "/pt/treinamento-ia" } },
  { id: "asesorias-marketing", type: "service", indexable: true, prerender: true, priority: 0.7,
    paths: { es: "/servicios/asesorias-marketing", en: "/en/services/marketing-consulting", pt: "/pt/consultorias" } },
  { id: "optimizacion-linkedin", type: "service", indexable: true, prerender: true, priority: 0.7,
    paths: { es: "/servicios/optimizacion-linkedin", en: "/en/services/linkedin-optimization", pt: "/pt/linkedin" } },
  { id: "contenido-linkedin", type: "service", indexable: true, prerender: true, priority: 0.7,
    paths: { es: "/servicios/contenido-linkedin", en: "/en/services/linkedin-content", pt: "/pt/conteudo-linkedin" } },
  { id: "descuentos-herramientas", type: "resource", indexable: true, prerender: true, priority: 0.6,
    paths: { es: "/servicios/descuentos-herramientas", en: "/en/services/tool-discounts", pt: "/pt/ferramentas" } },

  // ── Clúster GEO ───────────────────────────────────────────────────────
  { id: "que-es-geo", type: "geo", indexable: true, prerender: true, priority: 0.9,
    paths: { es: "/que-es-geo", en: "/en/what-is-geo", pt: "/pt/o-que-e-geo" } },
  { id: "geo-vs-seo", type: "geo", indexable: true, prerender: true, priority: 0.9,
    paths: { es: "/geo-vs-seo", en: "/en/geo-vs-seo", pt: "/pt/geo-vs-seo" } },
  { id: "geo-para-shopify", type: "geo", indexable: true, prerender: true, priority: 0.8,
    paths: { es: "/geo-para-shopify", en: "/en/geo-for-shopify", pt: "/pt/geo-para-shopify" } },
  { id: "geo-para-woocommerce", type: "geo", indexable: true, prerender: true, priority: 0.8,
    paths: { es: "/geo-para-woocommerce", en: "/en/geo-for-woocommerce", pt: "/pt/geo-para-woocommerce" } },
  { id: "geo-para-vtex", type: "geo", indexable: true, prerender: true, priority: 0.8,
    paths: { es: "/geo-para-vtex", en: "/en/geo-for-vtex", pt: "/pt/geo-para-vtex" } },
  { id: "estudio-visibilidad-ia", type: "content", indexable: true, prerender: true, priority: 0.9, changefreq: "monthly",
    paths: {
      es: "/estudio-visibilidad-ia-ecommerce-hispano-2026",
      en: "/en/ai-visibility-study-hispanic-ecommerce-2026",
      pt: "/pt/estudo-visibilidade-ia-ecommerce-hispano-2026",
    } },
  { id: "calculadora-visibilidad-ia", type: "tool", indexable: true, prerender: true, priority: 0.8,
    paths: {
      es: "/herramientas/calculadora-visibilidad-ia",
      en: "/en/tools/ai-visibility-calculator",
      pt: "/pt/ferramentas/calculadora-visibilidade-ia",
    } },
  { id: "evaluador-preparacion-ai-search", type: "tool", indexable: true, prerender: true, priority: 0.8,
    paths: { es: "/recursos/herramientas/evaluador-preparacion-ai-search" } },

  // ── Recursos / herramientas ───────────────────────────────────────────
  { id: "analizador-contratos", type: "tool", indexable: true, prerender: true, priority: 0.7,
    paths: {
      es: "/recursos/analizador-contratos",
      en: "/en/resources/contract-analyzer",
      pt: "/pt/recursos/analisador-contratos",
    } },
  { id: "comparador-propuestas", type: "tool", indexable: true, prerender: true, priority: 0.7,
    paths: {
      es: "/recursos/comparador-propuestas",
      en: "/en/resources/proposal-comparator",
      pt: "/pt/recursos/comparador-propostas",
    } },
  { id: "briefing-newsletter", type: "resource", indexable: true, prerender: true, priority: 0.8, changefreq: "weekly",
    paths: {
      es: "/recursos/briefing-newsletter",
      en: "/en/resources/newsletter-briefing",
      pt: "/pt/recursos/briefing-newsletter",
    } },

  // ── Laboratorio Ferova (Sprint de diseño: hub de herramientas) ─────────
  { id: "laboratorio-ferova", type: "tool", indexable: true, prerender: true, priority: 0.8,
    paths: { es: "/recursos/herramientas", en: "/en/resources/tools", pt: "/pt/recursos/ferramentas" } },
  { id: "calc-valor-hora", type: "tool", indexable: true, prerender: true, priority: 0.8,
    paths: {
      es: "/recursos/herramientas/calculadora-valor-hora-freelancer",
      en: "/en/resources/tools/freelance-hourly-rate-calculator",
      pt: "/pt/recursos/ferramentas/calculadora-valor-hora-freelancer",
    } },

  // ── Newsletter ────────────────────────────────────────────────────────
  { id: "newsletter", type: "newsletter", indexable: true, prerender: true, priority: 0.6,
    paths: { es: "/newsletter", en: "/en/newsletter", pt: "/pt/newsletter" } },
  { id: "newsletter-archivo", type: "newsletter", indexable: true, prerender: true, priority: 0.5,
    paths: { es: "/newsletter/archivo", en: "/en/newsletter/archive", pt: "/pt/newsletter/arquivo" } },
  { id: "newsletter-pro", type: "newsletter", indexable: true, prerender: true, priority: 0.6, changefreq: "monthly",
    paths: { es: "/newsletter-pro", en: "/en/newsletter-pro", pt: "/pt/newsletter-pro" } },

  // ── Legal ─────────────────────────────────────────────────────────────
  { id: "terminos", type: "legal", indexable: true, prerender: true,
    paths: { es: "/terminos", en: "/en/terms", pt: "/pt/termos" } },
  { id: "privacidad", type: "legal", indexable: true, prerender: true,
    paths: { es: "/privacidad", en: "/en/privacy", pt: "/pt/privacidade" } },
  { id: "cookies", type: "legal", indexable: true, prerender: true,
    paths: { es: "/cookies", en: "/en/cookies", pt: "/pt/cookies" } },
];

// ============================================================================
//  DERIVADOS  (no editar a mano — se calculan desde ROUTES)
// ============================================================================

/** Todas las rutas planas que deben prerenderizarse, en los 3 idiomas. */
export const PRERENDER_ROUTES: string[] = ROUTES.filter((r) => r.prerender).flatMap((r) =>
  LANGS.map((l) => r.paths[l]).filter((path): path is string => Boolean(path)),
);

/** Índice path → { route, lang } para lookups O(1). */
const PATH_INDEX: Map<string, { route: RouteDef; lang: Lang }> = (() => {
  const idx = new Map<string, { route: RouteDef; lang: Lang }>();
  for (const route of ROUTES) {
    for (const lang of LANGS) {
      const path = route.paths[lang];
      if (path) idx.set(normalize(path), { route, lang });
    }
  }
  return idx;
})();

/** Quita query/hash y una barra final redundante (excepto la raíz). */
export function normalize(path: string): string {
  let p = path.split(/[?#]/)[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

/** Devuelve la definición (y su idioma) para un path dado, si existe. */
export function findRoute(path: string): { route: RouteDef; lang: Lang } | undefined {
  return PATH_INDEX.get(normalize(path));
}

/** Idioma de un path por su prefijo (fallback: es). */
export function langOf(path: string): Lang {
  const n = normalize(path);
  if (n === "/en" || n.startsWith("/en/")) return "en";
  if (n === "/pt" || n.startsWith("/pt/")) return "pt";
  return "es";
}

/**
 * Alternates hreflang REALES de un path (no derivados por prefijo).
 * Devuelve el mapa idioma→path si el path pertenece a una ruta registrada;
 * undefined para rutas dinámicas o desconocidas (el consumidor decide fallback).
 */
export function alternatesFor(path: string): Partial<Record<Lang, string>> | undefined {
  const hit = findRoute(path);
  return hit ? hit.route.paths : undefined;
}

/**
 * Rutas DINÁMICAS: no viven en ROUTES (sus slugs salen de Supabase en build),
 * pero su equivalencia entre idiomas sí es mecánica. Se declara aquí para que
 * el selector de idioma funcione también en un artículo o en un caso, que es
 * justo donde más se necesita: alguien que llega a un post desde Google.
 *
 * El orden importa: el prefijo más largo primero, porque /en/newsletter/edition
 * también empieza por /en/newsletter.
 */
const DYNAMIC_PAIRS: { es: string; en: string }[] = [
  { es: "/newsletter/edicion/", en: "/en/newsletter/edition/" },
  { es: "/casos-de-exito/", en: "/en/case-studies/" },
  { es: "/blog/", en: "/en/blog/" },
];

/**
 * Equivalencias de idioma para CUALQUIER path: primero el registro estático,
 * y si no está, las rutas dinámicas. Devuelve undefined cuando la página no
 * tiene equivalente real — y eso es una respuesta válida, no un fallo: el
 * selector debe esconderse ahí en vez de mandar al usuario al home.
 */
export function alternatesForAnyPath(path: string): Partial<Record<Lang, string>> | undefined {
  const stat = alternatesFor(path);
  if (stat) return stat;

  const p = normalize(path);
  for (const pair of DYNAMIC_PAIRS) {
    if (p.startsWith(pair.en)) {
      const slug = p.slice(pair.en.length);
      if (slug) return { es: pair.es + slug, en: p };
    }
    if (p.startsWith(pair.es)) {
      const slug = p.slice(pair.es.length);
      if (slug) return { es: p, en: pair.en + slug };
    }
  }
  return undefined;
}

/** Prioridad efectiva de sitemap para una ruta. */
export function priorityOf(route: RouteDef): number {
  return route.priority ?? TYPE_DEFAULTS[route.type].priority;
}

/** changefreq efectivo de sitemap para una ruta. */
export function changefreqOf(route: RouteDef): ChangeFreq {
  return route.changefreq ?? TYPE_DEFAULTS[route.type].changefreq;
}
