import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { Mail, MessageCircle, MapPin, Send, Calendar } from 'lucide-react';

interface Props { lang?: 'es' | 'en'; }

const Contacto = ({ lang = 'es' }: Props) => {
  const [formData, setFormData] = useState({ name: '', email: '', website: '', country: '', budget: '', message: '', consent: false });
  const [sending, setSending] = useState(false);

  const t = lang === 'es' ? {
    title: 'Hablemos de tu proyecto',
    sub: 'Cuéntanos qué necesitas. Te responderemos en menos de 24 horas.',
    name: 'Nombre completo', email: 'Correo electrónico', website: 'Sitio web actual (opcional)',
    country: 'País', budget: 'Presupuesto estimado',
    budgetOptions: ['Selecciona un rango', 'Menos de $500 USD', '$500 - $1,500 USD', '$1,500 - $5,000 USD', 'Más de $5,000 USD'],
    message: 'Cuéntanos sobre tu proyecto',
    consent: 'Autorizo el tratamiento de mis datos personales de acuerdo con la',
    consentLink: 'Política de Privacidad', send: 'Enviar mensaje', sending: 'Enviando...',
    contactTitle: 'Otras formas de contacto',
    whatsapp: 'WhatsApp', whatsappDesc: 'Respuesta rápida',
    emailTitle: 'Email', emailDesc: 'Respuesta en 24h',
    schedule: 'Agendar llamada', scheduleDesc: 'Elige un horario',
    location: 'Bogotá, Colombia · Miami, FL',
  } : {
    title: "Let's talk about your project",
    sub: "Tell us what you need. We'll respond within 24 hours.",
    name: 'Full name', email: 'Email address', website: 'Current website (optional)',
    country: 'Country', budget: 'Estimated budget',
    budgetOptions: ['Select a range', 'Under $500 USD', '$500 - $1,500 USD', '$1,500 - $5,000 USD', 'Over $5,000 USD'],
    message: 'Tell us about your project',
    consent: 'I authorize the processing of my personal data in accordance with the',
    consentLink: 'Privacy Policy', send: 'Send message', sending: 'Sending...',
    contactTitle: 'Other ways to reach us',
    whatsapp: 'WhatsApp', whatsappDesc: 'Quick response',
    emailTitle: 'Email', emailDesc: 'Response in 24h',
    schedule: 'Book a call', scheduleDesc: 'Pick a time',
    location: 'Bogotá, Colombia · Miami, FL',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    setSending(true);
    // TODO: Connect to Brevo API
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    alert(lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!');
    setFormData({ name: '', email: '', website: '', country: '', budget: '', message: '', consent: false });
  };

  const inputCls = "w-full px-4 py-3 rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all border border-border/50 bg-background";

  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-20 md:py-28 relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{t.title}</h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t.sub}</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
              <form onSubmit={handleSubmit} className="lg:col-span-3 glass-card p-8 md:p-10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input type="text" required placeholder={t.name} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
                  <input type="email" required placeholder={t.email} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputCls} />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <input type="url" placeholder={t.website} value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} className={inputCls} />
                  <input type="text" required placeholder={t.country} value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} className={inputCls} />
                </div>
                <select required value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })} className={inputCls}>
                  {t.budgetOptions.map((opt, i) => (<option key={i} value={i === 0 ? '' : opt} disabled={i === 0}>{opt}</option>))}
                </select>
                <textarea required rows={4} placeholder={t.message} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className={inputCls + ' resize-none'} />
                <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
                  <input type="checkbox" required checked={formData.consent} onChange={e => setFormData({ ...formData, consent: e.target.checked })} className="mt-1 rounded border-border" />
                  <span>{t.consent}{' '}<a href={lang === 'es' ? '/privacidad' : '/en/privacy'} className="text-gold underline underline-offset-2">{t.consentLink}</a>.</span>
                </label>
                <button type="submit" disabled={sending} className="btn-gold w-full !py-4 flex items-center justify-center gap-2 disabled:opacity-60">
                  <Send className="w-4 h-4" /> {sending ? t.sending : t.send}
                </button>
              </form>

              <div className="lg:col-span-2 space-y-6">
                <h3 className="font-display font-semibold text-lg mb-2">{t.contactTitle}</h3>
                <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="glass-card p-5 flex items-center gap-4 hover:border-gold/30 transition-all block">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'hsla(142, 70%, 45%, 0.1)' }}>
                    <MessageCircle className="w-6 h-6" style={{ color: '#25D366' }} />
                  </div>
                  <div><p className="font-display font-semibold text-foreground">{t.whatsapp}</p><p className="text-muted-foreground text-sm">{t.whatsappDesc}</p></div>
                </a>
                <a href="mailto:maria.fer@ferova.com.co" className="glass-card p-5 flex items-center gap-4 hover:border-gold/30 transition-all block">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div><p className="font-display font-semibold text-foreground">{t.emailTitle}</p><p className="text-muted-foreground text-sm">{t.emailDesc}</p></div>
                </a>
                <div className="glass-card p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div><p className="font-display font-semibold text-foreground">Bogotá, Colombia · Brasil · Estados Unidos</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default Contacto;
