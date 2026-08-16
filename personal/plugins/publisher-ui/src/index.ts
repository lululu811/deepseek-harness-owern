/**
 * Publisher UI panels — StatusBoard, ArticleList, StatsChart.
 *
 * Registers slot occupants for the publisher preset:
 * - `'details'` slot: replaced by PublisherPanelStrip (Status + Stats stacked)
 * - `'conversation.view'` tab: PublisherArticlesView (full-width article list)
 *
 * Panels are conditional on `session.agentPreset === 'publisher'`.
 *
 * Slot registration uses `ctx.slots.inject(slotKey, factory)` — the slot
 * declaration lives in ui-conversation (session-scoped `details` and
 * `conversation.view`). Our injection rides that lifetime so registrations
 * survive entry remounts.
 *
 * @module @personal/publisher-ui
 */

import type { Context } from '@deepseek-ai/cordis'
import { PublisherPanelStrip } from './panels/PublisherPanelStrip.tsx'
import { PublisherArticlesView } from './panels/ArticleList.tsx'

export const name = 'publisher-ui'
export const inject = ['slots']

/**
 * Register publisher-specific UI slots.
 *
 * The slot registry is provided via `ctx.get('slots')` (the property proxy is
 * topology-sensitive; strict `ctx.get` reads the global service store — per
 * `packages/CLAUDE.md` policy).
 *
 * @param ctx - Cordis context carrying the slot registry.
 */
export function apply(ctx: Context): void {
  // Resolve slots via ctx.get per package policy. The cast is needed because
  // SlotMap declaration-merge with other packages' slot owners happens at
  // runtime, not in this compilation unit.
  const slots = ctx.get('slots') as {
    inject: (key: string, factory: () => () => void) => void
    register: (options: Record<string, unknown>, component: unknown) => () => void
  }

  // Register the publisher panel strip as a `details` slot occupant.
  slots.inject('details', () =>
    slots.register({ name: 'details' }, PublisherPanelStrip),
  )

  // Register the article list as a new view tab in the center column.
  slots.inject('conversation.view', () =>
    slots.register(
      { name: 'conversation.view', id: 'publisher-articles', order: 10, label: 'Articles' },
      PublisherArticlesView,
    ),
  )
}