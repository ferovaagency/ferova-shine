import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
// Fuente única de rutas — el prerender ahora se deriva del registro central
// (src/config/routes.ts), no de una lista duplicada aquí. Añadir una página
// al registro la incluye automáticamente en el HTML estático.
import { PRERENDER_ROUTES } from "./src/config/routes";
import { validateRoutes } from "./scripts/validate-routes";
import { generateSitemap } from "./scripts/generate-sitemap";

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
  // framer-motion / motion-dom llaman addEventListener sobre `window` en tiempo
  // de import. Node no expone estos métodos en globalThis; los apagamos con
  // no-ops para que el prerender no explote.
  if (typeof (g as { addEventListener?: unknown }).addEventListener === "undefined") {
    (g as { addEventListener: () => void }).addEventListener = () => {};
    (g as { removeEventListener: () => void }).removeEventListener = () => {};
  }
}

// Rutas estáticas que se prerenderizan a HTML — derivadas del registro central
// (src/config/routes.ts). Blog/casos/newsletter/ediciones se descubren
// dinámicamente vía `additionalPrerenderRoutes` (ver src/prerender.tsx).
const STATIC_ROUTES = PRERENDER_ROUTES;

// Prerender activo por defecto — ES ahora la fuente de HTML indexable para
// buscadores y crawlers de IA. Puede desactivarse temporalmente con `PRERENDER=0`.
const enablePrerender = process.env.PRERENDER !== "0";

/**
 * Plugin SEO de build — corre SOLO en `vite build` (no en dev):
 *  1) Valida el registro central de rutas (rompe el build si hay errores).
 *  2) Regenera public/sitemap.xml desde ese registro (+ contenido dinámico).
 *
 * Se hace como plugin (y no como script `tsx` en el package.json) para NO
 * añadir dependencias: este repo usa bun.lockb y una dep nueva en package.json
 * que no esté en el lockfile puede romper el install en Vercel. vite.config ya
 * compila TS, así que importar los módulos de scripts/ no cuesta nada.
 */
function seoBuildPlugin(env: Record<string, string>): Plugin {
  return {
    name: "ferova-seo-build",
    apply: "build",
    async buildStart() {
      const { errors, warnings } = validateRoutes();
      warnings.forEach((w) => this.warn(w));
      if (errors.length) {
        this.error(
          `Registro de rutas inválido (src/config/routes.ts):\n - ${errors.join("\n - ")}`,
        );
      }
      await generateSitemap({
        supabaseUrl: env.VITE_SUPABASE_URL,
        supabaseKey: env.VITE_SUPABASE_PUBLISHABLE_KEY,
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      mode !== "development" && seoBuildPlugin(env),
      mode !== "development" && enablePrerender && vitePrerenderPlugin({
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
  };
});
