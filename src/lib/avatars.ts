export type BuiltinAvatar = {
  id: string;
  label: string;
  emoji: string;
  bg: string;
};

export const BUILTIN_AVATARS: BuiltinAvatar[] = [
  { id: "student-1", label: "Student", emoji: "🧑‍🎓", bg: "hsl(213 100% 94%)" },
  { id: "student-2", label: "Graduate", emoji: "👩‍🎓", bg: "hsl(150 55% 92%)" },
  { id: "student-3", label: "Scholar", emoji: "👨‍🎓", bg: "hsl(38 100% 93%)" },
  { id: "dev", label: "Developer", emoji: "🧑‍💻", bg: "hsl(214 40% 92%)" },
  { id: "scientist", label: "Scientist", emoji: "🔬", bg: "hsl(190 60% 92%)" },
  { id: "book", label: "Book learner", emoji: "📚", bg: "hsl(28 80% 92%)" },
  { id: "glasses", label: "Glasses student", emoji: "🤓", bg: "hsl(266 60% 94%)" },
  { id: "creative", label: "Creative", emoji: "🎨", bg: "hsl(340 70% 94%)" },
  { id: "teacher", label: "Academic", emoji: "🧑‍🏫", bg: "hsl(160 45% 92%)" },
  { id: "chem", label: "Lab student", emoji: "🧪", bg: "hsl(200 70% 93%)" },
  { id: "rocket", label: "Achiever", emoji: "🚀", bg: "hsl(220 60% 93%)" },
  { id: "brain", label: "Thinker", emoji: "🧠", bg: "hsl(0 75% 95%)" },
];

export const BUILTIN_PREFIX = "builtin:";

export function isBuiltinAvatar(url?: string | null) {
  return !!url && url.startsWith(BUILTIN_PREFIX);
}

export function getBuiltinAvatar(url?: string | null): BuiltinAvatar | null {
  if (!isBuiltinAvatar(url)) return null;
  const id = url!.slice(BUILTIN_PREFIX.length);
  return BUILTIN_AVATARS.find((a) => a.id === id) ?? null;
}

export function initialsOf(name?: string | null, fallback = "?") {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || fallback;
}