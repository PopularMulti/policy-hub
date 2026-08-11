// Supabase client for Popular Multiservice - Policy Hub
// Requires: npm install @supabase/supabase-js

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gzhaeuilxmnzqkjloejl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable__C4GJHoZGNw6HvVLOL43nw_7SeH6wJ2";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
