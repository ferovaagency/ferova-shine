-- Final policy authority: later legacy migrations reintroduced global CMS policies.
-- Permissive Postgres policies combine with OR, so every global policy must be removed.

drop policy if exists "cms team reads all blog posts" on public.blog_posts;
drop policy if exists "cms editors insert blog posts" on public.blog_posts;
drop policy if exists "cms editors update blog posts" on public.blog_posts;
drop policy if exists "cms owners delete blog posts" on public.blog_posts;
drop policy if exists "site team reads all blog posts" on public.blog_posts;
drop policy if exists "site editors insert blog posts" on public.blog_posts;
drop policy if exists "site editors update blog posts" on public.blog_posts;
drop policy if exists "site owners delete blog posts" on public.blog_posts;

create policy "site team reads all blog posts" on public.blog_posts for select to authenticated
  using (private.cms_site_can_review(site_origin));
create policy "site editors insert blog posts" on public.blog_posts for insert to authenticated
  with check (private.cms_site_can_edit(site_origin));
create policy "site editors update blog posts" on public.blog_posts for update to authenticated
  using (private.cms_site_can_edit(site_origin)) with check (private.cms_site_can_edit(site_origin));
create policy "site owners delete blog posts" on public.blog_posts for delete to authenticated
  using (private.cms_site_is_owner(site_origin));

drop policy if exists "cms team reads newsletter editions" on public.newsletter_editions;
drop policy if exists "cms editors insert newsletter editions" on public.newsletter_editions;
drop policy if exists "cms editors update newsletter editions" on public.newsletter_editions;
drop policy if exists "cms owners delete newsletter editions" on public.newsletter_editions;
drop policy if exists "site team reads newsletter editions" on public.newsletter_editions;
drop policy if exists "site editors insert editions" on public.newsletter_editions;
drop policy if exists "site editors update editions" on public.newsletter_editions;
drop policy if exists "site owners delete editions" on public.newsletter_editions;

create policy "site team reads newsletter editions" on public.newsletter_editions for select to authenticated
  using (private.cms_site_can_review(site_origin));
create policy "site editors insert newsletter editions" on public.newsletter_editions for insert to authenticated
  with check (private.cms_site_can_edit(site_origin));
create policy "site editors update newsletter editions" on public.newsletter_editions for update to authenticated
  using (private.cms_site_can_edit(site_origin)) with check (private.cms_site_can_edit(site_origin));
create policy "site owners delete newsletter editions" on public.newsletter_editions for delete to authenticated
  using (private.cms_site_is_owner(site_origin));

drop policy if exists "cms team reads inbox" on public.admin_inbox;
drop policy if exists "cms team updates inbox" on public.admin_inbox;
drop policy if exists "cms owners delete inbox" on public.admin_inbox;
drop policy if exists "site team reads inbox" on public.admin_inbox;
drop policy if exists "site editors update inbox" on public.admin_inbox;
drop policy if exists "site owners delete inbox" on public.admin_inbox;

create policy "site team reads inbox" on public.admin_inbox for select to authenticated
  using (private.cms_site_can_review(site_origin));
create policy "site editors update inbox" on public.admin_inbox for update to authenticated
  using (private.cms_site_can_edit(site_origin)) with check (private.cms_site_can_edit(site_origin));
create policy "site owners delete inbox" on public.admin_inbox for delete to authenticated
  using (private.cms_site_is_owner(site_origin));

