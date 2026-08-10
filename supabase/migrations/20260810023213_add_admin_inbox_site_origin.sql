-- Separa las solicitudes corporativas de Ferova de las captadas por SEO Para
-- Agencias dentro del proyecto compartido.
alter table public.admin_inbox
  add column if not exists site_origin text not null default 'seoparaecommerce.co';

alter table public.admin_inbox
  drop constraint if exists admin_inbox_site_origin_check;

alter table public.admin_inbox
  add constraint admin_inbox_site_origin_check
  check (site_origin in ('seoparaecommerce.co', 'seoforecommerces.co', 'ferova.com.co'));

create index if not exists admin_inbox_site_status_created_idx
  on public.admin_inbox (site_origin, status, created_at desc);
