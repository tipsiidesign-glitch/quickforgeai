import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BrandLogo } from "@/components/common/BrandLogo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { cn } from "@/lib/utils";
import { shuffle, OPTION_KEYS, type OptionKey } from "@/lib/shuffle";
import { formatDuration } from "@/lib/format";
import { isSoundEnabled, playFeedback, setSoundEnabled } from "@/lib/sound";
import type { Tables } from "@/integrations/supabase/types";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Volume2, VolumeX, XCircle } from "lucide-react";

type Question = Tables<"questions">;
type Attempt = Tables<"test_attempts">;

function optionText(q: Question, key: OptionKey) {
  return { a: q.option_a, b: q.option_b, c: q.option_c, d: q.option_d }[key];
}

export default function TestRunner() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [optionOrders, setOptionOrders] = useState<Record<string, OptionKey[]>>({});
  const [answers, setAnswers] = useState<Record<string, OptionKey>>({});
  const [locked, setLocked] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<OptionKey | null>(null);
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [sound, setSound] = useState(true);

  useEffect(() => { setSound(isSoundEnabled()); }, []);

  const start = useCallback(async () => {
    if (!testId || !user) return;
    const [{ data: testRow }, { data: questionRows }] = await Promise.all([
      supabase.from("tests").select("*").eq("id", testId).maybeSingle(),
      supabase.from("questions").select("*").eq("test_id", testId).order("position"),
    ]);
    if (!testRow || !questionRows?.length) {
      toast.error("We couldn't load that test.");
      navigate("/dashboard", { replace: true });
      return;
    }
    setQuestions(questionRows);

    // Resume an in-progress attempt if one exists.
    const { data: existing } = await supabase
      .from("test_attempts")
      .select("*")
      .eq("test_id", testRow.id)
      .eq("user_id", user.id)
      .eq("status", "in_progress")
      .order("started_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing && Array.isArray(existing.question_order) && existing.question_order.length) {
      const resumedOrder = existing.question_order as string[];
      setAttempt(existing);
      setOrder(resumedOrder);
      setOptionOrders((existing.option_orders ?? {}) as Record<string, OptionKey[]>);
      const { data: saved } = await supabase
        .from("attempt_answers")
        .select("*")
        .eq("attempt_id", existing.id);
      const answerMap: Record<string, OptionKey> = {};
      const lockMap: Record<string, boolean> = {};
      (saved ?? []).forEach((a) => {
        if (a.selected_option) answerMap[a.question_id] = a.selected_option as OptionKey;
        lockMap[a.question_id] = true;
      });
      setAnswers(answerMap);
      setLocked(lockMap);
      const next = resumedOrder.findIndex((qid) => !lockMap[qid]);
      setIndex(next === -1 ? resumedOrder.length - 1 : next);
      setElapsed(Math.max(0, Math.floor((Date.now() - new Date(existing.started_at).getTime()) / 1000)));
      setLoading(false);
      toast.info("Resumed your test where you left off.");
      return;
    }

    const questionOrder = shuffle(questionRows.map((q) => q.id));
    const opts: Record<string, OptionKey[]> = {};
    questionRows.forEach((q) => { opts[q.id] = shuffle([...OPTION_KEYS]); });

    const { data: created, error } = await supabase
      .from("test_attempts")
      .insert({
        user_id: user.id,
        test_id: testRow.id,
        question_order: questionOrder,
        option_orders: opts,
        status: "in_progress",
      })
      .select()
      .single();
    if (error || !created) {
      toast.error("We couldn't start this test.");
      navigate("/dashboard", { replace: true });
      return;
    }
    setAttempt(created);
    setOrder(questionOrder);
    setOptionOrders(opts);
    setLoading(false);
  }, [testId, user, navigate]);

  useEffect(() => { start(); }, [start]);

  useEffect(() => {
    if (loading) return;
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [loading]);

  const byId = useMemo(() => Object.fromEntries(questions.map((q) => [q.id, q])), [questions]);
  const currentId = order[index];
  const current = currentId ? byId[currentId] : null;
  const answeredCount = Object.keys(locked).length;
  const isLocked = currentId ? !!locked[currentId] : false;
  const chosen = currentId ? (locked[currentId] ? answers[currentId] ?? null : selected) : null;
  const isLast = index === order.length - 1;

  useEffect(() => { setSelected(null); }, [index]);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, order.length - 1));
  }, [order.length]);

  const submitAnswer = async () => {
    if (!attempt || !current || !selected || isLocked) return;
    setSaving(true);
    const correct = selected === current.correct_option;
    const { error } = await supabase.from("attempt_answers").upsert(
      {
        attempt_id: attempt.id,
        question_id: current.id,
        selected_option: selected,
        is_correct: correct,
      },
      { onConflict: "attempt_id,question_id" },
    );
    setSaving(false);
    if (error) {
      toast.error("We couldn't save that answer. Please try again.");
      return;
    }
    setAnswers((prev) => ({ ...prev, [current.id]: selected }));
    setLocked((prev) => ({ ...prev, [current.id]: true }));
    playFeedback(correct ? "correct" : "wrong");
    if (!correct) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
    void supabase
      .from("test_attempts")
      .update({ current_question: index, last_activity_at: new Date().toISOString(), time_taken_seconds: elapsed })
      .eq("id", attempt.id);
    if (!isLast) setTimeout(goNext, correct ? 900 : 1600);
  };

  const finish = async () => {
    if (!attempt) return;
    setSubmitting(true);
    const unanswered = order.filter((qid) => !locked[qid]);
    if (unanswered.length) {
      await supabase.from("attempt_answers").upsert(
        unanswered.map((qid) => ({
          attempt_id: attempt.id,
          question_id: qid,
          selected_option: null,
          is_correct: null,
        })),
        { onConflict: "attempt_id,question_id" },
      );
    }
    await supabase.from("test_attempts").update({ time_taken_seconds: elapsed, current_question: index }).eq("id", attempt.id);
    const { error } = await supabase.rpc("submit_attempt", { _attempt_id: attempt.id });
    setSubmitting(false);
    if (error) return toast.error("We couldn't submit your test. Please try again.");
    navigate(`/results/${attempt.id}`, { replace: true });
  };

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    setSoundEnabled(next);
  };

  if (loading || !current) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-6 h-64 w-full rounded-2xl" />
      </main>
    );
  }

  const progress = ((index + 1) / order.length) * 100;

  return (
    <main className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Exit
          </Button>
          <BrandLogo className="hidden text-sm sm:flex" />
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium tabular-nums text-muted-foreground">{formatDuration(elapsed)}</span>
            <Button variant="ghost" size="icon" onClick={toggleSound} aria-label={sound ? "Mute answer sounds" : "Unmute answer sounds"}>
              {sound ? <Volume2 className="h-5 w-5" aria-hidden="true" /> : <VolumeX className="h-5 w-5" aria-hidden="true" />}
            </Button>
            <ThemeToggle />
          </div>
        </div>
        <div className="h-1 w-full bg-muted">
          <div className="h-1 bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-sm text-muted-foreground">
          Question {index + 1} of {order.length} · {answeredCount} answered
        </p>
        <h1 className="mt-2 text-xl font-semibold leading-snug">{current.question_text}</h1>

        <ul className={cn("mt-6 space-y-3", shake && "animate-shake")}>
          {(optionOrders[current.id] ?? OPTION_KEYS).map((key, i) => {
            const active = chosen === key;
            const isCorrectOption = key === current.correct_option;
            const revealed = isLocked;
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => !isLocked && setSelected(key)}
                  disabled={isLocked}
                  aria-pressed={active}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors",
                    revealed && isCorrectOption && "border-success bg-success-soft",
                    revealed && active && !isCorrectOption && "border-destructive bg-error-soft",
                    revealed && !isCorrectOption && !active && "border-border bg-card opacity-70",
                    !revealed && (active ? "border-primary bg-accent" : "border-border bg-card hover:bg-muted"),
                    revealed && active && "animate-pop",
                  )}
                >
                  <span className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                    revealed && isCorrectOption ? "bg-success text-success-foreground"
                      : revealed && active ? "bg-destructive text-destructive-foreground"
                      : active ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}>
                    {revealed && isCorrectOption ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      : revealed && active ? <XCircle className="h-4 w-4" aria-hidden="true" />
                      : String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm">{optionText(current, key)}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {isLocked ? (
          <div
            role="status"
            className={cn(
              "mt-5 rounded-2xl p-4 text-sm",
              answers[current.id] === current.correct_option
                ? "bg-success-soft text-success"
                : "bg-error-soft text-destructive",
            )}
          >
            <p className="font-semibold">
              {answers[current.id] === current.correct_option ? "Correct!" : "Not quite."}
            </p>
            {current.explanation ? <p className="mt-1 text-foreground/80">{current.explanation}</p> : null}
          </div>
        ) : null}

        <div className="mt-8 flex items-center gap-3">
          <Button variant="outline" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
            <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Previous
          </Button>
          {!isLocked ? (
            <Button className="flex-1" disabled={!selected || saving} onClick={submitAnswer}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> : null}
              Submit answer
            </Button>
          ) : !isLast ? (
            <Button className="flex-1" onClick={goNext}>
              Next question <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button className="flex-1" disabled={submitting} onClick={finish}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> : null}
              Finish test
            </Button>
          )}
          {isLast && !isLocked ? (
            <Button variant="outline" disabled={submitting} onClick={finish}>Finish</Button>
          ) : null}
        </div>
      </div>
    </main>
  );
}
