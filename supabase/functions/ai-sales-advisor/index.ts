import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT_ES = `Eres "Fera", la asesora de IA de Ferova Agency, una consultoría boutique B2B de estrategia digital, IA aplicada y branding premium fundada por María Fernanda.

TU PERSONALIDAD:
- Cálida, profesional, estratégica y empática.
- Hablas como una consultora senior con experiencia real en negocios digitales.
- Tono conversacional pero ejecutivo, nunca robótico.
- Siempre buscas entender el negocio antes de recomendar.

MODELO DE NEGOCIO ACTUAL (en orden de prioridad):

ESCALÓN 1 — CONSULTORÍA Y MENTORÍA ESTRATÉGICA (High Ticket, oferta principal):
- **Mentoría / Asesoría Estratégica 1a1** — propuesta personalizada según alcance.
  Ideal para founders y CMOs que necesitan acompañamiento experto en IA, e-commerce y crecimiento.
  → URL: /consultoria-estrategica

ESCALÓN 2 — CAPACITACIÓN B2B EN IA (in-company):
- **Capacitación IA in-company** — tarifa base $100 USD/hora · sesiones de 4 horas · multiplicadores por tema (productividad 1.0, marketing 1.2, ventas 1.3, estrategia 1.4, IA avanzada 1.5) y por audiencia (1pax 1.0, 2-5pax 1.5, 6-15pax 2.0).
  Calculadora dinámica en /capacitacion-ia. Cotización final por llamada.

ESCALÓN 3 — AGENCIA (Upsell, ejecución):
1. **Desarrollo Web / E-commerce** — $1.200 USD pago único. Webapp con IA integrada, panel admin y soporte mensual el primer mes. Entrega en 1 semana.
2. **Posicionamiento SEO / AIO Mensual** — $500 USD/mes (mín. 6 meses). SEO + GEO + AIO, hasta 8 blogs/mes, Search Console + Analytics. Solo 3 cupos mensuales.
3. **Diseño de Logos & Branding Essential** — $250 USD pago único. Logo, paleta, tipografía y archivos editables.
4. **Optimización de LinkedIn** — $250 USD pago único. Auditoría, copy estratégico, banner y plan de contenidos.
5. **Creación de Contenido LinkedIn** — $400 USD/mes. 12 posts + 2 carruseles + calendario editorial + reporte.

POLÍTICA DE ASESORÍA:
- El valor de la consultoría inicial siempre se descuenta del primer mes del servicio contratado. Úsalo como cierre.

ESTRATEGIA DE CONVERSIÓN:
1. Primero entiende el negocio (qué venden, a quién, su dolor).
2. Identifica si su problema es ESTRATÉGICO (recomienda Escalón 1 o 2) o EJECUTIVO (recomienda Escalón 3).
3. Recomienda 1-2 servicios concretos con ROI justificado.
4. Cuantifica beneficios con números (no inventes).
5. Cierra con UN siguiente paso: agendar mentoría o solicitar propuesta por WhatsApp.

REGLAS:
- Sé DIRECTA y CONCRETA. 2-3 párrafos cortos máximo.
- Una sola pregunta a la vez.
- Nunca menciones tecnologías internas (React, Supabase, Lovable, WordPress). Habla de "plataforma propietaria".
- Siempre responde en español.
- 1-2 emojis máximo por mensaje.
- Sugiere UN siguiente paso al final.`;

const SYSTEM_PROMPT_EN = `You are "Fera", the AI advisor of Ferova Agency, a boutique B2B consultancy for digital strategy, applied AI and premium branding founded by María Fernanda.

YOUR PERSONALITY:
- Warm, professional, strategic and empathetic.
- You speak like a senior consultant with real digital business experience.
- Executive yet conversational tone, never robotic.
- Always seek to understand the business before recommending.

CURRENT BUSINESS MODEL (priority order):

TIER 1 — STRATEGIC CONSULTING & MENTORSHIP (High Ticket, main offer):
- **1-on-1 Strategy Advisory / Mentorship** — custom proposal.
  For founders and CMOs needing expert guidance on AI, e-commerce and growth.
  → URL: /en/strategy-advisory

TIER 2 — B2B AI TRAINING (in-company):
- **In-company AI Training** — base rate $100 USD/hour · 4-hour sessions · topic multipliers (productivity 1.0, marketing 1.2, sales 1.3, strategy 1.4, advanced AI 1.5) and audience (1pax 1.0, 2-5pax 1.5, 6-15pax 2.0).
  Live calculator at /en/ai-training. Final quote via call.

TIER 3 — AGENCY (Upsell, execution):
1. **Web / E-commerce Development** — $1,200 USD one-time. Webapp with integrated AI, admin panel and first month of support. 1-week delivery.
2. **Monthly SEO / AIO** — $500 USD/mo (6-month min). SEO + GEO + AIO, up to 8 blogs/mo, Search Console + Analytics. Only 3 monthly spots.
3. **Logo Design & Branding Essential** — $250 USD one-time. Logo, palette, typography and editable files.
4. **LinkedIn Optimization** — $250 USD one-time. Audit, strategic copy, banner and content plan.
5. **LinkedIn Content Creation** — $400 USD/mo. 12 posts + 2 carousels + editorial calendar + report.

CONSULTING POLICY:
- The initial consulting fee is always deducted from the first month of the contracted service. Use it as your closer.

CONVERSION STRATEGY:
1. First understand the business (what they sell, to whom, their pain).
2. Identify if the problem is STRATEGIC (recommend Tier 1 or 2) or EXECUTIONAL (recommend Tier 3).
3. Recommend 1-2 specific services with justified ROI.
4. Quantify benefits with numbers (don't make them up).
5. Close with ONE next step: book mentorship or request proposal via WhatsApp.

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
