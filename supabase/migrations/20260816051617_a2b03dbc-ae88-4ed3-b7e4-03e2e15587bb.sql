
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  age INTEGER,
  study_level TEXT,
  course TEXT,
  institution TEXT,
  favorite_subject TEXT,
  subjects TEXT[] DEFAULT '{}',
  exam_goal TEXT,
  preferred_difficulty TEXT DEFAULT 'mixed',
  preferred_question_count INTEGER DEFAULT 20,
  avatar_type TEXT DEFAULT 'builtin',
  avatar_url TEXT,
  bio TEXT,
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles readable by authenticated" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX idx_profiles_username ON public.profiles (username);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.username_available(_username TEXT)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT NOT EXISTS (SELECT 1 FROM public.profiles WHERE lower(username) = lower(_username) AND id <> COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid));
$$;
GRANT EXECUTE ON FUNCTION public.username_available(TEXT) TO authenticated;

CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  storage_path TEXT,
  extracted_text TEXT,
  processing_status TEXT NOT NULL DEFAULT 'uploaded',
  processing_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own documents" ON public.documents FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_documents_user ON public.documents (user_id, created_at DESC);

CREATE TABLE public.tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  subject TEXT,
  description TEXT,
  question_count INTEGER NOT NULL DEFAULT 0,
  difficulty TEXT NOT NULL DEFAULT 'mixed',
  status TEXT NOT NULL DEFAULT 'ready',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tests TO authenticated;
GRANT ALL ON public.tests TO service_role;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own tests" ON public.tests FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER tests_updated BEFORE UPDATE ON public.tests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX idx_tests_user ON public.tests (user_id);
CREATE INDEX idx_tests_created ON public.tests (created_at DESC);

CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option TEXT NOT NULL CHECK (correct_option IN ('a','b','c','d')),
  explanation TEXT,
  difficulty TEXT,
  topic TEXT,
  source_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.questions TO authenticated;
GRANT ALL ON public.questions TO service_role;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "questions of own tests" ON public.questions FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.tests t WHERE t.id = questions.test_id AND t.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.tests t WHERE t.id = questions.test_id AND t.user_id = auth.uid()));
CREATE INDEX idx_questions_test ON public.questions (test_id);

CREATE TABLE public.test_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'in_progress',
  current_question INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  time_taken_seconds INTEGER,
  correct_count INTEGER NOT NULL DEFAULT 0,
  wrong_count INTEGER NOT NULL DEFAULT 0,
  unanswered_count INTEGER NOT NULL DEFAULT 0,
  accuracy NUMERIC(5,2),
  score INTEGER,
  question_order JSONB NOT NULL DEFAULT '[]'::jsonb,
  option_orders JSONB NOT NULL DEFAULT '{}'::jsonb
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.test_attempts TO authenticated;
GRANT ALL ON public.test_attempts TO service_role;
ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own attempts" ON public.test_attempts FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_attempts_user ON public.test_attempts (user_id);
CREATE INDEX idx_attempts_test ON public.test_attempts (test_id);
CREATE INDEX idx_attempts_accuracy ON public.test_attempts (accuracy DESC);

