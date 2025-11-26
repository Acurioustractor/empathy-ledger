export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      portraits: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          image_url: string;
          name: string | null;
          storyteller_id: string;
          visible: boolean;
          views: number;
          clicks: number;
          rotation: number;
          offset_x: number;
          offset_y: number;
          access_code: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          image_url: string;
          name?: string | null;
          storyteller_id: string;
          visible?: boolean;
          views?: number;
          clicks?: number;
          rotation?: number;
          offset_x?: number;
          offset_y?: number;
          access_code?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          image_url?: string;
          name?: string | null;
          storyteller_id?: string;
          visible?: boolean;
          views?: number;
          clicks?: number;
          rotation?: number;
          offset_x?: number;
          offset_y?: number;
          access_code?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          created_at: string;
          portrait_id: string;
          word: string;
          read: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          portrait_id: string;
          word: string;
          read?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          portrait_id?: string;
          word?: string;
          read?: boolean;
        };
      };
      pulse_events: {
        Row: {
          id: string;
          created_at: string;
          portrait_id: string;
          event_type: 'view' | 'hover' | 'click' | 'message';
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          portrait_id: string;
          event_type: 'view' | 'hover' | 'click' | 'message';
          metadata?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          portrait_id?: string;
          event_type?: 'view' | 'hover' | 'click' | 'message';
          metadata?: Json | null;
        };
      };
      push_subscriptions: {
        Row: {
          id: string;
          created_at: string;
          storyteller_id: string;
          subscription: Json;
          active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          storyteller_id: string;
          subscription: Json;
          active?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          storyteller_id?: string;
          subscription?: Json;
          active?: boolean;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

// Helper types
export type Portrait = Database['public']['Tables']['portraits']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type PulseEvent = Database['public']['Tables']['pulse_events']['Row'];
export type PushSubscription = Database['public']['Tables']['push_subscriptions']['Row'];
