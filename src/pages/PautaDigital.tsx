import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import AdBanner from '@/components/ui/ad-banner';
import { Link } from 'react-router-dom';
import { Target, BarChart3, Users, Megaphone, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';

interface Props { lang?: 'es' | 'en'; }

const PautaDigital = ({ lang = 'es' }: Props) => {
  const t = lang === 'es' ? {
    title: 'Pauta Digital',
    sub: 'Campañas publicitarias en Google, Meta, TikTok y LinkedIn diseñadas para maximizar tu ROI y generar ventas reales.',
    features: [
      { icon: Target, title: 'Google Ads & Shopping', desc: 'Campañas de búsqueda, display y shopping optimizadas para conversión.' },
      { icon: Users, title: 'Social Media Ads', desc: 'Facebook, Instagram, TikTok y LinkedIn Ads con segmentación avanzada.' },
      { icon: BarChart3, title: 'Remarketing', desc: 'Recupera visitantes que no convirtieron con estrategias de retargeting inteligente.' },
      { icon: Megaphone, title: 'Reporting en tiempo real', desc: 'Dashboards con métricas clave para tomar decisiones basadas en datos.' },
    ],
    cta: 'Solicitar propuesta',
    ctaSecondary: 'Ver precios',
  } : {
    title: 'Digital Advertising',
    sub: 'Ad campaigns on Google, Meta, TikTok and LinkedIn designed to maximize your ROI and drive real sales.',
    features: [
      { icon: Target, title: 'Google Ads & Shopping', desc: 'Search, display and shopping campaigns optimized for conversion.' },
      { icon: Users, title: 'Social Media Ads', desc: 'Facebook, Instagram, TikTok and LinkedIn Ads with advanced targeting.' },
      { icon: BarChart3, title: 'Remarketing', desc: 'Recover non-converting visitors with smart retargeting strategies.' },
      { icon: Megaphone, title: 'Real-time reporting', desc: 'Dashboards with key metrics for data-driven decisions.' },
    ],
    cta: 'Request proposal',
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

        <AdBanner slot="service-pauta-digital" className="max-w-4xl mx-auto mb-20" />
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default PautaDigital;
