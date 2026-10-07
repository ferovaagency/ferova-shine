import { FileText, Mail, FileSearch, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import type { Lang } from "@/lib/pricing";

interface Props {
  lang: Lang;
}

type Item = {
  id: string;
  icon: typeof FileText;
  name: string;
  desc: string;
  to: string;
};

const T: Record<Lang, { eyebrow: string; title: string; sub: string; items: Item[]; cta: string }> = {
  es: {
    eyebrow: "Recursos B2B",
    title: "Herramientas que aceleran decisiones",
    sub: "Plantillas y mini-apps gratuitas. Accede de inmediato.",
    items: [
      { id: "brief", icon: FileText, name: "Brief de contenido", desc: "Plantilla operativa para alinear marketing, ventas y producto en una sola página.", to: "/recursos/briefing-newsletter" },
      { id: "newsletter-pro", icon: Mail, name: "Newsletter Pro", desc: "Acceso a la edición Pro: análisis B2B accionables cada semana.", to: "/newsletter-pro" },
      { id: "contratos", icon: FileSearch, name: "Analizador de contratos", desc: "Sube un contrato y recibe los riesgos clave en lenguaje claro.", to: "/recursos/analizador-contratos" },
      { id: "propuestas", icon: Scale, name: "Comparador de propuestas", desc: "Compara dos propuestas de agencia lado a lado en minutos.", to: "/recursos/comparador-propuestas" },
    ],
    cta: "Acceder",
  },
  en: {
    eyebrow: "B2B Resources",
    title: "Tools that speed up decisions",
    sub: "Free templates and mini-apps. Instant access.",
    items: [
      { id: "brief", icon: FileText, name: "Content brief", desc: "Operating template to align marketing, sales and product on a single page.", to: "/en/resources/newsletter-briefing" },
      { id: "newsletter-pro", icon: Mail, name: "Newsletter Pro", desc: "Pro edition access: actionable B2B insights every week.", to: "/en/newsletter-pro" },
      { id: "contratos", icon: FileSearch, name: "Contract analyzer", desc: "Upload a contract and get the key risks in plain English.", to: "/en/resources/contract-analyzer" },
      { id: "propuestas", icon: Scale, name: "Proposal comparator", desc: "Compare two agency proposals side by side in minutes.", to: "/en/resources/proposal-comparator" },
    ],
    cta: "Unlock",
  },
  pt: {
    eyebrow: "Recursos B2B",
    title: "Ferramentas que aceleram decisões",
    sub: "Modelos e mini-apps gratuitos. Acesso imediato.",
    items: [
      { id: "brief", icon: FileText, name: "Briefing de conteúdo", desc: "Modelo operacional para alinhar marketing, vendas e produto em uma página.", to: "/pt/recursos/briefing-newsletter" },
      { id: "newsletter-pro", icon: Mail, name: "Newsletter Pro", desc: "Acesso à edição Pro: análises B2B acionáveis toda semana.", to: "/pt/newsletter-pro" },
      { id: "contratos", icon: FileSearch, name: "Analisador de contratos", desc: "Envie um contrato e receba os riscos-chave em linguagem clara.", to: "/pt/recursos/analisador-contratos" },
      { id: "propuestas", icon: Scale, name: "Comparador de propostas", desc: "Compare duas propostas de agência lado a lado em minutos.", to: "/pt/recursos/comparador-propostas" },
    ],
    cta: "Acessar",
  },
};

export default function RecursosB2BGrid({ lang }: Props) {
  const t = T[lang];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/30">
            {t.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground">{t.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.to}
                className="glass-card p-6 text-left transition-colors hover:border-gold/40 group flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-gold/10 group-hover:border-gold/40 transition-colors">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-5 flex-1">{item.desc}</p>
                <span className="text-sm font-medium text-gold group-hover:underline">
                  {t.cta} →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
