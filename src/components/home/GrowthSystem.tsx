import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Compass, Search, TrendingUp, Code, Bot, Sparkles, type LucideIcon } from "lucide-react";
import type { Lang } from "@/content/home";

/**
 * Sistema de crecimiento del hero (plan de diseño, §2). Cinco capacidades
 * (Estrategia, SEO, Ventas, Tecnología, IA) conectadas a un centro "Crecimiento".
 *
 * Profundidad 3D SUTIL sin Three.js: CSS 3D (perspective + translateZ) +
 * framer-motion. Responde al cursor con una inclinación de ±6° en escritorio;
 * en móvil o con prefers-reduced-motion queda estático (solo entrada). Es
 * decorativo: si el JS no corre, los nodos siguen siendo texto real visible.
 */
type Node = { icon: LucideIcon; label: string; x: number; y: number; depth: number };

const LABELS: Record<Lang, { center: string; nodes: string[] }> = {
  es: { center: "Crecimiento", nodes: ["Estrategia", "SEO", "Ventas", "Tecnología", "IA"] },
  en: { center: "Growth", nodes: ["Strategy", "SEO", "Sales", "Technology", "AI"] },
  pt: { center: "Crescimento", nodes: ["Estratégia", "SEO", "Vendas", "Tecnologia", "IA"] },
};

const ICONS: LucideIcon[] = [Compass, Search, TrendingUp, Code, Bot];
// Posiciones en % dentro del contenedor (círculo r≈40 alrededor del centro).
const POS = [
  { x: 50, y: 10, depth: 40 },   // arriba
  { x: 88, y: 38, depth: 20 },   // der. arriba
  { x: 74, y: 82, depth: 60 },   // der. abajo (más al frente)
  { x: 26, y: 82, depth: 60 },   // izq. abajo (más al frente)
  { x: 12, y: 38, depth: 20 },   // izq. arriba
];

export default function GrowthSystem({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  const t = LABELS[lang];
  const nodes: Node[] = t.nodes.map((label, i) => ({ icon: ICONS[i], label, ...POS[i] }));

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);   // rotación Y según X del cursor
    rx.set(-py * 12);  // rotación X según Y del cursor
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto w-full max-w-md aspect-square select-none"
      style={{ perspective: 1000 }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d", rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry }}
      >
        {/* Líneas de conexión (se dibujan en la entrada) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {nodes.map((n, i) => (
            <motion.line
              key={i}
              x1={50} y1={50} x2={n.x} y2={n.y}
              stroke="hsl(45 86% 52%)" strokeWidth={0.4}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.35 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.08 }}
            />
          ))}
        </svg>

        {/* Nodo central: Crecimiento (estable) */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translateZ(60px)" }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.35 }}
        >
          <div className="flex items-center gap-2 rounded-2xl border border-gold/50 bg-gold/15 px-4 py-2.5 backdrop-blur-sm shadow-[0_0_30px_hsla(45,86%,45%,0.35)]">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-sm font-display font-bold text-white">{t.center}</span>
          </div>
        </motion.div>

        {/* Nodos de capacidades */}
        {nodes.map((n, i) => (
          <motion.div
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%`, transform: `translateZ(${n.depth}px)` }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.7 + i * 0.08 }}
          >
            <motion.div
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 backdrop-blur-sm"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={reduce ? undefined : { duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <n.icon className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-medium text-white whitespace-nowrap">{n.label}</span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Luz dinámica detrás del sistema */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
        style={{ background: "radial-gradient(circle at 50% 45%, hsla(45,86%,45%,0.18), transparent 60%)" }}
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
