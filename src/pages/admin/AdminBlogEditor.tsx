import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, Loader2, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

type BlogLanguage = "es" | "en";
type FormState = { title: string; slug: string; excerpt: string; content: string; meta_title: string; meta_description: string; category: string; keyword: string; cover_image: string; author: string; language: BlogLanguage; active: boolean; published_at: string };
const emptyForm: FormState = { title: "", slug: "", excerpt: "", content: "", meta_title: "", meta_description: "", category: "", keyword: "", cover_image: "", author: "Ferova Agency", language: "es", active: false, published_at: new Date().toISOString().slice(0, 16) };
const fieldClass = "mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-gold/60";
const slugify = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [ideas, setIdeas] = useState("");
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const destination = useMemo(() => `${form.language === "en" ? "/en/blog/" : "/blog/"}${form.slug || "slug-del-articulo"}`, [form.language, form.slug]);

  useEffect(() => {
    if (!id) return;
    void (async () => {
      const { data, error } = await supabase.from("blog_posts").select("id,title,slug,excerpt,content,meta_title,meta_description,category,keyword,cover_image,author,language,active,published_at").eq("id", id).single();
      if (error || !data) toast.error("No fue posible cargar el artículo.");
      else setForm({ title: data.title, slug: data.slug, excerpt: data.excerpt ?? "", content: data.content, meta_title: data.meta_title ?? "", meta_description: data.meta_description ?? "", category: data.category ?? "", keyword: data.keyword ?? "", cover_image: data.cover_image ?? "", author: data.author ?? "Ferova Agency", language: data.language as BlogLanguage, active: data.active, published_at: new Date(data.published_at).toISOString().slice(0, 16) });
      setLoading(false);
    })();
  }, [id]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }));

  const generate = async () => {
    if (!form.title.trim() || !form.keyword.trim() || !ideas.trim()) return toast.error("Completa título, keyword e ideas principales.");
    setGenerating(true);
    const { data, error } = await supabase.functions.invoke("blog-article-generator", { body: { action: "generate", payload: { title: form.title, keyword: form.keyword, category: form.category, ideas, lang: form.language } } });
    if (error || !data?.article) toast.error(error?.message || "El generador no devolvió un artículo.");
    else {
      const article = data.article as Partial<FormState>;
      setForm((current) => ({ ...current, ...article, language: current.language, active: current.active, published_at: current.published_at, cover_image: article.cover_image || current.cover_image, author: article.author || current.author }));
      toast.success("Borrador generado. Puedes editar todos sus campos antes de guardar.");
    }
    setGenerating(false);
  };

  const uploadCover = async (file: File) => {
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) return toast.error("Usa una imagen de máximo 5 MB.");
    setUploading(true);
    const extension = file.name.split(".").pop() || "jpg";
    const path = `${form.language}/${form.slug || "articulo"}-${Date.now()}.${extension}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file, { upsert: true, contentType: file.type });
    if (error) toast.error(error.message); else update("cover_image", supabase.storage.from("blog-images").getPublicUrl(path).data.publicUrl);
    setUploading(false);
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) return toast.error("Título, slug y contenido son obligatorios.");
    setSaving(true);
    const payload = { ...form, slug: slugify(form.slug), excerpt: form.excerpt || null, meta_title: form.meta_title || null, meta_description: form.meta_description || null, category: form.category || null, keyword: form.keyword || null, cover_image: form.cover_image || null, published_at: new Date(form.published_at).toISOString(), updated_at: new Date().toISOString() };
    const result = id ? await supabase.from("blog_posts").update(payload).eq("id", id).select("id").single() : await supabase.from("blog_posts").insert(payload).select("id").single();
    if (result.error) toast.error(result.error.message); else { toast.success(form.active ? "Artículo publicado y actualizado." : "Borrador guardado."); navigate(`/admin/blog/${result.data.id}/editar`, { replace: !id }); }
    setSaving(false);
  };

  if (loading) return <AdminLayout title="Artículo"><div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin" /></div></AdminLayout>;
  return <AdminLayout title={id ? "Editar artículo" : "Nuevo artículo"}>
    <div className="mb-6"><Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Volver a artículos</Link></div>
    <form onSubmit={save} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-6"><section className="glass-card p-5 sm:p-6"><h2 className="font-display text-lg font-semibold">Contenido editable</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Versión del sitio *"><select className={fieldClass} value={form.language} onChange={(e) => update("language", e.target.value as BlogLanguage)}><option value="es">Español — /blog</option><option value="en">Inglés — /en/blog</option></select></Field>
        <Field label="Autor"><input className={fieldClass} value={form.author} onChange={(e) => update("author", e.target.value)} /></Field>
        <Field label="Título *"><input ref={inputRef} className={fieldClass} value={form.title} onChange={(e) => { update("title", e.target.value); if (!id && !form.slug) update("slug", slugify(e.target.value)); }} /></Field>
        <Field label="Slug *"><input className={fieldClass} value={form.slug} onChange={(e) => update("slug", slugify(e.target.value))} /></Field>
        <Field label="Categoría"><input className={fieldClass} value={form.category} onChange={(e) => update("category", e.target.value)} /></Field><Field label="Keyword"><input className={fieldClass} value={form.keyword} onChange={(e) => update("keyword", e.target.value)} /></Field>
      </div><Field label="Extracto"><textarea rows={3} className={fieldClass} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} /></Field><Field label="Contenido HTML *"><textarea rows={20} className={`${fieldClass} font-mono`} value={form.content} onChange={(e) => update("content", e.target.value)} /></Field></section>
      <section className="glass-card p-5 sm:p-6"><h2 className="font-display text-lg font-semibold">SEO</h2><Field label="Meta title"><input className={fieldClass} value={form.meta_title} onChange={(e) => update("meta_title", e.target.value)} /></Field><Field label="Meta description"><textarea rows={3} className={fieldClass} value={form.meta_description} onChange={(e) => update("meta_description", e.target.value)} /></Field></section></div>
      <aside className="space-y-5"><section className="glass-card p-5"><h2 className="font-semibold">Publicación</h2><p className="mt-2 break-all text-xs text-muted-foreground">Destino: {destination}</p><Field label="Fecha"><input type="datetime-local" className={fieldClass} value={form.published_at} onChange={(e) => update("published_at", e.target.value)} /></Field><label className="mt-4 flex items-center gap-3 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => update("active", e.target.checked)} /> Publicar en esta versión</label><button type="submit" disabled={saving} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Guardar cambios</button></section>
      <section className="glass-card p-5"><h2 className="flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4" /> Asistente de redacción</h2><p className="mt-2 text-xs text-muted-foreground">Genera contenido directamente en el idioma elegido; no traduce otro artículo.</p><textarea rows={5} className={fieldClass} value={ideas} onChange={(e) => setIdeas(e.target.value)} placeholder="Ideas, enfoque y datos que debe incluir" /><button type="button" onClick={generate} disabled={generating} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm">{generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} Generar borrador</button></section>
      <section className="glass-card p-5"><h2 className="font-semibold">Imagen de portada</h2>{form.cover_image && <img src={form.cover_image} alt="Portada" className="mt-3 aspect-video w-full rounded-xl object-cover" />}<button type="button" onClick={() => inputRef.current?.focus()} className="sr-only">Enfocar título</button><label className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm"><ImagePlus className="h-4 w-4" /> {uploading ? "Subiendo..." : "Subir imagen"}<input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => e.target.files?.[0] && void uploadCover(e.target.files[0])} /></label></section></aside>
    </form>
  </AdminLayout>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="mt-4 block text-sm font-medium text-foreground">{label}{children}</label>; }
