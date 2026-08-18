ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS correct_answer text,
  ADD COLUMN IF NOT EXISTS answer_source text NOT NULL DEFAULT 'ai_fallback',
  ADD COLUMN IF NOT EXISTS answer_confidence text NOT NULL DEFAULT 'medium',
  ADD COLUMN IF NOT EXISTS answer_source_title text,
  ADD COLUMN IF NOT EXISTS answer_source_url text;

ALTER TABLE public.documents
  ADD COLUMN IF NOT EXISTS processing_stage text,
  ADD COLUMN IF NOT EXISTS detected_question_count integer,
  ADD COLUMN IF NOT EXISTS document_mode text;

ALTER TABLE public.tests
  ADD COLUMN IF NOT EXISTS answers_from_document integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS answers_from_web integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS answers_from_ai integer NOT NULL DEFAULT 0;

CREATE UNIQUE INDEX IF NOT EXISTS attempt_answers_attempt_question_key
  ON public.attempt_answers (attempt_id, question_id);