import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { AnswerBlock } from '@/components/ui/answer-block';
import { StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { Ear, Search, Target, Rocket, LineChart, RefreshCw, Check, X, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface MetodoFerovaProps { lang?: 'es' | 'en' | 'pt'; }

const MetodoFerova = ({ lang = 'es' }: MetodoFerovaProps) => {
  const home = lang === 'pt' ? '/pt' : lang === 'en' ? '/en' : '';
  const solucionesHref = lang === 'en' ? '/en/solutions' : lang === 'pt' ? '/pt/solucoes' : '/soluciones';
  const contactoHref = lang === 'en' ? '/en/contact' : lang === 'pt' ? '/pt/contato' : '/contacto';

  const copy = {
    es: {
      h1: 'El método Ferova',
      lead: 'No vendemos servicios sueltos. Resolvemos problemas. Antes de recomendarte nada, entendemos tu empresa y buscamos la causa real. Este es el proceso.',
      stepsTitle: 'Cómo trabajamos, paso a paso',
      steps: [
        { icon: Ear, t: 'Entendemos', d: 'Escuchamos tu negocio, tus números y tu objetivo real antes de proponer nada.' },
        { icon: Search, t: 'Encontramos la causa', d: 'Separamos el síntoma del problema de fondo. Casi nunca es lo que parecía al inicio.' },
        { icon: Target, t: 'Elegimos la solución correcta', d: 'Recomendamos solo lo que mueve la aguja hacia tu objetivo, aunque sea menos de lo que esperabas.' },
        { icon: Rocket, t: 'Implementamos', d: 'Ejecutamos con foco y entregas concretas, no en presentaciones eternas.' },
        { icon: LineChart, t: 'Medimos', d: 'Definimos qué significa éxito desde el día uno y lo medimos con datos, no con opiniones.' },
        { icon: RefreshCw, t: 'Aprendemos', d: 'Ajustamos con lo que muestran los datos y repetimos lo que funciona.' },
      ],
      getTitle: 'Qué recibes',
      get: ['Un diagnóstico claro de qué resolver primero', 'Una recomendación honesta, no un catálogo de servicios', 'Entregas concretas con responsables y plazos', 'Métricas para saber si está funcionando'],
      decideTitle: 'Cómo decidimos qué hacer',
      decide: 'Priorizamos por impacto sobre tu objetivo y esfuerzo real. Si algo no mueve tu resultado, no lo hacemos aunque esté de moda.',
      measureTitle: 'Cómo lo medimos',
      measure: 'Acordamos una métrica principal antes de empezar (clientes, ventas, visibilidad, tiempo ahorrado) y la revisamos de forma periódica.',
      notTitle: 'Qué NO hace Ferova',
      not: ['No vendemos humo ni promesas mágicas de resultados', 'No recomendamos lo que no usaríamos nosotros', 'No hacemos SEO de relleno ni contenido vacío', 'No te atamos a un servicio que no necesitas'],
      ctaTitle: 'Empecemos por entender tu caso',
      ctaText: 'Cuéntanos qué está pasando. En una conversación corta identificamos la causa y el siguiente paso.',
      ctaBtn: 'Hablar con Ferova',
      seeSolutions: 'Ver soluciones por problema',
    },
    en: {
      h1: 'The Ferova method',
      lead: "We don't sell standalone services. We solve problems. Before recommending anything, we understand your business and find the real cause. This is the process.",
      stepsTitle: 'How we work, step by step',
      steps: [
        { icon: Ear, t: 'We understand', d: 'We listen to your business, your numbers and your real goal before proposing anything.' },
        { icon: Search, t: 'We find the cause', d: 'We separate the symptom from the underlying problem. It\'s rarely what it seemed at first.' },
        { icon: Target, t: 'We choose the right solution', d: 'We recommend only what moves the needle toward your goal, even if it\'s less than you expected.' },
        { icon: Rocket, t: 'We implement', d: 'We execute with focus and concrete deliverables, not endless presentations.' },
        { icon: LineChart, t: 'We measure', d: 'We define what success means from day one and measure it with data, not opinions.' },
        { icon: RefreshCw, t: 'We learn', d: 'We adjust based on what the data shows and repeat what works.' },
      ],
      getTitle: 'What you get',
      get: ['A clear diagnosis of what to solve first', 'An honest recommendation, not a service catalog', 'Concrete deliverables with owners and deadlines', 'Metrics to know whether it\'s working'],
      decideTitle: 'How we decide what to do',
      decide: 'We prioritize by impact on your goal versus real effort. If something doesn\'t move your result, we don\'t do it — even if it\'s trendy.',
      measureTitle: 'How we measure it',
      measure: 'We agree on one primary metric before starting (clients, sales, visibility, time saved) and review it regularly.',
      notTitle: 'What Ferova does NOT do',
      not: ['We don\'t sell hype or magical result promises', "We don't recommend what we wouldn't use ourselves", "We don't do filler SEO or empty content", "We don't lock you into a service you don't need"],
      ctaTitle: "Let's start by understanding your case",
      ctaText: 'Tell us what\'s happening. In a short conversation we identify the cause and the next step.',
      ctaBtn: 'Talk to Ferova',
      seeSolutions: 'See solutions by problem',
    },
    pt: {
      h1: 'O método Ferova',
      lead: 'Não vendemos serviços soltos. Resolvemos problemas. Antes de recomendar qualquer coisa, entendemos a sua empresa e buscamos a causa real. Este é o processo.',
      stepsTitle: 'Como trabalhamos, passo a passo',
      steps: [
        { icon: Ear, t: 'Entendemos', d: 'Ouvimos o seu negócio, seus números e seu objetivo real antes de propor qualquer coisa.' },
        { icon: Search, t: 'Encontramos a causa', d: 'Separamos o sintoma do problema de fundo. Quase nunca é o que parecia no início.' },
        { icon: Target, t: 'Escolhemos a solução certa', d: 'Recomendamos só o que move o ponteiro em direção ao seu objetivo, mesmo que seja menos do que você esperava.' },
        { icon: Rocket, t: 'Implementamos', d: 'Executamos com foco e entregas concretas, não em apresentações intermináveis.' },
        { icon: LineChart, t: 'Medimos', d: 'Definimos o que significa sucesso desde o primeiro dia e medimos com dados, não com opiniões.' },
        { icon: RefreshCw, t: 'Aprendemos', d: 'Ajustamos com o que os dados mostram e repetimos o que funciona.' },
      ],
      getTitle: 'O que você recebe',
      get: ['Um diagnóstico claro do que resolver primeiro', 'Uma recomendação honesta, não um catálogo de serviços', 'Entregas concretas com responsáveis e prazos', 'Métricas para saber se está funcionando'],
      decideTitle: 'Como decidimos o que fazer',
      decide: 'Priorizamos por impacto no seu objetivo versus esforço real. Se algo não move o seu resultado, não fazemos, mesmo que esteja na moda.',
      measureTitle: 'Como medimos',
      measure: 'Combinamos uma métrica principal antes de começar (clientes, vendas, visibilidade, tempo economizado) e a revisamos periodicamente.',
      notTitle: 'O que a Ferova NÃO faz',
      not: ['Não vendemos hype nem promessas mágicas de resultados', 'Não recomendamos o que não usaríamos', 'Não fazemos SEO de enchimento nem conteúdo vazio', 'Não prendemos você a um serviço de que não precisa'],
      ctaTitle: 'Vamos começar entendendo o seu caso',
      ctaText: 'Conte o que está acontecendo. Em uma conversa curta identificamos a causa e o próximo passo.',
      ctaBtn: 'Falar com a Ferova',
      seeSolutions: 'Ver soluções por problema',
    },
  }[lang];

  const seoTitle = lang === 'es' ? 'El método Ferova: diagnóstico antes que servicio — Ferova'
    : lang === 'pt' ? 'O método Ferova: diagnóstico antes do serviço — Ferova'
    : 'The Ferova method: diagnosis before service — Ferova';
  const seoDesc = lang === 'es' ? 'Cómo trabaja Ferova: entendemos, encontramos la causa, elegimos la solución correcta, implementamos, medimos y aprendemos. Diagnóstico antes que catálogo.'
    : lang === 'pt' ? 'Como a Ferova trabalha: entendemos, encontramos a causa, escolhemos a solução certa, implementamos, medimos e aprendemos. Diagnóstico antes do catálogo.'
    : 'How Ferova works: we understand, find the cause, choose the right solution, implement, measure and learn. Diagnosis before catalog.';
  const seoPath = lang === 'en' ? '/en/ferova-method' : lang === 'pt' ? '/pt/metodo-ferova' : '/metodo-ferova';

  const breadcrumbs = [
    { name: lang === 'es' ? 'Inicio' : lang === 'pt' ? 'Início' : 'Home', path: home || '/' },
    { name: lang === 'es' ? 'Método' : lang === 'pt' ? 'Método' : 'Method', path: seoPath },
  ];

  return (
    <PageTransition>
      <SEO title={seoTitle} description={seoDesc} path={seoPath} lang={lang} breadcrumbs={breadcrumbs} />
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-16 md:py-24 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5">{copy.h1}</h1>
            <div className="max-w-2xl mx-auto text-left text-muted-foreground">
              <AnswerBlock>{copy.lead}</AnswerBlock>
            </div>
          </div>
        </section>

        {/* 6 pasos */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">{copy.stepsTitle}</h2>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {copy.steps.map((s, i) => (
                <StaggerItem key={s.t}>
                  <ScaleOnHover>
                    <div className="glass-card p-7 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-gold/10 flex-shrink-0">
                          <s.icon className="w-5 h-5 text-gold" />
                        </div>
                        <span className="text-sm font-mono text-gold/70">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="text-lg font-display font-bold mb-2 text-foreground">{s.t}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{s.d}</p>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Qué recibes + Qué NO hacemos */}
        <section className="py-12 md:py-16 border-t border-border/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="glass-card p-8">
                <h3 className="text-xl font-display font-bold mb-5 text-foreground">{copy.getTitle}</h3>
                <ul className="space-y-3">
                  {copy.get.map((g) => (
                    <li key={g} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {g}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-8">
                <h3 className="text-xl font-display font-bold mb-5 text-foreground">{copy.notTitle}</h3>
                <ul className="space-y-3">
                  {copy.not.map((n) => (
                    <li key={n} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" /> {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cómo decidimos + Cómo medimos */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="glass-card p-8">
                <h3 className="text-xl font-display font-bold mb-3 text-foreground">{copy.decideTitle}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{copy.decide}</p>
              </div>
              <div className="glass-card p-8">
                <h3 className="text-xl font-display font-bold mb-3 text-foreground">{copy.measureTitle}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{copy.measure}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-5 text-foreground">{copy.ctaTitle}</h2>
            <p className="text-lg max-w-xl mx-auto mb-10 text-muted-foreground">{copy.ctaText}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={contactoHref}
                onClick={() => trackEvent('cta_clicked', { source: 'metodo_cta', label: 'contacto', language: lang })}
                className="btn-gold inline-flex items-center justify-center gap-2"
              >
                {copy.ctaBtn}
              </Link>
              <Link
                to={solucionesHref}
                onClick={() => trackEvent('cta_clicked', { source: 'metodo_cta', label: 'ver_soluciones', language: lang })}
                className="btn-outline-gold inline-flex items-center justify-center gap-2"
              >
                {copy.seeSolutions} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </PageTransition>
  );
};

export default MetodoFerova;
