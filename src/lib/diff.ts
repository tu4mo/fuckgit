import parseDiff from "parse-diff";

import type { ChangedFile } from "./git/index.js";
import { getDiff } from "./git/index.js";

export type DiffFile = ReturnType<typeof parseDiff>[number];
export type DiffChange = DiffFile["chunks"][number]["changes"][number];

export function getFileDiff(
  file: ChangedFile,
  contextLines = 3,
): { staged: DiffFile[]; unstaged: DiffFile[] } {
  if (file.stagedStatus === "PARTIAL") {
    return {
      staged: parseDiff(getDiff({ path: file.path, staged: true, contextLines })),
      unstaged: parseDiff(getDiff({ path: file.path, staged: false, contextLines })),
    };
  }

  const staged = file.stagedStatus !== "NONE";
  return {
    staged: parseDiff(getDiff({ path: file.path, staged, contextLines })),
    unstaged: [],
  };
}
