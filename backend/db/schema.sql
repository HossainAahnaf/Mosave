-- MoSave schema (Supabase compatible). Assumes pgcrypto extension for gen_random_uuid().

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  full_name text,
  onboarding_complete boolean default false,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.households (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.household_members (
  household_id uuid references public.households(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null default 'member',
  joined_at timestamptz not null default now(),
  primary key (household_id, user_id)
);

create table if not exists public.household_invites (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references public.households(id) on delete cascade,
  email text not null,
  invited_by uuid references auth.users(id) on delete set null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.expense_categories (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references public.households(id) on delete cascade,
  name text not null,
  kind text default 'expense',
  created_at timestamptz not null default now()
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references public.households(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  category text not null,
  amount numeric(10,2) not null,
  occurred_on date not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references public.households(id) on delete cascade,
  category text not null,
  amount numeric(10,2) not null,
  period text default 'monthly',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references public.households(id) on delete cascade,
  title text not null,
  target_amount numeric(10,2) not null,
  current_amount numeric(10,2) not null default 0,
  due_date date,
  streak_days int default 0,
  created_at timestamptz not null default now()
);

-- Aggregated view for dashboard summaries.
create view if not exists public.household_monthly_summary as
select
  household_id,
  date_trunc('month', occurred_on) as month,
  sum(case when lower(category) = 'income' then amount else 0 end) as income,
  sum(case when lower(category) <> 'income' then amount else 0 end) as expenses,
  sum(case when lower(category) = 'income' then amount else 0 end) -
  sum(case when lower(category) <> 'income' then amount else 0 end) as savings
from public.expenses
group by household_id, date_trunc('month', occurred_on);

-- Enable row level security and simple policies (adjust as needed).
alter table public.profiles enable row level security;
alter table public.households enable row level security;
alter table public.household_members enable row level security;
alter table public.household_invites enable row level security;
alter table public.expense_categories enable row level security;
alter table public.expenses enable row level security;
alter table public.budgets enable row level security;
alter table public.goals enable row level security;

create policy "Users can view their profile" on public.profiles
  for select using (auth.uid() = user_id);

create policy "Users can update their profile" on public.profiles
  for update using (auth.uid() = user_id);

create policy "Members can view households" on public.households
  for select using (
    id in (select household_id from public.household_members where user_id = auth.uid())
  );

create policy "Members manage household data" on public.household_members
  for all using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "Members manage invites" on public.household_invites
  for all using (
    household_id in (select household_id from public.household_members where user_id = auth.uid())
  )
  with check (
    household_id in (select household_id from public.household_members where user_id = auth.uid())
  );

create policy "Members manage categories" on public.expense_categories
  for all using (
    household_id in (select household_id from public.household_members where user_id = auth.uid())
  )
  with check (
    household_id in (select household_id from public.household_members where user_id = auth.uid())
  );

create policy "Members manage budgets" on public.budgets
  for all using (
    household_id in (select household_id from public.household_members where user_id = auth.uid())
  )
  with check (
    household_id in (select household_id from public.household_members where user_id = auth.uid())
  );

create policy "Members view expenses" on public.expenses
  for select using (
    household_id in (select household_id from public.household_members where user_id = auth.uid())
  );

create policy "Members insert expenses" on public.expenses
  for insert with check (
    household_id in (select household_id from public.household_members where user_id = auth.uid())
  );

create policy "Members update expenses" on public.expenses
  for update using (
    created_by = auth.uid()
  );

create policy "Members manage goals" on public.goals
  for all using (
    household_id in (select household_id from public.household_members where user_id = auth.uid())
  );
