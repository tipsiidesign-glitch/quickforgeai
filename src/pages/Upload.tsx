import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/lib/format";
import {
  ACCEPT_ATTRIBUTE, MAX_FILE_SIZE, extractTextFromFile, isModelReadable, isSupportedFile,
} from "@/lib/documentText";
import { AlertCircle, Check, FileUp, Loader2, Sparkles, X } from "lucide-react";

const DIFFICULTIES = ["easy", "medium", "hard", "mixed"] as const;

const STAGES = [
  { key: "extracting", label: "Reading your document" },
  { key: "detecting_questions", label: "Detecting questions" },
  { key: "detecting_answers", label: "Finding marked answers" },
  { key: "retrieving_answers", label: "Verifying missing answers" },
  { key: "validating", label: "Validating questions" },
  { key: "creating_test", label: "Building your test" },
  { key: "finalizing", label: "Finishing up" },
] as const;

type Summary = {
  test_id: string;
  question_count: number;
  title: string;
  mode: string;
  answers_from_document: number;
  answers_from_web: number;
  answers_from_ai: number;
};

export default function UploadPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(profile?.favorite_subject ?? "");
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>(
    (profile?.preferred_difficulty as (typeof DIFFICULTIES)[number]) ?? "mixed",
  );
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState<string>("");
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Poll the real processing stage recorded by the backend.
  useEffect(() => {
    if (!documentId || !busy) return;
    const timer = setInterval(async () => {
      const { data } = await supabase
        .from("documents")
        .select("processing_stage")
        .eq("id", documentId)
        .maybeSingle();
      if (data?.processing_stage) setStage(data.processing_stage);
    }, 1500);
    return () => clearInterval(timer);
  }, [documentId, busy]);

  const pick = (next: File | null) => {
    setError(null);
    if (!next) return;
    if (!isSupportedFile(next)) return setError("That file type isn't supported yet.");
    if (next.size > MAX_FILE_SIZE) return setError(`Files must be under ${formatFileSize(MAX_FILE_SIZE)}.`);
    setFile(next);
    if (!title) setTitle(next.name.replace(/\.[^.]+$/, "").slice(0, 80));
  };

  const generate = async () => {
    if (!file || !user) return;
    setBusy(true);
    setError(null);
    setSummary(null);
    setStage("extracting");
    try {
      const { text, needsModelReading } = await extractTextFromFile(file);
      if (!needsModelReading && (!text || text.trim().length < 40)) {
        throw new Error("We couldn't read enough text from this file. Try a clearer document.");
      }

      let storagePath: string | null = null;
      if (needsModelReading || isModelReadable(file.name)) {
        const path = `${user.id}/${crypto.randomUUID()}-${file.name.replace(/[^\w.\-]+/g, "_")}`;
        const { error: uploadError } = await supabase.storage.from("documents").upload(path, file);
        if (uploadError) throw new Error("Upload failed. Please try again.");
        storagePath = path;
      }

      const { data: doc, error: docError } = await supabase
        .from("documents")
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type || null,
          storage_path: storagePath,
          extracted_text: text,
          processing_status: "uploaded",
          processing_stage: "extracting",
        })
        .select()
        .single();
      if (docError || !doc) throw new Error("We couldn't save your document.");
      setDocumentId(doc.id);

      const { data, error: fnError } = await supabase.functions.invoke("generate-quiz", {
        body: {
          document_id: doc.id,
          difficulty,
          title: title.trim() || undefined,
          subject: subject.trim() || undefined,
        },
      });
      if (fnError) {
        const status = (fnError as { context?: { status?: number } }).context?.status;
        const { data: failed } = await supabase
          .from("documents")
          .select("processing_error")
          .eq("id", doc.id)
          .maybeSingle();
        throw new Error(
          status === 429 ? "Too many requests right now. Please wait a moment and try again."
          : status === 402 ? "AI credits are exhausted. Add credits to keep generating tests."
          : failed?.processing_error || "We couldn't generate the test from this document.",
        );
      }
      setStage("completed");
      setSummary(data as Summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const activeIndex = STAGES.findIndex((s) => s.key === stage);

  return (
    <AppShell title="New test">
      <h2 className="text-2xl font-bold">Create a practice test</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Upload a question paper or your notes — we detect every question in the document automatically.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); pick(e.dataTransfer.files?.[0] ?? null); }}
          className={cn(
            "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors",
            dragging ? "border-primary bg-accent" : "border-border bg-card",
          )}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <FileUp className="h-6 w-6" aria-hidden="true" />
          </span>
          {file ? (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted px-3 py-2">
              <span className="truncate text-sm font-medium">{file.name}</span>
              <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
              <button type="button" aria-label="Remove file" onClick={() => setFile(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <>
              <p className="mt-4 text-sm font-medium">Drag and drop your file here</p>
              <p className="mt-1 text-xs text-muted-foreground">PDF, DOCX, PPTX, TXT, CSV or images · max {formatFileSize(MAX_FILE_SIZE)}</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT_ATTRIBUTE}
            className="sr-only"
            onChange={(e) => pick(e.target.files?.[0] ?? null)}
          />
          <Button variant="outline" className="mt-5" onClick={() => inputRef.current?.click()}>Choose file</Button>
        </div>

        <div className="surface-card space-y-5 p-6">
          <div className="space-y-2">
            <Label htmlFor="title">Test title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={80} />
          </div>
          <div className="space-y-2">
            <Label>Difficulty <span className="font-normal text-muted-foreground">(used only when generating from notes)</span></Label>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map((d) => (
                <button key={d} type="button" onClick={() => setDifficulty(d)} aria-pressed={difficulty === d}
                  className={cn("rounded-full border px-3 py-1.5 text-sm capitalize", difficulty === d ? "border-primary bg-primary text-primary-foreground" : "border-border")}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {error && !busy ? (
            <div role="alert" className="flex items-start gap-2 rounded-lg bg-error-soft px-3 py-2 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          ) : null}

          <Button className="w-full" disabled={!file || busy} onClick={generate}>
            {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />}
            {busy ? "Generating…" : "Generate test"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            The number of questions matches what we find in your document.
          </p>
        </div>
      </div>

      <Dialog open={busy || !!summary} onOpenChange={(open) => { if (!open && !busy) setSummary(null); }}>
        <DialogContent className="sm:max-w-md">
          {summary ? (
            <>
              <DialogHeader>
                <DialogTitle>Your test is ready</DialogTitle>
                <DialogDescription>{summary.title}</DialogDescription>
              </DialogHeader>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-muted-foreground">Questions</span><span className="font-semibold">{summary.question_count}</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Source</span><span className="font-semibold capitalize">{summary.mode.replace("_", " ")}</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Answers from document</span><span className="font-semibold">{summary.answers_from_document}</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Answers verified online</span><span className="font-semibold">{summary.answers_from_web}</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Answers from AI</span><span className="font-semibold">{summary.answers_from_ai}</span></li>
              </ul>
              <div className="mt-2 flex gap-3">
                <Button className="flex-1" onClick={() => navigate(`/test/${summary.test_id}`)}>Start test</Button>
                <Button variant="outline" onClick={() => navigate("/dashboard")}>Later</Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Generating your test</DialogTitle>
                <DialogDescription>Keep this tab open — this can take up to a minute.</DialogDescription>
              </DialogHeader>
              <ol className="space-y-3">
                {STAGES.map((s, i) => {
                  const done = activeIndex > i;
                  const active = activeIndex === i;
                  return (
                    <li key={s.key} className={cn("flex items-center gap-3 text-sm", done || active ? "text-foreground" : "text-muted-foreground")}>
                      <span className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
                        done ? "border-success bg-success text-success-foreground" : active ? "border-primary text-primary" : "border-border",
                      )}>
                        {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          : active ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                          : <span className="text-xs">{i + 1}</span>}
                      </span>
                      {s.label}
                    </li>
                  );
                })}
              </ol>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
