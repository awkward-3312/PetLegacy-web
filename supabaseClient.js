import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://gpnrtcvtwxsoasrnmhof.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbnJ0Y3Z0d3hzb2Fzcm5taG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNDI3MTIsImV4cCI6MjA2NTkxODcxMn0.s7e9BAFcsfUbiWAETf44sUxSGSoQ6xvZF9gPTebcMWc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
