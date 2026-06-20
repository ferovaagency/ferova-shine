import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, MessageCircle, Users, Sparkles, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { formatPrice, type Lang } from "@/lib/pricing";
import { trackEvent } from "@/lib/analytics";

interface Props { lang?: Lang }

const WHATSAPP_URL = "https://wa.link/jvbd4j";
const TARIFA_BASE_USD = 100;
const HORAS = 4;

const T = {
  es: {
    seoTitle: "Capacitación IA in-company para equipos B2B | Ferova Agency",
    seoDesc: "Talleres corporativos de IA, Marketing y Estrategia para equipos B2B. Cotiza tu taller en tiempo real.",
    eyebrow: "Capacitación IA",
    h1: "Capacita a tu equipo en IA aplicada al negocio",
    sub: "Talleres prácticos in-company de 4 horas. Tu equipo sale con frameworks, prompts y un plan de implementación.",
    cta: "Cotizar mi taller",
    topics: [
      { t: "Marketing con IA", d: "Contenido, SEO, campañas y analítica." },
      { t: "Estrategia con IA", d: "Decisiones, modelos de negocio y OKRs." },
      { t: "Inteligencia Artificial", d: "Automatizaciones, agentes y datos." },
    ],
    calcTitle: "Calculadora de cotización",
    calcSub: "Estimación en tiempo real. Agenda una llamada para la propuesta final.",
    topicLabel: "Tema del taller",
    audienceLabel: "Audiencia",
    estLabel: "Estimación",
    durationNote: "Taller de 4 horas, tarifa base $100 USD/hora",
    topicOptions: [
      { value: "marketing", label: "Marketing", mult: 1.0 },
      { value: "estrategia", label: "Estrategia", mult: 1.2 },
      { value: "ia", label: "Inteligencia Artificial", mult: 1.5 },
    ],
    audienceOptions: [
      { value: "1", label: "1 persona", mult: 1.0 },
      { value: "2-5", label: "2 a 5 personas", mult: 1.5 },
      { value: "6-15", label: "6 a 15 personas", mult: 2.0 },
    ],
    disclaimer: "Estimación en tiempo real. Agenda una llamada para la propuesta final.",
    ctaQuote: "Recibir propuesta formal",
  },
  en: {
    seoTitle: "In-company AI Training for B2B teams | Ferova Agency",
    seoDesc: "Corporate AI, Marketing & Strategy workshops for B2B teams. Get your live quote in real time.",
    eyebrow: "AI Training",
    h1: "Train your team in AI applied to business",
    sub: "Hands-on 4-hour in-company workshops. Your team leaves with frameworks, prompts and an implementation plan.",
    cta: "Quote my workshop",
    topics: [
      { t: "AI Marketing", d: "Content, SEO, campaigns and analytics." },
      { t: "AI Strategy", d: "Decisions, business models and OKRs." },
      { t: "Artificial Intelligence", d: "Automations, agents and data." },
    ],
    calcTitle: "Live quote calculator",
    calcSub: "Real-time estimate. Book a call for the final proposal.",
    topicLabel: "Workshop topic",
    audienceLabel: "Audience",
    estLabel: "Estimate",
    durationNote: "4-hour workshop, base rate $100 USD/hour",
    topicOptions: [
      { value: "marketing", label: "Marketing", mult: 1.0 },
      { value: "estrategia", label: "Strategy", mult: 1.2 },
      { value: "ia", label: "Artificial Intelligence", mult: 1.5 },
    ],
    audienceOptions: [
      { value: "1", label: "1 person", mult: 1.0 },
      { value: "2-5", label: "2 to 5 people", mult: 1.5 },
      { value: "6-15", label: "6 to 15 people", mult: 2.0 },
    ],
    disclaimer: "Real-time estimate. Book a call for the final proposal.",
    ctaQuote: "Get formal proposal",
  },
  pt: {
    seoTitle: "Treinamento de IA in-company para times B2B | Ferova Agency",
    seoDesc: "Workshops corporativos de IA, Marketing e Estratégia para times B2B. Cotize seu workshop em tempo real.",
    eyebrow: "Treinamento em IA",
    h1: "Capacite seu time em IA aplicada ao negócio",
    sub: "Workshops práticos in-company de 4 horas. Seu time sai com frameworks, prompts e plano de implementação.",
    cta: "Cotizar meu workshop",
    topics: [
      { t: "Marketing com IA", d: "Conteúdo, SEO, campanhas e analytics." },
      { t: "Estratégia com IA", d: "Decisões, modelos de negócio e OKRs." },
      { t: "Inteligência Artificial", d: "Automações, agentes e dados." },
    ],
    calcTitle: "Calculadora de cotação",
    calcSub: "Estimativa em tempo real. Agende uma ligação para a proposta final.",
    topicLabel: "Tema do workshop",
    audienceLabel: "Audiência",
    estLabel: "Estimativa",
    durationNote: "Workshop de 4 horas, tarifa base $100 USD/hora",
    topicOptions: [
      { value: "marketing", label: "Marketing", mult: 1.0 },
      { value: "estrategia", label: "Estratégia", mult: 1.2 },
      { value: "ia", label: "Inteligência Artificial", mult: 1.5 },
    ],
    audienceOptions: [
      { value: "1", label: "1 pessoa", mult: 1.0 },
      { value: "2-5", label: "2 a 5 pessoas", mult: 1.5 },
      { value: "6-15", label: "6 a 15 pessoas", mult: 2.0 },
    ],
    disclaimer: "Estimativa em tempo real. Agende uma ligação para a proposta final.",
    ctaQuote: "Receber proposta formal",
  },
};

