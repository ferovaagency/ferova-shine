import { useEffect, useState, useCallback } from "react";
import { Loader2, Check, Inbox as InboxIcon, RefreshCw, Eye, X, Copy, MessageCircle, Mail } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import SourceBadge from "@/components/admin/SourceBadge";
import { Chip, toneFor } from "@/components/admin/Chip";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/** Fila de la bandeja unificada admin_inbox. */
interface Lead {
  id: string;
  source: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  summary: string | null;
  status: "pending" | "completed";
  created_at: string;
  completed_at?: string | null;
  payload?: Record<string, unknown> | null;
}

type Filter = "all" | "contact" | "diagnostic" | "ai_advisor" | "newsletter" | "completed";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "contact", label: "Contacto" },
  { id: "diagnostic", label: "Diagnósticos" },
  { id: "ai_advisor", label: "Fera" },
  { id: "newsletter", label: "Newsletter" },
  { id: "completed", label: "Completados" },
];

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableMissing, setTableMissing] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Lead | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      let q = (supabase as any)
        .from("admin_inbox")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      // Por defecto la bandeja muestra pendientes; "Completados" invierte.
      if (filter === "completed") q = q.eq("status", "completed");
      else q = q.eq("status", "pending");
      if (filter !== "all" && filter !== "completed") q = q.eq("source", filter);

      const { data, error } = await q;
      if (error) {
        // 42P01 = tabla inexistente todavía.
        if (error.code === "42P01" || /does not exist/i.test(error.message)) setTableMissing(true);
        setLeads([]);
      } else {
        setTableMissing(false);
        setLeads((data as unknown as Lead[]) ?? []);
      }
    } catch {
      setTableMissing(true);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const markDone = async (id: string) => {
    try {
      const { error } = await (supabase as any)
        .from("admin_inbox")
        .update({ status: "completed", completed_at: new Date().toISOString() })
        .eq("id", id);
      if (error) { toast.error(`No se pudo completar: ${error.message}`); return; }
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setSelected((s) => (s?.id === id ? null : s));
    } catch { toast.error("No se pudo completar la solicitud. Revisa la conexión e inténtalo de nuevo."); }
  };

  const fmt = (d: string) => { try { return new Date(d).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" }); } catch { return d; } };
  const phoneDigits = (p?: string | null) => (p ?? "").replace(/\D/g, "");
  const copyLead = (l: Lead) => {
    const txt = [l.name, l.company, l.email, l.phone, l.summary].filter(Boolean).join(" · ");
    try { void navigator.clipboard.writeText(txt); } catch { /* noop */ }
  };

  return (
    <AdminLayout
      title="Solicitudes"
      description="Contacto, diagnósticos, Fera y newsletter en una sola bandeja."
      actions={<button type="button" onClick={load} className="admin-icon-btn" aria-label="Actualizar" title="Actualizar"><RefreshCw aria-hidden="true" /></button>}
    >
      {/* Filtros */}
      <div className="admin-filters mb-4" role="group" aria-label="Filtrar solicitudes">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" onClick={() => setFilter(f.id)} aria-pressed={filter === f.id} className="admin-filter">
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" aria-label="Cargando" /></div>
      ) : tableMissing ? (
        <div className="admin-empty mx-auto max-w-xl">
          <InboxIcon className="mx-auto mb-4 h-9 w-9" aria-hidden="true" />
          <h2 className="mb-2">Bandeja unificada aún no conectada</h2>
          <p>
            La tabla <code className="admin-mono text-[#541014]">admin_inbox</code> todavía no existe en el backend. Una vez creada
            (finanzas/CRM viven en Ferova One; aquí solo se registran y organizan los leads), esta bandeja unificará
            contacto, diagnósticos, Asesor IA, newsletter y herramientas.
          </p>
        </div>
      ) : leads.length === 0 ? (
        <div className="admin-empty">
          <InboxIcon className="mx-auto mb-4 h-9 w-9 opacity-60" aria-hidden="true" />
          {filter === "completed" ? "No hay registros completados." : "Todo al día. No hay leads pendientes."}
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table min-w-[820px]">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Nombre</th>
                <th scope="col">Contacto</th>
                <th scope="col">Fuente</th>
                <th scope="col">Estado</th>
                <th scope="col">Resumen</th>
                <th scope="col" className="text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td className="admin-mono whitespace-nowrap text-xs text-muted-foreground">{fmt(l.created_at)}</td>
                  <td>
                    <div className="font-semibold">{l.name || "—"}</div>
                    {l.company && <div className="text-xs text-muted-foreground">{l.company}</div>}
                  </td>
                  <td className="text-muted-foreground">
                    {l.email && <div className="break-all">{l.email}</div>}
                    {l.phone && <div className="admin-mono text-xs">{l.phone}</div>}
                  </td>
                  <td><SourceBadge source={l.source} /></td>
                  <td><Chip tone={toneFor(l.status)}>{l.status === "completed" ? "Completado" : "Pendiente"}</Chip></td>
                  <td className="max-w-xs text-muted-foreground"><span className="line-clamp-2">{l.summary || "—"}</span></td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setSelected(l)} className="admin-btn admin-btn--ghost admin-btn--sm">
                        <Eye aria-hidden="true" /> Ver
                      </button>
                      {l.status === "pending" && (
                        <button type="button" onClick={() => markDone(l.id)} className="admin-btn admin-btn--ghost admin-btn--sm">
                          <Check aria-hidden="true" /> Listo
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Panel de detalle del lead */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="lead-detail-title">
          <div className="absolute inset-0 bg-[rgb(27_32_51_/_45%)]" onClick={() => setSelected(null)} />
          <div className="relative h-full w-full max-w-md overflow-y-auto bg-white shadow-[0_18px_48px_rgb(27_32_51_/_22%)] sm:m-3 sm:h-[calc(100%-1.5rem)] sm:rounded-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-white px-5 py-4">
              <div className="flex items-center gap-2">
                <SourceBadge source={selected.source} />
                <span className="admin-mono text-xs text-muted-foreground">{fmt(selected.created_at)}</span>
              </div>
              <button type="button" onClick={() => setSelected(null)} aria-label="Cerrar" className="admin-icon-btn admin-icon-btn--plain"><X aria-hidden="true" /></button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <h2 id="lead-detail-title" className="text-lg">{selected.name || "Sin nombre"}</h2>
                {selected.company && <p className="text-sm text-muted-foreground">{selected.company}</p>}
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {selected.email && <div className="break-all">{selected.email}</div>}
                  {selected.phone && <div className="admin-mono">{selected.phone}</div>}
                </div>
                <div className="mt-3"><Chip tone={toneFor(selected.status)}>{selected.status === "completed" ? "Completado" : "Pendiente"}</Chip></div>
              </div>

              {selected.summary && (
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">Resumen</p>
                  <p className="text-sm">{selected.summary}</p>
                </div>
              )}

              {selected.payload && Object.keys(selected.payload).length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Detalle</p>
                  <dl className="space-y-2 rounded-xl bg-[#f7f8fc] p-3">
                    {Object.entries(selected.payload).map(([k, v]) => (
                      <div key={k} className="text-sm">
                        <dt className="admin-mono inline text-xs text-muted-foreground">{k}: </dt>
                        <dd className="inline break-words">{typeof v === "object" ? JSON.stringify(v) : String(v)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 border-t border-border pt-4">
                <button type="button" onClick={() => copyLead(selected)} className="admin-btn admin-btn--ghost">
                  <Copy aria-hidden="true" /> Copiar
                </button>
                {phoneDigits(selected.phone) && (
                  <a href={`https://wa.me/${phoneDigits(selected.phone)}`} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn--ghost">
                    <MessageCircle aria-hidden="true" /> WhatsApp
                  </a>
                )}
                {selected.email && (
                  <a href={`mailto:${selected.email}`} className="admin-btn admin-btn--ghost">
                    <Mail aria-hidden="true" /> Email
                  </a>
                )}
                {selected.status === "pending" && (
                  <button type="button" onClick={() => markDone(selected.id)} className="admin-btn">
                    <Check aria-hidden="true" /> Listo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminLeads;
