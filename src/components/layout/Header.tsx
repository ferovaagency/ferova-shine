import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import logoLight from "@/assets/ferova-logo.png.png";
import { trackEvent } from "@/lib/analytics";

interface HeaderProps {
  currentLang?: "es" | "en" | "pt";
  lang?: "es" | "en" | "pt";
}

type NavItem = { label: string; href: string };
type NavCfg = { primary: NavItem[]; cta: NavItem };

const NAV: Record<"es" | "en" | "pt", NavCfg> = {
  es: {
    primary: [
      { label: "Capacidades", href: "/seo-para-agencias" },
      { label: "SEO técnico", href: "/auditoria-seo-tecnica" },
      { label: "Migraciones", href: "/migraciones-seo" },
      { label: "Experiencia", href: "/casos-de-exito" },
      { label: "Recursos", href: "/recursos" },
    ],
    cta: { label: "Solicitar cotización", href: "/contacto" },
  },
  en: {
    primary: [
      { label: "Capabilities", href: "/en/services" },
      { label: "Ecommerce SEO", href: "/en/services/ecommerce-seo" },
      { label: "Experience", href: "/en/case-studies" },
      { label: "Resources", href: "/en/resources" },
      { label: "Pricing", href: "/en/pricing" },
    ],
    cta: { label: "Request a quote", href: "/en/contact" },
  },
  pt: {
    primary: [
      { label: "Serviços", href: "/pt/servicos" },
      { label: "SEO ecommerce", href: "/pt/seo-ecommerce" },
      { label: "Experiência", href: "/pt/casos-de-sucesso" },
      { label: "Recursos", href: "/pt/recursos" },
    ],
    cta: { label: "Solicitar proposta", href: "/pt/contato" },
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link to={homeHref} className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          {locale === "es" ? (
            <>
              <span className="seo-brand-mark" aria-hidden="true"><img src={logoLight} alt="" /></span>
              <span className="leading-none">
                <span className="block font-display text-base font-bold tracking-[0.08em] text-foreground sm:text-lg">SEO PARA AGENCIAS</span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8c6905]">by Ferova</span>
              </span>
            </>
          ) : (
            <img src={logoLight} alt="Ferova Agency" className="h-12 w-auto sm:h-14" />
          )}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
          {cfg.primary.map((item) => (
            <Link key={item.href} to={item.href} className={`text-sm transition-colors ${isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {item.label}
            </Link>
          ))}
          <Link to={cfg.cta.href} onClick={onCta} className={`${locale === "es" ? "seo-primary-button" : "btn-gold"} ml-1 inline-flex items-center gap-1.5 !px-4 !py-2 text-sm`}>
            <Sparkles className="h-4 w-4" /> {cfg.cta.label}
          </Link>
        </nav>

        <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label={locale === "en" ? "Open menu" : "Abrir menú"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-border/60 bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4 md:px-6">
            {cfg.primary.map((item) => (
              <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)} className={`rounded-xl px-4 py-3 text-sm transition-colors ${isActive(item.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}>
                {item.label}
              </Link>
            ))}
            <Link to={cfg.cta.href} onClick={() => { onCta(); setMobileOpen(false); }} className={`${locale === "es" ? "seo-primary-button" : "btn-gold"} mt-2 inline-flex items-center justify-center gap-1.5`}>
              <Sparkles className="h-4 w-4" /> {cfg.cta.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
