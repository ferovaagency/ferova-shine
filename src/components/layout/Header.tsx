import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoDark from '@/assets/ferova-logo-dark.png';
import logoLight from '@/assets/ferova-logo.png';

interface HeaderProps {
  currentLang?: 'es' | 'en';
}

const Header = ({ currentLang = 'es' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 80) { setVisible(true); }
      else if (currentY > lastScrollY.current) { setVisible(false); }
      else { setVisible(true); }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = {
    es: [
      { name: 'Inicio', href: '/' },
      { name: 'Servicios', href: '/servicios' },
      { name: 'Precios', href: '/precios' },
      { name: 'Recursos', href: '/recursos' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contacto', href: '/contacto' },
    ],
    en: [
      { name: 'Home', href: '/en' },
      { name: 'Services', href: '/en/services' },
      { name: 'Pricing', href: '/en/pricing' },
      { name: 'Resources', href: '/en/resources' },
      { name: 'Blog', href: '/en/blog' },
      { name: 'Contact', href: '/en/contact' },
    ],
  };

  const ctaText = currentLang === 'es' ? 'Agendar Asesoría' : 'Book Consultation';
  // When on custom domains, switch to the other domain; otherwise use path prefix
  const host = window.location.hostname.toLowerCase();
  const isCustomDomain = host.includes('seoparaecommerce.co') || host.includes('seoforecommerces.co');
  const langSwitch = isCustomDomain
    ? {
        es: { code: 'EN', href: 'https://seoforecommerces.co' },
        en: { code: 'ES', href: 'https://seoparaecommerce.co' },
      }
    : { es: { code: 'EN', href: '/en' }, en: { code: 'ES', href: '/' } };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border/50 bg-background/90 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to={currentLang === 'es' ? '/' : '/en'} className="flex-shrink-0">
              <img src={logoDark} alt="Ferova Agency" className="h-12 md:h-14 w-auto dark:hidden" />
              <img src={logoLight} alt="Ferova Agency" className="h-12 md:h-14 w-auto hidden dark:block" style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(15deg)' }} />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {navigation[currentLang].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-gold ${location.pathname === item.href ? 'text-gold' : 'text-muted-foreground'}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                to={langSwitch[currentLang].href}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full border border-border hover:border-gold/50"
              >
                <Globe className="w-3 h-3" />
                {langSwitch[currentLang].code}
              </Link>
              <a
                href="https://wa.me/17865787671?text=Hola%20Ferova%2C%20quiero%20agendar%20una%20asesoría."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-sm !px-5 !py-2.5 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {ctaText}
              </a>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden border-t border-border/50 pb-6">
              <nav className="py-4 space-y-1">
                {navigation[currentLang].map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-3 px-4 text-foreground hover:text-gold hover:bg-gold/5 rounded-lg transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="px-4 pt-4 space-y-3 border-t border-border/50">
                <Link
                  to={langSwitch[currentLang].href}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Globe className="w-4 h-4" /> {langSwitch[currentLang].code}
                </Link>
                <a
                  href="https://wa.me/17865787671?text=Hola%20Ferova%2C%20quiero%20agendar%20una%20asesoría."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full text-center block !py-3"
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  {ctaText}
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile sticky CTA */}
      <a
        href="https://wa.me/17865787671?text=Hola%20Ferova%2C%20quiero%20agendar%20una%20asesoría."
        target="_blank"
        rel="noopener noreferrer"
        className="lg:hidden fixed bottom-4 left-4 right-4 z-50 btn-gold text-center !py-3 flex items-center justify-center gap-2 text-sm"
      >
        <MessageCircle className="w-4 h-4" />
        {ctaText}
      </a>
    </>
  );
};

export default Header;
