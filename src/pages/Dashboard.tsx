import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/common/EmptyState";
import { StatCard } from "@/components/common/StatCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { firstName, formatAccuracy, formatRelativeDate, greeting } from "@/lib/format";
import { BookOpen, FileUp, Plus, Target, Trophy, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Test = Tables<"tests">;
type Stats = {
  tests_completed: number;
  average_accuracy: number;
  best_accuracy: number;
  questions_answered: number;
};

export default function Dashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [{ data: testRows }, { data: statRows }] = await Promise.all([
      supabase.from("tests").select("*").order("created_at", { ascending: false }),
      supabase.rpc("get_my_stats"),
    ]);
    setTests(testRows ?? []);
    setStats((statRows?.[0] as Stats) ?? null);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    const { error } = await supabase.from("tests").delete().eq("id", id);
    if (error) return toast.error("We couldn't delete that test.");
    setTests((prev) => prev.filter((t) => t.id !== id));
    toast.success("Test deleted.");
  };

  return (
    <AppShell title="Dashboard">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{greeting()}, {firstName(profile?.full_name)}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Your personal library of AI-generated practice tests.</p>
        </div>
        <Button onClick={() => navigate("/upload")}>
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> New test
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <StatCard label="Tests completed" value={stats?.tests_completed ?? 0} icon={<BookOpen className="h-4 w-4" />} loading={loading} />
        <StatCard label="Average accuracy" value={formatAccuracy(stats?.average_accuracy)} icon={<Target className="h-4 w-4" />} loading={loading} />
        <StatCard label="Best accuracy" value={formatAccuracy(stats?.best_accuracy)} icon={<Trophy className="h-4 w-4" />} loading={loading} />
        <StatCard label="Questions answered" value={stats?.questions_answered ?? 0} icon={<FileUp className="h-4 w-4" />} loading={loading} />
      </div>

      <h3 className="mt-10 text-lg font-semibold">Your tests</h3>
      {loading ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => <Skeleton key={i} className="h-36 rounded-2xl" />)}
        </div>
      ) : tests.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            icon={<FileUp className="h-6 w-6" aria-hidden="true" />}
            title="No tests yet"
            description="Upload your notes, slides or a PDF and we'll turn them into a practice test."
            action={<Button onClick={() => navigate("/upload")}>Upload study material</Button>}
          />
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <li key={test.id} className="surface-card flex flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">{test.subject ?? "General"}</span>
                <button type="button" aria-label={`Delete ${test.title}`} onClick={() => remove(test.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <h4 className="mt-3 line-clamp-2 font-semibold">{test.title}</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                {test.question_count} questions · {test.difficulty} · {formatRelativeDate(test.created_at)}
              </p>
              <Button asChild className="mt-4 w-full">
                <Link to={`/test/${test.id}`}>Start test</Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
