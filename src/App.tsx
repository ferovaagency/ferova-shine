import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExitIntentPopup from "@/components/ui/exit-intent-popup";
import SocialProofToasts from "@/components/ui/social-proof-toasts";
import AiAdvisorChat from "@/components/ui/ai-advisor-chat";
import { getLangFromHostname } from "@/hooks/use-lang-from-host";
import ScrollToTop from "./components/ScrollToTop";
import AdminGuard from "./components/admin/AdminGuard";
import CookieBanner from "@/components/ui/cookie-banner";
import ChatWidget from "@/components/ui/chat-widget";
import { useScrollTracking } from "@/hooks/useScrollTracking";

// Code splitting: cada página se carga bajo demanda para reducir el bundle inicial.
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Terminos = lazy(() => import("./pages/Terminos"));
const Servicios = lazy(() => import("./pages/Servicios"));
const SeoEcommerce = lazy(() => import("./pages/SeoEcommerce"));
const DiseneoWeb = lazy(() => import("./pages/DiseneoWeb"));
const PautaDigital = lazy(() => import("./pages/PautaDigital"));
const DisenoLogos = lazy(() => import("./pages/DisenoLogos"));
const DescuentosHerramientas = lazy(() => import("./pages/DescuentosHerramientas"));
const AsesoriasMarketing = lazy(() => import("./pages/AsesoriasMarketing"));
const OptimizacionLinkedin = lazy(() => import("./pages/OptimizacionLinkedin"));
const CasosDeExito = lazy(() => import("./pages/CasosDeExito"));
const CasoDetalle = lazy(() => import("./pages/CasoDetalle"));
const Precios = lazy(() => import("./pages/Precios"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Recursos = lazy(() => import("./pages/Recursos"));
const SobreNosotros = lazy(() => import("./pages/SobreNosotros"));
const OptimizacionWhatsapp = lazy(() => import("./pages/OptimizacionWhatsapp"));
const WhatsappIaBot = lazy(() => import("./pages/WhatsappIaBot"));
const NewsletterPro = lazy(() => import("./pages/NewsletterPro"));
const AdminBlog = lazy(() => import("./pages/AdminBlog"));
const VCard = lazy(() => import("./pages/VCard"));
const NewsletterPage = lazy(() => import("./pages/NewsletterPage"));
const NewsletterArchivePage = lazy(() => import("./pages/NewsletterArchivePage"));
const NewsletterEditionPage = lazy(() => import("./pages/NewsletterEditionPage"));
const NewsletterAdminPage = lazy(() => import("./pages/NewsletterAdminPage"));
const BriefingNewsletter = lazy(() => import("./pages/BriefingNewsletter"));
const Privacidad = lazy(() => import("./pages/Privacidad"));
const Cookies = lazy(() => import("./pages/Cookies"));

const queryClient = new QueryClient();

const hostLang = getLangFromHostname();

const RouteTracker = () => {
  useScrollTracking();
  return null;
};

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    Cargando Ferova Shine...
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteTracker />
        <ExitIntentPopup lang={hostLang} />
        <SocialProofToasts lang={hostLang} />
        <AiAdvisorChat lang={hostLang} />
        <CookieBanner lang={hostLang} />
        <ScrollToTop />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Root routes — language determined by hostname */}
            <Route path="/" element={<Index lang={hostLang} />} />
            <Route path="/servicios" element={<Servicios lang={hostLang} />} />
            <Route path="/services" element={<Servicios lang={hostLang} />} />
            <Route path="/servicios/seo-ecommerce" element={<SeoEcommerce lang={hostLang} />} />
            <Route path="/services/ecommerce-seo" element={<SeoEcommerce lang={hostLang} />} />
            <Route path="/servicios/diseno-web" element={<DiseneoWeb lang={hostLang} />} />
            <Route path="/services/web-design" element={<DiseneoWeb lang={hostLang} />} />
            <Route path="/servicios/pauta-digital" element={<PautaDigital lang={hostLang} />} />
            <Route path="/services/digital-ads" element={<PautaDigital lang={hostLang} />} />
            <Route path="/servicios/diseno-logos" element={<DisenoLogos lang={hostLang} />} />
            <Route path="/services/logo-design" element={<DisenoLogos lang={hostLang} />} />
            <Route path="/servicios/descuentos-herramientas" element={<DescuentosHerramientas lang={hostLang} />} />
            <Route path="/services/tool-discounts" element={<DescuentosHerramientas lang={hostLang} />} />
            <Route path="/servicios/asesorias-marketing" element={<AsesoriasMarketing lang={hostLang} />} />
            <Route path="/services/marketing-consulting" element={<AsesoriasMarketing lang={hostLang} />} />
            <Route path="/servicios/optimizacion-linkedin" element={<OptimizacionLinkedin lang={hostLang} />} />
            <Route path="/services/linkedin-optimization" element={<OptimizacionLinkedin lang={hostLang} />} />
            <Route path="/precios" element={<Precios lang={hostLang} />} />
            <Route path="/pricing" element={<Precios lang={hostLang} />} />
            <Route path="/casos-de-exito" element={<CasosDeExito lang={hostLang} />} />
            <Route path="/case-studies" element={<CasosDeExito lang={hostLang} />} />
            <Route path="/casos-de-exito/:id" element={<CasoDetalle lang={hostLang} />} />
            <Route path="/case-studies/:id" element={<CasoDetalle lang={hostLang} />} />
            <Route path="/contacto" element={<Contacto lang={hostLang} />} />
            <Route path="/contact" element={<Contacto lang={hostLang} />} />
            <Route path="/blog" element={<Blog lang={hostLang} />} />
            <Route path="/blog/:slug" element={<BlogPost lang={hostLang} />} />
            <Route path="/admin-blog" element={<AdminGuard><AdminBlog lang={hostLang} /></AdminGuard>} />
            <Route path="/recursos" element={<Recursos lang={hostLang} />} />
            <Route path="/resources" element={<Recursos lang={hostLang} />} />
            <Route path="/nosotros" element={<SobreNosotros lang={hostLang} />} />
            <Route path="/about" element={<SobreNosotros lang={hostLang} />} />
            <Route path="/terminos" element={<Terminos lang={hostLang} />} />
            <Route path="/terms" element={<Terminos lang={hostLang} />} />
            <Route path="/servicios/whatsapp-business" element={<OptimizacionWhatsapp lang={hostLang} />} />
            <Route path="/services/whatsapp-business" element={<OptimizacionWhatsapp lang={hostLang} />} />
            <Route path="/servicios/whatsapp-ia-bot" element={<WhatsappIaBot lang={hostLang} />} />
            <Route path="/services/whatsapp-ai-bot" element={<WhatsappIaBot lang="en" />} />
            <Route path="/pt/whatsapp-ia-bot" element={<WhatsappIaBot lang="pt" />} />

            {/* Legacy /en prefix routes */}
            <Route path="/en" element={<Index lang="en" />} />
            <Route path="/en/services" element={<Servicios lang="en" />} />
            <Route path="/en/services/ecommerce-seo" element={<SeoEcommerce lang="en" />} />
            <Route path="/en/services/web-design" element={<DiseneoWeb lang="en" />} />
            <Route path="/en/services/digital-ads" element={<PautaDigital lang="en" />} />
            <Route path="/en/services/logo-design" element={<DisenoLogos lang="en" />} />
            <Route path="/en/services/tool-discounts" element={<DescuentosHerramientas lang="en" />} />
            <Route path="/en/services/marketing-consulting" element={<AsesoriasMarketing lang="en" />} />
            <Route path="/en/services/linkedin-optimization" element={<OptimizacionLinkedin lang="en" />} />
            <Route path="/en/pricing" element={<Precios lang="en" />} />
            <Route path="/en/case-studies" element={<CasosDeExito lang="en" />} />
            <Route path="/en/case-studies/:id" element={<CasoDetalle lang="en" />} />
            <Route path="/en/contact" element={<Contacto lang="en" />} />
            <Route path="/en/blog" element={<Blog lang="en" />} />
            <Route path="/en/blog/:slug" element={<BlogPost lang="en" />} />
            <Route path="/en/admin-blog" element={<AdminGuard><AdminBlog lang="en" /></AdminGuard>} />
            <Route path="/en/resources" element={<Recursos lang="en" />} />
            <Route path="/en/about" element={<SobreNosotros lang="en" />} />
            <Route path="/en/terms" element={<Terminos lang="en" />} />

            {/* Portuguese /pt prefix routes */}
            <Route path="/pt" element={<Index lang="pt" />} />
            <Route path="/pt/servicos" element={<Servicios lang="pt" />} />
            <Route path="/pt/seo-ecommerce" element={<SeoEcommerce lang="pt" />} />
            <Route path="/pt/design-web" element={<DiseneoWeb lang="pt" />} />
            <Route path="/pt/anuncios-digitais" element={<PautaDigital lang="pt" />} />
            <Route path="/pt/design-logos" element={<DisenoLogos lang="pt" />} />
            <Route path="/pt/ferramentas" element={<DescuentosHerramientas lang="pt" />} />
            <Route path="/pt/consultorias" element={<AsesoriasMarketing lang="pt" />} />
            <Route path="/pt/linkedin" element={<OptimizacionLinkedin lang="pt" />} />
            <Route path="/pt/whatsapp-business" element={<OptimizacionWhatsapp lang="pt" />} />
            <Route path="/pt/precos" element={<Precios lang="pt" />} />
            <Route path="/pt/casos-de-sucesso" element={<CasosDeExito lang="pt" />} />
            <Route path="/pt/casos-de-sucesso/:id" element={<CasoDetalle lang="pt" />} />
            <Route path="/pt/contato" element={<Contacto lang="pt" />} />
            <Route path="/pt/blog" element={<Blog lang="pt" />} />
            <Route path="/pt/blog/:slug" element={<BlogPost lang="pt" />} />
            <Route path="/pt/recursos" element={<Recursos lang="pt" />} />
            <Route path="/pt/sobre-nos" element={<SobreNosotros lang="pt" />} />
            <Route path="/pt/termos" element={<Terminos lang="pt" />} />

            {/* Newsletter routes */}
            <Route path="/newsletter" element={<NewsletterPage lang={hostLang} />} />
            <Route path="/newsletter/archivo" element={<NewsletterArchivePage lang={hostLang} />} />
            <Route path="/newsletter/edicion/:slug" element={<NewsletterEditionPage lang={hostLang} />} />
            <Route path="/newsletter/admin" element={<AdminGuard><NewsletterAdminPage /></AdminGuard>} />
            <Route path="/newsletter-pro" element={<NewsletterPro lang={hostLang} />} />
            <Route path="/en/newsletter-pro" element={<NewsletterPro lang="en" />} />
            <Route path="/pt/newsletter-pro" element={<NewsletterPro lang="pt" />} />
            <Route path="/en/newsletter" element={<NewsletterPage lang="en" />} />
            <Route path="/en/newsletter/archive" element={<NewsletterArchivePage lang="en" />} />
            <Route path="/en/newsletter/edition/:slug" element={<NewsletterEditionPage lang="en" />} />
            <Route path="/pt/newsletter" element={<NewsletterPage lang="pt" />} />
            <Route path="/pt/newsletter/arquivo" element={<NewsletterArchivePage lang="pt" />} />
            <Route path="/pt/newsletter/edicao/:slug" element={<NewsletterEditionPage lang="pt" />} />

            {/* Redirecciones 301 — gestionadas server-side en public/_redirects */}

            <Route path="/contacto-digital" element={<VCard />} />

            {/* Briefing de Newsletters - sales page */}
            <Route path="/recursos/briefing-newsletter" element={<BriefingNewsletter lang={hostLang} />} />
            <Route path="/en/resources/newsletter-briefing" element={<BriefingNewsletter lang="en" />} />
            <Route path="/pt/recursos/briefing-newsletter" element={<BriefingNewsletter lang="pt" />} />

            {/* Páginas legales */}
            <Route path="/privacidad" element={<Privacidad lang={hostLang} />} />
            <Route path="/cookies" element={<Cookies lang={hostLang} />} />
            <Route path="/en/privacy" element={<Privacidad lang="en" />} />
            <Route path="/en/cookies" element={<Cookies lang="en" />} />
            <Route path="/pt/privacidade" element={<Privacidad lang="pt" />} />
            <Route path="/pt/cookies" element={<Cookies lang="pt" />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
