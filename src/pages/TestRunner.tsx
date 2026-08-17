import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BrandLogo } from "@/components/common/BrandLogo";
import { cn } from "@/lib/utils";
import { shuffle, OPTION_KEYS, type OptionKey } from "@/lib/shuffle";
import { formatDuration } from "@/lib/format";
import type { Tables } from "@/integrations/supabase/types";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

type Question = Tables<"questions">;
type Attempt = Tables<"test_attempts">;

function optionText(q: Question, key: OptionKey) {
  return { a: q.option_a, b: q.option_b, c: q.option_c, d: q.option_d }[key];
}

export default function TestRunner() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [test, setTest] = useState<Tables<"tests"> | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [optionOrders, setOptionOrders] = useState<Record<string, OptionKey[]>>({});
  const [answers, setAnswers] = useState<Record<string, OptionKey>>({});
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
    setTest(testRow);
    setQuestions(questionRows);

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
  const answeredCount = Object.keys(answers).length;

  const select = (key: OptionKey) => {
    if (!currentId) return;
    setAnswers((prev) => ({ ...prev, [currentId]: key }));
  };

  const submit = async () => {
    if (!attempt) return;
    setSubmitting(true);
    const rows = order.map((qid) => ({
      attempt_id: attempt.id,
      question_id: qid,
      selected_option: answers[qid] ?? null,
      is_correct: answers[qid] ? answers[qid] === byId[qid].correct_option : null,
    }));
    const { error: insertError } = await supabase.from("attempt_answers").insert(rows);
    if (insertError) {
      setSubmitting(false);
      toast.error("We couldn't save your answers. Please try again.");
      return;
    }
    await supabase.from("test_attempts").update({ time_taken_seconds: elapsed, current_question: index }).eq("id", attempt.id);
    const { error } = await supabase.rpc("submit_attempt", { _attempt_id: attempt.id });
    setSubmitting(false);
    if (error) return toast.error("We couldn't submit your test. Please try again.");
    navigate(`/results/${attempt.id}`, { replace: true });
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
          <span className="text-sm font-medium tabular-nums text-muted-foreground">{formatDuration(elapsed)}</span>
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

        <ul className="mt-6 space-y-3">
          {(optionOrders[current.id] ?? OPTION_KEYS).map((key, i) => {
            const active = answers[current.id] === key;
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => select(key)}
                  aria-pressed={active}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors",
                    active ? "border-primary bg-accent" : "border-border bg-card hover:bg-muted",
                  )}
                >
                  <span className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                    active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm">{optionText(current, key)}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex items-center gap-3">
          <Button variant="outline" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
            <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" /> Previous
          </Button>
          {index < order.length - 1 ? (
            <Button className="flex-1" onClick={() => setIndex((i) => i + 1)}>
              Next <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button className="flex-1" disabled={submitting} onClick={submit}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> : null}
              Submit test
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}