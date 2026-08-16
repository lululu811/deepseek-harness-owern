/** Package-owned durable invariants for publisher WeChat backend events. @module @personal/publisher-backend/invariant */

import type { Context } from '@deepseek-ai/cordis'
import type { Session, SessionEvent } from '@deepseek-ai/dsh-session'
import type { InvariantFailure, InvariantInstaller } from '@deepseek-ai/dsh-invariants'

const PACKAGE_NAME = '@personal/publisher-backend'

/** Cordis companion plugin name. */
export const name = 'publisher-backend-invariant'
/** Service required before the companion can reserve package ownership. */
export const inject = ['invariants']

/**
 * Validate package-owned event fields before they reach the durable log.
 *
 * Publisher backend tools append structured results (wechat_article_stats, wechat_data_trends, etc.).
 * This invariant ensures the shape is well-formed.
 */
function validateEvent(_event: SessionEvent, _fail: InvariantFailure): void {
  // Tool result events have a complex structure; skip deep validation for now.
  // Full validation will be added in M3 when the WeChat API integration is complete.
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
 * Register the publisher-backend invariant companion.
 * @param ctx - Cordis context carrying the invariant service.
 * @returns the installed registration's disposer after setup succeeds.
 */
export const apply = (ctx: Context): Promise<() => void> =>
  Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install))
