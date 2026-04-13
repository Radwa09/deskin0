-- SKIN-E CLINICAL DATABASE SCHEMA
-- Run this in your Supabase SQL Editor

-- 1. PROFILES TABLE
-- Extends the auth.users data with clinical-specific attributes
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    name text,
    email text,
    role text default 'user',
    bio text,
    avatar_url text,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. ANALYSIS HISTORY TABLE
create table if not exists public.analysis_history (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    date timestamp with time zone default timezone('utc'::text, now()) not null,
    type text not null,
    result text not null,
    score integer not null
);

-- 3. ACTIVITIES TABLE (Audit Trail)
create table if not exists public.activities (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    type text not null,
    title text not null,
    description text not null,
    icon text not null,
    date timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Row Level Security)
alter table public.profiles enable row level security;
alter table public.analysis_history enable row level security;
alter table public.activities enable row level security;

-- NOTE: We use auth.jwt() -> 'user_metadata' to check roles. 
-- This avoids infinite recursion in the profiles table.

-- Profile Policies: Users can view their own profile; Admins see all.
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Admins can view all profiles" on public.profiles for select using (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- History Policies
drop policy if exists "Users can view own history" on public.analysis_history;
drop policy if exists "Users can insert own history" on public.analysis_history;
drop policy if exists "Admins can view all history" on public.analysis_history;

create policy "Users can view own history" on public.analysis_history for select using (auth.uid() = user_id);
create policy "Users can insert own history" on public.analysis_history for insert with check (auth.uid() = user_id);
create policy "Admins can view all history" on public.analysis_history for select using (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Activity Policies
drop policy if exists "Users can view own activities" on public.activities;
drop policy if exists "Users can insert own activities" on public.activities;
drop policy if exists "Admins can view all activities" on public.activities;

create policy "Users can view own activities" on public.activities for select using (auth.uid() = user_id);
create policy "Users can insert own activities" on public.activities for insert with check (auth.uid() = user_id);
create policy "Admins can view all activities" on public.activities for select using (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);
