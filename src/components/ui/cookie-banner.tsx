import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export type CookieConsent = {
  version: '2.0';
  essential: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
  expiresAt: string;
};

const STORAGE_KEY = 'cookie_consent';
const CONSENT_MONTHS = 12;

export function getCookieConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const consent = JSON.parse(raw) as CookieConsent;
    if (consent.version !== '2.0' || !consent.expiresAt || Date.parse(consent.expiresAt) <= Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return consent;
  } catch { return null; }
}

function saveConsent(c: CookieConsent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: c }));
  applyConsent(c);
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer?.push(args));
}

function injectScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadAnalytics() {
  ensureGtag();
  injectScript('ferova-ga4', 'https://www.googletagmanager.com/gtag/js?id=G-FPTVQ5XHE6');
  window.gtag?.('js', new Date());
  window.gtag?.('config', 'G-FPTVQ5XHE6', { anonymize_ip: true });
  if (!document.getElementById('ferova-sortlist')) {
    const script = document.createElement('script');
    script.id = 'ferova-sortlist';
    script.async = true;
    script.src = 'https://collector.sortlist.com/releases/latest/radar.min.js';
    script.dataset.settings = JSON.stringify({ apiEndpoint: 'radar.sortlist.com', profileId: 'roMUHc2t0Ak', namespace: 'SortlistRadar', features: { sessionTracking: true, formTracking: true, clickTracking: true, downloadTracking: true } });
    document.head.appendChild(script);
  }
}

function loadMarketing() {
  if (document.getElementById('ferova-gtm')) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  injectScript('ferova-gtm', 'https://www.googletagmanager.com/gtm.js?id=GTM-59CS8MFN');
}

function clearOptionalCookies() {
  ['_ga', '_gid', '_gat', '_fbp', '_gcl_au'].forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
  });
}

function applyConsent(c: Pick<CookieConsent, 'analytics' | 'marketing'>) {
  ensureGtag();
  window.gtag?.('consent', 'update', {
    analytics_storage: c.analytics ? 'granted' : 'denied',
    ad_storage: c.marketing ? 'granted' : 'denied',
    ad_user_data: c.marketing ? 'granted' : 'denied',
    ad_personalization: c.marketing ? 'granted' : 'denied',
  });
  if (c.analytics) loadAnalytics();
  if (c.marketing) loadMarketing();
  if (!c.analytics && !c.marketing) clearOptionalCookies();
}

interface Props { lang?: 'es' | 'en' | 'pt'; }

const T = {
  es: {
    title: 'Tu privacidad, en pocas palabras',
    body: 'Las opcionales permanecen apagadas hasta que tú las autorices.',
    accept: 'Aceptar todas',
    essential: 'Rechazar opcionales',
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
    title: 'Your privacy, in brief',
    body: 'Essential storage keeps the site working. Analytics and marketing stay off until you allow them.',
    accept: 'Accept all',
    essential: 'Reject optional',
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
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [functional, setFunctional] = useState(false);

  const policyHref = lang === 'en' ? '/en/cookies' : lang === 'pt' ? '/pt/cookies' : '/cookies';

  useEffect(() => {
    ensureGtag();
    window.gtag?.('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', functionality_storage: 'granted', security_storage: 'granted' });
    const current = getCookieConsent();
    if (!current) {
      setVisible(true);
    } else {
      applyConsent(current);
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
      version: '2.0',
      essential: true,
      analytics: c.analytics ?? false,
      marketing: c.marketing ?? false,
      functional: c.functional ?? false,
      timestamp: new Date().toISOString(),
      expiresAt: new Date(new Date().setMonth(new Date().getMonth() + CONSENT_MONTHS)).toISOString(),
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
          className="cookie-consent-panel fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[90]"
        >
          <div className="bg-card border border-border rounded-2xl shadow-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="cookie-banner-icon w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-bold text-sm text-foreground">{t.title}</h3>
                  {!settingsOpen && <button onClick={essentialOnly} className="text-muted-foreground hover:text-foreground" aria-label={t.essential}><X className="w-4 h-4" /></button>}
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
                      <button onClick={acceptAll} className="text-xs px-4 py-2 rounded-full border border-gold bg-gold text-[#3c3c3b] font-semibold hover:bg-gold/90">{t.accept}</button>
                      <button onClick={essentialOnly} className="text-xs px-4 py-2 rounded-full border border-gold text-foreground font-semibold hover:bg-gold/10">
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
