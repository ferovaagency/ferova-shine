import { Link } from 'react-router-dom';
import { Mail, MapPin, Instagram, Linkedin, Facebook, Youtube, MessageCircle, MessagesSquare } from 'lucide-react';
import logoLight from '@/assets/ferova-logo.png.png';
import { useAnalytics } from '@/hooks/useAnalytics';
import { trackEvent } from '@/lib/analytics';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

interface FooterProps {
  currentLang?: 'es' | 'en' | 'pt';
  lang?: 'es' | 'en' | 'pt';
}

const Footer = ({ currentLang, lang }: FooterProps) => {
  const locale = lang ?? currentLang ?? 'es';
  const { trackSocialClick } = useAnalytics();

  const t: Record<string, { tagline: string; services: string; company: string; legal: string; rights: string; servLinks: { name: string; href: string }[]; compLinks: { name: string; href: string }[]; legalLinks: { name: string; href: string }[] }> = {
    es: {
      tagline: 'Criterio técnico y ejecución clara para resolver SEO y proyectos web con confianza.',
      services: 'Especialidades',
      company: 'Explorar',
      legal: 'Legal',
      rights: 'Todos los derechos reservados.',
      servLinks: [
        { name: 'SEO para agencias (white label)', href: '/seo-para-agencias' },
        { name: 'Auditoría SEO técnica', href: '/auditoria-seo-tecnica' },
        { name: 'Migraciones SEO', href: '/migraciones-seo' },
        { name: 'SEO para ecommerce', href: '/servicios/seo-ecommerce' },
      ],
      compLinks: [
        { name: 'Sobre mí', href: '/sobre-nosotros' },
        { name: 'Experiencia y entregas', href: '/casos-de-exito' },
        { name: 'Recursos', href: '/recursos' },
        { name: 'Artículos de SEO técnico', href: '/blog' },
        { name: 'Hablemos', href: '/contacto' },
      ],
      legalLinks: [
        { name: 'Términos y Condiciones', href: '/terminos' },
        { name: 'Privacidad e IA', href: '/privacidad#ia' },
        { name: 'Cookies', href: '/cookies' },
      ],
    },
    en: {
      tagline: 'Senior white-label SEO capacity for agencies: technical audits, migrations and ecommerce.',
      services: 'Services',
      company: 'Explore',
      legal: 'Legal',
      rights: 'All rights reserved.',
      servLinks: [
        { name: 'White-label SEO for agencies', href: '/en/white-label-seo-for-agencies' },
        { name: 'White label vs in-house', href: '/en/white-label-seo-vs-in-house' },
        { name: 'Technical SEO audit services', href: '/en/technical-seo-audit-services' },
        { name: 'SEO migration services', href: '/en/seo-migration-services' },
        { name: 'Ecommerce SEO', href: '/en/services/ecommerce-seo' },
        { name: 'Outsource SEO services', href: '/en/outsource-seo-services' },
      ],
      compLinks: [
        { name: 'About me', href: '/en/about-me' },
        { name: 'Case studies', href: '/en/case-studies' },
        { name: 'Resources', href: '/en/resources' },
        { name: 'Technical SEO articles', href: '/en/blog' },
        { name: 'Get in touch', href: '/en/contact' },
      ],
      legalLinks: [
        { name: 'Terms and Conditions', href: '/en/terms' },
        { name: 'Privacy and AI', href: '/en/privacy#ai' },
        { name: 'Cookies', href: '/en/cookies' },
      ],
    },
    pt: {
      tagline: 'Capacidade sênior de SEO white label para agências.',
      services: 'Serviços',
      company: 'Explorar',
      legal: 'Legal',
      rights: 'Todos os direitos reservados.',
      servLinks: [
        { name: 'SEO para ecommerce', href: '/pt/seo-ecommerce' },
      ],
      compLinks: [
        { name: 'Casos de sucesso', href: '/pt/casos-de-sucesso' },
        { name: 'Recursos', href: '/pt/recursos' },
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
    <footer className={`border-t border-border/50 bg-card ${locale === 'es' ? 'agency-footer' : ''}`}>
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to={locale === 'pt' ? '/pt' : locale === 'en' ? '/en' : '/'}>
              {locale === 'es' ? (
                <span className="personal-footer-wordmark leading-none">
                  <span className="block font-display text-xl font-bold tracking-[0.08em] text-foreground">MARÍA FER</span>
                  <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">SEO técnico · Ferova</span>
                </span>
              ) : (
                <img src={logoLight} alt="Ferova Agency" className="h-16 w-auto" />
              )}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{d.tagline}</p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <a href="mailto:gerencia@seoparaecommerce.co" className="flex items-center gap-2 transition-colors hover:text-gold">
                <Mail className="h-4 w-4" /> gerencia@seoparaecommerce.co
              </a>
              <a href="https://wa.me/17866894686" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_button_clicked', { source: 'footer', label: 'phone_link' })} className="flex items-center gap-2 transition-colors hover:text-gold">
                <MessageCircle className="h-4 w-4" /> +1 (786) 578-7671
              </a>
              <a href="https://ferovaagency.slack.com/team/U0BFL50JL4X" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-gold">
                <MessagesSquare className="h-4 w-4" /> Slack de Ferova
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" /> Bogotá, Colombia · Brasil · Estados Unidos
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {([
                { Icon: MessageCircle, name: 'whatsapp', url: 'https://wa.me/17866894686' },
                { Icon: MessagesSquare, name: 'slack', url: 'https://ferovaagency.slack.com/team/U0BFL50JL4X' },
                { Icon: Linkedin, name: 'linkedin', url: 'https://www.linkedin.com/in/maria-fer-calderon/' },
                { Icon: Instagram, name: 'instagram', url: 'https://www.instagram.com/mafe.ferova/' },
                { Icon: Facebook, name: 'facebook', url: 'https://www.facebook.com/mafecalderon.SEO' },
                { Icon: Youtube, name: 'youtube', url: 'https://www.youtube.com/@FerovaAgency' },
              ]).map(({ Icon, name, url }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" onClick={() => trackSocialClick(name, url)} className="rounded-lg border border-border/50 p-2 text-muted-foreground transition-all hover:border-gold/50 hover:text-gold" aria-label={name}>
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <a href="https://www.tiktok.com/@mafe.ferova?lang=es" target="_blank" rel="noopener noreferrer" onClick={() => trackSocialClick('tiktok', 'https://www.tiktok.com/@mafe.ferova')} className="rounded-lg border border-border/50 p-2 text-muted-foreground transition-all hover:border-gold/50 hover:text-gold" aria-label="tiktok">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.37z"/></svg>
              </a>
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

        <div className="mt-12 border-t border-border/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Ferova Agency. {d.rights}</p>
          <LanguageSwitcher lang={locale} variant="footer" />
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))} className="text-xs text-muted-foreground hover:text-gold underline">
            {locale === 'pt' ? 'Configurar cookies' : locale === 'en' ? 'Cookie settings' : 'Configurar cookies'}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
