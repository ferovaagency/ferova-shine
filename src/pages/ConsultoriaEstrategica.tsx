import { useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, CheckCircle2, Compass, Calendar, Repeat, Target } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatPrice, type Lang } from "@/lib/pricing";
import { trackEvent } from "@/lib/analytics";

interface Props { lang?: Lang }

const WHATSAPP_URL = "https://wa.link/jvbd4j";

const T = {
  es: {
    seoTitle: "Consultoría Estratégica B2B para fundadores | Ferova Agency",
    seoDesc: "Asesoría 1 a 1 y mentoría mensual para fundadores B2B. Diagnóstico estratégico, plan de IA y growth medible.",
    eyebrow: "Mentoría y Asesoría",
    h1: "Consultoría Estratégica para fundadores B2B",
    sub: "Trabajamos contigo en sesiones de alto impacto para clarificar dirección, instalar IA y construir un sistema de crecimiento real.",
    cta: "Agendar diagnóstico",
    cta2: "Hablar por WhatsApp",
    plans: [
      {
        icon: Calendar,
        name: "Asesoría 1 a 1",
        price: 150,
        period: "once" as const,
        desc: "Sesión estratégica de 60 minutos para desbloquear una decisión clave.",
        bullets: [
          "Diagnóstico previo en 24 h",
          "Sesión grabada + minuta accionable",
          "Plan de 30 días post-sesión",
        ],
      },
      {
        icon: Repeat,
        name: "Mentoría Mensual",
        price: 500,
        period: "monthly" as const,
        desc: "Acompañamiento continuo para fundadores que ejecutan en serio.",
        bullets: [
          "2 sesiones 1 a 1 al mes",
          "Soporte asíncrono por WhatsApp",
          "Revisión de OKRs y métricas",
          "Acceso a frameworks privados",
        ],
        featured: true,
      },
    ],
    benefitsTitle: "Qué resuelve esta consultoría",
    benefits: [
      { icon: Target, t: "Foco accionable", d: "Sales en cada sesión con 3 movimientos concretos." },
      { icon: Compass, t: "Mapa estratégico", d: "Conectamos producto, marketing y ventas en un solo sistema." },
      { icon: CheckCircle2, t: "Validación con datos", d: "Decisiones basadas en métricas, no en intuición." },
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Para quién es esta consultoría?", a: "Para fundadores B2B con tracción inicial que quieren ordenar crecimiento, instalar IA y dejar de improvisar." },
      { q: "¿En qué se diferencia de una agencia?", a: "Aquí trabajamos contigo en la estrategia. Si después necesitas ejecución, nuestra agencia entra como upsell." },
      { q: "¿Cómo se factura la mentoría?", a: "Mes a mes, sin permanencia. El primer pago se descuenta si contratas un servicio mensual de la agencia." },
      { q: "¿Hay garantía?", a: "Si tras la primera sesión no ves valor, devolvemos el 100% sin preguntas." },
      { q: "¿En qué idiomas trabajan?", a: "Español, inglés y portugués." },
    ],
    finalTitle: "Listo para tomar mejores decisiones, más rápido",
    finalSub: "Agenda un diagnóstico de 15 minutos. Sin venta dura.",
  },
  en: {
    seoTitle: "B2B Strategy Advisory for founders | Ferova Agency",
    seoDesc: "1:1 advisory and monthly mentorship for B2B founders. Strategic diagnostics, AI roadmap and measurable growth.",
    eyebrow: "Mentorship & Advisory",
    h1: "Strategy Advisory for B2B founders",
    sub: "We run high-impact sessions to clarify direction, install AI and build a real growth system.",
    cta: "Book diagnostic",
    cta2: "Chat on WhatsApp",
    plans: [
      {
        icon: Calendar,
        name: "1:1 Advisory",
        price: 150,
        period: "once" as const,
        desc: "60-minute strategic session to unlock one key decision.",
        bullets: ["Pre-session diagnostic in 24h", "Recorded session + action notes", "30-day post-session plan"],
      },
      {
        icon: Repeat,
        name: "Monthly Mentorship",
        price: 500,
        period: "monthly" as const,
        desc: "Continuous support for founders who execute seriously.",
        bullets: ["Two 1:1 sessions per month", "Async WhatsApp support", "OKR & metrics reviews", "Access to private frameworks"],
        featured: true,
      },
    ],
    benefitsTitle: "What this advisory solves",
    benefits: [
      { icon: Target, t: "Actionable focus", d: "Leave every session with 3 concrete moves." },
      { icon: Compass, t: "Strategic map", d: "We connect product, marketing and sales into one system." },
      { icon: CheckCircle2, t: "Data-backed validation", d: "Decisions driven by metrics, not gut feeling." },
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Who is this advisory for?", a: "B2B founders with early traction who want to organize growth, install AI and stop improvising." },
      { q: "How is it different from an agency?", a: "Here we work with you on strategy. If you later need execution, our agency comes in as an upsell." },
      { q: "How is the mentorship billed?", a: "Month to month, no lock-in. The first payment is credited if you hire a monthly agency service." },
      { q: "Is there a guarantee?", a: "If you don't see value after the first session, we refund 100%, no questions asked." },
      { q: "Which languages do you work in?", a: "Spanish, English and Portuguese." },
    ],
    finalTitle: "Ready to make better decisions, faster",
    finalSub: "Book a 15-minute diagnostic. No hard sell.",
  },
  pt: {
    seoTitle: "Consultoria Estratégica B2B para fundadores | Ferova Agency",
    seoDesc: "Assessoria 1 a 1 e mentoria mensal para fundadores B2B. Diagnóstico estratégico, plano de IA e crescimento mensurável.",
    eyebrow: "Mentoria e Assessoria",
    h1: "Consultoria Estratégica para fundadores B2B",
    sub: "Trabalhamos com você em sessões de alto impacto para clarear direção, instalar IA e construir um sistema real de crescimento.",
    cta: "Agendar diagnóstico",
    cta2: "Falar no WhatsApp",
    plans: [
      {
        icon: Calendar,
        name: "Assessoria 1 a 1",
        price: 150,
        period: "once" as const,
        desc: "Sessão estratégica de 60 minutos para destravar uma decisão-chave.",
        bullets: ["Diagnóstico prévio em 24h", "Sessão gravada + ata acionável", "Plano de 30 dias pós-sessão"],
      },
      {
        icon: Repeat,
        name: "Mentoria Mensal",
        price: 500,
        period: "monthly" as const,
        desc: "Acompanhamento contínuo para fundadores que executam de verdade.",
        bullets: ["2 sessões 1 a 1 por mês", "Suporte assíncrono por WhatsApp", "Revisão de OKRs e métricas", "Acesso a frameworks privados"],
        featured: true,
      },
    ],
    benefitsTitle: "O que esta consultoria resolve",
    benefits: [
      { icon: Target, t: "Foco acionável", d: "Sai de cada sessão com 3 movimentos concretos." },
      { icon: Compass, t: "Mapa estratégico", d: "Conectamos produto, marketing e vendas em um único sistema." },
      { icon: CheckCircle2, t: "Validação com dados", d: "Decisões baseadas em métricas, não em intuição." },
    ],
    faqTitle: "Perguntas frequentes",
    faqs: [
      { q: "Para quem é esta consultoria?", a: "Para fundadores B2B com tração inicial que querem organizar o crescimento, instalar IA e parar de improvisar." },
      { q: "Como se diferencia de uma agência?", a: "Aqui trabalhamos com você na estratégia. Se depois precisar de execução, nossa agência entra como upsell." },
      { q: "Como é cobrada a mentoria?", a: "Mês a mês, sem fidelidade. O primeiro pagamento é descontado se contratar um serviço mensal da agência." },
      { q: "Existe garantia?", a: "Se após a primeira sessão você não vir valor, devolvemos 100%, sem perguntas." },
      { q: "Em quais idiomas trabalham?", a: "Espanhol, inglês e português." },
    ],
    finalTitle: "Pronto para tomar melhores decisões, mais rápido",
    finalSub: "Agende um diagnóstico de 15 minutos. Sem venda agressiva.",
  },
};

