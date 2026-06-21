import { render, Box, useApp, useInput, useStdout } from "ink";
import { useState } from "react";

import { Diff } from "./components/Diff.js";
import { Files } from "./components/Files.js";
import { Header } from "./components/Header.js";
import { type ChangedFile } from "./lib/git/index.js";
import { ENTER_ALT_SCREEN, EXIT_ALT_SCREEN, HIDE_CURSOR, SHOW_CURSOR } from "./lib/terminal.js";

type Pane = "files" | "diff";

function App() {
  const { exit } = useApp();
  const { stdout } = useStdout();
  const [focusedPane, setFocusedPane] = useState<Pane>("files");
  const [selectedFile, setSelectedFile] = useState<ChangedFile | undefined>(undefined);

  useInput((input, key) => {
    if (input === "q" || (key.ctrl && input === "c")) exit();
    if (key.tab) setFocusedPane((p) => (p === "files" ? "diff" : "files"));
  });

  return (
    <Box flexDirection="column" width={stdout.columns} height={stdout.rows} padding={0}>
      <Header />
      <Box flexDirection="row" flexGrow={1}>
        <Files width="30%" focused={focusedPane === "files"} onSelectedFile={setSelectedFile} />
        <Diff file={selectedFile} focused={focusedPane === "diff"} width="70%" />
      </Box>
    </Box>
  );
}

process.stdout.write(ENTER_ALT_SCREEN + HIDE_CURSOR);

const { waitUntilExit, unmount } = render(<App />, { exitOnCtrlC: false });

process.on("SIGINT", unmount);
process.on("SIGTERM", unmount);

await waitUntilExit();

process.stdout.write(SHOW_CURSOR + EXIT_ALT_SCREEN);
