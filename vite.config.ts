import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

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
