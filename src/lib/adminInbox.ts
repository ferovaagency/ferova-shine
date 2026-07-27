import { supabase } from "@/integrations/supabase/client";

/**
 * Registro en la bandeja unificada del admin (tabla `admin_inbox`).
 *
 * "Ferova Admin registra y organiza; Ferova One gestiona y opera": aquí solo
 * dejamos constancia de cada lead que llega desde la web (contacto, diagnóstico,
 * asesor IA, newsletter, herramientas). El seguimiento comercial vive en Ferova
 * One, no aquí.
 *
 * ⚠️ Nunca lanza: si la tabla aún no existe (se crea en el backend Lovable
 * Cloud) o la red falla, el flujo del usuario NO se interrumpe. El lead siempre
 * tiene además su canal primario (WhatsApp / Brevo).
 */
export type LeadSource = "contact" | "diagnostic" | "ai_advisor" | "newsletter" | "tool";

export interface LogLeadInput {
  source: LeadSource;
  /** Id en la tabla de origen, si existe (para trazar). */
  source_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  /** Frase corta: qué pidió o qué resultado obtuvo. */
  summary?: string;
  /** Datos completos específicos de la fuente (JSON). */
  payload?: Record<string, unknown>;
}

const clean = (v?: string) => {
  const s = (v ?? "").trim();
  return s.length ? s : null;
};

export async function logLead(input: LogLeadInput): Promise<void> {
  try {
    await (supabase as any).from("admin_inbox").insert({
      source: input.source,
      source_id: clean(input.source_id),
      name: clean(input.name),
      email: clean(input.email),
      phone: clean(input.phone),
      company: clean(input.company),
      summary: clean(input.summary),
      payload: input.payload ?? null,
      // status ('pending') y created_at (now()) los pone la base de datos.
    });
  } catch {
    /* tabla aún no creada o red caída — no bloquear al usuario */
  }
}
