import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FxLink, PageHero } from '@/components/fx/primitives';
import SEO from '@/components/SEO';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="fx-site min-h-screen">
      <SEO title="Página no encontrada | Ferova" description="La página que buscas no existe o ha sido movida." path={location.pathname} noindex />
      <Header />
      <main id="contenido-principal" className="pt-20">
        <PageHero
          eyebrow="404"
          title="Página no encontrada"
          intro="La página que buscas no existe o ha sido movida."
        >
          <FxLink to="/">Volver al inicio</FxLink>
        </PageHero>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
