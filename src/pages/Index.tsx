import { useEffect } from "react";
import PersonalSeoHome from "@/pages/PersonalSeoHome";
import { trackEvent } from "@/lib/analytics";
import type { Lang } from "@/config/routes";

/**
 * Portada. Español e inglés sirven la MISMA página: la de María Fer.
 *
 * Hasta septiembre de 2026 `/en` renderizaba la portada vieja de Ferova Agency
 * ("We grow businesses.", logo de agencia, menú Capabilities/Pricing). No era
 * una traducción: era otro negocio bajo el mismo dominio. Se retiró al
 * realinear el sitio al posicionamiento de SEO freelance senior.
 */
const Index = ({ lang = "es" }: { lang?: Lang }) => {
  useEffect(() => {
    trackEvent("page_view", { page: "home", lang });
  }, [lang]);

  return <PersonalSeoHome lang={lang} />;
};

export default Index;
