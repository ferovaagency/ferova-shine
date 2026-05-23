import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Bot, Zap, TrendingUp, Clock, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { trackEvent } from '@/lib/analytics';

interface Props { lang?: 'es' | 'en' | 'pt' }

const copyMap = {
  es: {
    title: 'WhatsApp IA Bot que vende por ti 24/7 — Ferova Agency',
    desc: 'Bot de WhatsApp con IA que responde, califica leads y agenda ventas mientras duermes. Implementación en 7 días.',
    eyebrow: 'NUEVO · WhatsApp + IA',
    h1: 'Tu vendedor estrella nunca duerme. Vende por WhatsApp con IA 24/7.',
    sub: 'Implementamos un bot conversacional con IA en tu WhatsApp Business que responde al instante, califica leads, agenda llamadas y cierra ventas mientras tú descansas.',
    cta1: 'Quiero mi bot ahora',
    cta2: 'Ver demo',
    price: 'Desde USD $100/mes',
    metrics: [
      { v: '< 5s', l: 'Tiempo de respuesta' },
      { v: '24/7', l: 'Atención sin pausa' },
      { v: '+38%', l: 'Conversión promedio' },
      { v: '7 días', l: 'Implementación' },
    ],
    stepsTitle: 'Cómo funciona',
    steps: [
      { t: '1. Diagnóstico', d: 'Analizamos tus conversaciones y diseñamos el flujo de venta ideal.' },
      { t: '2. Entrenamiento', d: 'Conectamos la IA a tu catálogo, FAQs y proceso comercial.' },
      { t: '3. Lanzamiento', d: 'Activamos el bot en tu WhatsApp Business y monitoreamos resultados.' },
    ],
    includesTitle: 'Qué incluye',
    includes: [
      'Bot con IA en español, inglés o portugués',
      'Integración con WhatsApp Business API oficial',
      'Calificación automática de leads',
      'Agendamiento de citas conectado a tu calendario',
      'Reportes mensuales de conversaciones y ventas',
      'Soporte y ajustes continuos',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Funciona con mi WhatsApp actual?', a: 'Sí. Usamos la API oficial de WhatsApp Business, sin riesgo de bloqueo.' },
      { q: '¿La IA suena natural?', a: 'Entrenamos el modelo con tu tono de marca. Los usuarios no notan que es un bot.' },
      { q: '¿Qué pasa si la IA no sabe responder?', a: 'Escala automáticamente la conversación a un humano de tu equipo.' },
      { q: '¿Necesito permanencia?', a: 'No. Mes a mes. Si no ves resultados, lo cancelas cuando quieras.' },
    ],
    finalCta: 'Listo para vender en automático',
    finalSub: 'Hablemos por WhatsApp y diseñamos tu bot esta misma semana.',
  },
  en: {
    title: 'AI WhatsApp Bot that sells for you 24/7 — Ferova Agency',
    desc: 'AI-powered WhatsApp bot that replies, qualifies leads and books sales while you sleep. Live in 7 days.',
    eyebrow: 'NEW · WhatsApp + AI',
    h1: 'Your top salesperson never sleeps. Sell on WhatsApp with AI 24/7.',
    sub: 'We deploy a conversational AI bot on your WhatsApp Business that replies instantly, qualifies leads, books calls and closes sales while you rest.',
    cta1: 'Get my bot now',
    cta2: 'See demo',
    price: 'From USD $100/month',
    metrics: [
      { v: '< 5s', l: 'Response time' },
      { v: '24/7', l: 'Always on' },
      { v: '+38%', l: 'Avg. conversion lift' },
      { v: '7 days', l: 'Go-live' },
    ],
    stepsTitle: 'How it works',
    steps: [
      { t: '1. Diagnosis', d: 'We analyze your conversations and design the ideal sales flow.' },
      { t: '2. Training', d: 'We connect the AI to your catalog, FAQs and commercial process.' },
      { t: '3. Launch', d: 'We activate the bot on your WhatsApp Business and monitor results.' },
    ],
    includesTitle: 'What is included',
    includes: [
      'AI bot in Spanish, English or Portuguese',
      'Official WhatsApp Business API integration',
      'Automatic lead qualification',
      'Appointment booking synced to your calendar',
      'Monthly conversation and sales reports',
      'Continuous support and tuning',
    ],
    faqTitle: 'FAQ',
    faqs: [
      { q: 'Does it work with my current WhatsApp?', a: 'Yes. We use the official WhatsApp Business API, no ban risk.' },
      { q: 'Does the AI sound natural?', a: 'We train the model with your brand tone. Users will not notice it is a bot.' },
      { q: 'What if the AI cannot answer?', a: 'It automatically escalates the conversation to a human on your team.' },
      { q: 'Is there a long-term contract?', a: 'No. Month to month. Cancel anytime if you do not see results.' },
    ],
    finalCta: 'Ready to sell on autopilot',
    finalSub: 'Let us chat on WhatsApp and design your bot this week.',
  },
  pt: {
    title: 'Bot de WhatsApp com IA que vende 24/7 — Ferova Agency',
    desc: 'Bot de WhatsApp com IA que responde, qualifica leads e agenda vendas enquanto você dorme. No ar em 7 dias.',
    eyebrow: 'NOVO · WhatsApp + IA',
    h1: 'Seu melhor vendedor nunca dorme. Venda no WhatsApp com IA 24/7.',
    sub: 'Implantamos um bot conversacional com IA no seu WhatsApp Business que responde na hora, qualifica leads, agenda calls e fecha vendas enquanto você descansa.',
    cta1: 'Quero meu bot agora',
    cta2: 'Ver demo',
    price: 'A partir de USD $100/mês',
    metrics: [
      { v: '< 5s', l: 'Tempo de resposta' },
      { v: '24/7', l: 'Sempre ativo' },
      { v: '+38%', l: 'Conversão média' },
      { v: '7 dias', l: 'Implantação' },
    ],
    stepsTitle: 'Como funciona',
    steps: [
      { t: '1. Diagnóstico', d: 'Analisamos suas conversas e desenhamos o fluxo de venda ideal.' },
      { t: '2. Treinamento', d: 'Conectamos a IA ao seu catálogo, FAQs e processo comercial.' },
      { t: '3. Lançamento', d: 'Ativamos o bot no seu WhatsApp Business e monitoramos resultados.' },
    ],
    includesTitle: 'O que inclui',
    includes: [
      'Bot com IA em português, espanhol ou inglês',
      'Integração com a API oficial do WhatsApp Business',
      'Qualificação automática de leads',
      'Agendamento de reuniões conectado à sua agenda',
      'Relatórios mensais de conversas e vendas',
      'Suporte e ajustes contínuos',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Funciona com meu WhatsApp atual?', a: 'Sim. Usamos a API oficial do WhatsApp Business, sem risco de bloqueio.' },
      { q: 'A IA soa natural?', a: 'Treinamos o modelo com o tom da sua marca. Os usuários não percebem que é um bot.' },
      { q: 'E se a IA não souber responder?', a: 'Escala a conversa automaticamente para um humano do seu time.' },
      { q: 'Tem fidelidade?', a: 'Não. Mês a mês. Cancele quando quiser.' },
    ],
    finalCta: 'Pronto para vender no automático',
    finalSub: 'Vamos conversar pelo WhatsApp e desenhar seu bot esta semana.',
  },
};

