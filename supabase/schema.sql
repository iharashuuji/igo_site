-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Members Table
create table public.members (
  id uuid not null default uuid_generate_v4(),
  name text not null,
  grade integer not null check (grade >= 1 and grade <= 4),
  rank text not null, -- e.g., "五段", "10級"
  role text not null default '一般', -- e.g., "部長", "会計", "一般"
  avatar_url text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint members_pkey primary key (id)
);

-- Games Table (Match Records)
create table public.games (
  id uuid not null default uuid_generate_v4(),
  played_at date not null default current_date,
  event_name text, -- Optional: e.g., "春季合宿", "関東学生リーグ"
  black_player_id uuid references public.members(id),
  white_player_id uuid references public.members(id),
  handicap text, -- e.g., "互先", "2子"
  result text, -- e.g., "B+R" (Black Resign), "W+3.5"
  sgf_content text, -- Full SGF text content
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint games_pkey primary key (id)
);

-- Posts Table (Blog/News)
create table public.posts (
  id uuid not null default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  content text, -- Markdown or HTML
  category text, -- e.g., "お知らせ", "大会結果"
  thumbnail_url text,
  is_published boolean not null default true,
  published_at timestamp with time zone not null default now(),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint posts_pkey primary key (id)
);

-- Row Level Security (RLS) Policies
-- Note: These are basic policies. You may need to adjust them based on your Auth setup.

alter table public.members enable row level security;
alter table public.games enable row level security;
alter table public.posts enable row level security;

-- Allow read access to everyone (public)
create policy "Public members are viewable by everyone"
  on public.members for select
  using ( true );

create policy "Public games are viewable by everyone"
  on public.games for select
  using ( true );

create policy "Public posts are viewable by everyone"
  on public.posts for select
  using ( is_published = true );

-- Allow write access only to authenticated users (Admins)
create policy "Members are insertable by authenticated users only"
  on public.members for insert
  with check ( auth.role() = 'authenticated' );

create policy "Members are updatable by authenticated users only"
  on public.members for update
  using ( auth.role() = 'authenticated' );

create policy "Games are insertable by authenticated users only"
  on public.games for insert
  with check ( auth.role() = 'authenticated' );

create policy "Games are updatable by authenticated users only"
  on public.games for update
  using ( auth.role() = 'authenticated' );

create policy "Posts are insertable by authenticated users only"
  on public.posts for insert
  with check ( auth.role() = 'authenticated' );

create policy "Posts are updatable by authenticated users only"
  on public.posts for update
  using ( auth.role() = 'authenticated' );
