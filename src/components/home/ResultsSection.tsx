import { Star } from "lucide-react";
import { HOME, type Lang } from "@/content/home";

/**
 * Resultados + testimonio (E-E-A-T). El contenido se conserva EXACTAMENTE como
 * estaba publicado; la auditoría de afirmaciones (verificar/anonimizar cifras)
 * es la Fase 5 del plan y se hará con datos, sin inventar nada aquí.
 */
const ResultsSection = ({ lang }: { lang: Lang }) => {
  const c = HOME[lang].results;

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6" style={{ background: "hsl(var(--surface))" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{c.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground">{c.sub}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {c.metrics.map((m) => (
            <div key={m.label} className="glass-card p-5 md:p-6 text-center">
              <p className="text-3xl md:text-5xl font-bold text-gradient-gold mb-2">{m.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground leading-snug">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="glass-card max-w-3xl mx-auto p-7 md:p-10 gold-glow">
          <div className="flex gap-1 mb-4 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-gold text-gold" />
            ))}
          </div>
          <p className="text-base md:text-xl leading-relaxed text-foreground text-center italic mb-6">{c.testimonial.text}</p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-white font-bold">
              {c.testimonial.initials}
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground">{c.testimonial.name}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{c.testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
