// Edge function: alta en el newsletter propio de cada sitio, sin Brevo.
//
// La usan el formulario de Fera en /newsletter de ferova.com.co y de
// seoparaecommerce.co. Guarda en public.newsletter_subscribers con el sitio y
// la prueba de la autorización de tratamiento de datos. Sin consentimiento
// explícito no se guarda nada.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

// El sitio se decide en el servidor: nunca se guarda un origen arbitrario.
const SITE_ORIGINS: Record<string, string> = {
  ferova: "ferova.com.co",
  seoparaecommerce: "seoparaecommerce.co",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? "").trim().toLowerCase();
    const name = String(body?.name ?? "").trim().slice(0, 120);
    const lang = body?.lang === "en" ? "en" : "es";
    const siteOrigin = SITE_ORIGINS[String(body?.site ?? "")] ?? SITE_ORIGINS.seoparaecommerce;
    const consentText = String(body?.consent_text ?? "").trim().slice(0, 600);
    const source = String(body?.source ?? "fera").trim().slice(0, 60) || "fera";

    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return json({ error: lang === "en" ? "Enter a valid email." : "Escribe un correo válido." }, 400);
    }
    if (!name) {
      return json({ error: lang === "en" ? "Tell us your name." : "Escribe tu nombre." }, 400);
    }
    if (body?.consent !== true || !consentText) {
      return json(
        {
          error:
            lang === "en"
              ? "You need to accept the data processing policy to subscribe."
              : "Necesitas aceptar la política de tratamiento de datos para suscribirte.",
        },
        400,
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const record = {
      email,
      name,
      lang,
      plan: "free",
      active: true,
      site_origin: siteOrigin,
      consent: true,
      consent_at: new Date().toISOString(),
      consent_text: consentText,
      source,
    };

    const { data: existing, error: findError } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .eq("site_origin", siteOrigin)
      .ilike("email", email)
      .limit(1)
      .maybeSingle();
    if (findError) throw findError;

    const { error } = existing
      ? await supabase.from("newsletter_subscribers").update(record).eq("id", existing.id)
      : await supabase.from("newsletter_subscribers").insert(record);
    if (error) throw error;

    return json({
      success: true,
      already: Boolean(existing),
      message: existing
        ? lang === "en"
          ? "You were already subscribed. We updated your details."
          : "Ya estabas en la lista. Actualizamos tus datos."
        : lang === "en"
          ? "Done, you're subscribed."
          : "Listo, quedaste suscrito.",
    });
  } catch (error: unknown) {
    console.error("newsletter-subscribe error:", error instanceof Error ? error.message : error);
    return json({ error: "No fue posible completar la suscripción. Intenta de nuevo." }, 500);
  }
});
