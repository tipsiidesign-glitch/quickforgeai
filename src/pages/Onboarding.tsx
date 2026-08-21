import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BrandLogo } from "@/components/common/BrandLogo";
import { BUILTIN_AVATARS, BUILTIN_PREFIX } from "@/lib/avatars";
import { slugifyUsername, suggestUsernames } from "@/lib/username";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";

const LEVELS = ["High school", "Undergraduate", "Postgraduate", "Competitive exam", "Self learner"];
const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Economics",
  "History", "Geography", "Literature", "Law", "Medicine", "Business",
];
const DIFFICULTIES = ["easy", "medium", "hard", "mixed"] as const;
const COUNTS = [10, 15, 20, 30];

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameState, setUsernameState] = useState<"idle" | "checking" | "ok" | "taken">("idle");
  const [age, setAge] = useState("");
  const [studyLevel, setStudyLevel] = useState(LEVELS[1]);
  const [institution, setInstitution] = useState("");
  const [course, setCourse] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [favoriteSubject, setFavoriteSubject] = useState("");
  const [examGoal, setExamGoal] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(`${BUILTIN_PREFIX}${BUILTIN_AVATARS[0].id}`);
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>("medium");
  const [questionCount, setQuestionCount] = useState(15);

  useEffect(() => {
    if (profile?.onboarding_completed) navigate("/dashboard", { replace: true });
    if (profile?.full_name && !fullName) setFullName(profile.full_name);
    if (profile?.username && !username) setUsername(profile.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const suggestions = useMemo(() => suggestUsernames(fullName), [fullName]);

  useEffect(() => {
    if (username.length < 3) return setUsernameState("idle");
    let cancelled = false;
    setUsernameState("checking");
    const timer = setTimeout(async () => {
      const { data } = await supabase.rpc("username_available", { _username: username });
      if (!cancelled) setUsernameState(data ? "ok" : "taken");
    }, 400);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [username]);

  const toggleSubject = (subject: string) => {
    setSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]));
  };

  const next = () => {
    setError(null);
    if (step === 1) {
      if (fullName.trim().length < 2) return setError("Please enter your name.");
      if (username.length < 3) return setError("Choose a username with at least 3 characters.");
      if (usernameState === "taken") return setError("That username is taken. Try another.");
    }
    if (step === 2 && subjects.length === 0) return setError("Pick at least one subject.");
    setStep((s) => s + 1);
  };

  const finish = async () => {
    if (!user) return;
    setSaving(true);
    const { error: saveError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        username,
        age: age ? Number(age) : null,
        study_level: studyLevel,
        institution: institution.trim() || null,
        course: course.trim() || null,
        subjects,
        favorite_subject: favoriteSubject || subjects[0] || null,
        exam_goal: examGoal.trim() || null,
        bio: bio.trim() || null,
        avatar_url: avatar,
        avatar_type: "builtin",
        preferred_difficulty: difficulty,
        preferred_question_count: questionCount,
        onboarding_completed: true,
      })
      .eq("id", user.id);
    setSaving(false);
    if (saveError) {
      setError(saveError.message.includes("duplicate") ? "That username is taken." : "We couldn't save your profile.");
      return;
    }
    await refreshProfile();
    toast.success("Profile ready. Let's build your first test.");
    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-xl">
        <BrandLogo className="justify-center text-lg" />
        <div className="mt-6 flex items-center gap-2" aria-hidden="true">
          {[1, 2, 3].map((s) => (
            <span key={s} className={cn("h-1.5 flex-1 rounded-full", s <= step ? "bg-primary" : "bg-muted")} />
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">Step {step} of 3</p>

        <div className="surface-card mt-6 space-y-5 p-6 sm:p-8">
          {step === 1 ? (
            <>
              <h1 className="text-xl font-bold">Tell us about you</h1>
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Alex Kumar" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(slugifyUsername(e.target.value))}
                  placeholder="alexkumar"
                />
                {usernameState === "ok" ? <p className="text-xs text-success">Username available</p> : null}
                {usernameState === "taken" ? <p className="text-xs text-destructive">Already taken</p> : null}
                {suggestions.length && usernameState !== "ok" ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {suggestions.map((s) => (
                      <button key={s} type="button" onClick={() => setUsername(s)} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                        {s}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" min={10} max={99} value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Study level</Label>
                  <select id="level" value={studyLevel} onChange={(e) => setStudyLevel(e.target.value)} className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm">
                    {LEVELS.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input id="course" value={course} onChange={(e) => setCourse(e.target.value)} />
                </div>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <h1 className="text-xl font-bold">What are you studying?</h1>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSubject(s)}
                    aria-pressed={subjects.includes(s)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                      subjects.includes(s) ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="favorite">Favourite subject</Label>
                <select id="favorite" value={favoriteSubject} onChange={(e) => setFavoriteSubject(e.target.value)} className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm">
                  <option value="">Choose one</option>
                  {(subjects.length ? subjects : SUBJECTS).map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">Exam goal</Label>
                <Input id="goal" value={examGoal} onChange={(e) => setExamGoal(e.target.value)} placeholder="Final semester exams" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Short bio</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} maxLength={200} rows={3} />
              </div>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <h1 className="text-xl font-bold">Pick your avatar and defaults</h1>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
                {BUILTIN_AVATARS.map((a) => {
                  const value = `${BUILTIN_PREFIX}${a.id}`;
                  const active = avatar === value;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      aria-label={a.label}
                      aria-pressed={active}
                      onClick={() => setAvatar(value)}
                      className={cn("relative rounded-full ring-2 ring-offset-2 ring-offset-background transition hover:scale-105", active ? "ring-primary" : "ring-transparent")}
                    >
                      <img src={a.src} alt="" loading="lazy" className="h-14 w-14 rounded-full bg-muted object-cover" />
                      {active ? <Check className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary p-0.5 text-primary-foreground" aria-hidden="true" /> : null}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2">
                <Label>Default difficulty</Label>
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map((d) => (
                    <button key={d} type="button" onClick={() => setDifficulty(d)} aria-pressed={difficulty === d}
                      className={cn("rounded-full border px-3 py-1.5 text-sm capitalize", difficulty === d ? "border-primary bg-primary text-primary-foreground" : "border-border")}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Questions per test</Label>
                <div className="flex flex-wrap gap-2">
                  {COUNTS.map((c) => (
                    <button key={c} type="button" onClick={() => setQuestionCount(c)} aria-pressed={questionCount === c}
                      className={cn("rounded-full border px-3 py-1.5 text-sm", questionCount === c ? "border-primary bg-primary text-primary-foreground" : "border-border")}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : null}

          {error ? <p role="alert" className="rounded-lg bg-error-soft px-3 py-2 text-sm text-destructive">{error}</p> : null}

          <div className="flex gap-3 pt-2">
            {step > 1 ? <Button variant="outline" onClick={() => setStep((s) => s - 1)} className="flex-1">Back</Button> : null}
            {step < 3 ? (
              <Button onClick={next} className="flex-1">Continue</Button>
            ) : (
              <Button onClick={finish} disabled={saving} className="flex-1">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                Finish setup
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}