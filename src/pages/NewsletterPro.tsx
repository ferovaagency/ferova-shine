import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface Props { lang?: 'es' | 'en' | 'pt' }

const PRICE_USD = 9;
const WA = `https://wa.link/bfq71f?text=${encodeURIComponent('Hola, quiero suscribirme a Ferova Pro')}`;

const NewsletterPro = ({ lang = 'es' }: Props) => {
  const onSubscribe = (source: string) => trackEvent('whatsapp_button_clicked', { source, label: 'newsletter_pro_subscribe' });

  return (
    <>
      <Helmet>
        <title>Ferova Pro — Newsletter premium de SEO + GEO + IAO para e-commerce</title>
        <meta name="description" content="Newsletter Pro: análisis de casos reales, plantillas, prompts, comunidad privada y office hours. Estrategias accionables cada semana." />
        <link rel="canonical" href="https://seoparaecommerce.co/newsletter-pro" />
      </Helmet>
      <Header currentLang={lang} />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="inline-block px-4 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs uppercase tracking-widest mb-6">
              Ferova Pro
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              El newsletter premium para quienes quieren <span className="text-gold">resultados reales</span>
            </h1>
            <p className="text-xl text-white/85 max-w-2xl mx-auto mb-8">
              Estrategias avanzadas de SEO + GEO + IAO, casos en profundidad, plantillas listas para usar y acceso a comunidad privada de e-commerce y emprendedores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={WA} target="_blank" rel="noopener noreferrer" onClick={() => onSubscribe('newsletter_pro_hero')}>
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-slate-950 font-bold text-lg px-8 py-6 gap-2">
                  <MessageCircle className="w-5 h-5" /> Suscribirme — US${PRICE_USD}/mes
                </Button>
              </a>
              <p className="text-sm text-white/60">Cancela cuando quieras</p>
            </div>
          </div>
        </section>

        {/* Qué incluye */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Lo que recibes cada semana
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '📊', title: 'Análisis profundo de un caso real', desc: 'Cada semana desmenuzamos un caso de e-commerce real con datos, decisiones y resultados.' },
                { icon: '🎯', title: 'Estrategias SEO + GEO + IAO accionables', desc: 'No teoría. Pasos exactos que puedes implementar el mismo día.' },
                { icon: '📝', title: 'Plantillas y prompts listos', desc: 'Para generar fichas, blogs, briefs, propuestas comerciales y respuestas de WhatsApp.' },
                { icon: '🔧', title: 'Reviews de herramientas con descuento', desc: 'Probamos por ti y negociamos descuentos exclusivos.' },
                { icon: '👥', title: 'Acceso a comunidad privada', desc: 'WhatsApp y grupos privados con otros emprendedores y nuestro equipo.' },
                { icon: '🎓', title: 'Office hours mensuales', desc: 'Sesión grupal en vivo para resolver dudas específicas tuyas.' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-muted/40 rounded-2xl border border-border">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free vs Pro */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Free vs Pro</h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold">Qué recibes</th>
                    <th className="p-4 font-semibold">Free</th>
                    <th className="p-4 font-semibold text-gold">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Newsletter semanal', '✓', '✓'],
                    ['Tips generales SEO', '✓', '✓'],
                    ['Análisis profundo de casos', '—', '✓'],
                    ['Plantillas y prompts', '—', '✓'],
                    ['Comunidad privada', '—', '✓'],
                    ['Office hours mensuales', '—', '✓'],
                    ['Descuentos en herramientas', '—', '✓'],
                  ].map(([label, free, pro], i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-4 text-foreground">{label}</td>
                      <td className="p-4 text-center text-muted-foreground">{free}</td>
                      <td className="p-4 text-center text-gold font-bold">{pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 bg-gold text-slate-950">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">Empieza hoy</h2>
            <p className="text-lg mb-8">Cancela cuando quieras. Acceso inmediato por WhatsApp.</p>
            <a href={WA} target="_blank" rel="noopener noreferrer" onClick={() => onSubscribe('newsletter_pro_final')}>
              <Button size="lg" className="bg-slate-950 text-white hover:bg-slate-800 font-bold text-lg px-10 gap-2">
                <MessageCircle className="w-5 h-5" /> Suscribirme a Ferova Pro
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </>
  );
};

export default NewsletterPro;
