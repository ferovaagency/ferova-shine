// Edge function: sincroniza un contacto con la lista de newsletter de Brevo.
// Pública (sin JWT) — usada por popup, recursos, asesor IA, newsletter.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface Payload {
  email: string;
  name?: string;
  source?: string;
  attributes?: Record<string, unknown>;
}

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 254;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = (await req.json().catch(() => ({}))) as Partial<Payload>;
    const email = (body.email || '').trim().toLowerCase();
    const name = (body.name || '').trim().slice(0, 120);
    const source = (body.source || 'web').toString().slice(0, 60);
    const attributes = (body.attributes && typeof body.attributes === 'object') ? body.attributes : {};

    const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
    // Hardcoded server-side: never accept client-supplied listId.
    const LIST_ID = Number(Deno.env.get('BREVO_LIST_NEWSLETTER') || '0');

    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Email inválido' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!BREVO_API_KEY || !LIST_ID) {
      return new Response(JSON.stringify({ error: 'Configuración faltante en el servidor' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        attributes: { NOMBRE: name || undefined, FUENTE: source, ...attributes },
        listIds: [LIST_ID],
        updateEnabled: true,
      }),
    });

    // Brevo devuelve 201 (creado), 204 (actualizado), o 400 si ya existe en la lista.
    if (res.ok || res.status === 204 || res.status === 400) {
      return new Response(JSON.stringify({ ok: true, status: res.status }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const errTxt = await res.text();
    console.error('brevo-sync upstream error', res.status, errTxt);
    return new Response(JSON.stringify({ error: `Brevo ${res.status}`, detail: errTxt }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('brevo-sync error', e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
