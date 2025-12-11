export interface Database {
  public: {
    Tables: {
      scam_calls: {
        Row: {
          id: string;
          call_date: string;
          scam_category: string;
          vulnerability_type: string;
          call_duration_seconds: number;
          summary: string;
          techniques: string[];
          unique_aspect: string;
          transcript: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          call_date: string;
          scam_category: string;
          vulnerability_type: string;
          call_duration_seconds?: number;
          summary: string;
          techniques?: string[];
          unique_aspect: string;
          transcript: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          call_date?: string;
          scam_category?: string;
          vulnerability_type?: string;
          call_duration_seconds?: number;
          summary?: string;
          techniques?: string[];
          unique_aspect?: string;
          transcript?: string;
          created_at?: string;
        };
      };
    };
  };
}

export type ScamCall = Database['public']['Tables']['scam_calls']['Row'];
