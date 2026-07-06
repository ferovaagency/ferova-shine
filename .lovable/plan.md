# Plan: Prerender / SSG con `vite-react-ssg`

Meta: que `view-source` de cada ruta pública devuelva HTML con el contenido renderizado — hero, secciones, textos, meta tags — para GPTBot, ClaudeBot y PerplexityBot, sin depender de JS.

## Antes de empezar — confirmaciones necesarias

El proyecto tiene ~50 rutas estáticas y varias **rutas dinámicas** (`/blog/:slug`, `/casos-de-exito/:id`, `/newsletter/edicion/:slug`, `/admin-blog`, `/newsletter/admin`, `/contacto-digital`). Necesito saber cómo tratarlas:

1. **Blog / Casos / Ediciones de Newsletter** — el contenido vive en la base (Supabase). Para prerenderizarlos hay dos opciones:
   - (a) Consultar la DB en build-time y generar un HTML por slug (recomendado para SEO/AI bots, requiere que el build tenga acceso al anon key — ya está en `.env`).
   - (b) Dejar esas rutas como SPA (sin prerender) y solo prerenderizar rutas estáticas.
2. **Rutas admin** (`/admin-blog`, `/newsletter/admin`) — se excluyen del prerender (requieren auth).
3. **Hostname multi-idioma**: hoy `lang` se decide con `window.location.hostname`. En SSG no hay `window`. Se necesita pasar `lang` por prop desde el árbol de rutas SSG en vez de leer hostname — se hará por rama de ruta (`/en/*` → en, `/pt/*` → pt, resto → es).

## Cambios técnicos

1. **Instalar** `vite-react-ssg` y ajustar `vite.config.ts` con el plugin. Añadir script `build` que ejecute SSG.
2. **Refactor de routing**: pasar de `BrowserRouter` + `<Routes>` inline en `App.tsx` a un array de rutas exportado (`src/routes.tsx`) consumible por `vite-react-ssg` (usa `createBrowserRouter`-style con `Route` objects). Los ~90 `<Route>` actuales se migran uno a uno preservando `lazy()`.
3. **Entry SSG**: crear `src/main.tsx` que use `ViteReactSSG(routerOptions, setup)` con `HelmetProvider` y `QueryClientProvider` en el `setup` para que `react-helmet-async` capture el `<title>` y meta por ruta.
4. **Eliminar dependencia de `window` en el render inicial**:
   - `use-lang-from-host.ts`: fallback a `es` en server; en cliente re-hidrata desde hostname (ya no se pasa como prop global, cada ruta declara su lang).
   - Componentes que usan `window`/`localStorage` en render (`CookieBanner`, `SocialProofToasts`, `AiAdvisorChat`, `ChatWidget`, `ExitIntentPopup`, tracking utils) se envuelven con guard `typeof window !== 'undefined'` o se mueven dentro de `useEffect`. Auditaría cada uno.
5. **Rutas dinámicas** (según tu respuesta arriba):
   - Si opción (a): función `includedRoutes()` en `vite.config` que fetchea slugs de Supabase y expande `/blog/:slug` → lista real.
   - Si opción (b): esas rutas quedan como `dynamicOnly` y responden un HTML shell (comportamiento actual).
6. **Hosting**: Vercel ya está configurado. Ajustar `vercel.json` para servir los `.html` generados y mantener fallback SPA solo para rutas no prerender.
7. **Validación**: script `npm run build` genera `dist/index.html`, `dist/servicios/index.html`, etc. Se hace `curl http://localhost:4173/servicios` (via `vite preview`) y `grep` del hero copy para confirmar que aparece en el HTML crudo — no en un `<div id="root"></div>` vacío. Se probará también con `curl -A "GPTBot"`.

## Alcance / riesgos

- Es una **refactorización estructural** de `App.tsx`, `main.tsx` y de cualquier componente que use `window` en render. Estimo tocar ~15-25 archivos.
- Widgets globales (chat Fera, exit-intent, social proof, cookie banner) seguirán siendo client-only — se renderizan tras `useEffect`, no aparecerán en el HTML prerender (esto es correcto: no son contenido indexable).
- El header/footer y el contenido principal de cada página **sí** aparecerán en el HTML final — que es lo que los bots necesitan.
- Alternativa más ligera (`vite-plugin-prerender` / `react-snap`) usa un Chrome headless post-build. Es menos invasivo pero más frágil con Helmet + rutas dinámicas. `vite-react-ssg` es la vía recomendada por el ecosistema Vite hoy y es lo que pediste.

## Necesito que confirmes

1. **Rutas dinámicas** (blog/casos/newsletter): ¿opción **(a)** prerender por slug consultando la base en build, u **(b)** dejarlas como SPA?
2. **Ediciones futuras del blog**: si eliges (a), cada vez que publiques un post nuevo necesitas un rebuild+deploy para que exista el HTML estático. ¿OK?

Con eso arrancado, ejecuto la migración completa y te confirmo con la salida de `curl` de varias rutas.
