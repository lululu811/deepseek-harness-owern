/**
 * Session projection declarations for publisher WeChat backend.
 * @module @personal/publisher-backend/types
 */

/** Per-article stats from WeChat datacube API. */
export interface ArticleStats {
  readonly msgId: string
  readonly title: string
  readonly readCount: number
  readonly shareCount: number
  readonly likeCount: number
  readonly favoriteCount: number
  readonly publishDate: string
}

/** Aggregated stats for trend analysis. */
export interface PublisherStats {
  readonly dailyReads: readonly { date: string; reads: number }[]
  readonly articleReads: readonly { title: string; reads: number }[]
  readonly milestones: readonly { date: string; threshold: number }[]
}

declare module '@deepseek-ai/dsh-session-projection/types' {
  interface SessionProjectionMap {
    'publisher.stats': PublisherStats | null
  }
}
