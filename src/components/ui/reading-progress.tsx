import { useEffect, useState, lazy, Suspense } from 'react';

// framer-motion `useScroll` attaches DOM listeners al llamarse — no SSR-safe.
// Cargamos el widget solo en cliente.
const ReadingProgressImpl = lazy(() => import('./reading-progress-impl'));

const ReadingProgress = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <ReadingProgressImpl />
    </Suspense>
  );
};

export default ReadingProgress;
