import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type GeneratePayload = {
  site?: "ferova";
  title?: string;
  keyword?: string;
  category?: string;
  ideas?: string;
  lang?: "es" | "en" | "pt";
  excludeId?: string;
};

type GenerateCasePayload = {
  site?: "ferova";
  title?: string;
  sector?: string;
  country?: string;
  services?: string[];
  facts?: string;
  challenge?: string;
  intervention?: string;
  results?: Array<{ label?: string; value?: string; context?: string }>;
};

type GenerateNewsletterPayload = {
  site?: "ferova";
  editionNumber?: number;
  title?: string;
  subjectLine?: string;
  plan?: "free" | "pro";
  topics?: string[];
  ideas?: string;
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const safeString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 80);

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (value: string, max: number) => {
  if (value.length <= max) return value;
  return `${value.slice(0, Math.max(0, max - 1)).trim()}…`;
};

const extractJson = (value: string) => {
  const start = value.indexOf("{");
  const end = value.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No se pudo interpretar la respuesta del modelo.");
  }
  return JSON.parse(value.slice(start, end + 1));
};

const GUIA_EDITORIAL = `
=== GUÍA EDITORIAL FEROVA AGENCY 2025 — FUENTE DE VERDAD ABSOLUTA ===

0. ANTES DE ESCRIBIR — 3 PREGUNTAS OBLIGATORIAS
Antes de generar cualquier borrador, responde internamente:
1. ¿Qué aprende el lector? (valor concreto, no vago)
2. ¿Qué decisión lo ayuda a tomar? (comprar, contratar, implementar, cambiar)
3. ¿Este contenido realmente ayuda a una empresa a tomar mejores decisiones digitales?
Si alguna respuesta es negativa, reescribe hasta que las tres sean afirmativas.

1. ESTRUCTURA OBLIGATORIA

BLOQUE 1 — H1 (Título SEO):
- Fórmula: [Keyword principal] + [Promesa de valor o contexto]
- Máximo 65 caracteres. Solo UN H1 por artículo. Keyword al inicio de forma natural.
- PROHIBIDO: clickbait vacío, "Los 10 secretos que nadie te dice..."

BLOQUE 2 — Frase Inicial Afirmativa (OBLIGATORIA):
- Primera oración: SIEMPRE afirmación con Sujeto + Verbo + Predicado + contexto técnico/estratégico.
- PROHIBIDO: comenzar con pregunta, anécdota, o frase genérica.
- Ejemplos correctos:
  · "El SEO técnico mejora el rendimiento orgánico cuando la estructura del sitio está correctamente optimizada."
  · "Una tienda virtual sin estrategia de conversión pierde entre el 60 y el 80% de sus visitantes."

BLOQUE 3 — Resumen Introductorio (1 párrafo):
- Qué aprenderá el lector + Contexto del problema + Promesa de valor práctica.
- Tono conversado y profesional. Sin listas de specs sin contexto. Sin venta directa.

BLOQUE 4 — Desarrollo con Jerarquía H2/H3:
- H2 para secciones principales (con keyword secundaria si aplica).
- H3 para subsecciones dentro de un H2.
- REGLA ABSOLUTA: Nunca saltar niveles (no H2→H4, no H3 sin H2 previo).
- Cada sección H2 debe desarrollar completamente su tema.

BLOQUE 5 — Cierre Estratégico:
- Conclusión clara: 2-3 oraciones resumiendo el aprendizaje principal.
- Resumen práctico: puntos clave que el lector puede aplicar hoy (lista).
- Reflexión estratégica: por qué importa en el contexto de negocio.
- Invitación sutil: CTA no agresiva ("Si quieres profundizar..." o "En Ferova Agency podemos ayudarte a...").

2. TONO Y ESTILO
- Conversado pero profesional (como un experto en consultoría).
- Explicativo con contexto: cada punto con por qué y para qué.
- Educación antes que venta: aportar valor real primero.
- Técnico con traducción: explicar cada término técnico.
- Directo al grano: sin relleno, sin repetición.

3. SEO DENTRO DEL ARTÍCULO
- Keyword en H1: obligatoria, natural.
- Keyword en primer párrafo: primeras 100 palabras.
- Keyword en al menos un H2.
- Variaciones semánticas: sinónimos y términos relacionados.
- Densidad máxima: 2-3%, no repetir keyword más de 1 vez por cada 100 palabras.
- Meta title: máx 60 caracteres, keyword + contexto.
- Meta description: 150-160 caracteres, propuesta de valor + keyword + CTA implícita.
- URL amigable: /blog/keyword-principal-del-articulo

4. EXTENSIÓN POR TIPO
- Artículo informativo básico: 800–1.200 palabras, 1 keyword principal + 2-3 secundarias.
- Artículo de autoridad: 1.200–2.000 palabras.
- Guía completa / Pilar content: 2.000–3.500 palabras.

5. MENCIÓN DE MARCA
- Solo para reforzar autoridad técnica: "En Ferova Agency, cuando realizamos auditorías SEO, analizamos primero la estructura técnica..."
- PROHIBIDO: "Somos la mejor agencia", venta agresiva, frases publicitarias.

6. ELEMENTOS OPCIONALES
- Casos reales o representativos cuando ilustren el tema.
- Errores comunes cuando el artículo es educativo.
- Comparaciones cuando hay opciones que evaluar.
- Listas prácticas para puntos accionables.
- Datos y estadísticas siempre con fuente. NUNCA inventar cifras.
- FAQ al final cuando haya preguntas frecuentes reales (excelente para IAs generativas).

7. LO QUE NUNCA DEBE APARECER
- Artículos genéricos sin industria específica.
- Texto que suena a IA genérica sin voz propia.
- Múltiples H1.
- Keywords repetidas forzadamente.
- Venta agresiva.
- Afirmaciones sin respaldo.
- H3 sin H2 previo.
- Terminar sin cierre estratégico.

8. ENLACES INTERNOS NATURALES
Incluir 2-4 enlaces internos hacia páginas vigentes y relevantes del sitio:
/seo-para-agencias, /auditoria-seo-tecnica, /migraciones-seo, /servicios/seo-ecommerce, /casos-de-exito, /contacto, /blog

=== DIRECTRICES GOOGLE SEARCH (OBLIGATORIAS) ===

1. CONTENIDO ÚTIL ANTES QUE SEO: el artículo debe responder genuinamente a una intención de búsqueda real. Si el lector terminaría sintiendo que no aprendió nada nuevo o que solo leyó relleno, reescríbelo.

2. E-E-A-T en cada artículo:
   - Experiencia: incluye observaciones de primera mano, datos concretos, ejemplos vividos cuando sea posible
   - Expertise: usa terminología precisa del sector sin sobreexplicar lo obvio
   - Autoridad: cita fuentes oficiales (gobierno, papers, sitios .gov/.edu) cuando hagas afirmaciones técnicas
   - Confianza: nunca afirmes datos que no puedas respaldar, nunca inventes estadísticas, fechas ni nombres

3. EVITAR CONTENIDO ESCALADO DE BAJA CALIDAD:
   - Nada de párrafos genéricos que aplican a cualquier marca/industria
   - Nada de "en el competitivo mundo actual..." ni intros vacías
   - Cada sección debe tener información específica y accionable, no relleno

4. OPTIMIZACIÓN PARA AI OVERVIEWS Y BÚSQUEDA GENERATIVA:
   - Primera oración del artículo debe responder directamente la pregunta principal
   - Estructura con respuestas cortas y claras en los primeros 2-3 párrafos
   - Usa listas y tablas cuando aporten valor (los LLMs las extraen mejor)
   - Incluye un FAQ al final con 3-5 preguntas reales que la gente busca

5. INTENCIÓN DE BÚSQUEDA: identifica si la keyword es informacional, navegacional, transaccional o comercial. Adapta el formato:
   - Informacional: guía o explicación clara
   - Comercial (comparativas): tablas, pros/contras concretos
   - Transaccional: pasos claros + CTA suave

6. DATOS ESTRUCTURADOS: al final del JSON, incluye un campo "schema_article" con un objeto JSON-LD válido tipo Article que el sitio inyectará en el <head>. Debe incluir: headline, description, author (Organization), datePublished, keywords.

7. PROHIBICIONES ABSOLUTAS:
   - No inventar fuentes, URLs, estudios ni autores
   - No inventar estadísticas con porcentajes específicos (ej: "el 87% de las empresas")
   - No prometer resultados garantizados
   - No usar lenguaje de clickbait ("descubre el secreto", "no creerás lo que")
   - No copiar estructura ni frases de otros sitios

8. ORIGINALIDAD: cada artículo debe aportar al menos un ángulo, ejemplo o aplicación que no sea obvio buscando los primeros resultados de Google. Si se siente como "lo mismo que ya hay en internet", reescríbelo con un enfoque más específico al contexto de la marca.

9. EXTENSIÓN ÚTIL: respeta el rango de palabras del tipo, pero NUNCA infles para llegar al mínimo. Es preferible un artículo de 1.000 palabras útiles que uno de 2.000 con relleno.

10. ACTUALIDAD: si el tema es sensible a fechas (tendencias, herramientas, regulaciones), menciona explícitamente el año actual y aclara que el lector debe verificar cambios recientes.
`;

