import { Chip, type ChipTone } from "./Chip";

/** Etiqueta por fuente del lead (contacto, diagnóstico, IA, newsletter…). El texto siempre va escrito. */
const STYLES: Record<string, { label: string; tone: ChipTone }> = {
  contact: { label: "Contacto", tone: "info" },
  diagnostic: { label: "Diagnóstico", tone: "brand" },
  ai_advisor: { label: "Asesor IA", tone: "wait" },
  newsletter: { label: "Newsletter", tone: "ok" },
  tool: { label: "Herramienta", tone: "idle" },
};

export default function SourceBadge({ source }: { source: string }) {
  const s = STYLES[source] ?? { label: source, tone: "idle" as ChipTone };
  return <Chip tone={s.tone}>{s.label}</Chip>;
}
