export function useAnalytics() {
  const trackEvent = (
    eventName: string,
    params?: Record<string, string | number | boolean>
  ) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }
  };

  const trackWhatsApp = (source: string, service?: string) => {
    trackEvent('whatsapp_click', {
      event_category: 'engagement',
      event_label: source,
      service: service || 'general',
    });
  };

  const trackAIChat = (action: 'open' | 'message_sent' | 'human_transfer') => {
    trackEvent('ai_chat_' + action, {
      event_category: 'engagement',
      event_label: 'ai_assistant',
    });
  };

  const trackLanguageChange = (from: string, to: string) => {
    trackEvent('language_change', {
      event_category: 'navigation',
      from_language: from,
      to_language: to,
    });
  };

  const trackSocialClick = (network: string, url: string) => {
    trackEvent('social_click', {
      event_category: 'engagement',
      social_network: network,
      event_label: url,
    });
  };

  const trackNewsletter = (
    action: 'subscribe_free' | 'subscribe_paid' | 'view_plans',
    plan?: string
  ) => {
    trackEvent('newsletter_' + action, {
      event_category: 'conversion',
      event_label: plan || 'general',
    });
  };

  const trackServiceCTA = (service: string, currency: string, action: string) => {
    trackEvent('service_cta_click', {
      event_category: 'conversion',
      service_name: service,
      currency: currency,
      cta_action: action,
    });
  };

  const trackCurrencyChange = (currency: string) => {
    trackEvent('currency_change', {
      event_category: 'navigation',
      selected_currency: currency,
    });
  };

  const trackBlogRead = (title: string, slug: string) => {
    trackEvent('blog_article_view', {
      event_category: 'content',
      article_title: title,
      article_slug: slug,
    });
  };

  const trackScrollDepth = (depth: number, page: string) => {
    trackEvent('scroll_depth', {
      event_category: 'engagement',
      depth_percentage: depth,
      page_path: page,
    });
  };

  return {
    trackWhatsApp,
    trackAIChat,
    trackLanguageChange,
    trackSocialClick,
    trackNewsletter,
    trackServiceCTA,
    trackCurrencyChange,
    trackBlogRead,
    trackScrollDepth,
  };
}
