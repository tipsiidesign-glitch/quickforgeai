import { cn } from "@/lib/utils";
import logoAsset from "@/assets/quickforge-logo.png.asset.json";

export function BrandLogo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2 font-bold tracking-tight", className)}>
      <img src={logoAsset.url} alt="QuickForge AI logo" className="h-8 w-8 rounded-xl" />
      <span className={inverted ? "text-brand-foreground" : "text-brand"}>QuickForge AI</span>
    </span>
  );
}