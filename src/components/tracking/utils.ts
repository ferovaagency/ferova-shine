// GTM tracking utilities

declare global {
  interface Window {
    dataLayer?: any[];
    pageLoadTime?: number;
  }
}

export function pushDataLayer(event: Record<string, any>) {
  if (typeof window === 'undefined') return;
  if (!window.dataLayer) window.dataLayer = [];
  try {
    window.dataLayer.push({ ...event, timestamp: event.timestamp ?? new Date().toISOString() });
  } catch {
    /* noop */
  }
}

export function getScrollDepth(): 'shallow' | 'moderate' | 'deep' | 'very_deep' {
  if (typeof window === 'undefined') return 'shallow';
  const denom = document.documentElement.scrollHeight - window.innerHeight;
  const pct = denom > 0 ? (window.scrollY / denom) * 100 : 0;
  if (pct < 25) return 'shallow';
  if (pct < 50) return 'moderate';
  if (pct < 75) return 'deep';
  return 'very_deep';
}

export function getTimeOnPage(): number {
  if (typeof window === 'undefined') return 0;
  if (!window.pageLoadTime) window.pageLoadTime = Date.now();
  return Math.round((Date.now() - window.pageLoadTime) / 1000);
}

export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/Tablet|iPad/.test(ua)) return 'tablet';
  if (/Mobile|Android|iPhone/.test(ua)) return 'mobile';
  return 'desktop';
}

export function isReturningVisitor(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem('returning_visitor') === 'true';
  } catch {
    return false;
  }
}

export function initVisitorTracking() {
  if (typeof window === 'undefined') return;
  try {
    if (!window.pageLoadTime) window.pageLoadTime = Date.now();
    const flag = localStorage.getItem('returning_visitor');
    if (flag === null) {
      localStorage.setItem('returning_visitor', 'false');
    } else if (flag === 'false') {
      localStorage.setItem('returning_visitor', 'true');
    }
  } catch {
    /* noop */
  }
}

export function getCurrentServiceContext(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return sessionStorage.getItem('current_service');
  } catch {
    return null;
  }
}

export function setCurrentServiceContext(serviceName: string) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem('current_service', serviceName);
  } catch {
    /* noop */
  }
}
