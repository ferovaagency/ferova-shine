import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/analytics';

interface Props {
  lang?: 'es' | 'en' | 'pt';
}

const T = {
  es: {
    title: 'Recibe el newsletter gratis de Ferova',
    sub: 'Estrategias reales de SEO, GEO e IAO para hacer crecer tu ecommerce. Cero spam, una vez por semana.',
    name: 'Tu nombre',
    email: 'Tu correo electrónico',
    consent: 'Autorizo el tratamiento de mis datos según la',
    privacy: 'política de privacidad',
    btn: 'Suscribirme gratis',
    noThanks: 'No quiero suscribirme',
    success: '¡Listo! Revisa tu correo.',
    error: 'Hubo un error. Intenta de nuevo.',
    consentRequired: 'Debes autorizar el tratamiento de datos.',
  },
  en: {
    title: 'Get the free Ferova newsletter',
    sub: 'Real SEO, GEO and AIO strategies to grow your ecommerce. Zero spam, once a week.',
    name: 'Your name',
    email: 'Your email',
    consent: 'I authorize the processing of my data according to the',
    privacy: 'privacy policy',
    btn: 'Subscribe for free',
    noThanks: "I don't want to subscribe",
    success: 'Done! Check your inbox.',
    error: 'There was an error. Try again.',
    consentRequired: 'You must authorize data processing.',
  },
  pt: {
    title: 'Receba o newsletter grátis da Ferova',
    sub: 'Estratégias reais de SEO, GEO e IAO para fazer seu ecommerce crescer. Zero spam, uma vez por semana.',
    name: 'Seu nome',
    email: 'Seu e-mail',
    consent: 'Autorizo o tratamento dos meus dados conforme a',
    privacy: 'política de privacidade',
    btn: 'Assinar grátis',
    noThanks: 'Não quero assinar',
    success: 'Pronto! Verifique sua caixa de entrada.',
    error: 'Houve um erro. Tente novamente.',
    consentRequired: 'Você precisa autorizar o tratamento de dados.',
  },
};

const ExitIntentPopup = ({ lang = 'es' }: Props) => {
  const t = T[lang];
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    if (sessionStorage.getItem('exit-intent-shown')) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        setShow(true);
        sessionStorage.setItem('exit-intent-shown', 'true');
      }
    };
    const timeout = setTimeout(() => {
      document.addEventListener('mouseleave', handler);
    }, 5000);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mouseleave', handler);
    };
  }, [dismissed]);

  const close = () => { setShow(false); setDismissed(true); };

  const privacyHref = lang === 'en' ? '/en/privacy' : lang === 'pt' ? '/pt/privacidade' : '/privacidad';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) { toast.error(t.consentRequired); return; }
    if (!email.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('brevo-sync', {
        body: { email: email.trim(), name: name.trim(), source: 'popup', attributes: { LANG: lang } },
      });
      if (error) throw error;
      toast.success(t.success);
      setName(''); setEmail(''); setConsent(false);
      close();
    } catch (err) {
      console.error(err);
      toast.error(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md rounded-2xl p-8 border bg-card border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={close} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Cerrar">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-gold/15">
                <Sparkles className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3 text-foreground">{t.title}</h3>
              <p className="text-sm leading-relaxed mb-6 text-muted-foreground">{t.sub}</p>

              <form onSubmit={handleSubmit} className="space-y-3 text-left">
                <input
                  type="text" required placeholder={t.name} value={name} onChange={(e) => setName(e.target.value)}
                  maxLength={120}
                  className="w-full px-5 py-3 rounded-full text-sm bg-background border border-border focus:outline-none focus:ring-2 focus:ring-gold/40 text-foreground"
                />
                <input
                  type="email" required placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)}
                  maxLength={254}
                  className="w-full px-5 py-3 rounded-full text-sm bg-background border border-border focus:outline-none focus:ring-2 focus:ring-gold/40 text-foreground"
                />
                <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer px-1">
                  <input
                    type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 accent-gold"
                  />
                  <span>
                    {t.consent}{' '}
                    <Link to={privacyHref} className="underline text-gold hover:text-gold/80" target="_blank" rel="noopener noreferrer">
                      {t.privacy}
                    </Link>.
                  </span>
                </label>
                <button type="submit" disabled={loading} className="btn-gold w-full !py-3 flex items-center justify-center gap-2 text-sm disabled:opacity-50">
                  <Mail className="w-4 h-4" />
                  {loading ? '...' : t.btn}
                </button>
              </form>

              <button onClick={close} className="mt-4 text-xs underline text-muted-foreground hover:text-foreground">
                {t.noThanks}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
