import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// For build-time TypeScript compilation, use placeholder values if not configured
// At runtime, the actual values from environment variables will be used
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder';

// Check if Supabase is actually configured (not using placeholders)
export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Always create a real Supabase client for proper TypeScript inference
// If using placeholders, API calls will fail at runtime but types will work at build time
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client with service role (for admin operations)
export const createServerClient = (): SupabaseClient<Database> => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceRoleKey) {
    return createClient<Database>(supabaseUrl, serviceRoleKey);
  }
  return supabase; // Fallback to anon client
};
