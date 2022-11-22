import { createClient } from '@supabase/supabase-js';
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } from './constants';

export const supabase = createClient(
  REACT_APP_SUPABASE_URL || 'https://vhhpxskjmppjmqcrlarl.supabase.co',
  REACT_APP_SUPABASE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoaHB4c2tqbXBwam1xY3JsYXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg3Nzc0MjQsImV4cCI6MTk4NDM1MzQyNH0.89xhU6xg1UvGTYGoT-vvQ5_cpL_Mst2n9HsDTjXfzPc'
);
