export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      _act_migrations: {
        Row: {
          applied_at: string | null
          checksum: string
          filename: string
          id: number
        }
        Insert: {
          applied_at?: string | null
          checksum: string
          filename: string
          id?: number
        }
        Update: {
          applied_at?: string | null
          checksum?: string
          filename?: string
          id?: number
        }
        Relationships: []
      }
      activities: {
        Row: {
          activity_type: string
          id: string
          message: string
          metadata: Json | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          activity_type: string
          id?: string
          message: string
          metadata?: Json | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          id?: string
          message?: string
          metadata?: Json | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_discoveries: {
        Row: {
          confidence_score: number | null
          context_after: string | null
          context_before: string | null
          discovered_at: string | null
          discovery_type: string
          extracted_text: string
          human_verified: boolean | null
          id: string
          storyteller_id: string | null
          transcript_id: string | null
          updated_at: string | null
          verification_notes: string | null
        }
        Insert: {
          confidence_score?: number | null
          context_after?: string | null
          context_before?: string | null
          discovered_at?: string | null
          discovery_type: string
          extracted_text: string
          human_verified?: boolean | null
          id?: string
          storyteller_id?: string | null
          transcript_id?: string | null
          updated_at?: string | null
          verification_notes?: string | null
        }
        Update: {
          confidence_score?: number | null
          context_after?: string | null
          context_before?: string | null
          discovered_at?: string | null
          discovery_type?: string
          extracted_text?: string
          human_verified?: boolean | null
          id?: string
          storyteller_id?: string | null
          transcript_id?: string | null
          updated_at?: string | null
          verification_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_discoveries_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_discoveries_transcript_id_fkey"
            columns: ["transcript_id"]
            isOneToOne: false
            referencedRelation: "transcripts"
            referencedColumns: ["id"]
          },
        ]
      }
      analysis_jobs: {
        Row: {
          attempts: number
          created_at: string
          finished_at: string | null
          id: string
          last_error: string | null
          priority: number | null
          scheduled_at: string
          started_at: string | null
          status: Database["public"]["Enums"]["analysis_job_status_enum"]
          storyteller_id: string
          transcript_id: string
          updated_at: string
        }
        Insert: {
          attempts?: number
          created_at?: string
          finished_at?: string | null
          id?: string
          last_error?: string | null
          priority?: number | null
          scheduled_at?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["analysis_job_status_enum"]
          storyteller_id: string
          transcript_id: string
          updated_at?: string
        }
        Update: {
          attempts?: number
          created_at?: string
          finished_at?: string | null
          id?: string
          last_error?: string | null
          priority?: number | null
          scheduled_at?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["analysis_job_status_enum"]
          storyteller_id?: string
          transcript_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "analysis_jobs_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analysis_jobs_transcript_id_fkey"
            columns: ["transcript_id"]
            isOneToOne: false
            referencedRelation: "transcripts"
            referencedColumns: ["id"]
          },
        ]
      }
      art_innovation: {
        Row: {
          created_at: string | null
          creators: Json | null
          description: string
          featured_image_url: string | null
          gallery_images: Json | null
          id: string
          impact: string | null
          is_featured: boolean | null
          location: string | null
          organization_id: string | null
          program_id: string | null
          search_vector: unknown
          slug: string
          social_links: Json | null
          status: string
          story: string | null
          tagline: string | null
          tags: string[] | null
          title: string
          type: string
          updated_at: string | null
          video_url: string | null
          view_count: number | null
          website_url: string | null
          year: number | null
        }
        Insert: {
          created_at?: string | null
          creators?: Json | null
          description: string
          featured_image_url?: string | null
          gallery_images?: Json | null
          id?: string
          impact?: string | null
          is_featured?: boolean | null
          location?: string | null
          organization_id?: string | null
          program_id?: string | null
          search_vector?: unknown
          slug: string
          social_links?: Json | null
          status?: string
          story?: string | null
          tagline?: string | null
          tags?: string[] | null
          title: string
          type: string
          updated_at?: string | null
          video_url?: string | null
          view_count?: number | null
          website_url?: string | null
          year?: number | null
        }
        Update: {
          created_at?: string | null
          creators?: Json | null
          description?: string
          featured_image_url?: string | null
          gallery_images?: Json | null
          id?: string
          impact?: string | null
          is_featured?: boolean | null
          location?: string | null
          organization_id?: string | null
          program_id?: string | null
          search_vector?: unknown
          slug?: string
          social_links?: Json | null
          status?: string
          story?: string | null
          tagline?: string | null
          tags?: string[] | null
          title?: string
          type?: string
          updated_at?: string | null
          video_url?: string | null
          view_count?: number | null
          website_url?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "art_innovation_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "art_innovation_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "community_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      art_innovation_profiles: {
        Row: {
          art_innovation_id: string | null
          created_at: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          public_profile_id: string | null
          role: string
          role_description: string | null
        }
        Insert: {
          art_innovation_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          public_profile_id?: string | null
          role: string
          role_description?: string | null
        }
        Update: {
          art_innovation_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          public_profile_id?: string | null
          role?: string
          role_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "art_innovation_profiles_art_innovation_id_fkey"
            columns: ["art_innovation_id"]
            isOneToOne: false
            referencedRelation: "art_innovation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "art_innovation_profiles_public_profile_id_fkey"
            columns: ["public_profile_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_locations: {
        Row: {
          article_id: string | null
          created_at: string | null
          description: string | null
          id: string
          latitude: number | null
          location_city: string | null
          location_country: string | null
          location_name: string
          location_state: string | null
          longitude: number | null
        }
        Insert: {
          article_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          location_city?: string | null
          location_country?: string | null
          location_name: string
          location_state?: string | null
          longitude?: number | null
        }
        Update: {
          article_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          location_city?: string | null
          location_country?: string | null
          location_name?: string
          location_state?: string | null
          longitude?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "article_locations_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_related_art: {
        Row: {
          art_innovation_id: string | null
          article_id: string | null
          created_at: string | null
          display_order: number | null
          id: string
          relevance_note: string | null
        }
        Insert: {
          art_innovation_id?: string | null
          article_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          relevance_note?: string | null
        }
        Update: {
          art_innovation_id?: string | null
          article_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          relevance_note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_related_art_art_innovation_id_fkey"
            columns: ["art_innovation_id"]
            isOneToOne: false
            referencedRelation: "art_innovation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_related_art_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_related_articles: {
        Row: {
          article_id: string | null
          created_at: string | null
          display_order: number | null
          id: string
          related_article_id: string | null
          relationship_type: string | null
          relevance_note: string | null
        }
        Insert: {
          article_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          related_article_id?: string | null
          relationship_type?: string | null
          relevance_note?: string | null
        }
        Update: {
          article_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          related_article_id?: string | null
          relationship_type?: string | null
          relevance_note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_related_articles_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_related_articles_related_article_id_fkey"
            columns: ["related_article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_related_programs: {
        Row: {
          article_id: string | null
          created_at: string | null
          display_order: number | null
          id: string
          program_id: string | null
          relevance_note: string | null
        }
        Insert: {
          article_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          program_id?: string | null
          relevance_note?: string | null
        }
        Update: {
          article_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          program_id?: string | null
          relevance_note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_related_programs_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_related_programs_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "community_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      article_related_services: {
        Row: {
          article_id: string | null
          created_at: string | null
          display_order: number | null
          id: string
          relevance_note: string | null
          service_id: string | null
        }
        Insert: {
          article_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          relevance_note?: string | null
          service_id?: string | null
        }
        Update: {
          article_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          relevance_note?: string | null
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_related_services_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_related_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_related_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services_complete"
            referencedColumns: ["id"]
          },
        ]
      }
      article_tags: {
        Row: {
          article_id: string | null
          created_at: string | null
          id: string
          tag: string
        }
        Insert: {
          article_id?: string | null
          created_at?: string | null
          id?: string
          tag: string
        }
        Update: {
          article_id?: string | null
          created_at?: string | null
          id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_tags_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_id: string | null
          categories: string[] | null
          category: string | null
          co_authors: string[] | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image_caption: string | null
          featured_image_url: string | null
          id: string
          is_trending: boolean | null
          location_tags: string[] | null
          metadata: Json | null
          published_at: string | null
          reading_time_minutes: number | null
          seo_description: string | null
          seo_title: string | null
          share_count: number | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id?: string | null
          categories?: string[] | null
          category?: string | null
          co_authors?: string[] | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_caption?: string | null
          featured_image_url?: string | null
          id?: string
          is_trending?: boolean | null
          location_tags?: string[] | null
          metadata?: Json | null
          published_at?: string | null
          reading_time_minutes?: number | null
          seo_description?: string | null
          seo_title?: string | null
          share_count?: number | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string | null
          categories?: string[] | null
          category?: string | null
          co_authors?: string[] | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_caption?: string | null
          featured_image_url?: string | null
          id?: string
          is_trending?: boolean | null
          location_tags?: string[] | null
          metadata?: Json | null
          published_at?: string | null
          reading_time_minutes?: number | null
          seo_description?: string | null
          seo_title?: string | null
          share_count?: number | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          action_category: string | null
          created_at: string | null
          gdpr_relevant: boolean | null
          id: string
          ip_address: unknown
          metadata: Json | null
          new_values: Json | null
          old_values: Json | null
          requires_notification: boolean | null
          resource_id: string | null
          resource_type: string
          risk_level: string | null
          session_id: string | null
          user_agent: string | null
          user_email: string | null
          user_id: string | null
          user_role: string | null
        }
        Insert: {
          action: string
          action_category?: string | null
          created_at?: string | null
          gdpr_relevant?: boolean | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          requires_notification?: boolean | null
          resource_id?: string | null
          resource_type: string
          risk_level?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Update: {
          action?: string
          action_category?: string | null
          created_at?: string | null
          gdpr_relevant?: boolean | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          requires_notification?: boolean | null
          resource_id?: string | null
          resource_type?: string
          risk_level?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      authors: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string | null
          id: string
          linkedin_url: string | null
          name: string
          photo_url: string | null
          public_profile_id: string | null
          role: string | null
          slug: string
          twitter_url: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          linkedin_url?: string | null
          name: string
          photo_url?: string | null
          public_profile_id?: string | null
          role?: string | null
          slug: string
          twitter_url?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          linkedin_url?: string | null
          name?: string
          photo_url?: string | null
          public_profile_id?: string | null
          role?: string | null
          slug?: string
          twitter_url?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "authors_public_profile_id_fkey"
            columns: ["public_profile_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      automated_insights: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          data_sources: Json | null
          description: string
          detailed_analysis: Json | null
          evidence_data: Json | null
          expected_impact: Json | null
          expires_at: string | null
          generated_by: string
          generation_timestamp: string
          id: string
          implementation_complexity: string | null
          implementation_notes: string | null
          implemented_at: string | null
          insight_category: string
          insight_type: string
          model_version: string | null
          priority_level: string
          recommended_actions: Json | null
          relevant_communities: Json | null
          relevant_projects: Json | null
          status: string | null
          target_audience: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          data_sources?: Json | null
          description: string
          detailed_analysis?: Json | null
          evidence_data?: Json | null
          expected_impact?: Json | null
          expires_at?: string | null
          generated_by: string
          generation_timestamp: string
          id?: string
          implementation_complexity?: string | null
          implementation_notes?: string | null
          implemented_at?: string | null
          insight_category: string
          insight_type: string
          model_version?: string | null
          priority_level?: string
          recommended_actions?: Json | null
          relevant_communities?: Json | null
          relevant_projects?: Json | null
          status?: string | null
          target_audience?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          data_sources?: Json | null
          description?: string
          detailed_analysis?: Json | null
          evidence_data?: Json | null
          expected_impact?: Json | null
          expires_at?: string | null
          generated_by?: string
          generation_timestamp?: string
          id?: string
          implementation_complexity?: string | null
          implementation_notes?: string | null
          implemented_at?: string | null
          insight_category?: string
          insight_type?: string
          model_version?: string | null
          priority_level?: string
          recommended_actions?: Json | null
          relevant_communities?: Json | null
          relevant_projects?: Json | null
          status?: string | null
          target_audience?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      backups: {
        Row: {
          backup_timestamp: string | null
          checksum: string | null
          created_by: string | null
          data_types: string[] | null
          description: string | null
          id: string
          is_completed: boolean | null
          metadata: Json | null
          size_bytes: number | null
          version: string | null
        }
        Insert: {
          backup_timestamp?: string | null
          checksum?: string | null
          created_by?: string | null
          data_types?: string[] | null
          description?: string | null
          id: string
          is_completed?: boolean | null
          metadata?: Json | null
          size_bytes?: number | null
          version?: string | null
        }
        Update: {
          backup_timestamp?: string | null
          checksum?: string | null
          created_by?: string | null
          data_types?: string[] | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          metadata?: Json | null
          size_bytes?: number | null
          version?: string | null
        }
        Relationships: []
      }
      best_practices: {
        Row: {
          australian_implementation: string | null
          category: string
          challenges: string | null
          created_at: string | null
          description: string
          example_programs: string[] | null
          id: string
          recommendations: string | null
          slug: string
          supporting_research: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          australian_implementation?: string | null
          category: string
          challenges?: string | null
          created_at?: string | null
          description: string
          example_programs?: string[] | null
          id?: string
          recommendations?: string | null
          slug: string
          supporting_research?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          australian_implementation?: string | null
          category?: string
          challenges?: string | null
          created_at?: string | null
          description?: string
          example_programs?: string[] | null
          id?: string
          recommendations?: string | null
          slug?: string
          supporting_research?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      billing_coupons: {
        Row: {
          active: boolean | null
          amount_off: number | null
          code: string
          created_at: string | null
          currency: string | null
          duration: string | null
          duration_in_months: number | null
          id: number
          max_redemptions: number | null
          metadata: Json | null
          percent_off: number | null
          redeem_by: string | null
          tenant_id: string
        }
        Insert: {
          active?: boolean | null
          amount_off?: number | null
          code: string
          created_at?: string | null
          currency?: string | null
          duration?: string | null
          duration_in_months?: number | null
          id?: number
          max_redemptions?: number | null
          metadata?: Json | null
          percent_off?: number | null
          redeem_by?: string | null
          tenant_id: string
        }
        Update: {
          active?: boolean | null
          amount_off?: number | null
          code?: string
          created_at?: string | null
          currency?: string | null
          duration?: string | null
          duration_in_months?: number | null
          id?: number
          max_redemptions?: number | null
          metadata?: Json | null
          percent_off?: number | null
          redeem_by?: string | null
          tenant_id?: string
        }
        Relationships: []
      }
      billing_customers: {
        Row: {
          billing_address: Json | null
          created_at: string | null
          default_payment_brand: string | null
          default_payment_last4: string | null
          email: string | null
          id: number
          metadata: Json | null
          name: string | null
          shipping_address: Json | null
          stripe_customer_id: string | null
          tenant_id: string
          updated_at: string | null
          xero_contact_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          created_at?: string | null
          default_payment_brand?: string | null
          default_payment_last4?: string | null
          email?: string | null
          id?: number
          metadata?: Json | null
          name?: string | null
          shipping_address?: Json | null
          stripe_customer_id?: string | null
          tenant_id: string
          updated_at?: string | null
          xero_contact_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          created_at?: string | null
          default_payment_brand?: string | null
          default_payment_last4?: string | null
          email?: string | null
          id?: number
          metadata?: Json | null
          name?: string | null
          shipping_address?: Json | null
          stripe_customer_id?: string | null
          tenant_id?: string
          updated_at?: string | null
          xero_contact_id?: string | null
        }
        Relationships: []
      }
      billing_invoice_lines: {
        Row: {
          amount: number | null
          description: string | null
          id: number
          invoice_id: number | null
          metadata: Json | null
          price_id: number | null
          product_id: number | null
          quantity: number | null
          tax_rate: number | null
          unit_amount: number | null
        }
        Insert: {
          amount?: number | null
          description?: string | null
          id?: number
          invoice_id?: number | null
          metadata?: Json | null
          price_id?: number | null
          product_id?: number | null
          quantity?: number | null
          tax_rate?: number | null
          unit_amount?: number | null
        }
        Update: {
          amount?: number | null
          description?: string | null
          id?: number
          invoice_id?: number | null
          metadata?: Json | null
          price_id?: number | null
          product_id?: number | null
          quantity?: number | null
          tax_rate?: number | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_invoice_lines_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "billing_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billing_invoice_lines_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "billing_prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billing_invoice_lines_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "billing_products"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_invoices: {
        Row: {
          created_at: string | null
          currency: string | null
          customer_id: number | null
          due_date: string | null
          id: number
          invoice_number: string | null
          issued_at: string | null
          metadata: Json | null
          pdf_url: string | null
          status: string
          stripe_invoice_id: string | null
          subscription_id: number | null
          subtotal: number | null
          tax_total: number | null
          tenant_id: string
          total: number | null
          updated_at: string | null
          xero_invoice_id: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          customer_id?: number | null
          due_date?: string | null
          id?: number
          invoice_number?: string | null
          issued_at?: string | null
          metadata?: Json | null
          pdf_url?: string | null
          status: string
          stripe_invoice_id?: string | null
          subscription_id?: number | null
          subtotal?: number | null
          tax_total?: number | null
          tenant_id: string
          total?: number | null
          updated_at?: string | null
          xero_invoice_id?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          customer_id?: number | null
          due_date?: string | null
          id?: number
          invoice_number?: string | null
          issued_at?: string | null
          metadata?: Json | null
          pdf_url?: string | null
          status?: string
          stripe_invoice_id?: string | null
          subscription_id?: number | null
          subtotal?: number | null
          tax_total?: number | null
          tenant_id?: string
          total?: number | null
          updated_at?: string | null
          xero_invoice_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "billing_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billing_invoices_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "billing_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_payments: {
        Row: {
          amount: number
          created_at: string | null
          failure_code: string | null
          failure_message: string | null
          id: number
          invoice_id: number | null
          metadata: Json | null
          paid_at: string | null
          status: string
          stripe_charge_id: string | null
          stripe_payment_intent_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          failure_code?: string | null
          failure_message?: string | null
          id?: number
          invoice_id?: number | null
          metadata?: Json | null
          paid_at?: string | null
          status: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          failure_code?: string | null
          failure_message?: string | null
          id?: number
          invoice_id?: number | null
          metadata?: Json | null
          paid_at?: string | null
          status?: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "billing_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_prices: {
        Row: {
          active: boolean | null
          billing_period: string
          created_at: string | null
          currency: string
          id: number
          metadata: Json | null
          product_id: number | null
          stripe_price_id: string | null
          trial_days: number | null
          unit_amount: number
          updated_at: string | null
          usage_type: string | null
        }
        Insert: {
          active?: boolean | null
          billing_period: string
          created_at?: string | null
          currency: string
          id?: number
          metadata?: Json | null
          product_id?: number | null
          stripe_price_id?: string | null
          trial_days?: number | null
          unit_amount: number
          updated_at?: string | null
          usage_type?: string | null
        }
        Update: {
          active?: boolean | null
          billing_period?: string
          created_at?: string | null
          currency?: string
          id?: number
          metadata?: Json | null
          product_id?: number | null
          stripe_price_id?: string | null
          trial_days?: number | null
          unit_amount?: number
          updated_at?: string | null
          usage_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "billing_products"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_products: {
        Row: {
          accounting_account_code: string | null
          active: boolean | null
          created_at: string | null
          description: string | null
          id: number
          metadata: Json | null
          name: string
          tenant_id: string
          updated_at: string | null
          xero_item_code: string | null
        }
        Insert: {
          accounting_account_code?: string | null
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: number
          metadata?: Json | null
          name: string
          tenant_id: string
          updated_at?: string | null
          xero_item_code?: string | null
        }
        Update: {
          accounting_account_code?: string | null
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: number
          metadata?: Json | null
          name?: string
          tenant_id?: string
          updated_at?: string | null
          xero_item_code?: string | null
        }
        Relationships: []
      }
      billing_subscription_items: {
        Row: {
          created_at: string | null
          id: number
          metadata: Json | null
          price_id: number | null
          quantity: number | null
          subscription_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          metadata?: Json | null
          price_id?: number | null
          quantity?: number | null
          subscription_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          metadata?: Json | null
          price_id?: number | null
          quantity?: number | null
          subscription_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_subscription_items_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "billing_prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billing_subscription_items_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "billing_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          customer_id: number | null
          id: number
          metadata: Json | null
          status: string
          stripe_subscription_id: string | null
          tenant_id: string
          trial_end: string | null
          updated_at: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: number | null
          id?: number
          metadata?: Json | null
          status: string
          stripe_subscription_id?: string | null
          tenant_id: string
          trial_end?: string | null
          updated_at?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: number | null
          id?: number
          metadata?: Json | null
          status?: string
          stripe_subscription_id?: string | null
          tenant_id?: string
          trial_end?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_subscriptions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "billing_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_tax_rates: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: number
          inclusive: boolean | null
          jurisdiction: string | null
          name: string
          percentage: number
          stripe_tax_rate_id: string | null
          tenant_id: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: number
          inclusive?: boolean | null
          jurisdiction?: string | null
          name: string
          percentage: number
          stripe_tax_rate_id?: string | null
          tenant_id: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: number
          inclusive?: boolean | null
          jurisdiction?: string | null
          name?: string
          percentage?: number
          stripe_tax_rate_id?: string | null
          tenant_id?: string
        }
        Relationships: []
      }
      billing_tax_settings: {
        Row: {
          country: string | null
          default_tax_rate_id: number | null
          metadata: Json | null
          region: string | null
          tax_behavior: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          country?: string | null
          default_tax_rate_id?: number | null
          metadata?: Json | null
          region?: string | null
          tax_behavior?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          country?: string | null
          default_tax_rate_id?: number | null
          metadata?: Json | null
          region?: string | null
          tax_behavior?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_tax_settings_default_tax_rate_id_fkey"
            columns: ["default_tax_rate_id"]
            isOneToOne: false
            referencedRelation: "billing_tax_rates"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_webhook_events: {
        Row: {
          error_message: string | null
          event_type: string
          id: number
          payload: Json
          processed_at: string | null
          provider: string
          received_at: string | null
          status: string | null
        }
        Insert: {
          error_message?: string | null
          event_type: string
          id?: number
          payload: Json
          processed_at?: string | null
          provider: string
          received_at?: string | null
          status?: string | null
        }
        Update: {
          error_message?: string | null
          event_type?: string
          id?: number
          payload?: Json
          processed_at?: string | null
          provider?: string
          received_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          author_id: string | null
          blog_post_id: string | null
          content: string
          created_at: string | null
          id: string
          parent_comment_id: string | null
          status: string | null
        }
        Insert: {
          author_id?: string | null
          blog_post_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          parent_comment_id?: string | null
          status?: string | null
        }
        Update: {
          author_id?: string | null
          blog_post_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          parent_comment_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "blog_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_content_links: {
        Row: {
          art_id: string | null
          blog_post_id: string | null
          context: string | null
          created_at: string | null
          id: string
          link_type: string
          profile_id: string | null
          program_id: string | null
          service_id: string | null
          story_id: string | null
        }
        Insert: {
          art_id?: string | null
          blog_post_id?: string | null
          context?: string | null
          created_at?: string | null
          id?: string
          link_type: string
          profile_id?: string | null
          program_id?: string | null
          service_id?: string | null
          story_id?: string | null
        }
        Update: {
          art_id?: string | null
          blog_post_id?: string | null
          context?: string | null
          created_at?: string | null
          id?: string
          link_type?: string
          profile_id?: string | null
          program_id?: string | null
          service_id?: string | null
          story_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_content_links_art_id_fkey"
            columns: ["art_id"]
            isOneToOne: false
            referencedRelation: "art_innovation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_content_links_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_content_links_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_content_links_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "community_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_content_links_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_content_links_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_content_links_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_media: {
        Row: {
          alt_text: string | null
          blog_post_id: string | null
          caption: string | null
          created_at: string | null
          display_order: number | null
          file_size: number | null
          id: string
          media_type: string
          mime_type: string | null
          thumbnail_url: string | null
          title: string | null
          url: string
          video_embed_code: string | null
          video_provider: string | null
        }
        Insert: {
          alt_text?: string | null
          blog_post_id?: string | null
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          file_size?: number | null
          id?: string
          media_type: string
          mime_type?: string | null
          thumbnail_url?: string | null
          title?: string | null
          url: string
          video_embed_code?: string | null
          video_provider?: string | null
        }
        Update: {
          alt_text?: string | null
          blog_post_id?: string | null
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          file_size?: number | null
          id?: string
          media_type?: string
          mime_type?: string | null
          thumbnail_url?: string | null
          title?: string | null
          url?: string
          video_embed_code?: string | null
          video_provider?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_media_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          audio_url: string | null
          author_id: string | null
          categories: string[] | null
          co_authors: string[] | null
          content: string
          created_at: string | null
          cultural_sensitivity_flag: boolean | null
          empathy_ledger_story_id: string | null
          empathy_ledger_transcript_id: string | null
          excerpt: string | null
          featured_image_caption: string | null
          featured_image_url: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          reading_time_minutes: number | null
          share_count: number | null
          slug: string
          status: string | null
          synced_from_empathy_ledger: boolean | null
          tags: string[] | null
          title: string
          updated_at: string | null
          video_url: string | null
          view_count: number | null
        }
        Insert: {
          audio_url?: string | null
          author_id?: string | null
          categories?: string[] | null
          co_authors?: string[] | null
          content: string
          created_at?: string | null
          cultural_sensitivity_flag?: boolean | null
          empathy_ledger_story_id?: string | null
          empathy_ledger_transcript_id?: string | null
          excerpt?: string | null
          featured_image_caption?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time_minutes?: number | null
          share_count?: number | null
          slug: string
          status?: string | null
          synced_from_empathy_ledger?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          video_url?: string | null
          view_count?: number | null
        }
        Update: {
          audio_url?: string | null
          author_id?: string | null
          categories?: string[] | null
          co_authors?: string[] | null
          content?: string
          created_at?: string | null
          cultural_sensitivity_flag?: boolean | null
          empathy_ledger_story_id?: string | null
          empathy_ledger_transcript_id?: string | null
          excerpt?: string | null
          featured_image_caption?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time_minutes?: number | null
          share_count?: number | null
          slug?: string
          status?: string | null
          synced_from_empathy_ledger?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts_profiles: {
        Row: {
          blog_post_id: string
          created_at: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          public_profile_id: string
          role: string | null
        }
        Insert: {
          blog_post_id: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          public_profile_id: string
          role?: string | null
        }
        Update: {
          blog_post_id?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          public_profile_id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_profiles_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_profiles_public_profile_id_fkey"
            columns: ["public_profile_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookkeeping_project_links: {
        Row: {
          allocation: number | null
          created_at: string | null
          id: number
          note: string | null
          project_id: string
          tenant_id: string
          transaction_id: number
        }
        Insert: {
          allocation?: number | null
          created_at?: string | null
          id?: number
          note?: string | null
          project_id: string
          tenant_id: string
          transaction_id: number
        }
        Update: {
          allocation?: number | null
          created_at?: string | null
          id?: number
          note?: string | null
          project_id?: string
          tenant_id?: string
          transaction_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookkeeping_project_links_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "bookkeeping_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      bookkeeping_receipts: {
        Row: {
          amount: number | null
          created_at: string | null
          currency: string | null
          id: number
          raw: Json | null
          receipt_date: string | null
          receipt_id: string | null
          status: string | null
          tenant_id: string
          url: string | null
          vendor: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          id?: number
          raw?: Json | null
          receipt_date?: string | null
          receipt_id?: string | null
          status?: string | null
          tenant_id: string
          url?: string | null
          vendor?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          id?: number
          raw?: Json | null
          receipt_date?: string | null
          receipt_id?: string | null
          status?: string | null
          tenant_id?: string
          url?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      bookkeeping_rules: {
        Row: {
          account_code: string | null
          category: string
          created_at: string | null
          id: number
          pattern: string
          priority: number | null
          tenant_id: string
        }
        Insert: {
          account_code?: string | null
          category: string
          created_at?: string | null
          id?: number
          pattern: string
          priority?: number | null
          tenant_id: string
        }
        Update: {
          account_code?: string | null
          category?: string
          created_at?: string | null
          id?: number
          pattern?: string
          priority?: number | null
          tenant_id?: string
        }
        Relationships: []
      }
      bookkeeping_sync_state: {
        Row: {
          last_page: number | null
          last_synced_at: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          last_page?: number | null
          last_synced_at?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          last_page?: number | null
          last_synced_at?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      bookkeeping_transactions: {
        Row: {
          account_code: string | null
          account_name: string | null
          amount: number
          category: string | null
          category_confidence: number | null
          contact_name: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          direction: string | null
          id: number
          raw: Json | null
          tenant_id: string
          txn_date: string
          updated_at: string | null
          xero_id: string | null
        }
        Insert: {
          account_code?: string | null
          account_name?: string | null
          amount: number
          category?: string | null
          category_confidence?: number | null
          contact_name?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          direction?: string | null
          id?: number
          raw?: Json | null
          tenant_id: string
          txn_date: string
          updated_at?: string | null
          xero_id?: string | null
        }
        Update: {
          account_code?: string | null
          account_name?: string | null
          amount?: number
          category?: string | null
          category_confidence?: number | null
          contact_name?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          direction?: string | null
          id?: number
          raw?: Json | null
          tenant_id?: string
          txn_date?: string
          updated_at?: string | null
          xero_id?: string | null
        }
        Relationships: []
      }
      brand_tests: {
        Row: {
          author_id: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          hypothesis: string | null
          id: string
          is_active: boolean | null
          name: string
          start_date: string | null
          target_audience: string | null
          test_type: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          hypothesis?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          start_date?: string | null
          target_audience?: string | null
          test_type?: string
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          hypothesis?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          start_date?: string | null
          target_audience?: string | null
          test_type?: string
        }
        Relationships: []
      }
      business_agent_queries: {
        Row: {
          actions: string[] | null
          confidence: number | null
          created_at: string | null
          id: string
          intent: Json | null
          query: string
          response: Json
          sources: string[] | null
          user_feedback: string | null
        }
        Insert: {
          actions?: string[] | null
          confidence?: number | null
          created_at?: string | null
          id?: string
          intent?: Json | null
          query: string
          response?: Json
          sources?: string[] | null
          user_feedback?: string | null
        }
        Update: {
          actions?: string[] | null
          confidence?: number | null
          created_at?: string | null
          id?: string
          intent?: Json | null
          query?: string
          response?: Json
          sources?: string[] | null
          user_feedback?: string | null
        }
        Relationships: []
      }
      business_alerts: {
        Row: {
          action_required: string | null
          alert_type: string
          created_at: string | null
          description: string
          due_date: string | null
          id: string
          metadata: Json | null
          priority: number | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          action_required?: string | null
          alert_type: string
          created_at?: string | null
          description: string
          due_date?: string | null
          id?: string
          metadata?: Json | null
          priority?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          action_required?: string | null
          alert_type?: string
          created_at?: string | null
          description?: string
          due_date?: string | null
          id?: string
          metadata?: Json | null
          priority?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ce_activities: {
        Row: {
          activity_type: string
          event_timestamp: string | null
          id: string
          message: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          activity_type: string
          event_timestamp?: string | null
          id?: string
          message: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          event_timestamp?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      ce_backups: {
        Row: {
          backup_timestamp: string | null
          checksum: string | null
          created_by: string | null
          data_types: string[] | null
          description: string | null
          id: string
          is_completed: boolean | null
          metadata: Json | null
          size_bytes: number | null
          version: string | null
        }
        Insert: {
          backup_timestamp?: string | null
          checksum?: string | null
          created_by?: string | null
          data_types?: string[] | null
          description?: string | null
          id: string
          is_completed?: boolean | null
          metadata?: Json | null
          size_bytes?: number | null
          version?: string | null
        }
        Update: {
          backup_timestamp?: string | null
          checksum?: string | null
          created_by?: string | null
          data_types?: string[] | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          metadata?: Json | null
          size_bytes?: number | null
          version?: string | null
        }
        Relationships: []
      }
      ce_brand_analyses: {
        Row: {
          analysis_date: string | null
          analyst_id: string | null
          authenticity_score: number | null
          brand_values_demonstrated: Json | null
          community_impact: number | null
          content_id: string | null
          emotional_resonance: number | null
          id: string
          overall_score: number | null
        }
        Insert: {
          analysis_date?: string | null
          analyst_id?: string | null
          authenticity_score?: number | null
          brand_values_demonstrated?: Json | null
          community_impact?: number | null
          content_id?: string | null
          emotional_resonance?: number | null
          id?: string
          overall_score?: number | null
        }
        Update: {
          analysis_date?: string | null
          analyst_id?: string | null
          authenticity_score?: number | null
          brand_values_demonstrated?: Json | null
          community_impact?: number | null
          content_id?: string | null
          emotional_resonance?: number | null
          id?: string
          overall_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ce_brand_analyses_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "ce_stories"
            referencedColumns: ["id"]
          },
        ]
      }
      ce_brand_tests: {
        Row: {
          author_id: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          hypothesis: string | null
          id: string
          is_active: boolean | null
          name: string
          start_date: string | null
          target_audience: string | null
          test_type: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          hypothesis?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          start_date?: string | null
          target_audience?: string | null
          test_type?: string
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          hypothesis?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          start_date?: string | null
          target_audience?: string | null
          test_type?: string
        }
        Relationships: []
      }
      ce_media_assets: {
        Row: {
          category: string | null
          file_path: string
          file_size: number | null
          filename: string
          id: string
          metadata: Json | null
          mime_type: string | null
          tags: string[] | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          category?: string | null
          file_path: string
          file_size?: number | null
          filename: string
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          tags?: string[] | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          category?: string | null
          file_path?: string
          file_size?: number | null
          filename?: string
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          tags?: string[] | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      ce_metrics: {
        Row: {
          brand_score: number | null
          brand_tests_active: number | null
          content_items: number | null
          created_at: string | null
          id: string
          last_updated: string | null
          stories_analyzed: number | null
          user_id: string | null
        }
        Insert: {
          brand_score?: number | null
          brand_tests_active?: number | null
          content_items?: number | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          stories_analyzed?: number | null
          user_id?: string | null
        }
        Update: {
          brand_score?: number | null
          brand_tests_active?: number | null
          content_items?: number | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          stories_analyzed?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      ce_saved_searches: {
        Row: {
          created_at: string | null
          filters: Json | null
          id: string
          last_used: string | null
          name: string
          query: string
          use_count: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          filters?: Json | null
          id: string
          last_used?: string | null
          name: string
          query: string
          use_count?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          filters?: Json | null
          id?: string
          last_used?: string | null
          name?: string
          query?: string
          use_count?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      ce_search_history: {
        Row: {
          filters: Json | null
          id: string
          query: string
          results_count: number | null
          search_timestamp: string | null
          user_id: string | null
        }
        Insert: {
          filters?: Json | null
          id?: string
          query: string
          results_count?: number | null
          search_timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          filters?: Json | null
          id?: string
          query?: string
          results_count?: number | null
          search_timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ce_stories: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          date_recorded: string | null
          id: string
          impact_level: string | null
          is_published: boolean | null
          location: string | null
          participant_age: number | null
          participant_name: string
          summary: string | null
          tags: string[] | null
          themes: string[] | null
          title: string
          transcript_id: string | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          date_recorded?: string | null
          id?: string
          impact_level?: string | null
          is_published?: boolean | null
          location?: string | null
          participant_age?: number | null
          participant_name: string
          summary?: string | null
          tags?: string[] | null
          themes?: string[] | null
          title: string
          transcript_id?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          date_recorded?: string | null
          id?: string
          impact_level?: string | null
          is_published?: boolean | null
          location?: string | null
          participant_age?: number | null
          participant_name?: string
          summary?: string | null
          tags?: string[] | null
          themes?: string[] | null
          title?: string
          transcript_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ce_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          last_login: string | null
          name: string
          password_hash: string
          permissions: string[] | null
          updated_at: string | null
          user_role: string
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          name: string
          password_hash: string
          permissions?: string[] | null
          updated_at?: string | null
          user_role?: string
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          name?: string
          password_hash?: string
          permissions?: string[] | null
          updated_at?: string | null
          user_role?: string
          username?: string
        }
        Relationships: []
      }
      cms_content_blocks: {
        Row: {
          block_type: string
          category: string | null
          created_at: string | null
          default_content: Json | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          project_id: string | null
          schema: Json | null
          updated_at: string | null
        }
        Insert: {
          block_type: string
          category?: string | null
          created_at?: string | null
          default_content?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          project_id?: string | null
          schema?: Json | null
          updated_at?: string | null
        }
        Update: {
          block_type?: string
          category?: string | null
          created_at?: string | null
          default_content?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          project_id?: string | null
          schema?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_content_blocks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_impact_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "cms_content_blocks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_media: {
        Row: {
          alt_text: string | null
          caption: string | null
          category: string | null
          created_at: string | null
          file_name: string
          file_size: number | null
          id: string
          mime_type: string | null
          name: string
          project_id: string | null
          tags: string[] | null
          updated_at: string | null
          url: string
          usage: string | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          category?: string | null
          created_at?: string | null
          file_name: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          name: string
          project_id?: string | null
          tags?: string[] | null
          updated_at?: string | null
          url: string
          usage?: string | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          category?: string | null
          created_at?: string | null
          file_name?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          name?: string
          project_id?: string | null
          tags?: string[] | null
          updated_at?: string | null
          url?: string
          usage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_impact_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "cms_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_pages: {
        Row: {
          content: Json | null
          created_at: string | null
          description: string | null
          id: string
          meta_data: Json | null
          page_type: string | null
          project_id: string | null
          published_at: string | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          slug: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          meta_data?: Json | null
          page_type?: string | null
          project_id?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          meta_data?: Json | null
          page_type?: string | null
          project_id?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_pages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_impact_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "cms_pages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_media: {
        Row: {
          caption: string | null
          collection_id: string
          created_at: string | null
          featured_in_collection: boolean | null
          media_id: string
          sort_order: number | null
        }
        Insert: {
          caption?: string | null
          collection_id: string
          created_at?: string | null
          featured_in_collection?: boolean | null
          media_id: string
          sort_order?: number | null
        }
        Update: {
          caption?: string | null
          collection_id?: string
          created_at?: string | null
          featured_in_collection?: boolean | null
          media_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_media_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "media_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "public_media_with_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      community_connections: {
        Row: {
          connected_entity: string | null
          connection_strength:
            | Database["public"]["Enums"]["connection_strength_enum"]
            | null
          connection_type: Database["public"]["Enums"]["connection_type_enum"]
          created_at: string | null
          cultural_significance: number | null
          evidence_quote: string | null
          geographic_scope: string | null
          id: string
          influence_potential: number | null
          interaction_frequency: string | null
          knowledge_exchange_value: number | null
          mutual_benefit_description: string | null
          relationship_duration: string | null
          relationship_nature: string | null
          resource_access_value: number | null
          storyteller_id: string | null
          traditional_protocol_involved: boolean | null
          updated_at: string | null
        }
        Insert: {
          connected_entity?: string | null
          connection_strength?:
            | Database["public"]["Enums"]["connection_strength_enum"]
            | null
          connection_type: Database["public"]["Enums"]["connection_type_enum"]
          created_at?: string | null
          cultural_significance?: number | null
          evidence_quote?: string | null
          geographic_scope?: string | null
          id?: string
          influence_potential?: number | null
          interaction_frequency?: string | null
          knowledge_exchange_value?: number | null
          mutual_benefit_description?: string | null
          relationship_duration?: string | null
          relationship_nature?: string | null
          resource_access_value?: number | null
          storyteller_id?: string | null
          traditional_protocol_involved?: boolean | null
          updated_at?: string | null
        }
        Update: {
          connected_entity?: string | null
          connection_strength?:
            | Database["public"]["Enums"]["connection_strength_enum"]
            | null
          connection_type?: Database["public"]["Enums"]["connection_type_enum"]
          created_at?: string | null
          cultural_significance?: number | null
          evidence_quote?: string | null
          geographic_scope?: string | null
          id?: string
          influence_potential?: number | null
          interaction_frequency?: string | null
          knowledge_exchange_value?: number | null
          mutual_benefit_description?: string | null
          relationship_duration?: string | null
          relationship_nature?: string | null
          resource_access_value?: number | null
          storyteller_id?: string | null
          traditional_protocol_involved?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_connections_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      community_events: {
        Row: {
          anonymized: boolean | null
          business_value: Json | null
          community_id: string | null
          consent_level: string | null
          conversion_funnel_stage: string | null
          created_at: string | null
          data_retention_policy: string | null
          device_data: Json | null
          engagement_score: number | null
          event_category: string
          event_metadata: Json | null
          event_name: string
          event_properties: Json | null
          event_timestamp: string | null
          event_type: string
          geographic_data: Json | null
          id: string
          ip_address: unknown
          outcome_id: string | null
          project_id: string | null
          referrer_data: Json | null
          session_id: string | null
          session_start_time: string | null
          story_id: string | null
          time_on_page: number | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          anonymized?: boolean | null
          business_value?: Json | null
          community_id?: string | null
          consent_level?: string | null
          conversion_funnel_stage?: string | null
          created_at?: string | null
          data_retention_policy?: string | null
          device_data?: Json | null
          engagement_score?: number | null
          event_category: string
          event_metadata?: Json | null
          event_name: string
          event_properties?: Json | null
          event_timestamp?: string | null
          event_type: string
          geographic_data?: Json | null
          id?: string
          ip_address?: unknown
          outcome_id?: string | null
          project_id?: string | null
          referrer_data?: Json | null
          session_id?: string | null
          session_start_time?: string | null
          story_id?: string | null
          time_on_page?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          anonymized?: boolean | null
          business_value?: Json | null
          community_id?: string | null
          consent_level?: string | null
          conversion_funnel_stage?: string | null
          created_at?: string | null
          data_retention_policy?: string | null
          device_data?: Json | null
          engagement_score?: number | null
          event_category?: string
          event_metadata?: Json | null
          event_name?: string
          event_properties?: Json | null
          event_timestamp?: string | null
          event_type?: string
          geographic_data?: Json | null
          id?: string
          ip_address?: unknown
          outcome_id?: string | null
          project_id?: string | null
          referrer_data?: Json | null
          session_id?: string | null
          session_start_time?: string | null
          story_id?: string | null
          time_on_page?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_events_outcome_id_fkey"
            columns: ["outcome_id"]
            isOneToOne: false
            referencedRelation: "project_outcomes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_impact_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "community_events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      community_health_metrics: {
        Row: {
          active_projects: number | null
          active_users_daily: number | null
          active_users_monthly: number | null
          active_users_weekly: number | null
          calculated_at: string | null
          calculation_method: string | null
          community_id: string | null
          community_interactions: number | null
          community_value_generated: number | null
          completed_projects: number | null
          content_quality_average: number | null
          created_at: string | null
          cross_community_collaborations: number | null
          cultural_knowledge_preserved: number | null
          data_completeness_score: number | null
          diversity_index: number | null
          id: string
          inclusion_score: number | null
          innovation_rate: number | null
          metric_date: string
          metric_period: string
          new_collaborations: number | null
          new_user_registrations: number | null
          outcomes_reported: number | null
          platform_reliability_score: number | null
          project_updates_posted: number | null
          stories_published: number | null
          sustainability_index: number | null
          total_beneficiaries: number | null
          user_retention_rate: number | null
          user_satisfaction_score: number | null
          verified_outcomes: number | null
        }
        Insert: {
          active_projects?: number | null
          active_users_daily?: number | null
          active_users_monthly?: number | null
          active_users_weekly?: number | null
          calculated_at?: string | null
          calculation_method?: string | null
          community_id?: string | null
          community_interactions?: number | null
          community_value_generated?: number | null
          completed_projects?: number | null
          content_quality_average?: number | null
          created_at?: string | null
          cross_community_collaborations?: number | null
          cultural_knowledge_preserved?: number | null
          data_completeness_score?: number | null
          diversity_index?: number | null
          id?: string
          inclusion_score?: number | null
          innovation_rate?: number | null
          metric_date: string
          metric_period: string
          new_collaborations?: number | null
          new_user_registrations?: number | null
          outcomes_reported?: number | null
          platform_reliability_score?: number | null
          project_updates_posted?: number | null
          stories_published?: number | null
          sustainability_index?: number | null
          total_beneficiaries?: number | null
          user_retention_rate?: number | null
          user_satisfaction_score?: number | null
          verified_outcomes?: number | null
        }
        Update: {
          active_projects?: number | null
          active_users_daily?: number | null
          active_users_monthly?: number | null
          active_users_weekly?: number | null
          calculated_at?: string | null
          calculation_method?: string | null
          community_id?: string | null
          community_interactions?: number | null
          community_value_generated?: number | null
          completed_projects?: number | null
          content_quality_average?: number | null
          created_at?: string | null
          cross_community_collaborations?: number | null
          cultural_knowledge_preserved?: number | null
          data_completeness_score?: number | null
          diversity_index?: number | null
          id?: string
          inclusion_score?: number | null
          innovation_rate?: number | null
          metric_date?: string
          metric_period?: string
          new_collaborations?: number | null
          new_user_registrations?: number | null
          outcomes_reported?: number | null
          platform_reliability_score?: number | null
          project_updates_posted?: number | null
          stories_published?: number | null
          sustainability_index?: number | null
          total_beneficiaries?: number | null
          user_retention_rate?: number | null
          user_satisfaction_score?: number | null
          verified_outcomes?: number | null
        }
        Relationships: []
      }
      community_inquiries: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          email: string
          follow_up_consent: boolean | null
          how_heard: string | null
          id: string
          inquiry_type: string
          location: string | null
          message: string
          name: string
          organization: string | null
          response_sent_at: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          email: string
          follow_up_consent?: boolean | null
          how_heard?: string | null
          id?: string
          inquiry_type: string
          location?: string | null
          message: string
          name: string
          organization?: string | null
          response_sent_at?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          email?: string
          follow_up_consent?: boolean | null
          how_heard?: string | null
          id?: string
          inquiry_type?: string
          location?: string | null
          message?: string
          name?: string
          organization?: string | null
          response_sent_at?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      community_programs: {
        Row: {
          approach: string
          community_connection_score: number | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          created_by: string | null
          description: string
          empathy_ledger_project_id: string | null
          founded_year: number | null
          id: string
          impact_summary: string
          indigenous_knowledge: boolean | null
          is_featured: boolean | null
          last_synced_at: string | null
          location: string
          name: string
          organization: string
          organization_id: string | null
          participants_served: number | null
          search_vector: unknown
          service_id: string | null
          state: string
          success_rate: number | null
          synced_from_empathy_ledger: boolean | null
          tags: string[] | null
          updated_at: string | null
          website: string | null
          years_operating: number | null
        }
        Insert: {
          approach: string
          community_connection_score?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          created_by?: string | null
          description: string
          empathy_ledger_project_id?: string | null
          founded_year?: number | null
          id?: string
          impact_summary: string
          indigenous_knowledge?: boolean | null
          is_featured?: boolean | null
          last_synced_at?: string | null
          location: string
          name: string
          organization: string
          organization_id?: string | null
          participants_served?: number | null
          search_vector?: unknown
          service_id?: string | null
          state: string
          success_rate?: number | null
          synced_from_empathy_ledger?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
          website?: string | null
          years_operating?: number | null
        }
        Update: {
          approach?: string
          community_connection_score?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string
          empathy_ledger_project_id?: string | null
          founded_year?: number | null
          id?: string
          impact_summary?: string
          indigenous_knowledge?: boolean | null
          is_featured?: boolean | null
          last_synced_at?: string | null
          location?: string
          name?: string
          organization?: string
          organization_id?: string | null
          participants_served?: number | null
          search_vector?: unknown
          service_id?: string | null
          state?: string
          success_rate?: number | null
          synced_from_empathy_ledger?: boolean | null
          tags?: string[] | null
          updated_at?: string | null
          website?: string | null
          years_operating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "community_programs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_programs_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_programs_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services_complete"
            referencedColumns: ["id"]
          },
        ]
      }
      community_programs_profiles: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          program_id: string | null
          public_profile_id: string | null
          role: string
          role_description: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          program_id?: string | null
          public_profile_id?: string | null
          role: string
          role_description?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          program_id?: string | null
          public_profile_id?: string | null
          role?: string
          role_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_programs_profiles_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "community_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_programs_profiles_public_profile_id_fkey"
            columns: ["public_profile_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_tracking: {
        Row: {
          compliance_type: string
          created_at: string | null
          details: Json | null
          due_date: string | null
          id: string
          next_actions: string[] | null
          status: string
          updated_at: string | null
        }
        Insert: {
          compliance_type: string
          created_at?: string | null
          details?: Json | null
          due_date?: string | null
          id?: string
          next_actions?: string[] | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          compliance_type?: string
          created_at?: string | null
          details?: Json | null
          due_date?: string | null
          id?: string
          next_actions?: string[] | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      consent_management: {
        Row: {
          ai_analysis_consent: boolean | null
          attribution_requirements: string | null
          benefit_sharing_preferences: Json | null
          community_consultation: boolean | null
          consent_date: string
          consent_granted: boolean
          consent_scope: Json
          consent_type: Database["public"]["Enums"]["consent_type_enum"]
          created_at: string | null
          elder_consultation: boolean | null
          expiry_date: string | null
          id: string
          ownership_assertion: string | null
          quote_extraction_consent: boolean | null
          renewal_required: boolean | null
          sharing_consent_level:
            | Database["public"]["Enums"]["sharing_consent_enum"]
            | null
          storyteller_id: string | null
          theme_analysis_consent: boolean | null
          traditional_protocols_followed: boolean | null
          updated_at: string | null
          withdrawal_instructions: string | null
        }
        Insert: {
          ai_analysis_consent?: boolean | null
          attribution_requirements?: string | null
          benefit_sharing_preferences?: Json | null
          community_consultation?: boolean | null
          consent_date: string
          consent_granted: boolean
          consent_scope: Json
          consent_type: Database["public"]["Enums"]["consent_type_enum"]
          created_at?: string | null
          elder_consultation?: boolean | null
          expiry_date?: string | null
          id?: string
          ownership_assertion?: string | null
          quote_extraction_consent?: boolean | null
          renewal_required?: boolean | null
          sharing_consent_level?:
            | Database["public"]["Enums"]["sharing_consent_enum"]
            | null
          storyteller_id?: string | null
          theme_analysis_consent?: boolean | null
          traditional_protocols_followed?: boolean | null
          updated_at?: string | null
          withdrawal_instructions?: string | null
        }
        Update: {
          ai_analysis_consent?: boolean | null
          attribution_requirements?: string | null
          benefit_sharing_preferences?: Json | null
          community_consultation?: boolean | null
          consent_date?: string
          consent_granted?: boolean
          consent_scope?: Json
          consent_type?: Database["public"]["Enums"]["consent_type_enum"]
          created_at?: string | null
          elder_consultation?: boolean | null
          expiry_date?: string | null
          id?: string
          ownership_assertion?: string | null
          quote_extraction_consent?: boolean | null
          renewal_required?: boolean | null
          sharing_consent_level?:
            | Database["public"]["Enums"]["sharing_consent_enum"]
            | null
          storyteller_id?: string | null
          theme_analysis_consent?: boolean | null
          traditional_protocols_followed?: boolean | null
          updated_at?: string | null
          withdrawal_instructions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consent_management_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      consent_records: {
        Row: {
          consent_context: string | null
          consent_given: boolean
          consent_level: string | null
          consent_method: string | null
          consent_type: string
          created_at: string | null
          cultural_notes: string | null
          cultural_protocols_followed: boolean | null
          expiry_date: string | null
          id: string
          legal_basis: string | null
          permissions: Json | null
          recorded_by: string | null
          restrictions: string[] | null
          status: string | null
          storyteller_id: string
          updated_at: string | null
          withdrawal_date: string | null
          withdrawal_reason: string | null
          witnessed_by: string | null
        }
        Insert: {
          consent_context?: string | null
          consent_given: boolean
          consent_level?: string | null
          consent_method?: string | null
          consent_type: string
          created_at?: string | null
          cultural_notes?: string | null
          cultural_protocols_followed?: boolean | null
          expiry_date?: string | null
          id?: string
          legal_basis?: string | null
          permissions?: Json | null
          recorded_by?: string | null
          restrictions?: string[] | null
          status?: string | null
          storyteller_id: string
          updated_at?: string | null
          withdrawal_date?: string | null
          withdrawal_reason?: string | null
          witnessed_by?: string | null
        }
        Update: {
          consent_context?: string | null
          consent_given?: boolean
          consent_level?: string | null
          consent_method?: string | null
          consent_type?: string
          created_at?: string | null
          cultural_notes?: string | null
          cultural_protocols_followed?: boolean | null
          expiry_date?: string | null
          id?: string
          legal_basis?: string | null
          permissions?: Json | null
          recorded_by?: string | null
          restrictions?: string[] | null
          status?: string | null
          storyteller_id?: string
          updated_at?: string | null
          withdrawal_date?: string | null
          withdrawal_reason?: string | null
          witnessed_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consent_records_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_records_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_records_witnessed_by_fkey"
            columns: ["witnessed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_cadence_metrics: {
        Row: {
          active_sources: string[] | null
          contact_id: string
          days_since_last: number | null
          last_interaction: string | null
          total_touchpoints: number | null
          touchpoints_last_30: number | null
          touchpoints_last_7: number | null
          touchpoints_last_90: number | null
          updated_at: string | null
        }
        Insert: {
          active_sources?: string[] | null
          contact_id: string
          days_since_last?: number | null
          last_interaction?: string | null
          total_touchpoints?: number | null
          touchpoints_last_30?: number | null
          touchpoints_last_7?: number | null
          touchpoints_last_90?: number | null
          updated_at?: string | null
        }
        Update: {
          active_sources?: string[] | null
          contact_id?: string
          days_since_last?: number | null
          last_interaction?: string | null
          total_touchpoints?: number | null
          touchpoints_last_30?: number | null
          touchpoints_last_7?: number | null
          touchpoints_last_90?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_edges: {
        Row: {
          contact_a_id: number
          contact_b_id: number
          created_at: string
          id: number
          relationship_type: string
          strength: number
          updated_at: string
        }
        Insert: {
          contact_a_id: number
          contact_b_id: number
          created_at?: string
          id?: number
          relationship_type: string
          strength?: number
          updated_at?: string
        }
        Update: {
          contact_a_id?: number
          contact_b_id?: number
          created_at?: string
          id?: number
          relationship_type?: string
          strength?: number
          updated_at?: string
        }
        Relationships: []
      }
      contact_enrichments: {
        Row: {
          collaboration_potential: number | null
          contact_id: string
          created_at: string | null
          email_suggestions: string[] | null
          enrichment: Json | null
          id: string
          mode: string | null
          outreach_strategy: Json | null
          project_alignment: string[] | null
          reasoning: string | null
          risk_factors: string[] | null
          value_proposition: string | null
        }
        Insert: {
          collaboration_potential?: number | null
          contact_id: string
          created_at?: string | null
          email_suggestions?: string[] | null
          enrichment?: Json | null
          id?: string
          mode?: string | null
          outreach_strategy?: Json | null
          project_alignment?: string[] | null
          reasoning?: string | null
          risk_factors?: string[] | null
          value_proposition?: string | null
        }
        Update: {
          collaboration_potential?: number | null
          contact_id?: string
          created_at?: string | null
          email_suggestions?: string[] | null
          enrichment?: Json | null
          id?: string
          mode?: string | null
          outreach_strategy?: Json | null
          project_alignment?: string[] | null
          reasoning?: string | null
          risk_factors?: string[] | null
          value_proposition?: string | null
        }
        Relationships: []
      }
      contact_intelligence: {
        Row: {
          collaboration_score: number | null
          contact_id: string
          created_at: string | null
          id: string
          influence_score: number | null
          intelligence: Json | null
          interaction_count: number | null
          last_interaction: string | null
          project_matches: number | null
          response_rate: number | null
          updated_at: string | null
        }
        Insert: {
          collaboration_score?: number | null
          contact_id: string
          created_at?: string | null
          id?: string
          influence_score?: number | null
          intelligence?: Json | null
          interaction_count?: number | null
          last_interaction?: string | null
          project_matches?: number | null
          response_rate?: number | null
          updated_at?: string | null
        }
        Update: {
          collaboration_score?: number | null
          contact_id?: string
          created_at?: string | null
          id?: string
          influence_score?: number | null
          intelligence?: Json | null
          interaction_count?: number | null
          last_interaction?: string | null
          project_matches?: number | null
          response_rate?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_intelligence_insights: {
        Row: {
          contact_id: string
          created_at: string
          current_company: string | null
          current_role: string | null
          enriched_at: string
          headline: string | null
          highlights: Json | null
          id: string
          last_post_published_at: string | null
          last_post_title: string | null
          last_post_url: string | null
          source: string
          updated_at: string
        }
        Insert: {
          contact_id: string
          created_at?: string
          current_company?: string | null
          current_role?: string | null
          enriched_at?: string
          headline?: string | null
          highlights?: Json | null
          id?: string
          last_post_published_at?: string | null
          last_post_title?: string | null
          last_post_url?: string | null
          source?: string
          updated_at?: string
        }
        Update: {
          contact_id?: string
          created_at?: string
          current_company?: string | null
          current_role?: string | null
          enriched_at?: string
          headline?: string | null
          highlights?: Json | null
          id?: string
          last_post_published_at?: string | null
          last_post_title?: string | null
          last_post_url?: string | null
          source?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_intelligence_scores: {
        Row: {
          accessibility_score: number | null
          alignment_score: number | null
          calculation_method: string | null
          composite_score: number | null
          confidence_level: number | null
          engagement_readiness: number | null
          id: string
          influence_score: number | null
          last_calculated: string | null
          person_id: string
          response_likelihood: number | null
          strategic_value_score: number | null
          timing_score: number | null
        }
        Insert: {
          accessibility_score?: number | null
          alignment_score?: number | null
          calculation_method?: string | null
          composite_score?: number | null
          confidence_level?: number | null
          engagement_readiness?: number | null
          id?: string
          influence_score?: number | null
          last_calculated?: string | null
          person_id: string
          response_likelihood?: number | null
          strategic_value_score?: number | null
          timing_score?: number | null
        }
        Update: {
          accessibility_score?: number | null
          alignment_score?: number | null
          calculation_method?: string | null
          composite_score?: number | null
          confidence_level?: number | null
          engagement_readiness?: number | null
          id?: string
          influence_score?: number | null
          last_calculated?: string | null
          person_id?: string
          response_likelihood?: number | null
          strategic_value_score?: number | null
          timing_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_intelligence_scores_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: true
            referencedRelation: "person_identity_map"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "contact_intelligence_scores_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: true
            referencedRelation: "vw_newsletter_segments"
            referencedColumns: ["person_id"]
          },
        ]
      }
      contact_interactions: {
        Row: {
          contact_id: string
          created_at: string | null
          description: string | null
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: string
          interaction_date: string | null
          interaction_type: string
          metadata: Json | null
          outcome: string | null
          sentiment: string | null
          subject: string | null
        }
        Insert: {
          contact_id: string
          created_at?: string | null
          description?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          interaction_date?: string | null
          interaction_type: string
          metadata?: Json | null
          outcome?: string | null
          sentiment?: string | null
          subject?: string | null
        }
        Update: {
          contact_id?: string
          created_at?: string | null
          description?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          interaction_date?: string | null
          interaction_type?: string
          metadata?: Json | null
          outcome?: string | null
          sentiment?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      contact_invites: {
        Row: {
          contact_id: number
          created_at: string
          id: number
          invited_at: string
          notes: string | null
          opportunity_id: number
          response_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          contact_id: number
          created_at?: string
          id?: number
          invited_at?: string
          notes?: string | null
          opportunity_id: number
          response_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          contact_id?: number
          created_at?: string
          id?: number
          invited_at?: string
          notes?: string | null
          opportunity_id?: number
          response_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_invites_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_support_preferences: {
        Row: {
          contact_id: string
          created_at: string | null
          notes: string | null
          pinned_rank: number | null
          project_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          contact_id: string
          created_at?: string | null
          notes?: string | null
          pinned_rank?: number | null
          project_id: string
          status: string
          updated_at?: string | null
        }
        Update: {
          contact_id?: string
          created_at?: string | null
          notes?: string | null
          pinned_rank?: number | null
          project_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_support_recommendations: {
        Row: {
          contact_id: string
          created_at: string | null
          last_generated: string | null
          pinned_count: number | null
          recommendations: Json | null
          total_recommendations: number | null
          updated_at: string | null
        }
        Insert: {
          contact_id: string
          created_at?: string | null
          last_generated?: string | null
          pinned_count?: number | null
          recommendations?: Json | null
          total_recommendations?: number | null
          updated_at?: string | null
        }
        Update: {
          contact_id?: string
          created_at?: string | null
          last_generated?: string | null
          pinned_count?: number | null
          recommendations?: Json | null
          total_recommendations?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      content_link_suggestions: {
        Row: {
          applied_at: string | null
          auto_applied: boolean | null
          confidence: number | null
          created_at: string | null
          evidence: Json | null
          id: string
          reasoning: string
          reviewed_at: string | null
          reviewed_by: string | null
          source_id: string
          source_type: string
          status: string | null
          suggested_role: string | null
          target_id: string
          target_type: string
          updated_at: string | null
        }
        Insert: {
          applied_at?: string | null
          auto_applied?: boolean | null
          confidence?: number | null
          created_at?: string | null
          evidence?: Json | null
          id?: string
          reasoning: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_id: string
          source_type: string
          status?: string | null
          suggested_role?: string | null
          target_id: string
          target_type: string
          updated_at?: string | null
        }
        Update: {
          applied_at?: string | null
          auto_applied?: boolean | null
          confidence?: number | null
          created_at?: string | null
          evidence?: Json | null
          id?: string
          reasoning?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_id?: string
          source_type?: string
          status?: string | null
          suggested_role?: string | null
          target_id?: string
          target_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_link_suggestions_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      data_quality_audit: {
        Row: {
          created_at: string | null
          id: string
          quality_check_type: string
          quality_score_after: number | null
          quality_score_before: number | null
          record_id: string
          table_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          quality_check_type?: string
          quality_score_after?: number | null
          quality_score_before?: number | null
          record_id: string
          table_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          quality_check_type?: string
          quality_score_after?: number | null
          quality_score_before?: number | null
          record_id?: string
          table_name?: string
        }
        Relationships: []
      }
      data_quality_metrics: {
        Row: {
          accuracy_score: number | null
          analysis_date: string
          analysis_run_id: string | null
          complete_records: number
          consistency_score: number | null
          created_at: string | null
          data_freshness_score: number | null
          duplicate_records: number
          field_completeness: Json | null
          id: string
          incomplete_records: number
          invalid_records: number
          quality_issues: Json | null
          quality_score: number | null
          quality_threshold_met: boolean | null
          table_name: string
          total_records: number
        }
        Insert: {
          accuracy_score?: number | null
          analysis_date: string
          analysis_run_id?: string | null
          complete_records?: number
          consistency_score?: number | null
          created_at?: string | null
          data_freshness_score?: number | null
          duplicate_records?: number
          field_completeness?: Json | null
          id?: string
          incomplete_records?: number
          invalid_records?: number
          quality_issues?: Json | null
          quality_score?: number | null
          quality_threshold_met?: boolean | null
          table_name: string
          total_records?: number
        }
        Update: {
          accuracy_score?: number | null
          analysis_date?: string
          analysis_run_id?: string | null
          complete_records?: number
          consistency_score?: number | null
          created_at?: string | null
          data_freshness_score?: number | null
          duplicate_records?: number
          field_completeness?: Json | null
          id?: string
          incomplete_records?: number
          invalid_records?: number
          quality_issues?: Json | null
          quality_score?: number | null
          quality_threshold_met?: boolean | null
          table_name?: string
          total_records?: number
        }
        Relationships: []
      }
      data_sources: {
        Row: {
          active: boolean | null
          api_endpoint: string | null
          base_url: string
          created_at: string | null
          discovery_patterns: Json | null
          id: string
          last_error_message: string | null
          last_successful_scrape: string | null
          max_concurrent_requests: number | null
          name: string
          rate_limit_ms: number | null
          reliability_score: number | null
          respect_robots_txt: boolean | null
          scraping_config: Json
          type: string
          update_frequency: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          api_endpoint?: string | null
          base_url: string
          created_at?: string | null
          discovery_patterns?: Json | null
          id?: string
          last_error_message?: string | null
          last_successful_scrape?: string | null
          max_concurrent_requests?: number | null
          name: string
          rate_limit_ms?: number | null
          reliability_score?: number | null
          respect_robots_txt?: boolean | null
          scraping_config?: Json
          type: string
          update_frequency?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          api_endpoint?: string | null
          base_url?: string
          created_at?: string | null
          discovery_patterns?: Json | null
          id?: string
          last_error_message?: string | null
          last_successful_scrape?: string | null
          max_concurrent_requests?: number | null
          name?: string
          rate_limit_ms?: number | null
          reliability_score?: number | null
          respect_robots_txt?: boolean | null
          scraping_config?: Json
          type?: string
          update_frequency?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      decision_outcomes: {
        Row: {
          actual_impact: number | null
          decision_id: string
          id: string
          lessons_learned: string | null
          outcome_rating: number
          recorded_at: string
          success_metrics: Json | null
        }
        Insert: {
          actual_impact?: number | null
          decision_id: string
          id?: string
          lessons_learned?: string | null
          outcome_rating: number
          recorded_at?: string
          success_metrics?: Json | null
        }
        Update: {
          actual_impact?: number | null
          decision_id?: string
          id?: string
          lessons_learned?: string | null
          outcome_rating?: number
          recorded_at?: string
          success_metrics?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "decision_outcomes_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "decisions"
            referencedColumns: ["id"]
          },
        ]
      }
      decisions: {
        Row: {
          ai_recommendation: string | null
          category: string
          confidence_score: number | null
          context: Json | null
          created_at: string
          data_sources: string[] | null
          decision_made: string | null
          description: string
          due_date: string | null
          financial_impact: number | null
          id: string
          lessons_learned: string | null
          outcome_rating: number | null
          priority: string
          related_decisions: string[] | null
          skill_pods_consulted: string[] | null
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          ai_recommendation?: string | null
          category?: string
          confidence_score?: number | null
          context?: Json | null
          created_at?: string
          data_sources?: string[] | null
          decision_made?: string | null
          description: string
          due_date?: string | null
          financial_impact?: number | null
          id?: string
          lessons_learned?: string | null
          outcome_rating?: number | null
          priority?: string
          related_decisions?: string[] | null
          skill_pods_consulted?: string[] | null
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          ai_recommendation?: string | null
          category?: string
          confidence_score?: number | null
          context?: Json | null
          created_at?: string
          data_sources?: string[] | null
          decision_made?: string | null
          description?: string
          due_date?: string | null
          financial_impact?: number | null
          id?: string
          lessons_learned?: string | null
          outcome_rating?: number | null
          priority?: string
          related_decisions?: string[] | null
          skill_pods_consulted?: string[] | null
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      fellows: {
        Row: {
          additional_data: Json | null
          areas_of_expertise: string[] | null
          bio: string | null
          city: string | null
          cohort_year: number | null
          country: string | null
          created_at: string | null
          email: string | null
          fellow_status: string | null
          fellowship_goals: Json | null
          full_name: string
          id: number
          impact_areas: string[] | null
          linkedin_url: string | null
          organization: string | null
          role_title: string | null
          state: string | null
          website_url: string | null
        }
        Insert: {
          additional_data?: Json | null
          areas_of_expertise?: string[] | null
          bio?: string | null
          city?: string | null
          cohort_year?: number | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          fellow_status?: string | null
          fellowship_goals?: Json | null
          full_name: string
          id?: number
          impact_areas?: string[] | null
          linkedin_url?: string | null
          organization?: string | null
          role_title?: string | null
          state?: string | null
          website_url?: string | null
        }
        Update: {
          additional_data?: Json | null
          areas_of_expertise?: string[] | null
          bio?: string | null
          city?: string | null
          cohort_year?: number | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          fellow_status?: string | null
          fellowship_goals?: Json | null
          full_name?: string
          id?: number
          impact_areas?: string[] | null
          linkedin_url?: string | null
          organization?: string | null
          role_title?: string | null
          state?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      financial_project_summaries: {
        Row: {
          concentration_risk: boolean | null
          last_updated: string | null
          notion_project_id: string | null
          project_id: string
          project_name: string | null
          runway_days: number | null
          top_funders: Json | null
          total_actual: number | null
          total_potential: number | null
        }
        Insert: {
          concentration_risk?: boolean | null
          last_updated?: string | null
          notion_project_id?: string | null
          project_id: string
          project_name?: string | null
          runway_days?: number | null
          top_funders?: Json | null
          total_actual?: number | null
          total_potential?: number | null
        }
        Update: {
          concentration_risk?: boolean | null
          last_updated?: string | null
          notion_project_id?: string | null
          project_id?: string
          project_name?: string | null
          runway_days?: number | null
          top_funders?: Json | null
          total_actual?: number | null
          total_potential?: number | null
        }
        Relationships: []
      }
      financial_summary: {
        Row: {
          community_percentage: number
          community_share: number
          created_at: string
          expenses: number
          id: string
          income: number
          net_available_for_communities: number
          net_income: number
          operating_expenses: number
          reported_at: string
          total_revenue: number
          transaction_count: number
        }
        Insert: {
          community_percentage?: number
          community_share?: number
          created_at?: string
          expenses?: number
          id?: string
          income?: number
          net_available_for_communities?: number
          net_income?: number
          operating_expenses?: number
          reported_at?: string
          total_revenue?: number
          transaction_count?: number
        }
        Update: {
          community_percentage?: number
          community_share?: number
          created_at?: string
          expenses?: number
          id?: string
          income?: number
          net_available_for_communities?: number
          net_income?: number
          operating_expenses?: number
          reported_at?: string
          total_revenue?: number
          transaction_count?: number
        }
        Relationships: []
      }
      gmail_contacts: {
        Row: {
          created_at: string | null
          discovered_at: string | null
          domain: string | null
          email: string
          id: string
          last_interaction: string | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          discovered_at?: string | null
          domain?: string | null
          email: string
          id?: string
          last_interaction?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          discovered_at?: string | null
          domain?: string | null
          email?: string
          id?: string
          last_interaction?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gmail_messages: {
        Row: {
          attachment_count: number | null
          attachment_names: string[] | null
          attachment_total_size: number | null
          bcc_emails: string[] | null
          body_html: string | null
          body_text: string | null
          cc_emails: string[] | null
          created_at: string | null
          from_email: string | null
          from_name: string | null
          gmail_id: string
          has_attachments: boolean | null
          id: string
          importance: string | null
          is_archived: boolean | null
          is_read: boolean | null
          is_spam: boolean | null
          is_starred: boolean | null
          is_trashed: boolean | null
          keywords: string[] | null
          labels: string[] | null
          received_date: string | null
          sent_date: string | null
          snippet: string | null
          subject: string | null
          synced_at: string | null
          thread_id: string
          to_emails: string[] | null
          updated_at: string | null
          user_email: string
        }
        Insert: {
          attachment_count?: number | null
          attachment_names?: string[] | null
          attachment_total_size?: number | null
          bcc_emails?: string[] | null
          body_html?: string | null
          body_text?: string | null
          cc_emails?: string[] | null
          created_at?: string | null
          from_email?: string | null
          from_name?: string | null
          gmail_id: string
          has_attachments?: boolean | null
          id?: string
          importance?: string | null
          is_archived?: boolean | null
          is_read?: boolean | null
          is_spam?: boolean | null
          is_starred?: boolean | null
          is_trashed?: boolean | null
          keywords?: string[] | null
          labels?: string[] | null
          received_date?: string | null
          sent_date?: string | null
          snippet?: string | null
          subject?: string | null
          synced_at?: string | null
          thread_id: string
          to_emails?: string[] | null
          updated_at?: string | null
          user_email: string
        }
        Update: {
          attachment_count?: number | null
          attachment_names?: string[] | null
          attachment_total_size?: number | null
          bcc_emails?: string[] | null
          body_html?: string | null
          body_text?: string | null
          cc_emails?: string[] | null
          created_at?: string | null
          from_email?: string | null
          from_name?: string | null
          gmail_id?: string
          has_attachments?: boolean | null
          id?: string
          importance?: string | null
          is_archived?: boolean | null
          is_read?: boolean | null
          is_spam?: boolean | null
          is_starred?: boolean | null
          is_trashed?: boolean | null
          keywords?: string[] | null
          labels?: string[] | null
          received_date?: string | null
          sent_date?: string | null
          snippet?: string | null
          subject?: string | null
          synced_at?: string | null
          thread_id?: string
          to_emails?: string[] | null
          updated_at?: string | null
          user_email?: string
        }
        Relationships: []
      }
      gmail_sync_status: {
        Row: {
          created_at: string | null
          error_count: number | null
          error_message: string | null
          id: string
          last_error: string | null
          last_sync: string | null
          next_sync: string | null
          sync_duration_ms: number | null
          sync_status: string | null
          synced_messages: number | null
          total_messages: number | null
          updated_at: string | null
          user_email: string
        }
        Insert: {
          created_at?: string | null
          error_count?: number | null
          error_message?: string | null
          id?: string
          last_error?: string | null
          last_sync?: string | null
          next_sync?: string | null
          sync_duration_ms?: number | null
          sync_status?: string | null
          synced_messages?: number | null
          total_messages?: number | null
          updated_at?: string | null
          user_email: string
        }
        Update: {
          created_at?: string | null
          error_count?: number | null
          error_message?: string | null
          id?: string
          last_error?: string | null
          last_sync?: string | null
          next_sync?: string | null
          sync_duration_ms?: number | null
          sync_status?: string | null
          synced_messages?: number | null
          total_messages?: number | null
          updated_at?: string | null
          user_email?: string
        }
        Relationships: []
      }
      grant_opportunities: {
        Row: {
          amount_max: number | null
          amount_min: number | null
          application_status: string | null
          created_at: string | null
          deadline: string | null
          description: string | null
          id: string
          metadata: Json | null
          name: string
          relevance_score: number | null
          requirements: string | null
          source: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          amount_max?: number | null
          amount_min?: number | null
          application_status?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name: string
          relevance_score?: number | null
          requirements?: string | null
          source: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          amount_max?: number | null
          amount_min?: number | null
          application_status?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          relevance_score?: number | null
          requirements?: string | null
          source?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      impact_evidence: {
        Row: {
          behavior_changes_described: string | null
          created_at: string | null
          duration_of_impact: string | null
          evidence_strength:
            | Database["public"]["Enums"]["evidence_strength_enum"]
            | null
          external_validation: boolean | null
          id: string
          impact_scope: Database["public"]["Enums"]["impact_scope_enum"]
          impact_type: Database["public"]["Enums"]["impact_type_enum"]
          measurable_outcomes: Json | null
          outcome_description: string | null
          people_affected: number | null
          replication_potential: number | null
          scaling_opportunities: string | null
          story_evidence: string | null
          storyteller_id: string | null
          sustainability_indicators: Json | null
          testimonial_quotes: string[] | null
          updated_at: string | null
          verification_method: string | null
        }
        Insert: {
          behavior_changes_described?: string | null
          created_at?: string | null
          duration_of_impact?: string | null
          evidence_strength?:
            | Database["public"]["Enums"]["evidence_strength_enum"]
            | null
          external_validation?: boolean | null
          id?: string
          impact_scope: Database["public"]["Enums"]["impact_scope_enum"]
          impact_type: Database["public"]["Enums"]["impact_type_enum"]
          measurable_outcomes?: Json | null
          outcome_description?: string | null
          people_affected?: number | null
          replication_potential?: number | null
          scaling_opportunities?: string | null
          story_evidence?: string | null
          storyteller_id?: string | null
          sustainability_indicators?: Json | null
          testimonial_quotes?: string[] | null
          updated_at?: string | null
          verification_method?: string | null
        }
        Update: {
          behavior_changes_described?: string | null
          created_at?: string | null
          duration_of_impact?: string | null
          evidence_strength?:
            | Database["public"]["Enums"]["evidence_strength_enum"]
            | null
          external_validation?: boolean | null
          id?: string
          impact_scope?: Database["public"]["Enums"]["impact_scope_enum"]
          impact_type?: Database["public"]["Enums"]["impact_type_enum"]
          measurable_outcomes?: Json | null
          outcome_description?: string | null
          people_affected?: number | null
          replication_potential?: number | null
          scaling_opportunities?: string | null
          story_evidence?: string | null
          storyteller_id?: string | null
          sustainability_indicators?: Json | null
          testimonial_quotes?: string[] | null
          updated_at?: string | null
          verification_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "impact_evidence_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      impact_stories: {
        Row: {
          amplification_consent: boolean | null
          beneficiaries_mentioned: string[] | null
          created_at: string | null
          id: string
          impact_description: string
          outcome_quotes: string[] | null
          related_story: string | null
          scale_indicators: string[] | null
          story_source: string | null
          story_title: string
          storyteller_id: string | null
          timeframe_mentioned: string | null
          updated_at: string | null
          visibility_level: string | null
        }
        Insert: {
          amplification_consent?: boolean | null
          beneficiaries_mentioned?: string[] | null
          created_at?: string | null
          id?: string
          impact_description: string
          outcome_quotes?: string[] | null
          related_story?: string | null
          scale_indicators?: string[] | null
          story_source?: string | null
          story_title: string
          storyteller_id?: string | null
          timeframe_mentioned?: string | null
          updated_at?: string | null
          visibility_level?: string | null
        }
        Update: {
          amplification_consent?: boolean | null
          beneficiaries_mentioned?: string[] | null
          created_at?: string | null
          id?: string
          impact_description?: string
          outcome_quotes?: string[] | null
          related_story?: string | null
          scale_indicators?: string[] | null
          story_source?: string | null
          story_title?: string
          storyteller_id?: string | null
          timeframe_mentioned?: string | null
          updated_at?: string | null
          visibility_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "impact_stories_story_source_fkey"
            columns: ["story_source"]
            isOneToOne: false
            referencedRelation: "transcripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "impact_stories_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      intelligence_briefings: {
        Row: {
          created_by: string | null
          generated_at: string
          highlights: Json | null
          id: string
          metadata: Json | null
          metrics: Json | null
          summary: string
        }
        Insert: {
          created_by?: string | null
          generated_at?: string
          highlights?: Json | null
          id?: string
          metadata?: Json | null
          metrics?: Json | null
          summary: string
        }
        Update: {
          created_by?: string | null
          generated_at?: string
          highlights?: Json | null
          id?: string
          metadata?: Json | null
          metrics?: Json | null
          summary?: string
        }
        Relationships: []
      }
      intelligence_geo_alerts: {
        Row: {
          id: string
          metadata: Json | null
          projects: Json | null
          recommendation: string | null
          region: string
          severity: string | null
          stage: string | null
          triggered_at: string
        }
        Insert: {
          id?: string
          metadata?: Json | null
          projects?: Json | null
          recommendation?: string | null
          region: string
          severity?: string | null
          stage?: string | null
          triggered_at?: string
        }
        Update: {
          id?: string
          metadata?: Json | null
          projects?: Json | null
          recommendation?: string | null
          region?: string
          severity?: string | null
          stage?: string | null
          triggered_at?: string
        }
        Relationships: []
      }
      intelligence_refusals: {
        Row: {
          agent: string
          created_at: string
          id: string
          metadata: Json | null
          prompt: string
          reason: string
        }
        Insert: {
          agent: string
          created_at?: string
          id?: string
          metadata?: Json | null
          prompt: string
          reason: string
        }
        Update: {
          agent?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          prompt?: string
          reason?: string
        }
        Relationships: []
      }
      interactions: {
        Row: {
          contact_id: number
          created_at: string
          id: number
          interaction_date: string
          interaction_type: string
          notes: string | null
          quality_score: number | null
          updated_at: string
        }
        Insert: {
          contact_id: number
          created_at?: string
          id?: number
          interaction_date?: string
          interaction_type: string
          notes?: string | null
          quality_score?: number | null
          updated_at?: string
        }
        Update: {
          contact_id?: number
          created_at?: string
          id?: number
          interaction_date?: string
          interaction_type?: string
          notes?: string | null
          quality_score?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      international_invitations: {
        Row: {
          created_at: string | null
          hosting_organization: string | null
          id: string
          invitation_date: string | null
          invitation_status: string | null
          invitee_email: string | null
          invitee_name: string
          invitee_role: string | null
          program_id: string | null
          proposed_dates: string | null
          updated_at: string | null
          visit_completed: boolean | null
          visit_purpose: string | null
          visit_report: string | null
        }
        Insert: {
          created_at?: string | null
          hosting_organization?: string | null
          id?: string
          invitation_date?: string | null
          invitation_status?: string | null
          invitee_email?: string | null
          invitee_name: string
          invitee_role?: string | null
          program_id?: string | null
          proposed_dates?: string | null
          updated_at?: string | null
          visit_completed?: boolean | null
          visit_purpose?: string | null
          visit_report?: string | null
        }
        Update: {
          created_at?: string | null
          hosting_organization?: string | null
          id?: string
          invitation_date?: string | null
          invitation_status?: string | null
          invitee_email?: string | null
          invitee_name?: string
          invitee_role?: string | null
          program_id?: string | null
          proposed_dates?: string | null
          updated_at?: string | null
          visit_completed?: boolean | null
          visit_purpose?: string | null
          visit_report?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "international_invitations_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "international_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      international_programs: {
        Row: {
          approach_summary: string
          australian_adaptations: string[] | null
          city_location: string | null
          collaboration_opportunities: string | null
          contact_email: string | null
          cost_benefit_ratio: string | null
          country: string
          created_at: string | null
          created_by: string | null
          description: string
          documents: Json | null
          evidence_strength:
            | Database["public"]["Enums"]["evidence_strength"]
            | null
          featured_image_url: string | null
          id: string
          key_outcomes: Json | null
          name: string
          population_served: number | null
          program_type: Database["public"]["Enums"]["program_type"][]
          recidivism_comparison: string | null
          recidivism_rate: number | null
          region: Database["public"]["Enums"]["global_region"]
          related_program_ids: string[] | null
          related_story_ids: string[] | null
          research_citations: Json | null
          scale: string | null
          slug: string
          status: string | null
          target_population: string | null
          updated_at: string | null
          visit_date: string | null
          visit_notes: string | null
          visit_status: string | null
          website_url: string | null
          year_established: number | null
        }
        Insert: {
          approach_summary: string
          australian_adaptations?: string[] | null
          city_location?: string | null
          collaboration_opportunities?: string | null
          contact_email?: string | null
          cost_benefit_ratio?: string | null
          country: string
          created_at?: string | null
          created_by?: string | null
          description: string
          documents?: Json | null
          evidence_strength?:
            | Database["public"]["Enums"]["evidence_strength"]
            | null
          featured_image_url?: string | null
          id?: string
          key_outcomes?: Json | null
          name: string
          population_served?: number | null
          program_type?: Database["public"]["Enums"]["program_type"][]
          recidivism_comparison?: string | null
          recidivism_rate?: number | null
          region: Database["public"]["Enums"]["global_region"]
          related_program_ids?: string[] | null
          related_story_ids?: string[] | null
          research_citations?: Json | null
          scale?: string | null
          slug: string
          status?: string | null
          target_population?: string | null
          updated_at?: string | null
          visit_date?: string | null
          visit_notes?: string | null
          visit_status?: string | null
          website_url?: string | null
          year_established?: number | null
        }
        Update: {
          approach_summary?: string
          australian_adaptations?: string[] | null
          city_location?: string | null
          collaboration_opportunities?: string | null
          contact_email?: string | null
          cost_benefit_ratio?: string | null
          country?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          documents?: Json | null
          evidence_strength?:
            | Database["public"]["Enums"]["evidence_strength"]
            | null
          featured_image_url?: string | null
          id?: string
          key_outcomes?: Json | null
          name?: string
          population_served?: number | null
          program_type?: Database["public"]["Enums"]["program_type"][]
          recidivism_comparison?: string | null
          recidivism_rate?: number | null
          region?: Database["public"]["Enums"]["global_region"]
          related_program_ids?: string[] | null
          related_story_ids?: string[] | null
          research_citations?: Json | null
          scale?: string | null
          slug?: string
          status?: string | null
          target_population?: string | null
          updated_at?: string | null
          visit_date?: string | null
          visit_notes?: string | null
          visit_status?: string | null
          website_url?: string | null
          year_established?: number | null
        }
        Relationships: []
      }
      linkedin_contacts: {
        Row: {
          alignment_tags: string[] | null
          connected_date: string | null
          current_company: string | null
          current_position: string | null
          data_source: string | null
          email_address: string | null
          engagement_frequency: string | null
          first_name: string
          full_name: string | null
          gmail_contact_id: string | null
          id: string
          imported_at: string | null
          industries: string[] | null
          influence_level: string | null
          interaction_count: number | null
          last_interaction: string | null
          last_name: string
          linkedin_url: string | null
          location: string | null
          network_reach: number | null
          notion_person_id: string | null
          person_id: string | null
          raw_data: Json | null
          relationship_score: number | null
          skills_extracted: string[] | null
          strategic_value: string | null
          updated_at: string | null
        }
        Insert: {
          alignment_tags?: string[] | null
          connected_date?: string | null
          current_company?: string | null
          current_position?: string | null
          data_source?: string | null
          email_address?: string | null
          engagement_frequency?: string | null
          first_name: string
          full_name?: string | null
          gmail_contact_id?: string | null
          id?: string
          imported_at?: string | null
          industries?: string[] | null
          influence_level?: string | null
          interaction_count?: number | null
          last_interaction?: string | null
          last_name: string
          linkedin_url?: string | null
          location?: string | null
          network_reach?: number | null
          notion_person_id?: string | null
          person_id?: string | null
          raw_data?: Json | null
          relationship_score?: number | null
          skills_extracted?: string[] | null
          strategic_value?: string | null
          updated_at?: string | null
        }
        Update: {
          alignment_tags?: string[] | null
          connected_date?: string | null
          current_company?: string | null
          current_position?: string | null
          data_source?: string | null
          email_address?: string | null
          engagement_frequency?: string | null
          first_name?: string
          full_name?: string | null
          gmail_contact_id?: string | null
          id?: string
          imported_at?: string | null
          industries?: string[] | null
          influence_level?: string | null
          interaction_count?: number | null
          last_interaction?: string | null
          last_name?: string
          linkedin_url?: string | null
          location?: string | null
          network_reach?: number | null
          notion_person_id?: string | null
          person_id?: string | null
          raw_data?: Json | null
          relationship_score?: number | null
          skills_extracted?: string[] | null
          strategic_value?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_linkedin_contacts_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person_identity_map"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "fk_linkedin_contacts_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "vw_newsletter_segments"
            referencedColumns: ["person_id"]
          },
        ]
      }
      linkedin_imports: {
        Row: {
          hash: string
          id: number
          imported_at: string | null
          owner: string
          payload: Json
          type: string
        }
        Insert: {
          hash: string
          id?: number
          imported_at?: string | null
          owner: string
          payload: Json
          type: string
        }
        Update: {
          hash?: string
          id?: number
          imported_at?: string | null
          owner?: string
          payload?: Json
          type?: string
        }
        Relationships: []
      }
      linkedin_project_connections: {
        Row: {
          connection_type: string | null
          contact_id: string | null
          contact_status: string | null
          created_at: string | null
          id: string
          notion_project_id: string | null
          potential_role: string | null
          project_name: string
          recommended_action: string | null
          relevance_score: number | null
          updated_at: string | null
        }
        Insert: {
          connection_type?: string | null
          contact_id?: string | null
          contact_status?: string | null
          created_at?: string | null
          id?: string
          notion_project_id?: string | null
          potential_role?: string | null
          project_name: string
          recommended_action?: string | null
          relevance_score?: number | null
          updated_at?: string | null
        }
        Update: {
          connection_type?: string | null
          contact_id?: string | null
          contact_status?: string | null
          created_at?: string | null
          id?: string
          notion_project_id?: string | null
          potential_role?: string | null
          project_name?: string
          recommended_action?: string | null
          relevance_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "linkedin_project_connections_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "linkedin_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          city: string | null
          coordinates: Json | null
          country: string | null
          created_at: string | null
          id: string
          name: string
          state_province: string | null
        }
        Insert: {
          city?: string | null
          coordinates?: Json | null
          country?: string | null
          created_at?: string | null
          id?: string
          name: string
          state_province?: string | null
        }
        Update: {
          city?: string | null
          coordinates?: Json | null
          country?: string | null
          created_at?: string | null
          id?: string
          name?: string
          state_province?: string | null
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          category: string | null
          file_path: string
          file_size: number | null
          filename: string
          id: string
          metadata: Json | null
          mime_type: string | null
          tags: string[] | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          category?: string | null
          file_path: string
          file_size?: number | null
          filename: string
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          tags?: string[] | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          category?: string | null
          file_path?: string
          file_size?: number | null
          filename?: string
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          tags?: string[] | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      media_collections: {
        Row: {
          cover_image_id: string | null
          created_at: string | null
          description: string | null
          featured: boolean | null
          id: string
          name: string
          organization_id: string | null
          project_id: string | null
          public_visible: boolean | null
          settings: Json | null
          sort_order: number | null
          story_id: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          cover_image_id?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          name: string
          organization_id?: string | null
          project_id?: string | null
          public_visible?: boolean | null
          settings?: Json | null
          sort_order?: number | null
          story_id?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          cover_image_id?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          name?: string
          organization_id?: string | null
          project_id?: string | null
          public_visible?: boolean | null
          settings?: Json | null
          sort_order?: number | null
          story_id?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      media_files: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string | null
          file_hash: string | null
          file_size_bytes: number
          filename: string
          id: string
          media_type: string | null
          mime_type: string
          organization_id: string | null
          original_filename: string
          processing_status: string | null
          public_url: string | null
          storage_bucket: string
          storage_path: string
          story_id: string | null
          storyteller_id: string | null
          thumbnail_url: string | null
          updated_at: string | null
          uploaded_by: string | null
          visibility: string | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          file_hash?: string | null
          file_size_bytes: number
          filename: string
          id?: string
          media_type?: string | null
          mime_type: string
          organization_id?: string | null
          original_filename: string
          processing_status?: string | null
          public_url?: string | null
          storage_bucket: string
          storage_path: string
          story_id?: string | null
          storyteller_id?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
          visibility?: string | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          file_hash?: string | null
          file_size_bytes?: number
          filename?: string
          id?: string
          media_type?: string | null
          mime_type?: string
          organization_id?: string | null
          original_filename?: string
          processing_status?: string | null
          public_url?: string | null
          storage_bucket?: string
          storage_path?: string
          story_id?: string | null
          storyteller_id?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_files_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_files_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_files_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      media_items: {
        Row: {
          ai_confidence: number | null
          ai_processed: boolean | null
          ai_tags: string[] | null
          alt_text: string | null
          attribution_required: boolean | null
          capture_date: string | null
          community_approved: boolean | null
          compressed_url: string | null
          consent_verified: boolean | null
          created_at: string | null
          description: string | null
          dimensions: Json | null
          emotional_tone: string | null
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          impact_themes: string[] | null
          location_data: Json | null
          manual_tags: string[] | null
          organization_ids: string[] | null
          photographer: string | null
          processed: boolean | null
          project_ids: string[] | null
          story_ids: string[] | null
          storyteller_ids: string[] | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string | null
          usage_rights: string | null
        }
        Insert: {
          ai_confidence?: number | null
          ai_processed?: boolean | null
          ai_tags?: string[] | null
          alt_text?: string | null
          attribution_required?: boolean | null
          capture_date?: string | null
          community_approved?: boolean | null
          compressed_url?: string | null
          consent_verified?: boolean | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          emotional_tone?: string | null
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          impact_themes?: string[] | null
          location_data?: Json | null
          manual_tags?: string[] | null
          organization_ids?: string[] | null
          photographer?: string | null
          processed?: boolean | null
          project_ids?: string[] | null
          story_ids?: string[] | null
          storyteller_ids?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          usage_rights?: string | null
        }
        Update: {
          ai_confidence?: number | null
          ai_processed?: boolean | null
          ai_tags?: string[] | null
          alt_text?: string | null
          attribution_required?: boolean | null
          capture_date?: string | null
          community_approved?: boolean | null
          compressed_url?: string | null
          consent_verified?: boolean | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          emotional_tone?: string | null
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          impact_themes?: string[] | null
          location_data?: Json | null
          manual_tags?: string[] | null
          organization_ids?: string[] | null
          photographer?: string | null
          processed?: boolean | null
          project_ids?: string[] | null
          story_ids?: string[] | null
          storyteller_ids?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          usage_rights?: string | null
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          blurhash: string | null
          caption: string | null
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number
          folder: string | null
          height: number | null
          id: string
          last_used_at: string | null
          mime_type: string
          original_name: string | null
          tags: string[] | null
          updated_at: string | null
          uploaded_by: string | null
          used_in_posts: number | null
          versions: Json | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          blurhash?: string | null
          caption?: string | null
          created_at?: string | null
          file_name: string
          file_path: string
          file_size: number
          folder?: string | null
          height?: number | null
          id?: string
          last_used_at?: string | null
          mime_type: string
          original_name?: string | null
          tags?: string[] | null
          updated_at?: string | null
          uploaded_by?: string | null
          used_in_posts?: number | null
          versions?: Json | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          blurhash?: string | null
          caption?: string | null
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          folder?: string | null
          height?: number | null
          id?: string
          last_used_at?: string | null
          mime_type?: string
          original_name?: string | null
          tags?: string[] | null
          updated_at?: string | null
          uploaded_by?: string | null
          used_in_posts?: number | null
          versions?: Json | null
          width?: number | null
        }
        Relationships: []
      }
      media_processing_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          job_type: string
          media_id: string | null
          result_data: Json | null
          started_at: string | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          job_type: string
          media_id?: string | null
          result_data?: Json | null
          started_at?: string | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          job_type?: string
          media_id?: string | null
          result_data?: Json | null
          started_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_processing_jobs_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_processing_jobs_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "public_media_with_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      media_usage: {
        Row: {
          created_at: string | null
          id: string
          media_id: string | null
          usage_context: string | null
          used_in_id: string | null
          used_in_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          media_id?: string | null
          usage_context?: string | null
          used_in_id?: string | null
          used_in_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          media_id?: string | null
          usage_context?: string | null
          used_in_id?: string | null
          used_in_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_usage_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_usage_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "public_media_with_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string
          id: string
          portrait_id: string
          read: boolean
          word: string
        }
        Insert: {
          created_at?: string
          id?: string
          portrait_id: string
          read?: boolean
          word: string
        }
        Update: {
          created_at?: string
          id?: string
          portrait_id?: string
          read?: boolean
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_portrait_id_fkey"
            columns: ["portrait_id"]
            isOneToOne: false
            referencedRelation: "portraits"
            referencedColumns: ["id"]
          },
        ]
      }
      metrics: {
        Row: {
          brand_score: number | null
          brand_tests_active: number | null
          content_items: number | null
          created_at: string | null
          id: string
          last_updated: string | null
          stories_analyzed: number | null
          user_id: string | null
        }
        Insert: {
          brand_score?: number | null
          brand_tests_active?: number | null
          content_items?: number | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          stories_analyzed?: number | null
          user_id?: string | null
        }
        Update: {
          brand_score?: number | null
          brand_tests_active?: number | null
          content_items?: number | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          stories_analyzed?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          metadata: Json | null
          name: string | null
          status: string | null
          subscribed_at: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          metadata?: Json | null
          name?: string | null
          status?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          metadata?: Json | null
          name?: string | null
          status?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      normalized_documents: {
        Row: {
          content: string
          created_at: string | null
          id: string
          source_id: string | null
          source_type: string
          title: string | null
        }
        Insert: {
          content?: string
          created_at?: string | null
          id?: string
          source_id?: string | null
          source_type?: string
          title?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          source_id?: string | null
          source_type?: string
          title?: string | null
        }
        Relationships: []
      }
      normalized_stories: {
        Row: {
          content: string
          created_at: string | null
          id: string
          source_id: string | null
          title: string
        }
        Insert: {
          content?: string
          created_at?: string | null
          id?: string
          source_id?: string | null
          title?: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          source_id?: string | null
          title?: string
        }
        Relationships: []
      }
      normalized_storytellers: {
        Row: {
          bio: string | null
          created_at: string | null
          full_name: string
          id: string
          source_id: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          source_id?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          source_id?: string | null
        }
        Relationships: []
      }
      notion_opportunities: {
        Row: {
          amount: number | null
          close_date: string | null
          created_at: string | null
          data: Json
          id: string
          last_synced: string | null
          metadata: Json | null
          name: string | null
          notion_id: string | null
          probability: number | null
          stage: string | null
          sync_version: number | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          close_date?: string | null
          created_at?: string | null
          data?: Json
          id?: string
          last_synced?: string | null
          metadata?: Json | null
          name?: string | null
          notion_id?: string | null
          probability?: number | null
          stage?: string | null
          sync_version?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          close_date?: string | null
          created_at?: string | null
          data?: Json
          id?: string
          last_synced?: string | null
          metadata?: Json | null
          name?: string | null
          notion_id?: string | null
          probability?: number | null
          stage?: string | null
          sync_version?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notion_organization_people: {
        Row: {
          created_at: string | null
          id: string
          notion_organizations_id: string | null
          notion_people_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notion_organizations_id?: string | null
          notion_people_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notion_organizations_id?: string | null
          notion_people_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notion_organization_people_notion_organizations_id_fkey"
            columns: ["notion_organizations_id"]
            isOneToOne: false
            referencedRelation: "notion_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notion_organization_people_notion_people_id_fkey"
            columns: ["notion_people_id"]
            isOneToOne: false
            referencedRelation: "notion_people"
            referencedColumns: ["id"]
          },
        ]
      }
      notion_organizations: {
        Row: {
          created_at: string | null
          data: Json
          description: string | null
          id: string
          industry: string | null
          last_synced: string | null
          metadata: Json | null
          name: string | null
          notion_id: string | null
          sync_version: number | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json
          description?: string | null
          id?: string
          industry?: string | null
          last_synced?: string | null
          metadata?: Json | null
          name?: string | null
          notion_id?: string | null
          sync_version?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json
          description?: string | null
          id?: string
          industry?: string | null
          last_synced?: string | null
          metadata?: Json | null
          name?: string | null
          notion_id?: string | null
          sync_version?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notion_people: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          metadata: Json | null
          name: string | null
          notion_id: string | null
          organization: string | null
          role: string | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          metadata?: Json | null
          name?: string | null
          notion_id?: string | null
          organization?: string | null
          role?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          metadata?: Json | null
          name?: string | null
          notion_id?: string | null
          organization?: string | null
          role?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notion_project_organizations: {
        Row: {
          created_at: string | null
          id: string
          notion_organizations_id: string | null
          notion_project_id: string | null
          relationship: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notion_organizations_id?: string | null
          notion_project_id?: string | null
          relationship?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notion_organizations_id?: string | null
          notion_project_id?: string | null
          relationship?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notion_project_organizations_notion_organizations_id_fkey"
            columns: ["notion_organizations_id"]
            isOneToOne: false
            referencedRelation: "notion_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notion_project_organizations_notion_project_id_fkey"
            columns: ["notion_project_id"]
            isOneToOne: false
            referencedRelation: "notion_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      notion_project_people: {
        Row: {
          created_at: string | null
          id: string
          notion_people_id: string | null
          notion_project_id: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notion_people_id?: string | null
          notion_project_id?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notion_people_id?: string | null
          notion_project_id?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notion_project_people_notion_people_id_fkey"
            columns: ["notion_people_id"]
            isOneToOne: false
            referencedRelation: "notion_people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notion_project_people_notion_project_id_fkey"
            columns: ["notion_project_id"]
            isOneToOne: false
            referencedRelation: "notion_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      notion_projects: {
        Row: {
          actual_cost: number | null
          assignee: string | null
          budget: number | null
          created_at: string | null
          data: Json
          description: string | null
          end_date: string | null
          id: string
          last_synced: string | null
          metadata: Json | null
          name: string | null
          notion_id: string | null
          priority: string | null
          progress: number | null
          start_date: string | null
          status: string | null
          sync_version: number | null
          tags: string[] | null
          title: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          actual_cost?: number | null
          assignee?: string | null
          budget?: number | null
          created_at?: string | null
          data?: Json
          description?: string | null
          end_date?: string | null
          id?: string
          last_synced?: string | null
          metadata?: Json | null
          name?: string | null
          notion_id?: string | null
          priority?: string | null
          progress?: number | null
          start_date?: string | null
          status?: string | null
          sync_version?: number | null
          tags?: string[] | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_cost?: number | null
          assignee?: string | null
          budget?: number | null
          created_at?: string | null
          data?: Json
          description?: string | null
          end_date?: string | null
          id?: string
          last_synced?: string | null
          metadata?: Json | null
          name?: string | null
          notion_id?: string | null
          priority?: string | null
          progress?: number | null
          start_date?: string | null
          status?: string | null
          sync_version?: number | null
          tags?: string[] | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          alignment_score: number | null
          archived: boolean | null
          brief: string
          brief_embedding: string | null
          created_at: string
          deadline: string | null
          id: number
          region_tags: string[] | null
          role_tags: string[] | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          alignment_score?: number | null
          archived?: boolean | null
          brief: string
          brief_embedding?: string | null
          created_at?: string
          deadline?: string | null
          id?: number
          region_tags?: string[] | null
          role_tags?: string[] | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          alignment_score?: number | null
          archived?: boolean | null
          brief?: string
          brief_embedding?: string | null
          created_at?: string
          deadline?: string | null
          id?: number
          region_tags?: string[] | null
          role_tags?: string[] | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      organization_connections: {
        Row: {
          created_at: string | null
          id: string
          mentioned_in_story: string | null
          mentioned_in_transcript: string | null
          organization_id: string | null
          relationship_context: string | null
          relationship_type: string
          storyteller_id: string | null
          updated_at: string | null
          verification_source: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          mentioned_in_story?: string | null
          mentioned_in_transcript?: string | null
          organization_id?: string | null
          relationship_context?: string | null
          relationship_type: string
          storyteller_id?: string | null
          updated_at?: string | null
          verification_source?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          mentioned_in_story?: string | null
          mentioned_in_transcript?: string | null
          organization_id?: string | null
          relationship_context?: string | null
          relationship_type?: string
          storyteller_id?: string | null
          updated_at?: string | null
          verification_source?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_connections_mentioned_in_transcript_fkey"
            columns: ["mentioned_in_transcript"]
            isOneToOne: false
            referencedRelation: "transcripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_connections_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_connections_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_enrichment: {
        Row: {
          active: boolean | null
          confidence_score: number
          created_at: string | null
          data: Json
          enrichment_type: string
          id: string
          organization_id: string | null
          source_metadata: Json | null
          updated_at: string | null
          validated_at: string | null
          validated_by: string | null
          validation_notes: string | null
          validation_status: string | null
        }
        Insert: {
          active?: boolean | null
          confidence_score: number
          created_at?: string | null
          data: Json
          enrichment_type: string
          id?: string
          organization_id?: string | null
          source_metadata?: Json | null
          updated_at?: string | null
          validated_at?: string | null
          validated_by?: string | null
          validation_notes?: string | null
          validation_status?: string | null
        }
        Update: {
          active?: boolean | null
          confidence_score?: number
          created_at?: string | null
          data?: Json
          enrichment_type?: string
          id?: string
          organization_id?: string | null
          source_metadata?: Json | null
          updated_at?: string | null
          validated_at?: string | null
          validated_by?: string | null
          validation_notes?: string | null
          validation_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_enrichment_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string | null
          id: string
          invited_at: string | null
          joined_at: string | null
          last_active_at: string | null
          organization_id: string
          permissions: string[] | null
          role: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          invited_at?: string | null
          joined_at?: string | null
          last_active_at?: string | null
          organization_id: string
          permissions?: string[] | null
          role: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          invited_at?: string | null
          joined_at?: string | null
          last_active_at?: string | null
          organization_id?: string
          permissions?: string[] | null
          role?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_sync_log: {
        Row: {
          empathy_ledger_org_id: string | null
          error_message: string | null
          id: string
          organization_id: string | null
          sync_action: string
          sync_details: Json | null
          sync_status: string
          synced_at: string | null
        }
        Insert: {
          empathy_ledger_org_id?: string | null
          error_message?: string | null
          id?: string
          organization_id?: string | null
          sync_action: string
          sync_details?: Json | null
          sync_status: string
          synced_at?: string | null
        }
        Update: {
          empathy_ledger_org_id?: string | null
          error_message?: string | null
          id?: string
          organization_id?: string | null
          sync_action?: string
          sync_details?: Json | null
          sync_status?: string
          synced_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_sync_log_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          archived: boolean
          city: string | null
          collaboration_areas: string[] | null
          contact_email: string | null
          created_at: string | null
          description: string | null
          email: string | null
          empathy_ledger_org_id: string | null
          id: string
          is_active: boolean | null
          last_synced_at: string | null
          latitude: number | null
          location: string | null
          logo_url: string | null
          longitude: number | null
          name: string
          phone: string | null
          postcode: string | null
          settings: Json | null
          slug: string | null
          state: string | null
          street_address: string | null
          suburb: string | null
          synced_from_empathy_ledger: boolean | null
          tags: string[] | null
          type: string | null
          updated_at: string | null
          verification_status: string | null
          website: string | null
          website_url: string | null
        }
        Insert: {
          archived?: boolean
          city?: string | null
          collaboration_areas?: string[] | null
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          empathy_ledger_org_id?: string | null
          id?: string
          is_active?: boolean | null
          last_synced_at?: string | null
          latitude?: number | null
          location?: string | null
          logo_url?: string | null
          longitude?: number | null
          name: string
          phone?: string | null
          postcode?: string | null
          settings?: Json | null
          slug?: string | null
          state?: string | null
          street_address?: string | null
          suburb?: string | null
          synced_from_empathy_ledger?: boolean | null
          tags?: string[] | null
          type?: string | null
          updated_at?: string | null
          verification_status?: string | null
          website?: string | null
          website_url?: string | null
        }
        Update: {
          archived?: boolean
          city?: string | null
          collaboration_areas?: string[] | null
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          empathy_ledger_org_id?: string | null
          id?: string
          is_active?: boolean | null
          last_synced_at?: string | null
          latitude?: number | null
          location?: string | null
          logo_url?: string | null
          longitude?: number | null
          name?: string
          phone?: string | null
          postcode?: string | null
          settings?: Json | null
          slug?: string | null
          state?: string | null
          street_address?: string | null
          suburb?: string | null
          synced_from_empathy_ledger?: boolean | null
          tags?: string[] | null
          type?: string | null
          updated_at?: string | null
          verification_status?: string | null
          website?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      organizations_profiles: {
        Row: {
          created_at: string | null
          display_order: number | null
          end_date: string | null
          id: string
          is_current: boolean | null
          is_featured: boolean | null
          organization_id: string
          public_profile_id: string
          role: string | null
          role_description: string | null
          start_date: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          is_featured?: boolean | null
          organization_id: string
          public_profile_id: string
          role?: string | null
          role_description?: string | null
          start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          is_featured?: boolean | null
          organization_id?: string
          public_profile_id?: string
          role?: string | null
          role_description?: string | null
          start_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_profiles_public_profile_id_fkey"
            columns: ["public_profile_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      outreach_strategies: {
        Row: {
          best_topics: string[] | null
          contact_id: string
          created_at: string | null
          email_template: string | null
          follow_up_sequence: string[] | null
          id: string
          mutual_connections: Json | null
          recommended_approach: string | null
          strategy: Json
          success_probability: number | null
          timing: string | null
          updated_at: string | null
          value_proposition: string | null
        }
        Insert: {
          best_topics?: string[] | null
          contact_id: string
          created_at?: string | null
          email_template?: string | null
          follow_up_sequence?: string[] | null
          id?: string
          mutual_connections?: Json | null
          recommended_approach?: string | null
          strategy?: Json
          success_probability?: number | null
          timing?: string | null
          updated_at?: string | null
          value_proposition?: string | null
        }
        Update: {
          best_topics?: string[] | null
          contact_id?: string
          created_at?: string | null
          email_template?: string | null
          follow_up_sequence?: string[] | null
          id?: string
          mutual_connections?: Json | null
          recommended_approach?: string | null
          strategy?: Json
          success_probability?: number | null
          timing?: string | null
          updated_at?: string | null
          value_proposition?: string | null
        }
        Relationships: []
      }
      outreach_tasks: {
        Row: {
          ai_brief: Json | null
          completed_at: string | null
          contact_id: string | null
          contact_name: string | null
          created_at: string | null
          draft_message: string | null
          id: string
          message_metadata: Json | null
          owner: string | null
          priority: string | null
          project_id: string | null
          project_name: string | null
          recommended_channel: string | null
          response_notes: string | null
          response_status: string | null
          scheduled_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          ai_brief?: Json | null
          completed_at?: string | null
          contact_id?: string | null
          contact_name?: string | null
          created_at?: string | null
          draft_message?: string | null
          id?: string
          message_metadata?: Json | null
          owner?: string | null
          priority?: string | null
          project_id?: string | null
          project_name?: string | null
          recommended_channel?: string | null
          response_notes?: string | null
          response_status?: string | null
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_brief?: Json | null
          completed_at?: string | null
          contact_id?: string | null
          contact_name?: string | null
          created_at?: string | null
          draft_message?: string | null
          id?: string
          message_metadata?: Json | null
          owner?: string | null
          priority?: string | null
          project_id?: string | null
          project_name?: string | null
          recommended_channel?: string | null
          response_notes?: string | null
          response_status?: string | null
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          meta_description: string | null
          metadata: Json | null
          published: boolean | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          meta_description?: string | null
          metadata?: Json | null
          published?: boolean | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          meta_description?: string | null
          metadata?: Json | null
          published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          category: string | null
          collaboration_focus: string | null
          created_at: string | null
          description: string | null
          empathy_ledger_org_id: string | null
          featured: boolean | null
          id: string
          location: string | null
          logo_url: string | null
          name: string
          partnership_since: string | null
          public_visible: boolean | null
          relationship_strength: string | null
          type: string
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          category?: string | null
          collaboration_focus?: string | null
          created_at?: string | null
          description?: string | null
          empathy_ledger_org_id?: string | null
          featured?: boolean | null
          id?: string
          location?: string | null
          logo_url?: string | null
          name: string
          partnership_since?: string | null
          public_visible?: boolean | null
          relationship_strength?: string | null
          type: string
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          category?: string | null
          collaboration_focus?: string | null
          created_at?: string | null
          description?: string | null
          empathy_ledger_org_id?: string | null
          featured?: boolean | null
          id?: string
          location?: string | null
          logo_url?: string | null
          name?: string
          partnership_since?: string | null
          public_visible?: boolean | null
          relationship_strength?: string | null
          type?: string
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      person_identity_map: {
        Row: {
          alignment_tags: string[] | null
          collaboration_potential: number | null
          contact_data: Json | null
          created_at: string | null
          current_company: string | null
          current_position: string | null
          data_source: string | null
          email: string | null
          engagement_priority: string | null
          external_ids: Json | null
          full_name: string | null
          funding_capacity: string | null
          gmail_id: string | null
          government_influence: number | null
          indigenous_affiliation: boolean | null
          linkedin_contact_id: string | null
          notion_id: string | null
          notion_person_id: string | null
          person_id: string
          sector: string | null
          tags: string[] | null
          updated_at: string | null
          youth_justice_relevance_score: number | null
        }
        Insert: {
          alignment_tags?: string[] | null
          collaboration_potential?: number | null
          contact_data?: Json | null
          created_at?: string | null
          current_company?: string | null
          current_position?: string | null
          data_source?: string | null
          email?: string | null
          engagement_priority?: string | null
          external_ids?: Json | null
          full_name?: string | null
          funding_capacity?: string | null
          gmail_id?: string | null
          government_influence?: number | null
          indigenous_affiliation?: boolean | null
          linkedin_contact_id?: string | null
          notion_id?: string | null
          notion_person_id?: string | null
          person_id?: string
          sector?: string | null
          tags?: string[] | null
          updated_at?: string | null
          youth_justice_relevance_score?: number | null
        }
        Update: {
          alignment_tags?: string[] | null
          collaboration_potential?: number | null
          contact_data?: Json | null
          created_at?: string | null
          current_company?: string | null
          current_position?: string | null
          data_source?: string | null
          email?: string | null
          engagement_priority?: string | null
          external_ids?: Json | null
          full_name?: string | null
          funding_capacity?: string | null
          gmail_id?: string | null
          government_influence?: number | null
          indigenous_affiliation?: boolean | null
          linkedin_contact_id?: string | null
          notion_id?: string | null
          notion_person_id?: string | null
          person_id?: string
          sector?: string | null
          tags?: string[] | null
          updated_at?: string | null
          youth_justice_relevance_score?: number | null
        }
        Relationships: []
      }
      photo_album_photos: {
        Row: {
          added_at: string | null
          album_id: string
          id: string
          photo_id: string
          sort_order: number | null
        }
        Insert: {
          added_at?: string | null
          album_id: string
          id?: string
          photo_id: string
          sort_order?: number | null
        }
        Update: {
          added_at?: string | null
          album_id?: string
          id?: string
          photo_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "photo_album_photos_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "photo_albums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photo_album_photos_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
        ]
      }
      photo_album_shares: {
        Row: {
          access_count: number | null
          album_id: string
          created_at: string | null
          expires_at: string | null
          id: string
          last_accessed: string | null
          recipient_info: Json | null
          share_method: string
          share_url: string | null
        }
        Insert: {
          access_count?: number | null
          album_id: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          last_accessed?: string | null
          recipient_info?: Json | null
          share_method: string
          share_url?: string | null
        }
        Update: {
          access_count?: number | null
          album_id?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          last_accessed?: string | null
          recipient_info?: Json | null
          share_method?: string
          share_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photo_album_shares_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "photo_albums"
            referencedColumns: ["id"]
          },
        ]
      }
      photo_albums: {
        Row: {
          cover_photo_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_public: boolean | null
          is_shareable: boolean | null
          metadata: Json | null
          slug: string
          storyteller_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          cover_photo_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          is_shareable?: boolean | null
          metadata?: Json | null
          slug: string
          storyteller_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          cover_photo_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          is_shareable?: boolean | null
          metadata?: Json | null
          slug?: string
          storyteller_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photo_albums_cover_photo_id_fkey"
            columns: ["cover_photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photo_albums_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      photo_storyteller_tags: {
        Row: {
          confidence: number | null
          created_at: string | null
          detection_method: string | null
          face_coordinates: Json | null
          id: string
          photo_id: string
          storyteller_id: string
          tagged_by: string | null
          updated_at: string | null
        }
        Insert: {
          confidence?: number | null
          created_at?: string | null
          detection_method?: string | null
          face_coordinates?: Json | null
          id?: string
          photo_id: string
          storyteller_id: string
          tagged_by?: string | null
          updated_at?: string | null
        }
        Update: {
          confidence?: number | null
          created_at?: string | null
          detection_method?: string | null
          face_coordinates?: Json | null
          id?: string
          photo_id?: string
          storyteller_id?: string
          tagged_by?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photo_storyteller_tags_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photo_storyteller_tags_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      photos: {
        Row: {
          created_at: string | null
          dimensions: Json | null
          file_size: number
          filename: string
          id: string
          metadata: Json | null
          updated_at: string | null
          upload_date: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          dimensions?: Json | null
          file_size: number
          filename: string
          id?: string
          metadata?: Json | null
          updated_at?: string | null
          upload_date?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          dimensions?: Json | null
          file_size?: number
          filename?: string
          id?: string
          metadata?: Json | null
          updated_at?: string | null
          upload_date?: string | null
          url?: string
        }
        Relationships: []
      }
      platform_collection_media: {
        Row: {
          auto_added: boolean | null
          auto_score: number | null
          caption: string | null
          collection_id: string
          created_at: string | null
          featured_in_collection: boolean | null
          media_id: string
          sort_order: number | null
        }
        Insert: {
          auto_added?: boolean | null
          auto_score?: number | null
          caption?: string | null
          collection_id: string
          created_at?: string | null
          featured_in_collection?: boolean | null
          media_id: string
          sort_order?: number | null
        }
        Update: {
          auto_added?: boolean | null
          auto_score?: number | null
          caption?: string | null
          collection_id?: string
          created_at?: string | null
          featured_in_collection?: boolean | null
          media_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_collection_media_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "platform_media_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_collection_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "platform_media_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_collection_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "platform_public_media_with_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_media_collections: {
        Row: {
          auto_generated: boolean | null
          auto_refresh: boolean | null
          cover_image_id: string | null
          created_at: string | null
          description: string | null
          featured: boolean | null
          generation_criteria: Json | null
          id: string
          name: string
          platform_organization_id: string | null
          project_id: string | null
          public_visible: boolean | null
          settings: Json | null
          sort_order: number | null
          story_id: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          auto_generated?: boolean | null
          auto_refresh?: boolean | null
          cover_image_id?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          generation_criteria?: Json | null
          id?: string
          name: string
          platform_organization_id?: string | null
          project_id?: string | null
          public_visible?: boolean | null
          settings?: Json | null
          sort_order?: number | null
          story_id?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_generated?: boolean | null
          auto_refresh?: boolean | null
          cover_image_id?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          generation_criteria?: Json | null
          id?: string
          name?: string
          platform_organization_id?: string | null
          project_id?: string | null
          public_visible?: boolean | null
          settings?: Json | null
          sort_order?: number | null
          story_id?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_media_collections_cover_image_id_fkey"
            columns: ["cover_image_id"]
            isOneToOne: false
            referencedRelation: "platform_media_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_media_collections_cover_image_id_fkey"
            columns: ["cover_image_id"]
            isOneToOne: false
            referencedRelation: "platform_public_media_with_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_media_collections_platform_organization_id_fkey"
            columns: ["platform_organization_id"]
            isOneToOne: false
            referencedRelation: "platform_organization_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_media_collections_platform_organization_id_fkey"
            columns: ["platform_organization_id"]
            isOneToOne: false
            referencedRelation: "platform_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_media_items: {
        Row: {
          ai_confidence: number | null
          ai_processed: boolean | null
          ai_tags: string[] | null
          attribution_required: boolean | null
          bucket_name: string | null
          capture_date: string | null
          community_approved: boolean | null
          consent_verified: boolean | null
          content_category: string | null
          content_subcategory: string | null
          created_at: string | null
          description: string | null
          dimensions: Json | null
          emotional_tone: string | null
          empathy_ledger_media_id: string | null
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          impact_themes: string[] | null
          location_data: Json | null
          manual_tags: string[] | null
          mime_type: string | null
          original_filename: string | null
          photographer: string | null
          platform_organization_id: string | null
          processed: boolean | null
          project_ids: string[] | null
          storage_path: string
          story_ids: string[] | null
          storyteller_ids: string[] | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string | null
          usage_rights: string | null
        }
        Insert: {
          ai_confidence?: number | null
          ai_processed?: boolean | null
          ai_tags?: string[] | null
          attribution_required?: boolean | null
          bucket_name?: string | null
          capture_date?: string | null
          community_approved?: boolean | null
          consent_verified?: boolean | null
          content_category?: string | null
          content_subcategory?: string | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          emotional_tone?: string | null
          empathy_ledger_media_id?: string | null
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          impact_themes?: string[] | null
          location_data?: Json | null
          manual_tags?: string[] | null
          mime_type?: string | null
          original_filename?: string | null
          photographer?: string | null
          platform_organization_id?: string | null
          processed?: boolean | null
          project_ids?: string[] | null
          storage_path: string
          story_ids?: string[] | null
          storyteller_ids?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          usage_rights?: string | null
        }
        Update: {
          ai_confidence?: number | null
          ai_processed?: boolean | null
          ai_tags?: string[] | null
          attribution_required?: boolean | null
          bucket_name?: string | null
          capture_date?: string | null
          community_approved?: boolean | null
          consent_verified?: boolean | null
          content_category?: string | null
          content_subcategory?: string | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          emotional_tone?: string | null
          empathy_ledger_media_id?: string | null
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          impact_themes?: string[] | null
          location_data?: Json | null
          manual_tags?: string[] | null
          mime_type?: string | null
          original_filename?: string | null
          photographer?: string | null
          platform_organization_id?: string | null
          processed?: boolean | null
          project_ids?: string[] | null
          storage_path?: string
          story_ids?: string[] | null
          storyteller_ids?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          usage_rights?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_media_items_platform_organization_id_fkey"
            columns: ["platform_organization_id"]
            isOneToOne: false
            referencedRelation: "platform_organization_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_media_items_platform_organization_id_fkey"
            columns: ["platform_organization_id"]
            isOneToOne: false
            referencedRelation: "platform_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_media_processing_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          input_data: Json | null
          job_type: string
          media_id: string | null
          platform_organization_id: string | null
          processing_duration_ms: number | null
          result_data: Json | null
          started_at: string | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          input_data?: Json | null
          job_type: string
          media_id?: string | null
          platform_organization_id?: string | null
          processing_duration_ms?: number | null
          result_data?: Json | null
          started_at?: string | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          input_data?: Json | null
          job_type?: string
          media_id?: string | null
          platform_organization_id?: string | null
          processing_duration_ms?: number | null
          result_data?: Json | null
          started_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_media_processing_jobs_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "platform_media_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_media_processing_jobs_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "platform_public_media_with_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_media_processing_jobs_platform_organization_id_fkey"
            columns: ["platform_organization_id"]
            isOneToOne: false
            referencedRelation: "platform_organization_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_media_processing_jobs_platform_organization_id_fkey"
            columns: ["platform_organization_id"]
            isOneToOne: false
            referencedRelation: "platform_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_media_usage: {
        Row: {
          created_at: string | null
          download_count: number | null
          id: string
          media_id: string | null
          platform_organization_id: string | null
          share_count: number | null
          usage_context: string | null
          used_in_id: string | null
          used_in_type: string
          view_count: number | null
        }
        Insert: {
          created_at?: string | null
          download_count?: number | null
          id?: string
          media_id?: string | null
          platform_organization_id?: string | null
          share_count?: number | null
          usage_context?: string | null
          used_in_id?: string | null
          used_in_type: string
          view_count?: number | null
        }
        Update: {
          created_at?: string | null
          download_count?: number | null
          id?: string
          media_id?: string | null
          platform_organization_id?: string | null
          share_count?: number | null
          usage_context?: string | null
          used_in_id?: string | null
          used_in_type?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_media_usage_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "platform_media_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_media_usage_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "platform_public_media_with_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_media_usage_platform_organization_id_fkey"
            columns: ["platform_organization_id"]
            isOneToOne: false
            referencedRelation: "platform_organization_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_media_usage_platform_organization_id_fkey"
            columns: ["platform_organization_id"]
            isOneToOne: false
            referencedRelation: "platform_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_organizations: {
        Row: {
          api_calls_this_month: number | null
          billing_email: string | null
          created_at: string | null
          domain: string | null
          first_upload_at: string | null
          id: string
          last_activity_at: string | null
          name: string
          primary_contact_email: string | null
          slug: string
          storage_prefix: string
          storage_quota_gb: number | null
          storage_used_gb: number | null
          subscription_tier: string | null
          updated_at: string | null
        }
        Insert: {
          api_calls_this_month?: number | null
          billing_email?: string | null
          created_at?: string | null
          domain?: string | null
          first_upload_at?: string | null
          id?: string
          last_activity_at?: string | null
          name: string
          primary_contact_email?: string | null
          slug: string
          storage_prefix: string
          storage_quota_gb?: number | null
          storage_used_gb?: number | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Update: {
          api_calls_this_month?: number | null
          billing_email?: string | null
          created_at?: string | null
          domain?: string | null
          first_upload_at?: string | null
          id?: string
          last_activity_at?: string | null
          name?: string
          primary_contact_email?: string | null
          slug?: string
          storage_prefix?: string
          storage_quota_gb?: number | null
          storage_used_gb?: number | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      portraits: {
        Row: {
          access_code: string
          clicks: number
          created_at: string
          id: string
          image_url: string
          name: string | null
          offset_x: number
          offset_y: number
          rotation: number
          storyteller_id: string
          updated_at: string
          views: number
          visible: boolean
        }
        Insert: {
          access_code?: string
          clicks?: number
          created_at?: string
          id?: string
          image_url: string
          name?: string | null
          offset_x?: number
          offset_y?: number
          rotation?: number
          storyteller_id: string
          updated_at?: string
          views?: number
          visible?: boolean
        }
        Update: {
          access_code?: string
          clicks?: number
          created_at?: string
          id?: string
          image_url?: string
          name?: string | null
          offset_x?: number
          offset_y?: number
          rotation?: number
          storyteller_id?: string
          updated_at?: string
          views?: number
          visible?: boolean
        }
        Relationships: []
      }
      privacy_audit_log: {
        Row: {
          actor: string | null
          body: Json | null
          id: number
          ip: string | null
          method: string | null
          occurred_at: string | null
          path: string | null
          query: Json | null
          resource: string | null
          status: number | null
          tenant_id: string | null
        }
        Insert: {
          actor?: string | null
          body?: Json | null
          id?: number
          ip?: string | null
          method?: string | null
          occurred_at?: string | null
          path?: string | null
          query?: Json | null
          resource?: string | null
          status?: number | null
          tenant_id?: string | null
        }
        Update: {
          actor?: string | null
          body?: Json | null
          id?: number
          ip?: string | null
          method?: string | null
          occurred_at?: string | null
          path?: string | null
          query?: Json | null
          resource?: string | null
          status?: number | null
          tenant_id?: string | null
        }
        Relationships: []
      }
      privacy_dsr_requests: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: number
          notes: string | null
          status: string
          subject_identifier: string
          tenant_id: string | null
          type: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: number
          notes?: string | null
          status?: string
          subject_identifier: string
          tenant_id?: string | null
          type: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: number
          notes?: string | null
          status?: string
          subject_identifier?: string
          tenant_id?: string | null
          type?: string
        }
        Relationships: []
      }
      privacy_settings: {
        Row: {
          analytics_consent: boolean | null
          consent_expires_at: string | null
          consent_version: number | null
          data_sharing_consent: boolean | null
          email_processing_consent: boolean | null
          policy_ref: string | null
          retention_days: number | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          analytics_consent?: boolean | null
          consent_expires_at?: string | null
          consent_version?: number | null
          data_sharing_consent?: boolean | null
          email_processing_consent?: boolean | null
          policy_ref?: string | null
          retention_days?: number | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          analytics_consent?: boolean | null
          consent_expires_at?: string | null
          consent_version?: number | null
          data_sharing_consent?: boolean | null
          email_processing_consent?: boolean | null
          policy_ref?: string | null
          retention_days?: number | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      processing_jobs: {
        Row: {
          current_step: string | null
          estimated_completion: string | null
          progress_percentage: number | null
          status: string | null
          transcript_id: string | null
        }
        Insert: {
          current_step?: string | null
          estimated_completion?: string | null
          progress_percentage?: number | null
          status?: string | null
          transcript_id?: string | null
        }
        Update: {
          current_step?: string | null
          estimated_completion?: string | null
          progress_percentage?: number | null
          status?: string | null
          transcript_id?: string | null
        }
        Relationships: []
      }
      profile_appearances: {
        Row: {
          appears_on_id: string
          appears_on_type: string
          created_at: string | null
          empathy_ledger_profile_id: string
          featured: boolean | null
          id: string
          public_profile_id: string | null
          role: string | null
          story_excerpt: string | null
          updated_at: string | null
        }
        Insert: {
          appears_on_id: string
          appears_on_type: string
          created_at?: string | null
          empathy_ledger_profile_id: string
          featured?: boolean | null
          id?: string
          public_profile_id?: string | null
          role?: string | null
          story_excerpt?: string | null
          updated_at?: string | null
        }
        Update: {
          appears_on_id?: string
          appears_on_type?: string
          created_at?: string | null
          empathy_ledger_profile_id?: string
          featured?: boolean | null
          id?: string
          public_profile_id?: string | null
          role?: string | null
          story_excerpt?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_appearances_public_profile_id_fkey"
            columns: ["public_profile_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_sync_log: {
        Row: {
          empathy_ledger_profile_id: string | null
          error_message: string | null
          id: string
          public_profile_id: string | null
          sync_action: string
          sync_details: Json | null
          sync_status: string
          synced_at: string | null
        }
        Insert: {
          empathy_ledger_profile_id?: string | null
          error_message?: string | null
          id?: string
          public_profile_id?: string | null
          sync_action: string
          sync_details?: Json | null
          sync_status: string
          synced_at?: string | null
        }
        Update: {
          empathy_ledger_profile_id?: string | null
          error_message?: string | null
          id?: string
          public_profile_id?: string | null
          sync_action?: string
          sync_details?: Json | null
          sync_status?: string
          synced_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_sync_log_public_profile_id_fkey"
            columns: ["public_profile_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          email_verified: boolean | null
          full_name: string | null
          id: string
          language_preference: string | null
          notification_preferences: Json | null
          permissions: string[] | null
          primary_organization_id: string | null
          privacy_preferences: Json | null
          role: string | null
          terms_accepted_at: string | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          account_status?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          id: string
          language_preference?: string | null
          notification_preferences?: Json | null
          permissions?: string[] | null
          primary_organization_id?: string | null
          privacy_preferences?: Json | null
          role?: string | null
          terms_accepted_at?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          account_status?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          language_preference?: string | null
          notification_preferences?: Json | null
          permissions?: string[] | null
          primary_organization_id?: string | null
          privacy_preferences?: Json | null
          role?: string | null
          terms_accepted_at?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_primary_organization_id_fkey"
            columns: ["primary_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      program_outcomes: {
        Row: {
          comparison_value: string | null
          created_at: string | null
          id: string
          metric_name: string
          notes: string | null
          outcome_type: string
          program_id: string | null
          sample_size: number | null
          source: string | null
          source_year: number | null
          timeframe: string | null
          value: string
        }
        Insert: {
          comparison_value?: string | null
          created_at?: string | null
          id?: string
          metric_name: string
          notes?: string | null
          outcome_type: string
          program_id?: string | null
          sample_size?: number | null
          source?: string | null
          source_year?: number | null
          timeframe?: string | null
          value: string
        }
        Update: {
          comparison_value?: string | null
          created_at?: string | null
          id?: string
          metric_name?: string
          notes?: string | null
          outcome_type?: string
          program_id?: string | null
          sample_size?: number | null
          source?: string | null
          source_year?: number | null
          timeframe?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_outcomes_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "international_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      program_visits: {
        Row: {
          created_at: string | null
          documents: Json | null
          follow_up_actions: string | null
          id: string
          organizations: string[] | null
          outcomes: string | null
          participants: string[] | null
          photos: Json | null
          program_id: string | null
          purpose: string | null
          updated_at: string | null
          visit_date: string
          visit_type: string
        }
        Insert: {
          created_at?: string | null
          documents?: Json | null
          follow_up_actions?: string | null
          id?: string
          organizations?: string[] | null
          outcomes?: string | null
          participants?: string[] | null
          photos?: Json | null
          program_id?: string | null
          purpose?: string | null
          updated_at?: string | null
          visit_date: string
          visit_type: string
        }
        Update: {
          created_at?: string | null
          documents?: Json | null
          follow_up_actions?: string | null
          id?: string
          organizations?: string[] | null
          outcomes?: string | null
          participants?: string[] | null
          photos?: Json | null
          program_id?: string | null
          purpose?: string | null
          updated_at?: string | null
          visit_date?: string
          visit_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_visits_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "international_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      project_activity_summary: {
        Row: {
          calendar_meeting_count: number | null
          calendar_meeting_minutes: number | null
          gmail_recent_contacts: Json | null
          gmail_thread_count: number | null
          last_calendar_activity: string | null
          last_gmail_activity: string | null
          last_notation_activity: string | null
          last_synced: string | null
          notion_edit_count: number | null
          notion_edit_minutes: number | null
          project_id: string
        }
        Insert: {
          calendar_meeting_count?: number | null
          calendar_meeting_minutes?: number | null
          gmail_recent_contacts?: Json | null
          gmail_thread_count?: number | null
          last_calendar_activity?: string | null
          last_gmail_activity?: string | null
          last_notation_activity?: string | null
          last_synced?: string | null
          notion_edit_count?: number | null
          notion_edit_minutes?: number | null
          project_id: string
        }
        Update: {
          calendar_meeting_count?: number | null
          calendar_meeting_minutes?: number | null
          gmail_recent_contacts?: Json | null
          gmail_thread_count?: number | null
          last_calendar_activity?: string | null
          last_gmail_activity?: string | null
          last_notation_activity?: string | null
          last_synced?: string | null
          notion_edit_count?: number | null
          notion_edit_minutes?: number | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_activity_summary_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "project_impact_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_activity_summary_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_contact_alignment: {
        Row: {
          alignment_score: number
          confidence: number | null
          contact_context: Json | null
          contact_id: string
          created_at: string | null
          id: string
          metadata: Json | null
          outreach_recommendation: Json | null
          project_context: Json | null
          project_id: string
          shared_themes: string[] | null
          updated_at: string | null
        }
        Insert: {
          alignment_score?: number
          confidence?: number | null
          contact_context?: Json | null
          contact_id: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          outreach_recommendation?: Json | null
          project_context?: Json | null
          project_id: string
          shared_themes?: string[] | null
          updated_at?: string | null
        }
        Update: {
          alignment_score?: number
          confidence?: number | null
          contact_context?: Json | null
          contact_id?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          outreach_recommendation?: Json | null
          project_context?: Json | null
          project_id?: string
          shared_themes?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_contact_matches: {
        Row: {
          contact_id: string
          created_at: string | null
          estimated_value: number | null
          id: string
          match_score: number
          priority: string | null
          project_id: string
          reasoning: string | null
          suggested_role: string | null
          updated_at: string | null
        }
        Insert: {
          contact_id: string
          created_at?: string | null
          estimated_value?: number | null
          id?: string
          match_score?: number
          priority?: string | null
          project_id: string
          reasoning?: string | null
          suggested_role?: string | null
          updated_at?: string | null
        }
        Update: {
          contact_id?: string
          created_at?: string | null
          estimated_value?: number | null
          id?: string
          match_score?: number
          priority?: string | null
          project_id?: string
          reasoning?: string | null
          suggested_role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_contributions: {
        Row: {
          attribution_preferences: Json | null
          contribution_description: string | null
          contribution_end_date: string | null
          contribution_start_date: string | null
          contribution_type: string
          contribution_value: Json | null
          contributor_id: string | null
          contributor_type: string
          created_at: string | null
          expertise_areas: Json | null
          id: string
          impact_description: string | null
          linked_outcomes: Json | null
          project_id: string
          public_recognition: boolean | null
          skills_contributed: Json | null
        }
        Insert: {
          attribution_preferences?: Json | null
          contribution_description?: string | null
          contribution_end_date?: string | null
          contribution_start_date?: string | null
          contribution_type: string
          contribution_value?: Json | null
          contributor_id?: string | null
          contributor_type: string
          created_at?: string | null
          expertise_areas?: Json | null
          id?: string
          impact_description?: string | null
          linked_outcomes?: Json | null
          project_id: string
          public_recognition?: boolean | null
          skills_contributed?: Json | null
        }
        Update: {
          attribution_preferences?: Json | null
          contribution_description?: string | null
          contribution_end_date?: string | null
          contribution_start_date?: string | null
          contribution_type?: string
          contribution_value?: Json | null
          contributor_id?: string | null
          contributor_type?: string
          created_at?: string | null
          expertise_areas?: Json | null
          id?: string
          impact_description?: string | null
          linked_outcomes?: Json | null
          project_id?: string
          public_recognition?: boolean | null
          skills_contributed?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "project_contributions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_impact_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_contributions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_health_analysis: {
        Row: {
          analysis_date: string | null
          created_at: string | null
          health_score: number
          id: string
          metadata: Json | null
          opportunities: string[] | null
          project_id: string
          recommendations: string[] | null
          risks: string[] | null
        }
        Insert: {
          analysis_date?: string | null
          created_at?: string | null
          health_score: number
          id?: string
          metadata?: Json | null
          opportunities?: string[] | null
          project_id: string
          recommendations?: string[] | null
          risks?: string[] | null
        }
        Update: {
          analysis_date?: string | null
          created_at?: string | null
          health_score?: number
          id?: string
          metadata?: Json | null
          opportunities?: string[] | null
          project_id?: string
          recommendations?: string[] | null
          risks?: string[] | null
        }
        Relationships: []
      }
      project_health_history: {
        Row: {
          critical_factors: string[] | null
          health_score: number | null
          id: string
          notes: string | null
          notion_project_id: string | null
          project_id: string | null
          raw_payload: Json | null
          recorded_at: string | null
          status: string | null
          urgency_score: number | null
        }
        Insert: {
          critical_factors?: string[] | null
          health_score?: number | null
          id?: string
          notes?: string | null
          notion_project_id?: string | null
          project_id?: string | null
          raw_payload?: Json | null
          recorded_at?: string | null
          status?: string | null
          urgency_score?: number | null
        }
        Update: {
          critical_factors?: string[] | null
          health_score?: number | null
          id?: string
          notes?: string | null
          notion_project_id?: string | null
          project_id?: string | null
          raw_payload?: Json | null
          recorded_at?: string | null
          status?: string | null
          urgency_score?: number | null
        }
        Relationships: []
      }
      project_intelligence: {
        Row: {
          communities: string[] | null
          created_at: string | null
          embedding: number[] | null
          focus_areas: string[] | null
          id: string
          intelligence: Json
          last_synced_at: string | null
          notion_page_id: string | null
          partner_targets: string[] | null
          project_id: string
          project_name: string
          readiness_score: number | null
          required_support: string[] | null
          risk_level: string | null
          strategic_alignment: string[] | null
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          communities?: string[] | null
          created_at?: string | null
          embedding?: number[] | null
          focus_areas?: string[] | null
          id?: string
          intelligence?: Json
          last_synced_at?: string | null
          notion_page_id?: string | null
          partner_targets?: string[] | null
          project_id: string
          project_name: string
          readiness_score?: number | null
          required_support?: string[] | null
          risk_level?: string | null
          strategic_alignment?: string[] | null
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          communities?: string[] | null
          created_at?: string | null
          embedding?: number[] | null
          focus_areas?: string[] | null
          id?: string
          intelligence?: Json
          last_synced_at?: string | null
          notion_page_id?: string | null
          partner_targets?: string[] | null
          project_id?: string
          project_name?: string
          readiness_score?: number | null
          required_support?: string[] | null
          risk_level?: string | null
          strategic_alignment?: string[] | null
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_outcome_updates: {
        Row: {
          attachments: Json | null
          created_at: string | null
          data_collection_method: string | null
          description: string | null
          evidence_data: Json | null
          id: string
          metric_updates: Json | null
          project_outcome_id: string
          report_date: string
          reported_by: string
          title: string
          update_type: string
          validation_notes: string | null
        }
        Insert: {
          attachments?: Json | null
          created_at?: string | null
          data_collection_method?: string | null
          description?: string | null
          evidence_data?: Json | null
          id?: string
          metric_updates?: Json | null
          project_outcome_id: string
          report_date: string
          reported_by: string
          title: string
          update_type: string
          validation_notes?: string | null
        }
        Update: {
          attachments?: Json | null
          created_at?: string | null
          data_collection_method?: string | null
          description?: string | null
          evidence_data?: Json | null
          id?: string
          metric_updates?: Json | null
          project_outcome_id?: string
          report_date?: string
          reported_by?: string
          title?: string
          update_type?: string
          validation_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_outcome_updates_project_outcome_id_fkey"
            columns: ["project_outcome_id"]
            isOneToOne: false
            referencedRelation: "project_outcomes"
            referencedColumns: ["id"]
          },
        ]
      }
      project_outcomes: {
        Row: {
          baseline_data: Json | null
          community_attribution: Json | null
          confidence_level: string | null
          contributing_organizations: Json | null
          created_at: string | null
          current_metrics: Json | null
          data_sources: Json | null
          description: string | null
          direct_beneficiaries: Json | null
          featured: boolean | null
          final_metrics: Json | null
          geographic_impact: Json | null
          id: string
          indirect_beneficiaries: Json | null
          individual_attribution: Json | null
          measurement_frequency: string | null
          measurement_methodology: string | null
          media_assets: Json | null
          outcome_category: string
          outcome_period_end: string | null
          outcome_period_start: string | null
          outcome_type: string
          project_id: string
          public_visibility: boolean | null
          report_url: string | null
          reported_by: string | null
          status: string | null
          target_metrics: Json | null
          temporal_impact: Json | null
          title: string
          updated_at: string | null
          verification_date: string | null
          verification_notes: string | null
          verification_status: string | null
          verified_by: string | null
        }
        Insert: {
          baseline_data?: Json | null
          community_attribution?: Json | null
          confidence_level?: string | null
          contributing_organizations?: Json | null
          created_at?: string | null
          current_metrics?: Json | null
          data_sources?: Json | null
          description?: string | null
          direct_beneficiaries?: Json | null
          featured?: boolean | null
          final_metrics?: Json | null
          geographic_impact?: Json | null
          id?: string
          indirect_beneficiaries?: Json | null
          individual_attribution?: Json | null
          measurement_frequency?: string | null
          measurement_methodology?: string | null
          media_assets?: Json | null
          outcome_category: string
          outcome_period_end?: string | null
          outcome_period_start?: string | null
          outcome_type: string
          project_id: string
          public_visibility?: boolean | null
          report_url?: string | null
          reported_by?: string | null
          status?: string | null
          target_metrics?: Json | null
          temporal_impact?: Json | null
          title: string
          updated_at?: string | null
          verification_date?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_by?: string | null
        }
        Update: {
          baseline_data?: Json | null
          community_attribution?: Json | null
          confidence_level?: string | null
          contributing_organizations?: Json | null
          created_at?: string | null
          current_metrics?: Json | null
          data_sources?: Json | null
          description?: string | null
          direct_beneficiaries?: Json | null
          featured?: boolean | null
          final_metrics?: Json | null
          geographic_impact?: Json | null
          id?: string
          indirect_beneficiaries?: Json | null
          individual_attribution?: Json | null
          measurement_frequency?: string | null
          measurement_methodology?: string | null
          media_assets?: Json | null
          outcome_category?: string
          outcome_period_end?: string | null
          outcome_period_start?: string | null
          outcome_type?: string
          project_id?: string
          public_visibility?: boolean | null
          report_url?: string | null
          reported_by?: string | null
          status?: string | null
          target_metrics?: Json | null
          temporal_impact?: Json | null
          title?: string
          updated_at?: string | null
          verification_date?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_outcomes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_impact_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_outcomes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_pairings: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          partner_project_id: string
          project_id: string
          reason: string | null
          similarity: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          partner_project_id: string
          project_id: string
          reason?: string | null
          similarity?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          partner_project_id?: string
          project_id?: string
          reason?: string | null
          similarity?: number | null
        }
        Relationships: []
      }
      project_research: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          project_id: string
          source: string
          summary: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          project_id: string
          source: string
          summary?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          project_id?: string
          source?: string
          summary?: string | null
          url?: string | null
        }
        Relationships: []
      }
      project_support_graph: {
        Row: {
          created_at: string | null
          funding_gap: number | null
          keyword_highlights: string[] | null
          last_calculated: string | null
          metadata: Json | null
          notion_project_id: string | null
          project_id: string
          project_name: string | null
          project_status: string | null
          supporters: Json | null
          upcoming_milestone: string | null
          updated_at: string | null
          urgency_score: number | null
        }
        Insert: {
          created_at?: string | null
          funding_gap?: number | null
          keyword_highlights?: string[] | null
          last_calculated?: string | null
          metadata?: Json | null
          notion_project_id?: string | null
          project_id: string
          project_name?: string | null
          project_status?: string | null
          supporters?: Json | null
          upcoming_milestone?: string | null
          updated_at?: string | null
          urgency_score?: number | null
        }
        Update: {
          created_at?: string | null
          funding_gap?: number | null
          keyword_highlights?: string[] | null
          last_calculated?: string | null
          metadata?: Json | null
          notion_project_id?: string | null
          project_id?: string
          project_name?: string | null
          project_status?: string | null
          supporters?: Json | null
          upcoming_milestone?: string | null
          updated_at?: string | null
          urgency_score?: number | null
        }
        Relationships: []
      }
      project_updates: {
        Row: {
          author: string | null
          body_md: string
          community_contributed: boolean | null
          created_at: string | null
          id: string
          image_url: string | null
          project_id: string | null
          published_at: string | null
          title: string
          update_type: string | null
        }
        Insert: {
          author?: string | null
          body_md: string
          community_contributed?: boolean | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          project_id?: string | null
          published_at?: string | null
          title: string
          update_type?: string | null
        }
        Update: {
          author?: string | null
          body_md?: string
          community_contributed?: boolean | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          project_id?: string | null
          published_at?: string | null
          title?: string
          update_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_impact_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          archived: boolean
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          location: string | null
          name: string
          notion_id: string | null
          notion_project_id: string | null
          organization_id: string | null
          status: string | null
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          archived?: boolean
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          name: string
          notion_id?: string | null
          notion_project_id?: string | null
          organization_id?: string | null
          status?: string | null
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          archived?: boolean
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          name?: string
          notion_id?: string | null
          notion_project_id?: string | null
          organization_id?: string | null
          status?: string | null
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      public_profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          current_organization: string | null
          email: string | null
          empathy_ledger_profile_id: string | null
          full_name: string
          id: string
          is_featured: boolean | null
          is_public: boolean | null
          last_synced_at: string | null
          location: string | null
          photo_credit: string | null
          photo_url: string | null
          preferred_name: string | null
          pronouns: string | null
          role_tags: string[] | null
          slug: string
          social_links: Json | null
          sync_type: string | null
          synced_from_empathy_ledger: boolean | null
          tagline: string | null
          updated_at: string | null
          user_id: string | null
          website_url: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          current_organization?: string | null
          email?: string | null
          empathy_ledger_profile_id?: string | null
          full_name: string
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          last_synced_at?: string | null
          location?: string | null
          photo_credit?: string | null
          photo_url?: string | null
          preferred_name?: string | null
          pronouns?: string | null
          role_tags?: string[] | null
          slug: string
          social_links?: Json | null
          sync_type?: string | null
          synced_from_empathy_ledger?: boolean | null
          tagline?: string | null
          updated_at?: string | null
          user_id?: string | null
          website_url?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          current_organization?: string | null
          email?: string | null
          empathy_ledger_profile_id?: string | null
          full_name?: string
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          last_synced_at?: string | null
          location?: string | null
          photo_credit?: string | null
          photo_url?: string | null
          preferred_name?: string | null
          pronouns?: string | null
          role_tags?: string[] | null
          slug?: string
          social_links?: Json | null
          sync_type?: string | null
          synced_from_empathy_ledger?: boolean | null
          tagline?: string | null
          updated_at?: string | null
          user_id?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      pulse_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          metadata: Json | null
          portrait_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          metadata?: Json | null
          portrait_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          portrait_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pulse_events_portrait_id_fkey"
            columns: ["portrait_id"]
            isOneToOne: false
            referencedRelation: "portraits"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          active: boolean
          created_at: string
          id: string
          storyteller_id: string
          subscription: Json
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          storyteller_id: string
          subscription: Json
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          storyteller_id?: string
          subscription?: Json
        }
        Relationships: []
      }
      quotes: {
        Row: {
          ai_confidence_score: number | null
          attribution_approved: boolean | null
          context_after: string | null
          context_before: string | null
          created_at: string | null
          emotional_tone: string[] | null
          extracted_by_ai: boolean | null
          id: string
          last_used_at: string | null
          quote_text: string
          quote_type: string | null
          significance_score: number | null
          story_id: string | null
          storyteller_approved: boolean | null
          storyteller_id: string
          themes: string[] | null
          transcript_id: string | null
          updated_at: string | null
          usage_count: number | null
          usage_permissions: string[] | null
          visibility: string | null
        }
        Insert: {
          ai_confidence_score?: number | null
          attribution_approved?: boolean | null
          context_after?: string | null
          context_before?: string | null
          created_at?: string | null
          emotional_tone?: string[] | null
          extracted_by_ai?: boolean | null
          id?: string
          last_used_at?: string | null
          quote_text: string
          quote_type?: string | null
          significance_score?: number | null
          story_id?: string | null
          storyteller_approved?: boolean | null
          storyteller_id: string
          themes?: string[] | null
          transcript_id?: string | null
          updated_at?: string | null
          usage_count?: number | null
          usage_permissions?: string[] | null
          visibility?: string | null
        }
        Update: {
          ai_confidence_score?: number | null
          attribution_approved?: boolean | null
          context_after?: string | null
          context_before?: string | null
          created_at?: string | null
          emotional_tone?: string[] | null
          extracted_by_ai?: boolean | null
          id?: string
          last_used_at?: string | null
          quote_text?: string
          quote_type?: string | null
          significance_score?: number | null
          story_id?: string | null
          storyteller_approved?: boolean | null
          storyteller_id?: string
          themes?: string[] | null
          transcript_id?: string | null
          updated_at?: string | null
          usage_count?: number | null
          usage_permissions?: string[] | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_transcript_id_fkey"
            columns: ["transcript_id"]
            isOneToOne: false
            referencedRelation: "transcripts"
            referencedColumns: ["id"]
          },
        ]
      }
      scraped_services: {
        Row: {
          active: boolean | null
          availability_schedule: Json | null
          capacity_indicators: Json | null
          category: string | null
          confidence_score: number
          contact_info: Json | null
          cost_structure: string | null
          created_at: string | null
          description: string | null
          eligibility_criteria: string[] | null
          extraction_timestamp: string | null
          geographical_coverage: Json | null
          id: string
          name: string
          organization_id: string | null
          outcomes_evidence: string[] | null
          source_url: string | null
          subcategory: string | null
          target_demographics: Json | null
          updated_at: string | null
          validation_status: string | null
        }
        Insert: {
          active?: boolean | null
          availability_schedule?: Json | null
          capacity_indicators?: Json | null
          category?: string | null
          confidence_score: number
          contact_info?: Json | null
          cost_structure?: string | null
          created_at?: string | null
          description?: string | null
          eligibility_criteria?: string[] | null
          extraction_timestamp?: string | null
          geographical_coverage?: Json | null
          id?: string
          name: string
          organization_id?: string | null
          outcomes_evidence?: string[] | null
          source_url?: string | null
          subcategory?: string | null
          target_demographics?: Json | null
          updated_at?: string | null
          validation_status?: string | null
        }
        Update: {
          active?: boolean | null
          availability_schedule?: Json | null
          capacity_indicators?: Json | null
          category?: string | null
          confidence_score?: number
          contact_info?: Json | null
          cost_structure?: string | null
          created_at?: string | null
          description?: string | null
          eligibility_criteria?: string[] | null
          extraction_timestamp?: string | null
          geographical_coverage?: Json | null
          id?: string
          name?: string
          organization_id?: string | null
          outcomes_evidence?: string[] | null
          source_url?: string | null
          subcategory?: string | null
          target_demographics?: Json | null
          updated_at?: string | null
          validation_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scraped_services_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      scraping_metadata: {
        Row: {
          ai_processing_version: string
          confidence_scores: Json
          created_at: string | null
          data_lineage: Json | null
          discovery_method: string
          extraction_method: string
          id: string
          last_updated: string | null
          organization_id: string | null
          quality_flags: Json | null
          scraping_timestamp: string | null
          source_type: string
          source_url: string
          validation_status: string | null
        }
        Insert: {
          ai_processing_version: string
          confidence_scores?: Json
          created_at?: string | null
          data_lineage?: Json | null
          discovery_method: string
          extraction_method: string
          id?: string
          last_updated?: string | null
          organization_id?: string | null
          quality_flags?: Json | null
          scraping_timestamp?: string | null
          source_type: string
          source_url: string
          validation_status?: string | null
        }
        Update: {
          ai_processing_version?: string
          confidence_scores?: Json
          created_at?: string | null
          data_lineage?: Json | null
          discovery_method?: string
          extraction_method?: string
          id?: string
          last_updated?: string | null
          organization_id?: string | null
          quality_flags?: Json | null
          scraping_timestamp?: string | null
          source_type?: string
          source_url?: string
          validation_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scraping_metadata_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      search_history: {
        Row: {
          filters: Json | null
          id: string
          query: string
          results_count: number | null
          search_timestamp: string | null
          user_id: string | null
        }
        Insert: {
          filters?: Json | null
          id?: string
          query: string
          results_count?: number | null
          search_timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          filters?: Json | null
          id?: string
          query?: string
          results_count?: number | null
          search_timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      service_contacts: {
        Row: {
          contact_name: string | null
          contact_type: string | null
          created_at: string | null
          email: string | null
          hours: string | null
          id: string
          is_primary: boolean | null
          phone: string | null
          service_id: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          contact_name?: string | null
          contact_type?: string | null
          created_at?: string | null
          email?: string | null
          hours?: string | null
          id?: string
          is_primary?: boolean | null
          phone?: string | null
          service_id: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          contact_name?: string | null
          contact_type?: string | null
          created_at?: string | null
          email?: string | null
          hours?: string | null
          id?: string
          is_primary?: boolean | null
          phone?: string | null
          service_id?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_contacts_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_contacts_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services_complete"
            referencedColumns: ["id"]
          },
        ]
      }
      service_locations: {
        Row: {
          city: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          id: string
          is_primary: boolean | null
          latitude: number | null
          locality: string | null
          location_name: string | null
          longitude: number | null
          operating_hours: Json | null
          postcode: string | null
          region: string | null
          service_id: string
          state: string | null
          street_address: string | null
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          latitude?: number | null
          locality?: string | null
          location_name?: string | null
          longitude?: number | null
          operating_hours?: Json | null
          postcode?: string | null
          region?: string | null
          service_id: string
          state?: string | null
          street_address?: string | null
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          latitude?: number | null
          locality?: string | null
          location_name?: string | null
          longitude?: number | null
          operating_hours?: Json | null
          postcode?: string | null
          region?: string | null
          service_id?: string
          state?: string | null
          street_address?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_locations_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_locations_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services_complete"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          accessibility_features: string[] | null
          active: boolean | null
          availability_schedule: Json | null
          capacity_current: number | null
          capacity_indicators: Json | null
          capacity_total: number | null
          categories: string[] | null
          category: string | null
          contact_email: string | null
          contact_info: Json | null
          contact_phone: string | null
          cost: string | null
          cost_structure: string | null
          created_at: string | null
          data_source: string | null
          data_source_url: string | null
          delivery_method: string[] | null
          description: string | null
          eligibility_criteria: string[] | null
          gender_specific: string[] | null
          geographical_coverage: Json | null
          id: string
          indigenous_specific: boolean | null
          is_accepting_referrals: boolean | null
          is_active: boolean | null
          is_featured: boolean | null
          keywords: string[] | null
          languages_supported: string[] | null
          last_scraped_at: string | null
          last_verified_at: string | null
          latitude: number | null
          location_address: string | null
          location_city: string | null
          location_geocoded_at: string | null
          location_latitude: number | null
          location_longitude: number | null
          location_postcode: string | null
          location_state: string | null
          location_type: string | null
          longitude: number | null
          metadata: Json | null
          name: string
          online_booking_url: string | null
          operating_hours: Json | null
          organization_id: string | null
          outcomes_evidence: string[] | null
          parent_service_id: string | null
          program_type: string | null
          project: string | null
          scrape_confidence_score: number | null
          service_area: string[] | null
          service_category: string[] | null
          service_type: string | null
          slug: string | null
          subcategory: string | null
          success_rate: number | null
          tags: string[] | null
          target_age_max: number | null
          target_age_min: number | null
          target_demographics: Json | null
          updated_at: string | null
          verification_status: string | null
          waitlist_time_weeks: number | null
          website_url: string | null
          youth_specific: boolean | null
        }
        Insert: {
          accessibility_features?: string[] | null
          active?: boolean | null
          availability_schedule?: Json | null
          capacity_current?: number | null
          capacity_indicators?: Json | null
          capacity_total?: number | null
          categories?: string[] | null
          category?: string | null
          contact_email?: string | null
          contact_info?: Json | null
          contact_phone?: string | null
          cost?: string | null
          cost_structure?: string | null
          created_at?: string | null
          data_source?: string | null
          data_source_url?: string | null
          delivery_method?: string[] | null
          description?: string | null
          eligibility_criteria?: string[] | null
          gender_specific?: string[] | null
          geographical_coverage?: Json | null
          id?: string
          indigenous_specific?: boolean | null
          is_accepting_referrals?: boolean | null
          is_active?: boolean | null
          is_featured?: boolean | null
          keywords?: string[] | null
          languages_supported?: string[] | null
          last_scraped_at?: string | null
          last_verified_at?: string | null
          latitude?: number | null
          location_address?: string | null
          location_city?: string | null
          location_geocoded_at?: string | null
          location_latitude?: number | null
          location_longitude?: number | null
          location_postcode?: string | null
          location_state?: string | null
          location_type?: string | null
          longitude?: number | null
          metadata?: Json | null
          name: string
          online_booking_url?: string | null
          operating_hours?: Json | null
          organization_id?: string | null
          outcomes_evidence?: string[] | null
          parent_service_id?: string | null
          program_type?: string | null
          project?: string | null
          scrape_confidence_score?: number | null
          service_area?: string[] | null
          service_category?: string[] | null
          service_type?: string | null
          slug?: string | null
          subcategory?: string | null
          success_rate?: number | null
          tags?: string[] | null
          target_age_max?: number | null
          target_age_min?: number | null
          target_demographics?: Json | null
          updated_at?: string | null
          verification_status?: string | null
          waitlist_time_weeks?: number | null
          website_url?: string | null
          youth_specific?: boolean | null
        }
        Update: {
          accessibility_features?: string[] | null
          active?: boolean | null
          availability_schedule?: Json | null
          capacity_current?: number | null
          capacity_indicators?: Json | null
          capacity_total?: number | null
          categories?: string[] | null
          category?: string | null
          contact_email?: string | null
          contact_info?: Json | null
          contact_phone?: string | null
          cost?: string | null
          cost_structure?: string | null
          created_at?: string | null
          data_source?: string | null
          data_source_url?: string | null
          delivery_method?: string[] | null
          description?: string | null
          eligibility_criteria?: string[] | null
          gender_specific?: string[] | null
          geographical_coverage?: Json | null
          id?: string
          indigenous_specific?: boolean | null
          is_accepting_referrals?: boolean | null
          is_active?: boolean | null
          is_featured?: boolean | null
          keywords?: string[] | null
          languages_supported?: string[] | null
          last_scraped_at?: string | null
          last_verified_at?: string | null
          latitude?: number | null
          location_address?: string | null
          location_city?: string | null
          location_geocoded_at?: string | null
          location_latitude?: number | null
          location_longitude?: number | null
          location_postcode?: string | null
          location_state?: string | null
          location_type?: string | null
          longitude?: number | null
          metadata?: Json | null
          name?: string
          online_booking_url?: string | null
          operating_hours?: Json | null
          organization_id?: string | null
          outcomes_evidence?: string[] | null
          parent_service_id?: string | null
          program_type?: string | null
          project?: string | null
          scrape_confidence_score?: number | null
          service_area?: string[] | null
          service_category?: string[] | null
          service_type?: string | null
          slug?: string | null
          subcategory?: string | null
          success_rate?: number | null
          tags?: string[] | null
          target_age_max?: number | null
          target_age_min?: number | null
          target_demographics?: Json | null
          updated_at?: string | null
          verification_status?: string | null
          waitlist_time_weeks?: number | null
          website_url?: string | null
          youth_specific?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "services_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_parent_service_id_fkey"
            columns: ["parent_service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_parent_service_id_fkey"
            columns: ["parent_service_id"]
            isOneToOne: false
            referencedRelation: "services_complete"
            referencedColumns: ["id"]
          },
        ]
      }
      services_profiles: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          public_profile_id: string | null
          role: string
          role_description: string | null
          service_id: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          public_profile_id?: string | null
          role: string
          role_description?: string | null
          service_id?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          public_profile_id?: string | null
          role?: string
          role_description?: string | null
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_profiles_public_profile_id_fkey"
            columns: ["public_profile_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_profiles_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_profiles_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services_complete"
            referencedColumns: ["id"]
          },
        ]
      }
      skills_evidence: {
        Row: {
          ai_confidence_score: number | null
          community_value_score: number | null
          context_description: string | null
          created_at: string | null
          demonstration_examples: Json | null
          evidence_quote: string | null
          evidence_strength:
            | Database["public"]["Enums"]["evidence_strength_enum"]
            | null
          human_validated: boolean | null
          id: string
          innovation_factor: number | null
          learning_stage: string | null
          mentoring_capacity: boolean | null
          proficiency_level:
            | Database["public"]["Enums"]["proficiency_level_enum"]
            | null
          skill_category: Database["public"]["Enums"]["skill_category_enum"]
          skill_name: string
          storyteller_id: string | null
          teaching_potential: boolean | null
          transferability_score: number | null
          updated_at: string | null
        }
        Insert: {
          ai_confidence_score?: number | null
          community_value_score?: number | null
          context_description?: string | null
          created_at?: string | null
          demonstration_examples?: Json | null
          evidence_quote?: string | null
          evidence_strength?:
            | Database["public"]["Enums"]["evidence_strength_enum"]
            | null
          human_validated?: boolean | null
          id?: string
          innovation_factor?: number | null
          learning_stage?: string | null
          mentoring_capacity?: boolean | null
          proficiency_level?:
            | Database["public"]["Enums"]["proficiency_level_enum"]
            | null
          skill_category: Database["public"]["Enums"]["skill_category_enum"]
          skill_name: string
          storyteller_id?: string | null
          teaching_potential?: boolean | null
          transferability_score?: number | null
          updated_at?: string | null
        }
        Update: {
          ai_confidence_score?: number | null
          community_value_score?: number | null
          context_description?: string | null
          created_at?: string | null
          demonstration_examples?: Json | null
          evidence_quote?: string | null
          evidence_strength?:
            | Database["public"]["Enums"]["evidence_strength_enum"]
            | null
          human_validated?: boolean | null
          id?: string
          innovation_factor?: number | null
          learning_stage?: string | null
          mentoring_capacity?: boolean | null
          proficiency_level?:
            | Database["public"]["Enums"]["proficiency_level_enum"]
            | null
          skill_category?: Database["public"]["Enums"]["skill_category_enum"]
          skill_name?: string
          storyteller_id?: string | null
          teaching_potential?: boolean | null
          transferability_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_evidence_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      stories: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          date_recorded: string | null
          id: string
          impact_level: string | null
          is_published: boolean | null
          location: string | null
          participant_age: number | null
          participant_name: string
          summary: string | null
          tags: string[] | null
          themes: string[] | null
          title: string
          transcript_id: string | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          date_recorded?: string | null
          id?: string
          impact_level?: string | null
          is_published?: boolean | null
          location?: string | null
          participant_age?: number | null
          participant_name: string
          summary?: string | null
          tags?: string[] | null
          themes?: string[] | null
          title: string
          transcript_id?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          date_recorded?: string | null
          id?: string
          impact_level?: string | null
          is_published?: boolean | null
          location?: string | null
          participant_age?: number | null
          participant_name?: string
          summary?: string | null
          tags?: string[] | null
          themes?: string[] | null
          title?: string
          transcript_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      story_analysis: {
        Row: {
          ai_model_used: string | null
          analysis_type: string
          analysis_version: string | null
          approved_for_publication: boolean | null
          coherence_score: number | null
          created_at: string | null
          editorial_notes: string | null
          emotional_impact_score: number | null
          engagement_score: number | null
          human_reviewed: boolean | null
          id: string
          key_messages: string[] | null
          literary_themes: string[] | null
          narrative_score: number | null
          narrative_structure: string | null
          processing_notes: Json | null
          processing_status: string | null
          processing_time_seconds: number | null
          publication_ready: boolean | null
          readability_score: number | null
          results: Json | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          story_arc: string | null
          story_id: string
          story_quotes: string[] | null
          story_summary: string | null
          storyteller_id: string
          transcript_id: string | null
          updated_at: string | null
        }
        Insert: {
          ai_model_used?: string | null
          analysis_type?: string
          analysis_version?: string | null
          approved_for_publication?: boolean | null
          coherence_score?: number | null
          created_at?: string | null
          editorial_notes?: string | null
          emotional_impact_score?: number | null
          engagement_score?: number | null
          human_reviewed?: boolean | null
          id?: string
          key_messages?: string[] | null
          literary_themes?: string[] | null
          narrative_score?: number | null
          narrative_structure?: string | null
          processing_notes?: Json | null
          processing_status?: string | null
          processing_time_seconds?: number | null
          publication_ready?: boolean | null
          readability_score?: number | null
          results?: Json | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          story_arc?: string | null
          story_id: string
          story_quotes?: string[] | null
          story_summary?: string | null
          storyteller_id: string
          transcript_id?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_model_used?: string | null
          analysis_type?: string
          analysis_version?: string | null
          approved_for_publication?: boolean | null
          coherence_score?: number | null
          created_at?: string | null
          editorial_notes?: string | null
          emotional_impact_score?: number | null
          engagement_score?: number | null
          human_reviewed?: boolean | null
          id?: string
          key_messages?: string[] | null
          literary_themes?: string[] | null
          narrative_score?: number | null
          narrative_structure?: string | null
          processing_notes?: Json | null
          processing_status?: string | null
          processing_time_seconds?: number | null
          publication_ready?: boolean | null
          readability_score?: number | null
          results?: Json | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          story_arc?: string | null
          story_id?: string
          story_quotes?: string[] | null
          story_summary?: string | null
          storyteller_id?: string
          transcript_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "story_analysis_storyteller_id_fkey1"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_analysis_transcript_id_fkey"
            columns: ["transcript_id"]
            isOneToOne: false
            referencedRelation: "transcripts"
            referencedColumns: ["id"]
          },
        ]
      }
      story_attribution_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          metadata: Json | null
          referrer: string | null
          session_id: string
          source_url: string | null
          storyteller_id: string
          timestamp: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          referrer?: string | null
          session_id: string
          source_url?: string | null
          storyteller_id: string
          timestamp?: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          referrer?: string | null
          session_id?: string
          source_url?: string | null
          storyteller_id?: string
          timestamp?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      story_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_approved: boolean | null
          like_count: number | null
          story_id: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          like_count?: number | null
          story_id?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          like_count?: number | null
          story_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      story_reactions: {
        Row: {
          created_at: string | null
          id: string
          reaction_type: string
          story_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          reaction_type: string
          story_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          reaction_type?: string
          story_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      story_related_art: {
        Row: {
          art_innovation_id: string | null
          created_at: string | null
          display_order: number | null
          id: string
          relevance_note: string | null
          story_id: string | null
        }
        Insert: {
          art_innovation_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          relevance_note?: string | null
          story_id?: string | null
        }
        Update: {
          art_innovation_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          relevance_note?: string | null
          story_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "story_related_art_art_innovation_id_fkey"
            columns: ["art_innovation_id"]
            isOneToOne: false
            referencedRelation: "art_innovation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_related_art_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      story_related_programs: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          program_id: string | null
          relevance_note: string | null
          story_id: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          program_id?: string | null
          relevance_note?: string | null
          story_id?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          program_id?: string | null
          relevance_note?: string | null
          story_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "story_related_programs_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "community_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_related_programs_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      story_related_services: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          relevance_note: string | null
          service_id: string | null
          story_id: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          relevance_note?: string | null
          service_id?: string | null
          story_id?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          relevance_note?: string | null
          service_id?: string | null
          story_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "story_related_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_related_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_related_services_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      storyteller_ai_intelligence: {
        Row: {
          aboriginal_protocol_adherence: number | null
          analysis_completeness: number | null
          collaboration_style: Json | null
          community_centered_approach: number | null
          community_impact_potential: number | null
          core_expertise_areas: Json | null
          created_at: string | null
          cultural_competency_level: string | null
          cultural_sensitivity_indicators: Json | null
          id: string
          ideal_collaboration_profiles: Json | null
          innovation_indicators: Json | null
          last_analysis_date: string | null
          narrative_authenticity_score: number | null
          professional_credibility_score: number | null
          professional_growth_trajectory: Json | null
          requires_human_review: boolean | null
          story_engagement_quality: number | null
          storyteller_id: string | null
          updated_at: string | null
        }
        Insert: {
          aboriginal_protocol_adherence?: number | null
          analysis_completeness?: number | null
          collaboration_style?: Json | null
          community_centered_approach?: number | null
          community_impact_potential?: number | null
          core_expertise_areas?: Json | null
          created_at?: string | null
          cultural_competency_level?: string | null
          cultural_sensitivity_indicators?: Json | null
          id?: string
          ideal_collaboration_profiles?: Json | null
          innovation_indicators?: Json | null
          last_analysis_date?: string | null
          narrative_authenticity_score?: number | null
          professional_credibility_score?: number | null
          professional_growth_trajectory?: Json | null
          requires_human_review?: boolean | null
          story_engagement_quality?: number | null
          storyteller_id?: string | null
          updated_at?: string | null
        }
        Update: {
          aboriginal_protocol_adherence?: number | null
          analysis_completeness?: number | null
          collaboration_style?: Json | null
          community_centered_approach?: number | null
          community_impact_potential?: number | null
          core_expertise_areas?: Json | null
          created_at?: string | null
          cultural_competency_level?: string | null
          cultural_sensitivity_indicators?: Json | null
          id?: string
          ideal_collaboration_profiles?: Json | null
          innovation_indicators?: Json | null
          last_analysis_date?: string | null
          narrative_authenticity_score?: number | null
          professional_credibility_score?: number | null
          professional_growth_trajectory?: Json | null
          requires_human_review?: boolean | null
          story_engagement_quality?: number | null
          storyteller_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "storyteller_ai_intelligence_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      storyteller_connections: {
        Row: {
          connection_type: string
          created_at: string | null
          id: string
          match_basis: Json | null
          mutual_consent: boolean | null
          status: string | null
          storyteller_a: string | null
          storyteller_b: string | null
          strength_score: number | null
          updated_at: string | null
        }
        Insert: {
          connection_type: string
          created_at?: string | null
          id?: string
          match_basis?: Json | null
          mutual_consent?: boolean | null
          status?: string | null
          storyteller_a?: string | null
          storyteller_b?: string | null
          strength_score?: number | null
          updated_at?: string | null
        }
        Update: {
          connection_type?: string
          created_at?: string | null
          id?: string
          match_basis?: Json | null
          mutual_consent?: boolean | null
          status?: string | null
          storyteller_a?: string | null
          storyteller_b?: string | null
          strength_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "storyteller_connections_storyteller_a_fkey"
            columns: ["storyteller_a"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storyteller_connections_storyteller_b_fkey"
            columns: ["storyteller_b"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      storyteller_media: {
        Row: {
          alt_text: string | null
          associated_stories: string[] | null
          created_at: string | null
          cultural_protocol: string
          description: string | null
          dimensions: Json | null
          duration: number | null
          file_size: number
          id: string
          metadata: Json | null
          storyteller_id: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          type: string
          updated_at: string | null
          url: string
          usage_rights: string
        }
        Insert: {
          alt_text?: string | null
          associated_stories?: string[] | null
          created_at?: string | null
          cultural_protocol?: string
          description?: string | null
          dimensions?: Json | null
          duration?: number | null
          file_size: number
          id?: string
          metadata?: Json | null
          storyteller_id?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          type: string
          updated_at?: string | null
          url: string
          usage_rights?: string
        }
        Update: {
          alt_text?: string | null
          associated_stories?: string[] | null
          created_at?: string | null
          cultural_protocol?: string
          description?: string | null
          dimensions?: Json | null
          duration?: number | null
          file_size?: number
          id?: string
          metadata?: Json | null
          storyteller_id?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          url?: string
          usage_rights?: string
        }
        Relationships: [
          {
            foreignKeyName: "storyteller_media_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      storyteller_videos: {
        Row: {
          created_at: string | null
          description: string | null
          duration: number | null
          id: string
          platform: string | null
          storyteller_id: string | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string | null
          url: string
          video_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          platform?: string | null
          storyteller_id?: string | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          url: string
          video_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          platform?: string | null
          storyteller_id?: string | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          url?: string
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "storyteller_videos_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      storytellers: {
        Row: {
          achievements_mentioned: string[] | null
          advice_given: string[] | null
          affiliations_expressed: string[] | null
          age_range: string | null
          airtable_record_id: string | null
          aspirations: string[] | null
          assistance_types: Json | null
          attribution_preferences: Json | null
          available_for_collaboration: boolean | null
          bio: string | null
          capabilities_mentioned: Json | null
          challenges_faced: string[] | null
          community_roles: string[] | null
          consent_date: string | null
          consent_expiry: string | null
          consent_given: boolean | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          cultural_background: string | null
          cultural_communities: string[] | null
          current_organization: string | null
          current_role: string | null
          date_of_birth: string | null
          display_name: string | null
          email: string | null
          expertise_areas: string[] | null
          full_name: string
          generated_themes: string[] | null
          generational_connections: string[] | null
          geographic_connections: string[] | null
          growth_areas: string[] | null
          id: string
          impact_stories: Json[] | null
          impact_story_promotion: boolean | null
          industry_sectors: Json | null
          influence_areas: string[] | null
          institutional_connections: Json[] | null
          interested_in_peer_support: boolean | null
          key_insights: string[] | null
          knowledge_shared: string[] | null
          language_communities: string[] | null
          leadership_expressions: string[] | null
          learning_interests: string[] | null
          life_lessons: string[] | null
          life_motto: string | null
          linkedin_profile_url: string | null
          location: string | null
          location_id: string | null
          media_type: string | null
          media_url: string | null
          mission_statements: string[] | null
          narrative_ownership_level: string | null
          networks_accessible: string[] | null
          notion_id: string | null
          open_to_mentoring: boolean | null
          organization_id: string | null
          organizations_mentioned: Json[] | null
          outcomes_described: string[] | null
          partnerships_described: string[] | null
          personal_goals: string[] | null
          personal_statement: string | null
          philosophical_expressions: string[] | null
          phone_number: string | null
          platform_benefit_sharing: Json | null
          preferred_pronouns: string | null
          privacy_preferences: Json | null
          professional_summary: string | null
          profile_image_alt_text: string | null
          profile_image_file: string | null
          profile_image_url: string | null
          project_id: string | null
          quote_sharing_consent: boolean | null
          resources_available: string[] | null
          resume_url: string | null
          role: string | null
          seeking_organizational_connections: boolean | null
          skills_discovered: Json | null
          story_use_permissions: Json | null
          story_visibility_level: string | null
          support_needed: Json | null
          support_offered: Json | null
          transcript: string | null
          transformation_stories: Json[] | null
          updated_at: string | null
          user_id: string | null
          username: string | null
          vision_expressions: string[] | null
          website_url: string | null
          wisdom_sharing_level: string | null
          years_of_experience: number | null
        }
        Insert: {
          achievements_mentioned?: string[] | null
          advice_given?: string[] | null
          affiliations_expressed?: string[] | null
          age_range?: string | null
          airtable_record_id?: string | null
          aspirations?: string[] | null
          assistance_types?: Json | null
          attribution_preferences?: Json | null
          available_for_collaboration?: boolean | null
          bio?: string | null
          capabilities_mentioned?: Json | null
          challenges_faced?: string[] | null
          community_roles?: string[] | null
          consent_date?: string | null
          consent_expiry?: string | null
          consent_given?: boolean | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          cultural_background?: string | null
          cultural_communities?: string[] | null
          current_organization?: string | null
          current_role?: string | null
          date_of_birth?: string | null
          display_name?: string | null
          email?: string | null
          expertise_areas?: string[] | null
          full_name: string
          generated_themes?: string[] | null
          generational_connections?: string[] | null
          geographic_connections?: string[] | null
          growth_areas?: string[] | null
          id?: string
          impact_stories?: Json[] | null
          impact_story_promotion?: boolean | null
          industry_sectors?: Json | null
          influence_areas?: string[] | null
          institutional_connections?: Json[] | null
          interested_in_peer_support?: boolean | null
          key_insights?: string[] | null
          knowledge_shared?: string[] | null
          language_communities?: string[] | null
          leadership_expressions?: string[] | null
          learning_interests?: string[] | null
          life_lessons?: string[] | null
          life_motto?: string | null
          linkedin_profile_url?: string | null
          location?: string | null
          location_id?: string | null
          media_type?: string | null
          media_url?: string | null
          mission_statements?: string[] | null
          narrative_ownership_level?: string | null
          networks_accessible?: string[] | null
          notion_id?: string | null
          open_to_mentoring?: boolean | null
          organization_id?: string | null
          organizations_mentioned?: Json[] | null
          outcomes_described?: string[] | null
          partnerships_described?: string[] | null
          personal_goals?: string[] | null
          personal_statement?: string | null
          philosophical_expressions?: string[] | null
          phone_number?: string | null
          platform_benefit_sharing?: Json | null
          preferred_pronouns?: string | null
          privacy_preferences?: Json | null
          professional_summary?: string | null
          profile_image_alt_text?: string | null
          profile_image_file?: string | null
          profile_image_url?: string | null
          project_id?: string | null
          quote_sharing_consent?: boolean | null
          resources_available?: string[] | null
          resume_url?: string | null
          role?: string | null
          seeking_organizational_connections?: boolean | null
          skills_discovered?: Json | null
          story_use_permissions?: Json | null
          story_visibility_level?: string | null
          support_needed?: Json | null
          support_offered?: Json | null
          transcript?: string | null
          transformation_stories?: Json[] | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
          vision_expressions?: string[] | null
          website_url?: string | null
          wisdom_sharing_level?: string | null
          years_of_experience?: number | null
        }
        Update: {
          achievements_mentioned?: string[] | null
          advice_given?: string[] | null
          affiliations_expressed?: string[] | null
          age_range?: string | null
          airtable_record_id?: string | null
          aspirations?: string[] | null
          assistance_types?: Json | null
          attribution_preferences?: Json | null
          available_for_collaboration?: boolean | null
          bio?: string | null
          capabilities_mentioned?: Json | null
          challenges_faced?: string[] | null
          community_roles?: string[] | null
          consent_date?: string | null
          consent_expiry?: string | null
          consent_given?: boolean | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          cultural_background?: string | null
          cultural_communities?: string[] | null
          current_organization?: string | null
          current_role?: string | null
          date_of_birth?: string | null
          display_name?: string | null
          email?: string | null
          expertise_areas?: string[] | null
          full_name?: string
          generated_themes?: string[] | null
          generational_connections?: string[] | null
          geographic_connections?: string[] | null
          growth_areas?: string[] | null
          id?: string
          impact_stories?: Json[] | null
          impact_story_promotion?: boolean | null
          industry_sectors?: Json | null
          influence_areas?: string[] | null
          institutional_connections?: Json[] | null
          interested_in_peer_support?: boolean | null
          key_insights?: string[] | null
          knowledge_shared?: string[] | null
          language_communities?: string[] | null
          leadership_expressions?: string[] | null
          learning_interests?: string[] | null
          life_lessons?: string[] | null
          life_motto?: string | null
          linkedin_profile_url?: string | null
          location?: string | null
          location_id?: string | null
          media_type?: string | null
          media_url?: string | null
          mission_statements?: string[] | null
          narrative_ownership_level?: string | null
          networks_accessible?: string[] | null
          notion_id?: string | null
          open_to_mentoring?: boolean | null
          organization_id?: string | null
          organizations_mentioned?: Json[] | null
          outcomes_described?: string[] | null
          partnerships_described?: string[] | null
          personal_goals?: string[] | null
          personal_statement?: string | null
          philosophical_expressions?: string[] | null
          phone_number?: string | null
          platform_benefit_sharing?: Json | null
          preferred_pronouns?: string | null
          privacy_preferences?: Json | null
          professional_summary?: string | null
          profile_image_alt_text?: string | null
          profile_image_file?: string | null
          profile_image_url?: string | null
          project_id?: string | null
          quote_sharing_consent?: boolean | null
          resources_available?: string[] | null
          resume_url?: string | null
          role?: string | null
          seeking_organizational_connections?: boolean | null
          skills_discovered?: Json | null
          story_use_permissions?: Json | null
          story_visibility_level?: string | null
          support_needed?: Json | null
          support_offered?: Json | null
          transcript?: string | null
          transformation_stories?: Json[] | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
          vision_expressions?: string[] | null
          website_url?: string | null
          wisdom_sharing_level?: string | null
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "storytellers_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storytellers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storytellers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_impact_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "storytellers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      suggestion_feedback: {
        Row: {
          action: string
          admin_notes: string | null
          created_at: string | null
          final_role: string | null
          id: string
          original_role: string | null
          reviewed_by: string | null
          suggestion_id: string
        }
        Insert: {
          action: string
          admin_notes?: string | null
          created_at?: string | null
          final_role?: string | null
          id?: string
          original_role?: string | null
          reviewed_by?: string | null
          suggestion_id: string
        }
        Update: {
          action?: string
          admin_notes?: string | null
          created_at?: string | null
          final_role?: string | null
          id?: string
          original_role?: string | null
          reviewed_by?: string | null
          suggestion_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "suggestion_feedback_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suggestion_feedback_suggestion_id_fkey"
            columns: ["suggestion_id"]
            isOneToOne: false
            referencedRelation: "content_link_suggestions"
            referencedColumns: ["id"]
          },
        ]
      }
      support_matches: {
        Row: {
          created_at: string | null
          id: string
          match_confidence: number | null
          seeker_id: string | null
          status: string | null
          support_description: string
          support_type: string
          supporter_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          match_confidence?: number | null
          seeker_id?: string | null
          status?: string | null
          support_description: string
          support_type: string
          supporter_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          match_confidence?: number | null
          seeker_id?: string | null
          status?: string | null
          support_description?: string
          support_type?: string
          supporter_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_matches_seeker_id_fkey"
            columns: ["seeker_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_matches_supporter_id_fkey"
            columns: ["supporter_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_events: {
        Row: {
          batch_id: string | null
          created_at: string | null
          error_message: string | null
          event_type: string
          id: string
          max_retries: number | null
          operation_data: Json
          priority: number | null
          processed_at: string | null
          record_id: string
          retry_count: number | null
          sync_status: string | null
          sync_target: string
          table_name: string
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          error_message?: string | null
          event_type: string
          id?: string
          max_retries?: number | null
          operation_data: Json
          priority?: number | null
          processed_at?: string | null
          record_id: string
          retry_count?: number | null
          sync_status?: string | null
          sync_target: string
          table_name: string
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          error_message?: string | null
          event_type?: string
          id?: string
          max_retries?: number | null
          operation_data?: Json
          priority?: number | null
          processed_at?: string | null
          record_id?: string
          retry_count?: number | null
          sync_status?: string | null
          sync_target?: string
          table_name?: string
        }
        Relationships: []
      }
      themes: {
        Row: {
          ai_confidence_threshold: number | null
          category: string | null
          created_at: string | null
          cultural_context: string[] | null
          description: string | null
          id: string
          level: number | null
          name: string
          parent_theme_id: string | null
          requires_cultural_review: boolean | null
          sort_order: number | null
          status: string | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          ai_confidence_threshold?: number | null
          category?: string | null
          created_at?: string | null
          cultural_context?: string[] | null
          description?: string | null
          id?: string
          level?: number | null
          name: string
          parent_theme_id?: string | null
          requires_cultural_review?: boolean | null
          sort_order?: number | null
          status?: string | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          ai_confidence_threshold?: number | null
          category?: string | null
          created_at?: string | null
          cultural_context?: string[] | null
          description?: string | null
          id?: string
          level?: number | null
          name?: string
          parent_theme_id?: string | null
          requires_cultural_review?: boolean | null
          sort_order?: number | null
          status?: string | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "themes_parent_theme_id_fkey"
            columns: ["parent_theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      touchpoints: {
        Row: {
          contact_email: string | null
          contact_id: number | null
          contact_name: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          occurred_at: string | null
          project_id: string | null
          project_name: string | null
          source: string
          source_id: string | null
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_id?: number | null
          contact_name?: string | null
          created_at?: string | null
          id: string
          metadata?: Json | null
          occurred_at?: string | null
          project_id?: string | null
          project_name?: string | null
          source: string
          source_id?: string | null
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_id?: number | null
          contact_name?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          occurred_at?: string | null
          project_id?: string | null
          project_name?: string | null
          source?: string
          source_id?: string | null
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      transcript_analysis: {
        Row: {
          ai_model_used: string
          analysis_type: string
          analysis_version: string | null
          approved_for_use: boolean | null
          confidence_score: number | null
          created_at: string | null
          cultural_elements: Json | null
          cultural_review_required: boolean | null
          human_reviewed: boolean | null
          id: string
          insights: string[] | null
          key_quotes: string[] | null
          key_topics: string[] | null
          primary_emotions: string[] | null
          processing_notes: string | null
          processing_status: string | null
          processing_time_seconds: number | null
          quality_score: number | null
          results: Json
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          sensitivity_flags: string[] | null
          storyteller_id: string | null
          summary: string | null
          themes_identified: string[] | null
          transcript_id: string | null
          updated_at: string | null
        }
        Insert: {
          ai_model_used: string
          analysis_type: string
          analysis_version?: string | null
          approved_for_use?: boolean | null
          confidence_score?: number | null
          created_at?: string | null
          cultural_elements?: Json | null
          cultural_review_required?: boolean | null
          human_reviewed?: boolean | null
          id?: string
          insights?: string[] | null
          key_quotes?: string[] | null
          key_topics?: string[] | null
          primary_emotions?: string[] | null
          processing_notes?: string | null
          processing_status?: string | null
          processing_time_seconds?: number | null
          quality_score?: number | null
          results: Json
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sensitivity_flags?: string[] | null
          storyteller_id?: string | null
          summary?: string | null
          themes_identified?: string[] | null
          transcript_id?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_model_used?: string
          analysis_type?: string
          analysis_version?: string | null
          approved_for_use?: boolean | null
          confidence_score?: number | null
          created_at?: string | null
          cultural_elements?: Json | null
          cultural_review_required?: boolean | null
          human_reviewed?: boolean | null
          id?: string
          insights?: string[] | null
          key_quotes?: string[] | null
          key_topics?: string[] | null
          primary_emotions?: string[] | null
          processing_notes?: string | null
          processing_status?: string | null
          processing_time_seconds?: number | null
          quality_score?: number | null
          results?: Json
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sensitivity_flags?: string[] | null
          storyteller_id?: string | null
          summary?: string | null
          themes_identified?: string[] | null
          transcript_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "story_analysis_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_analysis_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_analysis_transcript_id_fkey"
            columns: ["transcript_id"]
            isOneToOne: false
            referencedRelation: "transcripts"
            referencedColumns: ["id"]
          },
        ]
      }
      transcript_usage: {
        Row: {
          content_id: string | null
          content_type: string | null
          source_end_position: number | null
          source_start_position: number | null
          transcript_id: string | null
        }
        Insert: {
          content_id?: string | null
          content_type?: string | null
          source_end_position?: number | null
          source_start_position?: number | null
          transcript_id?: string | null
        }
        Update: {
          content_id?: string | null
          content_type?: string | null
          source_end_position?: number | null
          source_start_position?: number | null
          transcript_id?: string | null
        }
        Relationships: []
      }
      transcripts: {
        Row: {
          access_restrictions: string[] | null
          analysis_completed_date: string | null
          analysis_quality_score: number | null
          analysis_requested_date: string | null
          character_count: number | null
          collection_date: string | null
          collection_method: string | null
          consent_date: string | null
          consent_for_ai_analysis: boolean | null
          consent_for_quote_extraction: boolean | null
          consent_for_story_creation: boolean | null
          consent_for_theme_analysis: boolean | null
          consent_notes: string | null
          content_warnings: string[] | null
          created_at: string | null
          cultural_considerations: string | null
          duration_minutes: number | null
          id: string
          interviewer_name: string | null
          language: string | null
          last_processed_date: string | null
          last_story_creation_date: string | null
          location: string | null
          original_file_format: string | null
          original_file_size_mb: number | null
          privacy_level: string | null
          processing_notes: string | null
          processing_status: string | null
          ready_for_analysis: boolean | null
          requires_cultural_review: boolean | null
          safety_notes: string | null
          safety_review_status: string | null
          stories_created_count: number | null
          storyteller_approved_content: boolean | null
          storyteller_id: string
          transcript_content: string
          transcript_type: string | null
          transcription_confidence_score: number | null
          transcription_method: string | null
          trauma_informed_considerations: string | null
          updated_at: string | null
          word_count: number | null
        }
        Insert: {
          access_restrictions?: string[] | null
          analysis_completed_date?: string | null
          analysis_quality_score?: number | null
          analysis_requested_date?: string | null
          character_count?: number | null
          collection_date?: string | null
          collection_method?: string | null
          consent_date?: string | null
          consent_for_ai_analysis?: boolean | null
          consent_for_quote_extraction?: boolean | null
          consent_for_story_creation?: boolean | null
          consent_for_theme_analysis?: boolean | null
          consent_notes?: string | null
          content_warnings?: string[] | null
          created_at?: string | null
          cultural_considerations?: string | null
          duration_minutes?: number | null
          id?: string
          interviewer_name?: string | null
          language?: string | null
          last_processed_date?: string | null
          last_story_creation_date?: string | null
          location?: string | null
          original_file_format?: string | null
          original_file_size_mb?: number | null
          privacy_level?: string | null
          processing_notes?: string | null
          processing_status?: string | null
          ready_for_analysis?: boolean | null
          requires_cultural_review?: boolean | null
          safety_notes?: string | null
          safety_review_status?: string | null
          stories_created_count?: number | null
          storyteller_approved_content?: boolean | null
          storyteller_id: string
          transcript_content: string
          transcript_type?: string | null
          transcription_confidence_score?: number | null
          transcription_method?: string | null
          trauma_informed_considerations?: string | null
          updated_at?: string | null
          word_count?: number | null
        }
        Update: {
          access_restrictions?: string[] | null
          analysis_completed_date?: string | null
          analysis_quality_score?: number | null
          analysis_requested_date?: string | null
          character_count?: number | null
          collection_date?: string | null
          collection_method?: string | null
          consent_date?: string | null
          consent_for_ai_analysis?: boolean | null
          consent_for_quote_extraction?: boolean | null
          consent_for_story_creation?: boolean | null
          consent_for_theme_analysis?: boolean | null
          consent_notes?: string | null
          content_warnings?: string[] | null
          created_at?: string | null
          cultural_considerations?: string | null
          duration_minutes?: number | null
          id?: string
          interviewer_name?: string | null
          language?: string | null
          last_processed_date?: string | null
          last_story_creation_date?: string | null
          location?: string | null
          original_file_format?: string | null
          original_file_size_mb?: number | null
          privacy_level?: string | null
          processing_notes?: string | null
          processing_status?: string | null
          ready_for_analysis?: boolean | null
          requires_cultural_review?: boolean | null
          safety_notes?: string | null
          safety_review_status?: string | null
          stories_created_count?: number | null
          storyteller_approved_content?: boolean | null
          storyteller_id?: string
          transcript_content?: string
          transcript_type?: string | null
          transcription_confidence_score?: number | null
          transcription_method?: string | null
          trauma_informed_considerations?: string | null
          updated_at?: string | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transcripts_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_behavior_insights: {
        Row: {
          analysis_period_end: string
          analysis_period_start: string
          average_session_duration: number | null
          calculation_version: string | null
          collaboration_effectiveness_score: number | null
          collaboration_initiated: number | null
          collaboration_matches: Json | null
          collaboration_patterns: Json | null
          community_contribution_score: number | null
          content_interactions_total: number | null
          content_preferences: Json | null
          content_quality_score: number | null
          created_at: string | null
          data_sharing_consent: boolean | null
          engagement_patterns: Json | null
          engagement_score: number | null
          id: string
          insights_consent: boolean | null
          last_calculated_at: string | null
          page_views_total: number | null
          platform_usage_patterns: Json | null
          predicted_interests: Json | null
          recommended_projects: Json | null
          total_session_time: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analysis_period_end: string
          analysis_period_start: string
          average_session_duration?: number | null
          calculation_version?: string | null
          collaboration_effectiveness_score?: number | null
          collaboration_initiated?: number | null
          collaboration_matches?: Json | null
          collaboration_patterns?: Json | null
          community_contribution_score?: number | null
          content_interactions_total?: number | null
          content_preferences?: Json | null
          content_quality_score?: number | null
          created_at?: string | null
          data_sharing_consent?: boolean | null
          engagement_patterns?: Json | null
          engagement_score?: number | null
          id?: string
          insights_consent?: boolean | null
          last_calculated_at?: string | null
          page_views_total?: number | null
          platform_usage_patterns?: Json | null
          predicted_interests?: Json | null
          recommended_projects?: Json | null
          total_session_time?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analysis_period_end?: string
          analysis_period_start?: string
          average_session_duration?: number | null
          calculation_version?: string | null
          collaboration_effectiveness_score?: number | null
          collaboration_initiated?: number | null
          collaboration_matches?: Json | null
          collaboration_patterns?: Json | null
          community_contribution_score?: number | null
          content_interactions_total?: number | null
          content_preferences?: Json | null
          content_quality_score?: number | null
          created_at?: string | null
          data_sharing_consent?: boolean | null
          engagement_patterns?: Json | null
          engagement_score?: number | null
          id?: string
          insights_consent?: boolean | null
          last_calculated_at?: string | null
          page_views_total?: number | null
          platform_usage_patterns?: Json | null
          predicted_interests?: Json | null
          recommended_projects?: Json | null
          total_session_time?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_community_engagement: {
        Row: {
          availability: Json | null
          contribution_areas: Json | null
          created_at: string | null
          cultural_considerations: Json | null
          ethical_guidelines: Json | null
          id: string
          leadership_interests: Json | null
          participation_style: Json | null
          skill_sharing_preferences: Json | null
          updated_at: string | null
          user_profile_id: string
        }
        Insert: {
          availability?: Json | null
          contribution_areas?: Json | null
          created_at?: string | null
          cultural_considerations?: Json | null
          ethical_guidelines?: Json | null
          id?: string
          leadership_interests?: Json | null
          participation_style?: Json | null
          skill_sharing_preferences?: Json | null
          updated_at?: string | null
          user_profile_id: string
        }
        Update: {
          availability?: Json | null
          contribution_areas?: Json | null
          created_at?: string | null
          cultural_considerations?: Json | null
          ethical_guidelines?: Json | null
          id?: string
          leadership_interests?: Json | null
          participation_style?: Json | null
          skill_sharing_preferences?: Json | null
          updated_at?: string | null
          user_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_community_engagement_user_profile_id_fkey"
            columns: ["user_profile_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["user_profile_id"]
          },
          {
            foreignKeyName: "user_community_engagement_user_profile_id_fkey"
            columns: ["user_profile_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          accessibility_needs: Json | null
          account_status: string | null
          avatar_url: string | null
          bio: string | null
          collaboration_preferences: Json | null
          content_preferences: Json | null
          created_at: string | null
          cultural_protocols: Json | null
          dashboard_layout: Json | null
          display_name: string | null
          email: string | null
          expertise_areas: Json | null
          id: string
          interests: Json | null
          last_active_at: string | null
          location: Json | null
          notification_preferences: Json | null
          onboarding_completed: boolean | null
          preferred_languages: Json | null
          privacy_settings: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accessibility_needs?: Json | null
          account_status?: string | null
          avatar_url?: string | null
          bio?: string | null
          collaboration_preferences?: Json | null
          content_preferences?: Json | null
          created_at?: string | null
          cultural_protocols?: Json | null
          dashboard_layout?: Json | null
          display_name?: string | null
          email?: string | null
          expertise_areas?: Json | null
          id?: string
          interests?: Json | null
          last_active_at?: string | null
          location?: Json | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          preferred_languages?: Json | null
          privacy_settings?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accessibility_needs?: Json | null
          account_status?: string | null
          avatar_url?: string | null
          bio?: string | null
          collaboration_preferences?: Json | null
          content_preferences?: Json | null
          created_at?: string | null
          cultural_protocols?: Json | null
          dashboard_layout?: Json | null
          display_name?: string | null
          email?: string | null
          expertise_areas?: Json | null
          id?: string
          interests?: Json | null
          last_active_at?: string | null
          location?: Json | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          preferred_languages?: Json | null
          privacy_settings?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_project_preferences: {
        Row: {
          collaboration_interest: Json | null
          created_at: string | null
          engagement_level: string | null
          id: string
          notification_enabled: boolean | null
          preference_type: string
          project_id: string
          updated_at: string | null
          user_profile_id: string
        }
        Insert: {
          collaboration_interest?: Json | null
          created_at?: string | null
          engagement_level?: string | null
          id?: string
          notification_enabled?: boolean | null
          preference_type: string
          project_id: string
          updated_at?: string | null
          user_profile_id: string
        }
        Update: {
          collaboration_interest?: Json | null
          created_at?: string | null
          engagement_level?: string | null
          id?: string
          notification_enabled?: boolean | null
          preference_type?: string
          project_id?: string
          updated_at?: string | null
          user_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_project_preferences_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_impact_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "user_project_preferences_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_project_preferences_user_profile_id_fkey"
            columns: ["user_profile_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["user_profile_id"]
          },
          {
            foreignKeyName: "user_project_preferences_user_profile_id_fkey"
            columns: ["user_profile_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          last_login: string | null
          name: string
          password_hash: string
          permissions: string[] | null
          updated_at: string | null
          user_role: string
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          name: string
          password_hash: string
          permissions?: string[] | null
          updated_at?: string | null
          user_role?: string
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          name?: string
          password_hash?: string
          permissions?: string[] | null
          updated_at?: string | null
          user_role?: string
          username?: string
        }
        Relationships: []
      }
      volunteer_interest: {
        Row: {
          availability: string | null
          created_at: string | null
          email: string
          experience_level: string | null
          id: string
          interests: string[] | null
          location: string | null
          message: string | null
          name: string
          phone: string | null
          preferred_contribution: string | null
          skills: string[] | null
          status: string | null
        }
        Insert: {
          availability?: string | null
          created_at?: string | null
          email: string
          experience_level?: string | null
          id?: string
          interests?: string[] | null
          location?: string | null
          message?: string | null
          name: string
          phone?: string | null
          preferred_contribution?: string | null
          skills?: string[] | null
          status?: string | null
        }
        Update: {
          availability?: string | null
          created_at?: string | null
          email?: string
          experience_level?: string | null
          id?: string
          interests?: string[] | null
          location?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          preferred_contribution?: string | null
          skills?: string[] | null
          status?: string | null
        }
        Relationships: []
      }
      wisdom_extracts: {
        Row: {
          ai_confidence_score: number | null
          attribution_required: boolean | null
          context_after: string | null
          context_before: string | null
          context_required: boolean | null
          created_at: string | null
          cultural_appropriateness_score: number | null
          emotional_tone: string | null
          extracted_quote: string
          human_validated: boolean | null
          id: string
          life_stage: string | null
          relevance_keywords: string[] | null
          sharing_approved: boolean | null
          storyteller_id: string | null
          themes: string[] | null
          transcript_analysis_id: string | null
          updated_at: string | null
          validation_notes: string | null
          wisdom_type: Database["public"]["Enums"]["wisdom_type_enum"]
        }
        Insert: {
          ai_confidence_score?: number | null
          attribution_required?: boolean | null
          context_after?: string | null
          context_before?: string | null
          context_required?: boolean | null
          created_at?: string | null
          cultural_appropriateness_score?: number | null
          emotional_tone?: string | null
          extracted_quote: string
          human_validated?: boolean | null
          id?: string
          life_stage?: string | null
          relevance_keywords?: string[] | null
          sharing_approved?: boolean | null
          storyteller_id?: string | null
          themes?: string[] | null
          transcript_analysis_id?: string | null
          updated_at?: string | null
          validation_notes?: string | null
          wisdom_type: Database["public"]["Enums"]["wisdom_type_enum"]
        }
        Update: {
          ai_confidence_score?: number | null
          attribution_required?: boolean | null
          context_after?: string | null
          context_before?: string | null
          context_required?: boolean | null
          created_at?: string | null
          cultural_appropriateness_score?: number | null
          emotional_tone?: string | null
          extracted_quote?: string
          human_validated?: boolean | null
          id?: string
          life_stage?: string | null
          relevance_keywords?: string[] | null
          sharing_approved?: boolean | null
          storyteller_id?: string | null
          themes?: string[] | null
          transcript_analysis_id?: string | null
          updated_at?: string | null
          validation_notes?: string | null
          wisdom_type?: Database["public"]["Enums"]["wisdom_type_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "wisdom_extracts_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wisdom_extracts_transcript_analysis_id_fkey"
            columns: ["transcript_analysis_id"]
            isOneToOne: false
            referencedRelation: "transcript_analysis"
            referencedColumns: ["id"]
          },
        ]
      }
      wisdom_insights: {
        Row: {
          context: string | null
          created_at: string | null
          id: string
          insight_text: string
          life_area: string | null
          sharing_level: string | null
          source_story: string | null
          source_transcript: string | null
          storyteller_id: string | null
          universality_score: number | null
          updated_at: string | null
        }
        Insert: {
          context?: string | null
          created_at?: string | null
          id?: string
          insight_text: string
          life_area?: string | null
          sharing_level?: string | null
          source_story?: string | null
          source_transcript?: string | null
          storyteller_id?: string | null
          universality_score?: number | null
          updated_at?: string | null
        }
        Update: {
          context?: string | null
          created_at?: string | null
          id?: string
          insight_text?: string
          life_area?: string | null
          sharing_level?: string | null
          source_story?: string | null
          source_transcript?: string | null
          storyteller_id?: string | null
          universality_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wisdom_insights_source_transcript_fkey"
            columns: ["source_transcript"]
            isOneToOne: false
            referencedRelation: "transcripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wisdom_insights_storyteller_id_fkey"
            columns: ["storyteller_id"]
            isOneToOne: false
            referencedRelation: "storytellers"
            referencedColumns: ["id"]
          },
        ]
      }
      xero_bank_transactions: {
        Row: {
          bank_account_id: string | null
          bank_account_name: string | null
          contact_id: string | null
          contact_name: string | null
          created_at: string | null
          date: string | null
          id: string
          line_items: Json | null
          reference: string | null
          status: string | null
          subtotal: number | null
          synced_at: string | null
          tenant_id: string
          total: number | null
          total_tax: number | null
          type: string
          updated_at: string | null
          xero_id: string
        }
        Insert: {
          bank_account_id?: string | null
          bank_account_name?: string | null
          contact_id?: string | null
          contact_name?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          line_items?: Json | null
          reference?: string | null
          status?: string | null
          subtotal?: number | null
          synced_at?: string | null
          tenant_id: string
          total?: number | null
          total_tax?: number | null
          type: string
          updated_at?: string | null
          xero_id: string
        }
        Update: {
          bank_account_id?: string | null
          bank_account_name?: string | null
          contact_id?: string | null
          contact_name?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          line_items?: Json | null
          reference?: string | null
          status?: string | null
          subtotal?: number | null
          synced_at?: string | null
          tenant_id?: string
          total?: number | null
          total_tax?: number | null
          type?: string
          updated_at?: string | null
          xero_id?: string
        }
        Relationships: []
      }
      xero_bas_tracking: {
        Row: {
          created_at: string | null
          gst_on_purchases: number | null
          gst_on_sales: number | null
          id: string
          lodged_date: string | null
          net_gst: number | null
          payg_withheld: number | null
          period_end: string
          period_start: string
          status: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          gst_on_purchases?: number | null
          gst_on_sales?: number | null
          id?: string
          lodged_date?: string | null
          net_gst?: number | null
          payg_withheld?: number | null
          period_end: string
          period_start: string
          status?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          gst_on_purchases?: number | null
          gst_on_sales?: number | null
          id?: string
          lodged_date?: string | null
          net_gst?: number | null
          payg_withheld?: number | null
          period_end?: string
          period_start?: string
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      xero_contacts: {
        Row: {
          abn: string | null
          account_number: string | null
          addresses: Json | null
          balance: number | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          is_customer: boolean | null
          is_supplier: boolean | null
          last_name: string | null
          name: string
          outstanding_payable: number | null
          outstanding_receivable: number | null
          phones: Json | null
          synced_at: string | null
          tax_number: string | null
          tenant_id: string
          updated_at: string | null
          xero_id: string
        }
        Insert: {
          abn?: string | null
          account_number?: string | null
          addresses?: Json | null
          balance?: number | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_customer?: boolean | null
          is_supplier?: boolean | null
          last_name?: string | null
          name: string
          outstanding_payable?: number | null
          outstanding_receivable?: number | null
          phones?: Json | null
          synced_at?: string | null
          tax_number?: string | null
          tenant_id: string
          updated_at?: string | null
          xero_id: string
        }
        Update: {
          abn?: string | null
          account_number?: string | null
          addresses?: Json | null
          balance?: number | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_customer?: boolean | null
          is_supplier?: boolean | null
          last_name?: string | null
          name?: string
          outstanding_payable?: number | null
          outstanding_receivable?: number | null
          phones?: Json | null
          synced_at?: string | null
          tax_number?: string | null
          tenant_id?: string
          updated_at?: string | null
          xero_id?: string
        }
        Relationships: []
      }
      xero_invoices: {
        Row: {
          amount_due: number | null
          amount_paid: number | null
          contact_id: string | null
          contact_name: string | null
          created_at: string | null
          currency_code: string | null
          date: string | null
          due_date: string | null
          has_attachments: boolean | null
          id: string
          invoice_number: string | null
          line_items: Json | null
          reference: string | null
          status: string | null
          subtotal: number | null
          synced_at: string | null
          tenant_id: string
          total: number | null
          total_tax: number | null
          type: string
          updated_at: string | null
          url: string | null
          xero_id: string
        }
        Insert: {
          amount_due?: number | null
          amount_paid?: number | null
          contact_id?: string | null
          contact_name?: string | null
          created_at?: string | null
          currency_code?: string | null
          date?: string | null
          due_date?: string | null
          has_attachments?: boolean | null
          id?: string
          invoice_number?: string | null
          line_items?: Json | null
          reference?: string | null
          status?: string | null
          subtotal?: number | null
          synced_at?: string | null
          tenant_id: string
          total?: number | null
          total_tax?: number | null
          type: string
          updated_at?: string | null
          url?: string | null
          xero_id: string
        }
        Update: {
          amount_due?: number | null
          amount_paid?: number | null
          contact_id?: string | null
          contact_name?: string | null
          created_at?: string | null
          currency_code?: string | null
          date?: string | null
          due_date?: string | null
          has_attachments?: boolean | null
          id?: string
          invoice_number?: string | null
          line_items?: Json | null
          reference?: string | null
          status?: string | null
          subtotal?: number | null
          synced_at?: string | null
          tenant_id?: string
          total?: number | null
          total_tax?: number | null
          type?: string
          updated_at?: string | null
          url?: string | null
          xero_id?: string
        }
        Relationships: []
      }
      xero_sync_status: {
        Row: {
          created_at: string | null
          error_count: number | null
          error_message: string | null
          id: string
          last_error: string | null
          last_sync: string | null
          next_sync: string | null
          organization_name: string | null
          sync_duration_ms: number | null
          sync_status: string | null
          synced_items: number | null
          tenant_id: string
          total_bills: number | null
          total_contacts: number | null
          total_invoices: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          error_count?: number | null
          error_message?: string | null
          id?: string
          last_error?: string | null
          last_sync?: string | null
          next_sync?: string | null
          organization_name?: string | null
          sync_duration_ms?: number | null
          sync_status?: string | null
          synced_items?: number | null
          tenant_id: string
          total_bills?: number | null
          total_contacts?: number | null
          total_invoices?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          error_count?: number | null
          error_message?: string | null
          id?: string
          last_error?: string | null
          last_sync?: string | null
          next_sync?: string | null
          organization_name?: string | null
          sync_duration_ms?: number | null
          sync_status?: string | null
          synced_items?: number | null
          tenant_id?: string
          total_bills?: number | null
          total_contacts?: number | null
          total_invoices?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      community_engagement_overview: {
        Row: {
          avg_engagement_score: number | null
          event_category: string | null
          event_count: number | null
          milestones_reached: number | null
          unique_users: number | null
          user_actions: number | null
          week: string | null
        }
        Relationships: []
      }
      decision_analytics: {
        Row: {
          avg_confidence: number | null
          avg_outcome_rating: number | null
          category: string | null
          completed_with_outcomes: number | null
          decision_count: number | null
          priority: string | null
          status: string | null
        }
        Relationships: []
      }
      platform_organization_stats: {
        Row: {
          collection_count: number | null
          id: string | null
          last_upload: string | null
          name: string | null
          photo_count: number | null
          slug: string | null
          storage_quota_gb: number | null
          storage_used_gb: number | null
          total_downloads: number | null
          total_media_items: number | null
          total_views: number | null
          uploads_this_month: number | null
          video_count: number | null
        }
        Relationships: []
      }
      platform_public_media_with_collections: {
        Row: {
          capture_date: string | null
          collections: Json | null
          content_category: string | null
          content_subcategory: string | null
          created_at: string | null
          description: string | null
          file_type: string | null
          file_url: string | null
          id: string | null
          impact_themes: string[] | null
          manual_tags: string[] | null
          organization_name: string | null
          organization_slug: string | null
          photographer: string | null
          platform_organization_id: string | null
          thumbnail_url: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_media_items_platform_organization_id_fkey"
            columns: ["platform_organization_id"]
            isOneToOne: false
            referencedRelation: "platform_organization_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platform_media_items_platform_organization_id_fkey"
            columns: ["platform_organization_id"]
            isOneToOne: false
            referencedRelation: "platform_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      project_impact_summary: {
        Row: {
          last_outcome_update: string | null
          project_id: string | null
          project_name: string | null
          project_status: string | null
          total_beneficiaries: number | null
          total_contributions: number | null
          total_outcomes: number | null
          unique_contributors: number | null
          verified_outcomes: number | null
        }
        Relationships: []
      }
      project_support_overview: {
        Row: {
          concentration_risk: boolean | null
          financial_last_updated: string | null
          funding_gap: number | null
          project_id: string | null
          project_name: string | null
          project_status: string | null
          supporter_slots: number | null
          total_actual: number | null
          total_potential: number | null
          upcoming_milestone: string | null
          urgency_score: number | null
        }
        Relationships: []
      }
      public_media_with_collections: {
        Row: {
          alt_text: string | null
          capture_date: string | null
          collections: Json | null
          description: string | null
          file_type: string | null
          file_url: string | null
          id: string | null
          impact_themes: string[] | null
          manual_tags: string[] | null
          photographer: string | null
          thumbnail_url: string | null
          title: string | null
        }
        Relationships: []
      }
      services_complete: {
        Row: {
          active: boolean | null
          age_range: Json | null
          categories: string[] | null
          contact: Json | null
          contacts: Json | null
          created_at: string | null
          description: string | null
          id: string | null
          indigenous_specific: boolean | null
          keywords: string[] | null
          last_scraped_at: string | null
          location: Json | null
          locations: Json | null
          maximum_age: number | null
          minimum_age: number | null
          name: string | null
          organization: Json | null
          organizations: Json | null
          score: number | null
          slug: string | null
          updated_at: string | null
          url: string | null
          youth_specific: boolean | null
        }
        Relationships: []
      }
      sync_event_statistics: {
        Row: {
          avg_processing_time_seconds: number | null
          event_count: number | null
          newest_event: string | null
          oldest_event: string | null
          sync_status: string | null
          sync_target: string | null
          table_name: string | null
        }
        Relationships: []
      }
      user_dashboard_summary: {
        Row: {
          contributed_projects: number | null
          display_name: string | null
          engagement_score: number | null
          followed_projects: number | null
          interests: Json | null
          last_active_at: string | null
          location: Json | null
          onboarding_completed: boolean | null
          user_id: string | null
          user_profile_id: string | null
        }
        Relationships: []
      }
      vw_engagement_tier_stats: {
        Row: {
          government_contacts: number | null
          synced_to_notion: number | null
          tier: string | null
          total_contacts: number | null
        }
        Relationships: []
      }
      vw_newsletter_segments: {
        Row: {
          alignment_tags: string[] | null
          composite_score: number | null
          email: string | null
          engagement_priority: string | null
          full_name: string | null
          newsletter_type: string | null
          person_id: string | null
          sector: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_new_storyteller: {
        Args: {
          p_bio?: string
          p_community?: string
          p_email: string
          p_full_name: string
        }
        Returns: string
      }
      analyze_contact_strategic_value: { Args: never; Returns: number }
      assign_engagement_tier: { Args: { person_uuid: string }; Returns: string }
      calculate_empowerment_score: {
        Args: { analysis_data: Json }
        Returns: number
      }
      calculate_engagement_score: {
        Args: {
          collaborations: number
          interactions: number
          page_views: number
          session_time: number
        }
        Returns: number
      }
      calculate_project_sovereignty_score: {
        Args: { target_project_id: string }
        Returns: number
      }
      calculate_reading_time: {
        Args: { content_text: string }
        Returns: number
      }
      calculate_relationship_score: {
        Args: { contact_id: string }
        Returns: number
      }
      calculate_service_completeness: {
        Args: { service_id_param: string }
        Returns: number
      }
      calculate_trust_score: {
        Args: {
          base_score?: number
          decay_days?: number
          interaction_dates: string[]
          quality_scores: number[]
        }
        Returns: number
      }
      can_access_story: {
        Args: { story_id: string; user_id: string }
        Returns: boolean
      }
      can_read_storyteller_data: { Args: never; Returns: boolean }
      cleanup_old_sync_events: {
        Args: { retention_days?: number }
        Returns: number
      }
      contact_matches_region: {
        Args: { contact_location: string; region_tags: string[] }
        Returns: boolean
      }
      contact_matches_role: {
        Args: {
          contact_alignment_tags: string[]
          contact_company: string
          contact_industry: string
          contact_position: string
          contact_skills: string[]
          role_tags: string[]
        }
        Returns: boolean
      }
      create_decision_outcomes_table: { Args: never; Returns: undefined }
      create_decisions_table: { Args: never; Returns: undefined }
      create_empathy_project: {
        Args: {
          creator_user_id: string
          organization_email: string
          organization_name: string
          project_name: string
          template_id?: string
        }
        Returns: string
      }
      decrement_communities_joined: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      decrement_stories_contributed: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      exec_sql: { Args: { query: string }; Returns: undefined }
      execute_sql: { Args: { sql_query: string }; Returns: Json }
      generate_album_slug: { Args: { title_text: string }; Returns: string }
      generate_short_id: { Args: { length?: number }; Returns: string }
      get_business_state_summary: { Args: never; Returns: Json }
      get_current_platform_organization_id: { Args: never; Returns: string }
      get_decision_recommendations: {
        Args: { limit_count?: number }
        Returns: {
          ai_recommendation: string
          confidence_score: number
          days_pending: number
          decision_id: string
          priority: string
          title: string
        }[]
      }
      get_location_id_by_name: {
        Args: { location_name: string }
        Returns: string
      }
      get_pending_sync_events: {
        Args: { batch_size?: number; target_filter?: string }
        Returns: {
          created_at: string
          event_type: string
          id: string
          operation_data: Json
          priority: number
          record_id: string
          retry_count: number
          sync_target: string
          table_name: string
        }[]
      }
      get_stories_needing_analysis: {
        Args: never
        Returns: {
          created_at: string
          story_id: string
          title: string
        }[]
      }
      get_storytellers_needing_analysis: {
        Args: never
        Returns: {
          created_at: string
          full_name: string
          storyteller_id: string
        }[]
      }
      get_transcript_analysis_for_story: {
        Args: { p_story_id: string }
        Returns: {
          emotions: string[]
          insights: string[]
          quotes: string[]
          summary: string
          themes: string[]
        }[]
      }
      increment_clicks: { Args: { portrait_uuid: string }; Returns: undefined }
      increment_communities_joined: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      increment_stories_contributed: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      increment_views: { Args: { portrait_uuid: string }; Returns: undefined }
      is_admin: { Args: never; Returns: boolean }
      mark_service_verified: {
        Args: { service_id_param: string }
        Returns: undefined
      }
      normalize_location_name: { Args: { input_name: string }; Returns: string }
      populate_media_quote_links: { Args: never; Returns: undefined }
      populate_storyteller_media_links: { Args: never; Returns: undefined }
      process_new_transcript: {
        Args: {
          p_source?: string
          p_story_id: string
          p_transcript_text: string
        }
        Returns: string
      }
      refresh_trust_scores: { Args: never; Returns: undefined }
      reset_failed_sync_events: {
        Args: { max_age_hours?: number; table_filter?: string }
        Returns: number
      }
      set_platform_organization_context: {
        Args: { org_slug: string }
        Returns: undefined
      }
      should_promote_to_notion: {
        Args: { person_uuid: string }
        Returns: boolean
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      sync_linkedin_contacts_from_imports: { Args: never; Returns: number }
      update_sync_event_status: {
        Args: { error_msg?: string; event_id: string; new_status: string }
        Returns: boolean
      }
    }
    Enums: {
      analysis_job_status_enum: "queued" | "processing" | "completed" | "failed"
      connection_strength_enum:
        | "weak"
        | "moderate"
        | "strong"
        | "very_strong"
        | "foundational"
      connection_type_enum:
        | "family"
        | "professional"
        | "community"
        | "organizational"
        | "cultural"
        | "educational"
        | "mentorship"
        | "collaboration"
        | "service"
        | "advocacy"
      consent_type_enum:
        | "general_participation"
        | "ai_analysis"
        | "quote_sharing"
        | "story_sharing"
        | "image_use"
        | "contact_permission"
        | "research_participation"
        | "platform_features"
      evidence_strength:
        | "rigorous_rct"
        | "quasi_experimental"
        | "longitudinal_study"
        | "evaluation_report"
        | "promising_practice"
        | "emerging"
      evidence_strength_enum:
        | "weak"
        | "moderate"
        | "strong"
        | "very_strong"
        | "exceptional"
      global_region:
        | "north_america"
        | "europe"
        | "asia_pacific"
        | "africa"
        | "latin_america"
        | "middle_east"
        | "australasia"
      impact_scope_enum:
        | "individual"
        | "family"
        | "local_community"
        | "regional"
        | "national"
        | "international"
        | "cultural_group"
        | "professional_network"
        | "online_community"
      impact_type_enum:
        | "personal_growth"
        | "community_development"
        | "social_change"
        | "economic_impact"
        | "cultural_preservation"
        | "education_advancement"
        | "health_improvement"
        | "environmental_benefit"
        | "innovation_creation"
        | "policy_influence"
        | "relationship_building"
        | "knowledge_transfer"
      proficiency_level_enum:
        | "beginner"
        | "developing"
        | "competent"
        | "proficient"
        | "expert"
        | "master"
      program_type:
        | "custodial_reform"
        | "diversion"
        | "restorative_justice"
        | "family_therapy"
        | "community_based"
        | "education_vocational"
        | "mentoring"
        | "prevention"
        | "reentry_support"
        | "policy_initiative"
        | "traditional_practice"
      sharing_consent_enum:
        | "none"
        | "anonymous_only"
        | "attributed_sharing"
        | "full_sharing"
        | "community_only"
      skill_category_enum:
        | "technical"
        | "creative"
        | "interpersonal"
        | "leadership"
        | "analytical"
        | "cultural"
        | "traditional"
        | "entrepreneurial"
        | "educational"
        | "healing"
        | "community_building"
        | "innovation"
        | "communication"
        | "problem_solving"
      wisdom_type_enum:
        | "life_lesson"
        | "practical_advice"
        | "philosophical_insight"
        | "cultural_knowledge"
        | "professional_guidance"
        | "personal_reflection"
        | "community_wisdom"
        | "traditional_teaching"
        | "innovation_insight"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      analysis_job_status_enum: ["queued", "processing", "completed", "failed"],
      connection_strength_enum: [
        "weak",
        "moderate",
        "strong",
        "very_strong",
        "foundational",
      ],
      connection_type_enum: [
        "family",
        "professional",
        "community",
        "organizational",
        "cultural",
        "educational",
        "mentorship",
        "collaboration",
        "service",
        "advocacy",
      ],
      consent_type_enum: [
        "general_participation",
        "ai_analysis",
        "quote_sharing",
        "story_sharing",
        "image_use",
        "contact_permission",
        "research_participation",
        "platform_features",
      ],
      evidence_strength: [
        "rigorous_rct",
        "quasi_experimental",
        "longitudinal_study",
        "evaluation_report",
        "promising_practice",
        "emerging",
      ],
      evidence_strength_enum: [
        "weak",
        "moderate",
        "strong",
        "very_strong",
        "exceptional",
      ],
      global_region: [
        "north_america",
        "europe",
        "asia_pacific",
        "africa",
        "latin_america",
        "middle_east",
        "australasia",
      ],
      impact_scope_enum: [
        "individual",
        "family",
        "local_community",
        "regional",
        "national",
        "international",
        "cultural_group",
        "professional_network",
        "online_community",
      ],
      impact_type_enum: [
        "personal_growth",
        "community_development",
        "social_change",
        "economic_impact",
        "cultural_preservation",
        "education_advancement",
        "health_improvement",
        "environmental_benefit",
        "innovation_creation",
        "policy_influence",
        "relationship_building",
        "knowledge_transfer",
      ],
      proficiency_level_enum: [
        "beginner",
        "developing",
        "competent",
        "proficient",
        "expert",
        "master",
      ],
      program_type: [
        "custodial_reform",
        "diversion",
        "restorative_justice",
        "family_therapy",
        "community_based",
        "education_vocational",
        "mentoring",
        "prevention",
        "reentry_support",
        "policy_initiative",
        "traditional_practice",
      ],
      sharing_consent_enum: [
        "none",
        "anonymous_only",
        "attributed_sharing",
        "full_sharing",
        "community_only",
      ],
      skill_category_enum: [
        "technical",
        "creative",
        "interpersonal",
        "leadership",
        "analytical",
        "cultural",
        "traditional",
        "entrepreneurial",
        "educational",
        "healing",
        "community_building",
        "innovation",
        "communication",
        "problem_solving",
      ],
      wisdom_type_enum: [
        "life_lesson",
        "practical_advice",
        "philosophical_insight",
        "cultural_knowledge",
        "professional_guidance",
        "personal_reflection",
        "community_wisdom",
        "traditional_teaching",
        "innovation_insight",
      ],
    },
  },
} as const
