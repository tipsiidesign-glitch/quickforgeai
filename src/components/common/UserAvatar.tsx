import { cn } from "@/lib/utils";
import { getBuiltinAvatar, initialsOf, isBuiltinAvatar } from "@/lib/avatars";

type Props = {
  name?: string | null;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-24 w-24 text-3xl",
};

export function UserAvatar({ name, avatarUrl, size = "md", className }: Props) {
  const builtin = getBuiltinAvatar(avatarUrl);
  const label = name ? `${name}'s avatar` : "User avatar";

  if (builtin) {
    return (
      <img
        src={builtin.src}
        alt={label}
        loading="lazy"
        className={cn("shrink-0 rounded-full bg-muted object-cover", sizes[size], className)}
      />
    );
  }


  if (avatarUrl && !isBuiltinAvatar(avatarUrl)) {
    return (
      <img
        src={avatarUrl}
        alt={label}
        loading="lazy"
        className={cn("shrink-0 rounded-full border border-border object-cover", sizes[size], className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground",
        sizes[size],
        className,
      )}
    >
      {initialsOf(name)}
    </div>
  );
}
