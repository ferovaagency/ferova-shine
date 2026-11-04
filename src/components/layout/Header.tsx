import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logoLight from "@/assets/ferova-logo.png.png";
import { trackEvent } from "@/lib/analytics";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

interface HeaderProps {
  currentLang?: "es" | "en" | "pt";
  lang?: "es" | "en" | "pt";
}

type NavItem = { label: string; href: string };
type NavCfg = { primary: NavItem[]; cta: NavItem };

/**
 * Menú principal. Los tres idiomas tienen la MISMA estructura: no es una
 * traducción de menús distintos, es el mismo menú en cada idioma.
 *
 * Todos los destinos son páginas vivas. Antes 'Capabilities' llevaba a
 * /en/services y 'Pricing' a /en/pricing, retiradas ambas: el usuario acababa
 * en la home o en una página de contacto rotulada como precios.
 */
const NAV: Record<"es" | "en" | "pt", NavCfg> = {
  es: {
    primary: [
      { label: "Portafolio", href: "/portafolio/?lang=es" },
      { label: "Cómo te ayudo", href: "/#ayuda" },
      { label: "Para agencias", href: "/seo-para-agencias" },
      { label: "Recursos", href: "/recursos" },
    ],
    cta: { label: "Hablemos", href: "/#contacto" },
  },
  en: {
    primary: [
      { label: "Portfolio", href: "/portafolio/?lang=en" },
      { label: "How I help", href: "/en#ayuda" },
      { label: "For agencies", href: "/en/white-label-seo-for-agencies" },
      { label: "Resources", href: "/en/resources" },
    ],
    cta: { label: "Let's talk", href: "/en#contacto" },
  },
  pt: {
    primary: [
      { label: "SEO ecommerce", href: "/pt/seo-ecommerce" },
      { label: "Portfólio", href: "/portafolio/?lang=pt" },
      { label: "Recursos", href: "/pt/recursos" },
    ],
    cta: { label: "Falar agora", href: "/pt/contato" },
  },
};

export default function Header({ currentLang, lang }: HeaderProps) {
  const locale = lang ?? currentLang ?? "es";
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cfg = NAV[locale];
  const homeHref = locale === "en" ? "/en" : locale === "pt" ? "/pt" : "/";
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(`${href}/`);
  const onCta = () => trackEvent("quote_requested", { section: "header", language: locale });

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${locale === "es" ? "personal-header" : "border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"}`}>
      <a href="#contenido-principal" className="agency-skip-link">
        {locale === "en" ? "Skip to content" : locale === "pt" ? "Pular para o conteúdo" : "Saltar al contenido"}
      </a>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link to={homeHref} className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          {locale === "es" ? (
            <span className="personal-header-wordmark" aria-label="María Fer · SEO técnico · Ferova">
              <span>MARÍA FER</span>
              <small>SEO técnico · Ferova</small>
            </span>
          ) : (
            <img src={logoLight} alt="Ferova Agency" className="h-12 w-auto sm:h-14" />
          )}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
          {cfg.primary.map((item) => (
            <Link key={item.href} reloadDocument={item.href.startsWith("/portafolio/")} to={item.href} className={`text-sm transition-colors ${isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher lang={locale} className="ml-1" />
          <Link to={cfg.cta.href} onClick={onCta} className={`${locale === "es" ? "seo-primary-button" : "btn-gold"} ml-1 inline-flex items-center gap-1.5 !px-4 !py-2 text-sm`}>
            {cfg.cta.label} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </nav>

        <button type="button" className={`inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${locale === "es" ? "personal-menu-button" : "border-border bg-card text-foreground"}`} onClick={() => setMobileOpen((value) => !value)} aria-label={locale === "en" ? "Open menu" : "Abrir menú"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className={`max-h-[calc(100vh-5rem)] overflow-y-auto border-t lg:hidden ${locale === "es" ? "personal-mobile-menu" : "border-border/60 bg-background"}`}>
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4 md:px-6">
            {cfg.primary.map((item) => (
              <Link key={item.href} reloadDocument={item.href.startsWith("/portafolio/")} to={item.href} onClick={() => setMobileOpen(false)} className={`rounded-xl px-4 py-3 text-sm transition-colors ${isActive(item.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}>
                {item.label}
              </Link>
            ))}
            <Link to={cfg.cta.href} onClick={() => { onCta(); setMobileOpen(false); }} className={`${locale === "es" ? "seo-primary-button" : "btn-gold"} mt-2 inline-flex items-center justify-center gap-1.5`}>
              {cfg.cta.label} <ArrowUpRight className="h-4 w-4" />
            </Link>
            <LanguageSwitcher lang={locale} className="mt-3 justify-center" onNavigate={() => setMobileOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
}
