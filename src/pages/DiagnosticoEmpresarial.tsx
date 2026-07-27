import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { PageTransition } from "@/components/ui/motion";
import {
  Search, Users, ShoppingCart, Workflow, Compass, HelpCircle,
  ArrowRight, ArrowLeft, CheckCircle2, Send, MessageCircle, Sparkles,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_URL } from "@/content/home";

type Lang = "es" | "en" | "pt";
type Category = "visibilidad" | "adquisicion" | "conversion" | "automatizacion" | "estrategia" | "insuficiente";

interface DiagnosticoProps { lang?: Lang }

/** Destinos recomendados por categoría (rutas reales existentes). */
const RESULT_HREF: Record<Lang, Record<Category, string>> = {
  es: {
    visibilidad: "/servicios/seo-ecommerce",
    adquisicion: "/servicios/asesorias-marketing",
    conversion: "/servicios/diseno-web",
    automatizacion: "/capacitacion-ia",
    estrategia: "/consultoria-estrategica",
    insuficiente: "/contacto",
  },
  en: {
    visibilidad: "/en/services/ecommerce-seo",
    adquisicion: "/en/services/marketing-consulting",
    conversion: "/en/services/web-design",
    automatizacion: "/en/ai-training",
    estrategia: "/en/strategy-advisory",
    insuficiente: "/en/contact",
  },
  pt: {
    visibilidad: "/pt/seo-ecommerce",
    adquisicion: "/pt/consultorias",
    conversion: "/pt/design-web",
    automatizacion: "/pt/treinamento-ia",
    estrategia: "/pt/consultoria-estrategica",
    insuficiente: "/pt/contato",
  },
};

interface Opt { label: string; category?: Category }
interface Q { q: string; options: Opt[] }
interface ResultDef { title: string; insight: string; recommendation: string; cta: string }

interface Content {
  seoTitle: string; seoDesc: string;
  badge: string; h1: string; sub: string; bullets: string[]; start: string;
  stepOf: (n: number, t: number) => string;
  questions: Q[];
  back: string;
  resultLead: string;
  results: Record<Category, ResultDef>;
  gateTitle: string; gateSub: string;
  f: { name: string; company: string; email: string; whatsapp: string; website: string; objective: string; consent: string; consentLink: string; submit: string; sending: string };
  thanksTitle: string; thanksSub: string; book: string; waIntro: string;
  privacyHref: string;
}