// Respaldo para ferova.com.co si no se pueden descargar sus reglas
// (ver getSiteRules). La fuente de verdad es CLAUDE.md del repo
// ferova-core-platform, publicada en https://ferova.com.co/fera-reglas.md.
const FEROVA_PRODUCT_CONTEXT = `
CONTEXTO EXCLUSIVO DE FEROVA.COM.CO:
- Ferova diseña productos, automatizaciones, integraciones y software a medida para conectar información, procesos y decisiones.
- Ferova One es el producto principal, disponible en producción y a la venta en https://one.ferova.com.co. Lee con Koa (antes Librero IA) es una app para lectores disponible con plan gratis y Pro. Ferova Brain es infraestructura interna, no un producto vendible.
- Audiencia: freelancers, consultores, agencias y pequeñas empresas que quieren operar con más estructura, claridad y control.
- No presentes a Ferova como una agencia SEO ni enlaces servicios de SEO para agencias.
- Enlaces internos permitidos: /productos/ferova-one, /productos/librero-ia, /soluciones/sistemas-a-medida, /soluciones/automatizacion-ia, /recursos, /casos-de-exito, /contacto.
- No inventes disponibilidad, clientes, métricas, integraciones, capacidades o fechas. Distingue claramente lo disponible, lo que está en construcción y lo que está en definición.
`;

