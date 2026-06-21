import { git, gitAllowFailure } from "./git.js";

export function getDiff(path: string, staged: boolean, untracked: boolean): string {
  try {
    if (untracked) return gitAllowFailure("diff", "--no-index", "/dev/null", path);
    return staged ? git("diff", "--cached", path) : git("diff", path);
  } catch {
    return "";
  }
}
