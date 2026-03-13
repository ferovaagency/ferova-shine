import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import AdBanner from '@/components/ui/ad-banner';
import { Tag, Wrench, Shield, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props { lang?: 'es' | 'en'; }

const DescuentosHerramientas = ({ lang = 'es' }: Props) => {
  const tools = [
    { name: 'SEMrush', category: 'SEO & Marketing', discount: '30%' },
    { name: 'Ahrefs', category: 'SEO & Backlinks', discount: '25%' },
    { name: 'Surfer SEO', category: 'Content Optimization', discount: '20%' },
    { name: 'Envato Elements', category: 'Design Assets', discount: '40%' },
    { name: 'Canva Pro', category: 'Design', discount: '35%' },
    { name: 'Jasper AI', category: 'AI Content', discount: '25%' },
  ];

  const t = lang === 'es' ? {
    title: 'Descuentos en Herramientas',
    sub: 'Accede a herramientas premium de marketing, SEO y productividad a precios exclusivos para clientes de Ferova.',
    toolsTitle: 'Herramientas disponibles',
    discount: 'Descuento',
    cta: 'Acceder a descuentos',
  } : {
    title: 'Tool Discounts',
    sub: 'Access premium marketing, SEO and productivity tools at exclusive prices for Ferova clients.',
    toolsTitle: 'Available tools',
    discount: 'Discount',
    cta: 'Access discounts',
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
            <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> {t.cta}
            </a>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-display font-bold text-center mb-16">{t.toolsTitle}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {tools.map((tool, i) => (
                <div key={i} className="glass-card p-6 hover:border-gold/30 transition-all duration-300 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <Tag className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-foreground">{tool.name}</h3>
                    <p className="text-muted-foreground text-xs">{tool.category}</p>
                  </div>
                  <div className="text-gold font-display font-bold text-lg">-{tool.discount}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AdBanner slot="service-descuentos" className="max-w-4xl mx-auto mb-20" />
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default DescuentosHerramientas;