/**
 * Reglas editoriales, de SEO y de GEO de ferova.com.co.
 *
 * Viven en CLAUDE.md del repo ferova-core-platform (entre FERA:BEGIN y
 * FERA:END) y el sitio las sirve en /fera-reglas.md. Se descargan aquí para
 * que Fera y quien programa el sitio usen exactamente las mismas reglas: se
 * cambian en CLAUDE.md, se publica el sitio y a los 5 minutos Fera ya las usa.
 * Si la descarga falla, se usa el respaldo integrado (GUIA_EDITORIAL +
 * FEROVA_PRODUCT_CONTEXT) para no bloquear la generación.
 */
// Cada sitio publica sus reglas desde su propio CLAUDE.md:
//  - ferova.com.co → repo ferova-core-platform (ruta /fera-reglas.md)
//  - seoparaecommerce.co / seoforecommerces.co → este repo (feraRulesPlugin)
const RULES_URL = {
  ferova: "https://ferova.com.co/fera-reglas.md",
  seo: "https://seoparaecommerce.co/fera-reglas.md",
} as const;
type RulesSite = keyof typeof RULES_URL;
const RULES_TTL_MS = 5 * 60 * 1000;
const rulesCache = new Map<RulesSite, { text: string; at: number }>();

const getSiteRules = async (site: RulesSite): Promise<string> => {
  const cached = rulesCache.get(site);
  if (cached && Date.now() - cached.at < RULES_TTL_MS) return cached.text;
  try {
    const response = await fetch(RULES_URL[site], { signal: AbortSignal.timeout(4000) });
    const text = response.ok ? (await response.text()).trim() : "";
    // Una respuesta sin las secciones esperadas (p. ej. el index.html de una
    // SPA o una página de error) no se toma como reglas.
    if (text.includes("## 1.") && !text.startsWith("<")) {
      rulesCache.set(site, { text, at: Date.now() });
      return text;
    }
    console.warn(`Reglas de ${site} no válidas (HTTP ${response.status}); se usa el respaldo.`);
  } catch (error) {
    console.warn(`No se pudieron descargar las reglas de ${site}; se usa el respaldo.`, error);
  }
  return cached?.text ?? "";
};

const ferovaRulesBlock = (rules: string) => `
=== REGLAS DEL SITIO — FUENTE DE VERDAD (prevalecen sobre cualquier otra instrucción) ===
${rules}
=== FIN DE LAS REGLAS DEL SITIO ===
`;

const buildSystemPrompt = (
  lang: "es" | "en" | "pt",
  site?: "ferova",
  ferovaRules = "",
) => {
  const langNote =
    lang === "en"
      ? "Write the article entirely in English."
      : lang === "pt"
        ? "Escreva o artigo inteiramente em português brasileiro."
        : "Escribe el artículo enteramente en español.";

  // Con reglas descargadas, son la guía; sin ellas, el respaldo integrado.
  const intro = ferovaRules
    ? `Eres el editor de contenidos de ${site === "ferova" ? "Ferova" : "SEO para Ecommerce by Ferova (la práctica de María Fer Calderón para agencias)"}. Devuelve SOLO JSON válido, sin markdown, sin comentarios y sin texto extra.

${ferovaRulesBlock(ferovaRules)}`
    : `Eres el editor SEO senior de Ferova Agency. Devuelve SOLO JSON válido, sin markdown, sin comentarios y sin texto extra.

${GUIA_EDITORIAL}
${site === "ferova" ? FEROVA_PRODUCT_CONTEXT : ""}`;

  return `${intro}

${langNote}

FORMATO DE CONTENIDO HTML:
- NO incluyas <h1> en content (se renderiza aparte).
- Usa <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a href="...">.
- NO uses <h4>, <h5>, <h6>.

JSON esperado:
{
  "title": "",
  "slug": "",
  "excerpt": "",
  "content": "",
  "meta_title": "",
  "meta_description": "",
  "category": "",
  "keyword": "",
  "validation_pass": true,
  "validation_reason": "",
  "schema_article": {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "",
    "description": "",
    "author": { "@type": "Organization", "name": "${site === "ferova" ? "Ferova" : "Ferova Agency"}" },
    "datePublished": "YYYY-MM-DD",
    "keywords": ""
  },
  "intencion_busqueda": "informacional | comercial | transaccional | navegacional",
  "aporta_original": "1 frase concreta sobre qué aporta este artículo que no esté en los primeros resultados de Google"${
    ferovaRules
      ? `,
  "images": [
    { "placement": "cover", "prompt": "", "alt": "" },
    { "placement": "after_h2", "h2_index": 1, "prompt": "", "alt": "" },
    { "placement": "after_h2", "h2_index": 3, "prompt": "", "alt": "" }
  ]`
      : ""
  }
}${
    ferovaRules
      ? `

IMÁGENES: sigue la sección "Imágenes del artículo" de las reglas. Devuelve 1 portada y hasta 2 imágenes internas.
- "prompt": descripción visual detallada en inglés para un generador de imágenes (escena, composición, estilo, colores de la paleta). Debe decir explícitamente que no lleva texto, letras, números ni logos.
- "alt": texto alternativo en el idioma del artículo.
- "h2_index": posición (empezando en 1) del H2 tras cuyo primer párrafo va la imagen. No uses la sección de preguntas frecuentes.`
      : ""
  }`;
};

