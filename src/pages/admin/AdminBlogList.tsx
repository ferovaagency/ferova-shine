import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, FileText, Loader2, Pencil, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

type BlogLanguage = "es" | "en";
type BlogSummary = { id: string; slug: string; title: string; language: BlogLanguage; active: boolean; published_at: string; updated_at: string };
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
    let query = supabase.from("blog_posts").select("id,slug,title,language,active,published_at,updated_at").order("updated_at", { ascending: false });
    if (language !== "all") query = query.eq("language", language);
    if (status !== "all") query = query.eq("active", status === "published");
    const { data, error: queryError } = await query;
    if (queryError) setError("No se pudieron cargar los artículos. Revisa tu conexión o los permisos del usuario.");
    setPosts((data ?? []) as BlogSummary[]); setLoading(false);
  }, [language, status]);

  useEffect(() => { void load(); }, [load]);
  const visible = useMemo(() => posts.filter((post) => `${post.title} ${post.slug}`.toLowerCase().includes(search.trim().toLowerCase())), [posts, search]);

  const togglePublished = async (post: BlogSummary) => {
    setWorkingId(post.id);
    const { error: updateError } = await supabase.from("blog_posts").update({ active: !post.active, published_at: !post.active ? new Date().toISOString() : post.published_at, updated_at: new Date().toISOString() }).eq("id", post.id);
    if (updateError) toast.error(`No se pudo actualizar: ${updateError.message}`);
    else { toast.success(post.active ? "Artículo enviado a borradores." : "Artículo publicado."); await load(); }
    setWorkingId(null);
  };

  const remove = async (post: BlogSummary) => {
    if (!window.confirm(`¿Eliminar “${post.title}”? Esta acción no se puede deshacer.`)) return;
    setWorkingId(post.id);
    const { error: deleteError } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (deleteError) toast.error(`No se pudo eliminar: ${deleteError.message}`);
    else { toast.success("Artículo eliminado."); await load(); }
    setWorkingId(null);
  };

  return (
    <AdminLayout title="Artículos" description="Escribe cada versión en su idioma, revisa su SEO y controla cuándo se publica.">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><span className="sr-only">Buscar artículos</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por título o URL" className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary/50" /></label>
        <div className="flex gap-2 overflow-x-auto">
          <select aria-label="Filtrar por idioma" value={language} onChange={(event) => setLanguage(event.target.value as "all" | BlogLanguage)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm"><option value="all">Todos los idiomas</option><option value="es">Español</option><option value="en">Inglés</option></select>
          <select aria-label="Filtrar por estado" value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm"><option value="all">Todos los estados</option><option value="published">Publicados</option><option value="draft">Borradores</option></select>
          <button onClick={() => void load()} aria-label="Actualizar" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"><RefreshCw className="h-4 w-4" /></button>
        </div>
        <Link to="/admin/blog/nuevo" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"><Plus className="h-4 w-4" /> Nuevo artículo</Link>
      </div>

      {error && <div role="alert" className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm"><span>{error}</span><button onClick={() => void load()} className="font-medium text-primary">Reintentar</button></div>}
      {loading ? <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin" /></div> : visible.length === 0 ? (
        <div className="rounded-xl border border-border bg-card px-6 py-14 text-center"><FileText className="mx-auto mb-4 h-8 w-8 text-primary/70" /><h2 className="text-xl font-semibold">{posts.length ? "No hay coincidencias" : "Aún no hay artículos"}</h2><p className="mt-2 text-sm text-muted-foreground">{posts.length ? "Prueba con otro título o cambia los filtros." : "Crea el primero y guárdalo como borrador hasta que esté listo."}</p></div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card"><table className="w-full min-w-[760px] text-sm"><thead><tr className="border-b border-border text-left text-xs text-muted-foreground"><th className="px-4 py-3 font-medium">Artículo</th><th className="px-4 py-3 font-medium">Idioma</th><th className="px-4 py-3 font-medium">Estado</th><th className="px-4 py-3 font-medium">Actualización</th><th className="px-4 py-3 text-right font-medium">Acciones</th></tr></thead><tbody>
          {visible.map((post) => <tr key={post.id} className="border-b border-border/70 last:border-0 hover:bg-muted/40"><td className="px-4 py-3"><div className="max-w-lg truncate font-medium">{post.title}</div><div className="mt-1 text-xs text-muted-foreground">{publicUrl(post)}</div></td><td className="px-4 py-3 text-muted-foreground">{post.language === "en" ? "Inglés" : "Español"}</td><td className="px-4 py-3"><button disabled={workingId === post.id} onClick={() => void togglePublished(post)} className={`rounded-full px-2.5 py-1 text-xs font-medium disabled:opacity-50 ${post.active ? "bg-emerald-500/15 text-emerald-600" : "bg-muted text-muted-foreground"}`}>{post.active ? "Publicado" : "Borrador"}</button></td><td className="px-4 py-3 text-muted-foreground">{new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(post.updated_at))}</td><td className="px-4 py-3"><div className="flex justify-end gap-1"><Link title="Editar" aria-label={`Editar ${post.title}`} to={`/admin/blog/${post.id}/editar`} className="rounded-lg border border-border p-2 hover:text-primary"><Pencil className="h-4 w-4" /></Link>{post.active && <Link title="Ver publicado" aria-label={`Ver ${post.title}`} to={publicUrl(post)} target="_blank" className="rounded-lg border border-border p-2 hover:text-primary"><ExternalLink className="h-4 w-4" /></Link>}<button title="Eliminar" aria-label={`Eliminar ${post.title}`} disabled={workingId === post.id} onClick={() => void remove(post)} className="rounded-lg border border-border p-2 hover:border-destructive/40 hover:text-destructive disabled:opacity-50">{workingId === post.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}</button></div></td></tr>)}
        </tbody></table></div>
      )}
    </AdminLayout>
  );
}
