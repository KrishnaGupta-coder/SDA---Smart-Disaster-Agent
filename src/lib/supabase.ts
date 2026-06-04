import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jfxbvtwwbuyojfgrqogy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnbXJud3BqZW9rc3hzZ2x1enN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NTg4NDksImV4cCI6MjA3MzIzNDg0OX0.nX1-qT8eQS4KrXu-J-KEgEBJ4UfPL40I1_oj2zk900o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);