/**
 * Imágenes de los artículos de ferova.com.co.
 *
 * El modelo de texto propone portada e imágenes internas (prompt + alt); aquí
 * se generan con el modelo de imagen del gateway, se suben al bucket público
 * `blog-images` y se insertan en el HTML. Un fallo de imagen nunca tumba el
 * artículo: esa imagen simplemente se omite.
 */
type ImageSpec = { placement: "cover" | "after_h2"; h2Index: number; prompt: string; alt: string };

const IMAGE_GUARD =
  "Wide 16:9 horizontal composition. Absolutely no text, letters, numbers, logos, watermarks or UI screenshots. Clean editorial style, brand palette: deep wine #541014, indigo #2F2D56, small gold #C0930E accents, white or ivory background.";

const parseImageSpecs = (raw: unknown): ImageSpec[] => {
  if (!Array.isArray(raw)) return [];
  const specs: ImageSpec[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const entry = item as Record<string, unknown>;
    const prompt = safeString(entry.prompt);
    const alt = safeString(entry.alt);
    if (!prompt || !alt) continue;
    const cover = entry.placement === "cover";
    const h2Index = Number(entry.h2_index);
    if (!cover && !(Number.isInteger(h2Index) && h2Index > 0)) continue;
    specs.push({ placement: cover ? "cover" : "after_h2", h2Index: cover ? 0 : h2Index, prompt, alt });
  }
  const cover = specs.find((s) => s.placement === "cover");
  const inline = specs.filter((s) => s.placement === "after_h2").slice(0, 2);
  return cover ? [cover, ...inline] : inline;
};

const generateImageBytes = async (prompt: string, apiKey: string): Promise<Uint8Array> => {
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      messages: [{ role: "user", content: `${prompt}\n\n${IMAGE_GUARD}` }],
      modalities: ["image", "text"],
    }),
    signal: AbortSignal.timeout(60000),
  });
  if (!response.ok) throw new Error(`Image gateway ${response.status}: ${await response.text()}`);
  const data = await response.json();
  const url: string | undefined = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  const base64 = url?.split(",")[1];
  if (!base64) throw new Error("El modelo no devolvió imagen.");
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
};

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Inserta cada figura tras el primer párrafo del H2 indicado (o al cierre del H2). */
const insertFigures = (html: string, figures: { h2Index: number; url: string; alt: string }[]) => {
  let result = html;
  for (const figure of [...figures].sort((a, b) => b.h2Index - a.h2Index)) {
    const h2Re = /<\/h2>/gi;
    let match: RegExpExecArray | null = null;
    for (let n = 0; n < figure.h2Index; n++) {
      match = h2Re.exec(result);
      if (!match) break;
    }
    if (!match) continue;
    const afterH2 = match.index + match[0].length;
    const nextH2 = result.indexOf("<h2", afterH2);
    const pEnd = result.indexOf("</p>", afterH2);
    const at = pEnd >= 0 && (nextH2 < 0 || pEnd < nextH2) ? pEnd + 4 : afterH2;
    const tag = `<figure class="article-figure"><img src="${escapeAttr(figure.url)}" alt="${escapeAttr(figure.alt)}" loading="lazy" decoding="async"></figure>`;
    result = result.slice(0, at) + tag + result.slice(at);
  }
  return result;
};

const addArticleImages = async (
  article: { slug: string; content: string; cover_image: string | null },
  specs: ImageSpec[],
  apiKey: string,
  adminClient: ReturnType<typeof createClient>,
  folder: "ferova" | "seo" = "ferova",
) => {
  const stamp = Date.now();
  const results = await Promise.allSettled(
    specs.map(async (spec, index) => {
      const bytes = await generateImageBytes(spec.prompt, apiKey);
      const path = `${folder}/${article.slug}/${stamp}-${index}.png`;
      const { error } = await adminClient.storage
        .from("blog-images")
        .upload(path, bytes, { contentType: "image/png", upsert: true });
      if (error) throw new Error(error.message);
      const url = adminClient.storage.from("blog-images").getPublicUrl(path).data.publicUrl;
      return { ...spec, url };
    }),
  );
  const done = results.flatMap((r) => (r.status === "fulfilled" ? [r.value] : []));
  results.forEach((r) => {
    if (r.status === "rejected") console.warn("Imagen omitida:", r.reason);
  });
  const cover = done.find((d) => d.placement === "cover");
  if (cover) article.cover_image = cover.url;
  article.content = insertFigures(
    article.content,
    done.filter((d) => d.placement === "after_h2"),
  );
  return { generated: done.length, requested: specs.length, cover_alt: cover?.alt ?? "" };
};