interface FormValues {
  tema: string;
  audiencia: string;
}

export default function CapacitacionIA({ lang = "es" }: Props) {
  const t = T[lang];
  const path =
    lang === "en" ? "/en/ai-training" : lang === "pt" ? "/pt/treinamento-ia" : "/capacitacion-ia";

  const { register, control } = useForm<FormValues>({
    defaultValues: { tema: "marketing", audiencia: "1" },
  });
  const tema = useWatch({ control, name: "tema" });
  const audiencia = useWatch({ control, name: "audiencia" });

  const temaMult = t.topicOptions.find((o) => o.value === tema)?.mult ?? 1;
  const audMult = t.audienceOptions.find((o) => o.value === audiencia)?.mult ?? 1;
  const precioUsd = TARIFA_BASE_USD * HORAS * temaMult * audMult;

  useEffect(() => {
    trackEvent("page_view", { page: "capacitacion_ia", lang });
  }, [lang]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO title={t.seoTitle} description={t.seoDesc} path={path} lang={lang} />
      <Header lang={lang} />

      <main className="flex-1">
        {/* HERO */}
        <section
          className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6"
          style={{
            background:
              "linear-gradient(135deg, hsl(243,31%,10%) 0%, hsl(243,31%,14%) 60%, hsl(356,68%,15%) 100%)",
          }}
        >
          <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
          <div className="relative max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 mb-6 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/30">
              {t.eyebrow}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
              {t.h1}
            </h1>
            <p className="text-base md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-8">
              {t.sub}
            </p>
            <a
              href="#cotizador"
              className="btn-gold inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> {t.cta}
            </a>
          </div>
        </section>

        {/* TEMAS */}
        <section className="py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.topics.map(({ t: tt, d }) => (
              <div key={tt} className="glass-card p-6">
                <Brain className="w-6 h-6 text-gold mb-3" />
                <h3 className="text-lg font-bold mb-2">{tt}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CALCULADORA */}
        <section id="cotizador" className="py-16 md:py-24 px-4 sm:px-6 bg-card/40 border-y border-border/40">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{t.calcTitle}</h2>
              <p className="text-muted-foreground">{t.calcSub}</p>
            </div>

            <div className="glass-card p-6 md:p-8">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-foreground inline-flex items-center gap-2">
                    <Brain className="w-4 h-4 text-gold" /> {t.topicLabel}
                  </span>
                  <select
                    {...register("tema")}
                    className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold/60"
                  >
                    {t.topicOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-foreground inline-flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold" /> {t.audienceLabel}
                  </span>
                  <select
                    {...register("audiencia")}
                    className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold/60"
                  >
                    {t.audienceOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </label>
              </form>

              <div className="mt-8 pt-6 border-t border-border/60 text-center">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{t.estLabel}</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${tema}-${audiencia}-${lang}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="text-4xl md:text-5xl font-bold text-gradient-gold my-3"
                  >
                    {formatPrice(precioUsd, lang)}
                  </motion.div>
                </AnimatePresence>
                <p className="text-xs text-muted-foreground mb-6">{t.durationNote}</p>
                <p className="text-sm text-muted-foreground italic mb-6">{t.disclaimer}</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("cta_clicked", { cta: "capacitacion_quote", precioUsd })}
                  className="btn-gold inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> {t.ctaQuote}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
            {["Frameworks listos", "Prompts validados", "Plan 30 días"].map((b) => (
              <div key={b} className="glass-card p-6 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm font-medium">{b}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
