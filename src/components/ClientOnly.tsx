import { useEffect, useState, ReactNode } from "react";

/**
 * Renderiza `children` solo en cliente. Necesario para prerender SSG:
 * widgets globales (chat, popups, banners) no deben aparecer en el HTML estático.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}

export default ClientOnly;
