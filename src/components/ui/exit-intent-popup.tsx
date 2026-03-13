import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Mail } from 'lucide-react';

interface Props {
  lang?: 'es' | 'en';
}

const ExitIntentPopup = ({ lang = 'es' }: Props) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const alreadyShown = sessionStorage.getItem('exit-intent-shown');
    if (alreadyShown) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        setShow(true);
        sessionStorage.setItem('exit-intent-shown', 'true');
      }
    };

    // Delay adding listener to avoid instant trigger
    const timeout = setTimeout(() => {
      document.addEventListener('mouseleave', handler);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mouseleave', handler);
    };
  }, [dismissed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Brevo API
    alert(lang === 'es' ? '¡Ebook enviado a tu correo!' : 'Ebook sent to your email!');
    setEmail('');
    setShow(false);
    setDismissed(true);
  };

  const close = () => { setShow(false); setDismissed(true); };

  const t = lang === 'es' ? {
    title: '¡Espera! Llévate un regalo',
    sub: 'Descarga gratis nuestra Guía SEO para E-commerce 2025 y empieza a posicionar tu tienda hoy.',
    placeholder: 'Tu correo electrónico',
    btn: 'Descargar Ebook Gratis',
    noThanks: 'No, gracias',
  } : {
    title: 'Wait! Take a free gift',
    sub: 'Download our free E-commerce SEO Guide 2025 and start ranking your store today.',
    placeholder: 'Your email address',
    btn: 'Download Free Ebook',
    noThanks: 'No, thanks',
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md rounded-2xl p-8 border"
            style={{
              background: 'hsl(243, 31%, 12%)',
              borderColor: 'hsla(45, 86%, 40%, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={close} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'hsla(45, 86%, 40%, 0.15)' }}>
                <BookOpen className="w-8 h-8" style={{ color: 'hsl(45, 86%, 40%)' }} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3" style={{ color: 'hsl(0, 0%, 95%)' }}>{t.title}</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'hsl(0, 0%, 60%)' }}>{t.sub}</p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder={t.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3 rounded-full text-sm focus:outline-none focus:ring-2 transition-all border"
                  style={{
                    background: 'hsla(243, 28%, 18%, 0.8)',
                    borderColor: 'hsla(243, 20%, 30%, 0.5)',
                    color: 'hsl(0, 0%, 95%)',
                  }}
                />
                <button type="submit" className="btn-gold w-full !py-3 flex items-center justify-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  {t.btn}
                </button>
              </form>

              <button onClick={close} className="mt-4 text-xs underline transition-colors" style={{ color: 'hsl(0, 0%, 50%)' }}>
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
