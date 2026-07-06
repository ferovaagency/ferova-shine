import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

// Polyfills SSR a nivel de proceso Node — el bundle prerender se importa
// dinámicamente vía `await import()` y comparte globalThis con este proceso.
// Se instalan aquí para garantizar que existan ANTES de que cualquier módulo
// (Supabase client, etc.) toque localStorage/window en tiempo de import.
{
  const memStore = new Map<string, string>();
  const stub = {
    getItem: (k: string) => memStore.get(k) ?? null,
    setItem: (k: string, v: string) => void memStore.set(k, String(v)),
    removeItem: (k: string) => void memStore.delete(k),
    clear: () => memStore.clear(),
    key: (i: number) => Array.from(memStore.keys())[i] ?? null,
    get length() { return memStore.size; },
  };
  const g = globalThis as unknown as Record<string, unknown>;
  if (typeof g.window === "undefined") g.window = g;
  if (typeof g.localStorage === "undefined") g.localStorage = stub;
  if (typeof g.sessionStorage === "undefined") g.sessionStorage = stub;
  if (typeof g.navigator === "undefined") g.navigator = { userAgent: "node" };
  if (typeof g.location === "undefined") {
    g.location = { hostname: "seoparaecommerce.co", href: "https://seoparaecommerce.co/", pathname: "/", search: "", hash: "" };
  }
  if (typeof g.document === "undefined") {
    const el = () => ({
      setAttribute: () => {}, getAttribute: () => null, removeAttribute: () => {},
      appendChild: (c: unknown) => c, removeChild: (c: unknown) => c, insertBefore: (c: unknown) => c,
      addEventListener: () => {}, removeEventListener: () => {},
      style: {}, classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
      children: [], childNodes: [], firstChild: null, parentNode: null, nextSibling: null,
      innerHTML: "", textContent: "", nodeType: 1, tagName: "DIV",
    });
    g.document = {
      addEventListener: () => {}, removeEventListener: () => {},
      createElement: () => el(),
      createElementNS: () => el(),
      createTextNode: (t: string) => ({ nodeType: 3, textContent: String(t) }),
      createDocumentFragment: () => el(),
      documentElement: { style: {}, scrollHeight: 0, clientHeight: 0, lang: "es", classList: { add: () => {}, remove: () => {} } },
      body: { appendChild: () => {}, scrollHeight: 0, style: {}, classList: { add: () => {}, remove: () => {} } },
      head: { appendChild: () => {}, firstChild: null, insertBefore: () => {} },
      getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
      getElementsByTagName: () => [{ appendChild: () => {}, firstChild: null, insertBefore: () => {} }],
      hidden: false,
    };
  }
  if (typeof g.MutationObserver === "undefined") g.MutationObserver = class { observe(){} disconnect(){} takeRecords(){return []} };
  if (typeof g.IntersectionObserver === "undefined") g.IntersectionObserver = class { observe(){} disconnect(){} unobserve(){} takeRecords(){return []} };
  if (typeof g.ResizeObserver === "undefined") g.ResizeObserver = class { observe(){} disconnect(){} unobserve(){} };
  if (typeof g.matchMedia === "undefined") g.matchMedia = () => ({ matches: false, media: "", addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, onchange: null, dispatchEvent: () => false });
}

// Rutas estáticas que se prerenderizan a HTML. Blog/casos/newsletter se descubren
// dinámicamente vía `additionalPrerenderRoutes` (ver script prerender.tsx).
const STATIC_ROUTES = [
  "/", "/servicios", "/servicios/seo-ecommerce", "/servicios/diseno-web",
  "/servicios/descuentos-herramientas", "/servicios/asesorias-marketing",
  "/servicios/optimizacion-linkedin", "/servicios/contenido-linkedin",
  "/precios", "/casos-de-exito", "/contacto", "/blog", "/recursos", "/nosotros",
  "/terminos", "/privacidad", "/cookies",
  "/consultoria-estrategica", "/capacitacion-ia",
  "/recursos/analizador-contratos", "/recursos/comparador-propuestas",
  "/recursos/briefing-newsletter",
  "/newsletter", "/newsletter/archivo", "/newsletter-pro",
  // EN
  "/en", "/en/services", "/en/services/ecommerce-seo", "/en/services/web-design",
  "/en/services/tool-discounts", "/en/services/marketing-consulting",
  "/en/services/linkedin-optimization", "/en/services/linkedin-content",
  "/en/pricing", "/en/case-studies", "/en/contact", "/en/blog", "/en/resources",
  "/en/about", "/en/terms", "/en/privacy", "/en/cookies",
  "/en/strategy-advisory", "/en/ai-training",
  "/en/resources/contract-analyzer", "/en/resources/proposal-comparator",
  "/en/resources/newsletter-briefing", "/en/newsletter", "/en/newsletter/archive",
  "/en/newsletter-pro",
  // PT
  "/pt", "/pt/servicos", "/pt/seo-ecommerce", "/pt/design-web", "/pt/ferramentas",
  "/pt/consultorias", "/pt/linkedin", "/pt/conteudo-linkedin",
  "/pt/precos", "/pt/casos-de-sucesso", "/pt/contato", "/pt/blog", "/pt/recursos",
  "/pt/sobre-nos", "/pt/termos", "/pt/privacidade", "/pt/cookies",
  "/pt/consultoria-estrategica", "/pt/treinamento-ia",
  "/pt/recursos/analisador-contratos", "/pt/recursos/comparador-propostas",
  "/pt/recursos/briefing-newsletter", "/pt/newsletter", "/pt/newsletter/arquivo",
  "/pt/newsletter-pro",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode !== "development" && vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: path.resolve(__dirname, "./src/prerender.tsx"),
      additionalPrerenderRoutes: STATIC_ROUTES,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
