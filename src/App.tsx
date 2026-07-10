import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import ExitIntentPopup from "@/components/ui/exit-intent-popup";
import SocialProofToasts from "@/components/ui/social-proof-toasts";
import { lazy } from "react";
// Lazy: react-markdown (dependencia transitiva) toca `document` en tiempo de
// import, lo que romperia el SSG.
const AiAdvisorChat = lazy(() => import("@/components/ui/ai-advisor-chat"));
import { getLangFromHostname } from "@/hooks/use-lang-from-host";
import ScrollToTop from "./components/ScrollToTop";
import AdminGuard from "./components/admin/AdminGuard";
import CookieBanner from "@/components/ui/cookie-banner";
import ChatWidget from "@/components/ui/chat-widget";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import ClientOnly from "@/components/ClientOnly";

// Eager imports — necesario para prerender SSG (renderToString no espera Suspense).
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Terminos from "./pages/Terminos";
import Servicios from "./pages/Servicios";
import SeoEcommerce from "./pages/SeoEcommerce";
import DiseneoWeb from "./pages/DiseneoWeb";
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
import NewsletterPro from "./pages/NewsletterPro";
import AdminBlog from "./pages/AdminBlog";
import VCard from "./pages/VCard";
import NewsletterPage from "./pages/NewsletterPage";
import NewsletterArchivePage from "./pages/NewsletterArchivePage";
import NewsletterEditionPage from "./pages/NewsletterEditionPage";
import NewsletterAdminPage from "./pages/NewsletterAdminPage";
import BriefingNewsletter from "./pages/BriefingNewsletter";
import Privacidad from "./pages/Privacidad";
import Cookies from "./pages/Cookies";
import ConsultoriaEstrategica from "./pages/ConsultoriaEstrategica";
import CapacitacionIA from "./pages/CapacitacionIA";
import ContenidoLinkedin from "./pages/ContenidoLinkedin";
import AnalizadorContratos from "./pages/AnalizadorContratos";
import ComparadorPropuestas from "./pages/ComparadorPropuestas";
import QueEsGeo from "./pages/QueEsGeo";
import GeoVsSeo from "./pages/GeoVsSeo";
import GeoParaShopify from "./pages/GeoParaShopify";
import GeoParaWooCommerce from "./pages/GeoParaWooCommerce";
import GeoParaVtex from "./pages/GeoParaVtex";
import EstudioVisibilidadIA from "./pages/EstudioVisibilidadIA";
import CalculadoraVisibilidadIA from "./pages/CalculadoraVisibilidadIA";

const queryClient = new QueryClient();

const RouteTracker = () => {
  useScrollTracking();
  return null;
};

/**
 * Deriva `lang` de la URL cuando estamos en SSR (sin `window`).
 * En cliente se usa hostname como fallback.
 */
function resolveLang(url?: string): "es" | "en" | "pt" {
  if (url) {
    if (url.startsWith("/en")) return "en";
    if (url.startsWith("/pt")) return "pt";
    return "es";
  }
  return getLangFromHostname();
}

interface AppProps {
  /** URL para SSR / prerender. Si se pasa, se usa StaticRouter. */
  url?: string;
}

