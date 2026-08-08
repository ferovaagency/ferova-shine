import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "./client";

export type CmsRole = "owner" | "editor" | "reviewer";
export type ContentStatus = "draft" | "in_review" | "approved" | "scheduled" | "published" | "archived";
export type CaseResultHighlight = { label: string; value: string; context?: string };

export type CmsCaseStudy = {
  id: string;
  slug: string;
  status: ContentStatus;
  client_public_name: string | null;
  sector: string;
  country: string | null;
  summary: string;
  challenge: string;
  diagnosis: string;
  intervention: string;
  learnings: string;
  limitations: string | null;
  service_keys: string[];
  result_highlights: CaseResultHighlight[];
  started_at: string | null;
  last_observation_at: string | null;
  scheduled_for: string | null;
  published_at: string | null;
  owner_id: string;
  consent_id: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
};

type CmsCaseInsert = Omit<CmsCaseStudy, "id" | "created_at" | "updated_at" | "published_at" | "scheduled_for" | "consent_id" | "approved_by" | "approved_at"> & Partial<Pick<CmsCaseStudy, "id" | "published_at" | "scheduled_for" | "consent_id" | "approved_by" | "approved_at">>;
type CmsCaseUpdate = Partial<CmsCaseInsert>;

type CmsDatabase = {
  public: {
    Tables: {
      cms_user_roles: {
        Row: { id: string; user_id: string; role: CmsRole; created_at: string; created_by: string | null };
        Insert: { id?: string; user_id: string; role: CmsRole; created_at?: string; created_by?: string | null };
        Update: { role?: CmsRole; created_by?: string | null };
        Relationships: [];
      };
      case_studies: {
        Row: CmsCaseStudy;
        Insert: CmsCaseInsert;
        Update: CmsCaseUpdate;
        Relationships: [];
      };
      consents: {
        Row: { id: string; client_or_representative: string; publication_scope: string; permitted_data: string[]; granted_at: string; expires_at: string | null; authorization_file_path: string | null; revoked_at: string | null; notes: string | null; created_at: string; created_by: string };
        Insert: { id?: string; client_or_representative: string; publication_scope: string; permitted_data?: string[]; granted_at: string; expires_at?: string | null; authorization_file_path?: string | null; revoked_at?: string | null; notes?: string | null; created_at?: string; created_by: string };
        Update: { client_or_representative?: string; publication_scope?: string; permitted_data?: string[]; granted_at?: string; expires_at?: string | null; authorization_file_path?: string | null; revoked_at?: string | null; notes?: string | null };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: { cms_role: CmsRole; content_status: ContentStatus };
    CompositeTypes: Record<string, never>;
  };
};

export const caseCms = supabase as unknown as SupabaseClient<CmsDatabase>;
