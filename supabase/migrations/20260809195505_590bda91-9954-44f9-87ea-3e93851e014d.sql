-- Living case studies CMS for seoparaecommerce.co
-- Prepared locally. Do not apply to production until evidence, owners and backup are verified.

create schema if not exists private;

do $$ begin
  create type public.cms_role as enum ('owner', 'editor', 'reviewer');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.content_status as enum ('draft', 'in_review', 'approved', 'scheduled', 'published', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.metric_unit as enum ('percentage', 'number', 'usd', 'seconds', 'position', 'text');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.snapshot_status as enum ('draft', 'verified', 'published', 'superseded');
exception when duplicate_object then null; end $$;

create table if not exists public.cms_user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.cms_role not null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  unique (user_id, role)
);

create table if not exists public.consents (
  id uuid primary key default gen_random_uuid(),
  client_or_representative text not null,
  publication_scope text not null,
  permitted_data text[] not null default '{}',
  granted_at date not null,
  expires_at date,
  authorization_file_path text,
  revoked_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id),
  constraint consents_expiry_after_grant check (expires_at is null or expires_at >= granted_at)
);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug = lower(slug) and slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  status public.content_status not null default 'draft',
  client_public_name text,
  sector text not null,
  country text,
  summary text not null,
  challenge text not null,
  diagnosis text not null,
  intervention text not null,
  learnings text not null,
  limitations text,
  service_keys text[] not null default '{}',
  started_at date,
  last_observation_at date,
  scheduled_for timestamptz,
  published_at timestamptz,
  owner_id uuid not null references auth.users(id),
  consent_id uuid references public.consents(id),
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint case_publication_requires_consent check (status <> 'published' or consent_id is not null),
  constraint case_schedule_requires_date check (status <> 'scheduled' or scheduled_for is not null),
  constraint case_publication_requires_date check (status <> 'published' or published_at is not null)
);

create table if not exists public.case_metrics (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.case_studies(id) on delete cascade,
  key text not null,
  name text not null,
  unit public.metric_unit not null,
  definition text not null,
  public_visible boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id),
  unique (case_id, key)
);

create table if not exists public.metric_snapshots (
  id uuid primary key default gen_random_uuid(),
  metric_id uuid not null references public.case_metrics(id) on delete cascade,
  status public.snapshot_status not null default 'draft',
  cutoff_date date not null,
  period_start date not null,
  period_end date not null,
  numeric_value numeric,
  text_value text,
  previous_numeric_value numeric,
  source_name text not null,
  evidence_asset_id uuid,
  confidence_level text not null check (confidence_level in ('low', 'medium', 'high')),
  methodology_note text not null,
  permission_confirmed boolean not null default false,
  verified_by uuid references auth.users(id),
  verified_at timestamptz,
  supersedes_snapshot_id uuid references public.metric_snapshots(id),
  published_at timestamptz,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  constraint snapshot_period_valid check (period_end >= period_start and cutoff_date >= period_end),
  constraint snapshot_has_value check (numeric_value is not null or nullif(trim(text_value), '') is not null),
  constraint snapshot_publish_complete check (
    status <> 'published' or (permission_confirmed and published_at is not null and confidence_level <> 'low' and verified_by is not null and verified_at is not null)
  )
);

create table if not exists public.case_timeline_events (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.case_studies(id) on delete cascade,
  event_date date not null,
  event_type text not null,
  title text not null,
  description text not null,
  evidence_asset_id uuid,
  public_visible boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id)
);

create table if not exists public.evidence_assets (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.case_studies(id) on delete cascade,
  asset_type text not null,
  file_path_or_url text not null,
  source_name text not null,
  source_date date not null,
  publication_permission boolean not null default false,
  redaction_applied boolean not null default false,
  checksum text,
  public_visible boolean not null default false,
  created_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id),
  constraint public_evidence_requires_permission check (not public_visible or publication_permission)
);

alter table public.metric_snapshots
  add constraint metric_snapshots_evidence_fk foreign key (evidence_asset_id) references public.evidence_assets(id);
alter table public.case_timeline_events
  add constraint case_timeline_evidence_fk foreign key (evidence_asset_id) references public.evidence_assets(id);

create table if not exists public.case_reviews (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.case_studies(id) on delete cascade,
  decision text not null check (decision in ('comment', 'changes_requested', 'approved')),
  comment text not null,
  created_at timestamptz not null default now(),
  reviewer_id uuid not null references auth.users(id)
);

