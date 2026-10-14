// Edge function kr-contacto-ia
// Dos modos:
//  - { modo: "tarjeta", imagen_base64, mime }  → lee una foto de tarjeta y devuelve los campos
//  - { modo: "investigar", contacto_id }       → lee la web del contacto, escribe veredicto, fit y propuesta (EN + KO) en kr_contactos
// Solo la ejecuta un admin (misma regla que /admin): user_roles.admin o cms_user_roles owner/editor/reviewer.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

const GRUPO = `Natan Holding Group (Bogotá, Colombia) agrupa tres empresas:
- Natan Commercial Agency (natanca.com): agencia comercial que representa fabricantes extranjeros en Colombia y Perú (representación exclusiva por territorio, estudios de prefactibilidad y factibilidad, registro sanitario INVIMA/DIGEMID, mínimos de venta, contratos promedio de 10 años). 18 años en marketing y ventas en Latinoamérica, experiencia en salud.
- Netpower IT (netpowerit.co): infraestructura y equipos de TI, cableado estructurado, UPS, redes, equipamiento de oficinas y puntos de stock.
- Ferova (ferova.com.co): desarrollo de software y web apps con IA, SEO/GEO, catálogos en español con fichas de producto generadas por IA, dashboards. Productos: Ferova One (sistema operativo de negocio) y Librero IA.
Contacto: María Fernanda Calderón, Gerencia · gerencia@seoparaecommerce.co · +1 786 578 7671.
Evento: KOTRA K Connect AI 2026, KINTEX, Corea del Sur, 21–22 oct 2026.`;

async function gemini(apiKey: string, messages: unknown[], schemaName: string, schema: Record<string, unknown>) {
  const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages,
      tools: [{ type: "function", function: { name: schemaName, parameters: schema } }],
      tool_choice: { type: "function", function: { name: schemaName } },
    }),
  });
  if (!r.ok) throw new Error(`gateway ${r.status}: ${await r.text()}`);
  const data = await r.json();
  const call = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!call) throw new Error("la IA no devolvió datos estructurados");
  return JSON.parse(call.function.arguments);
}

