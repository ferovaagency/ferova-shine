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
import CasosDeExito from "./pages/CasosDeExito";
import SobreNosotros from "./pages/SobreNosotros";
import SobreMariaFer from "./pages/SobreMariaFer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Spanish Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/servicios" element={<Servicios lang="es" />} />
          <Route path="/servicios/seo-ecommerce" element={<SeoEcommerce lang="es" />} />
          <Route path="/servicios/diseno-web" element={<DiseneoWeb lang="es" />} />
          <Route path="/casos-de-exito" element={<CasosDeExito lang="es" />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros lang="es" />} />
          <Route path="/sobre-maria-fer" element={<SobreMariaFer lang="es" />} />
          
          {/* English Routes */}
          <Route path="/en" element={<Index />} />
          <Route path="/en/services" element={<Servicios lang="en" />} />
          <Route path="/en/services/ecommerce-seo" element={<SeoEcommerce lang="en" />} />
          <Route path="/en/services/web-design" element={<DiseneoWeb lang="en" />} />
          <Route path="/en/case-studies" element={<CasosDeExito lang="en" />} />
          <Route path="/en/about-us" element={<SobreNosotros lang="en" />} />
          <Route path="/en/about-maria-fer" element={<SobreMariaFer lang="en" />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
