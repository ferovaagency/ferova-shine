import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, FileText, Loader2, Pencil, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { Chip } from "@/components/admin/Chip";
import { supabase } from "@/integrations/supabase/client";
import { SEO_EDITORIAL } from "@/content/seoEditorial";
import { BLOG_SITE_ORIGINS } from "@/lib/blog-i18n";

type BlogLanguage = "es" | "en";
type BlogSummary = { id: string; slug: string; title: string; language: BlogLanguage; active: boolean; published_at: string; updated_at: string; legacy?: boolean };
type StatusFilter = "all" | "published" | "draft";
const publicUrl = (post: BlogSummary) => post.language === "en" ? `/en/blog/${post.slug}` : `/blog/${post.slug}`;

export default function AdminBlogList() {
  const [posts, setPosts] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState<"all" | BlogLanguage>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [workingId, setWorkingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    // Solo los artículos de este sitio: blog_posts es compartida con ferova.com.co.
    const query = supabase.from("blog_posts").select("id,slug,title,language,active,published_at,updated_at").in("site_origin", [...BLOG_SITE_ORIGINS]).order("updated_at", { ascending: false });
    const { data, error: queryError } = await query;
    if (queryError) setError("No se pudieron cargar los artículos. Revisa tu conexión o los permisos del usuario.");
    const databasePosts = (data ?? []) as BlogSummary[];
    const databaseSlugs = new Set(databasePosts.map((post) => post.slug));
    const inheritedPosts: BlogSummary[] = SEO_EDITORIAL.filter((post) => !databaseSlugs.has(post.slug)).map((post) => ({ id: `legacy--${post.slug}`, slug: post.slug, title: post.title, language: "es", active: false, published_at: "", updated_at: "", legacy: true }));
    setPosts([...databasePosts, ...inheritedPosts]); setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);
  const visible = useMemo(() => posts.filter((post) => {
    const matchesSearch = `${post.title} ${post.slug}`.toLowerCase().includes(search.trim().toLowerCase());
    const matchesLanguage = language === "all" || post.language === language;
    const matchesStatus = status === "all" || (status === "published" ? post.active : !post.active);
    return matchesSearch && matchesLanguage && matchesStatus;
  }), [posts, search, language, status]);

  const togglePublished = async (post: BlogSummary) => {
    if (post.legacy) return;
    setWorkingId(post.id);
    const { error: updateError } = await supabase.from("blog_posts").update({ active: !post.active, published_at: !post.active ? new Date().toISOString() : post.published_at, updated_at: new Date().toISOString() }).eq("id", post.id);
    if (updateError) toast.error(`No se pudo actualizar: ${updateError.message}`);
    else { toast.success(post.active ? "Artículo enviado a borradores." : "Artículo publicado."); await load(); }
    setWorkingId(null);
  };

  const remove = async (post: BlogSummary) => {
    if (post.legacy) return;
    if (!window.confirm(`¿Eliminar “${post.title}”? Esta acción no se puede deshacer.`)) return;
    setWorkingId(post.id);
    const { error: deleteError } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (deleteError) toast.error(`No se pudo eliminar: ${deleteError.message}`);
    else { toast.success("Artículo eliminado."); await load(); }
    setWorkingId(null);
  };

  return (
    <AdminLayout
      title="Artículos"
      description="Escribe cada versión en su idioma, revisa sus reglas editoriales y controla cuándo se publica."
      actions={<Link to="/admin/blog/nuevo" className="admin-btn"><Plus aria-hidden="true" /> <span className="hidden sm:inline">Nuevo artículo</span><span className="sm:hidden">Nuevo</span></Link>}
    >
      <div className="admin-toolbar">
        <label className="admin-search min-w-[12rem]"><Search aria-hidden="true" /><span className="sr-only">Buscar artículos</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por título o URL" /></label>
        <div className="flex max-w-full gap-2 overflow-x-auto">
          <select aria-label="Filtrar por idioma" value={language} onChange={(event) => setLanguage(event.target.value as "all" | BlogLanguage)} className="admin-select"><option value="all">Todos los idiomas</option><option value="es">Español</option><option value="en">Inglés</option></select>
          <select aria-label="Filtrar por estado" value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)} className="admin-select"><option value="all">Todos los estados</option><option value="published">Publicados</option><option value="draft">Borradores</option></select>
          <button type="button" onClick={() => void load()} aria-label="Actualizar" title="Actualizar" className="admin-icon-btn"><RefreshCw aria-hidden="true" /></button>
        </div>
      </div>

      {error && <div role="alert" className="admin-alert admin-alert--bad mb-4 items-center justify-between"><span>{error}</span><button type="button" onClick={() => void load()} className="font-semibold underline underline-offset-2">Reintentar</button></div>}
      {loading ? <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin" aria-label="Cargando" /></div> : visible.length === 0 ? (
        <div className="admin-empty"><FileText className="mx-auto mb-4 h-8 w-8 text-[#2f2d56]" aria-hidden="true" /><h2>{posts.length ? "No hay coincidencias" : "Aún no hay artículos"}</h2><p className="mt-2">{posts.length ? "Prueba con otro título o cambia los filtros." : "Crea el primero y guárdalo como borrador hasta que esté listo."}</p></div>
      ) : (
        <>
          <p className="admin-mono mb-2 text-xs text-muted-foreground" aria-live="polite">{visible.length} de {posts.length} artículos</p>
          <div className="admin-table-wrap"><table className="admin-table min-w-[760px]"><thead><tr><th scope="col">Artículo</th><th scope="col">Idioma</th><th scope="col">Estado</th><th scope="col">Actualización</th><th scope="col" className="text-right">Acciones</th></tr></thead><tbody>
            {visible.map((post) => <tr key={post.id}>
              <td><Link to={`/admin/blog/${post.id}/editar`} className="block max-w-lg truncate font-semibold hover:text-[#2f2d56] hover:underline">{post.title}</Link><div className="admin-mono mt-1 truncate text-xs text-muted-foreground">{publicUrl(post)}</div></td>
              <td><span className="admin-mono text-xs uppercase text-muted-foreground">{post.language}</span> <span className="text-muted-foreground">{post.language === "en" ? "Inglés" : "Español"}</span></td>
              <td>{post.legacy ? <Chip tone="wait">Por completar</Chip> : <button type="button" disabled={workingId === post.id} onClick={() => void togglePublished(post)} title={post.active ? "Pasar a borrador" : "Publicar"} aria-label={`${post.active ? "Publicado" : "Borrador"}: ${post.active ? "pasar a borrador" : "publicar"} ${post.title}`} className={`chip ${post.active ? "chip--ok" : "chip--idle"}`}>{post.active ? "Publicado" : "Borrador"}</button>}</td>
              <td className="admin-mono whitespace-nowrap text-xs text-muted-foreground">{post.legacy ? "Contenido heredado" : new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(post.updated_at))}</td>
              <td><div className="flex justify-end gap-1.5">
                <Link title={post.legacy ? "Completar y convertir" : "Editar"} aria-label={`Editar ${post.title}`} to={`/admin/blog/${post.id}/editar`} className={post.legacy ? "admin-btn admin-btn--ghost admin-btn--sm" : "admin-icon-btn"}><Pencil aria-hidden="true" />{post.legacy && <span>Completar</span>}</Link>
                {post.active && <Link title="Ver publicado" aria-label={`Ver ${post.title}`} to={publicUrl(post)} target="_blank" className="admin-icon-btn"><ExternalLink aria-hidden="true" /></Link>}
                {!post.legacy && <button type="button" title="Eliminar" aria-label={`Eliminar ${post.title}`} disabled={workingId === post.id} onClick={() => void remove(post)} className="admin-icon-btn admin-icon-btn--danger">{workingId === post.id ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Trash2 aria-hidden="true" />}</button>}
              </div></td>
            </tr>)}
          </tbody></table></div>
        </>
      )}
    </AdminLayout>
  );
}
