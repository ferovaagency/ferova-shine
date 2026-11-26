import type { ReactNode } from "react";

export type ChipTone = "ok" | "wait" | "info" | "bad" | "brand" | "idle";

/** El estado siempre va escrito: el color solo acompaña. */
const TONES: Record<string, ChipTone> = {
  completed: "ok",
  published: "ok",
  approved: "ok",
  pending: "wait",
  draft: "idle",
  in_review: "wait",
  scheduled: "info",
  archived: "idle",
};

export const toneFor = (status: string | undefined): ChipTone => TONES[status ?? ""] ?? "idle";

export function Chip({ tone, children, className = "" }: { tone: ChipTone; children: ReactNode; className?: string }) {
  return <span className={`chip chip--${tone} ${className}`.trim()}>{children}</span>;
}
