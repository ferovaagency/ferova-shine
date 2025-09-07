import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  currentLang?: 'es' | 'en';
}

const Footer = ({ currentLang = 'es' }: FooterProps) => {
  const content = {
    es: {
      company: 'Ferova Agency',
      tagline: 'Agencia boutique de SEO para e-commerce',
      contact: 'Contacto',
      services: 'Servicios',
      legal: 'Legal',
      newsletter: 'Newsletter',
      newsletterText: 'Recibe insights de SEO y e-commerce directo en tu inbox',
      emailPlaceholder: 'tu@email.com',
      subscribe: 'Suscribirse',
      rights: 'Todos los derechos reservados.',
      location: 'Bogotá, Colombia',
      links: {
        services: [
          { name: 'SEO para E-commerce', href: '/servicios/seo-ecommerce' },
          { name: 'Diseño Web', href: '/servicios/diseno-web' },
          { name: 'Ads Digitales', href: '/servicios/ads' }
        ],
        legal: [
          { name: 'Términos y Condiciones', href: '/terminos' },
          { name: 'Política de Privacidad', href: '/privacidad' },
          { name: 'Política de Cookies', href: '/cookies' }
        ]
      }
    },
    en: {
      company: 'Ferova Agency',
      tagline: 'Boutique SEO agency for e-commerce',
      contact: 'Contact',
      services: 'Services',
      legal: 'Legal',
      newsletter: 'Newsletter',
      newsletterText: 'Get SEO and e-commerce insights delivered to your inbox',
      emailPlaceholder: 'your@email.com',
      subscribe: 'Subscribe',
      rights: 'All rights reserved.',
      location: 'Bogotá, Colombia',
      links: {
        services: [
          { name: 'E-commerce SEO', href: '/en/services/ecommerce-seo' },
          { name: 'Web Design', href: '/en/services/web-design' },
          { name: 'Digital Ads', href: '/en/services/ads' }
        ],
        legal: [
          { name: 'Terms & Conditions', href: '/en/terms' },
          { name: 'Privacy Policy', href: '/en/privacy' },
          { name: 'Cookie Policy', href: '/en/cookies' }
        ]
      }
    }
  };

  const data = content[currentLang];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to={currentLang === 'es' ? '/' : '/en'} className="inline-block mb-4">
              <h3 className="text-2xl font-bold">
                <span className="text-gradient-gold">Ferova</span> Agency
              </h3>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              {data.tagline}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-gold" />
                <a 
                  href="mailto:info@ferova.agency" 
                  className="hover:text-gold transition-colors duration-200"
                >
                  info@ferova.agency
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-gold" />
                <a 
                  href="tel:+57" 
                  className="hover:text-gold transition-colors duration-200"
                >
                  +57 XXX XXX XXXX
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{data.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              <a 
                href="#" 
                className="p-2 rounded-lg bg-white/5 hover:bg-gold hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-white/5 hover:bg-gold hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-white/5 hover:bg-gold hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">{data.services}</h4>
            <ul className="space-y-3">
              {data.links.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">{data.legal}</h4>
            <ul className="space-y-3">
              {data.links.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-12 mt-12">
          <div className="max-w-md">
            <h4 className="font-semibold text-secondary-foreground mb-2">{data.newsletter}</h4>
            <p className="text-muted-foreground text-sm mb-4">
              {data.newsletterText}
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder={data.emailPlaceholder}
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-secondary-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <button className="px-6 py-2 bg-gold hover:bg-gold-dark text-white font-medium rounded-lg transition-colors duration-200">
                {data.subscribe}
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 {data.company}. {data.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;