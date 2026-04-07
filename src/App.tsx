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
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Terminos from "./pages/Terminos";
import Servicios from "./pages/Servicios";
import SeoEcommerce from "./pages/SeoEcommerce";
import DiseneoWeb from "./pages/DiseneoWeb";
import PautaDigital from "./pages/PautaDigital";
import DisenoLogos from "./pages/DisenoLogos";
import DescuentosHerramientas from "./pages/DescuentosHerramientas";
import AsesoriasMarketing from "./pages/AsesoriasMarketing";
import OptimizacionLinkedin from "./pages/OptimizacionLinkedin";
import CasosDeExito from "./pages/CasosDeExito";
import CasoDetalle from "./pages/CasoDetalle";
import Precios from "./pages/Precios";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Recursos from "./pages/Recursos";
import SobreNosotros from "./pages/SobreNosotros";
import OptimizacionWhatsapp from "./pages/OptimizacionWhatsapp";
import AdminBlog from "./pages/AdminBlog";
import VCard from "./pages/VCard";
import NewsletterPage from "./pages/NewsletterPage";
import NewsletterArchivePage from "./pages/NewsletterArchivePage";
import NewsletterEditionPage from "./pages/NewsletterEditionPage";
import NewsletterAdminPage from "./pages/NewsletterAdminPage";

const queryClient = new QueryClient();

const hostLang = getLangFromHostname();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ExitIntentPopup lang={hostLang} />
      <SocialProofToasts lang={hostLang} />
      <AiAdvisorChat lang={hostLang} />
      <BrowserRouter>
        <ScrollToTop />
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
          <Route path="/admin-blog" element={<AdminBlog lang={hostLang} />} />
          <Route path="/recursos" element={<Recursos lang={hostLang} />} />
          <Route path="/resources" element={<Recursos lang={hostLang} />} />
          <Route path="/nosotros" element={<SobreNosotros lang={hostLang} />} />
          <Route path="/about" element={<SobreNosotros lang={hostLang} />} />
          <Route path="/terminos" element={<Terminos lang={hostLang} />} />
          <Route path="/terms" element={<Terminos lang={hostLang} />} />
          <Route path="/servicios/whatsapp-business" element={<OptimizacionWhatsapp lang={hostLang} />} />
          <Route path="/services/whatsapp-business" element={<OptimizacionWhatsapp lang={hostLang} />} />

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
          <Route path="/en/admin-blog" element={<AdminBlog lang="en" />} />
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
          <Route path="/newsletter/admin" element={<NewsletterAdminPage />} />
          <Route path="/en/newsletter" element={<NewsletterPage lang="en" />} />
          <Route path="/en/newsletter/archive" element={<NewsletterArchivePage lang="en" />} />
          <Route path="/en/newsletter/edition/:slug" element={<NewsletterEditionPage lang="en" />} />
          <Route path="/pt/newsletter" element={<NewsletterPage lang="pt" />} />
          <Route path="/pt/newsletter/arquivo" element={<NewsletterArchivePage lang="pt" />} />
          <Route path="/pt/newsletter/edicao/:slug" element={<NewsletterEditionPage lang="pt" />} />

          <Route path="/contacto-digital" element={<VCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
