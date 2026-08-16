import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function PrepzyLogo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2 font-bold tracking-tight", className)}>
      <span className={cn("flex h-8 w-8 items-center justify-center rounded-xl", inverted ? "bg-primary text-primary-foreground" : "bg-brand text-brand-foreground")}>
        <GraduationCap className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className={inverted ? "text-brand-foreground" : "text-brand"}>PREPZY AI</span>
    </span>
  );
}
