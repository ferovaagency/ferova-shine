import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, listId = 11 } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Email válido requerido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
    if (!BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY is not configured');
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        attributes: { FIRSTNAME: (name || '').trim() },
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!response.ok && response.status !== 204) {
      const error = await response.json();
      if (error.code === 'duplicate_parameter') {
        return new Response(
          JSON.stringify({ success: true, message: 'Ya estás suscrito' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(error.message || 'Error al suscribir');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Suscrito exitosamente' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Newsletter subscribe error:', message);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
