import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type GeneratePayload = {
  title?: string;
  keyword?: string;
  category?: string;
  ideas?: string;
  lang?: "es" | "en" | "pt";
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const safeString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 80);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

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
Incluir 2-4 enlaces internos hacia servicios relevantes del sitio:
/servicios/seo-ecommerce, /servicios/diseno-web, /servicios/pauta-digital, /servicios/asesorias-marketing, /contacto, /blog
`;

const buildSystemPrompt = (lang: "es" | "en" | "pt") => {
  const langNote = lang === "en"
    ? "Write the article entirely in English."
    : lang === "pt"
    ? "Escreva o artigo inteiramente em português brasileiro."
    : "Escribe el artículo enteramente en español.";

  return `Eres el editor SEO senior de Ferova Agency. Devuelve SOLO JSON válido, sin markdown, sin comentarios y sin texto extra.

${GUIA_EDITORIAL}

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
  "validation_reason": ""
}`;
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

const normalizeArticle = (raw: Record<string, unknown>, fallback: GeneratePayload) => {
  const title = safeString(raw.title) || safeString(fallback.title);
  const slug = slugify(safeString(raw.slug) || title);
  const content = safeString(raw.content);
  const excerpt = truncate(safeString(raw.excerpt) || stripHtml(content), 150);
  const metaTitle = truncate(safeString(raw.meta_title) || title, 60);
  const metaDescription = truncate(safeString(raw.meta_description) || excerpt, 160);
  const category = safeString(raw.category) || safeString(fallback.category);
  const keyword = safeString(raw.keyword) || safeString(fallback.keyword);

  if (!title || !slug || !content || !excerpt || !metaTitle || !metaDescription) {
    throw new Error("El artículo generado está incompleto.");
  }

  return {
    title,
    slug,
    excerpt,
    content,
    meta_title: metaTitle,
    meta_description: metaDescription,
    category,
    keyword,
    cover_image: null,
    author: "Maria Calderon",
    active: true,
    validation_pass: raw.validation_pass === true,
    validation_reason: safeString(raw.validation_reason) || "",
  };
};

const getUniqueSlug = async (adminClient: any, baseSlug: string) => {
  const normalizedBase = slugify(baseSlug) || `articulo-${crypto.randomUUID().slice(0, 8)}`;
  let candidate = normalizedBase;
  let suffix = 1;

  while (true) {
    const { data, error } = await adminClient
      .from("blog_posts")
      .select("slug")
      .eq("slug", candidate)
      .maybeSingle();

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
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Faltan secretos requeridos para el generador.");
    }

    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const body = await req.json();
    const action = safeString(body?.action);

    if (action === "generate") {
      const payload = (body?.payload ?? {}) as GeneratePayload;
      const lang = (payload.lang === "en" || payload.lang === "pt") ? payload.lang : "es";

      if (!safeString(payload.title) || !safeString(payload.keyword)) {
        return jsonResponse({ error: "Título y keyword son obligatorios." }, 400);
      }

      const modelResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          temperature: 0.7,
          messages: [
            { role: "system", content: buildSystemPrompt(lang) },
            { role: "user", content: buildUserPrompt(payload) },
          ],
        }),
      });

      if (!modelResponse.ok) {
        if (modelResponse.status === 429) {
          return jsonResponse({ error: "Rate limit exceeded. Try again later." }, 429);
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
      article.slug = await getUniqueSlug(adminClient, article.slug);

      const { validation_pass, validation_reason, ...articleData } = article;

      return jsonResponse({
        article: articleData,
        validation: { pass: validation_pass, reason: validation_reason },
      });
    }

    if (action === "save") {
      const raw = (body?.payload?.article ?? {}) as Record<string, unknown>;
      const title = safeString(raw.title);
      const slug = await getUniqueSlug(adminClient, safeString(raw.slug) || title);
      const content = safeString(raw.content);
      const excerpt = truncate(safeString(raw.excerpt) || stripHtml(content), 150);

      if (!title || !slug || !content) {
        return jsonResponse({ error: "Artículo incompleto." }, 400);
      }

      const publishedAt = safeString(raw.published_at) || new Date().toISOString();

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
          meta_description: truncate(safeString(raw.meta_description) || excerpt, 160),
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
