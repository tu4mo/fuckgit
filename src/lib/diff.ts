export type DiffLine = {
  kind: "add" | "remove" | "context" | "separator";
  text: string;
};

export function parseDiff(raw: string): DiffLine[] {
  if (!raw) return [];

  const lines = raw.split("\n");
  const hunkStart = lines.findIndex((l) => l.startsWith("@@"));
  if (hunkStart === -1) return [];

  let firstHunk = true;
  return lines.slice(hunkStart).flatMap((line): DiffLine[] => {
    if (line.startsWith("@@")) {
      if (firstHunk) { firstHunk = false; return []; }
      return [{ kind: "separator", text: "" }];
    }
    if (line.startsWith("+")) return [{ kind: "add", text: line.slice(1) }];
    if (line.startsWith("-")) return [{ kind: "remove", text: line.slice(1) }];
    return [{ kind: "context", text: line.slice(1) }];
  });
}
