-- Newsletter propio (sin Brevo) para ferova.com.co y seoparaecommerce.co.
-- Solo agrega columnas: no borra datos ni cambia lo que ya usan los tres sitios.

-- 1) Suscriptores: a qué sitio pertenecen y prueba de la autorización de datos.
alter table public.newsletter_subscribers
  add column if not exists site_origin text not null default 'seoparaecommerce.co',
  add column if not exists consent boolean not null default false,
  add column if not exists consent_at timestamptz,
  add column if not exists consent_text text,
  add column if not exists source text not null default 'web';

create index if not exists newsletter_subscribers_site_email_idx
  on public.newsletter_subscribers (site_origin, lower(email));

-- Las altas solo entran por la edge function newsletter-subscribe (service role),
-- que exige consentimiento explícito. Se retira el insert público directo.
drop policy if exists public_insert on public.newsletter_subscribers;

-- 2) Ediciones: textos para copiar y pegar en LinkedIn.
alter table public.newsletter_editions
  add column if not exists linkedin_summary text,
  add column if not exists linkedin_post text;

-- 3) Lectura pública de ediciones publicadas: las páginas /newsletter de los dos
-- sitios muestran el archivo (filtrando por site_origin). Los borradores siguen
-- visibles solo para el equipo editorial.
drop policy if exists "public reads published newsletter editions" on public.newsletter_editions;
create policy "public reads published newsletter editions" on public.newsletter_editions
  for select to anon using (published = true);
-- Solo columnas públicas: pro_content y el post de LinkedIn no se exponen.
revoke select on public.newsletter_editions from anon;
grant select (id, edition_number, slug, title, subject_line, topics, plan, reading_time,
  published, published_at, created_at, free_content, site_origin, linkedin_summary)
  on public.newsletter_editions to anon;