const WhatsappIaBot = ({ lang = 'es' }: Props) => {
  const c = copyMap[lang];
  const waUrl = 'https://wa.me/17865787671?text=' + encodeURIComponent(
    lang === 'es' ? 'Hola, quiero implementar el WhatsApp IA Bot.'
    : lang === 'pt' ? 'Olá, quero implementar o WhatsApp IA Bot.'
    : 'Hi, I want to implement the WhatsApp AI Bot.'
  );

  const handleCta = (label: string) => {
    trackEvent('whatsapp_button_clicked', { source: 'whatsapp_ia_bot_landing', label });
  };

  return (
    <>
      <Helmet>
        <title>{c.title}</title>
        <meta name="description" content={c.desc} />
        <link rel="canonical" href="https://seoparaecommerce.co/servicios/whatsapp-ia-bot" />
        <meta property="og:title" content={c.title} />
        <meta property="og:description" content={c.desc} />
      </Helmet>
      <Header currentLang={lang} />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                <Bot className="h-3.5 w-3.5" /> {c.eyebrow}
              </p>
              <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
                {c.h1}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">{c.sub}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="gap-2">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleCta('hero_primary')}>
                    <MessageCircle className="h-5 w-5" /> {c.cta1}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#demo" onClick={() => trackEvent('cta_clicked', { source: 'whatsapp_ia_bot_landing', label: 'see_demo' })}>
                    {c.cta2} <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{c.price}</p>
            </div>

            {/* Metrics */}
            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              {c.metrics.map((m, i) => (
                <Card key={i} className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <p className="font-display text-3xl font-bold text-primary">{m.v}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{m.l}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section id="demo" className="border-t border-border/50 py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-center font-display text-3xl font-bold md:text-4xl">{c.stepsTitle}</h2>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
              {c.steps.map((s, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    {i === 0 && <Zap className="mb-3 h-8 w-8 text-primary" />}
                    {i === 1 && <Bot className="mb-3 h-8 w-8 text-primary" />}
                    {i === 2 && <TrendingUp className="mb-3 h-8 w-8 text-primary" />}
                    <h3 className="font-display text-xl font-semibold">{s.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Includes */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center font-display text-3xl font-bold md:text-4xl">{c.includesTitle}</h2>
              <ul className="mt-10 grid gap-4 md:grid-cols-2">
                {c.includes.map((it, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <span className="text-sm text-foreground">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border/50 py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-center font-display text-3xl font-bold md:text-4xl">{c.faqTitle}</h2>
            <div className="mx-auto mt-10 max-w-3xl space-y-4">
              {c.faqs.map((f, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-semibold">{f.q}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-10 text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">{c.finalCta}</h2>
              <p className="mt-3 text-muted-foreground">{c.finalSub}</p>
              <Button asChild size="lg" className="mt-6 gap-2">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleCta('final_cta')}>
                  <MessageCircle className="h-5 w-5" /> {c.cta1}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </>
  );
};

export default WhatsappIaBot;
