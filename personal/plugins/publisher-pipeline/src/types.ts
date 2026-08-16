/**
 * Session projection declarations for publisher pipeline.
 * @module @personal/publisher-pipeline/types
 */

/** Pipeline stage identifiers. */
export type PipelineStage =
  | 'pull_zsxq'
  | 'build_full_md'
  | 'split_articles'
  | 'rewrite_viewpoint'
  | 'qc_viewpoint'
  | 'deep_dive'
  | 'push_to_ima'
  | 'render_wechat_html'
  | 'publish_to_wechat'
  | 'send_feishu_poster'

/** QC verdict from the quality check step. */
export type QcVerdict = 'pass' | 'warn' | 'fail'

/** Status of a single pipeline stage. */
export type StageStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped'

/** One stage's progress in the pipeline. */
export interface PipelineStageProgress {
  readonly name: PipelineStage
  readonly status: StageStatus
  readonly startedAt?: number
  readonly completedAt?: number
  readonly error?: string
}

/** Aggregate pipeline status for a given date. */
export interface PublisherStatus {
  readonly date: string
  readonly stages: readonly PipelineStageProgress[]
  readonly qcVerdict?: QcVerdict
  readonly qcScores?: Record<string, number>
  readonly publishedAt?: number
}

/** One article extracted from the split step. */
export interface PublisherArticle {
  readonly id: string
  readonly title: string
  readonly viewpoint?: string
  readonly wordCount: number
  readonly qcVerdict?: QcVerdict
  readonly publishedToWechat?: boolean
}

declare module '@deepseek-ai/dsh-session-projection/types' {
  interface SessionProjectionMap {
    'publisher.status': PublisherStatus | null
    'publisher.articles': readonly PublisherArticle[] | null
  }
}
