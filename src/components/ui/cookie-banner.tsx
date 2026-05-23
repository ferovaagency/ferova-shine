import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export type CookieConsent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
};

const STORAGE_KEY = 'cookie_consent';

export function getCookieConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsent;
  } catch { return null; }
}

function saveConsent(c: CookieConsent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: c }));
  applyAnalyticsConsent(c.analytics);
}

function applyAnalyticsConsent(allowed: boolean) {
  // Google Analytics consent mode v2
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('consent', 'update', {
      analytics_storage: allowed ? 'granted' : 'denied',
      ad_storage: allowed ? 'granted' : 'denied',
    });
  }
}

interface Props { lang?: 'es' | 'en' | 'pt'; }

const T = {
  es: {
    title: 'Usamos cookies',
    body: 'Usamos cookies esenciales para el funcionamiento del sitio y, con tu consentimiento, cookies analíticas y de marketing para mejorar tu experiencia.',
    accept: 'Aceptar todas',
    essential: 'Solo esenciales',
    configure: 'Configurar',
    policy: 'Política de cookies',
    save: 'Guardar preferencias',
    cats: {
      essential: { name: 'Esenciales', desc: 'Necesarias para el funcionamiento del sitio. Siempre activas.' },
      analytics: { name: 'Analíticas', desc: 'Google Analytics para medir tráfico y comportamiento.' },
      marketing: { name: 'Marketing', desc: 'Píxeles de Meta y remarketing.' },
      functional: { name: 'Funcionales', desc: 'Mejoras de experiencia: asesor IA, recordar preferencias.' },
    },
  },
  en: {
    title: 'We use cookies',
    body: 'We use essential cookies for the site to work and, with your consent, analytics and marketing cookies to improve your experience.',
    accept: 'Accept all',
    essential: 'Essential only',
    configure: 'Configure',
    policy: 'Cookie policy',
    save: 'Save preferences',
    cats: {
      essential: { name: 'Essential', desc: 'Required for the site to work. Always on.' },
      analytics: { name: 'Analytics', desc: 'Google Analytics to measure traffic and behavior.' },
      marketing: { name: 'Marketing', desc: 'Meta pixels and remarketing.' },
      functional: { name: 'Functional', desc: 'Experience improvements: AI advisor, preferences.' },
    },
  },
  pt: {
    title: 'Usamos cookies',
    body: 'Usamos cookies essenciais para o funcionamento do site e, com seu consentimento, cookies analíticos e de marketing para melhorar sua experiência.',
    accept: 'Aceitar tudo',
    essential: 'Só essenciais',
    configure: 'Configurar',
    policy: 'Política de cookies',
    save: 'Salvar preferências',
    cats: {
      essential: { name: 'Essenciais', desc: 'Necessárias para o site funcionar. Sempre ativas.' },
      analytics: { name: 'Analíticas', desc: 'Google Analytics para medir tráfego e comportamento.' },
      marketing: { name: 'Marketing', desc: 'Pixels Meta e remarketing.' },
      functional: { name: 'Funcionais', desc: 'Melhorias de experiência: consultor IA, preferências.' },
    },
  },
};

const CookieBanner = ({ lang = 'es' }: Props) => {
  const t = T[lang];
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const [functional, setFunctional] = useState(true);

  const policyHref = lang === 'en' ? '/en/cookies' : lang === 'pt' ? '/pt/cookies' : '/cookies';

  useEffect(() => {
    // Init GA consent mode default to denied until user accepts
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        wait_for_update: 500,
      });
    }
    const current = getCookieConsent();
    if (!current) {
      setVisible(true);
    } else {
      applyAnalyticsConsent(current.analytics);
      setAnalytics(current.analytics);
      setMarketing(current.marketing);
      setFunctional(current.functional);
    }

    const openSettings = () => { setSettingsOpen(true); setVisible(true); };
    window.addEventListener('open-cookie-settings', openSettings);
    return () => window.removeEventListener('open-cookie-settings', openSettings);
  }, []);

  const persist = useCallback((c: Partial<CookieConsent>) => {
    const next: CookieConsent = {
      essential: true,
      analytics: c.analytics ?? false,
      marketing: c.marketing ?? false,
      functional: c.functional ?? false,
      timestamp: new Date().toISOString(),
    };
    saveConsent(next);
    setVisible(false);
    setSettingsOpen(false);
  }, []);

  const acceptAll = () => { persist({ analytics: true, marketing: true, functional: true }); trackEvent('cookies_accepted_all'); };
  const essentialOnly = () => { persist({ analytics: false, marketing: false, functional: false }); trackEvent('cookies_accepted_essential'); };
  const saveCustom = () => { persist({ analytics, marketing, functional }); trackEvent('cookies_customized', { analytics, marketing, functional }); };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 22 }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[90]"
        >
          <div className="bg-card border border-border rounded-2xl shadow-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-bold text-sm text-foreground">{t.title}</h3>
                  {!settingsOpen && (
                    <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-foreground" aria-label="x">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {t.body}{' '}
                  <Link to={policyHref} className="underline text-gold">{t.policy}</Link>.
                </p>

                {settingsOpen && (
                  <div className="mt-4 space-y-3">
                    {([
                      { k: 'essential', val: true, dis: true, set: () => {} },
                      { k: 'analytics', val: analytics, dis: false, set: () => setAnalytics(v => !v) },
                      { k: 'marketing', val: marketing, dis: false, set: () => setMarketing(v => !v) },
                      { k: 'functional', val: functional, dis: false, set: () => setFunctional(v => !v) },
                    ] as const).map(({ k, val, dis, set }) => {
                      const cat = t.cats[k];
                      return (
                        <label key={k} className={`flex items-start gap-3 p-2 rounded-lg ${dis ? 'opacity-60' : 'cursor-pointer hover:bg-accent'}`}>
                          <input
                            type="checkbox" checked={val} disabled={dis} onChange={set}
                            className="mt-0.5 accent-gold"
                          />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-foreground">{cat.name}</p>
                            <p className="text-[11px] text-muted-foreground">{cat.desc}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {settingsOpen ? (
                    <button onClick={saveCustom} className="btn-gold text-xs !py-2 !px-4 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />{t.save}
                    </button>
                  ) : (
                    <>
                      <button onClick={acceptAll} className="btn-gold text-xs !py-2 !px-4">{t.accept}</button>
                      <button onClick={essentialOnly} className="text-xs px-4 py-2 rounded-full border border-border text-foreground hover:bg-accent">
                        {t.essential}
                      </button>
                      <button onClick={() => setSettingsOpen(true)} className="text-xs px-4 py-2 rounded-full text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                        <Settings className="w-3.5 h-3.5" />{t.configure}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
