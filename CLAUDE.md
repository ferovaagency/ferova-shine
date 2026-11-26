# Reglas de seoparaecommerce.co (SEO para Ecommerce by Ferova)

Fuente única de verdad para crear o cambiar cualquier cosa en este sitio:
páginas, textos, artículos, casos, newsletter, componentes y diseño. Sigue las
mismas reglas generales que ferova.com.co (repo `ferova-core-platform`,
`CLAUDE.md`), adaptadas a esta práctica: la capacidad de SEO técnico senior de
María Fer para agencias.

**Quién la lee**

- **Claude Code y Lovable**: este archivo completo, antes de tocar código o texto.
- **Fera** (generador de artículos, casos y newsletter del admin): la parte entre
  `FERA:BEGIN` y `FERA:END`. El build la publica en `/fera-reglas.md`
  (`feraRulesPlugin` en `vite.config.ts`) y la edge function
  `supabase/functions/blog-article-generator` la descarga en cada generación
  para este sitio. Cambiar una regla aquí y desplegar basta.

**Cómo se mantiene**

- Si una regla cambia, se cambia aquí, no en el prompt de Fera.
- `PRODUCT.md` guarda el posicionamiento ampliado. `DESIGN.md` describe el
  sistema visual anterior (consola de agencia); si contradice la §7, manda la §7.
- La parte de Fera es pública: sin secretos, rutas privadas ni datos personales.

<!-- FERA:BEGIN -->

## 1. Marca y hechos verificados

seoparaecommerce.co presenta **SEO para Ecommerce by Ferova**: la práctica de
**María Fer Calderón** (Fractional SEO en Ferova) que se suma a agencias de
marketing, performance, desarrollo o ecommerce como capacidad técnica senior.
Ferova Agency es la marca matriz. El público principal son **agencias**; las
tiendas también pueden leer, pero las llamadas a la acción se dirigen a agencias.

- **Qué se ofrece:** SEO técnico, SEO para ecommerce, auditorías técnicas, migraciones SEO, arquitectura de catálogos y apoyo web relacionado, bajo marca blanca, como apoyo interno o visible ante el cliente final.
- **Cómo se contrata:** por tarea (entrega concreta), por horas o capacidad mensual. Los precios están publicados en cada página de especialidad; en el contenido no se escriben cifras de precio, se enlaza a la página.
- **Idiomas:** español en `seoparaecommerce.co`, inglés en `seoparaecommerce.co/en` (el dominio seoforecommerces.co redirige ahí). El portugués está retirado: no se produce contenido nuevo en portugués.
- **Fera** recopila contexto para preparar alcance y cotización; no diagnostica ni promete resultados. Una persona confirma alcance, precio y disponibilidad.
- Nunca se inventan clientes, testimonios, cifras, certificaciones, casos, logos ni resultados. Un caso o resultado solo se publica con evidencia y consentimiento registrado; si falta, se describe la limitación.

## 2. Voz y estilo editorial

- **Quién habla:** María Fer, en primera persona cuando el texto es suyo, como consultora senior que trabaja con agencias ("Cuando audito un catálogo de Shopify, empiezo por…"). Ferova aparece como la empresa detrás, nunca como "la mejor agencia".
- **Tono:** experto, directo, claro y colaborativo. Conversado pero profesional, sin jerga innecesaria ni relleno.
- **Educación antes que venta:** primero el criterio técnico; la oferta aparece solo como siguiente paso natural.
- **Términos técnicos:** cada uno con su porqué y para qué, en lenguaje que un dueño de agencia pueda presentar a su cliente.
- **Prohibido:** clickbait, intros vacías ("en el competitivo mundo actual…"), promesas de posiciones o resultados garantizados, llamados genéricos a "agendar una asesoría", superlativos sin respaldo y texto genérico que serviría para cualquier marca.
- **Idiomas:** el contenido en inglés se escribe para el mercado anglo, no como traducción literal.

## 3. Estructura de artículos (blog)

**Antes de escribir**, responder con un sí las tres:
1. ¿Qué aprende el lector, en concreto?
2. ¿Qué decisión le ayuda a tomar (contratar, implementar, delegar, cambiar)?
3. ¿Ayuda de verdad a una agencia o a una tienda a decidir mejor?
Si alguna es no, se replantea el ángulo.

**Bloques obligatorios**

1. **Título (H1):** keyword principal al inicio, de forma natural, más contexto o promesa de valor. Máximo 65 caracteres. Un solo H1 (el sitio lo pinta aparte: el cuerpo no lleva `<h1>`).
2. **Primera frase afirmativa:** sujeto + verbo + predicado, que responda directamente la pregunta principal. No empezar con pregunta, anécdota ni frase genérica.
3. **Resumen introductorio (1 párrafo):** qué aprenderá, contexto del problema y valor práctico.
4. **Desarrollo H2/H3:** H2 para secciones (keyword secundaria cuando encaje), H3 solo dentro de un H2. Nunca saltar niveles ni usar H4–H6.
5. **Cierre:** conclusión de 2–3 frases, lista de puntos aplicables hoy, por qué importa para la agencia o la tienda e invitación sutil (hablar con Fera o ver la especialidad relacionada).
6. **FAQ** con 3–5 preguntas que la gente busca de verdad: un H2 exactamente "Preguntas frecuentes" (en inglés, "Frequently asked questions"), cada pregunta en un H3 y su respuesta en uno o dos párrafos debajo. Con ese formato el sitio genera el schema `FAQPage`.