const C: Record<Lang, Content> = {
  es: {
    seoTitle: "Diagnóstico empresarial gratis — ¿qué frena tu empresa? | Ferova",
    seoDesc: "Responde 4 preguntas y descubre en 2 minutos qué está frenando tu empresa: visibilidad, conversión, adquisición, procesos o estrategia. Diagnóstico preliminar gratuito.",
    badge: "Diagnóstico · 2 minutos · Gratis",
    h1: "¿Qué está frenando tu empresa?",
    sub: "Responde 4 preguntas y te damos un diagnóstico preliminar con el problema de fondo y el siguiente paso concreto. Sin registrarte para verlo.",
    bullets: ["4 preguntas, 2 minutos", "Resultado antes de pedirte datos", "Recomendación honesta, no un pitch"],
    start: "Empezar diagnóstico",
    stepOf: (n, t) => `Paso ${n} de ${t}`,
    questions: [
      {
        q: "¿Qué quieres mejorar primero?",
        options: [
          { label: "Que me encuentren en Google y en la IA", category: "visibilidad" },
          { label: "Conseguir más clientes y oportunidades", category: "adquisicion" },
          { label: "Que mi página convierta visitas en ventas", category: "conversion" },
          { label: "Ahorrar tiempo y automatizar tareas", category: "automatizacion" },
          { label: "Ordenar la estrategia y saber qué priorizar", category: "estrategia" },
          { label: "No estoy seguro / son varias cosas", category: "insuficiente" },
        ],
      },
      {
        q: "¿Qué está pasando actualmente?",
        options: [
          { label: "Casi no llegan clientes nuevos" },
          { label: "Llegan visitas pero no compran" },
          { label: "El negocio depende demasiado de mí" },
          { label: "Crecemos, pero con mucho esfuerzo y desorden" },
        ],
      },
      {
        q: "¿Qué has intentado hasta ahora?",
        options: [
          { label: "Publicidad pagada (Google/Meta)" },
          { label: "Redes sociales y contenido" },
          { label: "Rehacer o mejorar la web" },
          { label: "Poco o nada estructurado" },
        ],
      },
      {
        q: "¿Qué impacto tiene esto en tu negocio?",
        options: [
          { label: "Crítico: frena el crecimiento hoy" },
          { label: "Alto: perdemos oportunidades cada mes" },
          { label: "Medio: podríamos ir mucho mejor" },
          { label: "Quiero adelantarme antes de que sea problema" },
        ],
      },
    ],
    back: "Atrás",
    resultLead: "Tu diagnóstico preliminar",
    results: {
      visibilidad: {
        title: "Problema de visibilidad",
        insight: "Tu principal freno es que tu marca no aparece donde tu comprador busca: ni en Google ni en las respuestas de la IA. Sin visibilidad, todo lo demás rinde por debajo de su potencial.",
        recommendation: "El camino más corto es una base de SEO + GEO que te haga aparecer en Google y ser citado por ChatGPT, Perplexity y Gemini.",
        cta: "Ver SEO + GEO para ecommerce",
      },
      adquisicion: {
        title: "Problema de adquisición",
        insight: "Tienes con qué vender, pero el flujo de clientes nuevos es impredecible. Falta un sistema de adquisición constante en vez de depender de esfuerzos sueltos.",
        recommendation: "Conviene una asesoría estratégica que defina tus canales y un plan de adquisición medible, no más tácticas aisladas.",
        cta: "Ver asesorías de marketing",
      },
      conversion: {
        title: "Problema de conversión",
        insight: "El tráfico llega, pero la web no cierra la venta. Normalmente es velocidad, claridad del mensaje o fricción en el proceso de compra.",
        recommendation: "Una web app rápida y diseñada para convertir suele mover la aguja más que traer más tráfico.",
        cta: "Ver diseño web que convierte",
      },
      automatizacion: {
        title: "Problema de procesos y automatización",
        insight: "El negocio depende demasiado de tareas manuales y de ti. Eso limita el crecimiento y consume el tiempo que deberías dedicar a estrategia.",
        recommendation: "Automatizar lo repetitivo con IA y capacitar a tu equipo libera horas y hace el crecimiento sostenible.",
        cta: "Ver capacitación e IA aplicada",
      },
      estrategia: {
        title: "Problema de estrategia",
        insight: "El problema no es una sola táctica: es la falta de un orden claro de qué resolver primero. Sin eso, cada esfuerzo dispersa recursos.",
        recommendation: "Una consultoría estratégica define el diagnóstico, la prioridad y el plan antes de invertir en ejecución.",
        cta: "Ver consultoría estratégica",
      },
      insuficiente: {
        title: "Necesitamos entender mejor tu caso",
        insight: "Tus respuestas apuntan a varios frentes a la vez, algo muy común. Aquí lo valioso es una conversación corta para separar el síntoma del problema de fondo.",
        recommendation: "Agendemos una conversación de diagnóstico: sin compromiso, para identificar qué resolver primero.",
        cta: "Hablar con Ferova",
      },
    },
    gateTitle: "Recibe tu diagnóstico completo y agenda una conversación",
    gateSub: "Te enviamos el análisis detallado y coordinamos una llamada de diagnóstico sin costo. Tus datos solo se usan para contactarte.",
    f: { name: "Nombre", company: "Empresa", email: "Email", whatsapp: "WhatsApp", website: "Sitio web (opcional)", objective: "Tu principal objetivo", consent: "Autorizo el tratamiento de mis datos según la", consentLink: "Política de Privacidad", submit: "Recibir diagnóstico y agendar", sending: "Enviando..." },
    thanksTitle: "¡Listo! Tenemos tu diagnóstico",
    thanksSub: "Revisaremos tu caso y te contactaremos. Si quieres adelantar, envíanos el diagnóstico por WhatsApp y coordinamos la llamada ahora mismo.",
    book: "Enviar por WhatsApp y agendar",
    waIntro: "Hola Ferova, hice el diagnóstico empresarial y este es mi resultado:",
    privacyHref: "/privacidad",
  },
  en: {
    seoTitle: "Free business diagnosis — what's holding you back? | Ferova",
    seoDesc: "Answer 4 questions and discover in 2 minutes what's holding your business back: visibility, conversion, acquisition, processes or strategy. Free preliminary diagnosis.",
    badge: "Diagnosis · 2 minutes · Free",
    h1: "What's holding your business back?",
    sub: "Answer 4 questions and get a preliminary diagnosis with the underlying problem and a concrete next step. No sign-up required to see it.",
    bullets: ["4 questions, 2 minutes", "Result before we ask for details", "Honest recommendation, not a pitch"],
    start: "Start diagnosis",
    stepOf: (n, t) => `Step ${n} of ${t}`,
    questions: [
      {
        q: "What do you want to improve first?",
        options: [
          { label: "Get found on Google and in AI", category: "visibilidad" },
          { label: "Get more clients and opportunities", category: "adquisicion" },
          { label: "Make my site turn visits into sales", category: "conversion" },
          { label: "Save time and automate tasks", category: "automatizacion" },
          { label: "Sort out strategy and priorities", category: "estrategia" },
          { label: "Not sure / it's several things", category: "insuficiente" },
        ],
      },
      {
        q: "What's happening right now?",
        options: [
          { label: "Barely any new clients come in" },
          { label: "Visits come but they don't buy" },
          { label: "The business depends too much on me" },
          { label: "We grow, but with a lot of effort and chaos" },
        ],
      },
      {
        q: "What have you tried so far?",
        options: [
          { label: "Paid ads (Google/Meta)" },
          { label: "Social media and content" },
          { label: "Rebuilding or improving the website" },
          { label: "Little or nothing structured" },
        ],
      },
      {
        q: "What impact does this have on your business?",
        options: [
          { label: "Critical: it's blocking growth today" },
          { label: "High: we lose opportunities every month" },
          { label: "Medium: we could do much better" },
          { label: "I want to get ahead before it's a problem" },
        ],
      },
    ],
    back: "Back",
    resultLead: "Your preliminary diagnosis",
    results: {
      visibilidad: { title: "Visibility problem", insight: "Your main blocker is that your brand doesn't show up where your buyer searches: not on Google, not in AI answers. Without visibility, everything else underperforms.", recommendation: "The shortest path is an SEO + GEO foundation that gets you on Google and cited by ChatGPT, Perplexity and Gemini.", cta: "See SEO + GEO for e-commerce" },
      adquisicion: { title: "Acquisition problem", insight: "You have what it takes to sell, but the flow of new clients is unpredictable. You're missing a steady acquisition system instead of one-off efforts.", recommendation: "A strategic advisory to define your channels and a measurable acquisition plan beats more isolated tactics.", cta: "See marketing consulting" },
      conversion: { title: "Conversion problem", insight: "Traffic arrives but the site doesn't close the sale. Usually it's speed, message clarity or friction in the buying process.", recommendation: "A fast web app designed to convert usually moves the needle more than more traffic.", cta: "See web design that converts" },
      automatizacion: { title: "Process & automation problem", insight: "The business depends too much on manual tasks and on you. That caps growth and eats the time you should spend on strategy.", recommendation: "Automating the repetitive with AI and training your team frees hours and makes growth sustainable.", cta: "See training & applied AI" },
      estrategia: { title: "Strategy problem", insight: "The problem isn't a single tactic: it's the lack of a clear order of what to solve first. Without it, every effort scatters resources.", recommendation: "A strategic advisory defines the diagnosis, the priority and the plan before investing in execution.", cta: "See strategic advisory" },
      insuficiente: { title: "We need to understand your case better", insight: "Your answers point to several fronts at once, which is very common. The valuable move here is a short conversation to separate the symptom from the root problem.", recommendation: "Let's book a diagnosis call: no commitment, to identify what to solve first.", cta: "Talk to Ferova" },
    },
    gateTitle: "Get your full diagnosis and book a conversation",
    gateSub: "We'll send the detailed analysis and set up a free diagnosis call. Your data is only used to contact you.",
    f: { name: "Name", company: "Company", email: "Email", whatsapp: "WhatsApp", website: "Website (optional)", objective: "Your main goal", consent: "I authorize the processing of my data per the", consentLink: "Privacy Policy", submit: "Get diagnosis and book", sending: "Sending..." },
    thanksTitle: "Done! We have your diagnosis",
    thanksSub: "We'll review your case and reach out. To move faster, send us the diagnosis on WhatsApp and we'll set up the call right now.",
    book: "Send on WhatsApp and book",
    waIntro: "Hi Ferova, I did the business diagnosis and this is my result:",
    privacyHref: "/en/privacy",
  },
  pt: {
    seoTitle: "Diagnóstico empresarial grátis — o que trava você? | Ferova",
    seoDesc: "Responda 4 perguntas e descubra em 2 minutos o que está travando a sua empresa: visibilidade, conversão, aquisição, processos ou estratégia. Diagnóstico preliminar grátis.",
    badge: "Diagnóstico · 2 minutos · Grátis",
    h1: "O que está travando a sua empresa?",
    sub: "Responda 4 perguntas e receba um diagnóstico preliminar com o problema de fundo e o próximo passo concreto. Sem cadastro para ver.",
    bullets: ["4 perguntas, 2 minutos", "Resultado antes de pedir seus dados", "Recomendação honesta, não um pitch"],
    start: "Começar diagnóstico",
    stepOf: (n, t) => `Passo ${n} de ${t}`,
    questions: [
      {
        q: "O que você quer melhorar primeiro?",
        options: [
          { label: "Ser encontrado no Google e na IA", category: "visibilidad" },
          { label: "Conseguir mais clientes e oportunidades", category: "adquisicion" },
          { label: "Que meu site transforme visitas em vendas", category: "conversion" },
          { label: "Economizar tempo e automatizar tarefas", category: "automatizacion" },
          { label: "Organizar a estratégia e as prioridades", category: "estrategia" },
          { label: "Não tenho certeza / são várias coisas", category: "insuficiente" },
        ],
      },
      {
        q: "O que está acontecendo agora?",
        options: [
          { label: "Quase não chegam clientes novos" },
          { label: "Chegam visitas mas não compram" },
          { label: "O negócio depende demais de mim" },
          { label: "Crescemos, mas com muito esforço e desordem" },
        ],
      },
      {
        q: "O que você já tentou até agora?",
        options: [
          { label: "Anúncios pagos (Google/Meta)" },
          { label: "Redes sociais e conteúdo" },
          { label: "Refazer ou melhorar o site" },
          { label: "Pouco ou nada estruturado" },
        ],
      },
      {
        q: "Qual o impacto disso no seu negócio?",
        options: [
          { label: "Crítico: trava o crescimento hoje" },
          { label: "Alto: perdemos oportunidades todo mês" },
          { label: "Médio: poderíamos ir muito melhor" },
          { label: "Quero me antecipar antes que vire problema" },
        ],
      },
    ],
    back: "Voltar",
    resultLead: "Seu diagnóstico preliminar",
    results: {
      visibilidad: { title: "Problema de visibilidade", insight: "Seu principal freio é que sua marca não aparece onde seu comprador busca: nem no Google nem nas respostas da IA. Sem visibilidade, todo o resto rende abaixo do potencial.", recommendation: "O caminho mais curto é uma base de SEO + GEO que faça você aparecer no Google e ser citado por ChatGPT, Perplexity e Gemini.", cta: "Ver SEO + GEO para e-commerce" },
      adquisicion: { title: "Problema de aquisição", insight: "Você tem com o que vender, mas o fluxo de clientes novos é imprevisível. Falta um sistema de aquisição constante em vez de esforços soltos.", recommendation: "Vale uma consultoria estratégica que defina seus canais e um plano de aquisição mensurável, não mais táticas isoladas.", cta: "Ver consultorias de marketing" },
      conversion: { title: "Problema de conversão", insight: "O tráfego chega, mas o site não fecha a venda. Normalmente é velocidade, clareza da mensagem ou fricção no processo de compra.", recommendation: "Um site rápido e desenhado para converter costuma mover mais o ponteiro do que trazer mais tráfego.", cta: "Ver design web que converte" },
      automatizacion: { title: "Problema de processos e automação", insight: "O negócio depende demais de tarefas manuais e de você. Isso limita o crescimento e consome o tempo que deveria ir para a estratégia.", recommendation: "Automatizar o repetitivo com IA e treinar sua equipe libera horas e torna o crescimento sustentável.", cta: "Ver treinamento e IA aplicada" },
      estrategia: { title: "Problema de estratégia", insight: "O problema não é uma única tática: é a falta de uma ordem clara do que resolver primeiro. Sem isso, cada esforço dispersa recursos.", recommendation: "Uma consultoria estratégica define o diagnóstico, a prioridade e o plano antes de investir em execução.", cta: "Ver consultoria estratégica" },
      insuficiente: { title: "Precisamos entender melhor o seu caso", insight: "Suas respostas apontam para vários frentes ao mesmo tempo, algo muito comum. O valioso aqui é uma conversa curta para separar o sintoma do problema de fundo.", recommendation: "Vamos agendar uma conversa de diagnóstico: sem compromisso, para identificar o que resolver primeiro.", cta: "Falar com a Ferova" },
    },
    gateTitle: "Receba seu diagnóstico completo e agende uma conversa",
    gateSub: "Enviamos a análise detalhada e marcamos uma chamada de diagnóstico sem custo. Seus dados só são usados para contato.",
    f: { name: "Nome", company: "Empresa", email: "Email", whatsapp: "WhatsApp", website: "Site (opcional)", objective: "Seu principal objetivo", consent: "Autorizo o tratamento dos meus dados conforme a", consentLink: "Política de Privacidade", submit: "Receber diagnóstico e agendar", sending: "Enviando..." },
    thanksTitle: "Pronto! Temos seu diagnóstico",
    thanksSub: "Vamos revisar seu caso e entrar em contato. Para adiantar, envie o diagnóstico pelo WhatsApp e marcamos a chamada agora.",
    book: "Enviar pelo WhatsApp e agendar",
    waIntro: "Olá Ferova, fiz o diagnóstico empresarial e este é o meu resultado:",
    privacyHref: "/pt/privacidade",
  },
};

