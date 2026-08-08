import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, MessageCircle, MapPin, Send, CheckCircle2 } from 'lucide-react';
import SEO from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/lib/analytics';
import { logLead } from '@/lib/adminInbox';

const WHATSAPP_URL = 'https://wa.me/17865787671';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const Contacto = ({ lang = 'es' }: Props) => {
  const [formData, setFormData] = useState({ name: '', email: '', website: '', country: '', budget: '', message: '', consent: false });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

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
  } : lang === 'pt' ? {
    title: 'Vamos falar sobre seu projeto',
    sub: 'Conte-nos o que você precisa. Responderemos em menos de 24 horas.',
    name: 'Nome completo', email: 'E-mail', website: 'Site atual (opcional)',
    country: 'País', budget: 'Orçamento estimado',
    budgetOptions: ['Selecione uma faixa', 'Menos de $500 USD', '$500 - $1.500 USD', '$1.500 - $5.000 USD', 'Mais de $5.000 USD'],
    message: 'Conte-nos sobre seu projeto',
    consent: 'Autorizo o tratamento dos meus dados pessoais de acordo com a',
    consentLink: 'Política de Privacidade', send: 'Enviar mensagem', sending: 'Enviando...',
    contactTitle: 'Outras formas de contato',
    whatsapp: 'WhatsApp', whatsappDesc: 'Resposta rápida',
    emailTitle: 'Email', emailDesc: 'Resposta em 24h',
    schedule: 'Agendar chamada', scheduleDesc: 'Escolha um horário',
    location: 'Bogotá, Colômbia · Miami, FL',
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

    // Entrega fiable del mensaje completo por WhatsApp (no hay sink de servidor;
    // el formulario ANTES solo hacía un setTimeout+alert y perdía todos los leads).
    // Se abre en el mismo gesto de submit para no ser bloqueado por el navegador.
    const waLines = [
      lang === 'es' ? 'Hola Ferova, escribo desde el formulario de contacto:'
        : lang === 'pt' ? 'Olá Ferova, escrevo pelo formulário de contato:'
        : 'Hi Ferova, I am writing from the contact form:',
      `• ${t.name}: ${formData.name}`,
      `• ${t.email}: ${formData.email}`,
      formData.website ? `• ${t.website}: ${formData.website}` : '',
      formData.country ? `• ${t.country}: ${formData.country}` : '',
      formData.budget ? `• ${t.budget}: ${formData.budget}` : '',
      `• ${t.message}: ${formData.message}`,
    ].filter(Boolean);
    const waUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(waLines.join('\n'))}`;
    window.open(waUrl, '_blank', 'noopener');

    // Captura del lead en Brevo con atributos seguros (LANG existe en la cuenta).
    try {
      await supabase.functions.invoke('brevo-sync', {
        body: { email: formData.email.trim(), name: formData.name.trim(), source: 'contact_form', attributes: { LANG: lang } },
      });
    } catch {
      /* no bloquear al usuario si Brevo falla: el mensaje ya salió por WhatsApp */
    }
    // Registro en la bandeja unificada del admin.
    await logLead({
      source: 'contact',
      name: formData.name,
      email: formData.email,
      summary: formData.message ? formData.message.slice(0, 160) : 'Solicitud de contacto',
      payload: {
        website: formData.website, country: formData.country, budget: formData.budget,
        message: formData.message, lang,
        page: typeof window !== 'undefined' ? window.location.pathname : undefined,
      },
    });
    trackEvent('lead_submitted', { source: 'contact_form', lang });
    setSending(false);
    setSent(true);
    setFormData({ name: '', email: '', website: '', country: '', budget: '', message: '', consent: false });
  };

  const inputCls = "w-full px-4 py-3 rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all border border-border/50 bg-background";

  const seo = lang === 'en'
    ? { t: 'Contact — Ferova Agency', d: 'Tell us about your e-commerce project. We reply in under 24 hours via WhatsApp or email.', p: '/contact' }
    : lang === 'pt'
    ? { t: 'Contato — Ferova Agency', d: 'Conte-nos sobre seu projeto de e-commerce. Respondemos em menos de 24 horas pelo WhatsApp ou e-mail.', p: '/pt/contato' }
    : { t: 'Contacto — Ferova Agency', d: 'Cuéntanos sobre tu proyecto de e-commerce. Respondemos en menos de 24 horas por WhatsApp o email.', p: '/contacto' };

  return (
    <>
      <SEO title={seo.t} description={seo.d} path={seo.p} lang={lang} />
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
              {sent ? (
                <div className="lg:col-span-3 glass-card p-8 md:p-10 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-8 h-8 text-gold" />
                  </div>
                  <h2 className="text-2xl font-display font-bold mb-3">
                    {lang === 'es' ? '¡Mensaje en camino!' : lang === 'pt' ? 'Mensagem a caminho!' : 'Message on its way!'}
                  </h2>
                  <p className="text-muted-foreground max-w-md">
                    {lang === 'es' ? 'Abrimos WhatsApp con tu mensaje para que lo envíes y te respondamos en menos de 24 horas. Si no se abrió, escríbenos directo.'
                      : lang === 'pt' ? 'Abrimos o WhatsApp com sua mensagem para você enviar e respondermos em menos de 24 horas. Se não abriu, fale conosco direto.'
                      : 'We opened WhatsApp with your message so you can send it and we reply within 24 hours. If it did not open, message us directly.'}
                  </p>
                  <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="btn-gold mt-6 inline-flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              ) : (
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
                  <span>{t.consent}{' '}<a href={lang === 'es' ? '/privacidad' : lang === 'pt' ? '/pt/termos' : '/en/privacy'} className="text-gold underline underline-offset-2">{t.consentLink}</a>.</span>
                </label>
                <button type="submit" disabled={sending} className="btn-gold w-full !py-4 flex items-center justify-center gap-2 disabled:opacity-60">
                  <Send className="w-4 h-4" /> {sending ? t.sending : t.send}
                </button>
              </form>
              )}

              <div className="lg:col-span-2 space-y-6">
                <h2 className="font-display font-semibold text-lg mb-2">{t.contactTitle}</h2>
                <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="glass-card p-5 flex items-center gap-4 hover:border-gold/30 transition-all block">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'hsla(142, 70%, 45%, 0.1)' }}>
                    <MessageCircle className="w-6 h-6" style={{ color: '#25D366' }} />
                  </div>
                  <div><p className="font-display font-semibold text-foreground">{t.whatsapp}</p><p className="text-muted-foreground text-sm">{t.whatsappDesc}</p></div>
                </a>
                <a href="mailto:gerencia@seoparaecommerce.co" className="glass-card p-5 flex items-center gap-4 hover:border-gold/30 transition-all block">
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
    </>
  );
};

export default Contacto;
