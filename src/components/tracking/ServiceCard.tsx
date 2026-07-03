import { useEffect, useRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  pushDataLayer,
  getDeviceType,
  isReturningVisitor,
  setCurrentServiceContext,
} from './utils';

export interface ServiceCardProps {
  serviceName: string;
  title?: string;
  description?: string;
  href?: string;
  children?: ReactNode;
  className?: string;
  /** If true, tracks service_detail_view (page-level). Otherwise tracks service_view when in viewport. */
  isDetailView?: boolean;
}

export function ServiceCard({
  serviceName,
  title,
  description,
  href,
  children,
  className = '',
  isDetailView = false,
}: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    if (isDetailView) {
      setCurrentServiceContext(serviceName);
      pushDataLayer({
        event: 'service_detail_view',
        service_name: serviceName,
        referrer: (typeof document !== 'undefined' && document.referrer) || 'direct',
        is_returning_visitor: isReturningVisitor(),
      });
      return;
    }

    if (!ref.current || typeof IntersectionObserver === 'undefined') return;

    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !tracked.current) {
            tracked.current = true;
            const key = 'service_' + serviceName;
            const isFirst = typeof sessionStorage !== 'undefined' && !sessionStorage.getItem(key);
            try { sessionStorage.setItem(key, '1'); } catch { /* noop */ }
            pushDataLayer({
              event: 'service_view',
              service_name: serviceName,
              is_first_view_session: isFirst,
              device: getDeviceType(),
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [serviceName, isDetailView]);

  const inner = (
    <div
      ref={ref}
      className={`rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-[hsl(43,86%,45%)]/60 ${className}`}
    >
      {title && <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>}
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );

  if (href) {
    return (
      <Link to={href} onClick={() => setCurrentServiceContext(serviceName)}>
        {inner}
      </Link>
    );
  }
  return inner;
}

export default ServiceCard;
