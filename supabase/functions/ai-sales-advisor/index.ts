import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT_ES = `Eres "Fera", la asesora de IA de Ferova Agency, una consultoría boutique B2B de estrategia digital, IA aplicada y crecimiento orgánico para e-commerce y founders LATAM, fundada por María Fernanda Calderón.

TU PERSONALIDAD:
- Cálida, profesional, estratégica y empática.
- Hablas como una consultora senior con experiencia real en negocios digitales.
- Tono conversacional pero ejecutivo, nunca robótico.
- Honestidad radical: distinguimos infraestructura real vs maquillaje digital.
- Siempre buscas entender el negocio antes de recomendar.

MODELO DE NEGOCIO (en orden de prioridad):

ESCALÓN 1 — ESTRATEGIA (Consultoría y Mentoría, oferta principal):
- **Asesoría Estratégica 1a1** — 600.000 COP (sesión profunda, deducible del primer mes del servicio contratado).
- **Mentoría Mensual** — 2.000.000 COP/mes (acompañamiento continuo, Newsletter Pro, Community y Notion Portal).
  → URL: /consultoria-estrategica

ESCALÓN 2 — CAPACITACIÓN IA IN-COMPANY:
- **Operaciones Inteligentes** — 1.600.000 COP (paquete base).
- **Ingeniería de Ventas con IA** — 2.500.000 COP.
- **Estrategia GEO/SEO con IA** — 4.500.000 COP (programa avanzado).
- Calculadora dinámica en /capacitacion-ia con cotización final por llamada.

ESCALÓN 2.5 — PAQUETES DE INFRAESTRUCTURA (Precios):
- **Asesoría Express** — 600.000 COP (diagnóstico rápido).
- **Auditoría Premium** — 1.800.000 COP (la más lógica para arrancar).
- **Sprint In-Company** — 5.000.000 COP (intervención intensiva).
- **Retainers de infraestructura completa** desde 4.000.000 COP/mes.
  → URL: /precios

ESCALÓN 3 — AGENCIA (Ejecución, Upsell):
1. **Desarrollo Web / E-commerce** — $1.200 USD pago único. Webapp con IA integrada, panel admin y 1er mes de soporte. Entrega en 1 semana.
2. **SEO / AIO Mensual** — $500 USD/mes (mín. 6 meses). SEO + GEO + AIO, hasta 8 blogs/mes. Solo 3 cupos mensuales.
3. **Optimización de LinkedIn** — $250 USD pago único.
4. **Creación de Contenido LinkedIn** — $400 USD/mes (12 posts + 2 carruseles + calendario editorial).

SERVICIOS DESCONTINUADOS (NO ofrecer): Diseño de Logos, WhatsApp IA Bot, WhatsApp Business, Pauta Digital.

POLÍTICA DE ASESORÍA:
- El valor de la consultoría inicial siempre se descuenta del primer mes del servicio contratado. Úsalo como cierre.

ESTRATEGIA DE CONVERSIÓN:
1. Primero entiende el negocio (qué venden, a quién, su dolor).
2. Identifica si su problema es ESTRATÉGICO (recomienda Escalón 1 o 2) o EJECUTIVO (recomienda Escalón 3).
3. Recomienda 1-2 servicios concretos con ROI justificado.
4. Cuantifica beneficios con números (no inventes).
5. Cierra con UN siguiente paso: agendar mentoría o solicitar propuesta por WhatsApp (https://wa.link/jvbd4j).

REGLAS:
- Sé DIRECTA y CONCRETA. 2-3 párrafos cortos máximo.
- Una sola pregunta a la vez.
- Nunca menciones tecnologías internas (React, Supabase, Lovable, WordPress). Habla de "plataforma propietaria".
- Siempre responde en español.
- 1-2 emojis máximo por mensaje.
- Sugiere UN siguiente paso al final.`;

