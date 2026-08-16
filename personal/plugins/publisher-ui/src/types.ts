/**
 * Shared types for publisher UI panels.
 *
 * Local mirror of publisher-pipeline/types.ts so we don't depend on host package resolution.
 * Keep in sync with `@personal/publisher-pipeline/src/types.ts`.
 */

/** A single pipeline stage status. */
export type StageStatus = 'pending' | 'running' | 'completed' | 'failed'

/** A single pipeline stage in the publisher status projection. */
export interface PipelineStage {
  name: string
  status: StageStatus
}

/** QC verdict values. */
export type QcVerdict = 'PASS' | 'WARN' | 'FAIL' | null

/** Full pipeline status projection value. */
export interface PublisherStatus {
  date?: string
  stages: PipelineStage[]
  qcVerdict?: QcVerdict
}

/** A single article metadata in the publisher articles projection. */
export interface PublisherArticle {
  id: string
  title: string
  viewpoint: string
  wordCount?: number
  qcVerdict?: QcVerdict
  published?: boolean
}

/** Stats projection value (daily reads + article reads + milestones). */
export interface PublisherStats {
  dailyReads: Array<{ date: string; reads: number }>
  articleReads: Array<{ title: string; reads: number }>
  milestones: Array<{ date: string; threshold: number }>
}