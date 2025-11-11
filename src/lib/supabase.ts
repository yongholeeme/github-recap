import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uplaquwjknzeuzsepgwm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwbGFxdXdqa256ZXV6c2VwZ3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3OTAwODksImV4cCI6MjA3ODM2NjA4OX0.QAlsdWxYYfnj2JlRpCXxlEoAg-6-7ASAsfvUW_gZbSY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
