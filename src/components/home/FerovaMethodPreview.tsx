import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HOME, metodoHref, type Lang } from "@/content/home";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { trackEvent } from "@/lib/analytics";

/**
 * Preview del método (Sprint 3, Paso 6/plan). Muestra los 6 pasos de forma
 * compacta y enlaza a /metodo-ferova. Conecta la filosofía con acción comercial.
 */
const FerovaMethodPreview = ({ lang }: { lang: Lang }) => {
  const c = HOME[lang].method;

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{c.title}</h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12">{c.sub}</p>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-10">
          {c.steps.map((step, i) => (
            <StaggerItem key={step}>
              <div className="glass-card p-4 h-full flex flex-col items-center text-center">
                <span className="text-sm font-mono text-gold/70 mb-2">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-semibold text-foreground leading-snug">{step}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Link
          to={metodoHref(lang)}
          onClick={() => trackEvent("cta_clicked", { cta: "ver_metodo", section: "method_preview", language: lang })}
          className="btn-outline-gold inline-flex items-center gap-2"
        >
          {c.cta} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default FerovaMethodPreview;
