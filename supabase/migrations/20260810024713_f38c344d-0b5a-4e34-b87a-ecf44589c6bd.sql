-- Unifica los permisos del panel: quienes pueden editar el CMS de casos
-- también pueden administrar artículos e imágenes. Los revisores conservan
-- acceso de lectura y solo propietarios/administradores pueden eliminar.

drop policy if exists "admins read all blog posts" on public.blog_posts;
drop policy if exists "admins_insert_blog" on public.blog_posts;
drop policy if exists "admins_update_blog" on public.blog_posts;
drop policy if exists "admins_delete_blog" on public.blog_posts;

create policy "cms team reads all blog posts"
on public.blog_posts for select to authenticated
using (private.cms_can_review());

create policy "cms editors insert blog posts"
on public.blog_posts for insert to authenticated
with check (private.cms_can_edit());

create policy "cms editors update blog posts"
on public.blog_posts for update to authenticated
using (private.cms_can_edit())
with check (private.cms_can_edit());

create policy "cms owners delete blog posts"
on public.blog_posts for delete to authenticated
using (private.cms_is_owner());

drop policy if exists "Authenticated users can upload blog images" on storage.objects;
drop policy if exists "Authenticated users can update blog images" on storage.objects;
drop policy if exists "Authenticated users can delete blog images" on storage.objects;
drop policy if exists "Admins can upload blog images" on storage.objects;
drop policy if exists "Admins can update blog images" on storage.objects;
drop policy if exists "Admins can delete blog images" on storage.objects;

create policy "CMS editors can upload blog images"
on storage.objects for insert to authenticated
with check (bucket_id = 'blog-images' and private.cms_can_edit());

create policy "CMS editors can update blog images"
on storage.objects for update to authenticated
using (bucket_id = 'blog-images' and private.cms_can_edit())
with check (bucket_id = 'blog-images' and private.cms_can_edit());

create policy "CMS owners can delete blog images"
on storage.objects for delete to authenticated
using (bucket_id = 'blog-images' and private.cms_is_owner());

grant select, insert, update, delete on public.blog_posts to authenticated;

drop policy if exists "admins_read_editions" on public.newsletter_editions;
drop policy if exists "admins_insert_editions" on public.newsletter_editions;
drop policy if exists "admins_update_editions" on public.newsletter_editions;
drop policy if exists "admins_delete_editions" on public.newsletter_editions;
drop policy if exists "admins_read_subscribers" on public.newsletter_subscribers;

create policy "cms team reads newsletter editions" on public.newsletter_editions
for select to authenticated using (private.cms_can_review());
create policy "cms editors insert newsletter editions" on public.newsletter_editions
for insert to authenticated with check (private.cms_can_edit());
create policy "cms editors update newsletter editions" on public.newsletter_editions
for update to authenticated using (private.cms_can_edit()) with check (private.cms_can_edit());
create policy "cms owners delete newsletter editions" on public.newsletter_editions
for delete to authenticated using (private.cms_is_owner());
create policy "cms team reads newsletter subscribers" on public.newsletter_subscribers
for select to authenticated using (private.cms_can_review());

grant select, insert, update, delete on public.newsletter_editions to authenticated;
grant select on public.newsletter_subscribers to authenticated;

-- Bandeja única del panel. Los visitantes solo pueden crear una solicitud;
-- nunca pueden leerla. El equipo editorial puede atenderla desde /admin.
create table if not exists public.admin_inbox (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('contact', 'diagnostic', 'ai_advisor', 'newsletter', 'tool')),
  source_id text,
  name text,
  email text,
  phone text,
  company text,
  summary text,
  payload jsonb,
  status text not null default 'pending' check (status in ('pending', 'completed')),
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  constraint admin_inbox_contact_length check (
    char_length(coalesce(email, '')) <= 320 and
    char_length(coalesce(phone, '')) <= 40 and
    char_length(coalesce(summary, '')) <= 500 and
    octet_length(coalesce(payload, '{}'::jsonb)::text) <= 10000
  )
);

alter table public.admin_inbox enable row level security;
drop policy if exists "visitors create inbox requests" on public.admin_inbox;
drop policy if exists "cms team reads inbox" on public.admin_inbox;
drop policy if exists "cms team updates inbox" on public.admin_inbox;
drop policy if exists "cms owners delete inbox" on public.admin_inbox;

create policy "visitors create inbox requests"
on public.admin_inbox for insert to anon, authenticated
with check (status = 'pending' and completed_at is null);

create policy "cms team reads inbox"
on public.admin_inbox for select to authenticated
using (private.cms_can_review());

create policy "cms team updates inbox"
on public.admin_inbox for update to authenticated
using (private.cms_can_review())
with check (private.cms_can_review());

create policy "cms owners delete inbox"
on public.admin_inbox for delete to authenticated
using (private.cms_is_owner());

create index if not exists admin_inbox_status_created_idx on public.admin_inbox (status, created_at desc);
grant insert on public.admin_inbox to anon;
grant select, insert, update, delete on public.admin_inbox to authenticated;