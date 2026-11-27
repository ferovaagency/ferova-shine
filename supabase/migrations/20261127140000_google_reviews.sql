-- Reseñas de la ficha de Ferova en Google Business Profile.
-- Las escribe solo la edge function google-reviews-sync (service role), una vez
-- al mes. ferova.com.co y seoparaecommerce.co leen la misma tabla, así las dos
-- páginas muestran exactamente las mismas reseñas.

create table if not exists public.google_reviews (
  id uuid primary key default gen_random_uuid(),
  review_id text not null unique,
  resource_name text,
  author_name text not null,
  author_photo_url text,
  rating smallint not null check (rating between 1 and 5),
  comment text,
  reply text,
  reply_update_time timestamptz,
  create_time timestamptz,
  update_time timestamptz,
  -- Para ocultar una reseña sin borrarla (por ejemplo, si contiene datos personales).
  visible boolean not null default true,
  site_origin text not null default 'ferova.com.co',
  synced_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists google_reviews_visible_time_idx
  on public.google_reviews (visible, create_time desc);

alter table public.google_reviews enable row level security;

drop policy if exists "public reads visible google reviews" on public.google_reviews;
create policy "public reads visible google reviews" on public.google_reviews
  for select to anon, authenticated using (visible = true);

grant select on public.google_reviews to anon, authenticated;

-- Revisión mensual: día 1 de cada mes a las 13:17 UTC (8:17 a. m. en Bogotá).
-- Usa la service role key que ya está en vault para la cola de correos.
do $$
begin
  if exists (select 1 from cron.job where jobname = 'google-reviews-sync-monthly') then
    perform cron.unschedule('google-reviews-sync-monthly');
  end if;
end $$;

select cron.schedule(
  'google-reviews-sync-monthly',
  '17 13 1 * *',
  $job$
  select net.http_post(
    url := 'https://lknzbundoabbhoaypnwr.supabase.co/functions/v1/google-reviews-sync',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (
        select decrypted_secret from vault.decrypted_secrets
        where name = 'email_queue_service_role_key'
      )
    ),
    body := '{"trigger":"cron"}'::jsonb
  );
  $job$
);
