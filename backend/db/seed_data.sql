-- Seed data for local development. Replace UUID placeholders with real IDs from auth.users as needed.

insert into public.profiles (id, user_id, full_name, onboarding_complete)
values
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000101', 'Amy', true),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000102', 'Malik', true)
on conflict (id) do nothing;

insert into public.households (id, name, owner_id)
values ('00000000-0000-0000-0000-000000000001', 'Independence House', '00000000-0000-0000-0000-000000000101')
on conflict (id) do nothing;

insert into public.household_members (household_id, user_id, role)
values
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000101', 'owner'),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000102', 'member')
on conflict do nothing;

insert into public.expense_categories (id, household_id, name)
values
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'Income'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'Rent'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'Groceries'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'Utilities'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'Transport'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'Health'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'Entertainment'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'Savings');

insert into public.goals (id, household_id, title, target_amount, current_amount, due_date, streak_days)
values
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'Emergency fund', 1500, 840, '2025-02-14', 12),
  ('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000001', 'Campus utilities', 600, 420, '2024-12-01', 5)
on conflict (id) do nothing;

insert into public.expenses (household_id, created_by, category, amount, occurred_on, notes)
values
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000101', 'Income', 2100.00, '2024-09-01', 'Part-time jobs'),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000101', 'Rent', 750.00, '2024-09-01', 'Apartment share'),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000102', 'Groceries', 185.40, '2024-09-04', 'Trader Joe''s'),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000102', 'Utilities', 132.75, '2024-09-02', null),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000102', 'Transport', 68.95, '2024-09-03', 'Metro card top-up');
