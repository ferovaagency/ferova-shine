import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react';

interface FooterProps {
  currentLang?: 'es' | 'en';
}

const Footer = ({ currentLang = 'es' }: FooterProps) => {
  const t = {
    es: {
      tagline: 'Web Apps de alto rendimiento para e-commerce',
      services: 'Servicios',
      company: 'Empresa',
      legal: 'Legal',
      newsletter: 'Newsletter',
      newsletterDesc: 'Recibe tips de Web Apps y e-commerce',
      placeholder: 'tu@email.com',
      subscribe: 'Suscribirse',
      rights: 'Todos los derechos reservados.',
      servLinks: [
        { name: 'SEO para E-commerce', href: '/servicios/seo-ecommerce' },
        { name: 'Diseño Web', href: '/servicios/diseno-web' },
        { name: 'Pauta Digital', href: '/servicios/ads' },
      ],
      compLinks: [
        { name: 'Precios', href: '/precios' },
        { name: 'Casos de Éxito', href: '/casos-de-exito' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contacto', href: '/contacto' },
      ],
      legalLinks: [
        { name: 'Términos', href: '/terminos' },
        { name: 'Privacidad', href: '/privacidad' },
        { name: 'Cookies', href: '/cookies' },
      ],
    },
    en: {
      tagline: 'High-performance Web Apps for e-commerce',
      services: 'Services',
      company: 'Company',
      legal: 'Legal',
      newsletter: 'Newsletter',
      newsletterDesc: 'Get tips on Web Apps and e-commerce',
      placeholder: 'your@email.com',
      subscribe: 'Subscribe',
      rights: 'All rights reserved.',
      servLinks: [
        { name: 'E-commerce SEO', href: '/en/services/ecommerce-seo' },
        { name: 'Web Design', href: '/en/services/web-design' },
        { name: 'Digital Ads', href: '/en/services/ads' },
      ],
      compLinks: [
        { name: 'Pricing', href: '/en/pricing' },
        { name: 'Case Studies', href: '/en/case-studies' },
        { name: 'Blog', href: '/en/blog' },
        { name: 'Contact', href: '/en/contact' },
      ],
      legalLinks: [
        { name: 'Terms', href: '/en/terms' },
        { name: 'Privacy', href: '/en/privacy' },
        { name: 'Cookies', href: '/en/cookies' },
      ],
    },
  };

  const d = t[currentLang];

  return (
    <footer className="border-t border-border/50" style={{ background: 'hsl(228, 60%, 8%)' }}>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to={currentLang === 'es' ? '/' : '/en'}>
              <span className="text-2xl font-display font-bold">
                <span className="text-gradient-neon">Ferova</span> Agency
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mt-3 max-w-xs">{d.tagline}</p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <a href="mailto:info@ferova.agency" className="flex items-center gap-2 hover:text-neon-cyan transition-colors">
                <Mail className="w-4 h-4" /> info@ferova.agency
              </a>
              <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neon-cyan transition-colors">
                <MessageCircle className="w-4 h-4" /> +1 (786) 578-7671
              </a>
            </div>
            <div className="flex gap-3 mt-4">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/50 transition-all" aria-label="Social">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: d.services, links: d.servLinks },
            { title: d.company, links: d.compLinks },
            { title: d.legal, links: d.legalLinks },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-semibold text-foreground mb-4 text-sm">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} Ferova Agency. {d.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
