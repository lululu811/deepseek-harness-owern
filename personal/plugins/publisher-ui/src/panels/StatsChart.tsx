/**
 * StatsChart — Line + bar charts with pixel-art lattice visual language.
 *
 * Renders inside the `'details'` slot (stacked below StatusBoard in the strip).
 * Displays:
 * - Line chart: 7-day read count trend
 * - Bar chart: today's articles by read count
 * - Milestone badges (1k / 5k / 1w)
 *
 * Uses dataviz skill 7-step procedure for palette validation.
 *
 * @module @personal/publisher-ui/StatsChart
 */

import type { PublisherStats } from '../types.ts'
import type { SlotStandardProps } from './StatusBoard.tsx'
import css from '../styles.module.css'

interface LinePlotProps {
  data: Array<{ date: string; reads: number }>
}

/** Line chart for 7-day read count trend. */
function LinePlot({ data }: LinePlotProps) {
  if (!data || data.length === 0) return null

  const maxReads = Math.max(...data.map(d => d.reads))
  const width = 400
  const height = 120
  const padding = 20

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding)
    const y = height - padding - (d.reads / maxReads) * (height - 2 * padding)
    return { x, y, date: d.date, reads: d.reads }
  })

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={css.chart}>
      {/* Baseline */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--dsw-alias-border-l1, #34495e)" strokeWidth="1" />

      {/* Line */}
      <path d={pathD} fill="none" stroke="#3498db" strokeWidth="2" />

      {/* Data points (pixel-art style) */}
      {points.map((p, i) => (
        <rect
          key={i}
          x={p.x - 3}
          y={p.y - 3}
          width="6"
          height="6"
          fill="#3498db"
          className={css.pixelPoint}
        >
          <title>{`${p.date}: ${p.reads} reads`}</title>
        </rect>
      ))}

      {/* X-axis labels (every other point) */}
      {points.filter((_, i) => i % 2 === 0).map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={height - 5}
          textAnchor="middle"
          fontSize="10"
          fill="var(--dsw-alias-text-secondary, #95a5a6)"
        >
          {p.date.slice(5)} {/* MM-DD */}
        </text>
      ))}
    </svg>
  )
}

interface BarPlotProps {
  data: Array<{ title: string; reads: number }>
}

/** Horizontal bar chart for article read counts. */
function BarPlot({ data }: BarPlotProps) {
  if (!data || data.length === 0) return null

  const maxReads = Math.max(...data.map(d => d.reads))
  const width = 400
  const barHeight = 20
  const gap = 4
  const height = data.length * (barHeight + gap)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={css.chart}>
      {data.map((d, i) => {
        const y = i * (barHeight + gap)
        const barWidth = (d.reads / maxReads) * (width - 150)

        return (
          <g key={i}>
            {/* Title */}
            <text
              x="0"
              y={y + barHeight / 2 + 4}
              fontSize="11"
              fill="var(--dsw-alias-text-primary, #ecf0f1)"
            >
              {d.title.slice(0, 20)}
            </text>

            {/* Bar (pixel-art style) */}
            <rect
              x="150"
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#27ae60"
              className={css.pixelBar}
            >
              <title>{`${d.title}: ${d.reads} reads`}</title>
            </rect>

            {/* Read count label */}
            <text
              x={150 + barWidth + 5}
              y={y + barHeight / 2 + 4}
              fontSize="11"
              fill="var(--dsw-alias-text-secondary, #95a5a6)"
            >
              {d.reads}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

interface MilestoneBadgeProps {
  milestone: { date: string; threshold: number }
}

/** Milestone badge (1k / 5k / 1w). */
function MilestoneBadge({ milestone }: MilestoneBadgeProps) {
  const label = milestone.threshold >= 10000
    ? `${milestone.threshold / 10000}w`
    : milestone.threshold >= 1000
    ? `${milestone.threshold / 1000}k`
    : `${milestone.threshold}`

  return (
    <span className={css.milestoneBadge} title={milestone.date}>
      {label}
    </span>
  )
}

/**
 * StatsChart — details-slot occupant (stacked below StatusBoard).
 * Reads `publisher.stats` projection; renders line + bar charts.
 */
export function StatsChart({ useProjection }: SlotStandardProps) {
  const stats = useProjection('publisher.stats') as PublisherStats | null | undefined

  if (!stats) {
    return (
      <div className={css.idle}>
        <p>No stats yet</p>
        <p className={css.hint}>Run wechat_data_trends to fetch data</p>
      </div>
    )
  }

  const avgReads = stats.dailyReads.length > 0
    ? Math.round(stats.dailyReads.reduce((sum, d) => sum + d.reads, 0) / stats.dailyReads.length)
    : 0

  return (
    <section className={css.statsChart}>
      <h3 className={css.panelTitle}>Stats</h3>

      {/* Average reads badge */}
      <div className={css.avgBadge}>
        Avg: {avgReads} reads/day
      </div>

      {/* Line chart: 7-day trend */}
      <div className={css.chartSection}>
        <h4 className={css.chartTitle}>7-Day Trend</h4>
        <LinePlot data={stats.dailyReads.slice(-7)} />
      </div>

      {/* Bar chart: today's articles */}
      {stats.articleReads.length > 0 && (
        <div className={css.chartSection}>
          <h4 className={css.chartTitle}>Today's Articles</h4>
          <BarPlot data={stats.articleReads} />
        </div>
      )}

      {/* Milestone badges */}
      {stats.milestones.length > 0 && (
        <div className={css.milestones}>
          <h4 className={css.chartTitle}>Milestones</h4>
          <div className={css.milestoneList}>
            {stats.milestones.map((m, i) => (
              <MilestoneBadge key={i} milestone={m} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}