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
  // ⚠️ NO stubear `window` ni `document`: muchas libs (react-helmet-async,
  // framer-motion) usan `typeof window !== "undefined"` para decidir si
  // ejecutar código de DOM. Solo polyfilleamos lo estrictamente necesario
  // para que módulos como el cliente de Supabase (que accede a `localStorage`
  // sin guard alguno en tiempo de import) no lancen ReferenceError.
  if (typeof g.localStorage === "undefined") g.localStorage = stub;
  if (typeof g.sessionStorage === "undefined") g.sessionStorage = stub;
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
