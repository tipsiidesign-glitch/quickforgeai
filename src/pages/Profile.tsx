import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { UserAvatar } from "@/components/common/UserAvatar";
import { StatCard } from "@/components/common/StatCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { BUILTIN_AVATARS, BUILTIN_PREFIX } from "@/lib/avatars";
import { formatAccuracy } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Check, Loader2, Target, Trophy, UserPlus, Users, BookOpen } from "lucide-react";

type SearchResult = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  study_level: string | null;
  course: string | null;
  relation: string;
};

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [institution, setInstitution] = useState("");
  const [course, setCourse] = useState("");
  const [avatar, setAvatar] = useState("");
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState<{ tests_completed: number; average_accuracy: number; best_accuracy: number } | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [friends, setFriends] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!profile) return;
    setFullName(profile.full_name ?? "");
    setBio(profile.bio ?? "");
    setInstitution(profile.institution ?? "");
    setCourse(profile.course ?? "");
    setAvatar(profile.avatar_url ?? "");
  }, [profile]);

  const loadFriends = async () => {
    if (!user) return;
    const { data: links } = await supabase.from("friendships").select("friend_id");
    const ids = (links ?? []).map((l) => l.friend_id);
    if (ids.length === 0) return setFriends([]);
    const { data } = await supabase.from("profiles").select("id, username, full_name, avatar_url, study_level, course").in("id", ids);
    setFriends(((data ?? []) as SearchResult[]).map((f) => ({ ...f, relation: "friend" })));
  };

  useEffect(() => {
    supabase.rpc("get_my_stats").then(({ data }) => setStats((data?.[0] as typeof stats) ?? null));
    loadFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (query.trim().length < 2) return setResults([]);
    let cancelled = false;
    setSearching(true);
    const timer = setTimeout(async () => {
      const { data } = await supabase.rpc("search_users", { _q: query.trim(), _limit: 10 });
      if (!cancelled) { setResults((data as SearchResult[]) ?? []); setSearching(false); }
    }, 350);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [query]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        bio: bio.trim() || null,
        institution: institution.trim() || null,
        course: course.trim() || null,
        avatar_url: avatar || null,
      })
      .eq("id", user.id);
    setSaving(false);
    if (error) return toast.error("We couldn't save your profile.");
    await refreshProfile();
    toast.success("Profile updated.");
  };

  const sendRequest = async (receiverId: string) => {
    if (!user) return;
    const { error } = await supabase.from("friend_requests").insert({ sender_id: user.id, receiver_id: receiverId });
    if (error) return toast.error("Request already sent or not allowed.");
    toast.success("Friend request sent.");
    setResults((prev) => prev.map((r) => (r.id === receiverId ? { ...r, relation: "pending" } : r)));
  };

  return (
    <AppShell title="Profile">
      <div className="flex flex-wrap items-center gap-4">
        <UserAvatar name={profile?.full_name} avatarUrl={profile?.avatar_url} size="xl" />
        <div>
          <h2 className="text-2xl font-bold">{profile?.full_name ?? "Your profile"}</h2>
          <p className="text-sm text-muted-foreground">@{profile?.username} · {profile?.study_level}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <StatCard label="Tests completed" value={stats?.tests_completed ?? 0} icon={<BookOpen className="h-4 w-4" />} />
        <StatCard label="Average accuracy" value={formatAccuracy(stats?.average_accuracy)} icon={<Target className="h-4 w-4" />} />
        <StatCard label="Best accuracy" value={formatAccuracy(stats?.best_accuracy)} icon={<Trophy className="h-4 w-4" />} />
      </div>

      <section className="surface-card mt-8 space-y-5 p-6">
        <h3 className="text-lg font-semibold">Edit profile</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full name</Label>
            <Input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="institution-field">Institution</Label>
            <Input id="institution-field" value={institution} onChange={(e) => setInstitution(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course-field">Course</Label>
            <Input id="course-field" value={course} onChange={(e) => setCourse(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio-field">Bio</Label>
          <Textarea id="bio-field" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} maxLength={200} />
        </div>
        <div className="space-y-2">
          <Label>Avatar</Label>
          <div className="grid grid-cols-5 gap-3 sm:grid-cols-7">
            {BUILTIN_AVATARS.map((a) => {
              const value = `${BUILTIN_PREFIX}${a.id}`;
              const active = avatar === value;
              return (
                <button key={a.id} type="button" aria-label={a.label} aria-pressed={active} onClick={() => setAvatar(value)}
                  className={cn("relative rounded-full ring-2 ring-offset-2 ring-offset-background transition hover:scale-105", active ? "ring-primary" : "ring-transparent")}>
                  <img src={a.src} alt="" loading="lazy" className="h-14 w-14 rounded-full bg-muted object-cover" />
                  {active ? <Check className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary p-0.5 text-primary-foreground" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>

        </div>
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> : null} Save changes
        </Button>
      </section>

      <section className="surface-card mt-6 space-y-4 p-6">
        <h3 className="text-lg font-semibold">Find friends</h3>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by username or name"
          aria-label="Search users"
        />
        {searching ? <p className="text-sm text-muted-foreground">Searching…</p> : null}
        <ul className="space-y-3">
          {results.filter((r) => r.id !== user?.id).map((r) => (
            <li key={r.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
              <UserAvatar name={r.full_name} avatarUrl={r.avatar_url} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{r.full_name ?? r.username}</p>
                <p className="truncate text-xs text-muted-foreground">@{r.username}{r.course ? ` · ${r.course}` : ""}</p>
              </div>
              {r.relation === "friend" ? (
                <span className="text-xs font-medium text-success">Friends</span>
              ) : r.relation === "pending" ? (
                <span className="text-xs text-muted-foreground">Pending</span>
              ) : (
                <Button size="sm" variant="outline" onClick={() => sendRequest(r.id)}>
                  <UserPlus className="mr-1 h-4 w-4" aria-hidden="true" /> Add
                </Button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold">Your friends</h3>
        {friends.length === 0 ? (
          <div className="mt-3">
            <EmptyState icon={<Users className="h-6 w-6" aria-hidden="true" />} title="No friends yet" description="Search above to send your first friend request." />
          </div>
        ) : (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {friends.map((f) => (
              <li key={f.id} className="surface-card flex items-center gap-3 p-4">
                <UserAvatar name={f.full_name} avatarUrl={f.avatar_url} />
                <div className="min-w-0">
                  <p className="truncate font-medium">{f.full_name ?? f.username}</p>
                  <p className="truncate text-xs text-muted-foreground">@{f.username}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AppShell>
  );
}