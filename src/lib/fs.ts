import fs from 'node:fs'
import path from 'node:path'

import { repoRoot } from './git/git.js'

export function readFile(filePath: string): string {
  try {
    return fs.readFileSync(path.join(repoRoot, filePath), 'utf-8')
  } catch {
    return ''
  }
}
