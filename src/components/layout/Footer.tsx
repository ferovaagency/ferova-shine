import { Link } from 'react-router-dom';
import { Mail, MapPin, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import logoLight from '@/assets/ferova-logo.png.png';

interface FooterProps {
  currentLang?: 'es' | 'en' | 'pt';
  lang?: 'es' | 'en' | 'pt';
}

const Footer = ({ currentLang, lang }: FooterProps) => {
  const locale = lang ?? currentLang ?? 'es';

  const t: Record<string, { tagline: string; services: string; company: string; legal: string; rights: string; servLinks: { name: string; href: string }[]; compLinks: { name: string; href: string }[]; legalLinks: { name: string; href: string }[] }> = {
    es: {
      tagline: 'Web Apps de alto rendimiento para e-commerce. SEO, diseño y estrategia digital.',
      services: 'Servicios',
      company: 'Empresa',
      legal: 'Legal',
      rights: 'Todos los derechos reservados.',
      servLinks: [
        { name: 'SEO para E-commerce', href: '/servicios/seo-ecommerce' },
        { name: 'Diseño Web / Web Apps', href: '/servicios/diseno-web' },
        { name: 'Pauta Digital', href: '/servicios/pauta-digital' },
        { name: 'Diseño de Logos', href: '/servicios/diseno-logos' },
        { name: 'Descuentos en Herramientas', href: '/servicios/descuentos-herramientas' },
        { name: 'Asesorías de Marketing', href: '/servicios/asesorias-marketing' },
      ],
      compLinks: [
        { name: 'Precios', href: '/precios' },
        { name: 'Casos de Éxito', href: '/casos-de-exito' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contacto', href: '/contacto' },
      ],
      legalLinks: [
        { name: 'Términos y Condiciones', href: '/terminos' },
        { name: 'Privacidad', href: '/privacidad' },
        { name: 'Cookies', href: '/cookies' },
      ],
    },
    en: {
      tagline: 'High-performance Web Apps for e-commerce. SEO, design and digital strategy.',
      services: 'Services',
      company: 'Company',
      legal: 'Legal',
      rights: 'All rights reserved.',
      servLinks: [
        { name: 'E-commerce SEO', href: '/en/services/ecommerce-seo' },
        { name: 'Web Design / Web Apps', href: '/en/services/web-design' },
        { name: 'Digital Ads', href: '/en/services/digital-ads' },
        { name: 'Logo Design', href: '/en/services/logo-design' },
        { name: 'Tool Discounts', href: '/en/services/tool-discounts' },
        { name: 'Marketing Consulting', href: '/en/services/marketing-consulting' },
      ],
      compLinks: [
        { name: 'Pricing', href: '/en/pricing' },
        { name: 'Case Studies', href: '/en/case-studies' },
        { name: 'Blog', href: '/en/blog' },
        { name: 'Contact', href: '/en/contact' },
      ],
      legalLinks: [
        { name: 'Terms & Conditions', href: '/en/terms' },
        { name: 'Privacy', href: '/en/privacy' },
        { name: 'Cookies', href: '/en/cookies' },
      ],
    },
    pt: {
      tagline: 'Web Apps de alto desempenho para e-commerce. SEO, design e estratégia digital.',
      services: 'Serviços',
      company: 'Empresa',
      legal: 'Legal',
      rights: 'Todos os direitos reservados.',
      servLinks: [
        { name: 'SEO para E-commerce', href: '/pt/seo-ecommerce' },
        { name: 'Design Web / Web Apps', href: '/pt/design-web' },
        { name: 'Anúncios Digitais', href: '/pt/anuncios-digitais' },
        { name: 'Design de Logos', href: '/pt/design-logos' },
        { name: 'Ferramentas com Desconto', href: '/pt/ferramentas' },
        { name: 'Consultorias de Marketing', href: '/pt/consultorias' },
      ],
      compLinks: [
        { name: 'Preços', href: '/pt/precos' },
        { name: 'Casos de Sucesso', href: '/pt/casos-de-sucesso' },
        { name: 'Blog', href: '/pt/blog' },
        { name: 'Contato', href: '/pt/contato' },
      ],
      legalLinks: [
        { name: 'Termos e Condições', href: '/pt/termos' },
        { name: 'Privacidade', href: '/pt/privacidade' },
        { name: 'Cookies', href: '/pt/cookies' },
      ],
    },
  };

  const d = t[locale] ?? t.es;

  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to={locale === 'pt' ? '/pt' : locale === 'en' ? '/en' : '/'}>
              <img src={logoLight} alt="Ferova Agency" className="h-16 w-auto" />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{d.tagline}</p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <a href="mailto:maria.fer@ferova.com.co" className="flex items-center gap-2 transition-colors hover:text-gold">
                <Mail className="h-4 w-4" /> maria.fer@ferova.com.co
              </a>
              <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-gold">
                <MessageCircle className="h-4 w-4" /> +1 (786) 578-7671
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" /> Bogotá, Colombia · Brasil · Estados Unidos
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="rounded-lg border border-border/50 p-2 text-muted-foreground transition-all hover:border-gold/50 hover:text-gold" aria-label="Social">
                  <Icon className="h-4 w-4" />
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
              <h4 className="mb-4 text-sm font-display font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-sm text-muted-foreground transition-colors hover:text-gold">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border/30 pt-8 text-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Ferova Agency. {d.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
