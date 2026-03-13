import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import AdBanner from '@/components/ui/ad-banner';
import { Link } from 'react-router-dom';
import { Palette, Layers, FileImage, BookOpen, MessageCircle } from 'lucide-react';

interface Props { lang?: 'es' | 'en'; }

const DisenoLogos = ({ lang = 'es' }: Props) => {
  const t = lang === 'es' ? {
    title: 'Diseño de Logos',
    sub: 'Identidad visual única y profesional que posiciona tu marca en la mente de tus clientes.',
    features: [
      { icon: Palette, title: 'Diseño conceptual', desc: 'Propuestas creativas basadas en los valores y personalidad de tu marca.' },
      { icon: Layers, title: 'Variaciones y aplicaciones', desc: 'Logo principal, secundario, iconográfico y variaciones de color.' },
      { icon: FileImage, title: 'Archivos editables', desc: 'Entrega en AI, EPS, SVG, PNG y PDF para cualquier uso.' },
      { icon: BookOpen, title: 'Manual de marca', desc: 'Guía completa con paleta de colores, tipografías y reglas de uso.' },
    ],
    cta: 'Solicitar cotización',
    ctaSecondary: 'Ver precios',
  } : {
    title: 'Logo Design',
    sub: 'Unique professional visual identity that positions your brand in customers\' minds.',
    features: [
      { icon: Palette, title: 'Conceptual design', desc: 'Creative proposals based on your brand\'s values and personality.' },
      { icon: Layers, title: 'Variations & applications', desc: 'Primary, secondary, icon and color variations of your logo.' },
      { icon: FileImage, title: 'Editable files', desc: 'Delivered in AI, EPS, SVG, PNG and PDF for any use.' },
      { icon: BookOpen, title: 'Brand manual', desc: 'Complete guide with color palette, typography and usage rules.' },
    ],
    cta: 'Request quote',
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
        <AdBanner slot="service-diseno-logos" className="max-w-4xl mx-auto mb-20" />
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default DisenoLogos;
