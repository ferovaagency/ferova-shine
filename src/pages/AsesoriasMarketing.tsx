import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import AdBanner from '@/components/ui/ad-banner';
import { Link } from 'react-router-dom';
import { GraduationCap, Target, BarChart3, Users, MessageCircle } from 'lucide-react';

interface Props { lang?: 'es' | 'en'; }

const AsesoriasMarketing = ({ lang = 'es' }: Props) => {
  const t = lang === 'es' ? {
    title: 'Asesorías de Marketing Virtual',
    sub: 'Consultoría estratégica personalizada para escalar tu negocio digital con un plan de acción claro y medible.',
    features: [
      { icon: Target, title: 'Diagnóstico digital completo', desc: 'Análisis profundo de tu presencia online, competencia y oportunidades de crecimiento.' },
      { icon: BarChart3, title: 'Estrategia de crecimiento', desc: 'Plan personalizado con KPIs claros, timeline y acciones priorizadas.' },
      { icon: Users, title: 'Sesiones 1-a-1', desc: 'Reuniones virtuales personalizadas con nuestros expertos en marketing digital.' },
      { icon: GraduationCap, title: 'Capacitación', desc: 'Te enseñamos a usar las herramientas y métricas para que puedas escalar de forma independiente.' },
    ],
    cta: 'Agendar asesoría',
    ctaSecondary: 'Ver precios',
  } : {
    title: 'Marketing Consulting',
    sub: 'Personalized strategic consulting to scale your digital business with a clear and measurable action plan.',
    features: [
      { icon: Target, title: 'Complete digital diagnosis', desc: 'Deep analysis of your online presence, competition and growth opportunities.' },
      { icon: BarChart3, title: 'Growth strategy', desc: 'Personalized plan with clear KPIs, timeline and prioritized actions.' },
      { icon: Users, title: '1-on-1 sessions', desc: 'Personalized virtual meetings with our digital marketing experts.' },
      { icon: GraduationCap, title: 'Training', desc: 'We teach you to use tools and metrics so you can scale independently.' },
    ],
    cta: 'Schedule consulting',
    ctaSecondary: 'See pricing',
  };

  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">{t.sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> {t.cta}
              </a>
              <Link to={lang === 'es' ? '/precios' : '/en/pricing'} className="btn-outline-gold text-center">{t.ctaSecondary}</Link>
            </div>
          </div>
        </section>
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {t.features.map((f, i) => (
                <div key={i} className="glass-card p-8 hover:border-gold/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <f.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <AdBanner slot="service-asesorias" className="max-w-4xl mx-auto mb-20" />
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default AsesoriasMarketing;
