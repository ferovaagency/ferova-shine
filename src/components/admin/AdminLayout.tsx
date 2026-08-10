import { Helmet } from "react-helmet-async";
import AdminSidebar from "./AdminSidebar";

/**
 * Contenedor común del panel admin: sidebar + área de contenido.
 * Marca todas las vistas admin como noindex (además, las rutas /admin/* no
 * están en el registro de rutas, así que no entran al sitemap ni al prerender,
 * y robots.txt las bloquea).
 */
export default function AdminLayout({ title, description, children }: { title?: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{title ? `${title} · Ferova Admin` : "Ferova Admin"}</title>
      </Helmet>
      <AdminSidebar />
      <main className="flex-1 min-w-0">
        {title && (
          <div className="border-b border-border/60 px-5 py-5 md:px-8">
            <h1 className="text-xl md:text-2xl font-display font-bold">{title}</h1>
            {description && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        <div className="px-5 md:px-8 py-6">{children}</div>
      </main>
    </div>
  );
}
