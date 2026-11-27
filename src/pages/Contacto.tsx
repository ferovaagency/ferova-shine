import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, MessageCircle, MapPin, Send, CheckCircle2 } from 'lucide-react';
import SEO from '@/components/SEO';
import { trackEvent } from '@/lib/analytics';
import { logLead } from '@/lib/adminInbox';
import { PageHero, Section } from '@/components/fx/primitives';

const WHATSAPP_URL = 'https://wa.me/17866894686';

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

  const inputCls = "w-full rounded-xl border border-[#dfdcea] bg-white px-4 py-3 text-sm text-[#1f1e2b] placeholder:text-[#585665]/70 transition-colors focus:border-[#541014] focus:outline-none focus:ring-2 focus:ring-[#541014]/30";
  const labelCls = "mb-2 block text-sm font-semibold text-[#1f1e2b]";

  const seo = lang === 'en'
    ? { t: 'Contact — Ferova Agency', d: 'Tell us about your e-commerce project. We reply in under 24 hours via WhatsApp or email.', p: '/contact' }
    : lang === 'pt'
    ? { t: 'Contato — Ferova Agency', d: 'Conte-nos sobre seu projeto de e-commerce. Respondemos em menos de 24 horas pelo WhatsApp ou e-mail.', p: '/pt/contato' }
    : { t: 'Contacto — Ferova Agency', d: 'Cuéntanos sobre tu proyecto de e-commerce. Respondemos en menos de 24 horas por WhatsApp o email.', p: '/contacto' };

  const home = lang === 'en' ? { name: 'Home', path: '/en' } : lang === 'pt' ? { name: 'Início', path: '/pt' } : { name: 'Inicio', path: '/' };
  const crumbName = lang === 'en' ? 'Contact' : lang === 'pt' ? 'Contato' : 'Contacto';
  const crumbs = [{ name: crumbName, path: seo.p }];
  const contactLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: seo.t,
    description: seo.d,
    url: `https://seoparaecommerce.co${seo.p}`,
    inLanguage: lang,
    about: {
      '@type': 'Organization',
      name: 'Ferova Agency',
      email: 'gerencia@seoparaecommerce.co',
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', url: WHATSAPP_URL, email: 'gerencia@seoparaecommerce.co' },
      address: { '@type': 'PostalAddress', streetAddress: 'Cra. 7 #158-78, North Point, Torre 2, Of. 1002', addressLocality: 'Bogotá', addressCountry: 'CO' },
    },
  };

  return (
    <div className="fx-site min-h-screen">
      <SEO title={seo.t} description={seo.d} path={seo.p} lang={lang} jsonLd={contactLd} breadcrumbs={[home, ...crumbs]} />
      <Header lang={lang} />
      <main id="contenido-principal" className="pt-20">
        <PageHero eyebrow={crumbName} title={t.title} intro={t.sub} breadcrumbs={crumbs} lang={lang} />

        <Section tone="surface">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5">
            {sent ? (
              <div className="fx-light flex flex-col items-center justify-center rounded-[1.25rem] bg-white p-8 text-center shadow-[0_24px_60px_rgb(47_45_86/13%)] md:p-10 lg:col-span-3">
                <span className="icon-tile !mb-5 !bg-[#f6f5fb]"><CheckCircle2 aria-hidden="true" strokeWidth={1.5} /></span>
                <h2 className="mb-3 text-2xl">
                  {lang === 'es' ? '¡Mensaje en camino!' : lang === 'pt' ? 'Mensagem a caminho!' : 'Message on its way!'}
                </h2>
                <p className="fx-muted max-w-md">
                  {lang === 'es' ? 'Abrimos WhatsApp con tu mensaje para que lo envíes y te respondamos en menos de 24 horas. Si no se abrió, escríbenos directo.'
                    : lang === 'pt' ? 'Abrimos o WhatsApp com sua mensagem para você enviar e respondermos em menos de 24 horas. Se não abriu, fale conosco direto.'
                    : 'We opened WhatsApp with your message so you can send it and we reply within 24 hours. If it did not open, message us directly.'}
                </p>
                <a href="https://wa.me/17866894686" target="_blank" rel="noopener noreferrer" className="fx-btn mt-6">
                  <MessageCircle aria-hidden="true" /> WhatsApp
                </a>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="fx-light space-y-5 rounded-[1.25rem] bg-white p-6 shadow-[0_24px_60px_rgb(47_45_86/13%)] sm:p-8 md:p-10 lg:col-span-3">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={labelCls}>{t.name}</label>
                  <input id="contact-name" name="name" autoComplete="name" type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelCls}>{t.email}</label>
                  <input id="contact-email" name="email" autoComplete="email" type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-website" className={labelCls}>{t.website}</label>
                  <input id="contact-website" name="website" autoComplete="url" type="url" placeholder="https://" value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="contact-country" className={labelCls}>{t.country}</label>
                  <input id="contact-country" name="country" autoComplete="country-name" type="text" required value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div>
                <label htmlFor="contact-budget" className={labelCls}>{t.budget}</label>
                <select id="contact-budget" name="budget" required value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })} className={inputCls}>
                  {t.budgetOptions.map((opt, i) => (<option key={i} value={i === 0 ? '' : opt} disabled={i === 0}>{opt}</option>))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className={labelCls}>{t.message}</label>
                <textarea id="contact-message" name="message" required rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className={inputCls + ' resize-none'} />
              </div>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-[#585665]">
                <input type="checkbox" required checked={formData.consent} onChange={e => setFormData({ ...formData, consent: e.target.checked })} className="mt-1 h-4 w-4 rounded border-[#dfdcea] accent-[#541014]" />
                <span>{t.consent}{' '}<a href={lang === 'es' ? '/privacidad' : lang === 'pt' ? '/pt/termos' : '/en/privacy'} className="font-semibold text-[#541014] underline underline-offset-2">{t.consentLink}</a>.</span>
              </label>
              <button type="submit" disabled={sending} className="fx-btn w-full disabled:opacity-60">
                <Send aria-hidden="true" /> {sending ? t.sending : t.send}
              </button>
            </form>
            )}

            <div className="space-y-4 lg:col-span-2">
              <h2 className="mb-2 text-xl">{t.contactTitle}</h2>
              <a href="https://wa.me/17866894686" target="_blank" rel="noopener noreferrer" className="link-tile !flex items-center gap-4">
                <MessageCircle aria-hidden="true" className="h-6 w-6 shrink-0" strokeWidth={1.5} />
                <span><span className="block font-semibold">{t.whatsapp}</span><span className="fx-muted block text-sm">{t.whatsappDesc}</span></span>
              </a>
              <a href="mailto:gerencia@seoparaecommerce.co" className="link-tile !flex items-center gap-4">
                <Mail aria-hidden="true" className="h-6 w-6 shrink-0" strokeWidth={1.5} />
                <span><span className="block font-semibold">{t.emailTitle}</span><span className="fx-muted block text-sm">{t.emailDesc}</span></span>
              </a>
              <div className="flex items-center gap-4 rounded-2xl bg-white px-[1.35rem] py-[1.1rem]">
                <MapPin aria-hidden="true" className="h-6 w-6 shrink-0 text-[#541014]" strokeWidth={1.5} />
                <div><p className="font-semibold">North Point, Torre 2, Of. 1002</p><p className="fx-muted text-sm">Cra. 7 #158-78, Bogotá · {lang === 'en' ? 'Visits by appointment' : lang === 'pt' ? 'Visitas com agendamento' : 'Visitas con cita previa'}</p></div>
              </div>
              <p className="fx-muted pt-2 text-sm">{t.location}</p>
            </div>
          </div>
        </Section>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Contacto;
