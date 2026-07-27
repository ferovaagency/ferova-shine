import { useEffect, useState, useCallback } from "react";
import { Loader2, Check, Inbox as InboxIcon, RefreshCw } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import SourceBadge from "@/components/admin/SourceBadge";
import { supabase } from "@/integrations/supabase/client";

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
}

type Filter = "all" | "contact" | "diagnostic" | "ai_advisor" | "newsletter" | "completed";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "contact", label: "Contacto" },
  { id: "diagnostic", label: "Diagnósticos" },
  { id: "ai_advisor", label: "Asesor IA" },
  { id: "newsletter", label: "Newsletter" },
  { id: "completed", label: "Completados" },
];

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableMissing, setTableMissing] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

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
      await (supabase as any)
        .from("admin_inbox")
        .update({ status: "completed", completed_at: new Date().toISOString() })
        .eq("id", id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch { /* noop */ }
  };

  const fmt = (d: string) => { try { return new Date(d).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" }); } catch { return d; } };

  return (
    <AdminLayout title="Leads">
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              filter === f.id ? "bg-gold text-primary-foreground font-medium" : "border border-border text-muted-foreground hover:text-foreground hover:border-gold/50"
            }`}
          >
            {f.label}
          </button>
        ))}
        <button onClick={load} className="ml-auto inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <RefreshCw className="w-4 h-4" /> Actualizar
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
      ) : tableMissing ? (
        <div className="glass-card p-8 text-center max-w-xl mx-auto">
          <InboxIcon className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display font-bold text-lg mb-2">Bandeja unificada aún no conectada</h2>
          <p className="text-muted-foreground text-sm">
            La tabla <code className="text-gold">admin_inbox</code> todavía no existe en el backend. Una vez creada
            (finanzas/CRM viven en Ferova One; aquí solo se registran y organizan los leads), esta bandeja unificará
            contacto, diagnósticos, Asesor IA, newsletter y herramientas.
          </p>
        </div>
      ) : leads.length === 0 ? (
        <div className="glass-card p-10 text-center text-muted-foreground">
          <InboxIcon className="w-10 h-10 mx-auto mb-4 opacity-60" />
          {filter === "completed" ? "No hay registros completados." : "Todo al día. No hay leads pendientes."}
        </div>
      ) : (
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase text-muted-foreground">
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Contacto</th>
                <th className="px-4 py-3 font-medium">Fuente</th>
                <th className="px-4 py-3 font-medium">Resumen</th>
                <th className="px-4 py-3 font-medium text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-b border-border/40 hover:bg-accent/40">
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{fmt(l.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{l.name || "—"}</div>
                    {l.company && <div className="text-xs text-muted-foreground">{l.company}</div>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {l.email && <div>{l.email}</div>}
                    {l.phone && <div className="text-xs">{l.phone}</div>}
                  </td>
                  <td className="px-4 py-3"><SourceBadge source={l.source} /></td>
                  <td className="px-4 py-3 text-muted-foreground max-w-xs"><span className="line-clamp-2">{l.summary || "—"}</span></td>
                  <td className="px-4 py-3 text-right">
                    {l.status === "pending" && (
                      <button onClick={() => markDone(l.id)} className="inline-flex items-center gap-1.5 text-xs font-medium rounded-full border border-border px-3 py-1.5 hover:border-gold/50 hover:text-gold transition-colors">
                        <Check className="w-3.5 h-3.5" /> Listo
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminLeads;
