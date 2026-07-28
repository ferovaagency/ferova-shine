import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { HOME, diagnosticoHref, metodoHref, type Lang } from "@/content/home";
import { trackEvent } from "@/lib/analytics";
import GrowthSystem from "./GrowthSystem";

/**
 * Hero de la portada (rediseño §2-§4 del plan de diseño). Dos columnas:
 * izquierda el mensaje (texto HTML real, indexable), derecha el sistema de
 * crecimiento con profundidad 3D sutil. Entrada animada por bloques.
 */
// ⚠️ El texto crítico NO se oculta con opacity: solo se desplaza. Así el HTML
// prerenderizado muestra el mensaje aunque el JS no corra (regla SEO §17), y
// aun así hay entrada animada al hidratar.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { y: 14 },
  show: { y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const h1v: Variants = {
  hidden: { y: 18 },
  show: { y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HomeHero = ({ lang }: { lang: Lang }) => {
  const c = HOME[lang].hero;

  return (
    <section
      className="relative overflow-hidden dark-section pt-24 pb-16 md:pt-28 md:pb-24"
      style={{ background: "linear-gradient(135deg, hsl(243,31%,10%) 0%, hsl(243,31%,14%) 60%, hsl(356,68%,15%) 100%)" }}
    >
      <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
        {/* Izquierda: mensaje */}
        <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium bg-white/5 border border-white/10 text-white/80">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            {c.badge}
          </motion.div>

          <motion.h1 variants={h1v} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-white mb-5">
            {c.h1}
          </motion.h1>

          <motion.p variants={item} className="text-base md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-4">
            {c.sub}
          </motion.p>
          <motion.p variants={item} className="text-sm md:text-base text-gold font-medium mb-8">
            {c.specialization}
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center">
            <Link
              to={diagnosticoHref(lang)}
              onClick={() => trackEvent("cta_clicked", { cta: "diagnostico", section: "hero", language: lang })}
              className="btn-gold w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {c.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={metodoHref(lang)}
              onClick={() => trackEvent("cta_clicked", { cta: "ver_metodo", section: "hero", language: lang })}
              className="btn-outline-gold w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              {c.ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>

        {/* Derecha: sistema de crecimiento 3D */}
        <div>
          <GrowthSystem lang={lang} />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
