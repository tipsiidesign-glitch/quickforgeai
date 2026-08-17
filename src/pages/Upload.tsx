import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/lib/format";
import {
  ACCEPT_ATTRIBUTE, MAX_FILE_SIZE, extractTextFromFile, isModelReadable, isSupportedFile,
} from "@/lib/documentText";
import { FileUp, Loader2, Sparkles, X } from "lucide-react";

const DIFFICULTIES = ["easy", "medium", "hard", "mixed"] as const;
const COUNTS = [10, 15, 20, 30, 40];

export default function UploadPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(profile?.favorite_subject ?? "");
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>(
    (profile?.preferred_difficulty as (typeof DIFFICULTIES)[number]) ?? "medium",
  );
  const [count, setCount] = useState(profile?.preferred_question_count ?? 15);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState("");
  const [error, setError] = useState<string | null>(null);

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
    try {
      setStage("Reading your document…");
      const { text, needsModelReading } = await extractTextFromFile(file);
      if (!needsModelReading && (!text || text.trim().length < 40)) {
        throw new Error("We couldn't read enough text from this file. Try a clearer document.");
      }

      let storagePath: string | null = null;
      if (needsModelReading || isModelReadable(file.name)) {
        setStage("Uploading…");
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
        })
        .select()
        .single();
      if (docError || !doc) throw new Error("We couldn't save your document.");

      setStage("Generating questions with AI…");
      const { data, error: fnError } = await supabase.functions.invoke("generate-quiz", {
        body: {
          document_id: doc.id,
          question_count: count,
          difficulty,
          title: title.trim() || undefined,
          subject: subject.trim() || undefined,
        },
      });
      if (fnError) {
        const status = (fnError as { context?: { status?: number } }).context?.status;
        throw new Error(
          status === 429 ? "Too many requests right now. Please wait a moment and try again."
          : status === 402 ? "AI credits are exhausted. Add credits to keep generating tests."
          : "We couldn't generate the test from this document.",
        );
      }
      toast.success(`Test ready with ${data.question_count} questions.`);
      navigate(`/test/${data.test_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
      setStage("");
    }
  };

  return (
    <AppShell title="New test">
      <h2 className="text-2xl font-bold">Create a practice test</h2>
      <p className="mt-1 text-sm text-muted-foreground">Upload notes, slides or a PDF and we'll write the questions.</p>

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
            <Label>Difficulty</Label>
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
            <Label>Number of questions</Label>
            <div className="flex flex-wrap gap-2">
              {COUNTS.map((c) => (
                <button key={c} type="button" onClick={() => setCount(c)} aria-pressed={count === c}
                  className={cn("rounded-full border px-3 py-1.5 text-sm", count === c ? "border-primary bg-primary text-primary-foreground" : "border-border")}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {error ? <p role="alert" className="rounded-lg bg-error-soft px-3 py-2 text-sm text-destructive">{error}</p> : null}

          <Button className="w-full" disabled={!file || busy} onClick={generate}>
            {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />}
            {busy ? stage || "Working…" : "Generate test"}
          </Button>
          {busy ? <p className="text-center text-xs text-muted-foreground">This can take up to a minute for large documents.</p> : null}
        </div>
      </div>
    </AppShell>
  );
}