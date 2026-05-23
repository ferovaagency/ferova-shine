import { useEffect, useState } from 'react';
import { Loader2, Languages, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Row {
  id: string;
  slug: string;
  title: string;
  title_en: string | null;
  title_pt: string | null;
}

export default function BlogTranslations() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title, title_en, title_pt')
      .eq('active', true)
      .order('published_at', { ascending: false })
      .limit(50);
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
    setRows((data as Row[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const translate = async (id: string, target: 'en' | 'pt') => {
    setBusy(`${id}-${target}`);
    try {
      const { error } = await supabase.functions.invoke('translate-content', {
        body: { postId: id, target },
      });
      if (error) throw error;
      toast({ title: `Traducido a ${target.toUpperCase()}` });
      await load();
    } catch (e) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error', variant: 'destructive' });
    } finally {
      setBusy(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Languages className="h-5 w-5" /> Traducciones de artículos</CardTitle>
        <CardDescription>Genera versiones EN y PT con IA. Los lectores las verán automáticamente según el idioma del sitio.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : (
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {rows.map((r) => (
              <div key={r.id} className="flex items-center gap-2 rounded-lg border border-border p-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.title}</p>
                  <p className="text-xs text-muted-foreground truncate">/{r.slug}</p>
                </div>
                <Button
                  size="sm" variant={r.title_en ? 'outline' : 'default'}
                  disabled={busy === `${r.id}-en`}
                  onClick={() => translate(r.id, 'en')}
                >
                  {busy === `${r.id}-en` ? <Loader2 className="h-3 w-3 animate-spin" /> : r.title_en ? <CheckCircle2 className="h-3 w-3 mr-1" /> : null}
                  EN
                </Button>
                <Button
                  size="sm" variant={r.title_pt ? 'outline' : 'default'}
                  disabled={busy === `${r.id}-pt`}
                  onClick={() => translate(r.id, 'pt')}
                >
                  {busy === `${r.id}-pt` ? <Loader2 className="h-3 w-3 animate-spin" /> : r.title_pt ? <CheckCircle2 className="h-3 w-3 mr-1" /> : null}
                  PT
                </Button>
              </div>
            ))}
            {rows.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No hay artículos</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
