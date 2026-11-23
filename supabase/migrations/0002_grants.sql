-- Newer Supabase projects do not auto-grant privileges on tables created in SQL.
-- RLS policies still restrict what each user can touch.
grant usage on schema public to anon, authenticated, service_role;

grant all on all tables in schema public to service_role;
grant execute on all functions in schema public to service_role;

grant select on public.profiles to authenticated;
grant update (full_name, company) on public.profiles to authenticated;
grant select, insert, update, delete on public.agents, public.policies, public.documents, public.notifications to authenticated;
grant select on public.runs to authenticated;
-- subscription_events and contact_messages: service role only (no grants to anon/authenticated).
