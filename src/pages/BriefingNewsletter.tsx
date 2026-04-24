import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Clock,
  Brain,
  TrendingDown,
  Check,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  lang?: 'es' | 'en' | 'pt';
}

type Currency = 'usd' | 'cop' | 'brl';

const PRICES: Record<Currency, { amount: string; period: string; link: string; cta: { es: string; en: string; pt: string } }> = {
  cop: {
    amount: '$5.000',
    period: '/mes',
    link: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=dd350ce33a264d4591e12732a7397342',
    cta: {
      es: 'Suscribirme por $5.000/mes',
      en: 'Suscribirme por $5.000/mes',
      pt: 'Suscribirme por $5.000/mes',
    },
  },
  usd: {
    amount: '$5',
    period: '/month',
    link: 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-81M51707BX2112049NHVKSLQ',
    cta: {
      es: 'Subscribe for $5/month',
      en: 'Subscribe for $5/month',
      pt: 'Subscribe for $5/month',
    },
  },
  brl: {
    amount: 'R$25',
    period: '/mês',
    link: 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-81M51707BX2112049NHVKSLQ',
    cta: {
      es: 'Assinar por R$25/mês',
      en: 'Assinar por R$25/mês',
      pt: 'Assinar por R$25/mês',
    },
  },
};

