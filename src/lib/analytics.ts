declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export type AnalyticsEvent =
  | 'page_view' | 'scroll_75' | 'time_on_page_60s'
  | 'popup_shown' | 'popup_closed' | 'newsletter_signup'
  | 'ai_assistant_opened' | 'ai_assistant_form_submitted' | 'ai_assistant_message_sent'
  | 'ai_assistant_escalated_whatsapp' | 'ai_assistant_product_card_clicked'
  | 'whatsapp_button_clicked' | 'cta_clicked' | 'pricing_card_clicked'
  | 'service_card_clicked' | 'case_study_clicked' | 'blog_clicked'
  | 'social_click'
  | 'resource_downloaded' | 'resource_external_clicked' | 'newsletter_pro_interested'
  | 'contact_form_submitted' | 'service_inquiry' | 'demo_requested'
  | 'cookies_accepted_all' | 'cookies_accepted_essential' | 'cookies_customized';

function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem('cookie_consent');
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return !!parsed.analytics;
  } catch {
    return false;
  }
}

export function trackEvent(name: AnalyticsEvent, params?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (!hasAnalyticsConsent()) return;
  try {
    window.gtag('event', name, params || {});
  } catch {
    /* noop */
  }
}

export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (!hasAnalyticsConsent()) return;
  try {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  } catch {
    /* noop */
  }
}