**Extensión:** informativo 800–1.200 palabras; autoridad 1.200–2.000; guía pilar 2.000–3.500. Nunca inflar para llegar al mínimo.

**Enlaces internos:** 2–4 hacia páginas vigentes y relevantes. Solo estas rutas.
Español: `/seo-para-agencias`, `/auditoria-seo-tecnica`, `/migraciones-seo`,
`/servicios/seo-ecommerce`, `/casos-de-exito`, `/recursos`, `/blog`,
`/sobre-nosotros`, `/contacto`.
Inglés: `/en/white-label-seo-for-agencies`, `/en/technical-seo-audit-services`,
`/en/seo-migration-services`, `/en/services/ecommerce-seo`, `/en/case-studies`,
`/en/resources`, `/en/blog`, `/en/about-me`, `/en/contact`.

**El artículo es una landing:** además de informar, lleva al lector a un siguiente paso. Cada artículo conecta el problema con la especialidad que corresponde (auditoría, migración, SEO para ecommerce, capacidad para agencias) mediante enlaces internos naturales y un cierre con invitación clara. El sitio añade solo el índice, una llamada a Fera a mitad del texto y la banda final de contacto; el texto no repite esos bloques.

**Imágenes del artículo:** cada artículo lleva una imagen de portada y hasta dos imágenes dentro del texto, generadas con IA y guardadas en el bucket `blog-images`.
- Estilo: ilustración editorial o composición conceptual, limpia y profesional, con la paleta de Ferova (vino `#541014`, índigo `#2F2D56`, oro `#C0930E` como acento, fondos blancos o marfil). Formato horizontal 16:9.
- Cada imagen explica una idea concreta del artículo (una arquitectura de catálogo, un flujo de migración, un antes y después, el problema que se resuelve). Nada decorativo genérico.
- Prohibido dentro de la imagen: texto, letras, números, logos o marcas, capturas de software que parezcan reales, personas (los visuales principales no dependen de personas) y el imaginario de "IA mágica" (robots, cerebros brillantes, circuitos azules).
- Cada imagen lleva un texto alternativo que describe lo que muestra y su relación con el tema, con la keyword solo si encaja de forma natural.

**Originalidad:** cada pieza aporta al menos un ángulo, ejemplo o aplicación que no esté en los primeros resultados de Google, aterrizado a la experiencia de trabajo con agencias y tiendas.

**Datos:** toda cifra o estadística lleva fuente real y verificable. Sin fuente, no hay cifra. No inventar fuentes, URLs, estudios ni autores. En temas sensibles a fechas (algoritmos, herramientas, plataformas) mencionar el año y pedir verificar cambios recientes.

**Casos y newsletter:** mismas reglas de voz y datos. Un caso explica qué contrató la agencia (tarea, horas o capacidad), el reto, la entrega y el aprendizaje, solo con hechos aportados y consentimiento vigente. La newsletter da una idea útil y concreta por bloque para dueños de agencia.

## 4. SEO on-page

- Keyword principal en el H1, en las primeras 100 palabras y en al menos un H2.
- Variaciones semánticas y términos relacionados; densidad máxima 2–3 % (no más de una vez cada 100 palabras).
- **Meta title:** máximo 60 caracteres, keyword + contexto.
- **Meta description:** 150–160 caracteres: propuesta de valor + keyword + llamada implícita.
- **URL (slug):** corta, en minúsculas, con guiones, basada en la keyword; sin fechas ni palabras vacías.
- Intención de búsqueda primero: informacional → guía clara; comercial → comparativas con tablas y pros/contras; transaccional → pasos claros y CTA suave.
- Imágenes con texto alternativo descriptivo; nada de texto importante dentro de una imagen.

## 5. GEO: visibilidad en buscadores de IA

- **Respuesta primero:** la primera frase y los primeros 2–3 párrafos responden la pregunta de forma completa y citable sin necesitar el resto.
- **Bloques extraíbles:** párrafos cortos con una idea cada uno; listas y tablas cuando ordenan información de verdad.
- **Densidad de hechos:** afirmaciones concretas y verificables, nombres propios correctos (María Fer Calderón, Ferova, SEO para Ecommerce by Ferova, Fera) y definiciones explícitas de cada concepto clave.
- **Entidad consistente:** describir la práctica siempre igual: consultora de SEO técnico senior que se suma a agencias como capacidad flexible (por tarea, horas o mes), bajo marca blanca si la agencia lo necesita. No variar la categoría entre páginas.
- **E-E-A-T:** experiencia de primera mano (cómo se resolvió en proyectos reales, sin revelar clientes sin permiso), autoría clara de María Fer y fuentes oficiales (documentación de Google, de Shopify, etc.) para afirmaciones técnicas.
- **FAQ** con preguntas reales en lenguaje natural, cada respuesta autosuficiente.

