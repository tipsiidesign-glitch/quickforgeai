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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      answer_explanations: {
        Row: {
          created_at: string
          explanation: Json
          id: string
          question_id: string
          user_answer: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          explanation: Json
          id?: string
          question_id: string
          user_answer?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          explanation?: Json
          id?: string
          question_id?: string
          user_answer?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "answer_explanations_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      attempt_answers: {
        Row: {
          answered_at: string
          attempt_id: string
          id: string
          is_correct: boolean | null
          question_id: string
          selected_option: string | null
        }
        Insert: {
          answered_at?: string
          attempt_id: string
          id?: string
          is_correct?: boolean | null
          question_id: string
          selected_option?: string | null
        }
        Update: {
          answered_at?: string
          attempt_id?: string
          id?: string
          is_correct?: boolean | null
          question_id?: string
          selected_option?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attempt_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "test_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attempt_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          extracted_text: string | null
          file_name: string
          file_size: number | null
          file_type: string | null
          id: string
          processing_error: string | null
          processing_status: string
          storage_path: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          extracted_text?: string | null
          file_name: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          processing_error?: string | null
          processing_status?: string
          storage_path?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          extracted_text?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          processing_error?: string | null
          processing_status?: string
          storage_path?: string | null
          user_id?: string
        }
        Relationships: []
      }
      friend_requests: {
        Row: {
          created_at: string
          id: string
          receiver_id: string
          sender_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          receiver_id: string
          sender_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          receiver_id?: string
          sender_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      friendships: {
        Row: {
          created_at: string
          friend_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          friend_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          friend_id?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string | null
          related_request_id: string | null
          related_user_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string | null
          related_request_id?: string | null
          related_user_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string | null
          related_request_id?: string | null
          related_user_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          avatar_type: string | null
          avatar_url: string | null
          bio: string | null
          course: string | null
          created_at: string
          exam_goal: string | null
          favorite_subject: string | null
          full_name: string | null
          id: string
          institution: string | null
          onboarding_completed: boolean
          preferred_difficulty: string | null
          preferred_question_count: number | null
          study_level: string | null
          subjects: string[] | null
          updated_at: string
          username: string | null
        }
        Insert: {
          age?: number | null
          avatar_type?: string | null
          avatar_url?: string | null
          bio?: string | null
          course?: string | null
          created_at?: string
          exam_goal?: string | null
          favorite_subject?: string | null
          full_name?: string | null
          id: string
          institution?: string | null
          onboarding_completed?: boolean
          preferred_difficulty?: string | null
          preferred_question_count?: number | null
          study_level?: string | null
          subjects?: string[] | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          age?: number | null
          avatar_type?: string | null
          avatar_url?: string | null
          bio?: string | null
          course?: string | null
          created_at?: string
          exam_goal?: string | null
          favorite_subject?: string | null
          full_name?: string | null
          id?: string
          institution?: string | null
          onboarding_completed?: boolean
          preferred_difficulty?: string | null
          preferred_question_count?: number | null
          study_level?: string | null
          subjects?: string[] | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          correct_option: string
          created_at: string
          difficulty: string | null
          explanation: string | null
          id: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          position: number
          question_text: string
          source_reference: string | null
          test_id: string
          topic: string | null
        }
        Insert: {
          correct_option: string
          created_at?: string
          difficulty?: string | null
          explanation?: string | null
          id?: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          position?: number
          question_text: string
          source_reference?: string | null
          test_id: string
          topic?: string | null
        }
        Update: {
          correct_option?: string
          created_at?: string
          difficulty?: string | null
          explanation?: string | null
          id?: string
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          position?: number
          question_text?: string
          source_reference?: string | null
          test_id?: string
          topic?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      test_attempts: {
        Row: {
          accuracy: number | null
          completed_at: string | null
          correct_count: number
          current_question: number
          id: string
          last_activity_at: string
          option_orders: Json
          question_order: Json
          score: number | null
          started_at: string
          status: string
          test_id: string
          time_taken_seconds: number | null
          unanswered_count: number
          user_id: string
          wrong_count: number
        }
        Insert: {
          accuracy?: number | null
          completed_at?: string | null
          correct_count?: number
          current_question?: number
          id?: string
          last_activity_at?: string
          option_orders?: Json
          question_order?: Json
          score?: number | null
          started_at?: string
          status?: string
          test_id: string
          time_taken_seconds?: number | null
          unanswered_count?: number
          user_id: string
          wrong_count?: number
        }
        Update: {
          accuracy?: number | null
          completed_at?: string | null
          correct_count?: number
          current_question?: number
          id?: string
          last_activity_at?: string
          option_orders?: Json
          question_order?: Json
          score?: number | null
          started_at?: string
          status?: string
          test_id?: string
          time_taken_seconds?: number | null
          unanswered_count?: number
          user_id?: string
          wrong_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "test_attempts_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      tests: {
        Row: {
          created_at: string
          description: string | null
          difficulty: string
          document_id: string | null
          id: string
          question_count: number
          status: string
          subject: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty?: string
          document_id?: string | null
          id?: string
          question_count?: number
          status?: string
          subject?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty?: string
          document_id?: string | null
          id?: string
          question_count?: number
          status?: string
          subject?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tests_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      leaderboard_stats: {
        Row: {
          average_accuracy: number | null
          best_accuracy: number | null
          best_accuracy_attempts: number | null
          best_achieved_at: string | null
          best_score: number | null
          questions_answered: number | null
          tests_completed: number | null
          total_correct: number | null
          total_wrong: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_leaderboard: {
        Args: { _limit?: number; _offset?: number; _scope?: string }
        Returns: {
          avatar_url: string
          average_accuracy: number
          best_accuracy: number
          full_name: string
          questions_answered: number
          rank: number
          study_level: string
          tests_completed: number
          user_id: string
          username: string
        }[]
      }
      get_my_stats: {
        Args: never
        Returns: {
          average_accuracy: number
          best_accuracy: number
          best_score: number
          questions_answered: number
          tests_completed: number
          total_correct: number
          total_wrong: number
        }[]
      }
      respond_friend_request: {
        Args: { _accept: boolean; _request_id: string }
        Returns: undefined
      }
      search_users: {
        Args: { _limit?: number; _q: string }
        Returns: {
          avatar_url: string
          course: string
          full_name: string
          id: string
          relation: string
          study_level: string
          username: string
        }[]
      }
      submit_attempt: {
        Args: { _attempt_id: string }
        Returns: {
          accuracy: number | null
          completed_at: string | null
          correct_count: number
          current_question: number
          id: string
          last_activity_at: string
          option_orders: Json
          question_order: Json
          score: number | null
          started_at: string
          status: string
          test_id: string
          time_taken_seconds: number | null
          unanswered_count: number
          user_id: string
          wrong_count: number
        }
        SetofOptions: {
          from: "*"
          to: "test_attempts"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      username_available: { Args: { _username: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
