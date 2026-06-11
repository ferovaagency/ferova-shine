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
    desc: 'Bot de WhatsApp con IA que responde por ti, sin API y sin almacenar datos. Portal de cliente incluido. Implementación en 1-2 días. Cobro mensual por número.',
    eyebrow: 'NUEVO · WhatsApp + IA',
    h1: 'Tu vendedor estrella nunca duerme. Vende por WhatsApp con IA 24/7.',
    sub: 'Instalamos un bot conversacional con IA en tu WhatsApp — igual que WhatsApp Web, sin API, sin riesgo de bloqueo y sin almacenar tus chats. Tú controlas todo desde tu portal de cliente.',
    cta1: 'Quiero mi bot ahora',
    cta2: 'Ver cómo funciona',
    price: 'Cobro mensual por número de WhatsApp',
    metrics: [
      { v: '< 5s', l: 'Tiempo de respuesta' },
      { v: '24/7', l: 'Atención sin pausa' },
      { v: '0 datos', l: 'No guarda tus chats' },
      { v: '1-2 días', l: 'Implementación' },
    ],
    stepsTitle: 'Cómo funciona',
    steps: [
      { t: '1. Diagnóstico', d: 'Analizamos tu negocio y armamos la base de conocimiento del bot.' },
      { t: '2. Instalación', d: 'Conectamos el bot a tu WhatsApp igual que WhatsApp Web. Sin API, sin permisos extra.' },
      { t: '3. Tu portal', d: 'Te entregamos un portal donde prendes/apagas el bot, actualizas su conocimiento y reportas ajustes.' },
    ],
    includesTitle: 'Qué incluye',
    includes: [
      'Bot con IA en español, inglés o portugués',
      'Conexión tipo WhatsApp Web — sin API, sin riesgo de bloqueo',
      'Portal de cliente: on/off, actualizar conocimiento y reportar ajustes',
      'Cero almacenamiento de chats — el bot solo lee y responde',
      'Solo guardamos la información de tu negocio que tú nos das',
      'Soporte y mejoras continuas desde el portal',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Usa la API oficial de WhatsApp?', a: 'No. Se instala igual que WhatsApp Web, conectándose a tu número actual. Sin trámites, sin aprobación de Meta, sin costos por mensaje.' },
      { q: '¿El bot guarda mis conversaciones?', a: 'No. El bot únicamente lee el texto y responde. No almacena ningún mensaje ni dato de tus chats de WhatsApp. La única información guardada es la que tú nos das sobre tu negocio, y la puedes editar cuando quieras desde el portal.' },
      { q: '¿Cómo manejo el bot después de instalado?', a: 'Te entregamos un portal de cliente donde puedes prender o apagar el bot, actualizar su conocimiento (catálogo, precios, FAQs) y reportar problemas, ajustes o sugerencias en cualquier momento.' },
      { q: '¿Cuánto cuesta y cómo se cobra?', a: 'Pago mensual, sin permanencia. El cobro es por número de WhatsApp conectado. Escríbenos para cotizar según tu volumen.' },
      { q: '¿Cuánto tarda la implementación?', a: 'Entre 1 y 2 días desde que recibimos la información de tu negocio.' },
    ],
    finalCta: 'Listo para vender en automático',
    finalSub: 'Escríbenos por WhatsApp y arrancamos esta misma semana.',
  },
  en: {
    title: 'AI WhatsApp Bot that sells for you 24/7 — Ferova Agency',
    desc: 'AI WhatsApp bot that replies for you, no API and zero data storage. Client portal included. Live in 1-2 days. Monthly fee per number.',
    eyebrow: 'NEW · WhatsApp + AI',
    h1: 'Your top salesperson never sleeps. Sell on WhatsApp with AI 24/7.',
    sub: 'We install a conversational AI bot on your WhatsApp — just like WhatsApp Web. No API, no ban risk, and zero chat storage. You control everything from your client portal.',
    cta1: 'Get my bot now',
    cta2: 'See how it works',
    price: 'Monthly fee per WhatsApp number',
    metrics: [
      { v: '< 5s', l: 'Response time' },
      { v: '24/7', l: 'Always on' },
      { v: '0 data', l: 'No chat storage' },
      { v: '1-2 days', l: 'Go-live' },
    ],
    stepsTitle: 'How it works',
    steps: [
      { t: '1. Discovery', d: 'We learn about your business and build the bot knowledge base.' },
      { t: '2. Install', d: 'We connect the bot to your WhatsApp just like WhatsApp Web. No API, no extra permissions.' },
      { t: '3. Your portal', d: 'You get a portal to toggle the bot on/off, update its knowledge and request fixes anytime.' },
    ],
    includesTitle: 'What is included',
    includes: [
      'AI bot in Spanish, English or Portuguese',
      'WhatsApp Web style connection — no API, no ban risk',
      'Client portal: on/off, knowledge updates and ticketing',
      'Zero chat storage — the bot only reads and replies',
      'We only store the business info you give us',
      'Ongoing support and tuning from the portal',
    ],
    faqTitle: 'FAQ',
    faqs: [
      { q: 'Does it use the official WhatsApp API?', a: 'No. It installs just like WhatsApp Web on your current number. No paperwork, no Meta approval, no per-message fees.' },
      { q: 'Does the bot store my conversations?', a: 'No. The bot only reads the text and replies. It never stores any message or data from your WhatsApp chats. We only store the business info you give us, which you can edit anytime from the portal.' },
      { q: 'How do I manage the bot after install?', a: 'You get a client portal to turn the bot on/off, update its knowledge (catalog, pricing, FAQs) and submit fixes, tweaks or suggestions whenever you want.' },
      { q: 'How is it priced?', a: 'Monthly fee, no lock-in. Billed per connected WhatsApp number. Message us for a quote based on your volume.' },
      { q: 'How long does setup take?', a: 'Between 1 and 2 days once we have your business info.' },
    ],
    finalCta: 'Ready to sell on autopilot',
    finalSub: 'Message us on WhatsApp and we launch this week.',
  },
  pt: {
    title: 'Bot de WhatsApp com IA que vende 24/7 — Ferova Agency',
    desc: 'Bot de WhatsApp com IA que responde por você, sem API e sem guardar dados. Portal do cliente incluso. No ar em 1-2 dias. Cobrança mensal por número.',
    eyebrow: 'NOVO · WhatsApp + IA',
    h1: 'Seu melhor vendedor nunca dorme. Venda no WhatsApp com IA 24/7.',
    sub: 'Instalamos um bot conversacional com IA no seu WhatsApp — igual ao WhatsApp Web. Sem API, sem risco de bloqueio e sem guardar suas conversas. Você controla tudo pelo portal do cliente.',
    cta1: 'Quero meu bot agora',
    cta2: 'Ver como funciona',
    price: 'Cobrança mensal por número de WhatsApp',
    metrics: [
      { v: '< 5s', l: 'Tempo de resposta' },
      { v: '24/7', l: 'Sempre ativo' },
      { v: '0 dados', l: 'Não guarda chats' },
      { v: '1-2 dias', l: 'Implantação' },
    ],
    stepsTitle: 'Como funciona',
    steps: [
      { t: '1. Descoberta', d: 'Conhecemos o seu negócio e montamos a base de conhecimento do bot.' },
      { t: '2. Instalação', d: 'Conectamos o bot ao seu WhatsApp igual ao WhatsApp Web. Sem API, sem permissões extras.' },
      { t: '3. Seu portal', d: 'Você recebe um portal para ligar/desligar o bot, atualizar conhecimento e reportar ajustes.' },
    ],
    includesTitle: 'O que inclui',
    includes: [
      'Bot com IA em português, espanhol ou inglês',
      'Conexão estilo WhatsApp Web — sem API, sem risco de bloqueio',
      'Portal do cliente: on/off, atualizar conhecimento e abrir tickets',
      'Zero armazenamento de chats — o bot só lê e responde',
      'Só guardamos as informações do seu negócio que você nos passa',
      'Suporte e melhorias contínuas pelo portal',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Usa a API oficial do WhatsApp?', a: 'Não. Instala igual ao WhatsApp Web, conectando ao seu número atual. Sem burocracia, sem aprovação da Meta, sem custo por mensagem.' },
      { q: 'O bot guarda minhas conversas?', a: 'Não. O bot apenas lê o texto e responde. Não armazena nenhuma mensagem nem dado dos seus chats. A única informação guardada é a do seu negócio, que você atualiza quando quiser no portal.' },
      { q: 'Como controlo o bot depois de instalado?', a: 'Você recebe um portal do cliente para ligar/desligar o bot, atualizar o conhecimento (catálogo, preços, FAQs) e reportar problemas, ajustes ou sugestões a qualquer momento.' },
      { q: 'Como é cobrado?', a: 'Mensalidade, sem fidelidade. Cobrança por número de WhatsApp conectado. Fale com a gente para orçar pelo seu volume.' },
      { q: 'Quanto tempo leva para implementar?', a: 'Entre 1 e 2 dias depois de recebermos as informações do seu negócio.' },
    ],
    finalCta: 'Pronto para vender no automático',
    finalSub: 'Fale com a gente no WhatsApp e lançamos esta semana.',
  },
};

const WhatsappIaBot = ({ lang = 'es' }: Props) => {
  const c = copyMap[lang];
  const waUrl = 'https://wa.link/hbrsxy';

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
