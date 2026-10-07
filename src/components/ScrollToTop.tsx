import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lleva la vista arriba al cambiar de página, PERO respeta el ancla.
 *
 * Antes sólo dependía de `pathname` y hacía `scrollTo(0,0)` siempre, así que un
 * enlace del menú tipo `/en#trabajo` cargaba la portada y se quedaba arriba: el
 * ancla no hacía nada y parecía que el menú no funcionaba.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // El destino puede no estar montado aún en el primer pintado.
    const id = hash.slice(1);
    let frame = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (frame++ < 20) requestAnimationFrame(tryScroll);
    };
    tryScroll();
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
