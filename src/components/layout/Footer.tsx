import { Link } from 'react-router-dom';
import { Mail, MapPin, Instagram, Linkedin, Facebook, Youtube, MessageCircle } from 'lucide-react';
import logoLight from '@/assets/ferova-logo.png.png';
import { useAnalytics } from '@/hooks/useAnalytics';
import { trackEvent } from '@/lib/analytics';

interface FooterProps {
  currentLang?: 'es' | 'en' | 'pt';
  lang?: 'es' | 'en' | 'pt';
}

const Footer = ({ currentLang, lang }: FooterProps) => {
  const locale = lang ?? currentLang ?? 'es';
  const { trackSocialClick } = useAnalytics();

  const t: Record<string, { tagline: string; services: string; company: string; legal: string; rights: string; servLinks: { name: string; href: string }[]; compLinks: { name: string; href: string }[]; legalLinks: { name: string; href: string }[] }> = {
    es: {
      tagline: 'Consultoría SEO senior para ecommerce y agencias que necesitan resolver problemas complejos.',
      services: 'Especialidades',
      company: 'Explorar',
      legal: 'Legal',
      rights: 'Todos los derechos reservados.',
      servLinks: [
        { name: 'SEO para ecommerce', href: '/servicios/seo-ecommerce' },
        { name: 'SEO para agencias', href: '/seo-para-agencias' },
        { name: 'Auditoría SEO técnica', href: '/auditoria-seo-tecnica' },
        { name: 'Migraciones SEO', href: '/migraciones-seo' },
        { name: 'Evaluador AI Search', href: '/recursos/herramientas/evaluador-preparacion-ai-search' },
      ],
      compLinks: [
        { name: 'Soluciones', href: '/soluciones' },
        { name: 'Método Ferova', href: '/metodo-ferova' },
        { name: 'Casos de Éxito', href: '/casos-de-exito' },
        { name: 'Recursos', href: '/recursos' },
        { name: 'Blog', href: '/blog' },
        { name: 'Sobre nosotros', href: '/sobre-nosotros' },
        { name: 'Precios', href: '/precios' },
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
        { name: 'Strategy (Advisory)', href: '/en/strategy-advisory' },
        { name: 'AI Training', href: '/en/ai-training' },
        { name: 'Web / E-commerce Development', href: '/en/services/web-design' },
        { name: 'Monthly SEO / AIO', href: '/en/services/ecommerce-seo' },
        { name: 'LinkedIn Optimization', href: '/en/services/linkedin-optimization' },
        { name: 'LinkedIn Content', href: '/en/services/linkedin-content' },
      ],
      compLinks: [
        { name: 'Solutions', href: '/en/solutions' },
        { name: 'Ferova Method', href: '/en/ferova-method' },
        { name: 'Products', href: '/en/products' },
        { name: 'Free tools', href: '/en/resources/tools' },
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
        { name: 'Estratégia (Consultoria)', href: '/pt/consultoria-estrategica' },
        { name: 'Treinamento em IA', href: '/pt/treinamento-ia' },
        { name: 'Desenvolvimento Web / E-commerce', href: '/pt/design-web' },
        { name: 'SEO / AIO Mensal', href: '/pt/seo-ecommerce' },
        { name: 'Otimização de LinkedIn', href: '/pt/linkedin' },
        { name: 'Conteúdo LinkedIn', href: '/pt/conteudo-linkedin' },
      ],
      compLinks: [
        { name: 'Soluções', href: '/pt/solucoes' },
        { name: 'Método Ferova', href: '/pt/metodo-ferova' },
        { name: 'Produtos', href: '/pt/produtos' },
        { name: 'Ferramentas grátis', href: '/pt/recursos/ferramentas' },
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
              {locale === 'es' ? (
                <span className="leading-none">
                  <span className="block font-display text-xl font-bold tracking-[0.08em] text-foreground">SEO PARA ECOMMERCE</span>
                  <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-600">by Ferova</span>
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
              <a href="https://wa.link/jvbd4j" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_button_clicked', { source: 'footer', label: 'phone_link' })} className="flex items-center gap-2 transition-colors hover:text-gold">
                <MessageCircle className="h-4 w-4" /> +1 (786) 578-7671
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" /> Bogotá, Colombia · Brasil · Estados Unidos
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {([
                { Icon: MessageCircle, name: 'whatsapp', url: 'https://wa.link/jvbd4j' },
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
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))} className="text-xs text-muted-foreground hover:text-gold underline">
            {locale === 'pt' ? 'Configurar cookies' : locale === 'en' ? 'Cookie settings' : 'Configurar cookies'}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
