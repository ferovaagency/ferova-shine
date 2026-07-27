import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HOME, solucionesHref, type Lang } from "@/content/home";
import { HOME_ICONS } from "./icons";
import { StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/ui/motion";
import { trackEvent } from "@/lib/analytics";

/**
 * Selector de problemas (Sprint 3, Paso 9). Convierte la portada en una
 * experiencia de autodiagnóstico: 6 problemas universales, cada uno clicable
 * hacia el hub /soluciones. Emite problem_selected para analítica.
 */
const ProblemSelector = ({ lang }: { lang: Lang }) => {
  const c = HOME[lang].problems;
  const href = solucionesHref(lang);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{c.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground">{c.sub}</p>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {c.items.map((p) => {
            const Icon = HOME_ICONS[p.icon];
            return (
              <StaggerItem key={p.key}>
                <ScaleOnHover>
                  <Link
                    to={href}
                    onClick={() => trackEvent("problem_selected", { source: "home", problem: p.key, language: lang })}
                    className="glass-card p-5 md:p-6 flex items-center gap-4 group hover:border-gold/40 transition-all h-full"
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-gold/10 text-gold group-hover:bg-gold/20 transition-colors">
                      {Icon ? <Icon className="w-5 h-5" /> : null}
                    </div>
                    <span className="flex-1 font-semibold text-foreground text-sm md:text-base">{p.label}</span>
                    <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </Link>
                </ScaleOnHover>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="text-center mt-10">
          <Link
            to={href}
            onClick={() => trackEvent("cta_clicked", { cta: "ver_soluciones", section: "problems", language: lang })}
            className="btn-outline-gold inline-flex items-center gap-2"
          >
            {c.cta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProblemSelector;
