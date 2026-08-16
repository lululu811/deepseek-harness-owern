/**
 * Subprocess wrapper for the nightly report scripts.
 * @module @personal/publisher-pipeline/spawn
 */

import type { Context } from '@deepseek-ai/cordis'

/** Outcome of running a nightly script. */
export interface ScriptOutcome {
  readonly stdout: string
  readonly stderr: string
  readonly exitCode: number
}

/**
 * Run a nightly report script via the subprocess seam.
 *
 * Scripts live under `bin/` (bash) or `scripts/` (python) in the nightly workspace.
 * The subprocess seam enforces timeouts and captures output within configured byte limits.
 *
 * NOTE: This is a stub for M1. Full subprocess integration will be added in M2 when
 * the pipeline tools are implemented. For now, it returns a placeholder outcome.
 * @param _ctx - Cordis context carrying the subprocess service.
 * @param _script - Script path relative to the nightly workspace root (e.g., `bin/pull_zsxq.sh`).
 * @param _args - Command-line arguments to pass to the script.
 * @param _signal - Abort signal for cancellation.
 * @returns the captured stdout, stderr, and exit code.
 */
export async function runNightlyScript(
  _ctx: Context,
  _script: string,
  _args: readonly string[],
  _signal: AbortSignal,
): Promise<ScriptOutcome> {
  // Stub — will be implemented in M2 with ctx.subprocess.spawn.
  return {
    stdout: '',
    stderr: 'Not implemented in M1',
    exitCode: 1,
  }
}
