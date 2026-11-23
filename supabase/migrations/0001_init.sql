-- ScribeGuard schema. Run in the Supabase SQL editor (or `supabase db push`).

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  company text,
  plan text not null default 'free' check (plan in ('free','starter','pro','business')),
  credits_used integer not null default 0,
  credits_reset_at timestamptz not null default (date_trunc('month', now()) + interval '1 month'),
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  instructions text not null,
  policy_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.policies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  rules text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  storage_path text not null,
  size_bytes bigint not null default 0,
  content_text text,
  created_at timestamptz not null default now()
);

create table if not exists public.runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('chat','guardrail','agent')),
  agent_id uuid references public.agents(id) on delete set null,
  input text not null,
  output text,
  verdict text,
  credits integer not null default 1,
  created_at timestamptz not null default now()
);
create index if not exists runs_user_created on public.runs(user_id, created_at desc);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.subscription_events (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  plan text not null,
  source text not null default 'webhook',
  reference text,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.agents enable row level security;
alter table public.policies enable row level security;
alter table public.documents enable row level security;
alter table public.runs enable row level security;
alter table public.notifications enable row level security;
alter table public.subscription_events enable row level security;

create policy "own profile read" on public.profiles for select using (auth.uid() = id);
-- Users may edit only non-billing fields (plan and credits are changed server-side).
create policy "own profile update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
revoke update on public.profiles from authenticated;
grant update (full_name, company) on public.profiles to authenticated;

create policy "own agents" on public.agents for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own policies" on public.policies for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own documents" on public.documents for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own runs read" on public.runs for select using (auth.uid() = user_id);
create policy "own notifications" on public.notifications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- subscription_events: no policies => only the service role can read/write.

-- Create a profile on signup
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  insert into public.notifications (user_id, title, body)
  values (new.id, 'Welcome to ScribeGuard', 'Create your first agent or run a guardrail check to get started.');
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Atomic credit spending (service role only)
create or replace function public.spend_credits(p_user uuid, p_amount int, p_limit int) returns boolean
language plpgsql security definer set search_path = public as $$
declare ok boolean;
begin
  update public.profiles
     set credits_used = case when credits_reset_at <= now() then p_amount else credits_used + p_amount end,
         credits_reset_at = case when credits_reset_at <= now()
                                 then date_trunc('month', now()) + interval '1 month' else credits_reset_at end
   where id = p_user
     and ((credits_reset_at <= now() and p_amount <= p_limit) or credits_used + p_amount <= p_limit)
  returning true into ok;
  return coalesce(ok, false);
end $$;
revoke all on function public.spend_credits(uuid, int, int) from public, anon, authenticated;
grant execute on function public.spend_credits(uuid, int, int) to service_role;

-- Storage bucket for knowledge documents (private, per-user folder)
insert into storage.buckets (id, name, public) values ('documents', 'documents', false)
on conflict (id) do nothing;

create policy "own files read" on storage.objects for select
  using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "own files write" on storage.objects for insert
  with check (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "own files delete" on storage.objects for delete
  using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

-- Contact form submissions (inserted server-side with the service role)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, company text, message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
