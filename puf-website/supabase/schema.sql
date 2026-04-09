-- Run this script in Supabase SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  bio text,
  role text not null default 'student' check (role in ('student', 'mentor')),
  preferred_countries text[] not null default '{}',
  target_programs text[] not null default '{}',
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.universities (
  id bigserial primary key,
  name text not null,
  country text not null,
  city text,
  website text,
  tuition_range text,
  acceptance_rate text,
  tags text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.saved_universities (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  university_id bigint not null references public.universities(id) on delete cascade,
  note text,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, university_id)
);

create table if not exists public.activities (
  id bigserial primary key,
  title text not null,
  category text not null check (category in ('conference', 'project', 'volunteering', 'summer-camp')),
  country text,
  description text,
  starts_at date,
  ends_at date,
  source_url text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.exercises (
  id bigserial primary key,
  title text not null,
  topic text not null,
  difficulty text not null default 'medium' check (difficulty in ('easy', 'medium', 'hard')),
  prompt text not null,
  expected_answer text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.mentor_posts (
  id bigserial primary key,
  mentor_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  contact_ig text,
  active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.planner_tasks (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  status text not null default 'todo' check (status in ('todo', 'in-progress', 'done')),
  source text not null default 'manual' check (source in ('manual', 'ai')),
  due_at timestamptz,
  notes text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.profiles enable row level security;
alter table public.universities enable row level security;
alter table public.saved_universities enable row level security;
alter table public.activities enable row level security;
alter table public.exercises enable row level security;
alter table public.mentor_posts enable row level security;
alter table public.planner_tasks enable row level security;

-- Profiles: user can read and update own profile.
do $$ begin
  create policy "profiles_select_own" on public.profiles
    for select using (auth.uid() = id);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "profiles_insert_own" on public.profiles
    for insert with check (auth.uid() = id);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "profiles_update_own" on public.profiles
    for update using (auth.uid() = id);
exception when duplicate_object then null;
end $$;

-- Public read tables.
do $$ begin
  create policy "universities_public_read" on public.universities
    for select using (true);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "activities_public_read" on public.activities
    for select using (true);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "exercises_public_read" on public.exercises
    for select using (true);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "mentor_posts_public_read_active" on public.mentor_posts
    for select using (active = true);
exception when duplicate_object then null;
end $$;

-- Mentor posts write only by owner.
do $$ begin
  create policy "mentor_posts_insert_own" on public.mentor_posts
    for insert with check (auth.uid() = mentor_id);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "mentor_posts_update_own" on public.mentor_posts
    for update using (auth.uid() = mentor_id);
exception when duplicate_object then null;
end $$;

-- Saved universities and tasks are private.
do $$ begin
  create policy "saved_universities_select_own" on public.saved_universities
    for select using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "saved_universities_insert_own" on public.saved_universities
    for insert with check (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "saved_universities_delete_own" on public.saved_universities
    for delete using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "planner_tasks_select_own" on public.planner_tasks
    for select using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "planner_tasks_insert_own" on public.planner_tasks
    for insert with check (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "planner_tasks_update_own" on public.planner_tasks
    for update using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "planner_tasks_delete_own" on public.planner_tasks
    for delete using (auth.uid() = user_id);
exception when duplicate_object then null;
end $$;
