-- Run this in your Supabase project's SQL Editor (Database > SQL Editor > New query)

-- Orders: every order placed by a customer lands here as one row.
create table if not exists orders (
  id bigint generated always as identity primary key,
  restaurant_id text not null,
  table_id text not null,
  items jsonb not null,       -- array of {id, name, price, quantity}
  total integer not null,
  status text not null default 'pending',  -- pending -> preparing -> done
  created_at timestamp with time zone default now()
);

-- Allow the app's public "anon" key to insert new orders and read them
-- back (needed for the app to work at all). Row Level Security is on
-- by default in Supabase — these policies open it up just enough.
alter table orders enable row level security;

create policy "Anyone can insert orders"
  on orders for insert
  to anon
  with check (true);

create policy "Anyone can read orders"
  on orders for select
  to anon
  using (true);

-- Optional, for later: a menu_items table, if you want to move your
-- menu out of the code and into Supabase so it can be edited without
-- redeploying. Not required for the app to work today.
create table if not exists menu_items (
  id bigint generated always as identity primary key,
  restaurant_id text not null,
  category text not null,
  name text not null,
  price integer not null,
  description text,
  is_veg boolean default true,
  sort_order integer default 0
);
