# Dessert House — menu & ordering app

A Next.js app showing your real dessert/cake menu, with a working cart
and order placement, styled with a warm bakery palette. One project,
one server, no separate backend to run.

## 1. Run it locally (works immediately, no setup)

```
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:3000`). It redirects
to `/menu/dessert-house/table-1` and shows your real menu, grouped into
the same categories you gave me: Cakes & Tiramisu, Cake Bowls,
Brownies, Mousses & Treats.

Try adding items to the cart and tapping "Place order" — it works
right away in **demo mode** (nothing is actually saved yet, but you can
see and test the whole flow). Open your browser console to see the
order data that *would* be sent once Supabase is connected.

## 2. Connect Supabase so orders are actually saved

1. Create a free project at supabase.com.
2. In your new project, go to **SQL Editor > New query**, paste the
   entire contents of `supabase/schema.sql` from this project, and run
   it. This creates your `orders` table (and an optional `menu_items`
   table for later).
3. Go to **Project Settings > API**. Copy your **Project URL** and
   **anon public key**.
4. In this project folder, copy `.env.local.example` to a new file
   named `.env.local`, and paste in your real URL and key.
5. Stop and restart `npm run dev` (env vars are only read on startup).
6. Place a test order again — this time, go to Supabase's **Table
   Editor > orders** and you'll see the real row appear.

## 3. Managing orders (your "backend")

This is the part that answers "how do I update orders simply": you
don't need a custom admin panel. Open **Supabase > Table Editor >
orders** on your phone or a tablet at the counter. New orders appear
as new rows. Click the `status` cell on any row and change it from
`pending` to `preparing` or `done` — that's the entire order management
workflow, with zero additional code.

## 4. Rename "dessert-house" to your real brand

Search this project for `dessert-house` (it appears in
`data/menuData.js` and `app/page.js`) and replace it with your actual
restaurant's slug, e.g. `sweet-treats-cafe`. Your NFC tags will each
point to a URL like:

```
https://yourdomain.com/menu/sweet-treats-cafe/table-4
```

with only the table number changing per sticker.

## 5. Editing the menu

For now, edit `data/menuData.js` directly — add, remove, or reprice
items, save, and the running app updates instantly (no restart
needed). Once you're comfortable, you can migrate this data into the
`menu_items` Supabase table instead, so menu changes don't require
touching code or redeploying — ask me when you're ready for that step.

## 6. Customizing the look

All colors live in one place: `tailwind.config.js`, under `colors`.
Change `cream`, `blush`, `cocoa`, and `gold` to match your actual
branding — every component in the app references these names, so a
color swap there updates the whole app instantly.

## 7. Deploying for real

1. Push this project to a GitHub repository.
2. Go to vercel.com, sign in, and import that repository.
3. In Vercel's project settings, add the same two environment
   variables from your `.env.local` file.
4. Deploy. Vercel gives you a live HTTPS URL immediately — this is
   what your NFC tags and QR codes will point to.
