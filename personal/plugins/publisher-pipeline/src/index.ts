/**
 * Publisher pipeline tools — wraps the nightly report workflow as 10 model-facing tools.
 *
 * Each tool shells out to an existing battle-tested Python/Bash script in the nightly workspace.
 * The agent orchestrates the pipeline; tools are pure executors. Projections fold tool/result
 * events to surface pipeline status and article metadata to the UI.
 * @module @personal/publisher-pipeline
 */

import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { z as zod } from 'zod'
import type { PublisherStatus, PublisherArticle } from './types.ts'
// Type-only: resolves ctx.sessionProjections for the projection registration.
import type {} from '@deepseek-ai/dsh-session-projection'
export type * from './types.ts'

export const name = 'publisher-pipeline'
export const inject = ['tools']

/** Deployment config for the publisher pipeline. */
export interface Config {
  /** Absolute path to the nightly report workspace. Defaults to the standard location. */
  nightlyRoot: string
}

export const Config = z.object({
  nightlyRoot: z.string().default('/Users/chenlei/001_project/小陈的每日夜报'),
})

/** Schema for the `publisher.status` projection. */
const statusProjectionSchema = zod.union([
  zod.object({
    date: zod.string(),
    stages: zod.array(zod.object({
      name: zod.string(),
      status: zod.enum(['pending', 'running', 'completed', 'failed', 'skipped']),
      startedAt: zod.number().optional(),
      completedAt: zod.number().optional(),
      error: zod.string().optional(),
    })),
    qcVerdict: zod.enum(['pass', 'warn', 'fail']).optional(),
    qcScores: zod.record(zod.string(), zod.number()).optional(),
    publishedAt: zod.number().optional(),
  }),
  zod.null(),
])

/** Schema for the `publisher.articles` projection. */
const articlesProjectionSchema = zod.union([
  zod.array(zod.object({
    id: zod.string(),
    title: zod.string(),
    viewpoint: zod.string().optional(),
    wordCount: zod.number(),
    qcVerdict: zod.enum(['pass', 'warn', 'fail']).optional(),
    publishedToWechat: zod.boolean().optional(),
  })),
  zod.null(),
])

/**
 * Register the 10 pipeline tools and 2 projections.
 * @param ctx - Cordis context carrying the tool and projection registries.
 * @param _config - Deployment config (currently unused; nightlyRoot is hardcoded in spawn.ts).
 */
export function apply(ctx: Context, _config: Config): void {
  // Register projections first so tool/result events can fold into them.
  ctx.inject(['sessionProjections'], (projectionCtx) => {
    projectionCtx.sessionProjections.register({
      key: 'publisher.status',
      schema: statusProjectionSchema as any,
      init: () => null,
      apply: (state: PublisherStatus | null, event) => {
        if (event.type === 'tool/result' && (event.data as any).message?.name === 'nightly_status') {
          // Fold nightly_status results into the status projection.
          const result = (event.data as any).output as { date: string; stages: PublisherStatus['stages']; qcVerdict?: PublisherStatus['qcVerdict'] }
          return { ...result, publishedAt: state?.publishedAt } as PublisherStatus | null
        }
        if (event.type === 'tool/result' && (event.data as any).message?.name === 'publish_to_wechat') {
          // Mark publishedAt when publish succeeds.
          if ((event.data as any).message?.ok) {
            return state ? { ...state, publishedAt: Date.now() } as PublisherStatus : state
          }
        }
        return state
      },
      view: (state: PublisherStatus | null) => state,
      stateVersion: 1,
    })

    projectionCtx.sessionProjections.register({
      key: 'publisher.articles',
      schema: articlesProjectionSchema as any,
      init: () => null,
      apply: (state: readonly PublisherArticle[] | null, event) => {
        if (event.type === 'tool/result' && (event.data as any).message?.name === 'split_articles') {
          const result = (event.data as any).output as { articles: readonly PublisherArticle[] }
          return result.articles
        }
        return state
      },
      view: (state: readonly PublisherArticle[] | null) => state,
      stateVersion: 1,
    })
  })

  // The 10 pipeline tools are registered in M2. For now, only the projections are active.
  // Tools will be added: pull_zsxq, build_full_md, split_articles, rewrite_viewpoint,
  // qc_viewpoint, deep_dive, push_to_ima, render_wechat_html, publish_to_wechat, send_feishu_poster.
}
