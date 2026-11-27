import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Inbox, Trophy, FileText, ExternalLink, LogOut, Newspaper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BLOG_SITE_ORIGINS } from "@/lib/blog-i18n";

type CountKey = "leads" | "casos" | "blog";
type Counts = Partial<Record<CountKey, number>>;
type NavItem = { label: string; to: string; icon: typeof Inbox; match: string; countKey?: CountKey; countLabel?: string };

const NAV: NavItem[] = [
  { label: "Resumen", to: "/admin", icon: Home, match: "/admin" },
  { label: "Solicitudes", to: "/admin/leads", icon: Inbox, match: "/admin/leads", countKey: "leads", countLabel: "pendientes" },
  { label: "Casos de éxito", to: "/admin/casos", icon: Trophy, match: "/admin/casos", countKey: "casos" },
  { label: "Blog", to: "/admin/blog", icon: FileText, match: "/admin/blog", countKey: "blog", countLabel: "borradores" },
  { label: "Newsletter", to: "/admin/newsletter", icon: Newspaper, match: "/admin/newsletter" },
];

/**
 * Contadores de lo pendiente (leads sin atender, blogs en borrador); si una
 * fuente no existe todavía, no se muestra número. Compartido por la barra
 * lateral y las pestañas móviles.
 */
export function useAdminNav() {
  const location = useLocation();
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    let alive = true;
    (async () => {
      const next: Counts = {};
      // Leads pendientes (tabla admin_inbox — puede no existir aún).
      try {
        const { count, error } = await (supabase as any)
          .from("admin_inbox")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending");
        if (!error && typeof count === "number") next.leads = count;
      } catch { /* tabla aún no creada */ }
      // Blogs en borrador (blog_posts.active = false).
      try {
        const { count, error } = await supabase
          .from("blog_posts")
          .select("*", { count: "exact", head: true })
          .eq("active", false)
          .in("site_origin", [...BLOG_SITE_ORIGINS]);
        if (!error && typeof count === "number") next.blog = count;
      } catch { /* noop */ }
      if (alive) setCounts(next);
    })();
    return () => { alive = false; };
  }, [location.pathname]);

  const isActive = (match: string) => match === "/admin" ? location.pathname === match : location.pathname === match || location.pathname.startsWith(`${match}/`);
  return { counts, isActive };
}

function useSignOut() {
  const navigate = useNavigate();
  return async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
}

function Count({ item, counts }: { item: NavItem; counts: Counts }) {
  const count = item.countKey ? counts[item.countKey] : undefined;
  if (typeof count !== "number" || count <= 0) return null;
  return <span className="admin-count" aria-label={`${count} ${item.countLabel ?? ""}`.trim()}>{count}</span>;
}

/** Barra lateral flotante (desde 1024px). */
export type AdminNavState = ReturnType<typeof useAdminNav>;

export default function AdminSidebar({ nav }: { nav: AdminNavState }) {
  const { counts, isActive } = nav;
  const signOut = useSignOut();
  const [email, setEmail] = useState("");

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? ""));
  }, []);

  return (
    <aside className="admin-side" aria-label="Menú del panel">
      <div className="admin-brand">
        <strong>Ferova Admin</strong>
        <span>seoparaecommerce.co</span>
      </div>

      <nav aria-label="Administración">
        <p className="admin-side__group">Sitio</p>
        {NAV.map((item) => (
          <Link key={item.to} to={item.to} className="admin-nav" aria-current={isActive(item.match) ? "page" : undefined}>
            <item.icon aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            <Count item={item} counts={counts} />
          </Link>
        ))}
        <p className="admin-side__group">Atajos</p>
        <Link to="/" target="_blank" className="admin-nav">
          <ExternalLink aria-hidden="true" />
          <span className="flex-1">Ver sitio</span>
        </Link>
      </nav>

      <div className="admin-user">
        <span className="admin-avatar" aria-hidden="true">{email.slice(0, 1) || "F"}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold" title={email}>{email || "Sesión activa"}</p>
          <p className="text-xs text-muted-foreground">Edición</p>
        </div>
        <button type="button" onClick={() => void signOut()} className="admin-icon-btn admin-icon-btn--plain" aria-label="Cerrar sesión" title="Cerrar sesión">
          <LogOut />
        </button>
      </div>
    </aside>
  );
}

/** Pestañas horizontales desplazables (menos de 1024px): ningún destino queda oculto. */
export function AdminMobileTabs({ nav }: { nav: AdminNavState }) {
  const { counts, isActive } = nav;
  const signOut = useSignOut();
  return (
    <nav className="admin-tabs" aria-label="Administración">
      {NAV.map((item) => (
        <Link key={item.to} to={item.to} className="admin-tab" aria-current={isActive(item.match) ? "page" : undefined}>
          <item.icon aria-hidden="true" />
          {item.label}
          <Count item={item} counts={counts} />
        </Link>
      ))}
      <Link to="/" target="_blank" className="admin-tab"><ExternalLink aria-hidden="true" /> Ver sitio</Link>
      <button type="button" onClick={() => void signOut()} className="admin-tab"><LogOut aria-hidden="true" /> Salir</button>
    </nav>
  );
}
