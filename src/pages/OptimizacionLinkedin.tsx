import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { formatPrice, type Lang } from '@/lib/pricing';
import {
  Linkedin, Users, TrendingUp, Eye,
  MessageCircle, Briefcase,
} from 'lucide-react';
import { CheckList, CtaBand, FeraButton, IconTile, PageHero, Panel, Section } from '@/components/fx/primitives';

interface Props { lang?: Lang; }

const LINKEDIN_USD = 250;

const OptimizacionLinkedin = ({ lang = 'es' }: Props) => {
  const t = lang === 'es' ? {
    badge: 'Nuevo Servicio',
    title: 'Optimización de Perfil de LinkedIn',
    sub: 'Potencia tu marca personal y atrae oportunidades profesionales con un perfil optimizado estratégicamente.',
    planName: 'LinkedIn Pro',
    planDescPeriod: 'pago único',
    planDesc: 'Optimización completa de tu perfil profesional de LinkedIn.',
    features: [
      'Auditoría completa de tu perfil actual',
      'Redacción estratégica de headline y about',
      'Optimización SEO de keywords profesionales',
      'Diseño de banner profesional personalizado',
      'Estrategia de contenido (plan de 30 días)',
      'Optimización de experiencia y logros',
      'Recomendaciones de networking',
      'Sesión de seguimiento a 30 días',
    ],
    benefits: [
      { icon: Eye, title: 'Mayor visibilidad', desc: 'Aparece en más búsquedas de reclutadores y clientes potenciales.' },
      { icon: Users, title: 'Networking estratégico', desc: 'Atrae conexiones de valor que impulsen tu carrera o negocio.' },
      { icon: TrendingUp, title: 'Marca personal sólida', desc: 'Posiciónate como referente en tu industria con contenido estratégico.' },
      { icon: Briefcase, title: 'Más oportunidades', desc: 'Genera leads, ofertas laborales y alianzas de negocio.' },
    ],
    ctaBtn: 'Solicitar cotización',
    ctaTitle: '¿Listo para potenciar tu LinkedIn?',
    ctaSub: 'Agenda una asesoría gratuita y descubre cómo transformar tu perfil profesional.',
  } : {
    badge: 'New Service',
    title: 'LinkedIn Profile Optimization',
    sub: 'Boost your personal brand and attract professional opportunities with a strategically optimized profile.',
    planName: 'LinkedIn Pro',
    planDescPeriod: 'one-time',
    planDesc: 'Complete optimization of your professional LinkedIn profile.',
    features: [
      'Full audit of your current profile',
      'Strategic headline and about copywriting',
      'Professional keyword SEO optimization',
      'Custom professional banner design',
      'Content strategy (30-day plan)',
      'Experience and achievements optimization',
      'Networking recommendations',
      '30-day follow-up session',
    ],
    benefits: [
      { icon: Eye, title: 'Greater visibility', desc: 'Show up in more recruiter and potential client searches.' },
      { icon: Users, title: 'Strategic networking', desc: 'Attract valuable connections that boost your career or business.' },
      { icon: TrendingUp, title: 'Solid personal brand', desc: 'Position yourself as an industry leader with strategic content.' },
      { icon: Briefcase, title: 'More opportunities', desc: 'Generate leads, job offers and business partnerships.' },
    ],
    ctaBtn: 'Request a quote',
    ctaTitle: 'Ready to boost your LinkedIn?',
    ctaSub: 'Book a free consultation and discover how to transform your professional profile.',
  };

  const whatsappUrl = 'https://wa.me/17866894686?text=' + encodeURIComponent(
    lang === 'es' ? 'Hola Ferova, me interesa la optimización de LinkedIn.' : 'Hi Ferova, I\'m interested in LinkedIn optimization.'
  );

  const path = lang === 'en' ? '/en/services/linkedin-optimization' : lang === 'pt' ? '/pt/linkedin' : '/servicios/optimizacion-linkedin';
  const home = lang === 'en' ? { name: 'Home', path: '/en' } : lang === 'pt' ? { name: 'Início', path: '/pt' } : { name: 'Inicio', path: '/' };
  const crumbs = [{ name: t.title, path }];
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t.title,
    description: t.sub,
    url: `https://seoparaecommerce.co${path}`,
    provider: { '@type': 'Organization', '@id': 'https://seoparaecommerce.co/#organization', name: 'Ferova Agency' },
    offers: { '@type': 'Offer', name: t.planName, price: String(LINKEDIN_USD), priceCurrency: 'USD' },
  };

  return (
    <div className="fx-site min-h-screen">
      <SEO
        title={`${t.title} — Ferova Agency`}
        description={t.sub}
        path={path}
        lang={lang}
        jsonLd={serviceLd}
        breadcrumbs={[home, ...crumbs]}
      />
      <Header lang={lang} />
      <main id="contenido-principal" className="pt-20">
        <PageHero eyebrow={t.badge} title={t.title} intro={t.sub} breadcrumbs={crumbs} lang={lang}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fx-btn">
            <Linkedin aria-hidden="true" />
            {t.ctaBtn}
          </a>
        </PageHero>

        {/* Benefits */}
        <Section>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.benefits.map((b) => (
              <Panel key={b.title}>
                <IconTile icon={b.icon} />
                <h3>{b.title}</h3>
                <p className="fx-muted mt-3 text-sm leading-relaxed">{b.desc}</p>
              </Panel>
            ))}
          </div>
        </Section>

        {/* Plan */}
        <Section tone="surface">
          <div className="fx-light mx-auto flex max-w-lg flex-col rounded-[1.25rem] border-t-[3px] border-[#541014] bg-white p-8 shadow-[0_24px_60px_rgb(47_45_86/13%)] sm:p-10">
            <span className="status-badge w-fit !text-xs">Plan Único</span>
            <h2 className="mt-6 text-2xl">{t.planName}</h2>
            <p className="fx-muted mt-2 text-sm">{t.planDesc}</p>
            <p className="mt-6">
              <span className="text-4xl font-semibold tabular-nums" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>
                {formatPrice(LINKEDIN_USD, lang)}
              </span>
              <span className="fx-muted mt-1 block text-sm">{t.planDescPeriod}</span>
            </p>
            <CheckList className="mt-6" items={t.features} />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fx-btn mt-8 w-full"
            >
              <MessageCircle aria-hidden="true" />
              {t.ctaBtn}
            </a>
          </div>
        </Section>

        {/* CTA */}
        <CtaBand title={t.ctaTitle} body={t.ctaSub}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fx-btn">
            <MessageCircle aria-hidden="true" />
            {t.ctaBtn}
          </a>
          <FeraButton variant="outline" source="service_linkedin" prompt={t.title}>
            {lang === 'es' ? 'Hablar con Fera' : 'Talk to Fera'}
          </FeraButton>
        </CtaBand>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default OptimizacionLinkedin;
