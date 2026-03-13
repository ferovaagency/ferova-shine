import { useState } from 'react';
import { Menu, X, Phone, Globe, DollarSign } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  currentLang?: 'es' | 'en';
}

const Header = ({ currentLang = 'es' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = {
    es: [
      { name: 'Inicio', href: '/' },
      { name: 'Servicios', href: '/servicios' },
      { name: 'Precios', href: '/precios' },
      { name: 'Casos de Éxito', href: '/casos-de-exito' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contacto', href: '/contacto' },
    ],
    en: [
      { name: 'Home', href: '/en' },
      { name: 'Services', href: '/en/services' },
      { name: 'Pricing', href: '/en/pricing' },
      { name: 'Case Studies', href: '/en/case-studies' },
      { name: 'Blog', href: '/en/blog' },
      { name: 'Contact', href: '/en/contact' },
    ],
  };

  const ctaText = { es: 'Agendar llamada', en: 'Book a call' };
  const langSwitch = { es: { code: 'EN', href: '/en' }, en: { code: 'ES', href: '/' } };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" style={{ background: 'hsla(228, 60%, 10%, 0.85)', borderColor: 'hsla(230, 40%, 30%, 0.3)' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to={currentLang === 'es' ? '/' : '/en'} className="flex-shrink-0">
            <span className="text-xl md:text-2xl font-display font-bold">
              <span className="text-gradient-neon">Ferova</span>
              <span className="text-foreground"> Agency</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navigation[currentLang].map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-neon-cyan ${location.pathname === item.href ? 'text-neon-cyan' : 'text-muted-foreground'}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to={langSwitch[currentLang].href}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full border border-border hover:border-neon-cyan/50"
            >
              <Globe className="w-3 h-3" />
              {langSwitch[currentLang].code}
            </Link>
            <a
              href="https://wa.me/17865787671?text=Hola%20Ferova%2C%20me%20gustaría%20agendar%20una%20llamada."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon text-sm !px-5 !py-2.5 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {ctaText[currentLang]}
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-neon-cyan transition-colors"
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
                  className="block py-3 px-4 text-foreground hover:text-neon-cyan hover:bg-neon-cyan/5 rounded-lg transition-colors font-medium"
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
              >
                <Globe className="w-4 h-4" /> {langSwitch[currentLang].code}
              </Link>
              <a
                href="https://wa.me/17865787671?text=Hola%20Ferova%2C%20me%20gustaría%20agendar%20una%20llamada."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon w-full text-center block !py-3"
              >
                {ctaText[currentLang]}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
