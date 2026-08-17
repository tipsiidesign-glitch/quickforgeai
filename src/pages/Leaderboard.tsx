import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/common/EmptyState";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { formatAccuracy } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

type Row = {
  user_id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  study_level: string | null;
  tests_completed: number;
  average_accuracy: number;
  best_accuracy: number;
  questions_answered: number;
  rank: number;
};

export default function Leaderboard() {
  const { user } = useAuth();
  const [scope, setScope] = useState<"global" | "friends">("global");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase.rpc("get_leaderboard", { _scope: scope, _limit: 50, _offset: 0 }).then(({ data }) => {
      setRows((data as Row[]) ?? []);
      setLoading(false);
    });
  }, [scope]);

  return (
    <AppShell title="Leaderboard">
      <h2 className="text-2xl font-bold">Leaderboard</h2>
      <p className="mt-1 text-sm text-muted-foreground">Ranked by accuracy first, then tests completed.</p>

      <Tabs value={scope} onValueChange={(v) => setScope(v as "global" | "friends")} className="mt-6">
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="mt-6 space-y-3">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-16 rounded-2xl" />)}</div>
      ) : rows.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={<Trophy className="h-6 w-6" aria-hidden="true" />}
            title={scope === "friends" ? "No friends ranked yet" : "No rankings yet"}
            description={scope === "friends" ? "Add friends from your profile to compare scores." : "Complete a test to appear on the leaderboard."}
          />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((row) => (
            <li
              key={row.user_id}
              className={cn("surface-card flex items-center gap-4 p-4", row.user_id === user?.id && "border-primary ring-1 ring-primary")}
            >
              <span className="w-8 shrink-0 text-center text-sm font-bold tabular-nums text-muted-foreground">#{row.rank}</span>
              <UserAvatar name={row.full_name} avatarUrl={row.avatar_url} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{row.full_name ?? row.username}</p>
                <p className="truncate text-xs text-muted-foreground">@{row.username} · {row.tests_completed} tests</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatAccuracy(row.average_accuracy)}</p>
                <p className="text-xs text-muted-foreground">best {formatAccuracy(row.best_accuracy)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}