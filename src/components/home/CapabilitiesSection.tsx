import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HOME, type Lang } from "@/content/home";
import { HOME_ICONS } from "./icons";
import { StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/ui/motion";
import { trackEvent } from "@/lib/analytics";

/**
 * "Qué hacemos" (Sprint 3, Paso 10). Sustituye el stack de 4 servicios por 6
 * capacidades. Cada tarjeta muestra PRIMERO el resultado y después el nombre
 * técnico, para hablarle al problema del cliente, no al servicio.
 */
const CapabilitiesSection = ({ lang }: { lang: Lang }) => {
  const c = HOME[lang].capabilities;

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 dark-section" style={{ background: "hsl(243 31% 10%)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">{c.title}</h2>
          <p className="text-base md:text-lg text-white/70">{c.sub}</p>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {c.items.map((cap) => {
            const Icon = HOME_ICONS[cap.icon];
            return (
              <StaggerItem key={cap.name}>
                <ScaleOnHover>
                  <Link
                    to={cap.href}
                    onClick={() => trackEvent("service_card_clicked", { service: cap.name, source: "home_capabilities", language: lang })}
                    className="glass-card p-6 md:p-7 group hover:border-gold/40 transition-all hover:-translate-y-1 block h-full"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gold/10 text-gold group-hover:bg-gold/20 transition-colors">
                      {Icon ? <Icon className="w-6 h-6" /> : null}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-white leading-snug">{cap.result}</h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">{cap.name}</p>
                    <span className="inline-flex items-center gap-1 text-gold text-sm font-semibold group-hover:gap-2 transition-all">
                      {lang === "es" ? "Ver más" : lang === "pt" ? "Ver mais" : "Learn more"}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </ScaleOnHover>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
