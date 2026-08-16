/**
 * Publisher WeChat backend tools — article stats, comments, trends, top articles.
 *
 * These tools query the WeChat datacube API via SSH tunnel for post-publish tracking.
 * The tunnel lifecycle is managed in `tunnel.ts`; API calls go through `wechat-datacube.ts`.
 * @module @personal/publisher-backend
 */

import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { z as zod } from 'zod'
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { PublisherStats } from './types.ts'
// Type-only: resolves ctx.sessionProjections for the projection registration.
import type {} from '@deepseek-ai/dsh-session-projection'
export type * from './types.ts'

export const name = 'publisher-backend'
export const inject = ['tools']

/** Deployment config for WeChat backend integration. */
export interface Config {
  /** WeChat app ID for API authentication. */
  appId: string
  /** WeChat app secret for API authentication. */
  appSecret: string
  /** SSH tunnel host for WeChat API (IP whitelist constraint). */
  tunnelHost: string
  /** SSH tunnel user. */
  tunnelUser: string
}

export const Config = z.object({
  appId: z.string(),
  appSecret: z.string(),
  tunnelHost: z.string().default('43.155.210.74'),
  tunnelUser: z.string().default('root'),
})

/** Schema for the `publisher.stats` projection. */
const statsProjectionSchema = zod.union([
  zod.object({
    dailyReads: zod.array(zod.object({
      date: zod.string(),
      reads: zod.number(),
    })),
    articleReads: zod.array(zod.object({
      title: zod.string(),
      reads: zod.number(),
    })),
    milestones: zod.array(zod.object({
      date: zod.string(),
      threshold: zod.number(),
    })),
  }),
  zod.null(),
])

/**
 * Register the 4 WeChat backend tools and 1 projection.
 * @param ctx - Cordis context carrying the tool and projection registries.
 * @param _config - Deployment config with WeChat credentials and tunnel info.
 */
export function apply(ctx: Context, _config: Config): void {
  // Register the stats projection.
  ctx.inject(['sessionProjections'], (projectionCtx) => {
    projectionCtx.sessionProjections.register({
      key: 'publisher.stats',
      schema: statsProjectionSchema as any,
      init: () => null,
      apply: (state: PublisherStats | null, event) => {
        if (event.type === 'tool/result' && (event.data as any).message?.name === 'wechat_data_trends') {
          const result = (event.data as any).output as PublisherStats
          return result
        }
        return state
      },
      view: (state: PublisherStats | null) => state,
      stateVersion: 1,
    })
  })

  // Tool 1: wechat_article_stats — get read/share/like counts for an article.
  ctx.tools.register(defineTool({
    name: 'wechat_article_stats',
    description: 'Get read, share, like, and favorite counts for a published WeChat article by msg ID or ref date.',
    parameters: {
      msgId: {
        type: 'string',
        required: true,
        description: 'The message ID of the article (if known).',
      },
      refDate: {
        type: 'string',
        required: true,
        description: 'Reference date in YYYY-MM-DD format (alternative to msgId).',
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          stats: {
            type: 'array',
            required: true,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                msgId: { type: 'string', required: true },
                title: { type: 'string', required: true },
                readCount: { type: 'integer', required: true },
                shareCount: { type: 'integer', required: true },
                likeCount: { type: 'integer', required: true },
                favoriteCount: { type: 'integer', required: true },
              },
            },
          },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: `${value.stats.length} articles: ${value.stats.map(s => `${s.title}: ${s.readCount} reads`).join(', ')}`,
      }],
    },
    execute() {
      // Stub — will be implemented in M3 with WeChat API integration.
      return Promise.resolve({ stats: [] })
    },
    presentCall: () => ({ card: 'generic', title: 'Get WeChat article stats', kind: 'other' }),
  }))

  // Tool 2: wechat_article_comments — list comments for an article.
  ctx.tools.register(defineTool({
    name: 'wechat_article_comments',
    description: 'List reader comments for a published WeChat article.',
    parameters: {
      msgId: {
        type: 'string',
        required: true,
        description: 'The message ID of the article.',
      },
      offset: {
        type: 'integer',
        required: true,
        description: 'Pagination offset (default 0).',
      },
      limit: {
        type: 'integer',
        required: true,
        description: 'Page size (default 20, max 50).',
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          comments: {
            type: 'array',
            required: true,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                id: { type: 'string', required: true },
                content: { type: 'string', required: true },
                userNickname: { type: 'string', required: true },
                createdAt: { type: 'integer', required: true },
                replyContent: { type: 'string' },
              },
            },
          },
          totalCount: { type: 'integer', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: `${value.comments.length} comments (total ${value.totalCount})`,
      }],
    },
    execute() {
      // Stub — will be implemented in M3 with WeChat API integration.
      return Promise.resolve({ comments: [], totalCount: 0 })
    },
    presentCall: args => ({ card: 'generic', title: `List comments for ${args.msgId}`, kind: 'other' }),
  }))

  // Tool 3: wechat_data_trends — multi-day stats for trend analysis.
  ctx.tools.register(defineTool({
    name: 'wechat_data_trends',
    description: 'Get multi-day stats for trend analysis (daily read counts, article breakdown).',
    parameters: {
      days: {
        type: 'integer',
        required: true,
        description: 'Number of days to look back (e.g., 7 for last week).',
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          dailyReads: {
            type: 'array',
            required: true,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                date: { type: 'string', required: true },
                reads: { type: 'integer', required: true },
              },
            },
          },
          articleReads: {
            type: 'array',
            required: true,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                title: { type: 'string', required: true },
                reads: { type: 'integer', required: true },
              },
            },
          },
          milestones: {
            type: 'array',
            required: true,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                date: { type: 'string', required: true },
                threshold: { type: 'integer', required: true },
              },
            },
          },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: `${value.dailyReads.length} days: avg ${Math.round(value.dailyReads.reduce((sum, d) => sum + d.reads, 0) / value.dailyReads.length)} reads/day`,
      }],
    },
    execute() {
      // Stub — will be implemented in M3 with WeChat API integration.
      return Promise.resolve({ dailyReads: [], articleReads: [], milestones: [] })
    },
    presentCall: args => ({ card: 'generic', title: `Get trends for ${args.days} days`, kind: 'other' }),
  }))

  // Tool 4: wechat_top_articles — Top N articles by read count in date range.
  ctx.tools.register(defineTool({
    name: 'wechat_top_articles',
    description: 'Get top articles by read count in a date range.',
    parameters: {
      beginDate: {
        type: 'string',
        required: true,
        description: 'Start date in YYYY-MM-DD format.',
      },
      endDate: {
        type: 'string',
        required: true,
        description: 'End date in YYYY-MM-DD format.',
      },
      limit: {
        type: 'integer',
        required: true,
        description: 'Number of top articles to return (default 10).',
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          articles: {
            type: 'array',
            required: true,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                title: { type: 'string', required: true },
                readCount: { type: 'integer', required: true },
                publishDate: { type: 'string', required: true },
              },
            },
          },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: `Top ${value.articles.length} articles: ${value.articles.map(a => `${a.title} (${a.readCount})`).join(', ')}`,
      }],
    },
    execute() {
      // Stub — will be implemented in M3 with WeChat API integration.
      return Promise.resolve({ articles: [] })
    },
    presentCall: args => ({ card: 'generic', title: `Top articles ${args.beginDate} to ${args.endDate}`, kind: 'other' }),
  }))
}
