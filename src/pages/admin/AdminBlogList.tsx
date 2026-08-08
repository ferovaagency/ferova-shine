import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, FileText, Loader2, Pencil, Plus } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

type BlogLanguage = "es" | "en";
type BlogSummary = {
  id: string;
  slug: string;
  title: string;
  language: BlogLanguage;
  active: boolean;
  published_at: string;
  updated_at: string;
};

const publicUrl = (post: BlogSummary) => post.language === "en" ? `/en/blog/${post.slug}` : `/blog/${post.slug}`;

export default function AdminBlogList() {
  const [posts, setPosts] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<"all" | BlogLanguage>("all");

  const load = async () => {
    setLoading(true);
    let query = supabase.from("blog_posts").select("id,slug,title,language,active,published_at,updated_at").order("updated_at", { ascending: false });
    if (language !== "all") query = query.eq("language", language);
    const { data } = await query;
    setPosts((data ?? []) as BlogSummary[]);
    setLoading(false);
  };

  useEffect(() => { void load(); }, [language]);

  return (
    <AdminLayout title="Artículos del blog">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="max-w-2xl text-sm text-muted-foreground">Cada artículo pertenece a una sola versión del sitio. Español e inglés se crean y mantienen de forma independiente.</p>
          <label className="mt-4 block text-xs font-medium text-muted-foreground">Filtrar por versión
            <select value={language} onChange={(event) => setLanguage(event.target.value as "all" | BlogLanguage)} className="ml-3 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
              <option value="all">Todas</option><option value="es">Español</option><option value="en">Inglés</option>
            </select>
          </label>
        </div>
        <Link to="/admin/blog/nuevo" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"><Plus className="h-4 w-4" /> Nuevo artículo</Link>
      </div>

      {loading ? <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin" /></div> : posts.length === 0 ? (
        <div className="glass-card px-6 py-14 text-center"><FileText className="mx-auto mb-4 h-8 w-8 text-gold/70" /><h2 className="font-display text-xl font-semibold">No hay artículos en esta versión</h2><p className="mt-2 text-sm text-muted-foreground">Crea un artículo y elige claramente dónde debe publicarse.</p></div>
      ) : (
        <div className="glass-card overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border/60 text-left text-xs uppercase text-muted-foreground"><th className="px-4 py-3">Artículo</th><th className="px-4 py-3">Versión</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3">Actualización</th><th className="px-4 py-3 text-right">Acciones</th></tr></thead><tbody>
          {posts.map((post) => <tr key={post.id} className="border-b border-border/40 hover:bg-accent/40"><td className="px-4 py-3"><div className="font-medium">{post.title}</div><div className="mt-1 text-xs text-muted-foreground">{publicUrl(post)}</div></td><td className="px-4 py-3"><span className="rounded-full border border-border px-2.5 py-1 text-xs">{post.language === "en" ? "Inglés" : "Español"}</span></td><td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs ${post.active ? "bg-emerald-500/15 text-emerald-500" : "bg-muted text-muted-foreground"}`}>{post.active ? "Publicado" : "Borrador"}</span></td><td className="px-4 py-3 text-muted-foreground">{new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(post.updated_at))}</td><td className="px-4 py-3"><div className="flex justify-end gap-2"><Link to={`/admin/blog/${post.id}/editar`} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs"><Pencil className="h-3.5 w-3.5" /> Editar</Link>{post.active && <Link to={publicUrl(post)} target="_blank" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs"><ExternalLink className="h-3.5 w-3.5" /> Ver</Link>}</div></td></tr>)}
        </tbody></table></div>
      )}
    </AdminLayout>
  );
}
