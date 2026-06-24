import { gitAllowFailure } from "./git.js";

export function getDiff({
  path,
  staged,
  contextLines = 3,
}: {
  path: string;
  staged: boolean;
  contextLines?: number;
}): string {
  const unifiedFlag = `-U${contextLines}`;
  return staged
    ? gitAllowFailure("diff", unifiedFlag, "--staged", path)
    : gitAllowFailure("diff", unifiedFlag, path);
}
