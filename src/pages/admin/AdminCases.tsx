import { Link } from "react-router-dom";
import { Trophy, ExternalLink, Info } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { casesData } from "@/pages/CasosDeExito";

const SERVICE_LABEL: Record<string, string> = { seo: "SEO", pauta: "Pauta Digital", webapp: "Web App", ia: "IA" };

/**
 * Pestaña Casos de éxito. Hoy los casos son estáticos (casesData en
 * CasosDeExito.tsx); esta vista los lista en solo lectura. El editor completo
 * (avances, métricas, borrador/publicado) llega cuando exista la tabla de casos
 * en el backend — ver plan admin, Sprint 3.
 */
const AdminCases = () => {
  const cases = casesData.es;

  return (
    <AdminLayout title="Casos de éxito">
      <div className="glass-card p-4 mb-6 flex items-start gap-3 text-sm text-muted-foreground">
        <Info className="w-4 h-4 text-gold shrink-0 mt-0.5" />
        <p>
          Los casos son actualmente estáticos. El editor dinámico (avances, métricas y estado borrador/publicado)
          se activa al crear la tabla de casos en el backend. Por ahora esta es una vista de solo lectura.
        </p>
      </div>

      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3 font-medium">Caso</th>
              <th className="px-4 py-3 font-medium">Servicio</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Publicación</th>
              <th className="px-4 py-3 font-medium text-right">Ver</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className="border-b border-border/40 hover:bg-accent/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <Trophy className="w-4 h-4 text-gold/70 shrink-0" /> {c.title}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{SERVICE_LABEL[c.category] ?? c.category}</td>
                <td className="px-4 py-3 text-muted-foreground">Anónimo · {c.country}</td>
                <td className="px-4 py-3"><span className="text-xs font-medium rounded-full bg-emerald-500/15 text-emerald-400 px-2.5 py-0.5">Publicado</span></td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/casos-de-exito/${c.id}`} target="_blank" className="inline-flex items-center gap-1.5 text-xs font-medium rounded-full border border-border px-3 py-1.5 hover:border-gold/50 hover:text-gold transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminCases;
