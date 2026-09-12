import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// If you haven't set up Supabase yet (see README), these env vars won't
// exist, and `supabase` will be null. The order-placing code checks for
// this and falls back to a "demo mode" alert instead of crashing — so
// you can try the whole menu/cart experience before wiring up a real
// database.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null
