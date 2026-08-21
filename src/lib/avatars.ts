import a01 from "@/assets/avatars/avatar-01.png.asset.json";
import a02 from "@/assets/avatars/avatar-02.png.asset.json";
import a03 from "@/assets/avatars/avatar-03.png.asset.json";
import a04 from "@/assets/avatars/avatar-04.png.asset.json";
import a05 from "@/assets/avatars/avatar-05.png.asset.json";
import a06 from "@/assets/avatars/avatar-06.png.asset.json";
import a07 from "@/assets/avatars/avatar-07.png.asset.json";
import a08 from "@/assets/avatars/avatar-08.png.asset.json";
import a09 from "@/assets/avatars/avatar-09.png.asset.json";
import a10 from "@/assets/avatars/avatar-10.png.asset.json";
import a11 from "@/assets/avatars/avatar-11.png.asset.json";
import a12 from "@/assets/avatars/avatar-12.png.asset.json";
import a13 from "@/assets/avatars/avatar-13.png.asset.json";

export type BuiltinAvatar = {
  id: string;
  label: string;
  src: string;
};

export const BUILTIN_AVATARS: BuiltinAvatar[] = [
  { id: "avatar-01", label: "Green hoodie student", src: a01.url },
  { id: "avatar-02", label: "Long hair student", src: a02.url },
  { id: "avatar-03", label: "Beige hoodie student", src: a03.url },
  { id: "avatar-04", label: "Bun hairstyle student", src: a04.url },
  { id: "avatar-05", label: "Round glasses student", src: a05.url },
  { id: "avatar-06", label: "Wavy hair student", src: a06.url },
  { id: "avatar-07", label: "Navy shirt student", src: a07.url },
  { id: "avatar-08", label: "Black cap student", src: a08.url },
  { id: "avatar-09", label: "Denim jacket student", src: a09.url },
  { id: "avatar-10", label: "Pink sweater student", src: a10.url },
  { id: "avatar-11", label: "Curly hair student", src: a11.url },
  { id: "avatar-12", label: "Purple hoodie student", src: a12.url },
  { id: "avatar-13", label: "Backwards cap student", src: a13.url },
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