const buildUserPrompt = (payload: GeneratePayload) => {
  const lang = payload.lang || "es";
  const ideas = safeString(payload.ideas);

  if (lang === "en") {
    return `Create the article with these inputs:
- base title: ${safeString(payload.title)}
- primary keyword: ${safeString(payload.keyword)}
- category: ${safeString(payload.category) || "General"}
- key ideas to develop:
${ideas || "No specific ideas provided."}

MANDATORY: Answer the 3 obligatory questions BEFORE writing. Follow the Ferova Editorial Guide 2025 strictly. Start with an affirmative statement (Subject+Verb+Predicate). Include internal links. Generate between 800-1200 words. Validate: "Does this content truly help a business make better digital decisions?"`;
  }

  if (lang === "pt") {
    return `Crie o artigo com estas entradas:
- título base: ${safeString(payload.title)}
- palavra-chave principal: ${safeString(payload.keyword)}
- categoria: ${safeString(payload.category) || "Geral"}
- ideias principais para desenvolver:
${ideas || "Sem ideias específicas fornecidas."}

OBRIGATÓRIO: Responda as 3 perguntas obrigatórias ANTES de escrever. Siga o Guia Editorial Ferova 2025 estritamente. Comece com uma afirmação (Sujeito+Verbo+Predicado). Inclua links internos. Gere entre 800-1200 palavras. Valide: "Este conteúdo realmente ajuda uma empresa a tomar melhores decisões digitais?"`;
  }

  return `Crea el artículo con estos insumos:
- título base: ${safeString(payload.title)}
- keyword principal: ${safeString(payload.keyword)}
- categoría: ${safeString(payload.category) || "General"}
- ideas principales para desarrollar:
${ideas || "Sin ideas específicas proporcionadas."}

OBLIGATORIO: Responde las 3 preguntas obligatorias ANTES de escribir. Sigue la Guía Editorial Ferova 2025 estrictamente. Comienza con una afirmación (Sujeto+Verbo+Predicado). Incluye enlaces internos. Genera entre 800-1200 palabras. Valida: "¿Este contenido realmente ayuda a una empresa a tomar mejores decisiones digitales?"`;
};

const buildCaseSystemPrompt = (site?: "ferova", ferovaRules = "") =>
  site === "ferova"
    ? `Eres el editor senior de casos de Ferova. Devuelve SOLO JSON válido.

${ferovaRules ? ferovaRulesBlock(ferovaRules) : FEROVA_PRODUCT_CONTEXT}
Redacta un caso verificable sobre un sistema, producto, automatización o integración. Usa únicamente los hechos aportados. No inventes cifras, clientes, fechas ni atribución causal. Si falta evidencia, explica la limitación. El caso debe dejar claro el problema operativo, el diseño del sistema, la intervención y el aprendizaje.

JSON esperado:
{
  "slug": "", "client_public_name": "", "sector": "", "country": "", "summary": "", "challenge": "", "diagnosis": "", "intervention": "", "learnings": "", "limitations": "", "service_keys": [], "result_highlights": []
}`
    : `Eres el editor senior de casos de éxito de SEO Para Agencias by Ferova. Devuelve SOLO JSON válido.
${ferovaRules ? ferovaRulesBlock(ferovaRules) : ""}
Usa como principios obligatorios de calidad la GUÍA EDITORIAL FEROVA: lenguaje directo, profesional y específico; contexto antes que promoción; términos técnicos explicados; utilidad real; estructura lógica; cero relleno; cero clickbait; cero promesas; cero cifras, clientes, fechas, fuentes o resultados inventados.

El caso debe demostrar qué puede contratar una agencia por tarea, bolsa de horas o capacidad mensual. Redacta solo con los hechos entregados. Si falta evidencia, deja el resultado fuera y explica la limitación. No afirmes atribución causal absoluta.

JSON esperado:
{
  "slug": "",
  "client_public_name": "",
  "sector": "",
  "country": "",
  "summary": "",
  "challenge": "",
  "diagnosis": "",
  "intervention": "",
  "learnings": "",
  "limitations": "",
  "service_keys": [],
  "result_highlights": [{ "label": "", "value": "", "context": "" }]
}`;

const buildCaseUserPrompt = (
  payload: GenerateCasePayload,
) => `Convierte estos datos en un caso editable y verificable:
- título o cliente público: ${safeString(payload.title) || "Cliente confidencial"}
- sector: ${safeString(payload.sector)}
- país: ${safeString(payload.country)}
- servicios: ${(payload.services ?? []).map(safeString).filter(Boolean).join(", ")}
- hechos y contexto aportados por la editora: ${safeString(payload.facts)}
- reto conocido: ${safeString(payload.challenge)}
- intervención conocida: ${safeString(payload.intervention)}
- resultados aportados: ${JSON.stringify(payload.results ?? [])}

Conserva todas las cifras exactamente como fueron aportadas. No publiques nombres si se indicó confidencialidad. El resumen debe explicar la necesidad de la agencia, la capacidad contratada y la entrega.`;

