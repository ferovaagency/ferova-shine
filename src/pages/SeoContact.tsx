import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Bot, CheckCircle2, Mail, MessageCircle, Send, Slack } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { logLead } from "@/lib/adminInbox";
import { trackEvent } from "@/lib/analytics";

const WHATSAPP_NUMBER = "17865787671";
const SLACK_URL = "https://ferovaagency.slack.com/team/U0BFL50JL4X";
const initial = { name: "", email: "", agency: "", website: "", skill: "", volume: "", platform: "", brief: "", budget: "", timing: "", engagement: "", collaboration: "", consent: false };
const inputClass = "mt-2 w-full rounded-xl border border-[#6a4c30]/25 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-[#c0930e] focus:ring-2 focus:ring-[#c0930e]/20";

export default function SeoContact() {
  const [params] = useSearchParams();
  const engagementParam = params.get("contratacion") || "";
  const engagementLabel = engagementParam === "tarea" ? "Por tarea cerrada" : engagementParam === "horas" ? "Bolsa de horas" : engagementParam === "mensual" ? "Capacidad mensual" : "";
  const [form, setForm] = useState({ ...initial, skill: params.get("habilidad") || params.get("modalidad") || "", engagement: engagementLabel });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const openFera = () => window.dispatchEvent(new CustomEvent("open-fera-quote"));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.consent) return;
    setSending(true);
    const message = [
      "Hola Ferova, necesito cotizar capacidad para mi agencia:", `Contacto: ${form.name}`, `Agencia: ${form.agency}`, `Email: ${form.email}`, `Web: ${form.website}`,
      `Habilidad: ${form.skill}`, `Volumen: ${form.volume}`, `Plataforma: ${form.platform}`, `Forma de contratación: ${form.engagement}`,
      `Visibilidad ante el cliente: ${form.collaboration}`, `Presupuesto: ${form.budget}`, `Inicio: ${form.timing}`, `Brief: ${form.brief}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    try { await supabase.functions.invoke("brevo-sync", { body: { email: form.email.trim(), name: form.name.trim(), source: "agency_quote", attributes: { LANG: "es" } } }); } catch { /* WhatsApp is the primary channel. */ }
    await logLead({ source: "contact", name: form.name, email: form.email, company: form.agency, summary: form.brief.slice(0, 160), payload: { ...form, consent: undefined, page: "/contacto" } });
    trackEvent("quote_requested", { source: "agency_quote_form", skill: form.skill, budget: form.budget, lang: "es" });
    setSending(false); setSent(true); setForm(initial);
  };

  return (
    <div className="seo-brand agency-site min-h-screen">
      <SEO title="Cotizar SEO por horas o tareas para agencias | Ferova" description="Comparte tu backlog y recibe modalidad recomendada, alcance, precio y disponibilidad para SEO técnico, mantenimiento web, landings o migraciones." path="/contacto" lang="es" breadcrumbs={[{ name: "Inicio", path: "/" }, { name: "Cotizar horas o tareas", path: "/contacto" }]} />
      <Header lang="es" />
      <main id="contenido-principal" className="pt-20">
        <section className="agency-contact-hero"><div className="container mx-auto max-w-6xl px-4 md:px-6"><h1>Convierte tu backlog en una cotización.</h1><p>Comparte la habilidad, el volumen y la fecha. Recibirás una modalidad recomendada, alcance inicial, precio y disponibilidad, sin tener que agendar una asesoría.</p><button type="button" onClick={openFera} className="seo-primary-button"><Bot className="h-4 w-4" /> Cotizar conversando con Fera</button></div></section>
        <section className="py-16 md:py-24"><div className="container mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[1.25fr_.75fr]">
          {sent ? (
            <div className="agency-form-success"><CheckCircle2 aria-hidden="true" /><h2>Solicitud preparada</h2><p>WhatsApp se abrió con el alcance organizado. Confirma el envío para que podamos responder con modalidad, precio y disponibilidad.</p><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="seo-primary-button"><MessageCircle className="h-4 w-4" /> Abrir WhatsApp</a></div>
          ) : (
            <form onSubmit={submit} className="agency-quote-form">
              <div className="grid gap-5 sm:grid-cols-2"><label>Nombre<input required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} /></label><label>Correo corporativo<input required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} /></label></div>
              <div className="grid gap-5 sm:grid-cols-2"><label>Nombre de la agencia<input required autoComplete="organization" value={form.agency} onChange={(e) => setForm({ ...form, agency: e.target.value })} className={inputClass} /></label><label>Sitio de la agencia<input type="url" placeholder="https://" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inputClass} /></label></div>
              <div className="grid gap-5 sm:grid-cols-2"><label>Habilidad requerida<select required value={form.skill} onChange={(e) => setForm({ ...form, skill: e.target.value })} className={inputClass}><option value="">Seleccionar</option><option>SEO técnico white label</option><option>Mantenimiento web</option><option>Diseño de landing pages</option><option>Migración SEO</option><option>SEO ecommerce</option><option>Combinación de capacidades</option></select></label><label>Volumen esperado<input required placeholder="Ej. 3 clientes o 4 landings al mes" value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} className={inputClass} /></label></div>
              <div className="grid gap-5 sm:grid-cols-2"><label>Forma de contratación<select required value={form.engagement} onChange={(e) => setForm({ ...form, engagement: e.target.value })} className={inputClass}><option value="">Seleccionar</option><option>Por tarea cerrada</option><option>Bolsa de horas</option><option>Capacidad mensual</option><option>Necesito recomendación</option></select></label><label>Plataforma o tecnología<input placeholder="Shopify, WordPress, Webflow..." value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} className={inputClass} /></label></div>
              <label>Visibilidad ante el cliente final<select required value={form.collaboration} onChange={(e) => setForm({ ...form, collaboration: e.target.value })} className={inputClass}><option value="">Seleccionar</option><option>Completamente white label</option><option>Apoyo interno al equipo</option><option>Especialista visible ante cliente</option><option>Por definir</option></select></label>
              <div className="grid gap-5 sm:grid-cols-2"><label>Presupuesto disponible<select required value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputClass}><option value="">Seleccionar USD</option><option>Hasta USD 500</option><option>USD 500 a 1.000</option><option>USD 1.000 a 3.000</option><option>Más de USD 3.000</option><option>Necesito orientación</option></select></label><label>Fecha de inicio<select required value={form.timing} onChange={(e) => setForm({ ...form, timing: e.target.value })} className={inputClass}><option value="">Seleccionar</option><option>En menos de 15 días</option><option>En 15 a 30 días</option><option>En 1 a 3 meses</option><option>Estoy armando presupuesto</option></select></label></div>
              <label>Brief del trabajo<textarea required rows={5} value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} className={`${inputClass} resize-none`} placeholder="Qué debe entregarse, para qué tipo de cliente y qué experiencia esperas del especialista." /></label>
              <label className="agency-consent"><input type="checkbox" required checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} /><span>Autorizo el tratamiento de mis datos según la <Link to="/privacidad">política de privacidad</Link>.</span></label>
              <button type="submit" disabled={sending} className="seo-primary-button w-full disabled:opacity-60"><Send className="h-4 w-4" />{sending ? "Preparando solicitud…" : "Solicitar alcance y precio"}</button>
            </form>
          )}
          <aside className="agency-contact-aside"><div><h2>Qué recibirás</h2><ul><li>Modalidad de contratación recomendada.</li><li>Alcance inicial y supuestos.</li><li>Precio y disponibilidad.</li><li>Próximo paso para accesos y confidencialidad.</li></ul></div><a href="mailto:gerencia@seoparaecommerce.co"><Mail /><span><strong>Correo</strong><small>gerencia@seoparaecommerce.co</small></span></a><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"><MessageCircle /><span><strong>WhatsApp</strong><small>+1 (786) 578-7671</small></span></a><a href={SLACK_URL} target="_blank" rel="noopener noreferrer"><Slack /><span><strong>Slack</strong><small>Contactar a María Fer</small></span></a></aside>
        </div></section>
      </main>
      <Footer lang="es" />
    </div>
  );
}
