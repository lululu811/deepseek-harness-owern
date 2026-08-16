/**
 * PublisherPanelStrip — Status + Stats stacked in the details column.
 *
 * Container component that occupies the `'details'` slot when
 * `agentPreset === 'publisher'`. Stacks StatusBoard and StatsChart vertically.
 *
 * @module @personal/publisher-ui/PublisherPanelStrip
 */

import { StatusBoard, type SlotStandardProps } from './StatusBoard.tsx'
import { StatsChart } from './StatsChart.tsx'
import css from '../styles.module.css'

/**
 * PublisherPanelStrip — details-slot container.
 * Stacks StatusBoard + StatsChart; passes full props through to each.
 */
export function PublisherPanelStrip(props: SlotStandardProps) {
  return (
    <div className={css.panelStrip}>
      <StatusBoard {...props} />
      <StatsChart {...props} />
    </div>
  )
}