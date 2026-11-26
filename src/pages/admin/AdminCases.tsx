import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ExternalLink, Loader2, Pencil, Plus, RefreshCw, Search, Trash2, Trophy } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { Chip, toneFor } from "@/components/admin/Chip";
import { caseCms, type CmsCaseStudy, type ContentStatus } from "@/integrations/supabase/cms-types";
import { casesData } from "@/pages/CasosDeExito";

type CaseSummary = Pick<
  CmsCaseStudy,
  "id" | "slug" | "status" | "client_public_name" | "sector" | "country" | "summary" | "updated_at"
> & { legacy?: boolean };

const inheritedCases: CaseSummary[] = casesData.es.map((item) => ({ id: `legacy--${item.id}`, slug: item.id, status: "draft", client_public_name: item.title, sector: item.category, country: item.country, summary: item.challenge, updated_at: "", legacy: true }));

const STATUS_LABEL: Record<ContentStatus, string> = {
  draft: "Borrador",
  in_review: "En revisión",
  approved: "Aprobado",
  scheduled: "Programado",
  published: "Publicado",
  archived: "Archivado",
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
        setCases(inheritedCases);
      } else {
        setMigrationPending(false);
        const databaseCases = data ?? [];
        const slugs = new Set(databaseCases.map((item) => item.slug));
        setCases([...databaseCases, ...inheritedCases.filter((item) => !slugs.has(item.slug))]);
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
    <AdminLayout
      title="Casos de éxito"
      description="Administra casos verificables, su estado editorial y la evidencia que respalda cada resultado."
      actions={<Link to="/admin/casos/nuevo" className="admin-btn"><Plus aria-hidden="true" /> <span className="hidden sm:inline">Nuevo caso</span><span className="sm:hidden">Nuevo</span></Link>}
    >
      <div className="admin-toolbar">
        <label className="admin-search"><Search aria-hidden="true" /><span className="sr-only">Buscar casos</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar cliente, sector, país o URL" /></label>
        <button type="button" onClick={() => void load()} aria-label="Actualizar" title="Actualizar" className="admin-icon-btn"><RefreshCw aria-hidden="true" /></button>
      </div>

      {migrationPending && (
        <div className="admin-alert mb-4" role="status">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">El CMS de casos está pendiente de activación.</p>
            <p className="mt-1">
              La migración ya está preparada. Mientras se aplica, puedes consultar los casos estáticos actuales debajo.
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Cargando" /></div>
      ) : visible.length === 0 ? (
        <div className="admin-empty">
          <Trophy className="mx-auto mb-4 h-8 w-8 text-[#2f2d56]" aria-hidden="true" />
          <h2>Aún no hay casos en el CMS</h2>
          <p className="mx-auto mt-2 max-w-md">
            Crea el primer borrador y complétalo con consentimiento, evidencia y métricas antes de publicarlo.
          </p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table min-w-[760px]">
            <thead>
              <tr>
                <th scope="col">Caso</th>
                <th scope="col">Sector</th>
                <th scope="col">Estado</th>
                <th scope="col">Actualización</th>
                <th scope="col" className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link to={`/admin/casos/${item.id}/editar`} className="font-semibold hover:text-[#2f2d56] hover:underline">{item.client_public_name || "Cliente confidencial"}</Link>
                    <div className="mt-0.5 max-w-md truncate text-xs text-muted-foreground"><span className="admin-mono">/{item.slug}</span> · {item.summary}</div>
                  </td>
                  <td className="text-muted-foreground">{item.sector}{item.country ? ` · ${item.country}` : ""}</td>
                  <td>
                    {item.legacy ? <Chip tone="wait">Por completar</Chip> : <Chip tone={toneFor(item.status)}>{STATUS_LABEL[item.status]}</Chip>}
                  </td>
                  <td className="admin-mono whitespace-nowrap text-xs text-muted-foreground">{item.legacy ? "Contenido heredado" : new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(item.updated_at))}</td>
                  <td>
                    <div className="flex justify-end gap-1.5">
                      <Link to={`/admin/casos/${item.id}/editar`} className="admin-btn admin-btn--ghost admin-btn--sm">
                        <Pencil aria-hidden="true" /> {item.legacy ? "Completar" : "Editar"}
                      </Link>
                      {item.status === "published" && (
                        <Link to={`/casos-de-exito/${item.slug}`} target="_blank" className="admin-btn admin-btn--ghost admin-btn--sm">
                          <ExternalLink aria-hidden="true" /> Ver
                        </Link>
                      )}
                      {!item.legacy && <button type="button" title="Eliminar" aria-label={`Eliminar ${item.client_public_name || item.slug}`} disabled={workingId === item.id} onClick={() => void remove(item)} className="admin-icon-btn admin-icon-btn--danger">{workingId === item.id ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Trash2 aria-hidden="true" />}</button>}
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
    <div className="admin-table-wrap">
      <table className="admin-table">
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
