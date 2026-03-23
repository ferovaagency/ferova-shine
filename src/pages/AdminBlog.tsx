import { useEffect, useMemo, useState } from 'react';
import { Loader2, Lock, LogIn, LogOut, Save, Sparkles } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PageTransition } from '@/components/ui/motion';

interface Props {
  lang?: 'es' | 'en' | 'pt';
}

interface ArticleDraft {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_title: string;
  meta_description: string;
  category: string;
  keyword: string;
  cover_image: string | null;
  author: string;
  active: boolean;
}

const emptyForm = {
  title: '',
  keyword: '',
  category: '',
};

const getSafeString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const normalizeArticle = (raw: unknown): ArticleDraft => {
  const source = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const article: ArticleDraft = {
    title: getSafeString(source.title),
    slug: getSafeString(source.slug),
    excerpt: getSafeString(source.excerpt),
    content: getSafeString(source.content),
    meta_title: getSafeString(source.meta_title),
    meta_description: getSafeString(source.meta_description),
    category: getSafeString(source.category),
    keyword: getSafeString(source.keyword),
    cover_image: getSafeString(source.cover_image) || null,
    author: getSafeString(source.author) || 'AnnovaSoft',
    active: source.active === false ? false : true,
  };

  if (!article.title || !article.slug || !article.excerpt || !article.content || !article.meta_title || !article.meta_description) {
    throw new Error('La respuesta del generador llegó incompleta.');
  }

  return article;
};

