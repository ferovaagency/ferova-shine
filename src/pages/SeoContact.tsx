import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Bot, CheckCircle2, LockKeyhole, MapPin, MessageSquareText, type LucideIcon } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { trackEvent } from "@/lib/analytics";
import { IconTile, PageHero, Panel, Section } from "@/components/fx/primitives";

const contactLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Cotizar SEO por horas o tareas con Fera",
  url: "https://seoparaecommerce.co/contacto",
  inLanguage: "es",
  about: { "@type": "Organization", name: "Ferova Agency", email: "gerencia@seoparaecommerce.co" },
};

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
    <div className="fx-site min-h-screen">
      <SEO title="Cotizar SEO por horas o tareas con Fera | Ferova" description="Conversa con Fera para organizar la habilidad, el volumen y la fecha que necesita tu agencia. Recibe alcance, precio y disponibilidad sin agendar una asesoría." path="/contacto" lang="es" jsonLd={contactLd} breadcrumbs={[{ name: "Inicio", path: "/" }, { name: "Cotizar con Fera", path: "/contacto" }]} />
      <Header lang="es" />
      <main id="contenido-principal" className="pt-20">
        <PageHero
          eyebrow="Cotizar con Fera"
          title="Tu cotización empieza conversando con Fera."
          intro="Cuéntale qué capacidad necesita tu agencia. Fera organiza el brief y deja lista la información para que una persona confirme alcance, precio y disponibilidad."
          breadcrumbs={[{ name: "Cotizar con Fera", path: "/contacto" }]}
        >
          <button type="button" onClick={openFera} className="fx-btn"><Bot aria-hidden="true" /> Abrir Fera y cotizar</button>
        </PageHero>

        <Section>
          <div className="grid gap-5 md:grid-cols-3">
            <Step icon={MessageSquareText} title="Describe la necesidad" text="Habilidad, volumen, plataforma, fecha y forma de colaboración." />
            <Step icon={CheckCircle2} title="Fera ordena el brief" text="Te pregunta solo lo necesario para preparar una cotización útil." />
            <Step icon={LockKeyhole} title="Una persona confirma" text="Revisamos el alcance y respondemos con precio y disponibilidad." />
          </div>
        </Section>

        <Section tone="surface">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <Panel className="flex items-start gap-4">
              <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#541014]" />
              <div>
                <p className="font-semibold">Oficina en North Point, Torre 2, Of. 1002</p>
                <p className="fx-muted mt-1 text-sm">Cra. 7 #158-78, Bogotá · Visitas con cita previa.</p>
              </div>
            </Panel>
            <p className="fx-muted text-sm leading-relaxed">Fera es un sistema de IA y puede equivocarse. No toma decisiones económicas ni reemplaza la revisión humana. No compartas contraseñas ni información sensible.</p>
          </div>
        </Section>
      </main>
      <Footer lang="es" />
    </div>
  );
}

function Step({ icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <Panel>
      <IconTile icon={icon} />
      <h2 className="text-xl leading-snug">{title}</h2>
      <p className="fx-muted mt-3 leading-relaxed">{text}</p>
    </Panel>
  );
}
