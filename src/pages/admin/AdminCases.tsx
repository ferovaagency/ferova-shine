import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ExternalLink, Loader2, Pencil, Plus, RefreshCw, Search, Trash2, Trophy } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { caseCms, type CmsCaseStudy, type ContentStatus } from "@/integrations/supabase/cms-types";
import { casesData } from "@/pages/CasosDeExito";

type CaseSummary = Pick<
  CmsCaseStudy,
  "id" | "slug" | "status" | "client_public_name" | "sector" | "country" | "summary" | "updated_at"
>;

const STATUS_LABEL: Record<ContentStatus, string> = {
  draft: "Borrador",
  in_review: "En revisión",
  approved: "Aprobado",
  scheduled: "Programado",
  published: "Publicado",
  archived: "Archivado",
};

const STATUS_STYLE: Record<ContentStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  in_review: "bg-amber-500/15 text-amber-500",
  approved: "bg-blue-500/15 text-blue-400",
  scheduled: "bg-violet-500/15 text-violet-400",
  published: "bg-emerald-500/15 text-emerald-400",
  archived: "bg-slate-500/15 text-slate-400",
};

export default function AdminCases() {
  const [cases, setCases] = useState<CaseSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [migrationPending, setMigrationPending] = useState(false);
  const [search, setSearch] = useState("");
  const [workingId, setWorkingId] = useState<string | null>(null);

  const load = useCallback(async () => {
      setLoading(true);
      const { data, error } = await caseCms
        .from("case_studies")
        .select("id,slug,status,client_public_name,sector,country,summary,updated_at")
        .order("updated_at", { ascending: false });

      if (error) {
        setMigrationPending(true);
      } else {
        setMigrationPending(false);
        setCases(data ?? []);
      }
      setLoading(false);
  }, []);
  useEffect(() => { void load(); }, [load]);
  const visible = useMemo(() => cases.filter((item) => `${item.client_public_name} ${item.sector} ${item.country} ${item.slug}`.toLowerCase().includes(search.trim().toLowerCase())), [cases, search]);

  const remove = async (item: CaseSummary) => {
    if (!window.confirm(`¿Eliminar el caso “${item.client_public_name || item.slug}”? Esta acción no se puede deshacer.`)) return;
    setWorkingId(item.id);
    const { error } = await caseCms.from("case_studies").delete().eq("id", item.id);
    if (error) toast.error(`No se pudo eliminar: ${error.message}`);
    else { toast.success("Caso eliminado."); await load(); }
    setWorkingId(null);
  };

  return (
    <AdminLayout title="Casos de éxito" description="Administra casos verificables, su estado editorial y la evidencia que respalda cada resultado.">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><span className="sr-only">Buscar casos</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar cliente, sector, país o URL" className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary/50" /></label>
        <button onClick={() => void load()} aria-label="Actualizar" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"><RefreshCw className="h-4 w-4" /></button>
        <Link
          to="/admin/casos/nuevo"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Nuevo caso
        </Link>
      </div>

      {migrationPending && (
        <div className="glass-card mb-6 flex items-start gap-3 border border-amber-500/30 p-4 text-sm">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <div>
            <p className="font-medium text-foreground">El CMS de casos está pendiente de activación.</p>
            <p className="mt-1 text-muted-foreground">
              La migración ya está preparada. Mientras se aplica, puedes consultar los casos estáticos actuales debajo.
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : migrationPending ? (
        <StaticCasesFallback />
      ) : visible.length === 0 ? (
        <div className="glass-card px-6 py-14 text-center">
          <Trophy className="mx-auto mb-4 h-8 w-8 text-gold/70" />
          <h2 className="font-display text-xl font-semibold">Aún no hay casos en el CMS</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Crea el primer borrador y complétalo con consentimiento, evidencia y métricas antes de publicarlo.
          </p>
        </div>
      ) : (
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase text-muted-foreground">
                <th className="px-4 py-3 font-medium">Caso</th>
                <th className="px-4 py-3 font-medium">Sector</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Actualización</th>
                <th className="px-4 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((item) => (
                <tr key={item.id} className="border-b border-border/40 hover:bg-accent/40">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{item.client_public_name || "Cliente confidencial"}</div>
                    <div className="mt-0.5 max-w-md truncate text-xs text-muted-foreground">/{item.slug} · {item.summary}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{item.sector}{item.country ? ` · ${item.country}` : ""}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[item.status]}`}>
                      {STATUS_LABEL[item.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(item.updated_at))}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/casos/${item.id}/editar`} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:border-gold/50 hover:text-gold">
                        <Pencil className="h-3.5 w-3.5" /> Editar
                      </Link>
                      {item.status === "published" && (
                        <Link to={`/casos-de-exito/${item.slug}`} target="_blank" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:border-gold/50 hover:text-gold">
                          <ExternalLink className="h-3.5 w-3.5" /> Ver
                        </Link>
                      )}
                      <button title="Eliminar" aria-label={`Eliminar ${item.client_public_name || item.slug}`} disabled={workingId === item.id} onClick={() => void remove(item)} className="inline-flex items-center rounded-lg border border-border p-2 hover:border-destructive/40 hover:text-destructive disabled:opacity-50">{workingId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

function StaticCasesFallback() {
  return (
    <div className="glass-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border/60 text-left text-xs uppercase text-muted-foreground"><th className="px-4 py-3 font-medium">Caso actual</th><th className="px-4 py-3 font-medium">País</th><th className="px-4 py-3 font-medium text-right">Ver</th></tr></thead>
        <tbody>
          {casesData.es.map((item) => (
            <tr key={item.id} className="border-b border-border/40">
              <td className="px-4 py-3 font-medium">{item.title}</td>
              <td className="px-4 py-3 text-muted-foreground">{item.country}</td>
              <td className="px-4 py-3 text-right"><Link to={`/casos-de-exito/${item.id}`} target="_blank" className="text-xs font-medium text-gold">Ver caso</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
