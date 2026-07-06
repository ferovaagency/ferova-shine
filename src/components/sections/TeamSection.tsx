import { Sparkles } from "lucide-react";
import mafeImg from "@/assets/team/mafe.jpeg.asset.json";
import boltImg from "@/assets/team/bolt.jpeg.asset.json";
import pacoImg from "@/assets/team/paco.jpeg.asset.json";
import billieImg from "@/assets/team/billie.jpeg.asset.json";

const PHOTOS: Record<string, string> = {
  MC: mafeImg.url,
  BO: boltImg.url,
  PA: pacoImg.url,
  BI: billieImg.url,
};

interface TeamSectionProps {
  lang?: "es" | "en" | "pt";
}

type Member = { name: string; role: string; copy: string; initials: string; tone: "gold" | "wine" | "navy" | "emerald" };

const COPY: Record<"es" | "en" | "pt", { title: string; sub: string; members: Member[]; banner: string }> = {
  es: {
    title: "Equipo Directivo",
    sub: "Estrategia humana + ruptura de patrón canina y felina. Lo que ves es lo que opera tu cuenta.",
    members: [
      { name: "Mafe Calderón", role: "Estratega", copy: "Explica ingeniería de negocio y automatización sin enredos técnicos.", initials: "MC", tone: "gold" },
      { name: "Bolt", role: "Chief Happiness Officer", copy: "Director de salud mental. Exige pausas activas obligatorias a mordiscos.", initials: "BO", tone: "wine" },
      { name: "Paco", role: "Jefe de Seguridad", copy: "Resguarda bases de datos y ladra a los virus tecnológicos.", initials: "PA", tone: "navy" },
      { name: "Billie", role: "Directora de Copias", copy: "Gata encargada de la revisión crítica de textos y control de entregables visuales.", initials: "BI", tone: "emerald" },
    ],
    banner:
      "NOTA DE AUTORIDAD: Este equipo (sí, incluyendo a las mascotas) multiplicó las ventas orgánicas de un cliente B2B de $3.000.000 a $14.000.000 COP mensuales en solo 6 meses. Un 366% de crecimiento real, sin pauta publicitaria.",
  },
  en: {
    title: "Leadership Team",
    sub: "Human strategy + canine and feline pattern interrupt. What you see is what runs your account.",
    members: [
      { name: "Mafe Calderón", role: "Strategist", copy: "Explains business engineering and automation without technical jargon.", initials: "MC", tone: "gold" },
      { name: "Bolt", role: "Chief Happiness Officer", copy: "Director of mental health. Demands mandatory active breaks — with bites.", initials: "BO", tone: "wine" },
      { name: "Paco", role: "Head of Security", copy: "Guards databases and barks at tech viruses.", initials: "PA", tone: "navy" },
      { name: "Billie", role: "Director of Copy", copy: "Cat in charge of critical copy review and visual deliverable QA.", initials: "BI", tone: "emerald" },
    ],
    banner:
      "AUTHORITY NOTE: This team (yes, pets included) multiplied a B2B client's organic revenue from $750 to $3,500 USD/month in just 6 months. 366% real growth, with zero paid ads.",
  },
  pt: {
    title: "Equipe Diretiva",
    sub: "Estratégia humana + ruptura de padrão canina e felina. O que você vê é quem opera sua conta.",
    members: [
      { name: "Mafe Calderón", role: "Estrategista", copy: "Explica engenharia de negócio e automação sem jargão técnico.", initials: "MC", tone: "gold" },
      { name: "Bolt", role: "Chief Happiness Officer", copy: "Diretor de saúde mental. Exige pausas ativas obrigatórias a mordidas.", initials: "BO", tone: "wine" },
      { name: "Paco", role: "Chefe de Segurança", copy: "Protege bancos de dados e late nos vírus tecnológicos.", initials: "PA", tone: "navy" },
      { name: "Billie", role: "Diretora de Copys", copy: "Gata encarregada da revisão crítica de textos e controle visual de entregáveis.", initials: "BI", tone: "emerald" },
    ],
    banner:
      "NOTA DE AUTORIDADE: Este time (sim, mascotes incluídos) multiplicou as vendas orgânicas de um cliente B2B de R$15 mil para R$70 mil/mês em apenas 6 meses. 366% de crescimento real, sem mídia paga.",
  },
};

const toneMap = {
  gold: "from-gold/30 to-gold/5 text-gold border-gold/30",
  wine: "from-wine/30 to-wine/5 text-wine-light border-wine/30",
  navy: "from-[#1e3a8a]/40 to-[#1e3a8a]/5 text-blue-300 border-blue-400/30",
  emerald: "from-emerald-700/40 to-emerald-700/5 text-emerald-300 border-emerald-400/30",
} as const;

export default function TeamSection({ lang = "es" }: TeamSectionProps) {
  const t = COPY[lang];

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28 px-4 sm:px-6 dark-section"
      style={{ background: "linear-gradient(180deg, hsl(243,31%,8%) 0%, hsl(243,31%,12%) 100%)" }}
    >
      <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-medium bg-white/5 border border-white/10 text-white/70">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            {lang === "es" ? "Quién opera tu cuenta" : lang === "pt" ? "Quem opera sua conta" : "Who runs your account"}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">{t.title}</h2>
          <p className="text-base md:text-lg text-white/65">{t.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-12">
          {t.members.map((m) => (
            <div
              key={m.name}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur hover:border-gold/40 transition-all hover:-translate-y-1"
            >
              <div
                className={`aspect-square w-full rounded-xl mb-5 border bg-gradient-to-br ${toneMap[m.tone]} flex items-center justify-center`}
              >
                <span className="text-5xl md:text-6xl font-display font-bold opacity-90">{m.initials}</span>
              </div>
              <h3 className="text-lg font-bold text-white leading-tight">{m.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold/90 mb-3">{m.role}</p>
              <p className="text-sm text-white/65 leading-relaxed">{m.copy}</p>
            </div>
          ))}
        </div>

        {/* Banner de autoridad (Prueba social absoluta) */}
        <div className="relative rounded-2xl border-2 border-gold/40 bg-gradient-to-r from-gold/10 via-gold/5 to-wine/10 p-6 md:p-8 shadow-[0_0_60px_-15px_rgba(212,175,55,0.4)]">
          <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gold text-[#1a1530] text-[10px] md:text-xs font-bold uppercase tracking-wider">
            {lang === "es" ? "Prueba real" : lang === "pt" ? "Prova real" : "Real proof"}
          </div>
          <p className="text-sm md:text-base text-white/90 leading-relaxed font-medium">{t.banner}</p>
        </div>
      </div>
    </section>
  );
}
