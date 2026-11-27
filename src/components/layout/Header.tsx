import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { openFera } from "@/components/fx/primitives";

interface HeaderProps {
  currentLang?: "es" | "en" | "pt";
  lang?: "es" | "en" | "pt";
}

type NavItem = { label: string; href: string };
type NavGroup = { label: string; href: string; items: NavItem[] };
type NavCfg = { groups: NavGroup[]; cta: string; skip: string; open: string; close: string; nav: string };

/**
 * Cabecera con el sistema de diseño de Ferova (como ferova.com.co): blanca,
 * grupos con panel desplegable y la acción principal en píldora vino, que
 * abre Fera. Altura fija de 5rem: todas las páginas compensan con `pt-20`.
 */
const NAV: Record<"es" | "en" | "pt", NavCfg> = {
  es: {
    groups: [
      {
        label: "Especialidades",
        href: "/seo-para-agencias",
        items: [
          { label: "SEO para agencias (marca blanca)", href: "/seo-para-agencias" },
          { label: "SEO por horas", href: "/seo-por-horas" },
          { label: "Auditoría SEO técnica", href: "/auditoria-seo-tecnica" },
          { label: "Migraciones SEO", href: "/migraciones-seo" },
          { label: "SEO para ecommerce", href: "/servicios/seo-ecommerce" },
        ],
      },
      { label: "Cómo trabajo", href: "/#ayuda", items: [] },
      {
        label: "Casos",
        href: "/casos-de-exito",
        items: [
          { label: "Casos y entregas", href: "/casos-de-exito" },
          { label: "Portafolio", href: "https://ferova.com.co/portafolio?lang=es" },
        ],
      },
      {
        label: "Recursos",
        href: "/recursos",
        items: [
          { label: "Blog de SEO técnico", href: "/blog" },
          { label: "Recursos y herramientas", href: "/recursos" },
        ],
      },
      { label: "Sobre mí", href: "/sobre-nosotros", items: [] },
    ],
    cta: "Hablemos",
    skip: "Saltar al contenido",
    open: "Abrir menú",
    close: "Cerrar menú",
    nav: "Navegación principal",
  },
  en: {
    groups: [
      {
        label: "Specialties",
        href: "/en/white-label-seo-for-agencies",
        items: [
          { label: "White-label SEO for agencies", href: "/en/white-label-seo-for-agencies" },
          { label: "Technical SEO audits", href: "/en/technical-seo-audit-services" },
          { label: "SEO migrations", href: "/en/seo-migration-services" },
          { label: "Ecommerce SEO", href: "/en/services/ecommerce-seo" },
          { label: "Outsource SEO services", href: "/en/outsource-seo-services" },
        ],
      },
      { label: "How I work", href: "/en#ayuda", items: [] },
      {
        label: "Cases",
        href: "/en/case-studies",
        items: [
          { label: "Case studies", href: "/en/case-studies" },
          { label: "Portfolio", href: "https://ferova.com.co/portafolio?lang=en" },
        ],
      },
      {
        label: "Resources",
        href: "/en/resources",
        items: [
          { label: "Technical SEO blog", href: "/en/blog" },
          { label: "Resources and tools", href: "/en/resources" },
        ],
      },
      { label: "About me", href: "/en/about-me", items: [] },
    ],
    cta: "Let's talk",
    skip: "Skip to content",
    open: "Open menu",
    close: "Close menu",
    nav: "Main navigation",
  },
  pt: {
    groups: [
      { label: "SEO ecommerce", href: "/pt/seo-ecommerce", items: [] },
      { label: "Casos", href: "/pt/casos-de-sucesso", items: [] },
      { label: "Recursos", href: "/pt/recursos", items: [] },
    ],
    cta: "Falar agora",
    skip: "Pular para o conteúdo",
    open: "Abrir menu",
    close: "Fechar menu",
    nav: "Navegação principal",
  },
};

function NavLink({ item, className, onClick }: { item: NavItem; className: string; onClick?: () => void }) {
  return item.href.startsWith("https://") ? (
    <a href={item.href} className={className} onClick={onClick}>{item.label}</a>
  ) : (
    <Link to={item.href} className={className} onClick={onClick}>{item.label}</Link>
  );
}

export default function Header({ currentLang, lang }: HeaderProps) {
  const locale = lang ?? currentLang ?? "es";
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const cfg = NAV[locale];
  const homeHref = locale === "en" ? "/en" : locale === "pt" ? "/pt" : "/";
  const isActive = (g: NavGroup) =>
    [g.href, ...g.items.map((i) => i.href)].some((h) => !h.startsWith("http") && !h.includes("#") && location.pathname.startsWith(h));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onCta = () => {
    trackEvent("quote_requested", { section: "header", language: locale });
    setOpen(false);
    openFera(undefined, "header");
  };

  return (
    <header className="fx-light site-header fixed inset-x-0 top-0 z-50">
      <a href="#contenido-principal" className="agency-skip-link">{cfg.skip}</a>
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to={homeHref} className="flex shrink-0 flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="text-lg font-bold tracking-[0.1em]" style={{ fontFamily: "Poppins, system-ui, sans-serif" }}>MARÍA FER</span>
          <span className="mt-1.5 text-[0.62rem] font-medium uppercase tracking-[0.2em]" style={{ color: "#2f2d56", fontFamily: "'IBM Plex Mono', monospace" }}>
            SEO técnico · Ferova
          </span>
        </Link>

        <nav aria-label={cfg.nav} className="hidden xl:block">
          <ul className="flex items-center gap-7 2xl:gap-9">
            {cfg.groups.map((group) => (
              <li key={group.label} className="nav-group relative flex items-center gap-1">
                <NavLink
                  item={group}
                  className={`flex items-center gap-1 py-6 text-[0.98rem] font-medium transition-colors hover:text-[#541014] ${isActive(group) ? "text-[#541014]" : ""}`}
                />
                {group.items.length ? (
                  <>
                    <ChevronDown aria-hidden="true" className="pointer-events-none h-4 w-4 shrink-0" />
                    <ul className="nav-panel">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <NavLink item={item} className="block rounded-lg px-3 py-2.5 hover:bg-[#efedf7] hover:text-[#541014]" />
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher lang={locale} className="hidden sm:flex" />
          <button type="button" onClick={onCta} className="fx-btn fx-btn--sm hidden xl:inline-flex">
            {cfg.cta} <ArrowUpRight aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? cfg.close : cfg.open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#dfdcea] xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-movil" className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-[#dfdcea] bg-white xl:hidden">
          <nav aria-label={cfg.nav} className="mx-auto max-w-3xl px-5 py-5">
            <ul className="space-y-5">
              {cfg.groups.map((group) => (
                <li key={group.label}>
                  {group.items.length ? (
                    <>
                      <p className="text-sm font-bold text-[#585665]">{group.label}</p>
                      <ul className="mt-2 space-y-1">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <NavLink item={item} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2 text-base hover:bg-[#efedf7]" />
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <NavLink item={group} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2 text-base font-medium hover:bg-[#efedf7]" />
                  )}
                </li>
              ))}
            </ul>
            <LanguageSwitcher lang={locale} className="mt-6 sm:hidden" onNavigate={() => setOpen(false)} />
            <button type="button" onClick={onCta} className="fx-btn mt-5 w-full">
              {cfg.cta} <ArrowUpRight aria-hidden="true" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
