
# Plan: Reposicionamiento B2B — Consultoría IA + Capacitación

## Decisiones aplicadas (basadas en tus respuestas)

- **Idioma**: se mantiene el sistema actual por hostname (.co=ES, .co EN, /pt/=PT). **No** se agrega selector de idioma manual ni `useAppConfig` global. Cada nueva página recibe `lang` como prop (igual que el resto del proyecto).
- **Moneda**: se respeta la regla del proyecto: ES→COP, EN→USD, PT→BRL. **No** se muestra USD + "Aprox COP". Se extiende `src/lib/payment-links.ts` (o se crea `src/lib/pricing.ts`) con un formateador único `formatPrice(usd, lang)` que convierte y formatea en la moneda local.
- **Slugs (SEO/GEO)**: localizados por idioma, siguiendo el patrón existente.
- **/recursos**: se conserva el contenido actual y se inserta la nueva sección B2B (grid de 4 + modales Brevo) **encima**.

## Slugs nuevos

| Vista | ES (raíz) | EN (/en) | PT (/pt) |
|---|---|---|---|
| Consultoría B2B | `/consultoria-estrategica` | `/en/strategy-advisory` | `/pt/consultoria-estrategica` |
| Capacitación IA | `/capacitacion-ia` | `/en/ai-training` | `/pt/treinamento-ia` |

Se agregan a `src/App.tsx` sin tocar rutas existentes.

## Cambios por archivo

### 1. Lógica de precios — `src/lib/pricing.ts` (nuevo)
- Constantes: `TRM_USD_COP = 4000`, `TRM_USD_BRL = 5.2` (aprox actual; documentado).
- `formatPrice(usd: number, lang: 'es'|'en'|'pt', opts?: {period?: 'once'|'monthly'|'from'})` → string localizado en una sola moneda:
  - ES: `"$400.000 COP/mes"` o `"Desde $76.000 COP"`
  - EN: `"$150 USD/mo"` / `"From $19 USD"`
  - PT: `"R$780 BRL/mês"` / `"A partir de R$98 BRL"`
- Diccionario interno con etiquetas de periodo y prefijos por idioma.

### 2. Header — `src/components/layout/Header.tsx`
- Reordenar nav principal: **Inicio · Mentoría y Asesoría · Capacitación IA · Recursos · Agencia ▾ · Blog · Contacto** (con textos localizados ES/EN/PT por interpretación B2B, no traducción literal: "Strategy Advisory", "AI Training" / "Consultoria Estratégica", "Treinamento em IA").
- "Agencia" como `DropdownMenu` de `@radix-ui/react-dropdown-menu` que agrupa rutas existentes: SEO E-commerce, Diseño Web, Pauta Digital, Logos, LinkedIn, WhatsApp Business, WhatsApp IA Bot, Asesorías Marketing.
- Conserva selectores de hostname/idioma actuales (banderas si existen) sin agregar nuevo selector.

### 3. Home — `src/pages/Index.tsx`
- **Hero**: nuevo titular B2B ("Escala tu E-commerce con IA y Consultoría Estratégica" / "Scale your E-commerce with AI & Strategy Advisory" / "Escale seu E-commerce com IA e Consultoria Estratégica"). CTA primario → `/consultoria-estrategica` (ruta localizada). CTA secundario WhatsApp.
- **Escalera de Valor (3 Pricing Cards)** con `formatPrice`:
  1. **Herramientas IA** — "Desde $19 USD" → `/recursos`.
  2. **Consultoría** — Asesoría 1a1 $150 USD + Mentoría Mensual $500 USD → `/consultoria-estrategica`.
  3. **Agencia** — Web E-commerce $1.200 USD + SEO/AIO Mensual $500 USD → abre el dropdown de Agencia (scroll a navbar + `data-open`).
- **Social Proof**: carrusel `embla-carousel-react` minimalista con 5 testimonios B2B (textos en los 3 idiomas).
- Resto de secciones existentes (Fera, casos, etc.) se conservan debajo.

### 4. Nueva vista — `src/pages/ConsultoriaEstrategica.tsx`
- Hero + propuesta de valor + 2 planes (Asesoría 1a1 / Mentoría Mensual) usando `formatPrice`.
- FAQ acordeón (shadcn) y CTA WhatsApp (`wa.link/jvbd4j`).
- SEO localizado (title/description/canonical/hreflang).

### 5. Nueva vista — `src/pages/CapacitacionIA.tsx`
- Hero corporativo para talleres in-company.
- **Calculadora dinámica** con `react-hook-form`:
  - `tema`: Marketing (1.0) / Estrategia (1.2) / Inteligencia Artificial (1.5).
  - `audiencia`: 1 persona (1.0) / 2-5 (1.5) / 6-15 (2.0).
  - `TARIFA_BASE_USD = 100`, `HORAS = 4`. `precio = base * horas * tema * audiencia`.
  - Resultado en `motion.div` con `AnimatePresence`, formateado por `formatPrice(precio, lang)` (sale en COP/USD/BRL según hostname).
  - Disclaimer localizado.
- Bloque de temarios + CTA WhatsApp.

### 6. `src/pages/Recursos.tsx`
- Insertar **arriba** una nueva sección `RecursosB2BGrid` con CSS Grid de 4 tarjetas:
  - Brief de contenido, Newsletter Pro, Analizador de contratos, Comparador de propuestas.
- Cada tarjeta abre un `Dialog` (`@radix-ui/react-dialog`) centrado con título localizado ("Ingresa tu correo para acceder" / "Enter your email to unlock" / "Informe seu e-mail para acessar") y `<div id="brevo-form-container-{slug}" className="min-h-[200px] w-full" />` vacío para inyección Brevo posterior.
- El contenido existente de /recursos se preserva intacto debajo.

### 7. Rutas — `src/App.tsx`
- Agregar 6 rutas nuevas (3 vistas × 3 idiomas) usando `lazy(...)`. No se elimina ninguna ruta existente.

### 8. SEO complementario
- `public/sitemap.xml`: agregar 6 URLs con hreflang cruzado.
- Meta tags por página (mismo patrón que el resto del proyecto).

## Diseño visual

- **Dark mode** corporativo, minimalista. Se reutilizan los tokens existentes del proyecto (paleta `#2F2D56` / `#541014` / `#C0930E`, tipografía Nexa) — sin introducir nuevos colores hardcoded.
- Animaciones sutiles con `framer-motion` (fade/slide en hero, hover scale en cards, AnimatePresence en calculadora).
- 100% Mobile-first; cards apiladas en mobile, 3 cols en `md:`.

## Fuera de alcance (por las restricciones que diste)

- No se crea `useAppConfig` ni Context i18n global (el proyecto ya gestiona idioma vía prop `lang` desde hostname).
- No se agrega selector de idioma manual.
- No se muestra dual currency ("USD + Aprox COP") — incompatible con la regla del proyecto.

## Validación final

- `tsc` build limpio.
- Verificación visual con Playwright en `/`, `/consultoria-estrategica`, `/capacitacion-ia`, `/recursos` en mobile (375px) y desktop.
- Confirmar que dropdown "Agencia" lista todas las rutas existentes y que ninguna ruta antigua quedó rota.
