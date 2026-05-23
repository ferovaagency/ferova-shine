# Sesión 2 — Plan de implementación

No tocamos: header, footer, pop-up, asesor IA, banners, cookies (todo de Sesión 1 queda intacto).

## Bloque A — Analytics tracking completo

1. Verificar/agregar GA4 (`G-FPTVQ5XHE6` ya está en `useAnalytics.ts`) en `index.html` con Consent Mode v2 (default denied, gated por `cookie_consent`).
2. Crear `src/lib/analytics.ts` con `trackEvent` tipado y guard de consent desde `localStorage.cookie_consent.analytics`.
3. Crear hook `src/hooks/useScrollTracking.ts` que dispare `scroll_75` (IntersectionObserver) y `time_on_page_60s` (setTimeout) por ruta.
4. Aplicar `trackEvent` en:
   - Header/Footer/CTA: botones WhatsApp (`whatsapp_button_clicked` con `location`)
   - Footer + selectores: redes (`social_click`)
   - `AiAdvisorChat`: open, form submit, message_sent (con msg_number), escalated_whatsapp, product_card_clicked
   - `ExitIntentPopup`: shown/closed/newsletter_signup
   - `CookieBanner`: aceptar_all / essential / customizar
   - Home: service_card_clicked, case_study_clicked, blog_clicked, cta_clicked
   - `Precios`: pricing_card_clicked
   - `Contacto`: contact_form_submitted
5. Montar `useScrollTracking` en layout/`App.tsx` y `trackPageView` en cambios de ruta.

## Bloque B — Home rediseñado (regla 3s + StoryBrand + TAYA)

Reescribir `src/pages/Index.tsx` (y sus secciones) con 6 secciones:
1. **Hero** — H1 claro, sub con audiencia/resultado, 3 stats de confianza (+7 años, 14M COP/mes, #1 Google), CTA WhatsApp + Ver servicios, visual dashboard (reusar asset existente o generar nuevo).
2. **El problema** — 3 cards de dolor (no te encuentran / página parqueada / sin tiempo).
3. **Lo que hacemos por ti** — 4 servicios (Web Apps Ecommerce, SEO+GEO+IAO, WhatsApp IA Bot, Herramientas).
4. **Resultados reales** — 4 métricas + 1 testimonio destacado (Ana María Osorio) + CTA casos.
5. **They Ask You Answer** — 5 FAQs en accordion.
6. **CTA final** — WhatsApp.

Todos los textos i18n (es/en/pt) siguiendo memoria narrativa (sin nombrar tecnologías).

## Bloque C — Servicios reestructurados

1. No hay tabla `services` en DB (los servicios viven en código). Refactor `src/pages/Servicios.tsx` para mostrar SOLO 4 categorías: `seo-geo-iao`, `web-apps-ecommerce`, `whatsapp-ia-bot`, `herramientas-marketing`.
2. Crear landing nueva `src/pages/WhatsappIaBot.tsx` con estructura completa (hero, demo gif/mockup, problema, 3 pasos, casos uso, métricas, precio $100 USD/mes, FAQ, CTA).
3. Crear landing nueva `src/pages/HerramientasMarketing.tsx` con hero, categorías, 6-8 herramientas destacadas, CTA a `/recursos`.
4. Consolidar landing SEO existente (`SeoEcommerce.tsx`) bajo `/servicios/seo-geo-iao` (alias de ruta).
5. Añadir rutas en `App.tsx` y actualizar links internos.

## Bloque D — i18n blogs y casos de éxito

Estrategia híbrida (Opción A + B):
1. Migración SQL: añadir columnas `*_en` y `*_pt` a `blog_posts` (title, excerpt, content, meta_title, meta_description).
2. Como no existe tabla `case_studies` (los casos están hardcoded), traducir directamente en código (i18n estática).
3. Crear edge function `translate-content` que use Lovable AI (`google/gemini-2.5-flash`).
4. En `AdminBlog`: botones "Traducir a EN" / "Traducir a PT" que llamen la edge function y guarden.
5. En `BlogPost.tsx`: leer columna según `lang` con fallback a español.

## Bloque E — SEO local LATAM

1. `index.html`: añadir hreflang (`es-co`, `es-419`, `en`, `pt-br`, `x-default`), meta geo (CO-DC, Bogotá, coords), schema `ProfessionalService` con `areaServed` (CO, MX, PE, CL, AR, BR, ES, US) y `founder` María Fernanda Calderón.
2. Actualizar/extender JSON-LD existente sin romper Organization actual.

## Bloque F — Validación

- Build limpio, sin errores runtime (arreglar también el error actual de `useContext(...)` null si persiste).
- Verificar consola: eventos GA4 sin error.
- Smoke test: home nuevo renderiza, /servicios/whatsapp-ia-bot y /servicios/herramientas-marketing accesibles.

## Notas técnicas
- Edge function nueva requiere bloque en `supabase/config.toml` si necesita non-default settings (no, basta default).
- Migración SQL pedirá aprobación antes de cualquier edit de código que dependa de tipos.
- Mantener tokens de diseño (`text-foreground`, `bg-primary`, etc.), nada de colores directos.
- Respetar memorias: WhatsApp +17865787671, sin mencionar tecnologías, autora Maria Calderon, logo `.png.png`.

¿Apruebas para arrancar? Si quieres lo divido en sub-sesiones (A+E primero, luego B, luego C, luego D) dime.