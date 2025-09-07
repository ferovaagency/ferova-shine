import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  currentLang?: 'es' | 'en';
}

const Header = ({ currentLang = 'es' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = {
    es: [
      { name: 'Inicio', href: '/' },
      { name: 'Servicios', href: '/servicios' },
      { name: 'Casos de Éxito', href: '/casos-de-exito' },
      { name: 'Blog', href: '/blog' },
      { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
      { name: 'Contacto', href: '/contacto' },
    ],
    en: [
      { name: 'Home', href: '/en' },
      { name: 'Services', href: '/en/services' },
      { name: 'Case Studies', href: '/en/case-studies' },
      { name: 'Blog', href: '/en/blog' },
      { name: 'About Us', href: '/en/about-us' },
      { name: 'Contact', href: '/en/contact' },
    ]
  };

  const ctaText = {
    es: 'Agendar una llamada',
    en: 'Schedule a call'
  };

  const langSwitcher = {
    es: { code: 'EN', href: '/en' },
    en: { code: 'ES', href: '/' }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={currentLang === 'es' ? '/' : '/en'} className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              <span className="text-gradient-gold">Ferova</span> Agency
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation[currentLang].map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-gold transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Language Switcher */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to={langSwitcher[currentLang].href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 px-3 py-1 rounded-md border border-border hover:border-gold"
            >
              {langSwitcher[currentLang].code}
            </Link>
            <button className="btn-gold flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{ctaText[currentLang]}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-foreground hover:text-gold transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-glass-border">
            <nav className="py-6 space-y-4">
              {navigation[currentLang].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-foreground hover:text-gold transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-4">
                <Link
                  to={langSwitcher[currentLang].href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {langSwitcher[currentLang].code}
                </Link>
                <button className="btn-gold w-full flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{ctaText[currentLang]}</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;