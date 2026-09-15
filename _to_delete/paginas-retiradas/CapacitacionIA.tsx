import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, MessageCircle, Users, Sparkles, CheckCircle2, Loader2, Calculator } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { formatPrice, type Lang } from "@/lib/pricing";
import { trackEvent } from "@/lib/analytics";

interface Props { lang?: Lang }

const WHATSAPP_URL = "https://wa.me/17865787671";
const FAKE_LOADING_MS = 3500;
const STEP_MS = Math.round(FAKE_LOADING_MS / 3); // ~1167ms cada paso

// Base de precio: USD que al multiplicar por TRM (4000) da el COP objetivo.
// 400 USD = $1.600.000 COP | 625 USD = $2.500.000 COP | 1125 USD = $4.500.000 COP
type AudienceOption = { value: string; label: string; priceUsd: number };
type TopicOption = { value: string; label: string };

const T = {
  es: {
    seoTitle: "Capacitación Corporativa en IA In-Company | Ferova Agency",
    seoDesc: "Sprints prácticos de 4 horas para transformar tu equipo en una unidad de alto rendimiento. Modelo de Inmersión Descomplicada.",
    eyebrow: "Capacitación IA",
    h1: "Capacitación Corporativa en IA: Transforma tu equipo en una unidad de alto rendimiento",
    sub: "Sprints prácticos In-Company de 4 horas bajo nuestro Modelo de Inmersión Descomplicada. No dictamos conferencias teóricas aburridas; tu equipo sale con flujos configurados, prompts validados para su área y un plan de adopción real. Diseñado para empresarios que no saben nada de tecnología.",
    cta: "Cotizar mi taller",
    topics: [
      { t: "Operaciones Inteligentes", d: "Productividad radical, automatización administrativa y gestión en Notion." },
      { t: "Ingeniería de Ventas", d: "Prospección agéntica multicanal, ganchos disruptivos y propuestas en Gamma." },
      { t: "Arquitectura GEO/SEO", d: "Auditoría de indexación en LLMs y optimización de huella digital." },
    ],
    calcTitle: "Calculadora de cotización",
    calcSub: "Estimación corporativa real. Agenda una llamada para la propuesta final.",
    topicLabel: "Tema del taller",
    audienceLabel: "Audiencia",
    estLabel: "Estimación",
    durationNote: "Sprint In-Company de 4 horas · Modelo de Inmersión Descomplicada",
    topicOptions: [
      { value: "ops", label: "Operaciones Inteligentes y Productividad Radical (Automatización administrativa, minería de reportes y gestión en Notion)." },
      { value: "ventas", label: "Ingeniería de Ventas y Prospección Agéntica (Ganchos disruptivos, prospección automatizada multicanal Apollo+Clay y propuestas en Gamma)." },
      { value: "geo", label: "Estrategia y Arquitectura GEO/SEO (Auditoría de indexación en LLMs como ChatGPT o Gemini y optimización de huella digital)." },
    ] as TopicOption[],
    audienceOptions: [
      { value: "1", label: "Célula Estratégica (1 Persona - Fundador/CMO)", priceUsd: 400 },
      { value: "2-5", label: "Equipo Táctico Corto (2 a 5 Líderes de Área)", priceUsd: 625 },
      { value: "6-15", label: "Unidad Operativa Completa (6 a 15 Colaboradores - In-Company)", priceUsd: 1125 },
    ] as AudienceOption[],
    disclaimer: "Estimación referencial. Agenda una llamada para la propuesta final personalizada.",
    ctaQuote: "Recibir propuesta formal",
    calcCta: "Calcular mi estimación",
    loadingSteps: [
      "⏳ Analizando vacíos de infraestructura digital actuales...",
      "⏳ Calculando ahorro potencial de horas administrativas semanales...",
      "⏳ Estructurando propuesta de repositorio personalizado de prompts para tu nicho...",
    ],
    benefits: ["Flujos configurados", "Prompts validados", "Plan de adopción real"],
  },
  en: {
    seoTitle: "Corporate AI In-Company Training | Ferova Agency",
    seoDesc: "Hands-on 4-hour sprints to transform your team into a high-performance unit. Demystified Immersion Model.",
    eyebrow: "AI Training",
    h1: "Corporate AI Training: Turn your team into a high-performance unit",
    sub: "Practical 4-hour In-Company sprints under our Demystified Immersion Model. We don't deliver boring theoretical lectures; your team leaves with configured workflows, prompts validated for their area, and a real adoption plan. Designed for founders with zero tech background.",
    cta: "Quote my workshop",
    topics: [
      { t: "Smart Operations", d: "Radical productivity, admin automation and Notion management." },
      { t: "Sales Engineering", d: "Agentic multichannel prospecting, disruptive hooks and Gamma proposals." },
      { t: "GEO/SEO Architecture", d: "LLM indexation audit and digital footprint optimization." },
    ],
    calcTitle: "Live quote calculator",
    calcSub: "Real corporate estimate. Book a call for the final proposal.",
    topicLabel: "Workshop topic",
    audienceLabel: "Audience",
    estLabel: "Estimate",
    durationNote: "4-hour In-Company Sprint · Demystified Immersion Model",
    topicOptions: [
      { value: "ops", label: "Smart Operations & Radical Productivity (Admin automation, report mining and Notion management)." },
      { value: "ventas", label: "Sales Engineering & Agentic Prospecting (Disruptive hooks, multichannel Apollo+Clay automation and Gamma proposals)." },
      { value: "geo", label: "GEO/SEO Strategy & Architecture (LLM indexation audit on ChatGPT/Gemini and digital footprint optimization)." },
    ] as TopicOption[],
    audienceOptions: [
      { value: "1", label: "Strategic Cell (1 Person - Founder/CMO)", priceUsd: 400 },
      { value: "2-5", label: "Short Tactical Team (2 to 5 Area Leaders)", priceUsd: 625 },
      { value: "6-15", label: "Full Operational Unit (6 to 15 Collaborators - In-Company)", priceUsd: 1125 },
    ] as AudienceOption[],
    disclaimer: "Reference estimate. Book a call for the final tailored proposal.",
    ctaQuote: "Get formal proposal",
    calcCta: "Calculate my estimate",
    loadingSteps: [
      "⏳ Analyzing current digital infrastructure gaps...",
      "⏳ Calculating potential weekly administrative hours saved...",
      "⏳ Structuring a custom prompt repository proposal for your niche...",
    ],
    benefits: ["Configured workflows", "Validated prompts", "Real adoption plan"],
  },
  pt: {
    seoTitle: "Treinamento Corporativo de IA In-Company | Ferova Agency",
    seoDesc: "Sprints práticos de 4 horas para transformar seu time em uma unidade de alto desempenho. Modelo de Imersão Descomplicada.",
    eyebrow: "Treinamento em IA",
    h1: "Treinamento Corporativo em IA: Transforme seu time em uma unidade de alto desempenho",
    sub: "Sprints práticos In-Company de 4 horas sob nosso Modelo de Imersão Descomplicada. Não damos palestras teóricas chatas; seu time sai com fluxos configurados, prompts validados para sua área e um plano de adoção real. Desenhado para empresários que não entendem nada de tecnologia.",
    cta: "Cotizar meu workshop",
    topics: [
      { t: "Operações Inteligentes", d: "Produtividade radical, automação administrativa e gestão no Notion." },
      { t: "Engenharia de Vendas", d: "Prospecção agêntica multicanal, ganchos disruptivos e propostas no Gamma." },
      { t: "Arquitetura GEO/SEO", d: "Auditoria de indexação em LLMs e otimização de pegada digital." },
    ],
    calcTitle: "Calculadora de cotação",
    calcSub: "Estimativa corporativa real. Agende uma ligação para a proposta final.",
    topicLabel: "Tema do workshop",
    audienceLabel: "Audiência",
    estLabel: "Estimativa",
    durationNote: "Sprint In-Company de 4 horas · Modelo de Imersão Descomplicada",
    topicOptions: [
      { value: "ops", label: "Operações Inteligentes e Produtividade Radical (Automação administrativa, mineração de relatórios e gestão no Notion)." },
      { value: "ventas", label: "Engenharia de Vendas e Prospecção Agêntica (Ganchos disruptivos, prospecção automatizada multicanal Apollo+Clay e propostas no Gamma)." },
      { value: "geo", label: "Estratégia e Arquitetura GEO/SEO (Auditoria de indexação em LLMs como ChatGPT ou Gemini e otimização de pegada digital)." },
    ] as TopicOption[],
    audienceOptions: [
      { value: "1", label: "Célula Estratégica (1 Pessoa - Fundador/CMO)", priceUsd: 400 },
      { value: "2-5", label: "Time Tático Curto (2 a 5 Líderes de Área)", priceUsd: 625 },
      { value: "6-15", label: "Unidade Operacional Completa (6 a 15 Colaboradores - In-Company)", priceUsd: 1125 },
    ] as AudienceOption[],
    disclaimer: "Estimativa referencial. Agende uma ligação para a proposta final personalizada.",
    ctaQuote: "Receber proposta formal",
    calcCta: "Calcular minha estimativa",
    loadingSteps: [
      "⏳ Analisando lacunas de infraestrutura digital atuais...",
      "⏳ Calculando economia potencial de horas administrativas semanais...",
      "⏳ Estruturando proposta de repositório personalizado de prompts para o seu nicho...",
    ],
    benefits: ["Fluxos configurados", "Prompts validados", "Plano de adoção real"],
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
    defaultValues: { tema: "ops", audiencia: "1" },
  });
  const tema = useWatch({ control, name: "tema" });
  const audiencia = useWatch({ control, name: "audiencia" });

  const audOpt = t.audienceOptions.find((o) => o.value === audiencia) ?? t.audienceOptions[0];
  const precioUsd = audOpt.priceUsd;

  // Ilusión del trabajo: loading falso de 3.5s antes de mostrar precio.
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  };

  const runCalc = () => {
    clearTimers();
    setRevealed(false);
    setStepIndex(0);
    setLoading(true);
    const t1 = setTimeout(() => setStepIndex(1), STEP_MS);
    const t2 = setTimeout(() => setStepIndex(2), STEP_MS * 2);
    const t3 = setTimeout(() => {
      setLoading(false);
      setRevealed(true);
      trackEvent("cta_clicked", { cta: "capacitacion_quote_calculated", lang, precioUsd, tema, audiencia });
    }, FAKE_LOADING_MS);
    timersRef.current.push(t1, t2, t3);
  };

  // Disparar al cambiar opciones
  useEffect(() => {
    runCalc();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tema, audiencia, lang]);

  useEffect(() => {
    trackEvent("page_view", { page: "capacitacion_ia", lang });
  }, [lang]);

  // Progreso animado de la barra (0 → 100% en FAKE_LOADING_MS)
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!loading) {
      setProgress(0);
      return;
    }
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / FAKE_LOADING_MS) * 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loading]);

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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-white mb-6">
              {t.h1}
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-3xl mx-auto leading-relaxed mb-8">
              {t.sub}
            </p>
            <a
              href="#cotizador"
              className="btn-gold inline-flex items-center gap-2 shadow-[0_8px_28px_-8px_hsl(45,86%,38%/0.7)] hover:scale-[1.03] active:scale-95 transition-transform"
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
              <form className="grid grid-cols-1 gap-5">
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

                <button
                  type="button"
                  onClick={runCalc}
                  disabled={loading}
                  className="btn-gold mt-2 inline-flex items-center justify-center gap-2 shadow-[0_8px_28px_-8px_hsl(45,86%,38%/0.7)] hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calculator className="w-4 h-4" />}
                  {t.calcCta}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-border/60 text-center min-h-[260px] flex flex-col justify-center">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{t.estLabel}</span>

                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-6"
                    >
                      {/* Barra de progreso */}
                      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden mb-5 border border-white/10">
                        <div
                          className="h-full rounded-full transition-[width] duration-100 ease-linear"
                          style={{
                            width: `${progress}%`,
                            background:
                              "linear-gradient(90deg, hsl(45,86%,38%), hsl(45,86%,54%))",
                            boxShadow: "0 0 16px hsl(45,86%,50%/0.6)",
                          }}
                        />
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.p
                          key={stepIndex}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm md:text-base text-foreground/85 font-medium"
                        >
                          {t.loadingSteps[stepIndex]}
                        </motion.p>
                      </AnimatePresence>

                      <p className="text-xs text-muted-foreground mt-6">{t.durationNote}</p>
                    </motion.div>
                  ) : revealed ? (
                    <motion.div
                      key={`result-${tema}-${audiencia}-${lang}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      <div className="text-4xl md:text-5xl font-bold text-gradient-gold my-3">
                        {formatPrice(precioUsd, lang)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{t.durationNote}</p>
                      <p className="text-sm text-muted-foreground italic mb-6">{t.disclaimer}</p>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("cta_clicked", { cta: "capacitacion_quote", precioUsd, tema, audiencia })}
                        className="btn-gold inline-flex items-center gap-2 shadow-[0_8px_28px_-8px_hsl(45,86%,38%/0.7)] hover:scale-[1.03] active:scale-95 transition-transform"
                      >
                        <MessageCircle className="w-4 h-4" /> {t.ctaQuote}
                      </a>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
            {t.benefits.map((b) => (
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