const buildNewsletterSystemPrompt = (site?: "ferova", ferovaRules = "") =>
  site === "ferova"
    ? `Eres la editora senior de la newsletter de Ferova. Devuelve SOLO JSON válido.

${ferovaRules ? ferovaRulesBlock(ferovaRules) : FEROVA_PRODUCT_CONTEXT}
Convierte los insumos en una edición útil sobre sistemas, automatización, IA aplicada u operación. Una idea concreta por bloque, educación antes que venta y cero noticias, enlaces, cifras o herramientas inventadas.

Además entrega dos textos para que la editora los copie y pegue en LinkedIn (no se publican solos):
- "linkedin_summary": resumen de la edición en 2 o 3 frases, afirmativo y concreto.
- "linkedin_post": post para la PÁGINA DE EMPRESA de Ferova en LinkedIn. Habla Ferova en plural ("en Ferova…"), nunca en primera persona singular. Las dos primeras líneas (máximo 200 caracteres) plantean la idea central sin clickbait; después 3 aprendizajes en líneas cortas; cierra invitando a leer la edición completa en https://ferova.com.co/newsletter. Máximo 1.300 caracteres, sin cifras ni enlaces inventados, máximo 3 hashtags al final y sin emojis decorativos.

JSON esperado:
{
  "title": "", "subject_line": "", "topics": [""], "reading_time": 5,
  "free_content": { "news": "", "tip": "", "tool": { "name": "", "desc": "", "url": "" } },
  "pro_content": {},
  "linkedin_summary": "", "linkedin_post": ""
}`
    : `Eres la editora senior de la newsletter de SEO Para Agencias by Ferova. Devuelve SOLO JSON válido.
${ferovaRules ? ferovaRulesBlock(ferovaRules) : ""}
Aplica la GUÍA EDITORIAL FEROVA: una idea útil y concreta por bloque; tono conversado, senior y profesional; educación antes que venta; términos técnicos con contexto; nada de relleno, clickbait, cifras o fuentes inventadas. El contenido debe ayudar a dueños de agencias a decidir, entregar o vender mejor servicios de SEO técnico, mantenimiento web, landings, migraciones y ecommerce.

Además entrega dos textos para que María Fernanda los copie y pegue en LinkedIn (no se publican solos):
- "linkedin_summary": resumen de la edición en 2 o 3 frases, afirmativo y concreto.
- "linkedin_post": post para el PERFIL PERSONAL de María Fernanda Calderón, Fractional SEO en Ferova. Escribe en primera persona, como consultora senior que trabaja con agencias ("Cuando audito un catálogo…"). Las dos primeras líneas (máximo 200 caracteres) plantean la idea central sin clickbait; después 3 aprendizajes en líneas cortas; cierra invitando a leer la edición completa en https://seoparaecommerce.co/newsletter. Máximo 1.300 caracteres, sin cifras ni enlaces inventados, máximo 3 hashtags al final y sin emojis decorativos.

JSON esperado:
{
  "title": "",
  "subject_line": "",
  "topics": ["", "", ""],
  "reading_time": 5,
  "free_content": { "news": "", "tip": "", "tool": { "name": "", "desc": "", "url": "" } },
  "pro_content": { "case_study": "", "analysis": "", "resource": { "name": "", "desc": "", "url": "" }, "question": "" },
  "linkedin_summary": "",
  "linkedin_post": ""
}`;

const buildNewsletterUserPrompt = (
  payload: GenerateNewsletterPayload,
) => `Crea el borrador de la edición #${payload.editionNumber ?? ""} con estos datos:
- título base: ${safeString(payload.title)}
- asunto base: ${safeString(payload.subjectLine)}
- plan: ${payload.plan === "pro" ? "pro" : "gratis"}
- temas: ${(payload.topics ?? []).map(safeString).filter(Boolean).join(" | ")}
- información, enlaces y enfoque aportados por la editora: ${safeString(payload.ideas)}

No inventes noticias actuales, herramientas, enlaces, estudios o casos. Si no fueron aportados, deja esos campos vacíos. Para plan gratis devuelve pro_content como objeto vacío.`;

const normalizeArticle = (
  raw: Record<string, unknown>,
  fallback: GeneratePayload,
) => {
  const title = safeString(raw.title) || safeString(fallback.title);
  const slug = slugify(safeString(raw.slug) || title);
  const content = safeString(raw.content);
  const excerpt = truncate(safeString(raw.excerpt) || stripHtml(content), 150);
  const metaTitle = truncate(safeString(raw.meta_title) || title, 60);
  const metaDescription = truncate(
    safeString(raw.meta_description) || excerpt,
    160,
  );
  const category = safeString(raw.category) || safeString(fallback.category);
  const keyword = safeString(raw.keyword) || safeString(fallback.keyword);

  if (
    !title ||
    !slug ||
    !content ||
    !excerpt ||
    !metaTitle ||
    !metaDescription
  ) {
    throw new Error("El artículo generado está incompleto.");
  }

  const schemaArticle =
    raw.schema_article && typeof raw.schema_article === "object"
      ? raw.schema_article
      : null;
  const intencionBusqueda = safeString(raw.intencion_busqueda);
  const aportaOriginal = safeString(raw.aporta_original);

  return {
    title,
    slug,
    excerpt,
    content,
    meta_title: metaTitle,
    meta_description: metaDescription,
    category,
    keyword,
    cover_image: null as string | null,
    author: "Maria Calderon",
    active: true,
    validation_pass: raw.validation_pass === true,
    validation_reason: safeString(raw.validation_reason) || "",
    schema_article: schemaArticle,
    intencion_busqueda: intencionBusqueda,
    aporta_original: aportaOriginal,
  };
};

