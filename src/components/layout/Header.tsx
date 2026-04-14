import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoLight from "@/assets/ferova-logo.png.png";
import { useAnalytics } from "@/hooks/useAnalytics";

interface HeaderProps {
  currentLang?: "es" | "en" | "pt";
  lang?: "es" | "en" | "pt";
}

export default function Header({ currentLang, lang }: HeaderProps) {
  const locale = lang ?? currentLang ?? "es";
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { trackLanguageChange } = useAnalytics();

  const navigation = locale === "pt"
    ? [
        { label: "Serviços", href: "/pt/servicos" },
        { label: "Preços", href: "/pt/precos" },
        { label: "Casos", href: "/pt/casos-de-sucesso" },
        { label: "Blog", href: "/pt/blog" },
        { label: "Newsletter", href: "/pt/newsletter" },
        { label: "Recursos", href: "/pt/recursos" },
        { label: "Contato", href: "/pt/contato" },
      ]
    : locale === "en"
    ? [
        { label: "Services", href: "/en/services" },
        { label: "Pricing", href: "/en/pricing" },
        { label: "Cases", href: "/en/case-studies" },
        { label: "Blog", href: "/en/blog" },
        { label: "Newsletter", href: "/en/newsletter" },
        { label: "Resources", href: "/en/resources" },
        { label: "Contact", href: "/en/contact" },
      ]
    : [
        { label: "Servicios", href: "/servicios" },
        { label: "Precios", href: "/precios" },
        { label: "Casos", href: "/casos-de-exito" },
        { label: "Blog", href: "/blog" },
        { label: "Newsletter", href: "/newsletter" },
        { label: "Recursos", href: "/recursos" },
        { label: "Contacto", href: "/contacto" },
      ];

  const homeHref = locale === "pt" ? "/pt" : locale === "en" ? "/en" : "/";

  const langSwitchLinks = locale === "pt"
    ? [
        { label: "ES", href: "/" },
        { label: "EN", href: "/en" },
      ]
    : locale === "en"
    ? [
        { label: "ES", href: "/" },
        { label: "PT", href: "/pt" },
      ]
    : [
        { label: "EN", href: "/en" },
        { label: "PT", href: "/pt" },
      ];

  const isActive = (href: string) =>
    href === "/" || href === "/en" || href === "/pt"
      ? location.pathname === href
      : location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link to={homeHref} className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src={logoLight} alt="Ferova Agency" className="h-12 w-auto sm:h-14" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm transition-colors ${isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-1 ml-2 border-l border-border/50 pl-4">
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
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4 md:px-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm transition-colors ${isActive(item.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-2 pt-2 border-t border-border/50">
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
