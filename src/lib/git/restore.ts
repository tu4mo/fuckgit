import { git } from "./git.js";

export function unstageFile(path: string): void {
  try {
    git("restore", "--staged", path);
  } catch {
    // No HEAD yet (initial commit) — fall back to removing from index
    git("rm", "--cached", "--force", path);
  }
}
