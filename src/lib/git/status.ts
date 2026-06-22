import path from "path";

import { git, repoRoot } from "./git.js";

export type GitFileStatus = "MODIFIED" | "ADDED" | "DELETED" | "RENAMED" | "UNTRACKED" | "-";

export type ChangedFile = {
  path: string;
  displayPath: string;
  status: GitFileStatus;
  staged: boolean;
};

const STATUS_MAP: Record<string, GitFileStatus> = {
  "M": "MODIFIED",
  "A": "ADDED",
  "D": "DELETED",
  "R": "RENAMED",
  "?": "UNTRACKED",
};

export function getStatus(): ChangedFile[] {
  try {
    const output = git("status", "--porcelain", "--untracked-files=all");

    if (!output) return [];

    return output.split("\n").map((line) => {
      const indexChar = line[0];
      const wtChar = line[1];
      const staged = indexChar !== " " && indexChar !== "?";
      const code = wtChar === "?" ? "?" : staged ? indexChar : wtChar;
      const filePath = line.slice(3);
      return {
        path: filePath,
        displayPath: path.relative(process.cwd(), path.join(repoRoot, filePath)),
        status: STATUS_MAP[code ?? ""] ?? "-",
        staged,
      };
    });
  } catch {
    return [];
  }
}