const Q_ICONS = [Compass, Search, Workflow, Users];

const DiagnosticoEmpresarial = ({ lang = "es" }: DiagnosticoProps) => {
  const t = C[lang];
  const total = t.questions.length;

  // step: 0 intro · 1..total preguntas · total+1 resultado · total+2 form · total+3 gracias
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<Category>("insuficiente");
  const [answers, setAnswers] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", company: "", email: "", whatsapp: "", website: "", objective: "", consent: false });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const seoPath = lang === "en" ? "/en/solutions/business-diagnosis" : lang === "pt" ? "/pt/solucoes/diagnostico-empresarial" : "/soluciones/diagnostico-empresarial";
  const breadcrumbs = [
    { name: lang === "es" ? "Inicio" : lang === "pt" ? "Início" : "Home", path: lang === "es" ? "/" : `/${lang}` },
    { name: lang === "es" ? "Soluciones" : lang === "pt" ? "Soluções" : "Solutions", path: lang === "en" ? "/en/solutions" : lang === "pt" ? "/pt/solucoes" : "/soluciones" },
    { name: lang === "es" ? "Diagnóstico" : lang === "pt" ? "Diagnóstico" : "Diagnosis", path: seoPath },
  ];

  const start = () => { trackEvent("diagnostic_started", { language: lang }); setStep(1); };

  const answer = (qIndex: number, opt: Opt) => {
    const next = [...answers];
    next[qIndex] = opt.label;
    setAnswers(next);
    if (qIndex === 0 && opt.category) setCategory(opt.category);
    if (qIndex + 1 < total) {
      setStep(qIndex + 2);
    } else {
      trackEvent("diagnostic_completed", { language: lang, category: opt.category ?? category });
      setStep(total + 1);
    }
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const buildWaMessage = () => {
    const r = t.results[category];
    const lines = [
      t.waIntro,
      `• ${r.title}`,
      ...answers.map((a, i) => `• ${t.questions[i].q} → ${a}`),
      form.company ? `• ${t.f.company}: ${form.company}` : "",
      form.website ? `• ${t.f.website}: ${form.website}` : "",
      form.objective ? `• ${t.f.objective}: ${form.objective}` : "",
      form.name ? `• ${t.f.name}: ${form.name}` : "",
    ].filter(Boolean);
    return `${WHATSAPP_URL}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.consent) return;
    setSending(true);
    try {
      // Registro fiable en Brevo con atributos seguros (LANG ya existe en la
      // cuenta). El detalle completo del diagnóstico viaja por WhatsApp para no
      // perderse si un atributo custom no está definido en Brevo.
      await supabase.functions.invoke("brevo-sync", {
        body: { email: form.email.trim(), name: form.name.trim(), source: "diagnostico-empresarial", attributes: { LANG: lang } },
      });
    } catch {
      /* no bloquear al usuario si Brevo falla: el lead sigue por WhatsApp */
    }
    trackEvent("lead_submitted", { source: "diagnostico", category, language: lang });
    setSending(false);
    setStep(total + 3);
  };

  const inputCls = "w-full px-4 py-3 rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all border border-border/50 bg-background";
  const progressPct = Math.round((Math.min(step, total) / total) * 100);

  return (
    <PageTransition>
      <SEO title={t.seoTitle} description={t.seoDesc} path={seoPath} lang={lang} breadcrumbs={breadcrumbs} noindex={false} />
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-14 md:py-20 relative grid-pattern min-h-[70vh]">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 20%, hsla(45, 86%, 40%, 0.07), transparent 60%)" }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">

            {/* Barra de progreso durante el quiz */}
            {step >= 1 && step <= total && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
                  <span>{t.stepOf(step, total)}</span>
                  <span>{progressPct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
                  <div className="h-full bg-gold transition-all duration-300" style={{ width: `${progressPct}%` }} />
                </div>
              </div>
            )}

            {/* Intro */}
            {step === 0 && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium bg-gold/10 text-gold border border-gold/30">
                  <Sparkles className="w-3.5 h-3.5" /> {t.badge}
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{t.h1}</h1>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">{t.sub}</p>
                <ul className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                  {t.bullets.map((b) => (
                    <li key={b} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-gold" /> {b}
                    </li>
                  ))}
                </ul>
                <button onClick={start} className="btn-gold inline-flex items-center gap-2">
                  {t.start} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Preguntas */}
            {step >= 1 && step <= total && (() => {
              const qi = step - 1;
              const question = t.questions[qi];
              const Icon = Q_ICONS[qi] ?? Compass;
              return (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-gold/10 text-gold shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold">{question.q}</h2>
                  </div>
                  <div className="grid gap-3">
                    {question.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => answer(qi, opt)}
                        className="glass-card p-4 md:p-5 text-left flex items-center justify-between gap-4 group hover:border-gold/40 transition-all"
                      >
                        <span className="text-sm md:text-base text-foreground font-medium">{opt.label}</span>
                        <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </button>
                    ))}
                  </div>
                  {step > 1 && (
                    <button onClick={goBack} className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                      <ArrowLeft className="w-4 h-4" /> {t.back}
                    </button>
                  )}
                </div>
              );
            })()}

            {/* Resultado preliminar (valor antes de pedir datos) */}
            {step === total + 1 && (() => {
              const r = t.results[category];
              return (
                <div>
                  <p className="text-sm text-gold font-semibold mb-2 text-center">{t.resultLead}</p>
                  <div className="glass-card p-7 md:p-9 gold-glow">
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">{r.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">{r.insight}</p>
                    <p className="text-foreground leading-relaxed mb-6"><strong>{r.recommendation}</strong></p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to={RESULT_HREF[lang][category]} onClick={() => trackEvent("cta_clicked", { source: "diagnostico_result", label: "ver_recomendacion", category, language: lang })} className="btn-outline-gold inline-flex items-center justify-center gap-2">
                        {r.cta} <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button onClick={() => setStep(total + 2)} className="btn-gold inline-flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4" /> {lang === "es" ? "Diagnóstico completo + agendar" : lang === "pt" ? "Diagnóstico completo + agendar" : "Full diagnosis + book"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Captura de lead */}
            {step === total + 2 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">{t.gateTitle}</h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">{t.gateSub}</p>
                </div>
                <form onSubmit={submit} className="glass-card p-7 md:p-9 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input required placeholder={t.f.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                    <input required placeholder={t.f.company} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputCls} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input required type="email" placeholder={t.f.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
                    <input required placeholder={t.f.whatsapp} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className={inputCls} />
                  </div>
                  <input placeholder={t.f.website} value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inputCls} />
                  <input required placeholder={t.f.objective} value={form.objective} onChange={(e) => setForm({ ...form, objective: e.target.value })} className={inputCls} />
                  <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
                    <input type="checkbox" required checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 rounded border-border" />
                    <span>{t.f.consent}{" "}<Link to={t.privacyHref} className="text-gold underline underline-offset-2">{t.f.consentLink}</Link>.</span>
                  </label>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <button type="submit" disabled={sending} className="btn-gold w-full !py-4 flex items-center justify-center gap-2 disabled:opacity-60">
                    <Send className="w-4 h-4" /> {sending ? t.f.sending : t.f.submit}
                  </button>
                </form>
              </div>
            )}

            {/* Gracias + agendar por WhatsApp */}
            {step === total + 3 && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">{t.thanksTitle}</h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">{t.thanksSub}</p>
                <a
                  href={buildWaMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("meeting_clicked", { source: "diagnostico", category, language: lang })}
                  className="btn-gold inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" /> {t.book}
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </PageTransition>
  );
};

export default DiagnosticoEmpresarial;
