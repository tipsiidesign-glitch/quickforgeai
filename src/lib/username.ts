export function slugifyUsername(raw: string) {
  return raw
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9_]+/g, "")
    .slice(0, 20);
}

export function suggestUsernames(fullName: string) {
  const parts = fullName.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return [];
  const base = slugifyUsername(parts.join(""));
  const underscored = slugifyUsername(parts.join("_"));
  const numbered = `${base}${Math.floor(Math.random() * 90) + 10}`;
  return Array.from(new Set([base, underscored, numbered].filter((u) => u.length >= 3)));
}
