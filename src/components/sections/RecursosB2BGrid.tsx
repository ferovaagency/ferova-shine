import { useState } from "react";
import { FileText, Mail, FileSearch, Scale } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Lang } from "@/lib/pricing";

interface Props {
  lang: Lang;
}

const T = {
  es: {
    eyebrow: "Recursos B2B",
    title: "Herramientas que aceleran decisiones",
    sub: "Plantillas y mini-apps gratuitas. Ingresa tu correo y recibe acceso inmediato.",
    modalTitle: "Ingresa tu correo para acceder",
    modalDesc: "Te enviamos el recurso al instante. Sin spam.",
    items: [
      { id: "brief", icon: FileText, name: "Brief de contenido", desc: "Plantilla operativa para alinear marketing, ventas y producto en una sola página." },
      { id: "newsletter-pro", icon: Mail, name: "Newsletter Pro", desc: "Acceso a la edición Pro: análisis B2B accionables cada semana." },
      { id: "contratos", icon: FileSearch, name: "Analizador de contratos", desc: "Sube un contrato y recibe los riesgos clave en lenguaje claro." },
      { id: "propuestas", icon: Scale, name: "Comparador de propuestas", desc: "Compara dos propuestas de agencia lado a lado en minutos." },
    ],
    cta: "Acceder",
  },
  en: {
    eyebrow: "B2B Resources",
    title: "Tools that speed up decisions",
    sub: "Free templates and mini-apps. Drop your email for instant access.",
    modalTitle: "Enter your email to unlock",
    modalDesc: "We'll send the resource instantly. No spam.",
    items: [
      { id: "brief", icon: FileText, name: "Content brief", desc: "Operating template to align marketing, sales and product on a single page." },
      { id: "newsletter-pro", icon: Mail, name: "Newsletter Pro", desc: "Pro edition access: actionable B2B insights every week." },
      { id: "contratos", icon: FileSearch, name: "Contract analyzer", desc: "Upload a contract and get the key risks in plain English." },
      { id: "propuestas", icon: Scale, name: "Proposal comparator", desc: "Compare two agency proposals side by side in minutes." },
    ],
    cta: "Unlock",
  },
  pt: {
    eyebrow: "Recursos B2B",
    title: "Ferramentas que aceleram decisões",
    sub: "Modelos e mini-apps gratuitos. Informe seu e-mail e receba acesso imediato.",
    modalTitle: "Informe seu e-mail para acessar",
    modalDesc: "Enviamos o recurso na hora. Sem spam.",
    items: [
      { id: "brief", icon: FileText, name: "Briefing de conteúdo", desc: "Modelo operacional para alinhar marketing, vendas e produto em uma página." },
      { id: "newsletter-pro", icon: Mail, name: "Newsletter Pro", desc: "Acesso à edição Pro: análises B2B acionáveis toda semana." },
      { id: "contratos", icon: FileSearch, name: "Analisador de contratos", desc: "Envie um contrato e receba os riscos-chave em linguagem clara." },
      { id: "propuestas", icon: Scale, name: "Comparador de propostas", desc: "Compare duas propostas de agência lado a lado em minutos." },
    ],
    cta: "Acessar",
  },
};

export default function RecursosB2BGrid({ lang }: Props) {
  const t = T[lang];
  const [openId, setOpenId] = useState<string | null>(null);

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
              <button
                key={item.id}
                type="button"
                onClick={() => setOpenId(item.id)}
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
              </button>
            );
          })}
        </div>
      </div>

      {t.items.map((item) => (
        <Dialog key={item.id} open={openId === item.id} onOpenChange={(o) => !o && setOpenId(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{t.modalTitle}</DialogTitle>
              <DialogDescription>{item.name} — {t.modalDesc}</DialogDescription>
            </DialogHeader>
            <div id={`brevo-form-container-${item.id}`} className="min-h-[200px] w-full" />
          </DialogContent>
        </Dialog>
      ))}
    </section>
  );
}
