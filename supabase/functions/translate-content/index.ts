// Translate blog content via Lovable AI Gateway (Gemini)
// Public function — no auth required, uses LOVABLE_API_KEY server-side.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const { content, targetLang, contentType = 'HTML article' } = await req.json();
    if (!content || !targetLang) {
      return new Response(JSON.stringify({ error: 'Missing content or targetLang' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const langName =
      targetLang === 'en' ? 'English (US)'
      : targetLang === 'pt' ? 'Brazilian Portuguese'
      : targetLang;

    const prompt = `Translate the following ${contentType} from Spanish to ${langName}. Preserve all HTML tags, attributes, links and structure. Keep the tone professional and conversion-oriented (marketing copy). Do not add any preamble or comments. Return ONLY the translated text.\n\n---\n${content}`;

    const res = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({ error: `AI gateway error: ${res.status} ${errText}` }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    const translated = data?.choices?.[0]?.message?.content ?? '';
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
