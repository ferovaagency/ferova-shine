// Translate blog post via Lovable AI Gateway (Gemini)
// Supports two modes:
// 1) { content, targetLang } -> translates a single string and returns it
// 2) { postId, target } -> fetches post, translates title/excerpt/content/meta_*, saves back
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const langName = (l: string) =>
  l === 'en' ? 'English (US)' : l === 'pt' ? 'Brazilian Portuguese' : l;

async function translateOne(text: string, target: string, kind: string) {
  if (!text) return '';
  const prompt = `Translate the following ${kind} from Spanish to ${langName(target)}. Preserve all HTML tags, attributes, links and structure. Keep the tone professional and conversion-oriented (marketing copy). Do not add any preamble or comments. Return ONLY the translated text.\n\n---\n${text}`;
  const res = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${LOVABLE_API_KEY}` },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    }),
  });
  if (!res.ok) throw new Error(`AI gateway error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? '';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');

    // Require admin auth
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser(authHeader.replace('Bearer ', ''));
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: roles } = await adminClient.from('user_roles').select('role').eq('user_id', userData.user.id);
    if (!roles?.some((r: { role: string }) => r.role === 'admin')) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const body = await req.json();


    // Mode 2: translate full post by ID
    if (body.postId && body.target) {
      const target = String(body.target);
      if (!['en', 'pt'].includes(target)) throw new Error('target must be en or pt');
      const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRe.test(String(body.postId))) throw new Error('invalid postId');

      const supabase = adminClient;


      const { data: post, error } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, content, meta_title, meta_description')
        .eq('id', body.postId)
        .maybeSingle();
      if (error || !post) throw new Error(error?.message || 'Post not found');

      const [title, excerpt, content, meta_title, meta_description] = await Promise.all([
        translateOne(post.title || '', target, 'blog title'),
        translateOne(post.excerpt || '', target, 'blog excerpt'),
        translateOne(post.content || '', target, 'HTML article'),
        translateOne(post.meta_title || '', target, 'SEO meta title'),
        translateOne(post.meta_description || '', target, 'SEO meta description'),
      ]);

      const update: Record<string, string> = {
        [`title_${target}`]: title,
        [`excerpt_${target}`]: excerpt,
        [`content_${target}`]: content,
        [`meta_title_${target}`]: meta_title,
        [`meta_description_${target}`]: meta_description,
      };

      const { error: upErr } = await supabase.from('blog_posts').update(update).eq('id', body.postId);
      if (upErr) throw upErr;

      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Mode 1: translate single string
    const { content, targetLang, contentType = 'HTML article' } = body;
    if (!content || !targetLang) throw new Error('Missing content or targetLang');
    const translated = await translateOne(content, targetLang, contentType);
    return new Response(JSON.stringify({ translated }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
