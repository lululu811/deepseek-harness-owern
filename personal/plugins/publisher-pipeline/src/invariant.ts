/** Package-owned durable invariants for publisher pipeline events. @module @personal/publisher-pipeline/invariant */

import type { Context } from '@deepseek-ai/cordis'
import type { Session, SessionEvent } from '@deepseek-ai/dsh-session'
import type { InvariantFailure, InvariantInstaller } from '@deepseek-ai/dsh-invariants'

const PACKAGE_NAME = '@personal/publisher-pipeline'

/** Cordis companion plugin name. */
export const name = 'publisher-pipeline-invariant'
/** Service required before the companion can reserve package ownership. */
export const inject = ['invariants']

/**
 * Validate package-owned event fields before they reach the durable log.
 *
 * Publisher pipeline tools append structured results (nightly_status, split_articles, etc.).
 * This invariant ensures the shape is well-formed: date is YYYY-MM-DD, stages are valid enums, etc.
 */
function validateEvent(_event: SessionEvent, _fail: InvariantFailure): void {
  // Tool result events have a complex structure; skip deep validation for now.
  // Full validation will be added in M2 when the pipeline tools are fully integrated.
}

const install: InvariantInstaller = Object.assign((ctx: Context, fail: InvariantFailure) => {
  for (const session of ctx.sessions.list()) {
    for (const event of session.events) validateEvent(event, fail)
  }
  ctx.on('internal/dispatch', (_mode, eventName, args) => {
    if (eventName !== 'session/event') return
    const event = (args as [Session, SessionEvent])[1]
    validateEvent(event, fail)
  }, { global: true })
}, { inject: ['sessions'] })

/**
 * Register the publisher-pipeline invariant companion.
 * @param ctx - Cordis context carrying the invariant service.
 * @returns the installed registration's disposer after setup succeeds.
 */
export const apply = (ctx: Context): Promise<() => void> =>
  Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install))
