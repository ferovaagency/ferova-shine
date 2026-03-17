import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className="flex min-h-screen items-center justify-center bg-background pt-20">
        <div className="text-center px-6">
          <h1 className="mb-6 text-6xl md:text-8xl font-bold text-gradient-gold">404</h1>
          <h2 className="mb-4 text-xl md:text-3xl font-semibold text-foreground">Página no encontrada</h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-md mx-auto">
            La página que buscas no existe o ha sido movida.
          </p>
          <Link 
            to="/" 
            className="btn-gold"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
