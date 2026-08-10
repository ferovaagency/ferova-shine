-- Keep both websites in the shared Supabase project without mixing their content.
-- Existing content belongs to seoparaecommerce.co; Ferova writes explicitly to ferova.com.co.

alter table public.blog_posts
  add column if not exists site_origin text not null default 'seoparaecommerce.co';
alter table public.newsletter_editions
  add column if not exists site_origin text not null default 'seoparaecommerce.co';
alter table public.case_studies
  add column if not exists site_origin text not null default 'seoparaecommerce.co';

alter table public.blog_posts drop constraint if exists blog_posts_site_origin_check;
alter table public.blog_posts add constraint blog_posts_site_origin_check
  check (site_origin in ('seoparaecommerce.co', 'seoforecommerces.co', 'ferova.com.co'));
alter table public.newsletter_editions drop constraint if exists newsletter_editions_site_origin_check;
alter table public.newsletter_editions add constraint newsletter_editions_site_origin_check
  check (site_origin in ('seoparaecommerce.co', 'seoforecommerces.co', 'ferova.com.co'));
alter table public.case_studies drop constraint if exists case_studies_site_origin_check;
alter table public.case_studies add constraint case_studies_site_origin_check
  check (site_origin in ('seoparaecommerce.co', 'seoforecommerces.co', 'ferova.com.co'));

drop index if exists public.blog_posts_language_slug_uq;
drop index if exists public.blog_posts_slug_uq;
create unique index if not exists blog_posts_site_language_slug_uq
  on public.blog_posts(site_origin, language, slug);

alter table public.newsletter_editions drop constraint if exists newsletter_editions_slug_key;
alter table public.newsletter_editions drop constraint if exists newsletter_editions_edition_number_key;
create unique index if not exists newsletter_editions_site_slug_uq
  on public.newsletter_editions(site_origin, slug);
create unique index if not exists newsletter_editions_site_number_uq
  on public.newsletter_editions(site_origin, edition_number);

alter table public.case_studies drop constraint if exists case_studies_slug_key;
create unique index if not exists case_studies_site_slug_uq
  on public.case_studies(site_origin, slug);

create index if not exists blog_posts_site_publication_idx
  on public.blog_posts(site_origin, language, active, published_at desc);
create index if not exists newsletter_editions_site_publication_idx
  on public.newsletter_editions(site_origin, published, published_at desc);
create index if not exists case_studies_site_publication_idx
  on public.case_studies(site_origin, status, published_at desc);

comment on column public.blog_posts.site_origin is 'Website that owns and publishes this entry.';
comment on column public.newsletter_editions.site_origin is 'Website that owns and publishes this edition.';
comment on column public.case_studies.site_origin is 'Website that owns and publishes this case study.';

-- Explicit site-scoped CMS access. Existing trusted roles are copied to each owned site;
-- future collaborators can be limited to one brand without broadening their database access.
create table if not exists public.cms_site_access (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  site_origin text not null check (site_origin in ('seoparaecommerce.co', 'seoforecommerces.co', 'ferova.com.co')),
  role public.cms_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, site_origin, role)
);

insert into public.cms_site_access (user_id, site_origin, role)
select roles.user_id, sites.site_origin, roles.role
from public.cms_user_roles roles
cross join (values ('seoparaecommerce.co'), ('seoforecommerces.co'), ('ferova.com.co')) sites(site_origin)
on conflict do nothing;

insert into public.cms_site_access (user_id, site_origin, role)
select roles.user_id, sites.site_origin, 'owner'::public.cms_role
from public.user_roles roles
cross join (values ('seoparaecommerce.co'), ('seoforecommerces.co'), ('ferova.com.co')) sites(site_origin)
where roles.role = 'admin'
on conflict do nothing;

alter table public.cms_site_access enable row level security;
create policy "users read own cms site access" on public.cms_site_access
  for select to authenticated using (user_id = (select auth.uid()));
revoke all on public.cms_site_access from anon, authenticated;
grant select on public.cms_site_access to authenticated;

create or replace function private.cms_site_can_review(requested_site text)
returns boolean language sql stable security definer set search_path = public, private as $$
  select exists (
    select 1 from public.cms_site_access
    where user_id = (select auth.uid())
      and site_origin = requested_site
      and role in ('owner', 'editor', 'reviewer')
  );
$$;

create or replace function private.cms_site_can_edit(requested_site text)
returns boolean language sql stable security definer set search_path = public, private as $$
  select exists (
    select 1 from public.cms_site_access
    where user_id = (select auth.uid())
      and site_origin = requested_site
      and role in ('owner', 'editor')
  );
$$;

create or replace function private.cms_site_is_owner(requested_site text)
returns boolean language sql stable security definer set search_path = public, private as $$
  select exists (
    select 1 from public.cms_site_access
    where user_id = (select auth.uid())
      and site_origin = requested_site
      and role = 'owner'
  );
$$;

revoke all on function private.cms_site_can_review(text), private.cms_site_can_edit(text), private.cms_site_is_owner(text) from public;
grant usage on schema private to authenticated, service_role;
grant execute on function private.cms_site_can_review(text), private.cms_site_can_edit(text), private.cms_site_is_owner(text) to authenticated, service_role;

drop policy if exists "admins read all blog posts" on public.blog_posts;
drop policy if exists "admins_insert_blog" on public.blog_posts;
drop policy if exists "admins_update_blog" on public.blog_posts;
drop policy if exists "admins_delete_blog" on public.blog_posts;
create policy "site team reads all blog posts" on public.blog_posts for select to authenticated
  using (private.cms_site_can_review(site_origin));
create policy "site editors insert blog posts" on public.blog_posts for insert to authenticated
  with check (private.cms_site_can_edit(site_origin));
create policy "site editors update blog posts" on public.blog_posts for update to authenticated
  using (private.cms_site_can_edit(site_origin)) with check (private.cms_site_can_edit(site_origin));
create policy "site owners delete blog posts" on public.blog_posts for delete to authenticated
  using (private.cms_site_is_owner(site_origin));

drop policy if exists "admins_insert_editions" on public.newsletter_editions;
drop policy if exists "admins_update_editions" on public.newsletter_editions;
drop policy if exists "admins_delete_editions" on public.newsletter_editions;
create policy "site editors insert editions" on public.newsletter_editions for insert to authenticated
  with check (private.cms_site_can_edit(site_origin));
create policy "site editors update editions" on public.newsletter_editions for update to authenticated
  using (private.cms_site_can_edit(site_origin)) with check (private.cms_site_can_edit(site_origin));
create policy "site owners delete editions" on public.newsletter_editions for delete to authenticated
  using (private.cms_site_is_owner(site_origin));

drop policy if exists "team reads all cases" on public.case_studies;
drop policy if exists "editors create cases" on public.case_studies;
drop policy if exists "team updates cases" on public.case_studies;
drop policy if exists "owners delete cases" on public.case_studies;
create policy "site team reads all cases" on public.case_studies for select to authenticated
  using (private.cms_site_can_review(site_origin));
create policy "site editors create cases" on public.case_studies for insert to authenticated
  with check (private.cms_site_can_edit(site_origin) and status in ('draft', 'in_review'));
create policy "site editors update cases" on public.case_studies for update to authenticated
  using (private.cms_site_can_edit(site_origin)) with check (private.cms_site_can_edit(site_origin));
create policy "site owners delete cases" on public.case_studies for delete to authenticated
  using (private.cms_site_is_owner(site_origin));
