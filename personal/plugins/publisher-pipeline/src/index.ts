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
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { PublisherStatus, PublisherArticle } from './types.ts'
import { runNightlyScript } from './spawn.ts'
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

  // ── Tool 1: pull_zsxq ─────────────────────────────────────────────────────
  ctx.tools.register(defineTool({
    name: 'pull_zsxq',
    description: 'Pull raw content from 知识星球 (zsxq) for a given date. Downloads JSON files to drafts/raw/<date>/.',
    parameters: {
      date: { type: 'string', required: true, description: 'Date in YYYY-MM-DD format.' },
      hours: { type: 'integer', required: true, description: 'Lookback window in hours (default 24).' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean', required: true },
          filesDownloaded: { type: 'integer', required: true },
          message: { type: 'string', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: value.success ? `Pulled ${value.filesDownloaded} files` : `Failed: ${value.message}`,
      }],
    },
    async execute(args, exec) {
      const outcome = await runNightlyScript('pull_zsxq.sh', ['--date', args.date, '--hours', String(args.hours)], exec.signal)
      const filesMatch = outcome.stdout.match(/(\d+) files? downloaded/)
      return {
        success: outcome.exitCode === 0,
        filesDownloaded: filesMatch?.[1] ? parseInt(filesMatch[1], 10) : 0,
        message: outcome.exitCode === 0 ? 'Success' : outcome.stderr || outcome.stdout,
      }
    },
    presentCall: args => ({ card: 'generic', title: `Pull zsxq for ${args.date}`, kind: 'other' }),
  }))

  // ── Tool 2: build_full_md ─────────────────────────────────────────────────
  ctx.tools.register(defineTool({
    name: 'build_full_md',
    description: 'Build the consolidated full.md from raw zsxq JSON files. Output: output/md/<date>/full.md.',
    parameters: {
      date: { type: 'string', required: true, description: 'Date in YYYY-MM-DD format.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean', required: true },
          outputPath: { type: 'string', required: true },
          wordCount: { type: 'integer', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: value.success ? `Built full.md (${value.wordCount} words)` : 'Failed to build full.md',
      }],
    },
    async execute(args, exec) {
      const outcome = await runNightlyScript('build_full_md.sh', [args.date], exec.signal)
      const fs = await import('node:fs/promises')
      const outputPath = `/Users/chenlei/001_project/小陈的每日夜报/output/md/${args.date}/full.md`
      let wordCount = 0
      try {
        const content = await fs.readFile(outputPath, 'utf-8')
        wordCount = content.split(/\s+/).length
      } catch { /* file may not exist on error */ }
      return {
        success: outcome.exitCode === 0,
        outputPath,
        wordCount,
      }
    },
    presentCall: args => ({ card: 'generic', title: `Build full.md for ${args.date}`, kind: 'other' }),
  }))

  // ── Tool 3: split_articles ────────────────────────────────────────────────
  ctx.tools.register(defineTool({
    name: 'split_articles',
    description: 'Split full.md into individual article .md files. Output: output/md/<date>/articles/*.md. Returns article metadata for the publisher.articles projection.',
    parameters: {
      date: { type: 'string', required: true, description: 'Date in YYYY-MM-DD format.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean', required: true },
          articleCount: { type: 'integer', required: true },
          articles: {
            type: 'array',
            required: true,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                id: { type: 'string', required: true },
                title: { type: 'string', required: true },
                wordCount: { type: 'integer', required: true },
              },
            },
          },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: value.success ? `Split into ${value.articleCount} articles` : 'Failed to split articles',
      }],
    },
    async execute(args, exec) {
      const outcome = await runNightlyScript('split_zsxq_to_md.py', [args.date], exec.signal)
      const fs = await import('node:fs/promises')
      const pathMod = await import('node:path')
      const articlesDir = `/Users/chenlei/001_project/小陈的每日夜报/output/md/${args.date}/articles`
      const articles: { id: string; title: string; wordCount: number }[] = []
      try {
        const files = await fs.readdir(articlesDir)
        for (const file of files.filter(f => f.endsWith('.md'))) {
          const content = await fs.readFile(pathMod.join(articlesDir, file), 'utf-8')
          const titleMatch = content.match(/^#\s+(.+)$/m)
          articles.push({
            id: file.replace(/\.md$/, ''),
            title: titleMatch?.[1] ?? file,
            wordCount: content.split(/\s+/).length,
          })
        }
      } catch { /* directory may not exist on error */ }
      return {
        success: outcome.exitCode === 0,
        articleCount: articles.length,
        articles,
      }
    },
    presentCall: args => ({ card: 'generic', title: `Split articles for ${args.date}`, kind: 'other' }),
  }))

  // ── Tool 4: rewrite_viewpoint ─────────────────────────────────────────────
  ctx.tools.register(defineTool({
    name: 'rewrite_viewpoint',
    description: 'Rewrite full.md using a specific viewpoint persona (e.g., fupeng, munger, changshishan). Output: output/md/<date>/<viewpoint>.md.',
    parameters: {
      date: { type: 'string', required: true, description: 'Date in YYYY-MM-DD format.' },
      viewpoint: { type: 'string', required: true, description: 'Viewpoint ID (e.g., fupeng, munger, changshishan). Use list_viewpoints to see all options.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean', required: true },
          outputPath: { type: 'string', required: true },
          wordCount: { type: 'integer', required: true },
          charCount: { type: 'integer', required: true },
        },
      },
      render: (args, value) => [{
        type: 'text',
        text: value.success ? `Rewrote with ${args.viewpoint} viewpoint (${value.wordCount} words, ${value.charCount} chars)` : 'Rewrite failed',
      }],
    },
    async execute(args, exec) {
      const outcome = await runNightlyScript('rewrite_viewpoint.py', [args.date, '--viewpoint', args.viewpoint], exec.signal)
      const fs = await import('node:fs/promises')
      const outputPath = `/Users/chenlei/001_project/小陈的每日夜报/output/md/${args.date}/${args.viewpoint}.md`
      let wordCount = 0
      let charCount = 0
      try {
        const content = await fs.readFile(outputPath, 'utf-8')
        wordCount = content.split(/\s+/).length
        charCount = content.length
      } catch { /* file may not exist on error */ }
      return {
        success: outcome.exitCode === 0,
        outputPath,
        wordCount,
        charCount,
      }
    },
    presentCall: args => ({ card: 'generic', title: `Rewrite with ${args.viewpoint}`, kind: 'other' }),
  }))

  // ── Tool 5: qc_viewpoint ──────────────────────────────────────────────────
  ctx.tools.register(defineTool({
    name: 'qc_viewpoint',
    description: 'Quality-check a viewpoint rewrite. Scores 6 dimensions (persona, independent judgment, anti-pattern, fidelity, readability, compliance) and returns PASS/WARN/FAIL verdict.',
    parameters: {
      date: { type: 'string', required: true, description: 'Date in YYYY-MM-DD format.' },
      viewpoint: { type: 'string', required: true, description: 'Viewpoint ID to QC.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean', required: true },
          verdict: { type: 'string', required: true },
          overallScore: { type: 'number', required: true },
          strengths: { type: 'array', required: true, items: { type: 'string' } },
          fixes: { type: 'array', required: true, items: { type: 'string' } },
          oneLine: { type: 'string', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: `${value.verdict} (overall ${value.overallScore.toFixed(1)}): ${value.oneLine}`,
      }],
    },
    async execute(args, exec) {
      const outcome = await runNightlyScript('qc_viewpoint.py', [args.date, '--viewpoint', args.viewpoint], exec.signal)
      // Parse QC JSON from stdout (last line before exit)
      const jsonMatch = outcome.stdout.match(/\{[\s\S]*\}/)
      if (!jsonMatch || outcome.exitCode > 2) {
        return {
          success: false,
          verdict: 'FAIL',
          overallScore: 0,
          strengths: [],
          fixes: [],
          oneLine: outcome.stderr || 'QC failed to produce output',
        }
      }
      try {
        const qc = JSON.parse(jsonMatch[0])
        const dims = qc.dimensions || {}
        const scores = Object.values(dims).map((d: any) => d.score || 0)
        const overall = scores.reduce((a, b) => a + b, 0) / scores.length
        return {
          success: outcome.exitCode <= 1, // PASS=0, WARN=1, FAIL=2
          verdict: outcome.exitCode === 0 ? 'PASS' : outcome.exitCode === 1 ? 'WARN' : 'FAIL',
          overallScore: overall,
          strengths: qc.strengths || [],
          fixes: qc.fixes || [],
          oneLine: qc.one_line || '',
        }
      } catch {
        return {
          success: false,
          verdict: 'FAIL',
          overallScore: 0,
          strengths: [],
          fixes: [],
          oneLine: 'Failed to parse QC output',
        }
      }
    },
    presentCall: args => ({ card: 'generic', title: `QC ${args.viewpoint}`, kind: 'other' }),
  }))

  // ── Tool 6: deep_dive ─────────────────────────────────────────────────────
  ctx.tools.register(defineTool({
    name: 'deep_dive',
    description: 'Generate deep-dive analysis articles using LLM-selected viewpoints. Long-running (2-5 min). Output: output/md/<date>/deep-dive/*.md.',
    parameters: {
      date: { type: 'string', required: true, description: 'Date in YYYY-MM-DD format.' },
      themes: { type: 'integer', required: true, description: 'Number of top themes to analyze (default 3).' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean', required: true },
          articlesGenerated: { type: 'integer', required: true },
          message: { type: 'string', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: value.success ? `Generated ${value.articlesGenerated} deep-dive articles` : `Failed: ${value.message}`,
      }],
    },
    async execute(args, exec) {
      const outcome = await runNightlyScript('deep_dive.sh', [args.date, '--themes', String(args.themes)], exec.signal)
      const match = outcome.stdout.match(/(\d+) articles? generated/)
      return {
        success: outcome.exitCode === 0,
        articlesGenerated: match?.[1] ? parseInt(match[1], 10) : 0,
        message: outcome.exitCode === 0 ? 'Success' : outcome.stderr || outcome.stdout,
      }
    },
    presentCall: args => ({ card: 'generic', title: `Deep dive for ${args.date}`, kind: 'other' }),
  }))

  // ── Tool 7: push_to_ima ───────────────────────────────────────────────────
  ctx.tools.register(defineTool({
    name: 'push_to_ima',
    description: 'Push articles to IMA knowledge base (小陈 ai 笔记 / 小陈每日夜报).',
    parameters: {
      date: { type: 'string', required: true, description: 'Date in YYYY-MM-DD format.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean', required: true },
          filesPushed: { type: 'integer', required: true },
          message: { type: 'string', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: value.success ? `Pushed ${value.filesPushed} files to IMA` : `Failed: ${value.message}`,
      }],
    },
    async execute(args, exec) {
      const outcome = await runNightlyScript('push_to_ima.py', ['--articles', `output/md/${args.date}/articles`], exec.signal)
      const match = outcome.stdout.match(/(\d+) files? pushed/)
      return {
        success: outcome.exitCode === 0,
        filesPushed: match?.[1] ? parseInt(match[1], 10) : 0,
        message: outcome.exitCode === 0 ? 'Success' : outcome.stderr || outcome.stdout,
      }
    },
    presentCall: args => ({ card: 'generic', title: `Push to IMA for ${args.date}`, kind: 'other' }),
  }))

  // ── Tool 8: render_wechat_html ────────────────────────────────────────────
  ctx.tools.register(defineTool({
    name: 'render_wechat_html',
    description: 'Render a viewpoint rewrite as WeChat-ready HTML with inline CSS. Output: output/md/<date>/<viewpoint>.wechat.html.',
    parameters: {
      date: { type: 'string', required: true, description: 'Date in YYYY-MM-DD format.' },
      viewpoint: { type: 'string', required: true, description: 'Viewpoint ID.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean', required: true },
          outputPath: { type: 'string', required: true },
          fileSize: { type: 'integer', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: value.success ? `Rendered HTML (${value.fileSize} bytes)` : 'Render failed',
      }],
    },
    async execute(args, exec) {
      const mdPath = `/Users/chenlei/001_project/小陈的每日夜报/output/md/${args.date}/${args.viewpoint}.md`
      const htmlPath = `/Users/chenlei/001_project/小陈的每日夜报/output/md/${args.date}/${args.viewpoint}.wechat.html`
      const outcome = await runNightlyScript('md_to_wechat_html.py', [mdPath, htmlPath], exec.signal)
      const fs = await import('node:fs/promises')
      let fileSize = 0
      try {
        const stat = await fs.stat(htmlPath)
        fileSize = stat.size
      } catch { /* file may not exist on error */ }
      return {
        success: outcome.exitCode === 0,
        outputPath: htmlPath,
        fileSize,
      }
    },
    presentCall: args => ({ card: 'generic', title: `Render HTML for ${args.viewpoint}`, kind: 'other' }),
  }))

  // ── Tool 9: publish_to_wechat ─────────────────────────────────────────────
  ctx.tools.register(defineTool({
    name: 'publish_to_wechat',
    description: 'Publish a viewpoint rewrite to WeChat public account via SSH tunnel. Requires render_wechat_html to be run first.',
    parameters: {
      date: { type: 'string', required: true, description: 'Date in YYYY-MM-DD format.' },
      viewpoint: { type: 'string', required: true, description: 'Viewpoint ID.' },
      remote: { type: 'boolean', required: true, description: 'If true, publish immediately; if false, save as draft.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean', required: true },
          published: { type: 'boolean', required: true },
          message: { type: 'string', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: value.success ? (value.published ? 'Published to WeChat' : 'Saved as draft') : `Failed: ${value.message}`,
      }],
    },
    async execute(args, exec) {
      const args_ = [args.date, args.viewpoint]
      if (args.remote) args_.push('--remote')
      const outcome = await runNightlyScript('publish_html.sh', args_, exec.signal)
      return {
        success: outcome.exitCode === 0,
        published: args.remote && outcome.exitCode === 0,
        message: outcome.exitCode === 0 ? 'Success' : outcome.stderr || outcome.stdout,
      }
    },
    presentCall: args => ({ card: 'generic', title: `Publish ${args.viewpoint}`, kind: 'other' }),
  }))

  // ── Tool 10: send_feishu_poster ───────────────────────────────────────────
  ctx.tools.register(defineTool({
    name: 'send_feishu_poster',
    description: 'Send the nightly poster image to Feishu (Lark). Requires render_poster.sh to be run first.',
    parameters: {
      date: { type: 'string', required: true, description: 'Date in YYYY-MM-DD format.' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean', required: true },
          message: { type: 'string', required: true },
        },
      },
      render: (_args, value) => [{
        type: 'text',
        text: value.success ? 'Sent to Feishu' : `Failed: ${value.message}`,
      }],
    },
    async execute(args, exec) {
      const outcome = await runNightlyScript('send_feishu.sh', [args.date], exec.signal)
      return {
        success: outcome.exitCode === 0,
        message: outcome.exitCode === 0 ? 'Success' : outcome.stderr || outcome.stdout,
      }
    },
    presentCall: args => ({ card: 'generic', title: `Send Feishu poster for ${args.date}`, kind: 'other' }),
  }))
}