const AdminBlog = ({ lang = 'es' }: Props) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState<ArticleDraft | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const copy = useMemo(() => lang === 'es' ? {
    title: 'Admin Blog',
    sub: 'Genera artículos SEO en minutos, revisa la vista previa y guárdalos sin tocar el frontend del blog.',
    loginTitle: 'Acceso administrador',
    loginSub: 'Inicia sesión para generar y guardar artículos en la base de datos.',
    email: 'Correo',
    password: 'Contraseña',
    login: 'Entrar',
    logout: 'Cerrar sesión',
    generator: 'Generador de artículos',
    generatorSub: 'Completa los datos base y deja que la IA redacte el artículo con estructura SEO.',
    articleTitle: 'Título base',
    keyword: 'Keyword principal',
    category: 'Categoría (opcional)',
    generate: 'Generar artículo',
    generating: 'Generando...',
    save: 'Guardar en blog_posts',
    saving: 'Guardando...',
    preview: 'Vista previa',
    previewSub: 'Revisa título, slug, excerpt, SEO y contenido antes de guardar.',
    emptyPreview: 'Todavía no hay preview. Genera un artículo para revisarlo aquí.',
    loginRequired: 'Debes iniciar sesión para usar el panel.',
    slug: 'Slug',
    excerpt: 'Excerpt',
    metaTitle: 'Meta title',
    metaDescription: 'Meta description',
    content: 'Contenido HTML',
    loggedInAs: 'Sesión activa',
    generatedOk: 'Artículo generado correctamente.',
    savedOk: 'Artículo guardado en blog_posts.',
    authError: 'No fue posible validar la sesión.',
    saveFirst: 'Primero genera un artículo.',
    requiredFields: 'Completa título y keyword principal.',
  } : {
    title: 'Blog Admin',
    sub: 'Generate SEO-ready articles, review the preview and save them without touching the blog frontend.',
    loginTitle: 'Administrator access',
    loginSub: 'Sign in to generate and save articles in the database.',
    email: 'Email',
    password: 'Password',
    login: 'Sign in',
    logout: 'Sign out',
    generator: 'Article generator',
    generatorSub: 'Complete the base inputs and let AI draft the article with SEO structure.',
    articleTitle: 'Base title',
    keyword: 'Primary keyword',
    category: 'Category (optional)',
    generate: 'Generate article',
    generating: 'Generating...',
    save: 'Save to blog_posts',
    saving: 'Saving...',
    preview: 'Preview',
    previewSub: 'Review title, slug, excerpt, SEO and content before saving.',
    emptyPreview: 'There is no preview yet. Generate an article to review it here.',
    loginRequired: 'You must sign in to use the panel.',
    slug: 'Slug',
    excerpt: 'Excerpt',
    metaTitle: 'Meta title',
    metaDescription: 'Meta description',
    content: 'HTML content',
    loggedInAs: 'Active session',
    generatedOk: 'Article generated successfully.',
    savedOk: 'Article saved to blog_posts.',
    authError: 'Could not validate the session.',
    saveFirst: 'Generate an article first.',
    requiredFields: 'Complete title and primary keyword.',
  }, [lang]);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setIsAuthenticated(Boolean(data.session));
        setUserEmail(data.session?.user?.email ?? '');
      } catch {
        if (mounted) {
          toast({ title: copy.authError, variant: 'destructive' });
        }
      } finally {
        if (mounted) setCheckingAuth(false);
      }
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setIsAuthenticated(Boolean(session));
      setUserEmail(session?.user?.email ?? '');
      setCheckingAuth(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [copy.authError, toast]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ title: copy.loginTitle, description: userEmail || email });
    } catch (error) {
      toast({
        title: copy.loginRequired,
        description: error instanceof Error ? error.message : copy.authError,
        variant: 'destructive',
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setPreview(null);
    } catch (error) {
      toast({
        title: copy.authError,
        description: error instanceof Error ? error.message : copy.authError,
        variant: 'destructive',
      });
    }
  };

  const handleGenerate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.title.trim() || !form.keyword.trim()) {
      toast({ title: copy.requiredFields, variant: 'destructive' });
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke('blog-article-generator', {
        body: {
          action: 'generate',
          payload: {
            title: form.title,
            keyword: form.keyword,
            category: form.category,
            lang,
          },
        },
      });

      if (error) throw error;
      const article = normalizeArticle((data as { article?: unknown } | null)?.article);
      setPreview(article);
      toast({ title: copy.generatedOk });
    } catch (error) {
      toast({
        title: copy.generator,
        description: error instanceof Error ? error.message : copy.authError,
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!preview) {
      toast({ title: copy.saveFirst, variant: 'destructive' });
      return;
    }

    setIsSaving(true);

    try {
      const { data, error } = await supabase.functions.invoke('blog-article-generator', {
        body: {
          action: 'save',
          payload: { article: preview },
        },
      });

      if (error) throw error;

      const savedSlug = getSafeString((data as { post?: { slug?: string } } | null)?.post?.slug);
      toast({
        title: copy.savedOk,
        description: savedSlug ? `${copy.slug}: ${savedSlug}` : undefined,
      });
      setForm(emptyForm);
      setPreview(null);
    } catch (error) {
      toast({
        title: copy.generator,
        description: error instanceof Error ? error.message : copy.authError,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageTransition>
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="border-b border-border/50 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" /> {copy.title}
              </p>
              <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">{copy.title}</h1>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{copy.sub}</p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto grid gap-8 px-4 md:px-6 lg:grid-cols-[420px,1fr]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" /> {copy.loginTitle}
                  </CardTitle>
                  <CardDescription>{copy.loginSub}</CardDescription>
                </CardHeader>
                <CardContent>
                  {checkingAuth ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> {copy.loggedInAs}...
                    </div>
                  ) : isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
                        <span className="block text-xs text-muted-foreground">{copy.loggedInAs}</span>
                        <span className="font-medium">{userEmail || 'admin'}</span>
                      </div>
                      <Button type="button" variant="outline" className="w-full" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" /> {copy.logout}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin-email">{copy.email}</Label>
                        <Input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-password">{copy.password}</Label>
                        <Input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                      </div>
                      <Button type="submit" className="w-full">
                        <LogIn className="mr-2 h-4 w-4" /> {copy.login}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{copy.generator}</CardTitle>
                  <CardDescription>{copy.generatorSub}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGenerate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="article-title">{copy.articleTitle}</Label>
                      <Input id="article-title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder={lang === 'es' ? 'Ej. SEO local para clínicas odontológicas' : 'E.g. Local SEO for dental clinics'} disabled={!isAuthenticated || isGenerating} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="article-keyword">{copy.keyword}</Label>
                      <Input id="article-keyword" value={form.keyword} onChange={(event) => setForm((current) => ({ ...current, keyword: event.target.value }))} placeholder={lang === 'es' ? 'seo local odontología' : 'local seo dentistry'} disabled={!isAuthenticated || isGenerating} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="article-category">{copy.category}</Label>
                      <Input id="article-category" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} placeholder={lang === 'es' ? 'SEO' : 'SEO'} disabled={!isAuthenticated || isGenerating} />
                    </div>
                    <Button type="submit" className="w-full" disabled={!isAuthenticated || isGenerating}>
                      {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      {isGenerating ? copy.generating : copy.generate}
                    </Button>
                    {!isAuthenticated && !checkingAuth && (
                      <p className="text-sm text-muted-foreground">{copy.loginRequired}</p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{copy.preview}</CardTitle>
                <CardDescription>{copy.previewSub}</CardDescription>
              </CardHeader>
              <CardContent>
                {preview ? (
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-border bg-muted/30 p-4">
                        <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">{copy.slug}</p>
                        <p className="text-sm font-medium text-foreground">{preview.slug}</p>
                      </div>
                      <div className="rounded-xl border border-border bg-muted/30 p-4">
                        <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">{copy.excerpt}</p>
                        <p className="text-sm text-foreground">{preview.excerpt}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{copy.metaTitle}</p>
                      <div className="rounded-xl border border-border bg-background p-4 text-sm text-foreground">{preview.meta_title}</div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{copy.metaDescription}</p>
                      <div className="rounded-xl border border-border bg-background p-4 text-sm text-foreground">{preview.meta_description}</div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{copy.content}</p>
                      <article className="prose prose-sm max-w-none rounded-2xl border border-border bg-background p-5 text-foreground dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground" dangerouslySetInnerHTML={{ __html: preview.content }} />
                    </div>

                    <Button type="button" onClick={handleSave} disabled={isSaving || !isAuthenticated}>
                      {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                      {isSaving ? copy.saving : copy.save}
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center text-sm text-muted-foreground">
                    {copy.emptyPreview}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </PageTransition>
  );
};

export default AdminBlog;
