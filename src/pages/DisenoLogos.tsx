import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdBanner from '@/components/ui/ad-banner';
import { Palette, Layers, FileImage, BookOpen, MessageCircle, Zap, ArrowRight, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatPrice, type Lang } from '@/lib/pricing';

interface Props { lang?: Lang; }

const LOGO_USD = 250;

const DisenoLogos = ({ lang = 'es' }: Props) => {
  const { toast } = useToast();

  const t = lang === 'es' ? {
    title: 'Diseño de Logos & Branding',
    sub: 'Identidad visual única y profesional que posiciona tu marca.',
    whatIncludes: '¿Qué incluye?',
    features: [
      { icon: Palette, title: 'Diseño conceptual', desc: 'Propuestas creativas basadas en los valores de tu marca.' },
      { icon: Layers, title: 'Variaciones y aplicaciones', desc: 'Logo principal, secundario, iconográfico y variaciones de color.' },
      { icon: FileImage, title: 'Archivos editables', desc: 'AI, EPS, SVG, PNG y PDF para cualquier uso.' },
      { icon: BookOpen, title: 'Manual de marca', desc: 'Guía con paleta de colores, tipografías y reglas de uso.' },
    ],
    planTitle: 'Plan Branding Essential',
    planTagline: 'Una identidad que proyecta autoridad y profesionalismo desde el primer contacto.',
    planCta: 'Completar Briefing',
    planIncludes: [
      { icon: Palette, text: 'Logo principal + variaciones' },
      { icon: Zap, text: 'Paleta de colores + tipografía' },
      { icon: ArrowRight, text: 'Archivos editables (AI/SVG)' },
    ],
    planExcludes: ['Registro legal de marca', 'Manual de marca extendido', 'Papelería corporativa'],
    noInclude: 'No incluye:',
    period: '/ pago único',
  } : lang === 'pt' ? {
    title: 'Design de Logos & Branding',
    sub: 'Identidade visual única e profissional que posiciona sua marca.',
    whatIncludes: 'O que inclui?',
    features: [
      { icon: Palette, title: 'Design conceitual', desc: 'Propostas criativas baseadas nos valores da sua marca.' },
      { icon: Layers, title: 'Variações e aplicações', desc: 'Logo principal, secundário, iconográfico e variações de cor.' },
      { icon: FileImage, title: 'Arquivos editáveis', desc: 'AI, EPS, SVG, PNG e PDF para qualquer uso.' },
      { icon: BookOpen, title: 'Manual de marca', desc: 'Guia com paleta de cores, tipografias e regras de uso.' },
    ],
    planTitle: 'Plano Branding Essential',
    planTagline: 'Uma identidade que projeta autoridade e profissionalismo desde o primeiro contato.',
    planCta: 'Preencher Briefing',
    planIncludes: [
      { icon: Palette, text: 'Logo principal + variações' },
      { icon: Zap, text: 'Paleta de cores + tipografia' },
      { icon: ArrowRight, text: 'Arquivos editáveis (AI/SVG)' },
    ],
    planExcludes: ['Registro legal de marca', 'Manual de marca estendido', 'Papelaria corporativa'],
    noInclude: 'Não inclui:',
    period: '/ pagamento único',
  } : {
    title: 'Logo Design & Branding',
    sub: 'Unique professional visual identity that positions your brand.',
    whatIncludes: 'What\'s included?',
    features: [
      { icon: Palette, title: 'Conceptual design', desc: 'Creative proposals based on your brand values.' },
      { icon: Layers, title: 'Variations & applications', desc: 'Primary, secondary, icon and color variations.' },
      { icon: FileImage, title: 'Editable files', desc: 'AI, EPS, SVG, PNG and PDF for any use.' },
      { icon: BookOpen, title: 'Brand manual', desc: 'Guide with color palette, typography and usage rules.' },
    ],
    planTitle: 'Branding Essential Plan',
    planTagline: 'An identity that projects authority and professionalism from first contact.',
    planCta: 'Complete Briefing',
    planIncludes: [
      { icon: Palette, text: 'Main logo + variations' },
      { icon: Zap, text: 'Color palette + typography' },
      { icon: ArrowRight, text: 'Editable files (AI/SVG)' },
    ],
    planExcludes: ['Legal trademark registration', 'Extended brand manual', 'Corporate stationery'],
    noInclude: 'Does not include:',
    period: '/ one-time',
  };

  const waUrl = 'https://wa.link/jvbd4j?text=' + encodeURIComponent(
    lang === 'es' ? 'Hola Ferova, me interesa Branding Essential.'
    : lang === 'pt' ? 'Olá Ferova, tenho interesse no Branding Essential.'
    : 'Hi Ferova, I want the Branding Essential plan.'
  );

  const handleCta = () => {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    toast({
      title: lang === 'es' ? '¡Confirmado!' : lang === 'pt' ? 'Confirmado!' : 'Confirmed!',
      description: lang === 'es' ? 'Te contactaremos pronto.' : lang === 'pt' ? 'Entraremos em contato em breve.' : 'We\'ll contact you soon.',
    });
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
          </div>
        </section>

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

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t.planTitle}</h2>
            <div className="max-w-lg mx-auto glass-card p-10 border-gold/30 gold-glow">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                <Palette className="w-7 h-7 text-gold" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 text-center">{t.planTagline}</p>
              <div className="text-center mb-6">
                <span className="text-4xl font-display font-bold">{formatPrice(LOGO_USD, lang)}</span>
                <span className="text-muted-foreground text-sm ml-1">{t.period}</span>
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
    </>
  );
};

export default DisenoLogos;
