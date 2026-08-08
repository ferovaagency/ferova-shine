-- Let public case policies validate consent without exposing consent records.
create schema if not exists private;

create or replace function private.case_has_valid_consent(requested_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
  select exists (
    select 1 from public.consents
    where id = requested_id
      and revoked_at is null
      and (expires_at is null or expires_at >= current_date)
  );
$$;

revoke all on function private.case_has_valid_consent(uuid) from public;
grant usage on schema private to anon, authenticated, service_role;
grant execute on function private.case_has_valid_consent(uuid) to anon, authenticated, service_role;

drop policy if exists "public reads published cases" on public.case_studies;
create policy "public reads published cases" on public.case_studies
  for select to anon, authenticated
  using (
    status = 'published'
    and published_at <= now()
    and private.case_has_valid_consent(consent_id)
  );