const getUniqueSlug = async (
  adminClient: ReturnType<typeof createClient>,
  baseSlug: string,
  excludeId?: string,
) => {
  const normalizedBase =
    slugify(baseSlug) || `articulo-${crypto.randomUUID().slice(0, 8)}`;
  let candidate = normalizedBase;
  let suffix = 1;

  while (true) {
    let query = adminClient
      .from("blog_posts")
      .select("slug")
      .eq("slug", candidate);
    if (excludeId) query = query.neq("id", excludeId);
    const { data, error } = await query.maybeSingle();

    if (error) throw new Error(`No se pudo validar el slug: ${error.message}`);
    if (!data) return candidate;

    suffix += 1;
    candidate = `${normalizedBase}-${suffix}`;
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (
      !LOVABLE_API_KEY ||
      !SUPABASE_URL ||
      !SUPABASE_SERVICE_ROLE_KEY ||
      !SUPABASE_ANON_KEY
    ) {
      throw new Error("Faltan secretos requeridos para el generador.");
    }

    // Require admin auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser(
      authHeader.replace("Bearer ", ""),
    );
    if (userErr || !userData?.user) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    const body = await req.json();
    const action = safeString(body?.action);
    const requestedSite =
      body?.payload?.site === "ferova"
        ? "ferova.com.co"
        : body?.payload?.lang === "en"
          ? "seoforecommerces.co"
          : "seoparaecommerce.co";
    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const [{ data: roles }, { data: siteAccess }] = await Promise.all([
      adminClient
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id),
      adminClient
        .from("cms_site_access")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("site_origin", requestedSite),
    ]);
    const legacyAdmin = roles?.some(
      (r: { role: string }) => r.role === "admin",
    );
    const cmsEditor = siteAccess?.some(
      (r: { role: string }) => r.role === "owner" || r.role === "editor",
    );
    if (!legacyAdmin && !cmsEditor) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }
    // Reglas del sitio que pide la generación (CLAUDE.md de cada repo).
    const ferovaRules = await getSiteRules(body?.payload?.site === "ferova" ? "ferova" : "seo");
    if (action === "generate") {
      const payload = (body?.payload ?? {}) as GeneratePayload;
      const lang =
        payload.lang === "en" || payload.lang === "pt" ? payload.lang : "es";

      if (!safeString(payload.title) || !safeString(payload.keyword)) {
        return jsonResponse(
          { error: "Título y keyword son obligatorios." },
          400,
        );
      }

      const modelResponse = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            temperature: 0.7,
            messages: [
              {
                role: "system",
                content: buildSystemPrompt(lang, payload.site, ferovaRules),
              },
              {
                role: "user",
                // Con las reglas del sitio cargadas, la guía a seguir es esa.
                content: ferovaRules
                  ? buildUserPrompt(payload).replace(
                      /Guía Editorial Ferova 2025|Ferova Editorial Guide 2025|Guia Editorial Ferova 2025/,
                      "REGLAS DEL SITIO",
                    )
                  : buildUserPrompt(payload),
              },
            ],
          }),
        },
      );

      if (!modelResponse.ok) {
        if (modelResponse.status === 429) {
          return jsonResponse(
            { error: "Rate limit exceeded. Try again later." },
            429,
          );
        }
        if (modelResponse.status === 402) {
          return jsonResponse({ error: "AI credits exhausted." }, 402);
        }
        const errorText = await modelResponse.text();
        throw new Error(`AI generation failed: ${errorText}`);
      }

      const modelJson = await modelResponse.json();
      const rawContent = safeString(modelJson?.choices?.[0]?.message?.content);
      const parsed = extractJson(rawContent) as Record<string, unknown>;
      const article = normalizeArticle(parsed, payload);
      article.slug = await getUniqueSlug(
        adminClient,
        article.slug,
        safeString(payload.excludeId) || undefined,
      );

      // Portada e imágenes internas generadas con IA (los dos sitios). Solo se
      // piden cuando hay reglas del sitio, que definen el estilo de imagen.
      let images: Awaited<ReturnType<typeof addArticleImages>> | null = null;
      if (ferovaRules) {
        const specs = parseImageSpecs(parsed.images);
        if (specs.length) {
          images = await addArticleImages(article, specs, LOVABLE_API_KEY, adminClient, payload.site === "ferova" ? "ferova" : "seo");
        }
      }

      const { validation_pass, validation_reason, ...articleData } = article;

      return jsonResponse({
        article: articleData,
        validation: { pass: validation_pass, reason: validation_reason },
        ...(images ? { images } : {}),
      });
    }

    if (action === "generate_case") {
      const payload = (body?.payload ?? {}) as GenerateCasePayload;
      if (
        !safeString(payload.facts) &&
        !safeString(payload.challenge) &&
        !safeString(payload.intervention)
      )
        return jsonResponse(
          { error: "Agrega hechos, reto o intervención antes de generar." },
          400,
        );
      const modelResponse = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            temperature: 0.45,
            messages: [
              { role: "system", content: buildCaseSystemPrompt(payload.site, ferovaRules) },
              { role: "user", content: buildCaseUserPrompt(payload) },
            ],
          }),
        },
      );
      if (!modelResponse.ok)
        return jsonResponse(
          {
            error:
              modelResponse.status === 429
                ? "Límite temporal del generador. Intenta de nuevo en unos minutos."
                : "No fue posible generar el caso.",
          },
          modelResponse.status === 429 ? 429 : 500,
        );
      const modelJson = await modelResponse.json();
      const generated = extractJson(
        safeString(modelJson?.choices?.[0]?.message?.content),
      ) as Record<string, unknown>;
      return jsonResponse({ case_study: generated });
    }

    if (action === "generate_newsletter") {
      const payload = (body?.payload ?? {}) as GenerateNewsletterPayload;
      if (!safeString(payload.title) || !safeString(payload.ideas))
        return jsonResponse(
          { error: "Agrega un título y la información base de la edición." },
          400,
        );
      const modelResponse = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            temperature: 0.55,
            messages: [
              {
                role: "system",
                content: buildNewsletterSystemPrompt(payload.site, ferovaRules),
              },
              { role: "user", content: buildNewsletterUserPrompt(payload) },
            ],
          }),
        },
      );
      if (!modelResponse.ok)
        return jsonResponse(
          {
            error:
              modelResponse.status === 429
                ? "Límite temporal del generador. Intenta de nuevo en unos minutos."
                : "No fue posible generar la edición.",
          },
          modelResponse.status === 429 ? 429 : 500,
        );
      const modelJson = await modelResponse.json();
      const generated = extractJson(
        safeString(modelJson?.choices?.[0]?.message?.content),
      ) as Record<string, unknown>;
      return jsonResponse({ newsletter: generated });
    }

    if (action === "save") {
      const raw = (body?.payload?.article ?? {}) as Record<string, unknown>;
      const title = safeString(raw.title);
      const slug = await getUniqueSlug(
        adminClient,
        safeString(raw.slug) || title,
      );
      let content = safeString(raw.content);
      const excerpt = truncate(
        safeString(raw.excerpt) || stripHtml(content),
        150,
      );

      if (!title || !slug || !content) {
        return jsonResponse({ error: "Artículo incompleto." }, 400);
      }

      // Auto-insert internal links to existing blog posts (max 3, only on first match)
      try {
        const { data: existingPosts } = await adminClient
          .from("blog_posts")
          .select("slug, title, keyword")
          .eq("active", true)
          .limit(50);
        if (existingPosts && existingPosts.length > 0) {
          let linksAdded = 0;
          for (const post of existingPosts) {
            if (linksAdded >= 3) break;
            const linkedPost = post as {
              keyword?: unknown;
              title?: unknown;
              slug?: unknown;
            };
            const anchorRaw =
              safeString(linkedPost.keyword) || safeString(linkedPost.title);
            if (!anchorRaw || anchorRaw.length < 4) continue;
            // Escape regex chars and match whole word, case-insensitive, only in paragraphs (avoid headings/existing links)
            const escaped = anchorRaw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regex = new RegExp(
              `(<p[^>]*>(?:(?!</p>).)*?)\\b(${escaped})\\b((?:(?!</p>).)*?</p>)`,
              "i",
            );
            // Skip if already linked
            const linkCheck = new RegExp(
              `<a[^>]*>[^<]*${escaped}[^<]*</a>`,
              "i",
            );
            if (linkCheck.test(content)) continue;
            if (regex.test(content)) {
              const href = `/blog/${safeString(linkedPost.slug)}`;
              content = content.replace(
                regex,
                `$1<a href="${href}" class="text-gold underline hover:opacity-80">$2</a>$3`,
              );
              linksAdded++;
            }
          }
        }
      } catch (linkErr) {
        console.warn("internal-links injection skipped:", linkErr);
      }

      const publishedAt =
        safeString(raw.published_at) || new Date().toISOString();

      const { data, error } = await adminClient
        .from("blog_posts")
        .insert({
          title,
          slug,
          content,
          excerpt,
          cover_image: safeString(raw.cover_image) || null,
          author: safeString(raw.author) || "Maria Calderon",
          active: raw.active === false ? false : true,
          category: safeString(raw.category) || null,
          keyword: safeString(raw.keyword) || null,
          meta_title: truncate(safeString(raw.meta_title) || title, 60),
          meta_description: truncate(
            safeString(raw.meta_description) || excerpt,
            160,
          ),
          published_at: publishedAt,
        })
        .select("id, slug, title")
        .single();

      if (error) throw new Error(`No se pudo guardar: ${error.message}`);

      return jsonResponse({ post: data });
    }

    return jsonResponse({ error: "Acción no soportada." }, 400);
  } catch (error) {
    console.error("blog-article-generator error:", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500,
    );
  }
});
