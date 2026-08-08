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
const initial = { name: "", email: "", agency: "", website: "", skill: "", volume: "", platform: "", brief: "", budget: "", timing: "", collaboration: "", consent: false };
const inputClass = "mt-2 w-full rounded-xl border border-[#6a4c30]/25 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#c0930e] focus:ring-2 focus:ring-[#c0930e]/15";

export default function SeoContact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({ ...initial, skill: params.get("habilidad") || params.get("modalidad") || "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const openFera = () => window.dispatchEvent(new CustomEvent("open-fera-quote"));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.consent) return;
    setSending(true);
    const message = ["Hola Ferova, necesito cotizar capacidad para mi agencia:", `Contacto: ${form.name}`, `Agencia: ${form.agency}`, `Email: ${form.email}`, `Web: ${form.website}`, `Habilidad: ${form.skill}`, `Volumen: ${form.volume}`, `Plataforma: ${form.platform}`, `Modalidad: ${form.collaboration}`, `Presupuesto: ${form.budget}`, `Inicio: ${form.timing}`, `Brief: ${form.brief}`].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    try { await supabase.functions.invoke("brevo-sync", { body: { email: form.email.trim(), name: form.name.trim(), source: "agency_quote", attributes: { LANG: "es" } } }); } catch { /* WhatsApp is the primary channel. */ }
    await logLead({ source: "contact", name: form.name, email: form.email, company: form.agency, summary: form.brief.slice(0, 160), payload: { ...form, consent: undefined, page: "/contacto" } });
    trackEvent("quote_requested", { source: "agency_quote_form", skill: form.skill, budget: form.budget, lang: "es" });
    setSending(false); setSent(true); setForm(initial);
  };

  return (
    <div className="seo-brand min-h-screen text-slate-950">
      <SEO title="Cotizar SEO técnico y producción web para agencias | Ferova" description="Solicita precio para SEO técnico white label, mantenimiento web mensual, landing pages o migraciones para los clientes de tu agencia." path="/contacto" lang="es" breadcrumbs={[{ name: "Inicio", path: "/" }, { name: "Solicitar cotización", path: "/contacto" }]} />
      <Header lang="es" />
      <main className="pt-20">
        <section className="bg-[#541014] py-16 text-white md:py-24"><div className="container mx-auto max-w-6xl px-4 md:px-6"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#e0bd52]">Cotización para agencias</p><h1 className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-tight md:text-6xl">¿Qué necesita entregar tu agencia?</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">Comparte la habilidad, el volumen y la fecha. Con esa información preparamos disponibilidad, precio y modalidad de colaboración.</p><button type="button" onClick={openFera} className="seo-primary-button mt-8"><Bot className="h-4 w-4" /> Cotizar conversando con Fera</button></div></section>
        <section className="py-16 md:py-24"><div className="container mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[1.25fr_.75fr]">
          {sent ? <div className="rounded-3xl border border-[#6a4c30]/20 bg-white p-10 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-[#8c6905]" /><h2 className="mt-6 font-display text-3xl font-bold">Solicitud preparada</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">WhatsApp se abrió con el alcance organizado. Confirma el envío para que podamos responder con precio y disponibilidad.</p><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="seo-primary-button mt-7"><MessageCircle className="h-4 w-4" /> Abrir WhatsApp</a></div> :
          <form onSubmit={submit} className="space-y-5 rounded-3xl border border-[#6a4c30]/20 bg-white p-7 shadow-sm md:p-10">
            <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Nombre<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} /></label><label className="text-sm font-semibold">Correo corporativo<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} /></label></div>
            <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Nombre de la agencia<input required value={form.agency} onChange={(e) => setForm({ ...form, agency: e.target.value })} className={inputClass} /></label><label className="text-sm font-semibold">Sitio de la agencia<input type="url" placeholder="https://" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inputClass} /></label></div>
            <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Habilidad requerida<select required value={form.skill} onChange={(e) => setForm({ ...form, skill: e.target.value })} className={inputClass}><option value="">Seleccionar</option><option>SEO técnico white label</option><option>Mantenimiento web mensual</option><option>Diseño de landing pages</option><option>Migración SEO</option><option>SEO ecommerce</option><option>Combinación de capacidades</option></select></label><label className="text-sm font-semibold">Volumen esperado<input required placeholder="Ej. 3 clientes o 4 landings/mes" value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} className={inputClass} /></label></div>
            <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Plataforma o tecnología<input placeholder="Shopify, WordPress, Webflow..." value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} className={inputClass} /></label><label className="text-sm font-semibold">Modalidad<select required value={form.collaboration} onChange={(e) => setForm({ ...form, collaboration: e.target.value })} className={inputClass}><option value="">Seleccionar</option><option>Completamente white label</option><option>Apoyo interno al equipo</option><option>Especialista visible ante cliente</option><option>Por definir</option></select></label></div>
            <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Presupuesto disponible<select required value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputClass}><option value="">Seleccionar USD</option><option>Hasta USD 500</option><option>USD 500–1.000</option><option>USD 1.000–3.000</option><option>Más de USD 3.000</option><option>Necesito orientación</option></select></label><label className="text-sm font-semibold">Fecha de inicio<select required value={form.timing} onChange={(e) => setForm({ ...form, timing: e.target.value })} className={inputClass}><option value="">Seleccionar</option><option>En menos de 15 días</option><option>En 15–30 días</option><option>En 1–3 meses</option><option>Estoy armando presupuesto</option></select></label></div>
            <label className="block text-sm font-semibold">Brief del trabajo<textarea required rows={5} value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} className={`${inputClass} resize-none`} placeholder="Qué debe entregarse, para qué tipo de cliente y qué experiencia esperas del especialista." /></label>
            <label className="flex items-start gap-3 text-sm leading-6 text-slate-600"><input type="checkbox" required checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 accent-[#c0930e]" /><span>Autorizo el tratamiento de mis datos según la <Link to="/privacidad" className="font-semibold text-[#6a4c30] underline">política de privacidad</Link>.</span></label>
            <button type="submit" disabled={sending} className="seo-primary-button w-full disabled:opacity-60"><Send className="h-4 w-4" />{sending ? "Preparando solicitud…" : "Solicitar cotización"}</button>
          </form>}
          <aside className="space-y-5"><div className="rounded-2xl bg-[#f4eadb] p-6"><h2 className="font-display text-xl font-bold">Qué recibirás</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600"><li>Confirmación de capacidad y disponibilidad.</li><li>Alcance recomendado y supuestos.</li><li>Precio por proyecto, volumen o mes.</li><li>Próximo paso para accesos y confidencialidad.</li></ul></div><a href="mailto:gerencia@seoparaecommerce.co" className="flex items-center gap-4 rounded-2xl border border-[#6a4c30]/20 bg-white p-5"><Mail className="h-6 w-6 text-[#6a4c30]" /><span><strong className="block">Correo</strong><span className="text-sm text-slate-600">gerencia@seoparaecommerce.co</span></span></a><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-[#6a4c30]/20 bg-white p-5"><MessageCircle className="h-6 w-6 text-[#6a4c30]" /><span><strong className="block">WhatsApp</strong><span className="text-sm text-slate-600">+1 (786) 578-7671</span></span></a><a href={SLACK_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-[#6a4c30]/20 bg-white p-5"><Slack className="h-6 w-6 text-[#6a4c30]" /><span><strong className="block">Slack</strong><span className="text-sm text-slate-600">Contactar a María Fer</span></span></a></aside>
        </div></section>
      </main>
      <Footer lang="es" />
    </div>
  );
}
