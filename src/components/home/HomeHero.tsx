import { Link } from "react-router-dom";
import { Sparkles, MessageCircle, Award, TrendingUp, Trophy, ArrowRight } from "lucide-react";
import { HOME, WHATSAPP_URL, solucionesHref, type Lang } from "@/content/home";
import { trackEvent } from "@/lib/analytics";

/**
 * Hero de la portada (Sprint 3, Paso 8). H1 amplio ("Hacemos crecer empresas")
 * con una línea de especialización que conserva las entidades SEO (SEO, GEO,
 * ecommerce). El CTA primario lleva al hub /soluciones (autodiagnóstico).
 */
const HomeHero = ({ lang }: { lang: Lang }) => {
  const c = HOME[lang].hero;
  const badgeIcons = [Award, TrendingUp, Trophy];

  return (
    <section
      className="relative overflow-hidden dark-section pt-24 pb-20 md:pt-32 md:pb-28"
      style={{ background: "linear-gradient(135deg, hsl(243,31%,10%) 0%, hsl(243,31%,14%) 60%, hsl(356,68%,15%) 100%)" }}
    >
      <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium bg-white/5 border border-white/10 text-white/80">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          {c.badge}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-6">
          {c.h1}
        </h1>

        <p className="text-base md:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed mb-4">{c.sub}</p>
        <p className="text-sm md:text-base text-gold font-medium mb-8">{c.specialization}</p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {c.badges.map((b, i) => {
            const Icon = badgeIcons[i] ?? Award;
            return (
              <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium bg-gold/10 text-gold border border-gold/30">
                <Icon className="w-3.5 h-3.5" />
                {b}
              </span>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link
            to={solucionesHref(lang)}
            onClick={() => trackEvent("cta_clicked", { cta: "diagnostico", section: "hero", language: lang })}
            className="btn-gold w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {c.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_button_clicked", { section: "hero", language: lang })}
            className="btn-outline-gold w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            {c.ctaSecondary}
          </a>
        </div>
        <p className="mt-5 text-xs md:text-sm text-white/55 italic">{c.disclaimer}</p>
      </div>
    </section>
  );
};

export default HomeHero;
