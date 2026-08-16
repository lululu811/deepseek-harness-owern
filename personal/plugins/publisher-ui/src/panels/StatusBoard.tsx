/**
 * StatusBoard — 7-step pipeline progress + QC verdict stamp.
 *
 * Displays pipeline stages as pixel-art blocks with status indicators.
 * QC verdict shown as a pixel stamp (PASS green / WARN yellow / FAIL red).
 *
 * Renders as the `'details'` slot occupant (replaces DetailsPanel when
 * agentPreset === 'publisher').
 *
 * Props are framework-injected (useProjection, useSession, etc.) — see
 * `SlotStandardProps`. We declare a local structural type for build-time
 * safety; the framework's PropsRuntime helper is the runtime source.
 *
 * @module @personal/publisher-ui/StatusBoard
 */

import type { PublisherStatus, PipelineStage } from '../types.ts'
import css from '../styles.module.css'

/**
 * Framework-injected props for slot occupants.
 * Matches the runtime's `PropsRuntime<'details'>` shape; declared locally to
 * avoid pulling in the SlotMap declaration chain (which spans many packages).
 */
export interface SlotStandardProps {
  /** Key-addressed projection reader. */
  useProjection: <T = unknown>(key: string) => T | undefined
  /** Session snapshot selector. */
  useSession: <T = unknown>(selector: (s: unknown) => T) => T
}

/** Render a single pipeline stage as a pixel block. */
function PixelBlock({ stage, step }: { stage: PipelineStage; step: number }) {
  const statusClass = stage.status === 'completed' ? css.completed
    : stage.status === 'running' ? css.running
    : stage.status === 'failed' ? css.failed
    : css.pending

  return (
    <div className={`${css.pixelBlock} ${statusClass}`} title={stage.name}>
      <span className={css.stepNumber}>{step}</span>
      <span className={css.stageName}>{stage.name}</span>
    </div>
  )
}

/** Render QC verdict as a pixel stamp (or null if absent). */
function QcStamp({ verdict }: { verdict: string | undefined }) {
  if (!verdict) return null
  const stampClass = verdict === 'PASS' ? css.stampPass
    : verdict === 'WARN' ? css.stampWarn
    : css.stampFail

  return (
    <div className={`${css.qcStamp} ${stampClass}`}>
      QC: {verdict}
    </div>
  )
}

/**
 * StatusBoard — details-slot occupant.
 * Reads `publisher.status` projection; renders pipeline + QC stamp.
 */
export function StatusBoard({ useProjection }: SlotStandardProps) {
  const status = useProjection('publisher.status') as PublisherStatus | null | undefined

  if (!status) {
    return (
      <div className={css.idle}>
        <p>Pipeline idle</p>
        <p className={css.hint}>Run nightly_status to begin</p>
      </div>
    )
  }

  return (
    <section className={css.statusBoard}>
      <h3 className={css.panelTitle}>Pipeline Status</h3>

      {/* 7-step pipeline as pixel blocks */}
      <div className={css.pipeline}>
        {status.stages.map((stage, i) => (
          <PixelBlock key={stage.name} stage={stage} step={i + 1} />
        ))}
      </div>

      {/* QC verdict stamp */}
      <QcStamp verdict={status.qcVerdict ?? undefined} />

      {/* Current date */}
      {status.date && (
        <div className={css.dateBadge}>
          {status.date}
        </div>
      )}
    </section>
  )
}