export default function ConsultoriaEstrategica({ lang = "es" }: Props) {
  const t = T[lang];
  const path =
    lang === "en" ? "/en/strategy-advisory" : lang === "pt" ? "/pt/consultoria-estrategica" : "/consultoria-estrategica";

  useEffect(() => {
    trackEvent("page_view", { page: "consultoria_estrategica", lang });
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {t.cta}
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-gold inline-flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> {t.cta2}
              </a>
            </div>
          </div>
        </section>

        {/* PLANES */}
        <section className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`glass-card p-7 md:p-8 flex flex-col ${
                    (plan as any).featured ? "border-gold/40 ring-1 ring-gold/20" : ""
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{plan.desc}</p>
                  <p className="text-3xl md:text-4xl font-bold text-gradient-gold mb-6">
                    {formatPrice(plan.price, lang, plan.period)}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {plan.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-gold/10 hover:border-gold/40 hover:text-gold transition-colors"
                  >
                    {t.cta}
                  </a>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* BENEFICIOS */}
        <section className="py-16 md:py-20 px-4 sm:px-6 bg-card/40 border-y border-border/40">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.benefitsTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.benefits.map(({ icon: Icon, t: bt, d }) => (
                <div key={bt} className="glass-card p-6">
                  <Icon className="w-6 h-6 text-gold mb-3" />
                  <h3 className="text-lg font-bold mb-2">{bt}</h3>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">{t.faqTitle}</h2>
            <Accordion type="single" collapsible className="w-full">
              {t.faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-20 px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.finalTitle}</h2>
            <p className="text-muted-foreground mb-8">{t.finalSub}</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> {t.cta}
            </a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
