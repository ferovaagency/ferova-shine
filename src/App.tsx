import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Servicios from "./pages/Servicios";
import SeoEcommerce from "./pages/SeoEcommerce";
import DiseneoWeb from "./pages/DiseneoWeb";
import PautaDigital from "./pages/PautaDigital";
import DisenoLogos from "./pages/DisenoLogos";
import DescuentosHerramientas from "./pages/DescuentosHerramientas";
import AsesoriasMarketing from "./pages/AsesoriasMarketing";
import CasosDeExito from "./pages/CasosDeExito";
import CasoDetalle from "./pages/CasoDetalle";
import Precios from "./pages/Precios";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Recursos from "./pages/Recursos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Spanish Routes */}
          <Route path="/" element={<Index lang="es" />} />
          <Route path="/servicios" element={<Servicios lang="es" />} />
          <Route path="/servicios/seo-ecommerce" element={<SeoEcommerce lang="es" />} />
          <Route path="/servicios/diseno-web" element={<DiseneoWeb lang="es" />} />
          <Route path="/servicios/pauta-digital" element={<PautaDigital lang="es" />} />
          <Route path="/servicios/diseno-logos" element={<DisenoLogos lang="es" />} />
          <Route path="/servicios/descuentos-herramientas" element={<DescuentosHerramientas lang="es" />} />
          <Route path="/servicios/asesorias-marketing" element={<AsesoriasMarketing lang="es" />} />
          <Route path="/precios" element={<Precios lang="es" />} />
          <Route path="/casos-de-exito" element={<CasosDeExito lang="es" />} />
          <Route path="/casos-de-exito/:id" element={<CasoDetalle lang="es" />} />
          <Route path="/contacto" element={<Contacto lang="es" />} />
          <Route path="/blog" element={<Blog lang="es" />} />
          <Route path="/blog/:slug" element={<BlogPost lang="es" />} />
          <Route path="/recursos" element={<Recursos lang="es" />} />

          {/* English Routes */}
          <Route path="/en" element={<Index lang="en" />} />
          <Route path="/en/services" element={<Servicios lang="en" />} />
          <Route path="/en/services/ecommerce-seo" element={<SeoEcommerce lang="en" />} />
          <Route path="/en/services/web-design" element={<DiseneoWeb lang="en" />} />
          <Route path="/en/services/digital-ads" element={<PautaDigital lang="en" />} />
          <Route path="/en/services/logo-design" element={<DisenoLogos lang="en" />} />
          <Route path="/en/services/tool-discounts" element={<DescuentosHerramientas lang="en" />} />
          <Route path="/en/services/marketing-consulting" element={<AsesoriasMarketing lang="en" />} />
          <Route path="/en/pricing" element={<Precios lang="en" />} />
          <Route path="/en/case-studies" element={<CasosDeExito lang="en" />} />
          <Route path="/en/case-studies/:id" element={<CasoDetalle lang="en" />} />
          <Route path="/en/contact" element={<Contacto lang="en" />} />
          <Route path="/en/blog" element={<Blog lang="en" />} />
          <Route path="/en/blog/:slug" element={<BlogPost lang="en" />} />
          <Route path="/en/resources" element={<Recursos lang="en" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
