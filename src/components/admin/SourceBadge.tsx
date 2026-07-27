/** Etiqueta de color por fuente del lead (contacto, diagnóstico, IA, newsletter…). */
const STYLES: Record<string, { label: string; cls: string }> = {
  contact: { label: "Contacto", cls: "bg-blue-500/15 text-blue-400" },
  diagnostic: { label: "Diagnóstico", cls: "bg-gold/15 text-gold" },
  ai_advisor: { label: "Asesor IA", cls: "bg-purple-500/15 text-purple-400" },
  newsletter: { label: "Newsletter", cls: "bg-emerald-500/15 text-emerald-400" },
  tool: { label: "Herramienta", cls: "bg-orange-500/15 text-orange-400" },
};

export default function SourceBadge({ source }: { source: string }) {
  const s = STYLES[source] ?? { label: source, cls: "bg-muted text-muted-foreground" };
  return <span className={`inline-block text-xs font-medium rounded-full px-2.5 py-0.5 ${s.cls}`}>{s.label}</span>;
}