async function leerPagina(url: string, max = 6000): Promise<string> {
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; FerovaBot/1.0)" }, redirect: "follow" });
    if (!r.ok) return "";
    const html = await r.text();
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .slice(0, max);
  } catch {
    return "";
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  // deno-lint-ignore no-explicit-any
  let body: any = {};
  try {
    body = await req.json().catch(() => ({}));
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY no configurada");
    const url = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // 1. Quién llama: debe ser admin
    const auth = req.headers.get("Authorization") ?? "";
    const asUser = createClient(url, anon, { global: { headers: { Authorization: auth } } });
    const { data: { user } } = await asUser.auth.getUser();
    if (!user) return json({ error: "sin sesión" }, 401);
    const [{ data: r1 }, { data: r2 }] = await Promise.all([
      asUser.from("user_roles").select("role").eq("user_id", user.id),
      asUser.from("cms_user_roles").select("role").eq("user_id", user.id),
    ]);
    const esAdmin = r1?.some((r) => r.role === "admin") || r2?.some((r) => ["owner", "editor", "reviewer"].includes(r.role));
    if (!esAdmin) return json({ error: "sin permisos" }, 403);

    const db = createClient(url, service);

    // 2. Modo tarjeta: foto → campos
    if (body.modo === "tarjeta") {
      const out = await gemini(
        apiKey,
        [
          { role: "system", content: "Lees tarjetas de presentación (coreano, inglés o ambos). Devuelve los datos tal cual aparecen; si un campo no está, déjalo vacío. El nombre en formato 'hangul (romanizado)' si hay ambos." },
          {
            role: "user",
            content: [
              { type: "text", text: "Extrae los datos de esta tarjeta." },
              { type: "image_url", image_url: { url: `data:${body.mime || "image/jpeg"};base64,${body.imagen_base64}` } },
            ],
          },
        ],
        "tarjeta",
        {
          type: "object",
          properties: {
            nombre: { type: "string" }, empresa: { type: "string" }, cargo: { type: "string" },
            email: { type: "string" }, telefono: { type: "string" }, web: { type: "string" },
          },
          required: ["nombre"],
        },
      );
      return json({ ok: true, campos: out });
    }

    // 3. Modo investigar
    if (body.modo === "investigar") {
      const { data: c, error } = await db.from("kr_contactos").select("*").eq("id", body.contacto_id).single();
      if (error || !c) return json({ error: "contacto no encontrado" }, 404);
      await db.from("kr_contactos").update({ estado: "investigando", error: null }).eq("id", c.id);

      let web = (c.web || "").trim();
      if (!web && c.email?.includes("@")) {
        const dom = c.email.split("@")[1].toLowerCase();
        if (!/gmail|naver\.com|hanmail|daum\.net|kakao\.com|outlook|hotmail|yahoo/.test(dom)) web = `https://${dom}`;
      }
      if (web && !/^https?:\/\//.test(web)) web = `https://${web}`;

      const fuentes: string[] = [];
      let textoWeb = "";
      if (web) {
        for (const p of ["", "/en", "/about", "/en/about", "/company", "/en/company"]) {
          const t = await leerPagina(web.replace(/\/$/, "") + p, 4000);
          if (t.length > 300) { textoWeb += `\n\n[${web}${p}]\n${t}`; fuentes.push(`${web}${p}`); }
          if (textoWeb.length > 12000) break;
        }
      }

      const out = await gemini(
        apiKey,
        [
          { role: "system", content: `Eres el analista comercial de ${GRUPO}\n\nTu trabajo: con los datos del contacto y lo leído en su web, decidir qué le conviene al grupo y redactar la propuesta. Reglas: no inventes cifras ni hechos que no estén en el texto leído; si la web no se pudo leer, dilo en los hallazgos y baja el fit. Veredictos posibles: "representar" (Natan vende su producto en Latam), "venderles" (el grupo le vende servicios: Ferova software/catálogo/SEO, Netpower infraestructura), "descartar". Propuesta en inglés de negocios, concreta, máximo 280 palabras, con 3 o 4 pasos numerados y un siguiente paso (llamada de 30 min); firma María Fernanda Calderón · Natan Holding Group. La versión coreana es una traducción fiel, formal (합쇼체).` },
          { role: "user", content: `CONTACTO\nNombre: ${c.nombre}\nEmpresa: ${c.empresa || "-"}\nCargo: ${c.cargo || "-"}\nIntención declarada: ${c.intencion || "-"}\nNota de la reunión: ${c.nota || "-"}\nWeb: ${web || "no disponible"}\n\nTEXTO LEÍDO DE SU WEB:${textoWeb || "\n(no se pudo leer ninguna página)"}` },
        ],
        "analisis",
        {
          type: "object",
          properties: {
            veredicto: { type: "string", enum: ["representar", "venderles", "descartar"] },
            veredicto_empresa: { type: "string", description: "Natan, Ferova, Netpower o combinación" },
            fit: { type: "integer", minimum: 0, maximum: 100 },
            resumen: { type: "string", description: "una frase: por qué ese veredicto" },
            que_venden: { type: "string" }, tamano: { type: "string" }, mercados: { type: "string" }, sector: { type: "string" },
            hallazgos: { type: "array", items: { type: "string" }, description: "4 a 6 hallazgos con la implicación para el grupo" },
            propuesta_en: { type: "string" }, propuesta_ko: { type: "string" },
          },
          required: ["veredicto", "fit", "resumen", "hallazgos", "propuesta_en", "propuesta_ko"],
        },
      );

      const { error: e2 } = await db.from("kr_contactos").update({
        web: web || c.web,
        estado: out.veredicto === "descartar" ? "descartado" : "propuesta_lista",
        veredicto: out.veredicto,
        veredicto_empresa: out.veredicto_empresa || null,
        fit: out.fit,
        investigacion: { resumen: out.resumen, que_venden: out.que_venden, tamano: out.tamano, mercados: out.mercados, sector: out.sector, hallazgos: out.hallazgos, fuentes, web_leida: textoWeb.length > 0 },
        propuesta_en: out.propuesta_en,
        propuesta_ko: out.propuesta_ko,
        investigado_at: new Date().toISOString(),
      }).eq("id", c.id);
      if (e2) throw e2;
      return json({ ok: true, veredicto: out.veredicto, fit: out.fit });
    }

    return json({ error: "modo inválido" }, 400);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    try {
      if (body?.contacto_id) {
        const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
        await db.from("kr_contactos").update({ estado: "nuevo", error: msg }).eq("id", body.contacto_id);
      }
    } catch { /* nada */ }
    return json({ error: msg }, 500);
  }
});
