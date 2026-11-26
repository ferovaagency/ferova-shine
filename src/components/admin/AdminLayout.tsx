import { Helmet } from "react-helmet-async";
import AdminSidebar, { AdminMobileTabs, useAdminNav } from "./AdminSidebar";
import "@/styles/admin.css";

/**
 * Contenedor común del panel admin (Ferova Admin): fondo gris azulado,
 * barra lateral flotante (escritorio) o tira de pestañas (móvil), cabecera
 * flotante con el título y acciones, y el contenido debajo.
 * Marca todas las vistas admin como noindex (además, las rutas /admin/* no
 * están en el registro de rutas, así que no entran al sitemap ni al prerender,
 * y robots.txt las bloquea).
 */
export default function AdminLayout({ title, description, actions, children }: { title?: string; description?: string; actions?: React.ReactNode; children: React.ReactNode }) {
  const nav = useAdminNav();
  return (
    <div className="admin-world">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{title ? `${title} · Ferova Admin` : "Ferova Admin"}</title>
      </Helmet>
      <a href="#admin-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold">Saltar al contenido</a>
      <AdminSidebar nav={nav} />
      <div className="admin-main">
        <header className="admin-top">
          <div className="min-w-0 flex-1">
            <h1 className="truncate">{title ?? "Ferova Admin"}</h1>
            {description && <p className="admin-sub hidden truncate sm:block">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </header>
        <AdminMobileTabs nav={nav} />
        <main id="admin-content" className="admin-content">{children}</main>
      </div>
    </div>
  );
}
