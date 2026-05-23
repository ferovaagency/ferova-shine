
# Sesión 1 — Plan de implementación

Voy a ejecutar los 11 bloques en una sola sesión, pero en este orden para que las dependencias funcionen.

## Bloqueante pendiente
- **Favicon**: necesito que adjuntes el archivo (PNG/ICO) en el chat antes de poder reemplazar `public/favicon.ico`. El resto avanza sin él.
- **Secrets Brevo**: ya configurados (`BREVO_API_KEY`, `BREVO_LIST_NEWSLETTER=11`). ✅

## Fase A — Contactos, redes, banderas, fix scroll (sin backend)
1. **Reemplazo global de contactos**: `grep` de cualquier número/email distinto a `+17865787671` y `gerencia@seoparaecommerce.co` y actualizo. Incluye `Footer.tsx`, `chat-widget.tsx`, `ai-advisor-chat.tsx`, secciones de contacto, asesor IA, CTA.
2. **Fix doble scroll**: auditar `ScrollToTop.tsx` y todos los `window.scrollTo` sueltos. Dejar UNA sola implementación con `behavior: 'smooth'`.
3. **Redes sociales reales**: en `Footer.tsx` reemplazar los `href="#"` por los 6 links reales (WhatsApp, LinkedIn, Instagram, Facebook, TikTok, YouTube). Añadir iconos faltantes (Facebook, TikTok, YouTube) con `lucide-react` o SVG.
4. **Selector de idiomas con banderas**: crear `src/components/ui/country-flag.tsx` con SVG inline de 🇪🇸 🇺🇸 🇧🇷 y usarlo en `Header.tsx` reemplazando códigos de texto.

## Fase B — Páginas legales + banner de cookies
5. **Páginas legales**:
   - `src/pages/Privacidad.tsx` con el texto completo de la Política de Tratamiento de Datos (Ley 1581 + GDPR).
   - `src/pages/Cookies.tsx` con la política de cookies.
   - Rutas en `App.tsx`: `/privacidad`, `/cookies` (+ EN/PT como alias simples).
   - Actualizar links del footer (`/privacidad`, `/cookies`).
6. **Banner de cookies**:
   - `src/components/ui/cookie-banner.tsx`: esquina inferior, 3 botones (Aceptar todas / Solo esenciales / Configurar).
   - Modal de configuración con switches por categoría.
   - Persistencia en `localStorage` con clave `cookie_consent`.
   - Carga condicional de GA4 según `consent.analytics`.
   - Link "Configurar cookies" en footer que reabre el modal.
   - Montar en `App.tsx`.

## Fase C — Pop-up newsletter + edge function brevo-sync
7. **Edge function `brevo-sync`**: crear `supabase/functions/brevo-sync/index.ts` con el código provisto (CORS, validación con Zod, llamada a Brevo API). Se despliega sola.
8. **Reemplazar `ExitIntentPopup`** para que ofrezca el newsletter:
   - Título, bajada, campos nombre + email + checkbox consent + link a `/privacidad`.
   - Submit → `supabase.functions.invoke('brevo-sync', { body: { email, name, source: 'popup' } })`.
   - Manejo de éxito/error con toast.
9. **Aplicar `brevo-sync` en los otros 3 puntos de captura**:
   - `Recursos.tsx` (sección de recursos gratuitos) → `source: 'recursos'`.
   - `NewsletterPage.tsx` → `source: 'newsletter_page'`.
   - Asesor IA (ver Fase D) → `source: 'asesor_ia'`.

## Fase D — Asesor IA con persistencia + admin
10. **Migración DB** (única migración SQL en esta sesión):
    - Enum `app_role` ('admin','user') si no existe.
    - Tabla `user_roles` (id, user_id, role, unique(user_id,role)) + RLS.
    - Función security-definer `has_role(_user_id, _role)`.
    - Tabla `ai_conversations` (session_id, user_name, user_email, consent, messages JSONB, escalated, timestamps).
    - RLS: `INSERT/UPDATE` público (chat anónimo); `SELECT` solo para admins vía `has_role`.
    - Trigger `updated_at` reutilizando función existente o nueva.
11. **Auth para admin**: habilitar email/password (sin auto-confirm) y Google. Crear `/auth` (login + signup) y `/admin/conversaciones` protegida con redirect.
12. **Refactor del asesor IA**:
    - Pantalla inicial: nombre + email + checkbox consent (link a `/privacidad`) + botón "Empezar conversación".
    - Al primer mensaje: generar `session_id`, INSERT en `ai_conversations`, llamar `brevo-sync` (source: 'asesor_ia').
    - Cada mensaje siguiente: UPDATE del array `messages`.
    - Burbuja con punto rojo pulsante (ya parece existir, verifico estilos).
    - Eliminar cualquier pop-up secundario del asesor IA.
13. **`/admin/conversaciones`**: lista con filtros (fecha, escalated, email) + vista detalle.

## Fase E — Favicon (si llega el archivo)
14. Copiar a `public/favicon.png`, borrar `favicon.ico` antiguo, actualizar `<link rel="icon">` en `index.html`.

## Validación final
- Probar popup → Brevo (lista 11) recibe el contacto.
- Probar banner cookies → `localStorage.cookie_consent` se guarda.
- Probar redes sociales → todas abren en pestaña nueva.
- Probar asesor IA → guarda en `ai_conversations` + sincroniza a Brevo.
- Probar `/privacidad`, `/cookies` desde footer.
- Probar `/auth` → login → `/admin/conversaciones` accesible solo con rol admin.

## Notas técnicas
- La migración se hace primero y se espera tu aprobación (Lovable lo pide). Luego escribo el código.
- Después de la migración deberás asignarte rol admin manualmente con un INSERT (te lo indico al final con tu user_id real).
- La edge function `brevo-sync` queda con `verify_jwt = false` por defecto (popup público).
- No toco diseño general — solo los componentes/rutas mencionados.

¿Apruebas y procedo? Si tienes el favicon a mano, adjúntalo ahora para incluirlo en la misma sesión.
