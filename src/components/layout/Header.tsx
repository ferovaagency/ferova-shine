import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  currentLang?: "es" | "en";
  lang?: "es" | "en";
}

export default function Header({ currentLang, lang }: HeaderProps) {
  const locale = lang ?? currentLang ?? "es";
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = locale === "es"
    ? [
        { label: "Servicios", href: "/servicios" },
        { label: "Precios", href: "/precios" },
        { label: "Casos", href: "/casos-de-exito" },
        { label: "Blog", href: "/blog" },
        { label: "Recursos", href: "/recursos" },
        { label: "Contacto", href: "/contacto" },
      ]
    : [
        { label: "Services", href: "/en/services" },
        { label: "Pricing", href: "/en/pricing" },
        { label: "Cases", href: "/en/case-studies" },
        { label: "Blog", href: "/en/blog" },
        { label: "Resources", href: "/en/resources" },
        { label: "Contact", href: "/en/contact" },
      ];

  const homeHref = locale === "es" ? "/" : "/en";
  const adminHref = locale === "es" ? "/admin-blog" : "/en/admin-blog";

  const isActive = (href: string) =>
    href === "/"
      ? location.pathname === href
      : location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link to={homeHref} className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card text-sm font-bold text-foreground">
            FA
          </div>
          <div>
            <p className="font-display text-lg font-bold leading-none text-foreground">Ferova Agency</p>
            <p className="text-xs text-muted-foreground">{locale === "es" ? "Web apps que venden" : "Web apps that sell"}</p>
          </div>
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
          <Link
            to={adminHref}
            className="rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {locale === "es" ? "Admin Blog" : "Blog Admin"}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={locale === "es" ? "Abrir menú" : "Open menu"}
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
            <Link
              to={adminHref}
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-xl border border-border px-4 py-3 text-sm text-foreground"
            >
              {locale === "es" ? "Abrir admin de blog" : "Open blog admin"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
