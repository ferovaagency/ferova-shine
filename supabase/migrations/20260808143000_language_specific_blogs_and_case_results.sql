-- Language-specific editorial publishing and editable case-study highlights.
-- Existing blog rows are preserved as Spanish content. Legacy translation
-- columns remain only as an archive and are no longer exposed by the product.

alter table public.blog_posts
  add column if not exists language text not null default 'es';

alter table public.blog_posts
  drop constraint if exists blog_posts_language_check;
alter table public.blog_posts
  add constraint blog_posts_language_check check (language in ('es', 'en'));

alter table public.blog_posts drop constraint if exists blog_posts_slug_key;
drop index if exists public.idx_blog_posts_slug;
create unique index if not exists blog_posts_language_slug_uq
  on public.blog_posts(language, slug);
create index if not exists blog_posts_publication_idx
  on public.blog_posts(language, active, published_at desc);

drop policy if exists "Blog posts are publicly readable" on public.blog_posts;
drop policy if exists "public reads published blog posts" on public.blog_posts;
drop policy if exists "admins read all blog posts" on public.blog_posts;

create policy "public reads published blog posts" on public.blog_posts
  for select to anon, authenticated
  using (active = true and published_at <= now());

create policy "admins read all blog posts" on public.blog_posts
  for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

revoke all on public.blog_posts from anon, authenticated;
grant select on public.blog_posts to anon;
grant select, insert, update, delete on public.blog_posts to authenticated;

comment on column public.blog_posts.language is
  'Canonical site version for this independent article: es or en.';
comment on column public.blog_posts.title_en is
  'Legacy translation archive. Do not use for publishing.';
comment on column public.blog_posts.title_pt is
  'Legacy translation archive. Do not use for publishing.';

alter table public.case_studies
  add column if not exists result_highlights jsonb not null default '[]'::jsonb;

alter table public.case_studies
  drop constraint if exists case_result_highlights_array;
alter table public.case_studies
  add constraint case_result_highlights_array
  check (jsonb_typeof(result_highlights) = 'array');

create or replace view public.case_studies_public
with (security_invoker = true)
as
select id, slug, client_public_name, sector, country, summary, challenge, diagnosis,
  intervention, learnings, limitations, service_keys, result_highlights,
  started_at, last_observation_at, published_at, updated_at
from public.case_studies
where status = 'published' and published_at <= now();

grant select on public.case_studies_public to anon, authenticated;
