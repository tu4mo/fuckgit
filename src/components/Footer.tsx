import { Box, Text, useFocusManager } from 'ink'

import { type Pane } from '../types.js'
import { Notification } from './Notification.js'

type Command = {
  key: string
  label: string
}

const STAGE_UNSTAGE_KEY = { key: 'space', label: 'stage/unstage' }
const SWITCH_PANE_KEY = { key: 'tab', label: 'switch pane' }
const CONTEXT_KEY = { key: '+/-', label: 'context' }
const QUIT_KEY = { key: 'q', label: 'quit' }

const COMMANDS: Record<Pane, Command[]> = {
  'files': [STAGE_UNSTAGE_KEY, SWITCH_PANE_KEY, QUIT_KEY],
  'diff-unstaged': [STAGE_UNSTAGE_KEY, SWITCH_PANE_KEY, CONTEXT_KEY, QUIT_KEY],
  'diff-staged': [STAGE_UNSTAGE_KEY, SWITCH_PANE_KEY, CONTEXT_KEY, QUIT_KEY],
}

export function Footer() {
  const { activeId } = useFocusManager()
  const pane = (activeId ?? 'files') as Pane

  return (
    <Box gap={2} paddingX={1} height={1} overflow="hidden" position="relative">
      {COMMANDS[pane].map(({ key, label }) => (
        <Box key={key} gap={1} flexShrink={0}>
          <Text bold color="white">
            {key}
          </Text>
          <Text color="gray">{label}</Text>
        </Box>
      ))}
      <Notification />
    </Box>
  )
}