create table if not exists public.case_change_log (
  id bigint generated always as identity primary key,
  entity text not null,
  entity_id uuid not null,
  action text not null check (action in ('insert', 'update', 'delete')),
  before_data jsonb,
  after_data jsonb,
  actor_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists case_studies_status_published_idx on public.case_studies(status, published_at desc);
create index if not exists case_studies_owner_idx on public.case_studies(owner_id);
create index if not exists case_metrics_case_order_idx on public.case_metrics(case_id, display_order);
create index if not exists metric_snapshots_metric_cutoff_idx on public.metric_snapshots(metric_id, cutoff_date desc);
create index if not exists case_timeline_case_date_idx on public.case_timeline_events(case_id, event_date, display_order);
create index if not exists evidence_assets_case_idx on public.evidence_assets(case_id);
create index if not exists case_reviews_case_created_idx on public.case_reviews(case_id, created_at desc);
create index if not exists case_change_log_entity_idx on public.case_change_log(entity, entity_id, created_at desc);
create index if not exists cms_user_roles_user_idx on public.cms_user_roles(user_id);

create or replace function private.cms_has_role(requested_role public.cms_role)
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
  select (select auth.uid()) is not null and exists (
    select 1 from public.cms_user_roles
    where user_id = (select auth.uid()) and role = requested_role
  );
$$;

create or replace function private.cms_is_owner()
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
  select (select auth.uid()) is not null and (
    exists (select 1 from public.cms_user_roles where user_id = (select auth.uid()) and role = 'owner')
    or exists (select 1 from public.user_roles where user_id = (select auth.uid()) and role = 'admin')
  );
$$;

create or replace function private.cms_can_edit()
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$ select private.cms_is_owner() or private.cms_has_role('editor'); $$;

create or replace function private.cms_can_review()
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$ select private.cms_is_owner() or private.cms_has_role('editor') or private.cms_has_role('reviewer'); $$;

create or replace function private.case_has_valid_consent(requested_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
  select exists (
    select 1 from public.consents
    where id = requested_id and revoked_at is null
      and (expires_at is null or expires_at >= current_date)
  );
$$;

revoke all on function private.cms_has_role(public.cms_role) from public;
revoke all on function private.cms_is_owner() from public;
revoke all on function private.cms_can_edit() from public;
revoke all on function private.cms_can_review() from public;
revoke all on function private.case_has_valid_consent(uuid) from public;
grant usage on schema private to anon, authenticated, service_role;
grant execute on function private.cms_has_role(public.cms_role) to authenticated, service_role;
grant execute on function private.cms_is_owner() to authenticated, service_role;
grant execute on function private.cms_can_edit() to authenticated, service_role;
grant execute on function private.cms_can_review() to authenticated, service_role;
grant execute on function private.case_has_valid_consent(uuid) to anon, authenticated, service_role;

create or replace function private.enforce_case_status_transition()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if private.cms_is_owner() then
    if new.status = 'published' and old.status <> 'published' then
      if old.status not in ('approved', 'scheduled') or new.approved_by is null or new.approved_at is null then
        raise exception 'A case must be approved before publication';
      end if;
      if not private.case_has_valid_consent(new.consent_id) then
        raise exception 'A valid publication consent is required';
      end if;
      new.published_at := coalesce(new.published_at, now());
    end if;
    return new;
  end if;

  if private.cms_has_role('editor') then
    if old.status in ('approved', 'scheduled', 'published', 'archived') or new.status not in ('draft', 'in_review') then
      raise exception 'Editors may only edit draft or in-review cases';
    end if;
    return new;
  end if;

  if private.cms_has_role('reviewer') then
    if new.status not in ('in_review', 'approved') then
      raise exception 'Reviewers may only request changes or approve';
    end if;
    if (to_jsonb(new) - array['status','approved_by','approved_at','updated_at'])
       <> (to_jsonb(old) - array['status','approved_by','approved_at','updated_at']) then
      raise exception 'Reviewers may not edit case content';
    end if;
    if new.status = 'approved' then
      new.approved_by := (select auth.uid());
      new.approved_at := now();
    end if;
    return new;
  end if;

  raise exception 'Insufficient CMS permissions';
end;
$$;

create or replace function private.protect_published_snapshot()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if old.status = 'published' then
    raise exception 'Published metric snapshots are immutable; create a revision instead';
  end if;
  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

create or replace function private.enforce_snapshot_status_transition()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if private.cms_is_owner() then
    if new.status = 'published' then
      if old.status <> 'verified' and old.status <> 'published' then
        raise exception 'A snapshot must be verified before publication';
      end if;
      new.published_at := coalesce(new.published_at, now());
    end if;
    return new;
  end if;

  if private.cms_has_role('editor') then
    if old.status in ('verified', 'published', 'superseded') or new.status <> 'draft' then
      raise exception 'Editors may only edit draft snapshots';
    end if;
    return new;
  end if;

  if private.cms_has_role('reviewer') then
    if new.status not in ('draft', 'verified') then
      raise exception 'Reviewers may only verify or return a snapshot to draft';
    end if;
    if (to_jsonb(new) - array['status','verified_by','verified_at'])
       <> (to_jsonb(old) - array['status','verified_by','verified_at']) then
      raise exception 'Reviewers may not edit metric values or evidence';
    end if;
    if new.status = 'verified' then
      new.verified_by := (select auth.uid());
      new.verified_at := now();
    else
      new.verified_by := null;
      new.verified_at := null;
    end if;
    return new;
  end if;

  raise exception 'Insufficient CMS permissions';
end;
$$;

create or replace function private.log_case_change()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.case_change_log(entity, entity_id, action, before_data, after_data, actor_id)
    values (tg_table_name, new.id, 'insert', null, to_jsonb(new), (select auth.uid()));
    return new;
  elsif tg_op = 'UPDATE' then
    insert into public.case_change_log(entity, entity_id, action, before_data, after_data, actor_id)
    values (tg_table_name, new.id, 'update', to_jsonb(old), to_jsonb(new), (select auth.uid()));
    return new;
  end if;
  insert into public.case_change_log(entity, entity_id, action, before_data, after_data, actor_id)
  values (tg_table_name, old.id, 'delete', to_jsonb(old), null, (select auth.uid()));
  return old;
end;
$$;

revoke all on function private.enforce_case_status_transition() from public, anon, authenticated;
revoke all on function private.protect_published_snapshot() from public, anon, authenticated;
revoke all on function private.enforce_snapshot_status_transition() from public, anon, authenticated;
revoke all on function private.log_case_change() from public, anon, authenticated;

create trigger case_studies_set_updated_at before update on public.case_studies
for each row execute function public.set_updated_at();
create trigger case_studies_status_guard before update on public.case_studies
for each row execute function private.enforce_case_status_transition();
create trigger metric_snapshots_immutable before update or delete on public.metric_snapshots
for each row execute function private.protect_published_snapshot();
create trigger metric_snapshots_status_guard before update on public.metric_snapshots
for each row execute function private.enforce_snapshot_status_transition();

create trigger audit_case_studies after insert or update or delete on public.case_studies
for each row execute function private.log_case_change();
create trigger audit_case_metrics after insert or update or delete on public.case_metrics
for each row execute function private.log_case_change();
create trigger audit_metric_snapshots after insert or update or delete on public.metric_snapshots
for each row execute function private.log_case_change();
create trigger audit_case_timeline after insert or update or delete on public.case_timeline_events
for each row execute function private.log_case_change();
create trigger audit_evidence_assets after insert or update or delete on public.evidence_assets
for each row execute function private.log_case_change();
create trigger audit_case_reviews after insert or update or delete on public.case_reviews
for each row execute function private.log_case_change();
create trigger audit_consents after insert or update or delete on public.consents
for each row execute function private.log_case_change();

alter table public.cms_user_roles enable row level security;
alter table public.consents enable row level security;
alter table public.case_studies enable row level security;
alter table public.case_metrics enable row level security;
alter table public.metric_snapshots enable row level security;
alter table public.case_timeline_events enable row level security;
alter table public.evidence_assets enable row level security;
alter table public.case_reviews enable row level security;
alter table public.case_change_log enable row level security;

create policy "users read own cms roles" on public.cms_user_roles for select to authenticated
using (user_id = (select auth.uid()) or private.cms_is_owner());
create policy "owners manage cms roles" on public.cms_user_roles for all to authenticated
using (private.cms_is_owner()) with check (private.cms_is_owner());

create policy "team reads consents" on public.consents for select to authenticated using (private.cms_can_review());
create policy "owners manage consents" on public.consents for all to authenticated using (private.cms_is_owner()) with check (private.cms_is_owner());

drop policy if exists "public reads published cases" on public.case_studies;
create policy "public reads published cases" on public.case_studies for select to anon, authenticated
using (
  status = 'published' and published_at <= now() and private.case_has_valid_consent(consent_id)
);
create policy "team reads all cases" on public.case_studies for select to authenticated using (private.cms_can_review());
create policy "editors create cases" on public.case_studies for insert to authenticated
with check (
  private.cms_can_edit() and status in ('draft', 'in_review')
  and (owner_id = (select auth.uid()) or private.cms_is_owner())
);
create policy "team updates cases" on public.case_studies for update to authenticated
using (private.cms_can_review()) with check (private.cms_can_review());
create policy "owners delete cases" on public.case_studies for delete to authenticated using (private.cms_is_owner());

create policy "public reads visible metrics" on public.case_metrics for select to anon, authenticated
using (public_visible and exists (
  select 1 from public.case_studies c
  where c.id = case_id and c.status = 'published' and private.case_has_valid_consent(c.consent_id)
));
create policy "team manages metrics" on public.case_metrics for all to authenticated
using (private.cms_can_edit()) with check (private.cms_can_edit());
create policy "reviewers read metrics" on public.case_metrics for select to authenticated using (private.cms_can_review());

create policy "public reads published snapshots" on public.metric_snapshots for select to anon, authenticated
using (status = 'published' and permission_confirmed and exists (
  select 1 from public.case_metrics m join public.case_studies c on c.id = m.case_id
  where m.id = metric_id and m.public_visible and c.status = 'published'
    and private.case_has_valid_consent(c.consent_id)
));
create policy "team reads snapshots" on public.metric_snapshots for select to authenticated using (private.cms_can_review());
create policy "editors create draft snapshots" on public.metric_snapshots for insert to authenticated
with check (private.cms_can_edit() and status = 'draft' and created_by = (select auth.uid()));
create policy "editors update draft snapshots" on public.metric_snapshots for update to authenticated
using (private.cms_can_edit() and status = 'draft') with check (private.cms_can_edit());
create policy "owners update snapshots" on public.metric_snapshots for update to authenticated
using (private.cms_is_owner()) with check (private.cms_is_owner());
create policy "owners delete snapshots" on public.metric_snapshots for delete to authenticated
using (private.cms_is_owner() and status <> 'published');
create policy "reviewers verify snapshots" on public.metric_snapshots for update to authenticated
using (private.cms_has_role('reviewer')) with check (private.cms_has_role('reviewer'));

create policy "public reads visible timeline" on public.case_timeline_events for select to anon, authenticated
using (public_visible and exists (
  select 1 from public.case_studies c
  where c.id = case_id and c.status = 'published' and private.case_has_valid_consent(c.consent_id)
));
create policy "team manages timeline" on public.case_timeline_events for all to authenticated
using (private.cms_can_edit()) with check (private.cms_can_edit());
create policy "reviewers read timeline" on public.case_timeline_events for select to authenticated using (private.cms_can_review());

create policy "public reads permitted evidence" on public.evidence_assets for select to anon, authenticated
using (public_visible and publication_permission and exists (
  select 1 from public.case_studies c
  where c.id = case_id and c.status = 'published' and private.case_has_valid_consent(c.consent_id)
));
create policy "team manages evidence" on public.evidence_assets for all to authenticated
using (private.cms_can_edit()) with check (private.cms_can_edit());
create policy "reviewers read evidence" on public.evidence_assets for select to authenticated using (private.cms_can_review());

create policy "team reads reviews" on public.case_reviews for select to authenticated using (private.cms_can_review());
create policy "reviewers create reviews" on public.case_reviews for insert to authenticated
with check (private.cms_can_review() and reviewer_id = (select auth.uid()));
create policy "reviewers update own reviews" on public.case_reviews for update to authenticated
using (reviewer_id = (select auth.uid())) with check (reviewer_id = (select auth.uid()));
create policy "owners delete reviews" on public.case_reviews for delete to authenticated using (private.cms_is_owner());

create policy "owners read change log" on public.case_change_log for select to authenticated using (private.cms_is_owner());

-- Explicit Data API grants: required for projects with automatic exposure disabled.
revoke all on public.cms_user_roles, public.consents, public.case_studies, public.case_metrics,
  public.metric_snapshots, public.case_timeline_events, public.evidence_assets,
  public.case_reviews, public.case_change_log from anon, authenticated;
grant select on public.case_studies, public.case_metrics, public.metric_snapshots,
  public.case_timeline_events, public.evidence_assets to anon;
grant select, insert, update, delete on public.cms_user_roles, public.consents, public.case_studies,
  public.case_metrics, public.metric_snapshots, public.case_timeline_events,
  public.evidence_assets, public.case_reviews to authenticated;
grant select on public.case_change_log to authenticated;
grant usage, select on sequence public.case_change_log_id_seq to authenticated;

drop view if exists public.case_studies_public;
create or replace view public.case_studies_public
with (security_invoker = true)
as
select id, slug, client_public_name, sector, country, summary, challenge, diagnosis,
  intervention, learnings, limitations, service_keys, started_at, last_observation_at,
  published_at, updated_at
from public.case_studies
where status = 'published' and published_at <= now();

grant select on public.case_studies_public to anon, authenticated;