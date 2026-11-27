// Edge function: trae las reseñas de la ficha de Ferova en Google Business
// Profile y guarda en public.google_reviews las nuevas (y actualiza las que
// el autor editó o que recibieron respuesta). La llama pg_cron una vez al mes
// (job "google-reviews-sync-monthly"); también se puede ejecutar a mano con la
// service role key para probar.
//
// Fuente: Google Business Profile API (reseñas propias de la ficha). No se usa
// Places API: sus términos no permiten guardar reseñas en una base propia.
//
// Secretos (Supabase → Edge Functions → Secrets):
//   GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN  OAuth de la cuenta que administra la ficha
//   GBP_ACCOUNT_ID, GBP_LOCATION_ID                      solo los números (sin "accounts/" ni "locations/")
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const STARS: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
const MAX_PAGES = 20; // 50 reseñas por página: hasta 1.000 por corrida.

type GbpReview = {
  name?: string;
  reviewId?: string;
  reviewer?: { displayName?: string; profilePhotoUrl?: string; isAnonymous?: boolean };
  starRating?: string;
  comment?: string;
  createTime?: string;
  updateTime?: string;
  reviewReply?: { comment?: string; updateTime?: string };
};

async function accessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: Deno.env.get("GBP_CLIENT_ID") ?? "",
      client_secret: Deno.env.get("GBP_CLIENT_SECRET") ?? "",
      refresh_token: Deno.env.get("GBP_REFRESH_TOKEN") ?? "",
      grant_type: "refresh_token",
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.access_token) {
    throw new Error(`No se pudo renovar el token de Google (${res.status}): ${body.error ?? "sin detalle"}`);
  }
  return body.access_token as string;
}

async function fetchReviews(token: string, account: string, location: string) {
  const reviews: GbpReview[] = [];
  let pageToken = "";
  let averageRating: number | null = null;
  let totalReviewCount: number | null = null;
  for (let page = 0; page < MAX_PAGES; page++) {
    const url = new URL(
      `https://mybusiness.googleapis.com/v4/accounts/${account}/locations/${location}/reviews`,
    );
    url.searchParams.set("pageSize", "50");
    url.searchParams.set("orderBy", "updateTime desc");
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(
        `Google Business Profile respondió ${res.status}: ${body?.error?.message ?? "sin detalle"}`,
      );
    }
    reviews.push(...((body.reviews ?? []) as GbpReview[]));
    averageRating = body.averageRating ?? averageRating;
    totalReviewCount = body.totalReviewCount ?? totalReviewCount;
    pageToken = body.nextPageToken ?? "";
    if (!pageToken) break;
  }
  return { reviews, averageRating, totalReviewCount };
}

serve(async (req) => {
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  // Solo el cron (o una prueba manual) con la service role key puede correrla.
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const bearer = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!serviceKey || bearer !== serviceKey) return json({ error: "No autorizado" }, 401);

  const account = (Deno.env.get("GBP_ACCOUNT_ID") ?? "").replace(/^accounts\//, "");
  const location = (Deno.env.get("GBP_LOCATION_ID") ?? "").replace(/^locations\//, "");
  const missing = ["GBP_CLIENT_ID", "GBP_CLIENT_SECRET", "GBP_REFRESH_TOKEN", "GBP_ACCOUNT_ID", "GBP_LOCATION_ID"]
    .filter((key) => !Deno.env.get(key));
  if (missing.length) return json({ error: `Faltan secretos: ${missing.join(", ")}` }, 500);

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey, {
    auth: { persistSession: false },
  });

  try {
    const token = await accessToken();
    const { reviews, averageRating, totalReviewCount } = await fetchReviews(token, account, location);

    const { data: existingRows, error: readError } = await supabase
      .from("google_reviews")
      .select("review_id,update_time,reply_update_time");
    if (readError) throw readError;
    const existing = new Map(
      (existingRows ?? []).map((row) => [row.review_id as string, row]),
    );

    const rows = reviews
      .filter((r) => r.reviewId && STARS[r.starRating ?? ""])
      .map((r) => ({
        review_id: r.reviewId!,
        resource_name: r.name ?? null,
        author_name: r.reviewer?.isAnonymous ? "Usuario de Google" : r.reviewer?.displayName ?? "Usuario de Google",
        author_photo_url: r.reviewer?.isAnonymous ? null : r.reviewer?.profilePhotoUrl ?? null,
        rating: STARS[r.starRating!],
        comment: r.comment?.trim() || null,
        reply: r.reviewReply?.comment?.trim() || null,
        reply_update_time: r.reviewReply?.updateTime ?? null,
        create_time: r.createTime ?? null,
        update_time: r.updateTime ?? null,
        synced_at: new Date().toISOString(),
      }));

    const fresh = rows.filter((row) => !existing.has(row.review_id));
    const changed = rows.filter((row) => {
      const prev = existing.get(row.review_id);
      return prev && (prev.update_time !== row.update_time || prev.reply_update_time !== row.reply_update_time);
    });

    if (fresh.length || changed.length) {
      // upsert no toca `visible`: si alguien ocultó una reseña en el admin, sigue oculta.
      const { error } = await supabase
        .from("google_reviews")
        .upsert([...fresh, ...changed], { onConflict: "review_id" });
      if (error) throw error;
    }

    const summary = {
      success: true,
      fetched: rows.length,
      added: fresh.length,
      updated: changed.length,
      average_rating: averageRating,
      total_review_count: totalReviewCount,
    };
    console.log("google-reviews-sync", JSON.stringify(summary));
    return json(summary);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("google-reviews-sync error:", message);
    return json({ error: message }, 500);
  }
});
