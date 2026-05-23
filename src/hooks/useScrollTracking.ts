import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent, trackPageView } from '@/lib/analytics';

/**
 * Tracks: page_view on route change, scroll_75 (once per route),
 * and time_on_page_60s (once per route).
 */
export function useScrollTracking() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    trackPageView(path);

    let scroll75Fired = false;
    const onScroll = () => {
      if (scroll75Fired) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= 0.75) {
        scroll75Fired = true;
        trackEvent('scroll_75', { page: path });
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const timeTimer = window.setTimeout(() => {
      trackEvent('time_on_page_60s', { page: path });
    }, 60_000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timeTimer);
    };
  }, [location.pathname, location.search]);
}
