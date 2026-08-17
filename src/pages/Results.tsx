import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/common/StatCard";
import { cn } from "@/lib/utils";
import { formatAccuracy, formatDuration } from "@/lib/format";
import type { Tables } from "@/integrations/supabase/types";
import { CheckCircle2, Clock, Sparkles, Target, XCircle, Loader2 } from "lucide-react";

type Question = Tables<"questions">;
type Answer = Tables<"attempt_answers">;
type Explanation = {
  explanation?: string;
  why_user_is_wrong?: string;
  why_correct_is_right?: string;
  memory_tip?: string;
};

const LETTERS = { a: "A", b: "B", c: "C", d: "D" } as const;

function textOf(q: Question, key?: string | null) {
  if (!key) return null;
  return ({ a: q.option_a, b: q.option_b, c: q.option_c, d: q.option_d } as Record<string, string>)[key] ?? null;
}

export default function Results() {
  const { attemptId } = useParams<{ attemptId: string }>();
  const [attempt, setAttempt] = useState<Tables<"test_attempts"> | null>(null);
  const [test, setTest] = useState<Tables<"tests"> | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [explanations, setExplanations] = useState<Record<string, Explanation>>({});
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!attemptId) return;
      const { data: attemptRow } = await supabase.from("test_attempts").select("*").eq("id", attemptId).maybeSingle();
      if (!attemptRow) { setLoading(false); return; }
      const [{ data: testRow }, { data: questionRows }, { data: answerRows }] = await Promise.all([
        supabase.from("tests").select("*").eq("id", attemptRow.test_id).maybeSingle(),
        supabase.from("questions").select("*").eq("test_id", attemptRow.test_id).order("position"),
        supabase.from("attempt_answers").select("*").eq("attempt_id", attemptRow.id),
      ]);
      setAttempt(attemptRow);
      setTest(testRow ?? null);
      setQuestions(questionRows ?? []);
      setAnswers(answerRows ?? []);
      setLoading(false);
    })();
  }, [attemptId]);

  const explain = async (question: Question, userAnswer: string | null) => {
    setBusyId(question.id);
    const { data, error } = await supabase.functions.invoke("explain-answer", {
      body: { question_id: question.id, user_answer: userAnswer },
    });
    setBusyId(null);
    if (error) return toast.error("We couldn't generate an explanation right now.");
    setExplanations((prev) => ({ ...prev, [question.id]: (data?.explanation ?? data) as Explanation }));
  };

  if (loading) {
    return <AppShell title="Results"><Skeleton className="h-64 w-full rounded-2xl" /></AppShell>;
  }
  if (!attempt) {
    return <AppShell title="Results"><p className="text-sm text-muted-foreground">We couldn't find that attempt.</p></AppShell>;
  }

  const answerFor = (qid: string) => answers.find((a) => a.question_id === qid) ?? null;
  const wrong = questions.filter((q) => {
    const a = answerFor(q.id);
    return !a || a.selected_option !== q.correct_option;
  });

  return (
    <AppShell title="Results">
      <h2 className="text-2xl font-bold">{test?.title ?? "Test results"}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{test?.subject} · {questions.length} questions</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <StatCard label="Accuracy" value={formatAccuracy(attempt.accuracy)} icon={<Target className="h-4 w-4" />} />
        <StatCard label="Correct" value={attempt.correct_count} icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard label="Wrong" value={attempt.wrong_count} icon={<XCircle className="h-4 w-4" />} />
        <StatCard label="Time" value={formatDuration(attempt.time_taken_seconds)} icon={<Clock className="h-4 w-4" />} />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild><Link to={`/test/${attempt.test_id}`}>Retake test</Link></Button>
        <Button asChild variant="outline"><Link to="/dashboard">Back to dashboard</Link></Button>
      </div>

      <h3 className="mt-10 text-lg font-semibold">Review {wrong.length ? `· ${wrong.length} to improve` : "· perfect score"}</h3>
      <ul className="mt-4 space-y-4">
        {questions.map((q) => {
          const answer = answerFor(q.id);
          const isCorrect = answer?.selected_option === q.correct_option;
          const ex = explanations[q.id];
          return (
            <li key={q.id} className="surface-card p-5">
              <div className="flex items-start gap-3">
                <span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full", isCorrect ? "bg-success-soft text-success" : "bg-error-soft text-destructive")}>
                  {isCorrect ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : <XCircle className="h-4 w-4" aria-hidden="true" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{q.question_text}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your answer:{" "}
                    <span className={isCorrect ? "text-success" : "text-destructive"}>
                      {answer?.selected_option ? `${LETTERS[answer.selected_option as keyof typeof LETTERS]}. ${textOf(q, answer.selected_option)}` : "Not answered"}
                    </span>
                  </p>
                  {!isCorrect ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Correct answer: <span className="text-success">{LETTERS[q.correct_option as keyof typeof LETTERS]}. {textOf(q, q.correct_option)}</span>
                    </p>
                  ) : null}
                  {q.explanation ? <p className="mt-2 text-sm text-muted-foreground">{q.explanation}</p> : null}

                  {!isCorrect ? (
                    ex ? (
                      <div className="mt-3 space-y-2 rounded-xl bg-accent p-4 text-sm text-accent-foreground">
                        {ex.why_user_is_wrong ? <p><span className="font-semibold">Why your answer misses: </span>{ex.why_user_is_wrong}</p> : null}
                        {ex.why_correct_is_right ? <p><span className="font-semibold">Why the correct answer works: </span>{ex.why_correct_is_right}</p> : null}
                        {ex.explanation && !ex.why_correct_is_right ? <p>{ex.explanation}</p> : null}
                        {ex.memory_tip ? <p><span className="font-semibold">Memory tip: </span>{ex.memory_tip}</p> : null}
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" className="mt-3" disabled={busyId === q.id} onClick={() => explain(q, answer?.selected_option ?? null)}>
                        {busyId === q.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />}
                        Explain with AI
                      </Button>
                    )
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}