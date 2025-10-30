-- MoSave initial schema (PostgreSQL / Supabase compatible)

create table if not exists households (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references households(id) on delete cascade,
  email text unique,
  display_name text not null,
  age int,
  role text,
  created_at timestamptz not null default now()
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references households(id) on delete cascade,
  category text not null,
  amount numeric(10,2) not null,
  occurred_on date not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists recurring_bills (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references households(id) on delete cascade,
  name text not null,
  due_day int not null,
  amount numeric(10,2) not null,
  category text,
  created_at timestamptz not null default now()
);

create table if not exists goals (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references households(id) on delete cascade,
  title text not null,
  target_amount numeric(10,2) not null,
  current_amount numeric(10,2) not null default 0,
  due_date date,
  streak_days int default 0,
  created_at timestamptz not null default now()
);

create table if not exists literacy_lessons (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  lesson_type text not null,
  duration_minutes int not null,
  trigger text,
  summary text,
  actions jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  lesson_id uuid references literacy_lessons(id) on delete cascade,
  score numeric(5,2),
  completed_at timestamptz not null default now()
);

create view if not exists household_monthly_summary as
select
  household_id,
  to_char(occurred_on, 'Mon YYYY') as month,
  sum(case when category = 'Income' then amount else 0 end) as income,
  sum(case when category <> 'Income' then amount else 0 end) as expenses,
  sum(case when category = 'Income' then amount else 0 end) -
  sum(case when category <> 'Income' then amount else 0 end) as savings
from expenses
group by household_id, to_char(occurred_on, 'Mon YYYY');
