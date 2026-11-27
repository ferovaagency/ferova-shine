import { useId, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Bot, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { getSupabase } from "@/integrations/supabase/lazy";
import { trackEvent } from "@/lib/analytics";

/**
 * Suscripción al newsletter de seoparaecommerce.co a través de Fera.
 *
 * Sin Brevo: la edge function `newsletter-subscribe` guarda el alta en
 * `newsletter_subscribers` (site_origin seoparaecommerce.co) y solo si la
 * persona marcó la autorización de tratamiento de datos. El texto exacto que
 * aceptó se guarda con la fecha como prueba del consentimiento (Ley 1581).
 */

const COPY = {
  es: {
    role: "Fera · Asistente de María Fernanda",
    hello:
      "Soy Fera. Déjame tu nombre y tu correo y te aviso cada vez que María Fernanda publique una edición del newsletter.",
    name: "Nombre",
    email: "Correo",
    consent:
      "Autorizo a María Fernanda Calderón (Ferova) a tratar mi nombre y mi correo para enviarme el newsletter, según la política de privacidad. Puedo darme de baja cuando quiera.",
    privacy: "Leer la política de privacidad",
    privacyPath: "/privacidad",
    submit: "Suscribirme",
    sending: "Fera está guardando tus datos…",
    needConsent: "Para suscribirte necesito que aceptes el tratamiento de datos.",
    done: (name: string) => `Listo, ${name}. Quedaste en la lista y te escribiré cuando salga la próxima edición.`,
    error: "No pude completar la suscripción. Intenta de nuevo en un momento.",
  },
  en: {
    role: "Fera · María Fernanda's assistant",
    hello:
      "I'm Fera. Leave your name and email and I'll let you know whenever María Fernanda publishes a new newsletter edition.",
    name: "Name",
    email: "Email",
    consent:
      "I authorise María Fernanda Calderón (Ferova) to process my name and email to send me the newsletter, as described in the privacy policy. I can unsubscribe at any time.",
    privacy: "Read the privacy policy",
    privacyPath: "/en/privacy",
    submit: "Subscribe",
    sending: "Fera is saving your details…",
    needConsent: "To subscribe, please accept the data processing terms.",
    done: (name: string) => `Done, ${name}. You're on the list and I'll write when the next edition is out.`,
    error: "I couldn't complete the subscription. Please try again in a moment.",
  },
};

export function FeraNewsletterSignup({ lang = "es" }: { lang?: "es" | "en" }) {
  const copy = COPY[lang];
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!consent) {
      setStatus("error");
      setMessage(copy.needConsent);
      return;
    }
    setStatus("sending");
    setMessage(copy.sending);
    try {
      const supabase = await getSupabase();
      const { data, error } = await supabase.functions.invoke("newsletter-subscribe", {
        body: {
          name: name.trim(),
          email: email.trim(),
          lang,
          site: "seoparaecommerce",
          consent: true,
          consent_text: copy.consent,
          source: "fera_newsletter",
        },
      });
      let serverError: string | undefined = data?.error;
      if (error && !serverError) {
        try {
          serverError = (await (error as { context?: Response }).context?.json?.())?.error;
        } catch {
          serverError = undefined;
        }
      }
      if (error || serverError || !data?.success) throw new Error(serverError || copy.error);
      trackEvent("newsletter_signup", { site: "seoparaecommerce", lang, source: "fera_newsletter" });
      setStatus("done");
      setMessage(copy.done(name.trim().split(" ")[0] || name.trim()));
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error && err.message ? err.message : copy.error);
    }
  };

  return (
    <div className="panel-card">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#541014] text-white">
          <Bot aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <p className="fx-muted text-xs uppercase tracking-[.16em]" style={{ fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}>
            {copy.role}
          </p>
          <p className="mt-2 leading-relaxed">{status === "done" ? message : copy.hello}</p>
        </div>
      </div>

      {status === "done" ? null : (
        <form onSubmit={(e) => void submit(e)} className="mt-6 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold" htmlFor={`${id}-name`}>
              {copy.name}
              <Input id={`${id}-name`} className="mt-2" autoComplete="given-name" required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="block text-sm font-semibold" htmlFor={`${id}-email`}>
              {copy.email}
              <Input id={`${id}-email`} className="mt-2" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </div>
          <label className="flex items-start gap-3 text-sm leading-relaxed" htmlFor={`${id}-consent`}>
            <input
              id={`${id}-consent`}
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-[#541014]"
            />
            <span>
              {copy.consent}{" "}
              <Link to={copy.privacyPath} className="fx-text-link underline underline-offset-2">
                {copy.privacy}
              </Link>
            </span>
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" className="fx-btn" disabled={status === "sending"}>
              {status === "sending" ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
              {copy.submit}
            </button>
            <p role="status" aria-live="polite" className={`text-sm ${status === "error" ? "text-[#b42318]" : "fx-muted"}`}>
              {status === "sending" || status === "error" ? message : ""}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
