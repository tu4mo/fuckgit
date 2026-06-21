import { git } from "./git.js";

export function stageFile(path: string): void {
  git("add", path);
}
