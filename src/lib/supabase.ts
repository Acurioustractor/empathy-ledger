import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Create a mock client for demo mode
const createMockClient = () => {
  const mockResponse = { data: null, error: { message: 'Demo mode - Supabase not configured' } };

  return {
    from: () => ({
      select: () => Promise.resolve(mockResponse),
      insert: () => Promise.resolve(mockResponse),
      update: () => Promise.resolve(mockResponse),
      upsert: () => Promise.resolve(mockResponse),
      delete: () => Promise.resolve(mockResponse),
      eq: () => ({ single: () => Promise.resolve(mockResponse), select: () => Promise.resolve(mockResponse) }),
      order: () => Promise.resolve(mockResponse),
    }),
    rpc: () => Promise.resolve(mockResponse),
    channel: () => ({
      on: () => ({ subscribe: () => {} }),
    }),
    removeChannel: () => {},
  } as unknown as SupabaseClient<Database>;
};

// Client-side Supabase client (or mock in demo mode)
export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : createMockClient();

// Server-side Supabase client with service role (for admin operations)
export const createServerClient = () => {
  if (!isSupabaseConfigured) {
    return createMockClient();
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    return supabase; // Fallback to anon client
  }
  return createClient<Database>(supabaseUrl, serviceRoleKey);
};