const BriefingNewsletter = ({ lang = 'es' }: Props) => {
  const [currency, setCurrency] = useState<Currency>(
    lang === 'es' ? 'cop' : lang === 'pt' ? 'brl' : 'usd'
  );

  const t = lang === 'es' ? {
    metaTitle: 'Briefing de Newsletters | Ferova Agency',
    metaDesc: 'Dashboard diario con las noticias más relevantes de tu sector, organizadas para LinkedIn y email marketing. Desde $5.000/mes COP.',
    heroH1: '¿Pasas horas buscando noticias de tu sector y nunca tienes tiempo para crear contenido?',
    heroSub: 'El Briefing de Newsletters organiza automáticamente las noticias más relevantes de tu sector — listas para usar en tu estrategia de LinkedIn y email marketing.',
    ctaPrimary: 'Quiero el Briefing ahora',
    ctaSecondary: 'Ver cómo funciona',
    pains: [
      { icon: Clock, title: 'Tiempo perdido', desc: 'Revisas 10 fuentes diferentes cada mañana buscando noticias relevantes para tu negocio. Eso son horas que podrías dedicar a vender.' },
      { icon: Brain, title: 'Sobrecarga de información', desc: 'Encuentras demasiado contenido irrelevante y no sabes qué vale la pena compartir con tu audiencia.' },
      { icon: TrendingDown, title: 'Oportunidades perdidas', desc: 'Las noticias de tu sector que podrían posicionarte como experto en LinkedIn pasan sin que las veas.' },
    ],
    solutionH2: 'Un dashboard con todo lo que necesitas saber, organizado para ti',
    steps: [
      { n: '01', title: 'Seleccionamos las noticias', desc: 'Monitoreamos las fuentes más importantes de tu sector y filtramos el ruido para quedarnos solo con lo que importa.' },
      { n: '02', title: 'Las organizamos por relevancia', desc: 'Clasificamos en 3 categorías: las más importantes, las más relevantes para tu negocio y las perfectas para LinkedIn.' },
      { n: '03', title: 'Tú las consultas cuando quieras', desc: 'Accedes a tu dashboard diariamente y en minutos tienes todo lo que necesitas para crear contenido de valor.' },
    ],
    demoH2: 'Mira cómo funciona el dashboard',
    stats: [
      { k: 'Consultas diarias', v: 'Accede cuando quieras' },
      { k: '3 categorías', v: 'Importante / Relevante / LinkedIn' },
      { k: '5 min', v: 'Es todo lo que necesitas al día' },
    ],
    benefitsH2: 'Lo que obtienes con el Briefing',
    benefits: [
      'Noticias de tu sector organizadas diariamente',
      '3 categorías listas para usar en tu contenido',
      'Ahorra 2-3 horas semanales de búsqueda',
      'Ideas de contenido para LinkedIn siempre disponibles',
      'Dashboard accesible desde cualquier dispositivo',
      'Cancela cuando quieras — sin permanencia',
    ],
    testimoniosH2: 'Lo que dicen quienes ya lo usan',
    testimoniosFoot: 'Experiencia representativa de usuario del Briefing',
    testimonios: [
      { text: 'Antes perdía más de una hora cada mañana revisando noticias. Ahora en 5 minutos tengo todo lo que necesito para mi estrategia de contenido.', author: 'Carlos M.', role: 'Director de Marketing, Bogotá' },
      { text: 'El Briefing me dio ideas de contenido para LinkedIn que nunca hubiera encontrado solo. Mi engagement aumentó notablemente.', author: 'Laura P.', role: 'Consultora de Negocios, Medellín' },
      { text: 'Vale cada peso. El tiempo que ahorro en investigación lo invierto en crear contenido que genera clientes.', author: 'Andrés R.', role: 'Emprendedor Digital, Cali' },
    ],
    pricingH2: 'Una inversión mínima. Un ahorro de horas.',
    includes: 'Incluye:',
    includesList: [
      'Acceso diario al dashboard',
      'Noticias clasificadas en 3 categorías',
      'Ideas de contenido para LinkedIn',
      'Acceso desde cualquier dispositivo',
      'Sin permanencia — cancela cuando quieras',
    ],
    secureNote: 'Pago seguro. Cancela cuando quieras.',
    faqH2: 'Preguntas frecuentes',
    faqs: [
      { q: '¿De qué sector son las noticias?', a: 'Personalizamos el Briefing según tu sector. Al suscribirte te pedimos información sobre tu industria para entregarte noticias relevantes para tu negocio específico.' },
      { q: '¿Con qué frecuencia se actualiza?', a: 'El dashboard se actualiza diariamente. Puedes consultarlo cada mañana y siempre tendrás contenido fresco y relevante.' },
      { q: '¿Puedo cancelar cuando quiera?', a: 'Sí. No hay permanencia mínima. Cancelas cuando quieras desde tu cuenta de MercadoPago o PayPal sin costos adicionales.' },
      { q: '¿Es diferente al Newsletter Pro?', a: 'El Briefing es un dashboard de noticias organizadas para inspirar tu contenido. El Newsletter Pro es nuestro newsletter semanal con estrategias de SEO y e-commerce. Son complementarios, no lo mismo.' },
      { q: '¿Cómo accedo al dashboard después de pagar?', a: 'Inmediatamente después de tu suscripción recibes un email con tus datos de acceso al dashboard.' },
    ],
    finalH2: 'Deja de perder tiempo buscando noticias. Empieza a crear contenido que posiciona.',
    finalNote: 'Menos de un café al mes.',
  } : lang === 'pt' ? {
    metaTitle: 'Briefing de Newsletters | Ferova Agency',
    metaDesc: 'Dashboard diário com as notícias mais relevantes do seu setor, organizadas para LinkedIn e email marketing. A partir de R$25/mês.',
    heroH1: 'Você passa horas buscando notícias do seu setor e nunca tem tempo para criar conteúdo?',
    heroSub: 'O Briefing de Newsletters organiza automaticamente as notícias mais relevantes do seu setor — prontas para usar na sua estratégia de LinkedIn e email marketing.',
    ctaPrimary: 'Quero o Briefing agora',
    ctaSecondary: 'Ver como funciona',
    pains: [
      { icon: Clock, title: 'Tempo perdido', desc: 'Você revisa 10 fontes diferentes toda manhã buscando notícias relevantes para o seu negócio. São horas que poderia dedicar a vender.' },
      { icon: Brain, title: 'Sobrecarga de informação', desc: 'Encontra muito conteúdo irrelevante e não sabe o que vale a pena compartilhar com sua audiência.' },
      { icon: TrendingDown, title: 'Oportunidades perdidas', desc: 'As notícias do seu setor que poderiam te posicionar como especialista no LinkedIn passam sem que você perceba.' },
    ],
    solutionH2: 'Um dashboard com tudo que você precisa saber, organizado para você',
    steps: [
      { n: '01', title: 'Selecionamos as notícias', desc: 'Monitoramos as fontes mais importantes do seu setor e filtramos o ruído para ficar apenas com o que importa.' },
      { n: '02', title: 'Organizamos por relevância', desc: 'Classificamos em 3 categorias: as mais importantes, as mais relevantes para o seu negócio e as perfeitas para LinkedIn.' },
      { n: '03', title: 'Você acessa quando quiser', desc: 'Acessa seu dashboard diariamente e em minutos tem tudo que precisa para criar conteúdo de valor.' },
    ],
    demoH2: 'Veja como funciona o dashboard',
    stats: [
      { k: 'Acesso diário', v: 'Consulte quando quiser' },
      { k: '3 categorias', v: 'Importante / Relevante / LinkedIn' },
      { k: '5 min', v: 'É tudo que você precisa por dia' },
    ],
    benefitsH2: 'O que você obtém com o Briefing',
    benefits: [
      'Notícias do seu setor organizadas diariamente',
      '3 categorias prontas para usar no seu conteúdo',
      'Economize 2-3 horas semanais de busca',
      'Ideias de conteúdo para LinkedIn sempre disponíveis',
      'Dashboard acessível de qualquer dispositivo',
      'Cancele quando quiser — sem fidelidade',
    ],
    testimoniosH2: 'O que dizem quem já usa',
    testimoniosFoot: 'Experiência representativa de usuário do Briefing',
    testimonios: [
      { text: 'Antes eu perdia mais de uma hora toda manhã revisando notícias. Agora em 5 minutos tenho tudo que preciso para minha estratégia de conteúdo.', author: 'Carlos M.', role: 'Diretor de Marketing, Bogotá' },
      { text: 'O Briefing me deu ideias de conteúdo para LinkedIn que eu nunca teria encontrado sozinho. Meu engajamento aumentou notavelmente.', author: 'Laura P.', role: 'Consultora de Negócios, Medellín' },
      { text: 'Vale cada centavo. O tempo que economizo em pesquisa eu invisto em criar conteúdo que gera clientes.', author: 'Andrés R.', role: 'Empreendedor Digital, Cali' },
    ],
    pricingH2: 'Um investimento mínimo. Uma economia de horas.',
    includes: 'Inclui:',
    includesList: [
      'Acesso diário ao dashboard',
      'Notícias classificadas em 3 categorias',
      'Ideias de conteúdo para LinkedIn',
      'Acesso de qualquer dispositivo',
      'Sem fidelidade — cancele quando quiser',
    ],
    secureNote: 'Pagamento seguro. Cancele quando quiser.',
    faqH2: 'Perguntas frequentes',
    faqs: [
      { q: 'De qual setor são as notícias?', a: 'Personalizamos o Briefing conforme o seu setor. Ao se inscrever pedimos informações sobre sua indústria para entregar notícias relevantes para o seu negócio específico.' },
      { q: 'Com que frequência é atualizado?', a: 'O dashboard é atualizado diariamente. Pode consultá-lo toda manhã e sempre terá conteúdo fresco e relevante.' },
      { q: 'Posso cancelar quando quiser?', a: 'Sim. Não há fidelidade mínima. Você cancela quando quiser pela sua conta MercadoPago ou PayPal sem custos adicionais.' },
      { q: 'É diferente do Newsletter Pro?', a: 'O Briefing é um dashboard de notícias organizadas para inspirar seu conteúdo. O Newsletter Pro é nosso newsletter semanal com estratégias de SEO e e-commerce. São complementares, não a mesma coisa.' },
      { q: 'Como acesso o dashboard após pagar?', a: 'Imediatamente após sua assinatura você recebe um email com seus dados de acesso ao dashboard.' },
    ],
    finalH2: 'Pare de perder tempo buscando notícias. Comece a criar conteúdo que posiciona.',
    finalNote: 'Menos que um café por mês.',
  } : {
    metaTitle: 'Newsletter Briefing | Ferova Agency',
    metaDesc: 'Daily dashboard with the most relevant news from your sector, organized for LinkedIn and email marketing. From $5/month USD.',
    heroH1: 'Do you spend hours searching for industry news and never have time to create content?',
    heroSub: 'The Newsletter Briefing automatically organizes the most relevant news from your sector — ready to use in your LinkedIn and email marketing strategy.',
    ctaPrimary: 'Get the Briefing now',
    ctaSecondary: 'See how it works',
    pains: [
      { icon: Clock, title: 'Wasted time', desc: 'You check 10 different sources every morning looking for news relevant to your business. Those are hours you could dedicate to selling.' },
      { icon: Brain, title: 'Information overload', desc: 'You find too much irrelevant content and don\'t know what\'s worth sharing with your audience.' },
      { icon: TrendingDown, title: 'Missed opportunities', desc: 'The news in your industry that could position you as an expert on LinkedIn passes by without you seeing it.' },
    ],
    solutionH2: 'A dashboard with everything you need to know, organized for you',
    steps: [
      { n: '01', title: 'We select the news', desc: 'We monitor the most important sources in your sector and filter the noise to keep only what matters.' },
      { n: '02', title: 'We organize by relevance', desc: 'We classify them into 3 categories: the most important, the most relevant for your business, and the perfect ones for LinkedIn.' },
      { n: '03', title: 'You consult them anytime', desc: 'You access your dashboard daily and in minutes have everything you need to create valuable content.' },
    ],
    demoH2: 'See how the dashboard works',
    stats: [
      { k: 'Daily access', v: 'Check it whenever you want' },
      { k: '3 categories', v: 'Important / Relevant / LinkedIn' },
      { k: '5 min', v: "It's all you need per day" },
    ],
    benefitsH2: 'What you get with the Briefing',
    benefits: [
      'Daily organized news from your sector',
      '3 categories ready to use in your content',
      'Save 2-3 hours of weekly search',
      'Always-available LinkedIn content ideas',
      'Dashboard accessible from any device',
      'Cancel anytime — no commitment',
    ],
    testimoniosH2: 'What current users say',
    testimoniosFoot: 'Representative user experience with the Briefing',
    testimonios: [
      { text: 'I used to lose more than an hour every morning reviewing news. Now in 5 minutes I have everything I need for my content strategy.', author: 'Carlos M.', role: 'Marketing Director, Bogotá' },
      { text: 'The Briefing gave me LinkedIn content ideas I would never have found on my own. My engagement increased noticeably.', author: 'Laura P.', role: 'Business Consultant, Medellín' },
      { text: 'Worth every penny. The time I save on research I invest in creating content that generates clients.', author: 'Andrés R.', role: 'Digital Entrepreneur, Cali' },
    ],
    pricingH2: 'A minimal investment. Hours saved.',
    includes: 'Includes:',
    includesList: [
      'Daily access to the dashboard',
      'News classified into 3 categories',
      'LinkedIn content ideas',
      'Access from any device',
      'No commitment — cancel anytime',
    ],
    secureNote: 'Secure payment. Cancel anytime.',
    faqH2: 'Frequently asked questions',
    faqs: [
      { q: 'What sector does the news cover?', a: 'We personalize the Briefing based on your sector. When you subscribe, we ask for information about your industry to deliver news relevant to your specific business.' },
      { q: 'How often is it updated?', a: 'The dashboard is updated daily. You can check it every morning and always have fresh, relevant content.' },
      { q: 'Can I cancel anytime?', a: 'Yes. No minimum commitment. Cancel anytime from your MercadoPago or PayPal account at no additional cost.' },
      { q: 'Is it different from Newsletter Pro?', a: 'The Briefing is a dashboard of organized news to inspire your content. Newsletter Pro is our weekly newsletter with SEO and e-commerce strategies. They are complementary, not the same.' },
      { q: 'How do I access the dashboard after paying?', a: 'Immediately after your subscription you receive an email with your access details to the dashboard.' },
    ],
    finalH2: 'Stop wasting time searching for news. Start creating content that positions you.',
    finalNote: 'Less than a coffee per month.',
  };

  // SEO: title + meta description + JSON-LD FAQ
  useEffect(() => {
    const prevTitle = document.title;
    document.title = t.metaTitle;

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const prevDesc = metaDesc?.content;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = t.metaDesc;

    const ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.id = 'briefing-newsletter-faq-jsonld';
    ldScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: t.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
    document.head.appendChild(ldScript);

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc !== undefined) metaDesc.content = prevDesc;
      const existing = document.getElementById('briefing-newsletter-faq-jsonld');
      if (existing) existing.remove();
    };
  }, [lang, t.metaTitle, t.metaDesc, t.faqs]);

  const price = PRICES[currency];

  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">
        {/* SECCIÓN 1 - Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 blur-sm"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80')",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-90" aria-hidden="true" />
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div className="relative z-10 container mx-auto px-4 md:px-6 py-24 md:py-32 text-center text-foreground">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold max-w-4xl mx-auto leading-tight text-foreground">
              {t.heroH1}
            </h1>
            <p className="text-lg md:text-xl mt-6 max-w-3xl mx-auto text-foreground/90">
              {t.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a
                href="#precios"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gold text-black font-semibold hover:bg-gold/90 transition"
              >
                {t.ctaPrimary}
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-foreground/40 text-foreground font-semibold hover:bg-foreground/10 transition"
              >
                {t.ctaSecondary}
              </a>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2 - Pain points */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {t.pains.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="glass-card rounded-2xl p-8 text-center card-hover">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3 text-foreground">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECCIÓN 3 - Solución */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{t.solutionH2}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {t.steps.map((s) => (
                <div key={s.n} className="text-center md:text-left">
                  <div className="text-6xl md:text-7xl font-display font-bold text-gold/80 mb-3">
                    {s.n}
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 text-foreground">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 4 - Demo video */}
        <section id="demo" className="py-20 bg-background text-foreground">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{t.demoH2}</h2>
            <video
              controls
              className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl mt-8"
            >
              <source src="/lovable-uploads/briefing-newsletter-demo.mp4" type="video/mp4" />
            </video>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
              {t.stats.map((s) => (
                <div key={s.k} className="text-center">
                  <div className="text-2xl md:text-3xl font-display font-bold text-foreground">{s.k}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 5 - Beneficios */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{t.benefitsH2}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {t.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3 glass-card rounded-xl p-5">
                  <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 6 - Testimonios */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{t.testimoniosH2}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {t.testimonios.map((tm) => (
                <div key={tm.author} className="glass-card rounded-2xl p-6 flex flex-col">
                  <p className="text-foreground leading-relaxed flex-1">"{tm.text}"</p>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center text-white font-bold">
                      {tm.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{tm.author}</div>
                      <div className="text-sm text-muted-foreground">{tm.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-8">{t.testimoniosFoot}</p>
          </div>
        </section>

        {/* SECCIÓN 7 - Precios */}
        <section id="precios" className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{t.pricingH2}</h2>
            </div>

            {/* Toggle moneda */}
            <div className="flex justify-center mb-10">
              <div className="flex items-center gap-1 p-1 rounded-full border border-border">
                {(['usd', 'cop', 'brl'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      currency === c ? 'bg-gold text-black' : 'text-muted-foreground'
                    }`}
                  >
                    {c.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <div className="glass-card rounded-3xl p-8 border-2 border-gold/40 shadow-xl text-center">
                <div className="mb-6">
                  <span className="text-5xl font-display font-bold text-primary">{price.amount}</span>
                  <span className="text-lg text-muted-foreground">{price.period}</span>
                </div>
                <ul className="text-left space-y-3 mb-8">
                  {t.includesList.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{it}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={price.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  {price.cta[lang]}
                </a>
                <p className="text-xs text-muted-foreground mt-4">{t.secureNote}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 8 - FAQ */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{t.faqH2}</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {t.faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* SECCIÓN 9 - CTA Final */}
        <section className="py-20 bg-muted/30 text-foreground text-center">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-foreground">
              {t.finalH2}
            </h2>
            <a
              href={price.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition mt-8"
            >
              {price.cta[lang]}
            </a>
            <p className="text-sm text-muted-foreground mt-4">{t.finalNote}</p>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </>
  );
};

export default BriefingNewsletter;
