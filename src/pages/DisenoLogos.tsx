import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import AdBanner from '@/components/ui/ad-banner';
import { Link } from 'react-router-dom';
import { Palette, Layers, FileImage, BookOpen, MessageCircle, Zap, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import { getPaymentLink } from '@/lib/payment-links';
import { useToast } from '@/hooks/use-toast';

interface Props { lang?: 'es' | 'en'; }

const DisenoLogos = ({ lang = 'es' }: Props) => {
  const [currency, setCurrency] = useState<'usd' | 'cop'>('usd');
  const { toast } = useToast();

  const handleCta = () => {
    const link = getPaymentLink('brandingEssential', currency);
    window.open(link, '_blank', 'noopener,noreferrer');
    toast({
      title: lang === 'es' ? '¡Confirmado!' : 'Confirmed!',
      description: lang === 'es'
        ? '¡Plan confirmado! En Ferova Agency estamos listos para empezar.'
        : 'Plan confirmed! At Ferova Agency we are ready to start.',
    });
  };

  const formatPrice = (usd: number, cop: number) => {
    if (currency === 'cop') return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(cop);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd);
  };

  const t = lang === 'es' ? {
    title: 'Diseño de Logos & Branding',
    sub: 'Identidad visual única y profesional que posiciona tu marca en la mente de tus clientes.',
    whatIncludes: '¿Qué incluye nuestro servicio?',
    features: [
      { icon: Palette, title: 'Diseño conceptual', desc: 'Propuestas creativas basadas en los valores y personalidad de tu marca.' },
      { icon: Layers, title: 'Variaciones y aplicaciones', desc: 'Logo principal, secundario, iconográfico y variaciones de color.' },
      { icon: FileImage, title: 'Archivos editables', desc: 'Entrega en AI, EPS, SVG, PNG y PDF para cualquier uso.' },
      { icon: BookOpen, title: 'Manual de marca', desc: 'Guía completa con paleta de colores, tipografías y reglas de uso.' },
    ],
    planTitle: 'Plan Branding Essential',
    planTagline: 'Tu marca es lo que dicen de ti cuando no estás. Ferova Agency crea una identidad que proyecta autoridad y profesionalismo.',
    planCta: 'Completar Briefing',
    planIncludes: [
      { icon: Palette, text: 'Logo principal + variaciones' },
      { icon: Zap, text: 'Paleta de colores + tipografía' },
      { icon: ArrowRight, text: 'Archivos editables (AI/SVG)' },
    ],
    planExcludes: ['Registro legal de marca', 'Manual de marca extendido', 'Papelería corporativa'],
    noInclude: 'No incluye:',
  } : {
    title: 'Logo Design & Branding',
    sub: 'Unique professional visual identity that positions your brand in customers\' minds.',
    whatIncludes: 'What does our service include?',
    features: [
      { icon: Palette, title: 'Conceptual design', desc: 'Creative proposals based on your brand\'s values and personality.' },
      { icon: Layers, title: 'Variations & applications', desc: 'Primary, secondary, icon and color variations of your logo.' },
      { icon: FileImage, title: 'Editable files', desc: 'Delivered in AI, EPS, SVG, PNG and PDF for any use.' },
      { icon: BookOpen, title: 'Brand manual', desc: 'Complete guide with color palette, typography and usage rules.' },
    ],
    planTitle: 'Branding Essential Plan',
    planTagline: 'Your brand is what people say about you when you\'re not in the room. Ferova Agency creates an identity that projects authority.',
    planCta: 'Complete Briefing',
    planIncludes: [
      { icon: Palette, text: 'Main logo + variations' },
      { icon: Zap, text: 'Color palette + typography' },
      { icon: ArrowRight, text: 'Editable files (AI/SVG)' },
    ],
    planExcludes: ['Legal trademark registration', 'Extended brand manual', 'Corporate stationery'],
    noInclude: 'Does not include:',
  };

  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">{t.sub}</p>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-gold">{t.whatIncludes}</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {t.features.map((f, i) => (
                <div key={i} className="glass-card p-8 hover:border-gold/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <f.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 text-foreground">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing: Branding Essential */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-6">{t.planTitle}</h2>
            <div className="flex items-center justify-center gap-1 p-1 rounded-full border border-border w-fit mx-auto mb-14">
              <button onClick={() => setCurrency('usd')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>USD</button>
              <button onClick={() => setCurrency('cop')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>COP</button>
            </div>
            <div className="max-w-lg mx-auto glass-card p-10 border-gold/30 gold-glow">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                <Palette className="w-7 h-7 text-gold" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 text-center">{t.planTagline}</p>
              <div className="text-center mb-6">
                <span className="text-4xl font-display font-bold">{formatPrice(150, 600000)}</span>
                <span className="text-muted-foreground text-sm ml-1">{lang === 'es' ? '/ pago único' : '/ one-time'}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {t.planIncludes.map((item, i) => {
                  const ItemIcon = item.icon;
                  return (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                      <ItemIcon className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {item.text}
                    </li>
                  );
                })}
              </ul>
              <div className="mb-8 pt-4 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-2">{t.noInclude}</p>
                <ul className="space-y-1.5">
                  {t.planExcludes.map((ex, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <X className="w-3 h-3 flex-shrink-0 opacity-50" /> {ex}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={handleCta} className="btn-gold w-full flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> {t.planCta}
              </button>
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