<!-- FERA:END -->

## 6. SEO técnico del sitio (solo código)

- **Stack:** React + Vite + React Router (SPA) con prerender a HTML en el build (`vite-prerender-plugin`, `src/prerender.tsx`). Se despliega en **Vercel** con cada push a `main`; las redirecciones viven en `vercel.json`.
- **Metadatos:** toda página usa `<SEO>` de `src/components/SEO.tsx` (title, description, canonical, hreflang, Open Graph, `jsonLd`, `breadcrumbs`). No se escriben etiquetas a mano.
- **Registro de rutas:** cada página pública vive en `ROUTES` de `src/config/routes.ts`. De ahí salen el prerender, el sitemap y los hreflang; `validateRoutes` rompe el build si el registro es inválido.
- **Schema (toda página pública lleva JSON-LD):** `Organization` y `WebSite` globales; `BreadcrumbList` (prop `breadcrumbs` de `<SEO>`) en todas las páginas internas; `Person` + `ProfessionalService` + `FAQPage` en la portada; `Service` en especialidades; en cada artículo `BlogPosting` (autora `Person`, `ImageObject`, `wordCount`, `keywords`, `articleSection`, `isPartOf`), más `FAQPage` cuando el texto tiene sección de preguntas frecuentes. Una página nueva sin schema no se publica.
- **Blog compartido:** `blog_posts` es compartida con ferova.com.co. Toda consulta, pública o del admin, filtra por `BLOG_SITE_ORIGINS` (`src/lib/blog-i18n.ts`); el prerender y el sitemap usan `BLOG_SITE_FILTER_REST`. Sin ese filtro se publican artículos de otro dominio (contenido duplicado).
- **Artículo como landing:** `src/pages/BlogPost.tsx` + `src/lib/article-landing.ts` (índice, FAQ, llamada a mitad del texto).
- **robots.txt, llms.txt y sitemap** están en `public/`; el sitemap se regenera en cada build (`scripts/generate-sitemap.ts`) con la misma consulta que el prerender.
- **Imágenes:** dimensiones explícitas, formatos modernos (WebP) y `fetchPriority="high"` solo en la imagen principal del primer viewport.

## 7. Diseño

El sitio usa el **sistema de diseño de Ferova** (el mismo de ferova.com.co),
conservando la marca personal: wordmark "MARÍA FER · SEO TÉCNICO · FEROVA", la
foto de María Fer en la portada y sus textos. La implementación vive en el
bloque final de `src/index.css` ("SISTEMA DE DISEÑO FEROVA"), que manda sobre
los estilos anteriores; los cambios visuales se hacen ahí.

- **Paleta fija del manual:** carbón `#3C3C3B`, vino `#541014`, índigo `#2F2D56`, tierra `#6A4C30`, oro `#C0930E`, más blanco, lavanda (`#F6F5FB`) y marfil. Nada de azules SaaS, neón, glassmorphism dominante ni paletas generadas.
- **Roles:** vino = acción principal (píldora); índigo = héroes con retícula fina y etiquetas; oro = solo señal o estado (iconos de verificación, resaltado del titular sobre índigo), nunca fondo extenso ni botón.
- **Estructura de página:** héroe índigo con retícula → secciones blancas y lavanda alternas → banda vino con círculos concéntricos para el cierre → pie lavanda.
- **Tipografía:** titulares en Poppins 600; cuerpo en Manrope; datos técnicos e índices en IBM Plex Mono. Cuerpo cerca de 65–72 caracteres por línea.
- **Componentes:** etiquetas de sección en cápsula lavanda (`personal-eyebrow`, `seo-kicker`), botones `personal-button` / `seo-primary-button` (vino; blanco sobre índigo o vino), tarjetas en superficie lavanda con radio 1.25rem, portafolio con borde superior vino.
- **Movimiento:** solo de entrada y hover; nada infinito. Con `prefers-reduced-motion`, composición estática completa.
- **Accesibilidad:** mobile first, contraste AA, foco visible de 2 px (vino sobre claro, blanco sobre oscuro), todo operable con teclado, sin scroll horizontal.
- **Honestidad visual:** nada de cifras, logos de clientes, testimonios ni capturas inventadas.

## 8. Datos y backend

- La base de Supabase es compartida con ferova.com.co y seoforecommerces.co (proyecto Lovable "Ferova.com.co"). Un cambio de esquema afecta a los tres sitios.
- Los artículos de este sitio llevan `site_origin` `seoparaecommerce.co` (o `seoforecommerces.co`).
- Las edge functions (`ai-sales-advisor`, `blog-article-generator`, etc.) viven en `supabase/functions` de este repo y sirven a todos los sitios: cualquier cambio debe conservar el comportamiento de los demás.
