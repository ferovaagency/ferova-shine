import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { initVisitorTracking } from "./components/tracking/utils";

initVisitorTracking();

const container = document.getElementById("root")!;
const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Si el build dejó HTML prerenderizado, se hidrata en vez de repintar: el
// contenido visible (y el LCP) es el del HTML inicial. Si algo no coincide,
// React vuelve a renderizar en el cliente, que es lo que se hacía antes.
// Las rutas con datos de la base (artículo, detalle de caso) se pintan en el
// cliente: el navegador arranca sin esos datos y la hidratación no coincidiría.
const dynamicRoute = /^\/(?:(?:en|pt)\/)?(?:blog|casos-de-exito|case-studies|casos-de-sucesso)\/[^/]+/.test(
  window.location.pathname,
);
if (container.hasChildNodes() && !dynamicRoute) hydrateRoot(container, app);
else createRoot(container).render(app);
