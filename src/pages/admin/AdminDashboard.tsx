import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FilePlus2, FileText, Inbox, Plus, Trophy } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { caseCms } from "@/integrations/supabase/cms-types";
import { BLOG_SITE_ORIGINS } from "@/lib/blog-i18n";

type Counts = { pending: number | null; drafts: number | null; cases: number | null };

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({ pending: null, drafts: null, cases: null });

  useEffect(() => {
    let active = true;
    void Promise.all([
      (supabase as any).from("admin_inbox").select("*", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("active", false).in("site_origin", [...BLOG_SITE_ORIGINS]),
      caseCms.from("case_studies").select("*", { count: "exact", head: true }).neq("status", "archived"),
    ]).then(([leads, posts, cases]) => {
      if (!active) return;
      setCounts({
        pending: leads.error ? null : leads.count ?? 0,
        drafts: posts.error ? null : posts.count ?? 0,
        cases: cases.error ? null : cases.count ?? 0,
      });
    });
    return () => { active = false; };
  }, []);

  return (
    <AdminLayout title="Resumen" description="Publica contenido y atiende solicitudes sin salir de este panel.">
      <h2 className="sr-only">Pendientes</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <Summary to="/admin/leads" icon={Inbox} label="Solicitudes de Fera" value={counts.pending} suffix="pendientes" />
        <Summary to="/admin/blog" icon={FileText} label="Artículos" value={counts.drafts} suffix="borradores" />
        <Summary to="/admin/casos" icon={Trophy} label="Casos de éxito" value={counts.cases} suffix="en el CMS" />
      </div>

      <section className="admin-card mt-5">
        <h2>Crear contenido</h2>
        <p className="admin-sub mt-1">Elige qué quieres publicar; cada editor te guía solo por los campos necesarios.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <CreateLink to="/admin/blog/nuevo" icon={FilePlus2} title="Nuevo artículo" text="Redactar, revisar reglas editoriales y publicar." />
          <CreateLink to="/admin/casos/nuevo" icon={Plus} title="Nuevo caso de éxito" text="Registrar contexto, resultados y evidencia." />
        </div>
      </section>
    </AdminLayout>
  );
}

function CreateLink({ to, icon: Icon, title, text }: { to: string; icon: typeof Inbox; title: string; text: string }) {
  return (
    <Link to={to} className="flex items-center gap-4 rounded-2xl border border-border p-4 transition-colors hover:border-[#2f2d56] hover:bg-[#f4f3fa]">
      <span className="admin-icon-tile"><Icon aria-hidden="true" /></span>
      <span className="min-w-0 flex-1"><strong className="block text-sm">{title}</strong><small className="text-muted-foreground">{text}</small></span>
      <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
    </Link>
  );
}

function Summary({ to, icon: Icon, label, value, suffix }: { to: string; icon: typeof Inbox; label: string; value: number | null; suffix: string }) {
  return (
    <Link to={to} className="admin-card admin-stat">
      <span className="admin-stat__label"><span className="admin-icon-tile"><Icon aria-hidden="true" /></span>{label}</span>
      <span className="flex items-end gap-2">
        <strong className="admin-stat__value">{value ?? "—"}</strong>
        <span className="pb-0.5 text-xs text-muted-foreground">{value === null ? "sin conexión" : suffix}</span>
      </span>
    </Link>
  );
}
