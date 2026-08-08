import { useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, CheckCircle2, Compass, Calendar, Repeat, Target, Zap } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatPrice, type Lang } from "@/lib/pricing";
import { trackEvent } from "@/lib/analytics";

interface Props { lang?: Lang }

const WHATSAPP_URL = "https://wa.me/17865787671";

const T = {
  es: {
    seoTitle: "Mentoría y Asesoría para empresarios que venden | Ferova Agency",
    seoDesc: "Instalamos infraestructura tecnológica y operativa permanente para que tu equipo venda de forma autónoma y escalable. Sin maquillaje digital.",
    eyebrow: "Mentoría y Asesoría",
    h1: "Hecho para empresarios que quieren VENDER, no solo verse bien.",
    sub: "Las agencias tradicionales te cobran mensualidades eternas por «maquillaje digital» (diseños bonitos en redes sociales) que desaparecen en cuanto dejas de pagarles. Eso no es un activo; es un arriendo costoso. Nosotros instalamos infraestructura tecnológica y operativa permanente para que tu equipo interno venda de forma autónoma, escalable y sin jerga técnica.",
    cta: "Agendar diagnóstico",
    cta2: "Hablar por WhatsApp",
    plans: [
      {
        icon: Calendar,
        name: "Asesoría 1 a 1",
        price: 150,
        period: "once" as const,
        desc: "Una sesión, una decisión crítica destrabada.",
        bullets: [
          "Sesión estratégica de 60 minutos enfocada en destrabar una decisión crítica de crecimiento.",
          "Diagnóstico técnico previo de velocidad y lectura semántica de IA en 24 horas.",
          "Acceso permanente a la grabación de la sesión + Minuta Ejecutiva Accionable con 3 movimientos concretos.",
          "Plan estratégico simplificado para los próximos 30 días post-sesión.",
          "Pase de cortesía exclusivo a nuestro Newsletter Pro Semanal.",
        ],
      },
      {
        icon: Repeat,
        name: "Mentoría Mensual",
        price: 500,
        period: "monthly" as const,
        desc: "Infraestructura, acompañamiento y comunidad de alto nivel.",
        bullets: [
          "Acompañamiento continuo para fundadores y directores de operaciones que ejecutan a gran velocidad.",
          "2 sesiones de consultoría profunda 1-a-1 al mes (opción de sesión presencial por trimestre si estás en Bogotá).",
          "Soporte y auditoría asíncrona permanente a través de un canal exclusivo de WhatsApp.",
          "Despliegue de tu Portal de Cliente en Notion (Capa Frontend): un espacio blindado para centralizar tus prompts, grabaciones y OKRs operacionales.",
          "Acceso directo e inmediato a la Comunidad Privada «Infraestructura Pro» para hacer networking de alto nivel con empresarios de la CCB, Coomeva y EAN Impacta.",
        ],
        featured: true,
      },
    ],
    benefitsTitle: "Qué resuelve esta consultoría",
    benefits: [
      { icon: Target, t: "Foco accionable", d: "Sales de cada sesión con 3 movimientos concretos para mover el negocio esta misma semana." },
      { icon: Compass, t: "Mapa estratégico", d: "Conectamos producto, marketing y ventas en un solo sistema operativo." },
      { icon: CheckCircle2, t: "Validación con datos", d: "Decisiones basadas en métricas, no en intuición ni modas." },
    ],
    roiTitle: "El Retorno de tu Infraestructura (ROI Inmediato)",
    roiBody: "Si tu negocio gasta millones en un recurso humano para que ejecute tareas administrativas y de soporte mecánicas, la instalación de un solo flujo agéntico automatizado asumirá esas labores las 24/7 sin errores. Al liberar a tu personal para enfocarse en la conversión comercial directa, recuperas tu inversión desde los primeros meses.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Para quién es esta consultoría?", a: "Para empresarios y fundadores B2B que ya facturan y quieren dejar de pagar mensualidades por «maquillaje digital» para instalar infraestructura real que venda." },
      { q: "¿En qué se diferencia de una agencia tradicional?", a: "No te alquilamos diseños bonitos: instalamos sistemas, automatizaciones y procesos que tu equipo opera de forma autónoma. Activo, no arriendo." },
      { q: "¿Cómo se factura la mentoría?", a: "Mes a mes, sin permanencia. El primer pago se descuenta si contratas un servicio mensual de la agencia." },
      { q: "¿Hay garantía?", a: "Si tras la primera sesión no ves valor, devolvemos el 100% sin preguntas." },
      { q: "¿En qué idiomas trabajan?", a: "Español, inglés y portugués." },
    ],
    finalTitle: "Listo para construir un activo, no pagar un arriendo",
    finalSub: "Agenda un diagnóstico de 15 minutos. Sin venta dura, sin jerga técnica.",
  },
  en: {
    seoTitle: "Mentorship & Advisory for founders who sell | Ferova Agency",
    seoDesc: "We install permanent tech and ops infrastructure so your internal team sells autonomously and scales — without digital makeup.",
    eyebrow: "Mentorship & Advisory",
    h1: "Built for founders who want to SELL, not just look good.",
    sub: "Traditional agencies charge you endless monthly fees for «digital makeup» (pretty social media designs) that vanish the moment you stop paying. That's not an asset; it's an expensive rental. We install permanent tech and operational infrastructure so your internal team sells autonomously, scalable, and without technical jargon.",
    cta: "Book diagnostic",
    cta2: "Chat on WhatsApp",
    plans: [
      {
        icon: Calendar,
        name: "1:1 Advisory",
        price: 150,
        period: "once" as const,
        desc: "One session, one critical decision unlocked.",
        bullets: [
          "60-minute strategy session focused on unblocking one critical growth decision.",
          "Pre-session technical diagnostic: speed audit and AI semantic readability in 24 hours.",
          "Permanent access to the session recording + Executive Action Memo with 3 concrete moves.",
          "Simplified 30-day strategic plan after the session.",
          "Complimentary pass to our weekly Newsletter Pro.",
        ],
      },
      {
        icon: Repeat,
        name: "Monthly Mentorship",
        price: 500,
        period: "monthly" as const,
        desc: "Infrastructure, ongoing support, and a top-tier community.",
        bullets: [
          "Continuous support for founders and COOs who execute at high velocity.",
          "Two deep 1-on-1 consulting sessions per month (option of one in-person quarterly session if you are in Bogotá).",
          "Permanent async support and audits through an exclusive WhatsApp channel.",
          "Deployment of your Notion Client Portal (Frontend Layer): a hardened space to centralize prompts, recordings and operational OKRs.",
          "Immediate, direct access to the «Infraestructura Pro» private community to network with top-tier founders from CCB, Coomeva and EAN Impacta.",
        ],
        featured: true,
      },
    ],
    benefitsTitle: "What this advisory solves",
    benefits: [
      { icon: Target, t: "Actionable focus", d: "Leave every session with 3 concrete moves you can ship this week." },
      { icon: Compass, t: "Strategic map", d: "We connect product, marketing and sales into one operating system." },
      { icon: CheckCircle2, t: "Data-backed validation", d: "Decisions driven by metrics, not gut feeling or trends." },
    ],
    roiTitle: "Your Infrastructure ROI (Immediate Return)",
    roiBody: "If your business spends millions on headcount executing mechanical admin and support tasks, installing a single automated agentic flow will take those over 24/7 without errors. By freeing your people to focus on direct commercial conversion, you recover your investment within the first months.",
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Who is this advisory for?", a: "B2B founders and operators with revenue who want to stop renting «digital makeup» and install real infrastructure that sells." },
      { q: "How is it different from a traditional agency?", a: "We don't rent you pretty designs: we install systems, automations and processes your team operates autonomously. Asset, not rental." },
      { q: "How is the mentorship billed?", a: "Month to month, no lock-in. The first payment is credited if you hire a monthly agency service." },
      { q: "Is there a guarantee?", a: "If you don't see value after the first session, we refund 100%, no questions asked." },
      { q: "Which languages do you work in?", a: "Spanish, English and Portuguese." },
    ],
    finalTitle: "Ready to build an asset, not pay a rental",
    finalSub: "Book a 15-minute diagnostic. No hard sell, no technical jargon.",
  },
  pt: {
    seoTitle: "Mentoria e Assessoria para empresários que vendem | Ferova Agency",
    seoDesc: "Instalamos infraestrutura tecnológica e operacional permanente para sua equipe vender de forma autônoma e escalável. Sem maquiagem digital.",
    eyebrow: "Mentoria e Assessoria",
    h1: "Feito para empresários que querem VENDER, não só parecer bonitos.",
    sub: "Agências tradicionais cobram mensalidades eternas por «maquiagem digital» (designs bonitos em redes sociais) que somem assim que você para de pagar. Isso não é um ativo; é um aluguel caro. Nós instalamos infraestrutura tecnológica e operacional permanente para que sua equipe interna venda de forma autônoma, escalável e sem jargão técnico.",
    cta: "Agendar diagnóstico",
    cta2: "Falar no WhatsApp",
    plans: [
      {
        icon: Calendar,
        name: "Assessoria 1 a 1",
        price: 150,
        period: "once" as const,
        desc: "Uma sessão, uma decisão crítica destravada.",
        bullets: [
          "Sessão estratégica de 60 minutos focada em destravar uma decisão crítica de crescimento.",
          "Diagnóstico técnico prévio de velocidade e leitura semântica por IA em 24 horas.",
          "Acesso permanente à gravação da sessão + Ata Executiva Acionável com 3 movimentos concretos.",
          "Plano estratégico simplificado para os 30 dias seguintes à sessão.",
          "Passe de cortesia exclusivo à nossa Newsletter Pro Semanal.",
        ],
      },
      {
        icon: Repeat,
        name: "Mentoria Mensal",
        price: 500,
        period: "monthly" as const,
        desc: "Infraestrutura, acompanhamento e comunidade de alto nível.",
        bullets: [
          "Acompanhamento contínuo para fundadores e diretores de operações que executam em alta velocidade.",
          "2 sessões de consultoria profunda 1-a-1 por mês (opção de sessão presencial por trimestre se estiver em Bogotá).",
          "Suporte e auditoria assíncrona permanente por um canal exclusivo de WhatsApp.",
          "Implantação do seu Portal de Cliente no Notion (Camada Frontend): um espaço blindado para centralizar prompts, gravações e OKRs operacionais.",
          "Acesso direto e imediato à Comunidade Privada «Infraestrutura Pro» para fazer networking de alto nível com empresários da CCB, Coomeva e EAN Impacta.",
        ],
        featured: true,
      },
    ],
    benefitsTitle: "O que esta consultoria resolve",
    benefits: [
      { icon: Target, t: "Foco acionável", d: "Sai de cada sessão com 3 movimentos concretos para aplicar nesta semana." },
      { icon: Compass, t: "Mapa estratégico", d: "Conectamos produto, marketing e vendas em um único sistema operacional." },
      { icon: CheckCircle2, t: "Validação com dados", d: "Decisões baseadas em métricas, não em intuição ou modismos." },
    ],
    roiTitle: "O Retorno da sua Infraestrutura (ROI Imediato)",
    roiBody: "Se seu negócio gasta milhões em recursos humanos executando tarefas administrativas e de suporte mecânicas, a instalação de um único fluxo agêntico automatizado assume essas funções 24/7 sem erros. Ao liberar sua equipe para focar na conversão comercial direta, você recupera o investimento já nos primeiros meses.",
    faqTitle: "Perguntas frequentes",
    faqs: [
      { q: "Para quem é esta consultoria?", a: "Para empresários e fundadores B2B que já faturam e querem parar de pagar mensalidades por «maquiagem digital» para instalar infraestrutura real que vende." },
      { q: "Como se diferencia de uma agência tradicional?", a: "Não alugamos designs bonitos: instalamos sistemas, automações e processos que sua equipe opera de forma autônoma. Ativo, não aluguel." },
      { q: "Como é cobrada a mentoria?", a: "Mês a mês, sem fidelidade. O primeiro pagamento é descontado se contratar um serviço mensal da agência." },
      { q: "Existe garantia?", a: "Se após a primeira sessão você não vir valor, devolvemos 100%, sem perguntas." },
      { q: "Em quais idiomas trabalham?", a: "Espanhol, inglês e português." },
    ],
    finalTitle: "Pronto para construir um ativo, não pagar um aluguel",
    finalSub: "Agende um diagnóstico de 15 minutos. Sem venda agressiva, sem jargão técnico.",
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-white mb-6">
              {t.h1}
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-3xl mx-auto leading-relaxed mb-8">
              {t.sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 shadow-[0_8px_28px_-8px_hsl(45,86%,38%/0.7)] hover:scale-[1.03] active:scale-95 transition-transform"
              >
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
                      <li key={b} className="flex items-start gap-2 text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold mt-auto inline-flex items-center justify-center gap-2 shadow-[0_8px_28px_-8px_hsl(45,86%,38%/0.7)] hover:scale-[1.02] active:scale-95 transition-transform"
                  >
                    <Calendar className="w-4 h-4" /> {t.cta}
                  </a>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* BENEFICIOS + ROI */}
        <section className="py-16 md:py-20 px-4 sm:px-6 bg-card/40 border-y border-border/40">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.benefitsTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {t.benefits.map(({ icon: Icon, t: bt, d }) => (
                <div key={bt} className="glass-card p-6">
                  <Icon className="w-6 h-6 text-gold mb-3" />
                  <h3 className="text-lg font-bold mb-2">{bt}</h3>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>

            {/* Bloque ROI destacado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl p-7 md:p-10 border border-gold/40"
              style={{
                background:
                  "linear-gradient(135deg, hsl(45,86%,12%) 0%, hsl(243,31%,12%) 60%, hsl(356,68%,14%) 100%)",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{t.roiTitle}</h3>
                  <p className="text-white/85 leading-relaxed text-sm md:text-base">{t.roiBody}</p>
                </div>
              </div>
            </motion.div>
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
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 shadow-[0_8px_28px_-8px_hsl(45,86%,38%/0.7)] hover:scale-[1.03] active:scale-95 transition-transform"
            >
              <Calendar className="w-4 h-4" /> {t.cta}
            </a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
