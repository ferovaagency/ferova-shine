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

const queryClient = new QueryClient();

/** Detect language from hostname; falls back to path-based /en prefix */
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
          {/*
            When accessed via seoforecommerces.co → hostLang = 'en'
            When accessed via seoparaecommerce.co → hostLang = 'es'
            All routes at "/" serve the detected language automatically.
          */}

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
          <Route path="/recursos" element={<Recursos lang={hostLang} />} />
          <Route path="/resources" element={<Recursos lang={hostLang} />} />
          <Route path="/nosotros" element={<SobreNosotros lang={hostLang} />} />
          <Route path="/about" element={<SobreNosotros lang={hostLang} />} />

          {/* Legacy /en prefix routes still work */}
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
          <Route path="/en/resources" element={<Recursos lang="en" />} />
          <Route path="/en/about" element={<SobreNosotros lang="en" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
