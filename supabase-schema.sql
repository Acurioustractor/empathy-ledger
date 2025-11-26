-- ═══════════════════════════════════════════════════════════════════════════════
-- EMPATHY LEDGER DATABASE SCHEMA
-- Run this in your Supabase SQL Editor to set up the database
-- ═══════════════════════════════════════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ═══════════════════════════════════════════════════════════════════════════════
-- PORTRAITS TABLE
-- Each portrait represents a storyteller's image in the grid
-- ═══════════════════════════════════════════════════════════════════════════════

create table if not exists portraits (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Image and identity
  image_url text not null,
  name text, -- Optional name (private, for storyteller reference)
  storyteller_id text not null, -- Unique identifier for the storyteller (could be email, phone, or generated)

  -- Visibility control (the core consent mechanism)
  visible boolean default true not null,

  -- Engagement stats
  views integer default 0 not null,
  clicks integer default 0 not null,

  -- Visual variation (for organic grid feel)
  rotation float default 0 not null, -- Slight rotation in degrees
  offset_x float default 0 not null, -- Horizontal offset in pixels
  offset_y float default 0 not null, -- Vertical offset in pixels

  -- Access code for storyteller dashboard (no account needed)
  access_code text default substr(md5(random()::text), 0, 8) not null unique
);

-- Index for quick lookups
create index if not exists portraits_storyteller_id_idx on portraits(storyteller_id);
create index if not exists portraits_visible_idx on portraits(visible);
create index if not exists portraits_access_code_idx on portraits(access_code);

-- ═══════════════════════════════════════════════════════════════════════════════
-- MESSAGES TABLE
-- Single-word messages left by viewers for storytellers
-- ═══════════════════════════════════════════════════════════════════════════════

create table if not exists messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  portrait_id uuid references portraits(id) on delete cascade not null,
  word text not null check (word ~ '^[a-zA-Z]+$' and length(word) <= 20), -- Single word, letters only
  read boolean default false not null
);

-- Index for fetching messages by portrait
create index if not exists messages_portrait_id_idx on messages(portrait_id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- PULSE EVENTS TABLE
-- Real-time events for notifications (hover, click, view, message)
-- ═══════════════════════════════════════════════════════════════════════════════

create table if not exists pulse_events (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  portrait_id uuid references portraits(id) on delete cascade not null,
  event_type text not null check (event_type in ('view', 'hover', 'click', 'message')),
  metadata jsonb -- Optional extra data (e.g., message content)
);

-- Index for real-time queries
create index if not exists pulse_events_portrait_id_idx on pulse_events(portrait_id);
create index if not exists pulse_events_created_at_idx on pulse_events(created_at);

-- Auto-delete old pulse events (keep last 7 days)
create or replace function delete_old_pulse_events()
returns trigger as $$
begin
  delete from pulse_events where created_at < now() - interval '7 days';
  return new;
end;
$$ language plpgsql;

create trigger cleanup_pulse_events
  after insert on pulse_events
  execute function delete_old_pulse_events();

-- ═══════════════════════════════════════════════════════════════════════════════
-- PUSH SUBSCRIPTIONS TABLE
-- Store web push subscriptions for storyteller notifications
-- ═══════════════════════════════════════════════════════════════════════════════

create table if not exists push_subscriptions (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  storyteller_id text not null,
  subscription jsonb not null, -- The PushSubscription object from the browser
  active boolean default true not null
);

-- Index for finding subscriptions by storyteller
create index if not exists push_subscriptions_storyteller_id_idx on push_subscriptions(storyteller_id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- REAL-TIME SUBSCRIPTIONS
-- Enable real-time for pulse events (so storytellers get instant notifications)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Enable real-time for pulse_events table
alter publication supabase_realtime add table pulse_events;

-- ═══════════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- Protect data while allowing necessary access
-- ═══════════════════════════════════════════════════════════════════════════════

alter table portraits enable row level security;
alter table messages enable row level security;
alter table pulse_events enable row level security;
alter table push_subscriptions enable row level security;

-- Portraits: Anyone can view visible portraits, only owner can modify
create policy "Visible portraits are viewable by everyone" on portraits
  for select using (visible = true);

create policy "Storytellers can view their own portraits" on portraits
  for select using (true); -- Will be filtered by access_code in app

create policy "Anyone can insert portraits" on portraits
  for insert with check (true);

create policy "Storytellers can update their own portraits" on portraits
  for update using (true); -- Verified by access_code in app

-- Messages: Anyone can insert, only portrait owner can read
create policy "Anyone can send messages" on messages
  for insert with check (true);

create policy "Messages are readable by portrait owner" on messages
  for select using (true); -- Filtered by access_code in app

-- Pulse events: Anyone can insert, filtered in app
create policy "Anyone can create pulse events" on pulse_events
  for insert with check (true);

create policy "Pulse events are readable" on pulse_events
  for select using (true);

-- Push subscriptions: Owner only
create policy "Push subscriptions are private" on push_subscriptions
  for all using (true); -- Filtered by storyteller_id in app

-- ═══════════════════════════════════════════════════════════════════════════════
-- HELPER FUNCTIONS
-- ═══════════════════════════════════════════════════════════════════════════════

-- Function to increment view count
create or replace function increment_views(portrait_uuid uuid)
returns void as $$
begin
  update portraits set views = views + 1, updated_at = now() where id = portrait_uuid;
end;
$$ language plpgsql;

-- Function to increment click count
create or replace function increment_clicks(portrait_uuid uuid)
returns void as $$
begin
  update portraits set clicks = clicks + 1, updated_at = now() where id = portrait_uuid;
end;
$$ language plpgsql;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SAMPLE DATA (Optional - for testing)
-- Uncomment to add test portraits
-- ═══════════════════════════════════════════════════════════════════════════════

/*
insert into portraits (image_url, name, storyteller_id, visible, views, clicks, rotation, offset_x, offset_y) values
  ('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face', 'Soul 1', 'test-user-1', true, 47, 12, -1.2, 3, -2),
  ('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face', 'Soul 2', 'test-user-2', true, 23, 8, 0.8, -2, 4),
  ('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face', 'Soul 3', 'test-user-3', false, 31, 5, -0.5, 1, -3),
  ('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face', 'Soul 4', 'test-user-4', true, 89, 34, 1.5, -4, 2);
*/
