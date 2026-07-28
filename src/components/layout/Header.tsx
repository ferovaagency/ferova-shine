import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import logoLight from "@/assets/ferova-logo.png.png";
import { useAnalytics } from "@/hooks/useAnalytics";
import { trackEvent } from "@/lib/analytics";

interface HeaderProps {
  currentLang?: "es" | "en" | "pt";
  lang?: "es" | "en" | "pt";
}

type NavItem = { label: string; href: string };
type NavCfg = { primary: NavItem[]; cta: NavItem };

/**
 * Menú principal — arquitectura por intención (plan Fase 1):
 * Qué necesitas · Qué hacemos · Resultados · Método · Recursos + CTA diagnóstico.
 * Sin dropdowns ni servicios sueltos: todo eso vive en /servicios y el footer.
 */
const NAV: Record<"es" | "en" | "pt", NavCfg> = {
  es: {
    primary: [
      { label: "Qué necesitas", href: "/soluciones" },
      { label: "Qué hacemos", href: "/servicios" },
      { label: "Resultados", href: "/casos-de-exito" },
      { label: "Método", href: "/metodo-ferova" },
      { label: "Recursos", href: "/recursos" },
    ],
    cta: { label: "Diagnosticar mi empresa", href: "/soluciones/diagnostico-empresarial" },
  },
  en: {
    primary: [
      { label: "What you need", href: "/en/solutions" },
      { label: "What we do", href: "/en/services" },
      { label: "Results", href: "/en/case-studies" },
      { label: "Method", href: "/en/ferova-method" },
      { label: "Resources", href: "/en/resources" },
    ],
    cta: { label: "Diagnose my business", href: "/en/solutions/business-diagnosis" },
  },
  pt: {
    primary: [
      { label: "O que você precisa", href: "/pt/solucoes" },
      { label: "O que fazemos", href: "/pt/servicos" },
      { label: "Resultados", href: "/pt/casos-de-sucesso" },
      { label: "Método", href: "/pt/metodo-ferova" },
      { label: "Recursos", href: "/pt/recursos" },
    ],
    cta: { label: "Diagnosticar minha empresa", href: "/pt/solucoes/diagnostico-empresarial" },
  },
};

export default function Header({ currentLang, lang }: HeaderProps) {
  const locale = lang ?? currentLang ?? "es";
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { trackLanguageChange } = useAnalytics();

  const homeHref = locale === "pt" ? "/pt" : locale === "en" ? "/en" : "/";
  const cfg = NAV[locale];

  const langSwitchLinks =
    locale === "pt"
      ? [{ label: "ES", href: "/" }, { label: "EN", href: "/en" }]
      : locale === "en"
      ? [{ label: "ES", href: "/" }, { label: "PT", href: "/pt" }]
      : [{ label: "EN", href: "/en" }, { label: "PT", href: "/pt" }];

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);

  const onCta = () => trackEvent("cta_clicked", { cta: "diagnostico", section: "header", language: locale });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link to={homeHref} className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src={logoLight} alt="Ferova Agency" className="h-12 w-auto sm:h-14" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {cfg.primary.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm transition-colors ${isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {item.label}
            </Link>
          ))}

          <div className="flex items-center gap-1 ml-1 border-l border-border/50 pl-4">
            {langSwitchLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                onClick={() => trackLanguageChange(locale, l.label.toLowerCase())}
                className="px-2 py-1 text-xs font-medium rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link to={cfg.cta.href} onClick={onCta} className="btn-gold ml-1 inline-flex items-center gap-1.5 !px-4 !py-2 text-sm">
            <Sparkles className="w-4 h-4" /> {cfg.cta.label}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={locale === "pt" ? "Abrir menu" : locale === "es" ? "Abrir menú" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/60 bg-background lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4 md:px-6">
            {cfg.primary.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm transition-colors ${isActive(item.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to={cfg.cta.href}
              onClick={() => { onCta(); setMobileOpen(false); }}
              className="btn-gold mt-2 inline-flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" /> {cfg.cta.label}
            </Link>

            <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
              {langSwitchLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  onClick={() => { trackLanguageChange(locale, l.label.toLowerCase()); setMobileOpen(false); }}
                  className="px-4 py-2 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