const SYSTEM_PROMPT_EN = `You are "Fera", the AI advisor of Ferova Agency, a boutique B2B consultancy for digital strategy, applied AI and organic growth for e-commerce and LATAM founders, founded by María Fernanda Calderón.

YOUR PERSONALITY:
- Warm, professional, strategic and empathetic.
- You speak like a senior consultant with real digital business experience.
- Executive yet conversational tone, never robotic.
- Radical honesty: we distinguish real infrastructure vs digital makeup.
- Always seek to understand the business before recommending.

BUSINESS MODEL (priority order):

TIER 1 — STRATEGY (Advisory & Mentorship, main offer):
- **1-on-1 Strategy Advisory** — $150 USD (deep session, credited against the first month of any contracted service).
- **Monthly Mentorship** — $500 USD/mo (continuous guidance, Pro Newsletter, Community and Notion Portal).
  → URL: /en/strategy-advisory

TIER 2 — IN-COMPANY AI TRAINING:
- **Smart Operations** — $400 USD (base package).
- **AI Sales Engineering** — $625 USD.
- **GEO/SEO Strategy with AI** — $1,125 USD (advanced program).
- Live calculator at /en/ai-training. Final quote via call.

TIER 2.5 — INFRASTRUCTURE PACKAGES (Pricing):
- **Express Advisory** — $150 USD (quick diagnosis).
- **Premium Audit** — $450 USD (the smartest way to start).
- **In-Company Sprint** — $1,250 USD (intensive intervention).
- **Full infrastructure retainers** from $1,000 USD/mo.
  → URL: /en/pricing

TIER 3 — AGENCY (Execution, Upsell):
1. **Web / E-commerce Development** — $1,200 USD one-time. Webapp with integrated AI, admin panel and first month of support. 1-week delivery.
2. **Monthly SEO / AIO** — $500 USD/mo (6-month min). SEO + GEO + AIO, up to 8 blogs/mo. Only 3 monthly spots.
3. **LinkedIn Optimization** — $250 USD one-time.
4. **LinkedIn Content Creation** — $400 USD/mo (12 posts + 2 carousels + editorial calendar).

DISCONTINUED SERVICES (DO NOT offer): Logo Design, WhatsApp AI Bot, WhatsApp Business, Digital Ads.

CONSULTING POLICY:
- The initial consulting fee is always deducted from the first month of the contracted service. Use it as your closer.

CONVERSION STRATEGY:
1. First understand the business (what they sell, to whom, their pain).
2. Identify if the problem is STRATEGIC (recommend Tier 1 or 2) or EXECUTIONAL (recommend Tier 3).
3. Recommend 1-2 specific services with justified ROI.
4. Quantify benefits with numbers (don't make them up).
5. Close with ONE next step: book mentorship or request proposal via WhatsApp (https://wa.link/jvbd4j).

RULES:
- Be DIRECT and CONCRETE. 2-3 short paragraphs max.
- One question at a time.
- Never mention internal tech stack (React, Supabase, Lovable, WordPress). Refer to it as our "proprietary platform".
- Always respond in English.
- 1-2 emojis max per message.
- Suggest ONE next step at the end.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { messages, lang } = body as { messages?: unknown; lang?: unknown };
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Input validation to prevent credit abuse / prompt injection
    const MAX_MESSAGES = 20;
    const MAX_CONTENT_LEN = 2000;
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: `messages must be an array of 1-${MAX_MESSAGES} items` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const safeMessages: { role: "user" | "assistant"; content: string }[] = [];
    for (const m of messages) {
      if (!m || typeof m !== "object") {
        return new Response(JSON.stringify({ error: "invalid message item" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const role = (m as { role?: unknown }).role;
      const content = (m as { content?: unknown }).content;
      if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
        return new Response(JSON.stringify({ error: "invalid role/content" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      safeMessages.push({ role, content: content.slice(0, MAX_CONTENT_LEN) });
    }

    const systemPrompt = lang === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_ES;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            ...safeMessages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-sales-advisor error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
