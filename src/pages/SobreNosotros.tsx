import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Target, TrendingUp, Heart, BookOpen, Users, Handshake, Eye, MessageCircle, Linkedin, ExternalLink } from 'lucide-react';
import SEO from '@/components/SEO';
import TeamSection from '@/components/sections/TeamSection';
import mafeHero from '@/assets/mafe-ferova-hero.webp';
import { CtaBand, Eyebrow, FeraButton, IconTile, PageHero, Panel, Section, SectionHeading } from '@/components/fx/primitives';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const SobreNosotros = ({ lang = 'es' }: Props) => {
  const t = lang === 'es' ? {
    badge: 'Agencia Boutique de SEO para Ecommerce',
    title: 'Sobre Ferova Agency', sub: 'Nacimos en septiembre de 2025 para aumentar las ventas de los Ecommerce con SEO especializado.',
    identity: 'Somos una Agencia Boutique de SEO para Ecommerce con un modelo de éxito compartido. Tu crecimiento es nuestro crecimiento.',
    missionTitle: 'Misión', mission: 'Aumentar las ventas de los Ecommerce con SEO especializado.',
    visionTitle: 'Visión', vision: 'Para 2027, ser la firma boutique de SEO referente en Colombia y Florida (EE. UU.).',
    valuesTitle: 'Nuestros valores',
    values: [
      { icon: Target, title: 'Claridad', desc: 'Comunicamos de manera simple y directa. Nada de jerga técnica innecesaria.' },
      { icon: TrendingUp, title: 'Impacto', desc: 'Nos enfocamos en métricas que realmente importan: tráfico y ventas.' },
      { icon: Heart, title: 'Partnership', desc: 'Trabajamos como una extensión de tu equipo, no como un proveedor externo.' },
      { icon: BookOpen, title: 'Aprendizaje constante', desc: 'El SEO evoluciona cada día. Nosotros también. Innovación continua.' },
    ],
    diffTitle: 'Lo que hace diferente a Ferova Agency', diffSub: 'No creemos en soluciones genéricas. Trabajamos con estrategias personalizadas; ganamos si tú ganas.',
    differentiators: [
      { icon: Target, title: 'Modelo basado en resultados', desc: 'Nuestro éxito se mide por el tuyo. Alineamos nuestros objetivos con los de tu negocio.' },
      { icon: Users, title: 'Involucramiento total', desc: 'Trabajamos como una extensión de tu equipo con dedicación completa.' },
      { icon: Handshake, title: 'Aliados estratégicos', desc: 'Más que proveedores, somos socios en tu crecimiento digital.' },
      { icon: Eye, title: 'Transparencia sin tecnicismos', desc: 'Comunicación clara. Entenderás cada decisión y cada resultado.' },
    ],
    linkedinTitle: 'Conoce a Maria Fer Calderón', linkedinSub: 'Fundadora y estratega SEO de Ferova Agency', linkedinRole: 'SEO Strategist & Founder',
    linkedinBio: 'Especialista en SEO para E-commerce con experiencia en posicionamiento orgánico, pauta digital y diseño web. Apasionada por transformar negocios digitales con estrategias basadas en datos.',
    linkedinBtn: 'Ver perfil en LinkedIn',
    ctaTitle: '¿Listo para hacer crecer tu e-commerce?', ctaSub: 'Solicita una cotización y recibe alcance, precio y próximos pasos.', ctaBtn: 'Solicitar cotización',
  } : lang === 'pt' ? {
    badge: 'Agência Boutique de SEO para E-commerce',
    title: 'Sobre a Ferova Agency', sub: 'Nascemos em setembro de 2025 para aumentar as vendas dos e-commerces com SEO especializado.',
    identity: 'Somos uma agência boutique de SEO para e-commerce com um modelo de sucesso compartilhado. Seu crescimento é nosso crescimento.',
    missionTitle: 'Missão', mission: 'Aumentar as vendas dos e-commerces com SEO especializado.',
    visionTitle: 'Visão', vision: 'Até 2027, ser a firma boutique de SEO referência na Colômbia e na Flórida (EUA).',
    valuesTitle: 'Nossos valores',
    values: [
      { icon: Target, title: 'Clareza', desc: 'Comunicamos de forma simples e direta. Nada de jargão técnico desnecessário.' },
      { icon: TrendingUp, title: 'Impacto', desc: 'Focamos nas métricas que realmente importam: tráfego e vendas.' },
      { icon: Heart, title: 'Parceria', desc: 'Trabalhamos como uma extensão da sua equipe, não como um fornecedor externo.' },
      { icon: BookOpen, title: 'Aprendizado constante', desc: 'O SEO evolui todos os dias. Nós também. Inovação contínua.' },
    ],
    diffTitle: 'O que diferencia a Ferova Agency', diffSub: 'Não acreditamos em soluções genéricas. Trabalhamos com estratégias personalizadas; ganhamos se você ganha.',
    differentiators: [
      { icon: Target, title: 'Modelo baseado em resultados', desc: 'Nosso sucesso é medido pelo seu. Alinhamos nossos objetivos com os do seu negócio.' },
      { icon: Users, title: 'Envolvimento total', desc: 'Trabalhamos como uma extensão da sua equipe com dedicação completa.' },
      { icon: Handshake, title: 'Aliados estratégicos', desc: 'Mais que fornecedores, somos parceiros no seu crescimento digital.' },
      { icon: Eye, title: 'Transparência sem jargões', desc: 'Comunicação clara. Você vai entender cada decisão e cada resultado.' },
    ],
    linkedinTitle: 'Conheça Maria Fer Calderón', linkedinSub: 'Fundadora e estrategista SEO da Ferova Agency', linkedinRole: 'SEO Strategist & Founder',
    linkedinBio: 'Especialista em SEO para e-commerce com experiência em posicionamento orgânico, tráfego pago e desenvolvimento web. Apaixonada por transformar negócios digitais com estratégias baseadas em dados.',
    linkedinBtn: 'Ver perfil no LinkedIn',
    ctaTitle: 'Pronto para fazer seu e-commerce crescer?', ctaSub: 'Agende uma consultoria gratuita e descubra quanto sua loja virtual pode crescer.', ctaBtn: 'Solicitar orçamento',
  } : {
    badge: 'Boutique E-commerce SEO Agency',
    title: 'About Ferova Agency', sub: 'We were born in September 2025 to increase E-commerce sales through specialized SEO.',
    identity: 'We are a Boutique E-commerce SEO Agency with a shared success model. Your growth is our growth.',
    missionTitle: 'Mission', mission: 'Increase E-commerce sales through specialized SEO.',
    visionTitle: 'Vision', vision: 'By 2027, become the leading boutique SEO firm in Colombia and Florida (USA).',
    valuesTitle: 'Our values',
    values: [
      { icon: Target, title: 'Clarity', desc: 'We communicate simply and directly. No unnecessary jargon.' },
      { icon: TrendingUp, title: 'Impact', desc: 'We focus on metrics that truly matter: traffic and sales.' },
      { icon: Heart, title: 'Partnership', desc: 'We work as an extension of your team, not as an external vendor.' },
      { icon: BookOpen, title: 'Continuous learning', desc: 'SEO evolves every day. So do we. Continuous innovation.' },
    ],
    diffTitle: 'What makes Ferova Agency different', diffSub: "We don't believe in generic solutions. We work with personalized strategies; we win if you win.",
    differentiators: [
      { icon: Target, title: 'Results-based model', desc: 'Our success is measured by yours. We align our goals with your business.' },
      { icon: Users, title: 'Total involvement', desc: 'We work as an extension of your team with complete dedication.' },
      { icon: Handshake, title: 'Strategic allies', desc: 'More than providers, we are partners in your digital growth.' },
      { icon: Eye, title: 'Transparency without jargon', desc: 'Clear communication. You will understand every decision and result.' },
    ],
    linkedinTitle: 'Meet Maria Fer Calderón', linkedinSub: 'Founder & SEO Strategist at Ferova Agency', linkedinRole: 'SEO Strategist & Founder',
    linkedinBio: 'E-commerce SEO specialist with experience in organic positioning, digital advertising and web design. Passionate about transforming digital businesses with data-driven strategies.',
    linkedinBtn: 'View LinkedIn Profile',
    ctaTitle: 'Ready to grow your e-commerce?', ctaSub: 'Book a free consultation and discover how much your online store can grow.', ctaBtn: 'Request a quote',
  };

  const whatsappUrl = 'https://wa.me/17866894686?text=' + encodeURIComponent(
    lang === 'es' ? 'Hola Ferova, quiero agendar una asesoría.' : lang === 'pt' ? 'Olá Ferova, quero agendar uma consultoria.' : 'Hi Ferova, I want to book a consultation.'
  );

  const seo = lang === 'en'
    ? { t: 'About Ferova Agency — Boutique E-commerce SEO', d: 'Boutique e-commerce SEO agency founded by María Fer Calderón. Shared-success model focused on growing online stores.', p: '/en/about' }
    : lang === 'pt'
    ? { t: 'Sobre a Ferova Agency — Agência boutique de SEO', d: 'Agência boutique de SEO para e-commerce fundada por María Fer Calderón. Modelo de sucesso compartilhado focado em crescer lojas virtuais.', p: '/pt/sobre-nos' }
    : { t: 'Sobre Ferova Agency — Agencia boutique de SEO', d: 'Agencia boutique de SEO para ecommerce fundada por María Fer Calderón. Modelo de éxito compartido enfocado en crecer tiendas online.', p: '/nosotros' };

  const home = lang === 'en' ? { name: 'Home', path: '/en' } : lang === 'pt' ? { name: 'Início', path: '/pt' } : { name: 'Inicio', path: '/' };
  const crumbs = [{ name: t.title, path: seo.p }];
  const aboutLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: seo.t,
    description: seo.d,
    url: `https://seoparaecommerce.co${seo.p}`,
    inLanguage: lang,
    about: {
      '@type': 'Organization',
      name: 'Ferova Agency',
      founder: { '@type': 'Person', name: 'María Fer Calderón', sameAs: ['https://www.linkedin.com/in/maria-fer-calderon'] },
    },
  };

  return (
    <div className="fx-site min-h-screen">
      <SEO title={seo.t} description={seo.d} path={seo.p} lang={lang} jsonLd={aboutLd} breadcrumbs={[home, ...crumbs]} />
      <Header lang={lang} />
      <main id="contenido-principal" className="pt-20">
        <PageHero eyebrow={t.badge} title={t.title} intro={t.sub} breadcrumbs={crumbs} lang={lang} />

        <Section>
          <p className="mx-auto max-w-3xl text-center text-2xl leading-snug sm:text-3xl" style={{ fontFamily: 'Poppins, system-ui, sans-serif', fontWeight: 600 }}>
            {t.identity}
          </p>
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
            <Panel>
              <IconTile icon={Target} />
              <h2 className="text-2xl">{t.missionTitle}</h2>
              <p className="fx-muted mt-3 text-lg leading-relaxed">{t.mission}</p>
            </Panel>
            <Panel>
              <IconTile icon={Eye} />
              <h2 className="text-2xl">{t.visionTitle}</h2>
              <p className="fx-muted mt-3 text-lg leading-relaxed">{t.vision}</p>
            </Panel>
          </div>
        </Section>

        <Section tone="surface">
          <SectionHeading title={t.valuesTitle} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((v) => (
              <Panel key={v.title}>
                <IconTile icon={v.icon} />
                <h3>{v.title}</h3>
                <p className="fx-muted mt-3 text-sm leading-relaxed">{v.desc}</p>
              </Panel>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading title={t.diffTitle} intro={t.diffSub} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {t.differentiators.map((d) => (
              <Panel key={d.title}>
                <IconTile icon={d.icon} />
                <h3>{d.title}</h3>
                <p className="fx-muted mt-3 leading-relaxed">{d.desc}</p>
              </Panel>
            ))}
          </div>
        </Section>

        <Section tone="surface" className="relative overflow-hidden">
          <div className="dot-field absolute inset-0" aria-hidden="true" />
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div className="offset-visual">
              <figure className="portrait-card m-0">
                <img src={mafeHero} alt={`Maria Fer Calderón — ${t.linkedinRole}, Ferova Agency`} width={1536} height={1024} loading="lazy" />
                <figcaption>Bogotá, Colombia · Ferova Agency</figcaption>
              </figure>
            </div>
            <div>
              <Eyebrow className="mb-5">{t.linkedinSub}</Eyebrow>
              <h2 className="text-3xl leading-tight sm:text-4xl lg:text-5xl lg:leading-[1.15]">{t.linkedinTitle}</h2>
              <p className="mt-6 text-xl font-semibold" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>Maria Fer Calderón</p>
              <p className="mt-1 font-semibold text-[#541014]">{t.linkedinRole}</p>
              <p className="fx-muted mt-1 text-sm">Bogotá, Colombia · Ferova Agency</p>
              <p className="fx-muted mt-5 leading-relaxed sm:text-lg">{t.linkedinBio}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://www.linkedin.com/in/maria-fer-calderon" target="_blank" rel="noopener noreferrer" className="fx-btn">
                  <Linkedin aria-hidden="true" />
                  {t.linkedinBtn}
                  <ExternalLink aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Section>

        <TeamSection lang={lang} />

        <CtaBand title={t.ctaTitle} body={t.ctaSub}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fx-btn">
            <MessageCircle aria-hidden="true" />
            {t.ctaBtn}
          </a>
          <FeraButton variant="outline" source="about_agency_final">{lang === 'en' ? 'Talk to Fera' : lang === 'pt' ? 'Falar com a Fera' : 'Hablar con Fera'}</FeraButton>
        </CtaBand>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default SobreNosotros;