const AppRoutes = ({ hostLang }: { hostLang: "es" | "en" | "pt" }) => (
  <Routes>
    <Route path="/" element={<Index lang={hostLang} />} />
    <Route path="/servicios" element={<Servicios lang={hostLang} />} />
    <Route path="/services" element={<Servicios lang={hostLang} />} />
    <Route path="/servicios/seo-ecommerce" element={<SeoEcommerce lang={hostLang} />} />
    <Route path="/services/ecommerce-seo" element={<SeoEcommerce lang={hostLang} />} />
    <Route path="/servicios/diseno-web" element={<DiseneoWeb lang={hostLang} />} />
    <Route path="/services/web-design" element={<DiseneoWeb lang={hostLang} />} />
    <Route path="/servicios/pauta-digital" element={<Navigate replace to="/consultoria-estrategica" />} />
    <Route path="/services/digital-ads" element={<Navigate replace to="/en/strategy-advisory" />} />
    <Route path="/servicios/diseno-logos" element={<Navigate replace to="/servicios/diseno-web" />} />
    <Route path="/services/logo-design" element={<Navigate replace to="/en/services/web-design" />} />
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
    <Route path="/servicios/whatsapp-business" element={<Navigate replace to="/consultoria-estrategica" />} />
    <Route path="/services/whatsapp-business" element={<Navigate replace to="/en/strategy-advisory" />} />
    <Route path="/servicios/whatsapp-ia-bot" element={<Navigate replace to="/consultoria-estrategica" />} />
    <Route path="/services/whatsapp-ai-bot" element={<Navigate replace to="/en/strategy-advisory" />} />
    <Route path="/pt/whatsapp-ia-bot" element={<Navigate replace to="/pt/consultoria-estrategica" />} />

    <Route path="/en" element={<Index lang="en" />} />
    <Route path="/en/services" element={<Servicios lang="en" />} />
    <Route path="/en/services/ecommerce-seo" element={<SeoEcommerce lang="en" />} />
    <Route path="/en/services/web-design" element={<DiseneoWeb lang="en" />} />
    <Route path="/en/services/digital-ads" element={<Navigate replace to="/en/strategy-advisory" />} />
    <Route path="/en/services/logo-design" element={<Navigate replace to="/en/services/web-design" />} />
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

    <Route path="/pt" element={<Index lang="pt" />} />
    <Route path="/pt/servicos" element={<Servicios lang="pt" />} />
    <Route path="/pt/seo-ecommerce" element={<SeoEcommerce lang="pt" />} />
    <Route path="/pt/design-web" element={<DiseneoWeb lang="pt" />} />
    <Route path="/pt/anuncios-digitais" element={<Navigate replace to="/pt/consultoria-estrategica" />} />
    <Route path="/pt/design-logos" element={<Navigate replace to="/pt/design-web" />} />
    <Route path="/pt/ferramentas" element={<DescuentosHerramientas lang="pt" />} />
    <Route path="/pt/consultorias" element={<AsesoriasMarketing lang="pt" />} />
    <Route path="/pt/linkedin" element={<OptimizacionLinkedin lang="pt" />} />
    <Route path="/pt/whatsapp-business" element={<Navigate replace to="/pt/consultoria-estrategica" />} />
    <Route path="/pt/precos" element={<Precios lang="pt" />} />
    <Route path="/pt/casos-de-sucesso" element={<CasosDeExito lang="pt" />} />
    <Route path="/pt/casos-de-sucesso/:id" element={<CasoDetalle lang="pt" />} />
    <Route path="/pt/contato" element={<Contacto lang="pt" />} />
    <Route path="/pt/blog" element={<Blog lang="pt" />} />
    <Route path="/pt/blog/:slug" element={<BlogPost lang="pt" />} />
    <Route path="/pt/recursos" element={<Recursos lang="pt" />} />
    <Route path="/pt/sobre-nos" element={<SobreNosotros lang="pt" />} />
    <Route path="/pt/termos" element={<Terminos lang="pt" />} />

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

    <Route path="/contacto-digital" element={<VCard />} />

    <Route path="/recursos/briefing-newsletter" element={<BriefingNewsletter lang={hostLang} />} />
    <Route path="/en/resources/newsletter-briefing" element={<BriefingNewsletter lang="en" />} />
    <Route path="/pt/recursos/briefing-newsletter" element={<BriefingNewsletter lang="pt" />} />

    <Route path="/privacidad" element={<Privacidad lang={hostLang} />} />
    <Route path="/cookies" element={<Cookies lang={hostLang} />} />
    <Route path="/en/privacy" element={<Privacidad lang="en" />} />
    <Route path="/en/cookies" element={<Cookies lang="en" />} />
    <Route path="/pt/privacidade" element={<Privacidad lang="pt" />} />
    <Route path="/pt/cookies" element={<Cookies lang="pt" />} />

    <Route path="/consultoria-estrategica" element={<ConsultoriaEstrategica lang="es" />} />
    <Route path="/en/strategy-advisory" element={<ConsultoriaEstrategica lang="en" />} />
    <Route path="/pt/consultoria-estrategica" element={<ConsultoriaEstrategica lang="pt" />} />

    <Route path="/capacitacion-ia" element={<CapacitacionIA lang="es" />} />
    <Route path="/en/ai-training" element={<CapacitacionIA lang="en" />} />
    <Route path="/pt/treinamento-ia" element={<CapacitacionIA lang="pt" />} />

    <Route path="/servicios/contenido-linkedin" element={<ContenidoLinkedin lang="es" />} />
    <Route path="/en/services/linkedin-content" element={<ContenidoLinkedin lang="en" />} />
    <Route path="/pt/conteudo-linkedin" element={<ContenidoLinkedin lang="pt" />} />

    <Route path="/recursos/analizador-contratos" element={<AnalizadorContratos lang="es" />} />
    <Route path="/en/resources/contract-analyzer" element={<AnalizadorContratos lang="en" />} />
    <Route path="/pt/recursos/analisador-contratos" element={<AnalizadorContratos lang="pt" />} />
    <Route path="/recursos/comparador-propuestas" element={<ComparadorPropuestas lang="es" />} />
    <Route path="/en/resources/proposal-comparator" element={<ComparadorPropuestas lang="en" />} />
    <Route path="/pt/recursos/comparador-propostas" element={<ComparadorPropuestas lang="pt" />} />

    <Route path="/servicios/web-economica" element={<Navigate replace to="/servicios/diseno-web" />} />
    <Route path="/en/services/starter-web" element={<Navigate replace to="/en/services/web-design" />} />
    <Route path="/pt/web-economica" element={<Navigate replace to="/pt/design-web" />} />

    <Route path="/que-es-geo" element={<QueEsGeo lang="es" />} />
    <Route path="/en/what-is-geo" element={<QueEsGeo lang="en" />} />
    <Route path="/pt/o-que-e-geo" element={<QueEsGeo lang="pt" />} />

    <Route path="/geo-vs-seo" element={<GeoVsSeo lang="es" />} />
    <Route path="/en/geo-vs-seo" element={<GeoVsSeo lang="en" />} />
    <Route path="/pt/geo-vs-seo" element={<GeoVsSeo lang="pt" />} />

    <Route path="/geo-para-shopify" element={<GeoParaShopify lang="es" />} />
    <Route path="/en/geo-for-shopify" element={<GeoParaShopify lang="en" />} />
    <Route path="/pt/geo-para-shopify" element={<GeoParaShopify lang="pt" />} />

    <Route path="/geo-para-woocommerce" element={<GeoParaWooCommerce lang="es" />} />
    <Route path="/en/geo-for-woocommerce" element={<GeoParaWooCommerce lang="en" />} />
    <Route path="/pt/geo-para-woocommerce" element={<GeoParaWooCommerce lang="pt" />} />

    <Route path="/geo-para-vtex" element={<GeoParaVtex lang="es" />} />
    <Route path="/en/geo-for-vtex" element={<GeoParaVtex lang="en" />} />
    <Route path="/pt/geo-para-vtex" element={<GeoParaVtex lang="pt" />} />

    <Route path="/estudio-visibilidad-ia-ecommerce-hispano-2026" element={<EstudioVisibilidadIA lang="es" />} />
    <Route path="/en/ai-visibility-study-hispanic-ecommerce-2026" element={<EstudioVisibilidadIA lang="en" />} />
    <Route path="/pt/estudo-visibilidade-ia-ecommerce-hispano-2026" element={<EstudioVisibilidadIA lang="pt" />} />

    <Route path="/herramientas/calculadora-visibilidad-ia" element={<CalculadoraVisibilidadIA lang="es" />} />
    <Route path="/en/tools/ai-visibility-calculator" element={<CalculadoraVisibilidadIA lang="en" />} />
    <Route path="/pt/ferramentas/calculadora-visibilidade-ia" element={<CalculadoraVisibilidadIA lang="pt" />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const AppInner = ({ hostLang }: { hostLang: "es" | "en" | "pt" }) => (
  <>
    <RouteTracker />
    {/* Widgets globales solo client-side — no aparecen en HTML prerender. */}
    <ClientOnly>
      <ExitIntentPopup lang={hostLang} />
      <SocialProofToasts lang={hostLang} />
      <AiAdvisorChat lang={hostLang} />
      <CookieBanner lang={hostLang} />
      <ChatWidget lang={hostLang} />
    </ClientOnly>
    <ScrollToTop />
    <AppRoutes hostLang={hostLang} />
  </>
);

const App = ({ url }: AppProps = {}) => {
  const hostLang = resolveLang(url);
  const body = (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ClientOnly>
          <Toaster />
          <Sonner />
        </ClientOnly>
        {url ? (
          <StaticRouter location={url}>
            <AppInner hostLang={hostLang} />
          </StaticRouter>
        ) : (
          <BrowserRouter>
            <AppInner hostLang={hostLang} />
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
  return body;
};

export default App;
