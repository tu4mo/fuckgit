import { gitAllowFailure } from "./git.js";

export type DiffMode = "staged" | "unstaged" | "untracked";

export function getDiff({
  path,
  mode,
  contextLines = 3,
}: {
  path: string;
  mode: DiffMode;
  contextLines?: number;
}): string {
  const unifiedFlag = `-U${contextLines}`;

  if (mode === "untracked") {
    return gitAllowFailure("diff", unifiedFlag, "--no-index", "/dev/null", path);
  }

  return mode === "staged"
    ? gitAllowFailure("diff", unifiedFlag, "--cached", path)
    : gitAllowFailure("diff", unifiedFlag, path);
}
