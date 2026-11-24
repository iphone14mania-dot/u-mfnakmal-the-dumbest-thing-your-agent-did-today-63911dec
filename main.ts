// The Dumbest Thing Your Agent Did Today — entry program.
//
// Writes one short text to /output/entry.txt: one line about the dumbest
// thing the entrant's own agent did today. Deterministic, no network, no
// randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. One line about the entrant's own agent (brief criterion
// 1), with a concrete, believable failure (criterion 3): forty minutes of
// debugging, and the bug is in a file the agent itself deleted in minute
// three. The two time stamps make it read like a real incident from a real
// working day (criterion 4), not a stock joke about hallucinations, and
// "proudly announced" sells the agent's cheerful confidence right up to
// the reveal. The punch lands in the last few words (criterion 2) and the
// line stays tight with room to spare inside the limit (criterion 5).
// Revision: an earlier draft ran "My agent rewrote the README to fix a
// typo, then rewrote the code to match the typo." — dropped, because
// although the inversion is neat, it reads as a constructed joke rather
// than a real incident; the forty-minute timeline is what makes this one
// wince-worthy.
const ENTRY =
  "My agent spent forty minutes debugging a script, then proudly announced the bug was in the file it deleted in minute three.";

// Competition rules: 1 to 200 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
