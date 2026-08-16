/**
 * Publisher management tools — status queries, viewpoint listing, WeChat draft management.
 *
 * These tools are read-mostly: they query the pipeline state and manage WeChat drafts.
 * The actual pipeline execution tools live in `@personal/publisher-pipeline`.
 * @module @personal/publisher-mgmt
 */

import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { defineTool } from '@deepseek-ai/dsh-tools'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

export const name = 'publisher-mgmt'
export const inject = ['tools']

/** Deployment config for publisher management. */
export interface Config {
  /** Absolute path to the nightly report workspace. */
  nightlyRoot: string
  /** WeChat API base URL (for draft management). */
  wechatApiBase: string
}

export const Config = z.object({
  nightlyRoot: z.string().default('/Users/chenlei/001_project/小陈的每日夜报'),
  wechatApiBase: z.string().default('https://api.weixin.qq.com/cgi-bin'),
})

/**
 * Register the 4 management tools.
 * @param ctx - Cordis context carrying the tool registry.
 * @param config - Deployment config with nightly root path and WeChat API base.
 */
export function apply(ctx: Context, config: Config): void {
  // Tool 1: nightly_status — read file inventory for a given date.
  ctx.tools.register(defineTool({
    name: 'nightly_status',
    description: 'Check the pipeline status for a given date. Returns which files exist, QC verdicts, and publish state.',
    parameters: {
      date: {
        type: 'string',
        required: true,
        description: 'Date in YYYY-MM-DD format (e.g., 2026-08-16).',
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          date: { type: 'string', required: true },
          files: {
            type: 'array',
            required: true,
            items: { type: 'string' },
          },
          hasFullMd: { type: 'boolean', required: true },
          hasQcVerdict: { type: 'boolean', required: true },
          published: { type: 'boolean', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: `Status for ${value.date}: ${value.files.length} files, full.md=${value.hasFullMd}, QC=${value.hasQcVerdict}, published=${value.published}`,
      }],
    },
    async execute(args) {
      const dateDir = path.join(config.nightlyRoot, 'output', 'md', args.date)

      try {
        const files = await fs.readdir(dateDir)
        const hasFullMd = files.includes('full.md')
        const hasQcVerdict = files.some(f => f.endsWith('.qc.json'))
        const published = files.some(f => f.includes('published'))

        return {
          date: args.date,
          files,
          hasFullMd,
          hasQcVerdict,
          published,
        }
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
          return {
            date: args.date,
            files: [],
            hasFullMd: false,
            hasQcVerdict: false,
            published: false,
          }
        }
        throw err
      }
    },
    presentCall: args => ({ card: 'generic', title: `Check status for ${args.date}`, kind: 'other' }),
  }))

  // Tool 2: list_viewpoints — return the 9 registered viewpoint configs.
  ctx.tools.register(defineTool({
    name: 'list_viewpoints',
    description: 'List the 9 registered viewpoint personas (付鹏, 常士杉, 芒格, etc.) with their display names, prompt files, and generation parameters.',
    parameters: {},
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          viewpoints: {
            type: 'array',
            required: true,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                id: { type: 'string', required: true },
                displayName: { type: 'string', required: true },
                promptFile: { type: 'string', required: true },
                temperature: { type: 'number', required: true },
                maxTokens: { type: 'integer', required: true },
              },
            },
          },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: `${value.viewpoints.length} viewpoints registered: ${value.viewpoints.map(v => v.displayName).join(', ')}`,
      }],
    },
    execute() {
      // Hardcoded from scripts/rewrite_viewpoint.py:45-117
      const viewpoints = [
        { id: 'fupeng', displayName: '付鹏（宏观-交易）', promptFile: 'fupeng.md', temperature: 0.7, maxTokens: 16000 },
        { id: 'boss-mo', displayName: 'BOSS 墨（盈亏比/刻舟求剑）', promptFile: 'boss-mo.md', temperature: 0.65, maxTokens: 8000 },
        { id: 'benben', displayName: '笨总（景气投资/A股三段式）', promptFile: 'benben.md', temperature: 0.7, maxTokens: 8000 },
        { id: 'munger', displayName: '芒格式（逆向思考/认知偏误）', promptFile: 'munger.md', temperature: 0.65, maxTokens: 8000 },
        { id: 'taleb', displayName: '塔勒布式（反脆弱/Skin in the Game）', promptFile: 'taleb.md', temperature: 0.7, maxTokens: 8000 },
        { id: 'naval', displayName: 'Naval 式（杠杆/特定知识/重新定义）', promptFile: 'naval.md', temperature: 0.7, maxTokens: 8000 },
        { id: 'zettaranc', displayName: 'Z 哥（万千，少妇战法/周期/稀缺性）', promptFile: 'zettaranc.md', temperature: 0.7, maxTokens: 8000 },
        { id: 'serenity', displayName: '白毛股神（AI 供应链瓶颈/A 股翻译版）', promptFile: 'serenity.md', temperature: 0.7, maxTokens: 8000 },
        { id: 'changshishan', displayName: '常士杉（私募一哥，实战派/3221止盈/温度系统）', promptFile: 'changshishan.md', temperature: 0.75, maxTokens: 16000 },
      ]
      return Promise.resolve({ viewpoints })
    },
    presentCall: () => ({ card: 'generic', title: 'List viewpoints', kind: 'other' }),
  }))

  // Tool 3: list_wechat_drafts — list drafts in the WeChat backend (stub for M3).
  ctx.tools.register(defineTool({
    name: 'list_wechat_drafts',
    description: 'List drafts in the WeChat public account backend. Returns draft metadata (title, create time, media ID).',
    parameters: {
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
          drafts: {
            type: 'array',
            required: true,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                mediaId: { type: 'string', required: true },
                title: { type: 'string', required: true },
                createdAt: { type: 'integer', required: true },
              },
            },
          },
          totalCount: { type: 'integer', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: `${value.drafts.length} drafts (total ${value.totalCount})`,
      }],
    },
    execute() {
      // Stub — will be implemented in M3 with WeChat API integration.
      return Promise.resolve({ drafts: [], totalCount: 0 })
    },
    presentCall: () => ({ card: 'generic', title: 'List WeChat drafts', kind: 'other' }),
  }))

  // Tool 4: delete_wechat_draft — delete a draft from WeChat backend (stub for M3).
  ctx.tools.register(defineTool({
    name: 'delete_wechat_draft',
    description: 'Delete a draft from the WeChat public account backend by media ID.',
    parameters: {
      mediaId: {
        type: 'string',
        required: true,
        description: 'The media ID of the draft to delete.',
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          deleted: { type: 'boolean', required: true },
          mediaId: { type: 'string', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: value.deleted ? `Deleted draft ${value.mediaId}` : `Failed to delete draft ${value.mediaId}`,
      }],
    },
    execute(args) {
      // Stub — will be implemented in M3 with WeChat API integration.
      return Promise.resolve({ deleted: false, mediaId: args.mediaId })
    },
    presentCall: args => ({ card: 'generic', title: `Delete draft ${args.mediaId}`, kind: 'other' }),
  }))
}
