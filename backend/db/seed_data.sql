-- Seed data for local development. Adjust ids to match Supabase UUIDs if needed.

insert into households (id, name)
values ('00000000-0000-0000-0000-000000000001', 'Independence House')
on conflict (id) do nothing;

insert into users (id, household_id, email, display_name, age, role)
values
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'amy@example.com', 'Amy', 19, 'student'),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'malik@example.com', 'Malik', 21, 'barista')
on conflict (id) do nothing;

insert into goals (id, household_id, title, target_amount, current_amount, due_date, streak_days)
values
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'Emergency fund', 1500, 840, '2025-02-14', 12),
  ('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000001', 'Campus utilities', 600, 420, '2024-12-01', 5)
on conflict (id) do nothing;

insert into expenses (household_id, category, amount, occurred_on, notes)
values
  ('00000000-0000-0000-0000-000000000001', 'Income', 2100.00, '2024-09-01', 'Part-time jobs'),
  ('00000000-0000-0000-0000-000000000001', 'Rent', 750.00, '2024-09-01', 'Apartment share'),
  ('00000000-0000-0000-0000-000000000001', 'Groceries', 185.40, '2024-09-04', 'Trader Joe''s'),
  ('00000000-0000-0000-0000-000000000001', 'Utilities', 132.75, '2024-09-02', null),
  ('00000000-0000-0000-0000-000000000001', 'Transport', 68.95, '2024-09-03', 'Metro card top-up');

insert into literacy_lessons (id, slug, title, lesson_type, duration_minutes, trigger, summary, actions)
values
  (
    '00000000-0000-0000-0000-000000000301',
    'budgeting-basics',
    'Budgeting Basics',
    'micro_lesson',
    5,
    'overspend_groceries',
    'Set up a 50/30/20 plan with envelopes tailored to your spending patterns.',
    '["Review monthly cash flow","Assign categories","Automate savings transfer"]'
  ),
  (
    '00000000-0000-0000-0000-000000000302',
    'grocery-gameplan',
    'Grocery Gameplan',
    'quiz',
    4,
    'meal_planning_prompt',
    'Quiz reinforces smart meal prepping and bulk buying habits.',
    '["Track weekly grocery list","Score 3/4 or better to earn +12 IQ"]'
  )
on conflict (id) do nothing;
