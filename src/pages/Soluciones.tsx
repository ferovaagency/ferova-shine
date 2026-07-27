import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { AnswerBlock } from '@/components/ui/answer-block';
import { StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { Users, Search, ShoppingCart, Workflow, BrainCircuit, Compass, ArrowRight, MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface SolucionesProps { lang?: 'es' | 'en' | 'pt'; }

type Problem = {
  icon: typeof Users;
  problem: string;
  detail: string;
  /** Destino interino: página existente más relevante. Se reemplazará por
   *  /soluciones/<slug> dedicada en sprints posteriores del plan. */
  href: string;
  cta: string;
  /** Clave estable para analítica (problem_selected). */
  key: string;
};

const Soluciones = ({ lang = 'es' }: SolucionesProps) => {
  const home = lang === 'pt' ? '/pt' : lang === 'en' ? '/en' : '';
  const metodoHref = lang === 'en' ? '/en/ferova-method' : lang === 'pt' ? '/pt/metodo-ferova' : '/metodo-ferova';
  const contactoHref = lang === 'en' ? '/en/contact' : lang === 'pt' ? '/pt/contato' : '/contacto';

  const copy = {
    es: {
      h1: '¿Qué está frenando tu empresa?',
      lead: 'No empezamos por el servicio. Empezamos por el problema. Elige lo que más se parece a tu situación y te mostramos el camino más corto para resolverlo.',
      methodTitle: 'Antes de recomendarte nada, entendemos',
      methodText: 'Cada solución sale de un diagnóstico, no de un catálogo. Así trabajamos.',
      methodCta: 'Ver el método Ferova',
      ctaTitle: '¿No encaja del todo en una sola casilla?',
      ctaText: 'La mayoría de las empresas tienen varios de estos problemas a la vez. En una conversación corta identificamos cuál resolver primero.',
      ctaBtn: 'Hablar con Ferova',
    },
    en: {
      h1: "What's holding your business back?",
      lead: "We don't start with the service. We start with the problem. Pick what most resembles your situation and we'll show you the shortest path to solve it.",
      methodTitle: 'Before recommending anything, we understand',
      methodText: 'Every solution comes from a diagnosis, not a catalog. This is how we work.',
      methodCta: 'See the Ferova method',
      ctaTitle: "Doesn't fit neatly into one box?",
      ctaText: 'Most companies have several of these problems at once. In a short conversation we identify which one to solve first.',
      ctaBtn: 'Talk to Ferova',
    },
    pt: {
      h1: 'O que está travando a sua empresa?',
      lead: 'Não começamos pelo serviço. Começamos pelo problema. Escolha o que mais se parece com a sua situação e mostramos o caminho mais curto para resolvê-lo.',
      methodTitle: 'Antes de recomendar qualquer coisa, entendemos',
      methodText: 'Cada solução nasce de um diagnóstico, não de um catálogo. É assim que trabalhamos.',
      methodCta: 'Ver o método Ferova',
      ctaTitle: 'Não se encaixa em uma única caixa?',
      ctaText: 'A maioria das empresas tem vários desses problemas ao mesmo tempo. Em uma conversa curta identificamos qual resolver primeiro.',
      ctaBtn: 'Falar com a Ferova',
    },
  }[lang];

  const problems: Problem[] = lang === 'es' ? [
    { key: 'mas-clientes', icon: Users, problem: 'No llegan suficientes clientes', detail: 'Tienes un buen producto, pero el flujo de clientes nuevos es impredecible o insuficiente para crecer.', href: '/servicios/seo-ecommerce', cta: 'Ver cómo atraer clientes' },
    { key: 'visibilidad-ia', icon: Search, problem: 'No aparecemos en Google ni en la IA', detail: 'Tu competencia sale primero en Google y es citada por ChatGPT o Perplexity. Tú no.', href: '/que-es-geo', cta: 'Ver visibilidad en Google e IA' },
    { key: 'pagina-no-vende', icon: ShoppingCart, problem: 'Nuestra página no vende', detail: 'Recibes visitas pero no se convierten en ventas. Algo en la web frena la decisión de compra.', href: '/servicios/diseno-web', cta: 'Ver diseño que convierte' },
    { key: 'automatizar', icon: Workflow, problem: 'Perdemos tiempo en tareas repetitivas', detail: 'El equipo (o tú) gasta horas en tareas manuales que un sistema o la IA podrían hacer solos.', href: '/consultoria-estrategica', cta: 'Ver cómo automatizar' },
    { key: 'implementar-ia', icon: BrainCircuit, problem: 'No sabemos cómo implementar IA', detail: 'Sabes que la IA importa, pero no sabes por dónde empezar ni qué es real y qué es humo.', href: '/capacitacion-ia', cta: 'Ver capacitación e IA aplicada' },
    { key: 'diagnostico', icon: Compass, problem: 'No sabemos qué necesita la empresa', detail: 'Sientes que algo no funciona, pero no tienes claro cuál es el problema de fondo a resolver primero.', href: '/soluciones/diagnostico-empresarial', cta: 'Empezar por un diagnóstico' },
  ] : lang === 'pt' ? [
    { key: 'mas-clientes', icon: Users, problem: 'Não chegam clientes suficientes', detail: 'Você tem um bom produto, mas o fluxo de novos clientes é imprevisível ou insuficiente para crescer.', href: '/pt/seo-ecommerce', cta: 'Ver como atrair clientes' },
    { key: 'visibilidad-ia', icon: Search, problem: 'Não aparecemos no Google nem na IA', detail: 'Sua concorrência aparece primeiro no Google e é citada pelo ChatGPT ou Perplexity. Você não.', href: '/pt/o-que-e-geo', cta: 'Ver visibilidade no Google e IA' },
    { key: 'pagina-no-vende', icon: ShoppingCart, problem: 'Nossa página não vende', detail: 'Você recebe visitas, mas elas não viram vendas. Algo no site trava a decisão de compra.', href: '/pt/design-web', cta: 'Ver design que converte' },
    { key: 'automatizar', icon: Workflow, problem: 'Perdemos tempo em tarefas repetitivas', detail: 'A equipe (ou você) gasta horas em tarefas manuais que um sistema ou a IA poderiam fazer sozinhos.', href: '/pt/consultoria-estrategica', cta: 'Ver como automatizar' },
    { key: 'implementar-ia', icon: BrainCircuit, problem: 'Não sabemos como implementar IA', detail: 'Você sabe que a IA importa, mas não sabe por onde começar nem o que é real e o que é hype.', href: '/pt/treinamento-ia', cta: 'Ver treinamento e IA aplicada' },
    { key: 'diagnostico', icon: Compass, problem: 'Não sabemos do que a empresa precisa', detail: 'Você sente que algo não funciona, mas não tem claro qual é o problema de fundo a resolver primeiro.', href: '/pt/solucoes/diagnostico-empresarial', cta: 'Começar por um diagnóstico' },
  ] : [
    { key: 'mas-clientes', icon: Users, problem: 'Not enough clients are coming in', detail: 'You have a good product, but the flow of new clients is unpredictable or too small to grow.', href: '/en/services/ecommerce-seo', cta: 'See how to attract clients' },
    { key: 'visibilidad-ia', icon: Search, problem: "We don't show up on Google or in AI", detail: 'Your competitors rank first on Google and get cited by ChatGPT or Perplexity. You don\'t.', href: '/en/what-is-geo', cta: 'See visibility on Google & AI' },
    { key: 'pagina-no-vende', icon: ShoppingCart, problem: "Our website doesn't sell", detail: 'You get visits but they don\'t convert into sales. Something on the site blocks the buying decision.', href: '/en/services/web-design', cta: 'See design that converts' },
    { key: 'automatizar', icon: Workflow, problem: 'We waste time on repetitive tasks', detail: 'Your team (or you) spends hours on manual tasks a system or AI could handle on their own.', href: '/en/strategy-advisory', cta: 'See how to automate' },
    { key: 'implementar-ia', icon: BrainCircuit, problem: "We don't know how to implement AI", detail: 'You know AI matters, but not where to start or what\'s real versus hype.', href: '/en/ai-training', cta: 'See training & applied AI' },
    { key: 'diagnostico', icon: Compass, problem: "We don't know what the business needs", detail: 'You feel something is off, but you\'re not sure what the underlying problem to solve first is.', href: '/en/solutions/business-diagnosis', cta: 'Start with a diagnosis' },
  ];

  const seoTitle = lang === 'es' ? 'Soluciones por problema empresarial — Ferova'
    : lang === 'pt' ? 'Soluções por problema empresarial — Ferova'
    : 'Solutions by business problem — Ferova';
  const seoDesc = lang === 'es' ? 'Identifica qué frena tu empresa —clientes, visibilidad, conversión, automatización o IA— y encuentra el camino más corto para resolverlo con Ferova.'
    : lang === 'pt' ? 'Identifique o que trava a sua empresa —clientes, visibilidade, conversão, automação ou IA— e encontre o caminho mais curto para resolver com a Ferova.'
    : 'Identify what holds your business back —clients, visibility, conversion, automation or AI— and find the shortest path to solve it with Ferova.';
  const seoPath = lang === 'en' ? '/en/solutions' : lang === 'pt' ? '/pt/solucoes' : '/soluciones';

  const breadcrumbs = [
    { name: lang === 'es' ? 'Inicio' : lang === 'pt' ? 'Início' : 'Home', path: home || '/' },
    { name: lang === 'es' ? 'Soluciones' : lang === 'pt' ? 'Soluções' : 'Solutions', path: seoPath },
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

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {problems.map((p) => (
                <StaggerItem key={p.key}>
                  <ScaleOnHover>
                    <Link
                      to={p.href}
                      onClick={() => trackEvent('problem_selected', { source: 'soluciones', problem: p.key, language: lang })}
                      className="glass-card p-7 hover:border-gold/30 transition-all duration-300 group block h-full"
                    >
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-gold/10">
                        <p.icon className="w-6 h-6 text-gold" />
                      </div>
                      <h2 className="text-lg font-display font-bold mb-2 text-foreground">{p.problem}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.detail}</p>
                      <span className="inline-flex items-center gap-1 text-gold text-sm font-semibold group-hover:gap-2 transition-all">
                        {p.cta} <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Puente al método */}
        <section className="py-12 md:py-16 border-t border-border/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="glass-card max-w-3xl mx-auto p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">{copy.methodTitle}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">{copy.methodText}</p>
              <Link
                to={metodoHref}
                onClick={() => trackEvent('cta_clicked', { source: 'soluciones', label: 'ver_metodo', language: lang })}
                className="btn-outline-gold inline-flex items-center gap-2"
              >
                {copy.methodCta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 md:py-24 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-5 text-foreground">{copy.ctaTitle}</h2>
            <p className="text-lg max-w-xl mx-auto mb-10 text-muted-foreground">{copy.ctaText}</p>
            <Link
              to={contactoHref}
              onClick={() => trackEvent('cta_clicked', { source: 'soluciones_cta', label: 'contacto', language: lang })}
              className="btn-gold inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> {copy.ctaBtn}
            </Link>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </PageTransition>
  );
};

export default Soluciones;
