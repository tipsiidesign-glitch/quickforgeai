import { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
};

export function StatCard({ label, value, icon, loading }: Props) {
  return (
    <div className="surface-card min-w-[150px] flex-1 p-4 sm:p-5">
      <div className="flex items-center gap-3">
        {icon ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          {loading ? (
            <Skeleton className="mt-1 h-6 w-16" />
          ) : (
            <p className="text-xl font-bold text-foreground sm:text-2xl">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
}
