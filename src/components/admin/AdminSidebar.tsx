import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Inbox, Trophy, FileText, ExternalLink, LogOut, Newspaper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type NavItem = { label: string; to: string; icon: typeof Inbox; match: string; countKey?: "leads" | "casos" | "blog" };

const NAV: NavItem[] = [
  { label: "Inicio", to: "/admin", icon: Home, match: "/admin" },
  { label: "Solicitudes", to: "/admin/leads", icon: Inbox, match: "/admin/leads", countKey: "leads" },
  { label: "Casos de éxito", to: "/admin/casos", icon: Trophy, match: "/admin/casos", countKey: "casos" },
  { label: "Blog", to: "/admin/blog", icon: FileText, match: "/admin/blog", countKey: "blog" },
  { label: "Newsletter", to: "/admin/newsletter", icon: Newspaper, match: "/admin/newsletter" },
];

/**
 * Sidebar del panel admin (Ferova Admin). Menú mínimo: Leads, Casos, Blog.
 * Los contadores representan SOLO lo pendiente (leads sin atender, blogs en
 * borrador); si una fuente no existe todavía, no se muestra número.
 */
export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [counts, setCounts] = useState<{ leads?: number; casos?: number; blog?: number }>({});

  useEffect(() => {
    let alive = true;
    (async () => {
      const next: { leads?: number; casos?: number; blog?: number } = {};
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
          .eq("active", false);
        if (!error && typeof count === "number") next.blog = count;
      } catch { /* noop */ }
      if (alive) setCounts(next);
    })();
    return () => { alive = false; };
  }, [location.pathname]);

  const isActive = (match: string) => match === "/admin" ? location.pathname === match : location.pathname === match || location.pathname.startsWith(`${match}/`);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <aside className="md:w-60 md:shrink-0 border-b md:border-b-0 md:border-r border-border/60 bg-card md:min-h-screen flex md:flex-col">
      <div className="hidden md:block px-5 py-6 border-b border-border/60">
        <span className="font-display font-bold text-lg">Ferova Admin</span>
      </div>

      <nav className="flex md:flex-col gap-1 p-3 md:p-4 flex-1 overflow-x-auto">
        {NAV.map((item) => {
          const active = isActive(item.match);
          const count = item.countKey ? counts[item.countKey] : undefined;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors whitespace-nowrap ${
                active ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {typeof count === "number" && count > 0 && (
                <span className="text-xs font-semibold rounded-full bg-gold/15 text-gold px-2 py-0.5">{count}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="hidden md:flex flex-col gap-1 p-4 border-t border-border/60">
        <Link to="/" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <ExternalLink className="w-4 h-4" /> Ver sitio
        </Link>
        <button onClick={signOut} className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground text-left">
          <LogOut className="w-4 h-4" /> Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
