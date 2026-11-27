alter table public.newsletter_subscribers
  add column if not exists site_origin text not null default 'seoparaecommerce.co',
  add column if not exists consent boolean not null default false,
  add column if not exists consent_at timestamptz,
  add column if not exists consent_text text,
  add column if not exists source text not null default 'web';

create index if not exists newsletter_subscribers_site_email_idx
  on public.newsletter_subscribers (site_origin, lower(email));

drop policy if exists public_insert on public.newsletter_subscribers;

alter table public.newsletter_editions
  add column if not exists linkedin_summary text,
  add column if not exists linkedin_post text;

drop policy if exists "public reads published newsletter editions" on public.newsletter_editions;
create policy "public reads published newsletter editions" on public.newsletter_editions
  for select to anon using (published = true);
revoke select on public.newsletter_editions from anon;
grant select (id, edition_number, slug, title, subject_line, topics, plan, reading_time,
  published, published_at, created_at, free_content, site_origin, linkedin_summary)
  on public.newsletter_editions to anon;