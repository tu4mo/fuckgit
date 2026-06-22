import { execFileSync, spawnSync } from "node:child_process";

export const repoRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
  stdio: "pipe",
}).trimEnd();

export function git(...args: string[]): string {
  return execFileSync("git", args, { encoding: "utf8", stdio: "pipe", cwd: repoRoot }).trimEnd();
}

// For commands that exit non-zero on success (e.g. `diff --no-index` exits 1 when files differ)
export function gitAllowFailure(...args: string[]): string {
  const result = spawnSync("git", args, { encoding: "utf8", cwd: repoRoot });
  return result.stdout?.trim() ?? "";
}
