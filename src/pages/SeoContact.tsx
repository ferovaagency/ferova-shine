import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Bot, CheckCircle2, LockKeyhole, MapPin, MessageSquareText } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { trackEvent } from "@/lib/analytics";

const engagement: Record<string, string> = {
  tarea: "una tarea cerrada",
  horas: "una bolsa de horas",
  mensual: "capacidad mensual",
};

export default function SeoContact() {
  const [params] = useSearchParams();
  const context = useMemo(() => {
    const mode = engagement[params.get("contratacion") || ""];
    const skill = params.get("habilidad") || params.get("modalidad");
    return [mode && `Quiero cotizar ${mode}`, skill && `para ${skill}`].filter(Boolean).join(" ");
  }, [params]);

  const openFera = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-fera-quote", { detail: { prompt: context } }));
    trackEvent("quote_requested", { source: "fera_quote_page", context: context || "general", lang: "es" });
  }, [context]);

  useEffect(() => {
    const timer = window.setTimeout(openFera, 250);
    return () => window.clearTimeout(timer);
  }, [openFera]);

  return (
    <div className="seo-brand agency-site min-h-screen">
      <SEO title="Cotizar SEO por horas o tareas con Fera | Ferova" description="Conversa con Fera para organizar la habilidad, el volumen y la fecha que necesita tu agencia. Recibe alcance, precio y disponibilidad sin agendar una asesoría." path="/contacto" lang="es" breadcrumbs={[{ name: "Inicio", path: "/" }, { name: "Cotizar con Fera", path: "/contacto" }]} />
      <Header lang="es" />
      <main id="contenido-principal" className="pt-20">
        <section className="agency-contact-hero">
          <div className="container mx-auto max-w-5xl px-4 text-center md:px-6">
            <h1>Tu cotización empieza conversando con Fera.</h1>
            <p className="mx-auto">Cuéntale qué capacidad necesita tu agencia. Fera organiza el brief y deja lista la información para que una persona confirme alcance, precio y disponibilidad.</p>
            <button type="button" onClick={openFera} className="seo-primary-button"><Bot className="h-4 w-4" /> Abrir Fera y cotizar</button>
          </div>
        </section>
        <section className="py-14 md:py-20">
          <div className="container mx-auto grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-[#6a4c30]/20 bg-[#6a4c30]/20 px-0 sm:grid-cols-3">
            <Step icon={MessageSquareText} title="Describe la necesidad" text="Habilidad, volumen, plataforma, fecha y forma de colaboración." />
            <Step icon={CheckCircle2} title="Fera ordena el brief" text="Te pregunta solo lo necesario para preparar una cotización útil." />
            <Step icon={LockKeyhole} title="Una persona confirma" text="Revisamos el alcance y respondemos con precio y disponibilidad." />
          </div>
          <div className="mx-auto mt-8 flex max-w-4xl items-start gap-3 rounded-2xl border border-[#6a4c30]/20 bg-white p-6 px-4 md:px-6">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#9a7410]" />
            <div>
              <p className="font-semibold text-[#541014]">Oficina en North Point, Torre 2, Of. 1002</p>
              <p className="mt-1 text-sm text-slate-600">Cra. 7 #158-78, Bogotá · Visitas con cita previa.</p>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl px-4 text-center text-sm text-slate-600">Fera es un sistema de IA y puede equivocarse. No toma decisiones económicas ni reemplaza la revisión humana. No compartas contraseñas ni información sensible.</p>
        </section>
      </main>
      <Footer lang="es" />
    </div>
  );
}

function Step({ icon: Icon, title, text }: { icon: typeof Bot; title: string; text: string }) {
  return <div className="bg-white p-6 text-left"><Icon className="h-5 w-5 text-[#9a7410]" /><h2 className="mt-4 text-base font-semibold text-[#541014]">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>;
}
