/**
 * Publisher UI panels — StatusBoard, ArticleList, StatsChart.
 *
 * Registers slot overrides for the publisher preset:
 * - `details` slot: replaced by PublisherPanelStrip (Status + Stats stacked)
 * - `conversation.view` tab: publisher-articles (full-width article list)
 *
 * Panels are conditional on `session.agentPreset === 'publisher'`.
 * @module @personal/publisher-ui
 */

import type { Context } from '@deepseek-ai/cordis'

export const name = 'publisher-ui'
export const inject = ['slots']

/**
 * Register publisher-specific UI slots.
 * @param _ctx - Cordis context carrying the slot registry.
 */
export function apply(_ctx: Context): void {
  // Stub — actual panel registration will be implemented in M7.
  // The plan calls for:
  // 1. ctx.slots.register for 'details' with PublisherPanelStrip
  // 2. ctx.slots.register for 'conversation.view' tab 'publisher-articles'
  // 3. Panels check session.agentPreset and return null if not 'publisher'
}
