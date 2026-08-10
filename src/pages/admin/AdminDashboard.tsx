import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FilePlus2, FileText, Inbox, Plus, Trophy } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { caseCms } from "@/integrations/supabase/cms-types";

type Counts = { pending: number | null; drafts: number | null; cases: number | null };

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({ pending: null, drafts: null, cases: null });

  useEffect(() => {
    let active = true;
    void Promise.all([
      (supabase as any).from("admin_inbox").select("*", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("active", false),
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
    <AdminLayout title="Inicio" description="Publica contenido y atiende solicitudes sin salir de este panel.">
      <div className="grid gap-3 sm:grid-cols-3">
        <Summary to="/admin/leads" icon={Inbox} label="Solicitudes de Fera" value={counts.pending} suffix="pendientes" />
        <Summary to="/admin/blog" icon={FileText} label="Artículos" value={counts.drafts} suffix="borradores" />
        <Summary to="/admin/casos" icon={Trophy} label="Casos de éxito" value={counts.cases} suffix="en el CMS" />
      </div>

      <section className="mt-8 border-t border-border pt-7">
        <h2 className="text-lg font-semibold">Crear contenido</h2>
        <p className="mt-1 text-sm text-muted-foreground">Elige qué quieres publicar; cada editor te guía solo por los campos necesarios.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link to="/admin/blog/nuevo" className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/40">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground"><FilePlus2 className="h-5 w-5" /></span>
            <span className="min-w-0 flex-1"><strong className="block text-sm">Nuevo artículo</strong><small className="text-muted-foreground">Redactar, revisar SEO y publicar.</small></span>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/admin/casos/nuevo" className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/40">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground"><Plus className="h-5 w-5" /></span>
            <span className="min-w-0 flex-1"><strong className="block text-sm">Nuevo caso de éxito</strong><small className="text-muted-foreground">Registrar contexto, resultados y evidencia.</small></span>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </AdminLayout>
  );
}

function Summary({ to, icon: Icon, label, value, suffix }: { to: string; icon: typeof Inbox; label: string; value: number | null; suffix: string }) {
  return <Link to={to} className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Icon className="h-4 w-4" />{label}</div><div className="mt-4 flex items-end gap-2"><strong className="text-3xl font-semibold tabular-nums">{value ?? "—"}</strong><span className="pb-1 text-xs text-muted-foreground">{value === null ? "sin conexión" : suffix}</span></div></Link>;
}
