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
  lang?: "es" | "en";
};

type ArticlePayload = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  category?: string;
  keyword?: string;
  cover_image?: string | null;
  author?: string;
  active?: boolean;
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

const buildSystemPrompt = (lang: "es" | "en") =>
  lang === "es"
    ? `Eres un editor SEO senior de Ferova Agency. Devuelve SOLO JSON válido, sin markdown, sin comentarios y sin texto extra.

Genera un artículo comercial y útil para blog corporativo.
Requisitos estrictos:
- title: SEO-friendly y claro.
- slug: corto, limpio y orientado SEO.
- excerpt: máximo 150 caracteres.
- content: HTML válido con un solo h1 omitido, varios <h2>, algunos <h3> y párrafos <p>.
- meta_title: máximo 60 caracteres.
- meta_description: máximo 155 caracteres.
- category: string.
- keyword: string.
- Tono: concreto, profesional, persuasivo y sin relleno.
- Enfoca el contenido en negocio, beneficios, monetización y claridad.
- No inventes datos absurdos ni promesas absolutas.

JSON esperado:
{
  "title": "",
  "slug": "",
  "excerpt": "",
  "content": "",
  "meta_title": "",
  "meta_description": "",
  "category": "",
  "keyword": ""
}`
    : `You are a senior SEO editor for Ferova Agency. Return ONLY valid JSON, with no markdown, comments or extra text.

Generate a commercially useful corporate blog article.
Strict requirements:
- title: SEO-friendly and clear.
- slug: short, clean and SEO-oriented.
- excerpt: max 150 characters.
- content: valid HTML with no h1, several <h2>, some <h3> and paragraph <p> tags.
- meta_title: max 60 characters.
- meta_description: max 155 characters.
- category: string.
- keyword: string.
- Tone: direct, professional, persuasive and concise.
- Focus on business impact, monetization, benefits and clarity.
- Do not invent absurd figures or absolute promises.

Expected JSON:
{
  "title": "",
  "slug": "",
  "excerpt": "",
  "content": "",
  "meta_title": "",
  "meta_description": "",
  "category": "",
  "keyword": ""
}`;

const buildUserPrompt = (payload: GeneratePayload) => {
  const lang = payload.lang === "en" ? "en" : "es";
  return lang === "es"
    ? `Crea el artículo con estos insumos:\n- título base: ${safeString(payload.title)}\n- keyword principal: ${safeString(payload.keyword)}\n- categoría: ${safeString(payload.category) || "General"}`
    : `Create the article with these inputs:\n- base title: ${safeString(payload.title)}\n- primary keyword: ${safeString(payload.keyword)}\n- category: ${safeString(payload.category) || "General"}`;
};

const normalizeArticle = (raw: Record<string, unknown>, fallback: GeneratePayload) => {
  const title = safeString(raw.title) || safeString(fallback.title);
  const slug = slugify(safeString(raw.slug) || title);
  const content = safeString(raw.content);
  const excerpt = truncate(safeString(raw.excerpt) || stripHtml(content), 150);
  const metaTitle = truncate(safeString(raw.meta_title) || title, 60);
  const metaDescription = truncate(safeString(raw.meta_description) || excerpt, 155);
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
  };
};

const getUniqueSlug = async (adminClient: ReturnType<typeof createClient>, baseSlug: string) => {
  const normalizedBase = slugify(baseSlug) || `articulo-${crypto.randomUUID().slice(0, 8)}`;
  let candidate = normalizedBase;
  let suffix = 1;

  while (true) {
    const { data, error } = await adminClient
      .from("blog_posts")
      .select("slug")
      .eq("slug", candidate)
      .maybeSingle();

    if (error) {
      throw new Error(`No se pudo validar el slug: ${error.message}`);
    }

    if (!data) return candidate;

    suffix += 1;
    candidate = `${normalizedBase}-${suffix}`;
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!req.headers.get("Authorization")) {
    return jsonResponse({ error: "Unauthorized" }, 401);
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
      const lang = payload.lang === "en" ? "en" : "es";

      if (!safeString(payload.title) || !safeString(payload.keyword)) {
        return jsonResponse({ error: lang === "es" ? "Título y keyword son obligatorios." : "Title and keyword are required." }, 400);
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
        const errorText = await modelResponse.text();
        throw new Error(`AI generation failed: ${errorText}`);
      }

      const modelJson = await modelResponse.json();
      const rawContent = safeString(modelJson?.choices?.[0]?.message?.content);
      const parsed = extractJson(rawContent) as Record<string, unknown>;
      const article = normalizeArticle(parsed, payload);
      article.slug = await getUniqueSlug(adminClient, article.slug);

      return jsonResponse({ article });
    }

    if (action === "save") {
      const article = normalizeArticle((body?.payload?.article ?? {}) as Record<string, unknown>, {});
      const slug = await getUniqueSlug(adminClient, article.slug || article.title);

      const { data, error } = await adminClient
        .from("blog_posts")
        .insert({
          title: article.title,
          slug,
          content: article.content,
          excerpt: article.excerpt,
          cover_image: article.cover_image,
          author: article.author,
          active: article.active,
          category: article.category || null,
          keyword: article.keyword || null,
          meta_title: article.meta_title,
          meta_description: article.meta_description,
        })
        .select("id, slug, title")
        .single();

      if (error) {
        throw new Error(`No se pudo guardar el artículo: ${error.message}`);
      }

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
