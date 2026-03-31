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

const buildSystemPrompt = (lang: "es" | "en" | "pt") => {
  const base = `Eres el editor SEO senior de Ferova Agency. Devuelve SOLO JSON válido, sin markdown, sin comentarios y sin texto extra.

GUÍA EDITORIAL FEROVA AGENCY 2025 — REGLAS OBLIGATORIAS:

ESTRUCTURA JERÁRQUICA:
- H1 Único: Máximo 65 caracteres. Fórmula: [Keyword principal] + [Promesa de valor/Contexto].
- Primera oración: OBLIGATORIAMENTE afirmativa (Sujeto + Verbo + Predicado). PROHIBIDO comenzar con preguntas o anécdotas.
- Introducción: Un párrafo que explique qué aprenderá el lector, el contexto del problema y la promesa de valor.
- Cuerpo: H2 para temas principales, H3 para subtemas. PROHIBIDO saltar niveles (ej. de H2 a H4).

CALIDAD Y SEO:
- Extensión: Entre 800 y 1.200 palabras.
- Tono: Conversado pero profesional. Explica cada término técnico con su porqué y para qué.
- Densidad SEO: Keyword en H1, primer párrafo (primeras 100 palabras) y en al menos un H2.
- Autoridad: Menciona a Ferova Agency solo para reforzar autoridad técnica (ej. "En Ferova Agency analizamos..."). PROHIBIDO venta agresiva o frases como "somos los mejores".
- Enlaces internos: Genera enlaces <a href="..."> naturales hacia servicios relevantes del sitio (/servicios/seo-ecommerce, /servicios/diseno-web, /servicios/pauta-digital, /servicios/asesorias-marketing, /contacto).

CIERRE ESTRATÉGICO:
- Conclusión clara (2-3 oraciones)
- Resumen práctico (puntos clave en lista)
- Reflexión estratégica
- Invitación sutil (CTA no agresivo)

VALIDACIÓN FINAL:
- Responde internamente: "¿Este contenido realmente ayuda a una empresa a tomar mejores decisiones digitales?" Si no, reescribe.

METADATOS:
- meta_title: Máximo 60 caracteres con keyword + contexto.
- meta_description: 150-160 caracteres con propuesta de valor y CTA implícito.
- slug: URL amigable con keyword principal.
- excerpt: máximo 150 caracteres.

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

  if (lang === "en") return base.replace("Eres el editor SEO senior", "You are the senior SEO editor");
  if (lang === "pt") return base.replace("Eres el editor SEO senior", "Você é o editor SEO sênior");
  return base;
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

IMPORTANT: Follow the Ferova Editorial Guide 2025 strictly. Transform the ideas into structured, SEO-optimized content. Include internal links. Validate the article answers: "Does this content truly help a business make better digital decisions?"`;
  }
  
  if (lang === "pt") {
    return `Crie o artigo com estas entradas:
- título base: ${safeString(payload.title)}
- palavra-chave principal: ${safeString(payload.keyword)}
- categoria: ${safeString(payload.category) || "Geral"}
- ideias principais para desenvolver:
${ideas || "Sem ideias específicas fornecidas."}

IMPORTANTE: Siga o Guia Editorial Ferova 2025 estritamente. Transforme as ideias em conteúdo estruturado e otimizado para SEO. Inclua links internos. Valide se o artigo responde: "Este conteúdo realmente ajuda uma empresa a tomar melhores decisões digitais?"`;
  }

  return `Crea el artículo con estos insumos:
- título base: ${safeString(payload.title)}
- keyword principal: ${safeString(payload.keyword)}
- categoría: ${safeString(payload.category) || "General"}
- ideas principales para desarrollar:
${ideas || "Sin ideas específicas proporcionadas."}

IMPORTANTE: Sigue la Guía Editorial Ferova 2025 estrictamente. Transforma las ideas en contenido estructurado y optimizado para SEO. Incluye enlaces internos. Valida que el artículo responda: "¿Este contenido realmente ayuda a una empresa a tomar mejores decisiones digitales?"`;
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
    author: "AnnovaSoft",
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

      const { data, error } = await adminClient
        .from("blog_posts")
        .insert({
          title,
          slug,
          content,
          excerpt,
          cover_image: safeString(raw.cover_image) || null,
          author: safeString(raw.author) || "AnnovaSoft",
          active: raw.active === false ? false : true,
          category: safeString(raw.category) || null,
          keyword: safeString(raw.keyword) || null,
          meta_title: truncate(safeString(raw.meta_title) || title, 60),
          meta_description: truncate(safeString(raw.meta_description) || excerpt, 160),
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
