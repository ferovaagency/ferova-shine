import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoLight from "@/assets/ferova-logo.png.png";
import { useAnalytics } from "@/hooks/useAnalytics";

interface HeaderProps {
  currentLang?: "es" | "en" | "pt";
  lang?: "es" | "en" | "pt";
}

type NavItem = { label: string; href: string };

export default function Header({ currentLang, lang }: HeaderProps) {
  const locale = lang ?? currentLang ?? "es";
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAgencyOpen, setMobileAgencyOpen] = useState(false);
  const { trackLanguageChange } = useAnalytics();

  const homeHref = locale === "pt" ? "/pt" : locale === "en" ? "/en" : "/";

  const NAV: Record<"es" | "en" | "pt", { primary: NavItem[]; agencyLabel: string; agencyItems: NavItem[] }> = {
    es: {
      agencyLabel: "Agencia (Infraestructura IA)",
      primary: [
        { label: "Inicio", href: "/" },
        { label: "Estrategia (Consultorías)", href: "/consultoria-estrategica" },
        { label: "Capacitación IA", href: "/capacitacion-ia" },
        { label: "Precios", href: "/precios" },
        { label: "Recursos", href: "/recursos" },
        { label: "Contacto", href: "/contacto" },
      ],
      agencyItems: [
        { label: "Desarrollo Web / E-commerce", href: "/servicios/diseno-web" },
        { label: "SEO / AIO Mensual", href: "/servicios/seo-ecommerce" },
        { label: "Optimización de LinkedIn", href: "/servicios/optimizacion-linkedin" },
        { label: "Contenido LinkedIn", href: "/servicios/contenido-linkedin" },
      ],
    },
    en: {
      agencyLabel: "Agency (AI Infrastructure)",
      primary: [
        { label: "Home", href: "/en" },
        { label: "Strategy (Advisory)", href: "/en/strategy-advisory" },
        { label: "AI Training", href: "/en/ai-training" },
        { label: "Pricing", href: "/en/pricing" },
        { label: "Resources", href: "/en/resources" },
        { label: "Contact", href: "/en/contact" },
      ],
      agencyItems: [
        { label: "Web / E-commerce Development", href: "/en/services/web-design" },
        { label: "Monthly SEO / AIO", href: "/en/services/ecommerce-seo" },
        { label: "LinkedIn Optimization", href: "/en/services/linkedin-optimization" },
        { label: "LinkedIn Content", href: "/en/services/linkedin-content" },
      ],
    },
    pt: {
      agencyLabel: "Agência (Infraestrutura IA)",
      primary: [
        { label: "Início", href: "/pt" },
        { label: "Estratégia (Consultoria)", href: "/pt/consultoria-estrategica" },
        { label: "Treinamento em IA", href: "/pt/treinamento-ia" },
        { label: "Preços", href: "/pt/precos" },
        { label: "Recursos", href: "/pt/recursos" },
        { label: "Contato", href: "/pt/contato" },
      ],
      agencyItems: [
        { label: "Desenvolvimento Web / E-commerce", href: "/pt/design-web" },
        { label: "SEO / AIO Mensal", href: "/pt/seo-ecommerce" },
        { label: "Otimização de LinkedIn", href: "/pt/linkedin" },
        { label: "Conteúdo LinkedIn", href: "/pt/conteudo-linkedin" },
      ],
    },
  };

  const cfg = NAV[locale];

  const langSwitchLinks =
    locale === "pt"
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

  const agencyActive = cfg.agencyItems.some((i) => isActive(i.href));

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

          <DropdownMenu>
            <DropdownMenuTrigger
              className={`inline-flex items-center gap-1 text-sm transition-colors outline-none ${
                agencyActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cfg.agencyLabel}
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {cfg.agencyItems.map((it) => (
                <DropdownMenuItem key={it.href} asChild>
                  <Link to={it.href} className="cursor-pointer">{it.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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

            <button
              type="button"
              onClick={() => setMobileAgencyOpen((v) => !v)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors ${
                agencyActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              aria-expanded={mobileAgencyOpen}
            >
              <span>{cfg.agencyLabel}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileAgencyOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileAgencyOpen && (
              <div className="ml-3 border-l border-border/50 pl-3 flex flex-col gap-1">
                {cfg.agencyItems.map((it) => (
                  <Link
                    key={it.href}
                    to={it.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {it.label}
                  </Link>
                ))}
              </div>
            )}

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
