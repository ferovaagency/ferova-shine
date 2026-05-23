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
      [_ in never]: never
    }
    Functions: {
      blog_slugify: { Args: { v: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
    },
  },
} as const
