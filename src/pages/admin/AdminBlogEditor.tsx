import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, CheckCircle2, ImagePlus, Loader2, Save, Sparkles, XCircle } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Chip } from "@/components/admin/Chip";
import { checkEditorialRules, htmlToText, summarizeRules, words, type EditorialRule } from "@/lib/editorial-rules";
import { supabase } from "@/integrations/supabase/client";
import { SEO_EDITORIAL } from "@/content/seoEditorial";

type BlogLanguage = "es" | "en";
type FormState = { title: string; slug: string; excerpt: string; content: string; meta_title: string; meta_description: string; category: string; keyword: string; cover_image: string; author: string; language: BlogLanguage; active: boolean; published_at: string };
const emptyForm: FormState = { title: "", slug: "", excerpt: "", content: "", meta_title: "", meta_description: "", category: "", keyword: "", cover_image: "", author: "Ferova Agency", language: "es", active: false, published_at: new Date().toISOString().slice(0, 16) };
const fieldClass = "admin-field";
const slugify = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isLegacy = Boolean(id?.startsWith("legacy--"));
  const inputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [ideas, setIdeas] = useState("");
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const destination = useMemo(() => `${form.language === "en" ? "/en/blog/" : "/blog/"}${form.slug || "slug-del-articulo"}`, [form.language, form.slug]);
  // Reglas editoriales (CLAUDE.md §3–§4): orientativas, se recalculan en vivo y nunca bloquean el guardado.
  const rules = useMemo(() => checkEditorialRules(form, form.language), [form]);
  const summary = useMemo(() => summarizeRules(rules), [rules]);
  const wordCount = useMemo(() => words(htmlToText(form.content)).length, [form.content]);

  useEffect(() => {
    if (!id) return;
    if (isLegacy) {
      const inherited = SEO_EDITORIAL.find((post) => post.slug === id.replace(/^legacy--/, ""));
      if (inherited) {
        setForm((current) => ({ ...current, title: inherited.title, slug: inherited.slug, excerpt: inherited.excerpt, category: inherited.category, keyword: inherited.slug.replace(/-/g, " "), active: false }));
        setIdeas(`Desarrolla este enfoque sin inventar datos: ${inherited.excerpt}`);
      } else toast.error("No encontramos el contenido heredado.");
      setLoading(false);
      return;
    }
    void (async () => {
      const { data, error } = await supabase.from("blog_posts").select("id,title,slug,excerpt,content,meta_title,meta_description,category,keyword,cover_image,author,language,active,published_at").eq("id", id).single();
      if (error || !data) toast.error("No fue posible cargar el artículo.");
      else setForm({ title: data.title, slug: data.slug, excerpt: data.excerpt ?? "", content: data.content, meta_title: data.meta_title ?? "", meta_description: data.meta_description ?? "", category: data.category ?? "", keyword: data.keyword ?? "", cover_image: data.cover_image ?? "", author: data.author ?? "Ferova Agency", language: data.language as BlogLanguage, active: data.active, published_at: new Date(data.published_at).toISOString().slice(0, 16) });
      setLoading(false);
    })();
  }, [id, isLegacy]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }));

  const generate = async () => {
    if (!form.title.trim() || !form.keyword.trim() || !ideas.trim()) return toast.error("Completa título, keyword e ideas principales.");
    setGenerating(true);
    const { data, error } = await supabase.functions.invoke("blog-article-generator", { body: { action: "generate", payload: { title: form.title, keyword: form.keyword, category: form.category, ideas, lang: form.language, excludeId: !isLegacy ? id : undefined } } });
    if (error || !data?.article) toast.error(error?.message || "El generador no devolvió un artículo.");
    else {
      // Solo los campos del formulario: el generador devuelve además campos de
      // apoyo (aporta_original, schema_article…) que no son columnas y harían
      // fallar el guardado.
      const raw = data.article as Record<string, unknown>;
      const article = Object.fromEntries(
        (Object.keys(emptyForm) as (keyof FormState)[]).filter((k) => typeof raw[k] === "string").map((k) => [k, raw[k]]),
      ) as Partial<FormState>;
      setForm((current) => ({ ...current, ...article, slug: id ? current.slug : article.slug || current.slug, language: current.language, active: current.active, published_at: current.published_at, cover_image: article.cover_image || current.cover_image, author: article.author || current.author }));
      const images = data.images as { generated?: number; requested?: number } | undefined;
      toast.success(images?.requested
        ? `Borrador generado con ${images.generated ?? 0} de ${images.requested} imágenes. Revísalo antes de guardar.`
        : "Borrador generado. Puedes editar todos sus campos antes de guardar.");
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
    const result = id && !isLegacy ? await supabase.from("blog_posts").update(payload).eq("id", id).select("id").single() : await supabase.from("blog_posts").insert(payload).select("id").single();
    if (result.error) toast.error(result.error.message); else { toast.success(form.active ? "Artículo publicado y actualizado." : "Borrador guardado."); navigate(`/admin/blog/${result.data.id}/editar`, { replace: !id }); }
    setSaving(false);
  };

  if (loading) return <AdminLayout title="Artículo"><div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin" aria-label="Cargando" /></div></AdminLayout>;
  const len = (value: string) => [...value.trim()].length;
  return <AdminLayout title={id ? "Editar artículo" : "Nuevo artículo"} description={destination}>
    <div className="mb-4"><Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#2f2d56]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver a artículos</Link>{isLegacy && <p className="admin-alert admin-alert--info mt-3">Este artículo conserva su URL actual. Añade tus datos, genera el borrador con IA y guárdalo para convertirlo en contenido administrable.</p>}</div>
    <form onSubmit={save} className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-5">
        <section className="admin-card"><h2 className="admin-card__title">Datos del artículo</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Versión del sitio *"><select className={fieldClass} value={form.language} onChange={(e) => update("language", e.target.value as BlogLanguage)}><option value="es">Español — /blog</option><option value="en">Inglés — /en/blog</option></select></Field>
          <Field label="Autor"><input className={fieldClass} value={form.author} onChange={(e) => update("author", e.target.value)} /></Field>
          <Field label="Título *" count={`${len(form.title)}/65`} over={len(form.title) > 65}><input ref={inputRef} className={fieldClass} value={form.title} onChange={(e) => { update("title", e.target.value); if (!id && !form.slug) update("slug", slugify(e.target.value)); }} /></Field>
          <Field label="Slug *"><input className={`${fieldClass} admin-mono`} value={form.slug} onChange={(e) => update("slug", slugify(e.target.value))} /></Field>
          <Field label="Categoría"><input className={fieldClass} value={form.category} onChange={(e) => update("category", e.target.value)} /></Field>
          <Field label="Keyword"><input className={fieldClass} value={form.keyword} onChange={(e) => update("keyword", e.target.value)} placeholder="Keyword principal" /></Field>
        </div><div className="mt-4"><Field label="Extracto"><textarea rows={3} className={fieldClass} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} /></Field></div></section>

        <section className="admin-card"><h2 className="admin-card__title flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#c0930e]" aria-hidden="true" /> Asistente de redacción</h2><p className="admin-sub mt-1">Genera contenido directamente en el idioma elegido; no traduce otro artículo. Necesita título, keyword e ideas.</p><textarea rows={4} aria-label="Ideas principales para el generador" className={fieldClass} value={ideas} onChange={(e) => setIdeas(e.target.value)} placeholder="Ideas, enfoque y datos que debe incluir" /><button type="button" onClick={generate} disabled={generating} className="admin-btn admin-btn--ghost mt-3">{generating ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Sparkles aria-hidden="true" />} Generar borrador</button></section>

        <section className="admin-card"><div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className="admin-card__title">Contenido *</h2><span className="admin-mono text-xs text-muted-foreground">{wordCount} palabras</span></div><p className="admin-sub mt-1">Escribe y da formato visualmente; no necesitas usar HTML. Usa H2 para secciones y H3 dentro de ellas.</p><RichTextEditor value={form.content} onChange={(value) => update("content", value)} /></section>

        <section className="admin-card"><h2 className="admin-card__title">SEO y vista en Google</h2><p className="admin-sub mt-1">Opcional. Si lo dejas vacío, se usarán el título y el extracto.</p><div className="mt-4 space-y-4">
          <Field label="Meta title" count={`${len(form.meta_title)}/60`} over={len(form.meta_title) > 60}><input maxLength={70} className={fieldClass} value={form.meta_title} onChange={(e) => update("meta_title", e.target.value)} /></Field>
          <Field label="Meta description" count={`${len(form.meta_description)} · 150–160`} over={len(form.meta_description) > 160}><textarea maxLength={170} rows={3} className={fieldClass} value={form.meta_description} onChange={(e) => update("meta_description", e.target.value)} /></Field>
          <div className="admin-serp" aria-label="Vista previa en Google"><div className="admin-serp__url">seoparaecommerce.co{destination}</div><div className="admin-serp__title">{form.meta_title || form.title || "Título del artículo"}</div><div className="admin-serp__desc">{form.meta_description || form.excerpt || "La meta description aparecerá aquí."}</div></div>
        </div></section>

        <section className="admin-card"><h2 className="admin-card__title">Imagen de portada</h2>{form.cover_image ? <img src={form.cover_image} alt="Portada" className="mt-3 aspect-video w-full rounded-xl object-cover" /> : <p className="admin-sub mt-1">Formato horizontal 16:9, máximo 5 MB.</p>}<button type="button" onClick={() => inputRef.current?.focus()} className="sr-only">Enfocar título</button><label className="admin-btn admin-btn--ghost mt-3 cursor-pointer focus-within:outline focus-within:outline-2 focus-within:outline-[#541014]"><ImagePlus aria-hidden="true" /> {uploading ? "Subiendo..." : form.cover_image ? "Cambiar imagen" : "Subir imagen"}<input type="file" accept="image/*" className="sr-only" disabled={uploading} onChange={(e) => e.target.files?.[0] && void uploadCover(e.target.files[0])} /></label></section>
      </div>

      <aside className="admin-sticky min-w-0 space-y-5">
        <section className="admin-card"><h2 className="admin-card__title">Publicación</h2><p className="admin-mono mt-2 break-all text-xs text-muted-foreground">Destino: {destination}</p><div className="mt-4"><Field label="Fecha"><input type="datetime-local" className={fieldClass} value={form.published_at} onChange={(e) => update("published_at", e.target.value)} /></Field></div><label className="mt-4 flex items-center gap-3 text-sm font-medium"><input type="checkbox" className="h-4 w-4 accent-[#541014]" checked={form.active} onChange={(e) => update("active", e.target.checked)} /> Publicar en esta versión</label>
          <a href="#reglas-editoriales" className="mt-4 flex flex-wrap items-center gap-1.5 rounded-xl bg-[#f7f8fc] px-3 py-2 text-xs" aria-label={`Reglas editoriales: ${summary.pass} cumplidas, ${summary.warn} avisos, ${summary.fail} por corregir`}><span className="font-semibold text-foreground">Reglas:</span><Chip tone="ok">{summary.pass} OK</Chip><Chip tone="wait">{summary.warn} avisos</Chip><Chip tone="bad">{summary.fail} corregir</Chip></a>
          <button type="submit" disabled={saving} className="admin-btn admin-btn--block mt-3">{saving ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Save aria-hidden="true" />} Guardar cambios</button>
          <p className="mt-2 text-xs text-muted-foreground">Las reglas son orientativas: no bloquean el guardado.</p>
        </section>
        <EditorialRulesPanel rules={rules} language={form.language} />
      </aside>
    </form>
  </AdminLayout>;
}