CREATE TABLE public.attempt_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES public.test_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  selected_option TEXT,
  is_correct BOOLEAN,
  answered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (attempt_id, question_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.attempt_answers TO authenticated;
GRANT ALL ON public.attempt_answers TO service_role;
ALTER TABLE public.attempt_answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own attempt answers" ON public.attempt_answers FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.test_attempts a WHERE a.id = attempt_answers.attempt_id AND a.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.test_attempts a WHERE a.id = attempt_answers.attempt_id AND a.user_id = auth.uid()));
CREATE INDEX idx_attempt_answers_attempt ON public.attempt_answers (attempt_id);

CREATE TABLE public.answer_explanations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_answer TEXT,
  explanation JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (question_id, user_id, user_answer)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.answer_explanations TO authenticated;
GRANT ALL ON public.answer_explanations TO service_role;
ALTER TABLE public.answer_explanations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own explanations" ON public.answer_explanations FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.friend_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (sender_id <> receiver_id)
);
CREATE UNIQUE INDEX idx_friend_requests_pair ON public.friend_requests (sender_id, receiver_id);
CREATE INDEX idx_friend_requests_receiver ON public.friend_requests (receiver_id);
CREATE INDEX idx_friend_requests_sender ON public.friend_requests (sender_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.friend_requests TO authenticated;
GRANT ALL ON public.friend_requests TO service_role;
ALTER TABLE public.friend_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "see own requests" ON public.friend_requests FOR SELECT TO authenticated USING (auth.uid() IN (sender_id, receiver_id));
CREATE POLICY "send requests" ON public.friend_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "cancel own sent" ON public.friend_requests FOR DELETE TO authenticated USING (auth.uid() = sender_id);
CREATE TRIGGER friend_requests_updated BEFORE UPDATE ON public.friend_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (user_id <> friend_id),
  UNIQUE (user_id, friend_id)
);
GRANT SELECT, DELETE ON public.friendships TO authenticated;
GRANT ALL ON public.friendships TO service_role;
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "see own friendships" ON public.friendships FOR SELECT TO authenticated USING (auth.uid() IN (user_id, friend_id));
CREATE POLICY "remove own friendships" ON public.friendships FOR DELETE TO authenticated USING (auth.uid() IN (user_id, friend_id));
CREATE INDEX idx_friendships_user ON public.friendships (user_id);
CREATE INDEX idx_friendships_friend ON public.friendships (friend_id);

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  related_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  related_request_id UUID,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own notifications" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "update own notifications" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete own notifications" ON public.notifications FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX idx_notifications_user ON public.notifications (user_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.notify_friend_request()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE sender_name TEXT;
BEGIN
  SELECT COALESCE(full_name, username, 'Someone') INTO sender_name FROM public.profiles WHERE id = NEW.sender_id;
  INSERT INTO public.notifications (user_id, type, title, message, related_user_id, related_request_id)
  VALUES (NEW.receiver_id, 'friend_request', 'New friend request', COALESCE(sender_name,'Someone') || ' sent you a friend request.', NEW.sender_id, NEW.id);
  RETURN NEW;
END; $$;
CREATE TRIGGER on_friend_request AFTER INSERT ON public.friend_requests FOR EACH ROW EXECUTE FUNCTION public.notify_friend_request();

CREATE OR REPLACE FUNCTION public.respond_friend_request(_request_id UUID, _accept BOOLEAN)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE req public.friend_requests%ROWTYPE; me_name TEXT;
BEGIN
  SELECT * INTO req FROM public.friend_requests WHERE id = _request_id;
  IF req.id IS NULL THEN RAISE EXCEPTION 'Request not found'; END IF;
  IF req.receiver_id <> auth.uid() THEN RAISE EXCEPTION 'Not allowed'; END IF;
  IF req.status <> 'pending' THEN RETURN; END IF;

  UPDATE public.friend_requests SET status = CASE WHEN _accept THEN 'accepted' ELSE 'rejected' END WHERE id = _request_id;

  IF _accept THEN
    INSERT INTO public.friendships (user_id, friend_id) VALUES (req.sender_id, req.receiver_id) ON CONFLICT DO NOTHING;
    INSERT INTO public.friendships (user_id, friend_id) VALUES (req.receiver_id, req.sender_id) ON CONFLICT DO NOTHING;
    SELECT COALESCE(full_name, username, 'Someone') INTO me_name FROM public.profiles WHERE id = req.receiver_id;
    INSERT INTO public.notifications (user_id, type, title, message, related_user_id)
    VALUES (req.sender_id, 'friend_accepted', 'Friend request accepted', COALESCE(me_name,'Someone') || ' accepted your friend request.', req.receiver_id);
  END IF;
  UPDATE public.notifications SET is_read = true WHERE related_request_id = _request_id;
END; $$;
GRANT EXECUTE ON FUNCTION public.respond_friend_request(UUID, BOOLEAN) TO authenticated;

CREATE VIEW public.leaderboard_stats WITH (security_invoker = true) AS
SELECT
  a.user_id,
  MAX(a.accuracy) AS best_accuracy,
  ROUND(AVG(a.accuracy), 2) AS average_accuracy,
  COUNT(*)::int AS tests_completed,
  SUM(a.correct_count + a.wrong_count + a.unanswered_count)::int AS questions_answered,
  SUM(a.correct_count)::int AS total_correct,
  SUM(a.wrong_count)::int AS total_wrong,
  MAX(a.score)::int AS best_score,
  COUNT(*) FILTER (WHERE a.accuracy = (SELECT MAX(b.accuracy) FROM public.test_attempts b WHERE b.user_id = a.user_id AND b.status = 'completed'))::int AS best_accuracy_attempts,
  MIN(a.completed_at) FILTER (WHERE a.accuracy = (SELECT MAX(b.accuracy) FROM public.test_attempts b WHERE b.user_id = a.user_id AND b.status = 'completed')) AS best_achieved_at
FROM public.test_attempts a
WHERE a.status = 'completed'
GROUP BY a.user_id;

CREATE OR REPLACE FUNCTION public.get_leaderboard(_scope TEXT DEFAULT 'global', _limit INTEGER DEFAULT 20, _offset INTEGER DEFAULT 0)
RETURNS TABLE (
  rank BIGINT, user_id UUID, username TEXT, full_name TEXT, avatar_url TEXT, study_level TEXT,
  best_accuracy NUMERIC, average_accuracy NUMERIC, tests_completed INT, questions_answered INT
) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH base AS (
    SELECT
      a.user_id,
      MAX(a.accuracy) AS best_accuracy,
      ROUND(AVG(a.accuracy), 2) AS average_accuracy,
      COUNT(*)::int AS tests_completed,
      SUM(a.correct_count + a.wrong_count + a.unanswered_count)::int AS questions_answered,
      COUNT(*) FILTER (WHERE a.accuracy = (SELECT MAX(b.accuracy) FROM public.test_attempts b WHERE b.user_id = a.user_id AND b.status = 'completed'))::int AS best_accuracy_attempts,
      MIN(a.completed_at) FILTER (WHERE a.accuracy = (SELECT MAX(b.accuracy) FROM public.test_attempts b WHERE b.user_id = a.user_id AND b.status = 'completed')) AS best_achieved_at
    FROM public.test_attempts a
    WHERE a.status = 'completed'
    GROUP BY a.user_id
  ), scoped AS (
    SELECT s.* FROM base s
    WHERE _scope <> 'friends'
       OR s.user_id = auth.uid()
       OR EXISTS (SELECT 1 FROM public.friendships f WHERE f.user_id = auth.uid() AND f.friend_id = s.user_id)
  ), ranked AS (
    SELECT ROW_NUMBER() OVER (
      ORDER BY s.best_accuracy DESC NULLS LAST, s.best_accuracy_attempts ASC,
               s.average_accuracy DESC NULLS LAST, s.tests_completed DESC, s.best_achieved_at ASC
    ) AS rank, s.*
    FROM scoped s
  )
  SELECT r.rank, r.user_id, p.username, p.full_name, p.avatar_url, p.study_level,
         r.best_accuracy, r.average_accuracy, r.tests_completed, r.questions_answered
  FROM ranked r JOIN public.profiles p ON p.id = r.user_id
  ORDER BY r.rank
  LIMIT COALESCE(_limit, 20) OFFSET COALESCE(_offset, 0);
$$;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(TEXT, INTEGER, INTEGER) TO authenticated;

CREATE OR REPLACE FUNCTION public.get_my_stats()
RETURNS TABLE (
  best_accuracy NUMERIC, average_accuracy NUMERIC, tests_completed INT,
  questions_answered INT, total_correct INT, total_wrong INT, best_score INT
) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT
    MAX(a.accuracy),
    ROUND(AVG(a.accuracy), 2),
    COUNT(*)::int,
    SUM(a.correct_count + a.wrong_count + a.unanswered_count)::int,
    SUM(a.correct_count)::int,
    SUM(a.wrong_count)::int,
    MAX(a.score)::int
  FROM public.test_attempts a
  WHERE a.status = 'completed' AND a.user_id = auth.uid();
$$;
GRANT EXECUTE ON FUNCTION public.get_my_stats() TO authenticated;

CREATE OR REPLACE FUNCTION public.search_users(_q TEXT, _limit INTEGER DEFAULT 20)
RETURNS TABLE (id UUID, username TEXT, full_name TEXT, avatar_url TEXT, study_level TEXT, course TEXT, relation TEXT)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT p.id, p.username, p.full_name, p.avatar_url, p.study_level, p.course,
    CASE
      WHEN EXISTS (SELECT 1 FROM public.friendships f WHERE f.user_id = auth.uid() AND f.friend_id = p.id) THEN 'friends'
      WHEN EXISTS (SELECT 1 FROM public.friend_requests r WHERE r.sender_id = auth.uid() AND r.receiver_id = p.id AND r.status = 'pending') THEN 'requested'
      WHEN EXISTS (SELECT 1 FROM public.friend_requests r WHERE r.receiver_id = auth.uid() AND r.sender_id = p.id AND r.status = 'pending') THEN 'incoming'
      ELSE 'none'
    END AS relation
  FROM public.profiles p
  WHERE p.id <> auth.uid()
    AND p.onboarding_completed = true
    AND _q IS NOT NULL AND length(trim(_q)) > 0
    AND (p.username ILIKE '%' || _q || '%' OR p.full_name ILIKE '%' || _q || '%')
  ORDER BY p.username NULLS LAST
  LIMIT COALESCE(_limit, 20);
$$;
GRANT EXECUTE ON FUNCTION public.search_users(TEXT, INTEGER) TO authenticated;

CREATE OR REPLACE FUNCTION public.submit_attempt(_attempt_id UUID)
RETURNS public.test_attempts LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE att public.test_attempts%ROWTYPE; total INT; corr INT; ans INT;
BEGIN
  SELECT * INTO att FROM public.test_attempts WHERE id = _attempt_id;
  IF att.id IS NULL OR att.user_id <> auth.uid() THEN RAISE EXCEPTION 'Not allowed'; END IF;
  IF att.status = 'completed' THEN RETURN att; END IF;

  UPDATE public.attempt_answers aa
  SET is_correct = (aa.selected_option = q.correct_option)
  FROM public.questions q
  WHERE q.id = aa.question_id AND aa.attempt_id = _attempt_id;

  SELECT COUNT(*) INTO total FROM public.questions WHERE test_id = att.test_id;
  SELECT COUNT(*) FILTER (WHERE is_correct), COUNT(*) FILTER (WHERE selected_option IS NOT NULL)
    INTO corr, ans FROM public.attempt_answers WHERE attempt_id = _attempt_id;

  UPDATE public.test_attempts SET
    status = 'completed',
    completed_at = now(),
    last_activity_at = now(),
    time_taken_seconds = GREATEST(0, EXTRACT(EPOCH FROM (now() - started_at))::int),
    correct_count = COALESCE(corr,0),
    wrong_count = GREATEST(0, COALESCE(ans,0) - COALESCE(corr,0)),
    unanswered_count = GREATEST(0, total - COALESCE(ans,0)),
    accuracy = CASE WHEN total > 0 THEN ROUND((COALESCE(corr,0)::numeric * 100) / total, 2) ELSE 0 END,
    score = COALESCE(corr,0)
  WHERE id = _attempt_id
  RETURNING * INTO att;

  RETURN att;
END; $$;
GRANT EXECUTE ON FUNCTION public.submit_attempt(UUID) TO authenticated;

CREATE POLICY "own documents read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "own documents write" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "own documents delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "avatars readable" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'avatars');
CREATE POLICY "avatars own write" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "avatars own update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "avatars own delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
