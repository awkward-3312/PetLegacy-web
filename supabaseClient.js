import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://TUSUPABASE.supabase.co';
const SUPABASE_KEY = 'TU_PUBLIC_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
