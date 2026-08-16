import JSZip from "jszip";

export const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB

export const ACCEPTED_EXTENSIONS = [
  "pdf", "doc", "docx", "txt", "ppt", "pptx", "csv", "jpg", "jpeg", "png", "webp",
];

export const ACCEPT_ATTRIBUTE =
  ".pdf,.doc,.docx,.txt,.ppt,.pptx,.csv,.jpg,.jpeg,.png,.webp,application/pdf,text/plain,text/csv,image/*";

export function extensionOf(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

export function isSupportedFile(file: File) {
  return ACCEPTED_EXTENSIONS.includes(extensionOf(file.name));
}

/** Files the AI model can read directly (sent as inline data by the edge function). */
export function isModelReadable(fileName: string) {
  return ["pdf", "jpg", "jpeg", "png", "webp"].includes(extensionOf(fileName));
}

function cleanText(text: string) {
  return text
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function extractDocx(file: File) {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function extractPptx(file: File) {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const slideFiles = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort();
  const chunks: string[] = [];
  for (const name of slideFiles) {
    const xml = await zip.files[name].async("string");
    const texts = Array.from(xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)).map((m) => m[1]);
    if (texts.length) chunks.push(texts.join(" "));
  }
  return chunks.join("\n\n");
}

export type ExtractionResult = {
  text: string | null;
  needsModelReading: boolean;
};

/**
 * Extracts text in the browser where possible. PDFs and images are handed to the
 * AI model directly (the edge function reads the stored file).
 */
export async function extractTextFromFile(file: File): Promise<ExtractionResult> {
  const ext = extensionOf(file.name);

  if (ext === "txt" || ext === "csv") {
    return { text: cleanText(await file.text()), needsModelReading: false };
  }
  if (ext === "docx") {
    return { text: cleanText(await extractDocx(file)), needsModelReading: false };
  }
  if (ext === "pptx") {
    return { text: cleanText(await extractPptx(file)), needsModelReading: false };
  }
  if (isModelReadable(file.name)) {
    return { text: null, needsModelReading: true };
  }
  if (ext === "doc" || ext === "ppt") {
    throw new Error(
      "Legacy .doc and .ppt files can't be read reliably. Please save the file as .docx, .pptx or PDF and upload again.",
    );
  }
  throw new Error("This file type isn't supported yet.");
}
