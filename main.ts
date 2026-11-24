import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Fortune Cookie Wisdom for
// Developers" bounty. The program writes a single line to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt): a fortune cookie
// fortune for a software developer — the code you call
// "temporary" will attend your retirement party, because nothing
// in software is as permanent as a temporary solution. Pass 2
// note: a runner-up warned that "later" is a person — you; the
// retirement party won because every senior engineer has shipped
// the temporary fix that outlived the team.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const FORTUNE_BEATS = [
  "The code you call 'temporary'",
  "will attend your retirement party.",
] as const;

export function buildEntryLine(): string {
  return FORTUNE_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 120;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
