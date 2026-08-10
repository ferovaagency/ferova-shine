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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      admin_inbox: {
        Row: {
          company: string | null
          completed_at: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          payload: Json | null
          phone: string | null
          site_origin: string
          source: string
          source_id: string | null
          status: string
          summary: string | null
        }
        Insert: {
          company?: string | null
          completed_at?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          payload?: Json | null
          phone?: string | null
          site_origin?: string
          source: string
          source_id?: string | null
          status?: string
          summary?: string | null
        }
        Update: {
          company?: string | null
          completed_at?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          payload?: Json | null
          phone?: string | null
          site_origin?: string
          source?: string
          source_id?: string | null
          status?: string
          summary?: string | null
        }
        Relationships: []
      }
      ai_conversations: {
        Row: {
          consent_data_processing: boolean
          created_at: string
          escalated: boolean
          id: string
          lang: string | null
          messages: Json
          session_id: string
          updated_at: string
          user_email: string | null
          user_name: string | null
        }
        Insert: {
          consent_data_processing?: boolean
          created_at?: string
          escalated?: boolean
          id?: string
          lang?: string | null
          messages?: Json
          session_id: string
          updated_at?: string
          user_email?: string | null
          user_name?: string | null
        }
        Update: {
          consent_data_processing?: boolean
          created_at?: string
          escalated?: boolean
          id?: string
          lang?: string | null
          messages?: Json
          session_id?: string
          updated_at?: string
          user_email?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          active: boolean
          author: string
          category: string | null
          content: string
          content_en: string | null
          content_pt: string | null
          cover_image: string | null
          created_at: string
          excerpt: string | null
          excerpt_en: string | null
          excerpt_pt: string | null
          id: string
          keyword: string | null
          language: string
          meta_description: string | null
          meta_description_en: string | null
          meta_description_pt: string | null
          meta_title: string | null
          meta_title_en: string | null
          meta_title_pt: string | null
          published_at: string
          slug: string
          title: string
          title_en: string | null
          title_pt: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          author?: string
          category?: string | null
          content: string
          content_en?: string | null
          content_pt?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          excerpt_en?: string | null
          excerpt_pt?: string | null
          id?: string
          keyword?: string | null
          language?: string
          meta_description?: string | null
          meta_description_en?: string | null
          meta_description_pt?: string | null
          meta_title?: string | null
          meta_title_en?: string | null
          meta_title_pt?: string | null
          published_at?: string
          slug: string
          title: string
          title_en?: string | null
          title_pt?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          author?: string
          category?: string | null
          content?: string
          content_en?: string | null
          content_pt?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          excerpt_en?: string | null
          excerpt_pt?: string | null
          id?: string
          keyword?: string | null
          language?: string
          meta_description?: string | null
          meta_description_en?: string | null
          meta_description_pt?: string | null
          meta_title?: string | null
          meta_title_en?: string | null
          meta_title_pt?: string | null
          published_at?: string
          slug?: string
          title?: string
          title_en?: string | null
          title_pt?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      case_change_log: {
        Row: {
          action: string
          actor_id: string | null
          after_data: Json | null
          before_data: Json | null
          created_at: string
          entity: string
          entity_id: string
          id: number
        }
        Insert: {
          action: string
          actor_id?: string | null
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string
          entity: string
          entity_id: string
          id?: never
        }
        Update: {
          action?: string
          actor_id?: string | null
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string
          entity?: string
          entity_id?: string
          id?: never
        }
        Relationships: []
      }
      case_metrics: {
        Row: {
          case_id: string
          created_at: string
          created_by: string
          definition: string
          display_order: number
          id: string
          key: string
          name: string
          public_visible: boolean
          unit: Database["public"]["Enums"]["metric_unit"]
        }
        Insert: {
          case_id: string
          created_at?: string
          created_by: string
          definition: string
          display_order?: number
          id?: string
          key: string
          name: string
          public_visible?: boolean
          unit: Database["public"]["Enums"]["metric_unit"]
        }
        Update: {
          case_id?: string
          created_at?: string
          created_by?: string
          definition?: string
          display_order?: number
          id?: string
          key?: string
          name?: string
          public_visible?: boolean
          unit?: Database["public"]["Enums"]["metric_unit"]
        }
        Relationships: [
          {
            foreignKeyName: "case_metrics_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_metrics_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_studies_public"
            referencedColumns: ["id"]
          },
        ]
      }
      case_reviews: {
        Row: {
          case_id: string
          comment: string
          created_at: string
          decision: string
          id: string
          reviewer_id: string
        }
        Insert: {
          case_id: string
          comment: string
          created_at?: string
          decision: string
          id?: string
          reviewer_id: string
        }
        Update: {
          case_id?: string
          comment?: string
          created_at?: string
          decision?: string
          id?: string
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_reviews_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_reviews_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_studies_public"
            referencedColumns: ["id"]
          },
        ]
      }
      case_studies: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          challenge: string
          client_public_name: string | null
          consent_id: string | null
          country: string | null
          created_at: string
          diagnosis: string
          id: string
          intervention: string
          last_observation_at: string | null
          learnings: string
          limitations: string | null
          owner_id: string
          published_at: string | null
          result_highlights: Json
          scheduled_for: string | null
          sector: string
          service_keys: string[]
          slug: string
          started_at: string | null
          status: Database["public"]["Enums"]["content_status"]
          summary: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          challenge?: string
          client_public_name?: string | null
          consent_id?: string | null
          country?: string | null
          created_at?: string
          diagnosis?: string
          id?: string
          intervention?: string
          last_observation_at?: string | null
          learnings?: string
          limitations?: string | null
          owner_id: string
          published_at?: string | null
          result_highlights?: Json
          scheduled_for?: string | null
          sector: string
          service_keys?: string[]
          slug: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          summary: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          challenge?: string
          client_public_name?: string | null
          consent_id?: string | null
          country?: string | null
          created_at?: string
          diagnosis?: string
          id?: string
          intervention?: string
          last_observation_at?: string | null
          learnings?: string
          limitations?: string | null
          owner_id?: string
          published_at?: string | null
          result_highlights?: Json
          scheduled_for?: string | null
          sector?: string
          service_keys?: string[]
          slug?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_studies_consent_id_fkey"
            columns: ["consent_id"]
            isOneToOne: false
            referencedRelation: "consents"
            referencedColumns: ["id"]
          },
        ]
      }
      case_timeline_events: {
        Row: {
          case_id: string
          created_at: string
          created_by: string
          description: string
          display_order: number
          event_date: string
          event_type: string
          evidence_asset_id: string | null
          id: string
          public_visible: boolean
          title: string
        }
        Insert: {
          case_id: string
          created_at?: string
          created_by: string
          description: string
          display_order?: number
          event_date: string
          event_type: string
          evidence_asset_id?: string | null
          id?: string
          public_visible?: boolean
          title: string
        }
        Update: {
          case_id?: string
          created_at?: string
          created_by?: string
          description?: string
          display_order?: number
          event_date?: string
          event_type?: string
          evidence_asset_id?: string | null
          id?: string
          public_visible?: boolean
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_timeline_events_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_timeline_events_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_studies_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_timeline_evidence_fk"
            columns: ["evidence_asset_id"]
            isOneToOne: false
            referencedRelation: "evidence_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["cms_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["cms_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["cms_role"]
          user_id?: string
        }
        Relationships: []
      }
      consents: {
        Row: {
          authorization_file_path: string | null
          client_or_representative: string
          created_at: string
          created_by: string
          expires_at: string | null
          granted_at: string
          id: string
          notes: string | null
          permitted_data: string[]
          publication_scope: string
          revoked_at: string | null
        }
        Insert: {
          authorization_file_path?: string | null
          client_or_representative: string
          created_at?: string
          created_by: string
          expires_at?: string | null
          granted_at: string
          id?: string
          notes?: string | null
          permitted_data?: string[]
          publication_scope: string
          revoked_at?: string | null
        }
        Update: {
          authorization_file_path?: string | null
          client_or_representative?: string
          created_at?: string
          created_by?: string
          expires_at?: string | null
          granted_at?: string
          id?: string
          notes?: string | null
          permitted_data?: string[]
          publication_scope?: string
          revoked_at?: string | null
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      evidence_assets: {
        Row: {
          asset_type: string
          case_id: string
          checksum: string | null
          created_at: string
          created_by: string
          file_path_or_url: string
          id: string
          public_visible: boolean
          publication_permission: boolean
          redaction_applied: boolean
          source_date: string
          source_name: string
        }
        Insert: {
          asset_type: string
          case_id: string
          checksum?: string | null
          created_at?: string
          created_by: string
          file_path_or_url: string
          id?: string
          public_visible?: boolean
          publication_permission?: boolean
          redaction_applied?: boolean
          source_date: string
          source_name: string
        }
        Update: {
          asset_type?: string
          case_id?: string
          checksum?: string | null
          created_at?: string
          created_by?: string
          file_path_or_url?: string
          id?: string
          public_visible?: boolean
          publication_permission?: boolean
          redaction_applied?: boolean
          source_date?: string
          source_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_assets_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_assets_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_studies_public"
            referencedColumns: ["id"]
          },
        ]
      }
      metric_snapshots: {
        Row: {
          confidence_level: string
          created_at: string
          created_by: string
          cutoff_date: string
          evidence_asset_id: string | null
          id: string
          methodology_note: string
          metric_id: string
          numeric_value: number | null
          period_end: string
          period_start: string
          permission_confirmed: boolean
          previous_numeric_value: number | null
          published_at: string | null
          source_name: string
          status: Database["public"]["Enums"]["snapshot_status"]
          supersedes_snapshot_id: string | null
          text_value: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          confidence_level: string
          created_at?: string
          created_by: string
          cutoff_date: string
          evidence_asset_id?: string | null
          id?: string
          methodology_note: string
          metric_id: string
          numeric_value?: number | null
          period_end: string
          period_start: string
          permission_confirmed?: boolean
          previous_numeric_value?: number | null
          published_at?: string | null
          source_name: string
          status?: Database["public"]["Enums"]["snapshot_status"]
          supersedes_snapshot_id?: string | null
          text_value?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          confidence_level?: string
          created_at?: string
          created_by?: string
          cutoff_date?: string
          evidence_asset_id?: string | null
          id?: string
          methodology_note?: string
          metric_id?: string
          numeric_value?: number | null
          period_end?: string
          period_start?: string
          permission_confirmed?: boolean
          previous_numeric_value?: number | null
          published_at?: string | null
          source_name?: string
          status?: Database["public"]["Enums"]["snapshot_status"]
          supersedes_snapshot_id?: string | null
          text_value?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "metric_snapshots_evidence_fk"
            columns: ["evidence_asset_id"]
            isOneToOne: false
            referencedRelation: "evidence_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "metric_snapshots_metric_id_fkey"
            columns: ["metric_id"]
            isOneToOne: false
            referencedRelation: "case_metrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "metric_snapshots_supersedes_snapshot_id_fkey"
            columns: ["supersedes_snapshot_id"]
            isOneToOne: false
            referencedRelation: "metric_snapshots"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_editions: {
        Row: {
          created_at: string | null
          edition_number: number
          free_content: Json | null
          id: string
          plan: string | null
          pro_content: Json | null
          published: boolean | null
          published_at: string | null
          reading_time: number | null
          slug: string
          subject_line: string | null
          title: string
          topics: string[] | null
        }
        Insert: {
          created_at?: string | null
          edition_number: number
          free_content?: Json | null
          id?: string
          plan?: string | null
          pro_content?: Json | null
          published?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          slug: string
          subject_line?: string | null
          title: string
          topics?: string[] | null
        }
        Update: {
          created_at?: string | null
          edition_number?: number
          free_content?: Json | null
          id?: string
          plan?: string | null
          pro_content?: Json | null
          published?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          subject_line?: string | null
          title?: string
          topics?: string[] | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          active: boolean | null
          created_at: string | null
          email: string
          id: string
          lang: string | null
          name: string
          plan: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          email: string
          id?: string
          lang?: string | null
          name: string
          plan?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          email?: string
          id?: string
          lang?: string | null
          name?: string
          plan?: string | null
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      case_studies_public: {
        Row: {
          challenge: string | null
          client_public_name: string | null
          country: string | null
          diagnosis: string | null
          id: string | null
          intervention: string | null
          last_observation_at: string | null
          learnings: string | null
          limitations: string | null
          published_at: string | null
          result_highlights: Json | null
          sector: string | null
          service_keys: string[] | null
          slug: string | null
          started_at: string | null
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          challenge?: string | null
          client_public_name?: string | null
          country?: string | null
          diagnosis?: string | null
          id?: string | null
          intervention?: string | null
          last_observation_at?: string | null
          learnings?: string | null
          limitations?: string | null
          published_at?: string | null
          result_highlights?: Json | null
          sector?: string | null
          service_keys?: string[] | null
          slug?: string | null
          started_at?: string | null
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          challenge?: string | null
          client_public_name?: string | null
          country?: string | null
          diagnosis?: string | null
          id?: string | null
          intervention?: string | null
          last_observation_at?: string | null
          learnings?: string | null
          limitations?: string | null
          published_at?: string | null
          result_highlights?: Json | null
          sector?: string | null
          service_keys?: string[] | null
          slug?: string | null
          started_at?: string | null
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      newsletter_editions_public: {
        Row: {
          created_at: string | null
          edition_number: number | null
          free_content: Json | null
          id: string | null
          plan: string | null
          published: boolean | null
          published_at: string | null
          reading_time: number | null
          slug: string | null
          subject_line: string | null
          title: string | null
          topics: string[] | null
        }
        Insert: {
          created_at?: string | null
          edition_number?: number | null
          free_content?: Json | null
          id?: string | null
          plan?: string | null
          published?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string | null
          subject_line?: string | null
          title?: string | null
          topics?: string[] | null
        }
        Update: {
          created_at?: string | null
          edition_number?: number | null
          free_content?: Json | null
          id?: string | null
          plan?: string | null
          published?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string | null
          subject_line?: string | null
          title?: string | null
          topics?: string[] | null
        }
        Relationships: []
      }
    }
    Functions: {
      blog_slugify: { Args: { v: string }; Returns: string }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "user"
      cms_role: "owner" | "editor" | "reviewer"
      content_status:
        | "draft"
        | "in_review"
        | "approved"
        | "scheduled"
        | "published"
        | "archived"
      metric_unit:
        | "percentage"
        | "number"
        | "usd"
        | "seconds"
        | "position"
        | "text"
      snapshot_status: "draft" | "verified" | "published" | "superseded"
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
  public: {
    Enums: {
      app_role: ["admin", "user"],
      cms_role: ["owner", "editor", "reviewer"],
      content_status: [
        "draft",
        "in_review",
        "approved",
        "scheduled",
        "published",
        "archived",
      ],
      metric_unit: [
        "percentage",
        "number",
        "usd",
        "seconds",
        "position",
        "text",
      ],
      snapshot_status: ["draft", "verified", "published", "superseded"],
    },
  },
} as const
