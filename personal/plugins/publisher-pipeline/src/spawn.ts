/**
 * Subprocess wrapper for the nightly report scripts.
 * @module @personal/publisher-pipeline/spawn
 */

import { spawn as cpSpawn } from 'node:child_process'
import type { ChildProcess } from 'node:child_process'

/** Absolute path to the nightly report workspace. */
const NIGHTLY_ROOT = '/Users/chenlei/001_project/小陈的每日夜报'

/** Outcome of running a nightly script. */
export interface ScriptOutcome {
  readonly stdout: string
  readonly stderr: string
  readonly exitCode: number
}

/**
 * Run a nightly report script via Node.js child_process.
 *
 * Scripts live under `bin/` (bash) or `scripts/` (python) in the nightly workspace.
 * @param script - Script path relative to the nightly workspace root (e.g., `pull_zsxq.sh`).
 * @param args - Command-line arguments to pass to the script.
 * @param signal - Abort signal for cancellation.
 * @returns the captured stdout, stderr, and exit code.
 */
export async function runNightlyScript(
  script: string,
  args: readonly string[],
  signal: AbortSignal,
): Promise<ScriptOutcome> {
  const isPython = script.endsWith('.py')
  const argv = isPython
    ? ['python3', `scripts/${script}`, ...args]
    : ['bash', `bin/${script}`, ...args]

  return new Promise((resolve, reject) => {
    const proc = cpSpawn(argv[0] as string, argv.slice(1) as string[], {
      cwd: NIGHTLY_ROOT,
      signal: signal as any,
      stdio: ['ignore', 'pipe', 'pipe'],
    } as any) as ChildProcess

    let stdout = ''
    let stderr = ''

    proc.stdout?.on('data', (data: Buffer) => { stdout += data.toString() })
    proc.stderr?.on('data', (data: Buffer) => { stderr += data.toString() })

    proc.on('close', (code: number | null) => {
      resolve({
        stdout,
        stderr,
        exitCode: code ?? 1,
      })
    })

    proc.on('error', reject)
  })
}