const RULE_ICON = { pass: CheckCircle2, warn: AlertTriangle, fail: XCircle } as const;
const RULE_STATE = { pass: "OK", warn: "Aviso", fail: "Corregir" } as const;

function EditorialRulesPanel({ rules, language }: { rules: EditorialRule[]; language: BlogLanguage }) {
  return <section id="reglas-editoriales" className="admin-card scroll-mt-28" aria-labelledby="reglas-title">
    <div className="flex items-baseline justify-between gap-2"><h2 id="reglas-title" className="admin-card__title">Reglas editoriales</h2><span className="admin-mono text-xs uppercase text-muted-foreground">{language}</span></div>
    <p className="admin-sub mt-1 text-xs">Se revisan en vivo mientras escribes.</p>
    <ul className="admin-rules mt-3" aria-live="polite">
      {rules.map((rule) => { const Icon = RULE_ICON[rule.status]; return <li key={rule.id} className={`admin-rule admin-rule--${rule.status}`}><Icon aria-hidden="true" /><div className="min-w-0"><div className="flex items-start justify-between gap-2"><span className="admin-rule__label">{rule.label}</span><span className="admin-rule__state shrink-0">{RULE_STATE[rule.status]}</span></div><p className="admin-rule__detail">{rule.detail}</p></div></li>; })}
    </ul>
    <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">Reglas completas en <code className="admin-mono text-[#2f2d56]">CLAUDE.md</code> §3–§4.</p>
  </section>;
}

function Field({ label, count, over, children }: { label: string; count?: string; over?: boolean; children: React.ReactNode }) { return <label className="admin-label">{label}{count && <small className={`admin-mono ml-2 ${over ? "!text-[#8b1d22]" : ""}`}>· {count}</small>}{children}</label>; }
