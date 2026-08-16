import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/common/EmptyState";
import { useAuth } from "@/hooks/useAuth";
import { FileUp } from "lucide-react";

export default function Dashboard() {
  const { profile } = useAuth();
  return (
    <AppShell title="Dashboard">
      <h2 className="text-2xl font-bold">Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}</h2>
      <p className="mt-1 text-sm text-muted-foreground">Upload study material to generate your first AI practice test.</p>
      <div className="mt-8">
        <EmptyState
          icon={<FileUp className="h-6 w-6" aria-hidden="true" />}
          title="No tests yet"
          description="Document upload and AI test generation are being wired up next."
        />
      </div>
    </AppShell>
  );
}
