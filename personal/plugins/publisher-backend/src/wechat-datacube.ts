/**
 * WeChat DataCube API client.
 *
 * All HTTP calls are routed through the SSH SOCKS5 tunnel via `curl`.
 * Access tokens are cached with a 7200s TTL (WeChat default expiry).
 *
 * @module @personal/publisher-backend/wechat-datacube
 */

import { spawn } from 'node:child_process'
import { ensureTunnel } from './tunnel.ts'

/** WeChat API base URL. */
const WECHAT_API = 'https://api.weixin.qq.com'

/** Cached access token with expiry. */
let tokenCache: { token: string; expiresAt: number } | null = null

/**
 * Execute an HTTP request through the SOCKS5 tunnel using curl.
 * Mirrors the curl_json() pattern from wechat_draft.py.
 *
 * @param url - Full URL to request.
 * @param data - Optional POST body (JSON).
 * @param socksPort - Local SOCKS5 proxy port.
 * @param timeout - Request timeout in seconds.
 * @returns Parsed JSON response.
 */
async function curlJson(
  url: string,
  data: Record<string, unknown> | null,
  socksPort: number,
  timeout = 30,
): Promise<Record<string, unknown>> {
  const args = [
    '-s', '--max-time', String(timeout),
    '--socks5-hostname', `127.0.0.1:${socksPort}`,
    '-H', 'Content-Type: application/json',
  ]
  if (data !== null) {
    args.push('-X', 'POST', '-d', JSON.stringify(data))
  }
  args.push(url)

  return new Promise((resolve, reject) => {
    const proc = spawn('curl', args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    proc.stdout.on('data', (chunk: Buffer) => { stdout += chunk.toString() })
    proc.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString() })
    proc.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`curl failed (exit ${code}): ${stderr}`))
        return
      }
      try {
        resolve(JSON.parse(stdout) as Record<string, unknown>)
      } catch {
        reject(new Error(`Bad JSON from ${url}: ${stdout.slice(0, 300)}`))
      }
    })
    proc.on('error', (err) => reject(err))
  })
}

/**
 * Format a Date as YYYY-MM-DD string for WeChat API parameters.
 */
function formatDate(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Get a WeChat access token, using cache when valid.
 *
 * @param appId - WeChat app ID.
 * @param appSecret - WeChat app secret.
 * @param tunnelHost - SSH tunnel host override.
 * @param tunnelUser - SSH tunnel user override.
 * @returns The access token string.
 */
export async function getAccessToken(
  appId: string,
  appSecret: string,
  tunnelHost?: string,
  tunnelUser?: string,
): Promise<string> {
  // Return cached token if still valid (with 5min safety margin).
  if (tokenCache && tokenCache.expiresAt > Date.now() + 300_000) {
    return tokenCache.token
  }

  const socksPort = await ensureTunnel(tunnelHost, tunnelUser)
  const url = `${WECHAT_API}/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
  const resp = await curlJson(url, null, socksPort)

  if (typeof resp.access_token !== 'string') {
    throw new Error(`WeChat token error: ${JSON.stringify(resp)}`)
  }

  tokenCache = {
    token: resp.access_token as string,
    // WeChat tokens expire in 7200s; cache for that duration.
    expiresAt: Date.now() + 7200_000,
  }
  return tokenCache.token
}

/**
 * Clear the cached access token (useful for force-refresh).
 */
export function clearTokenCache(): void {
  tokenCache = null
}

/**
 * Get article summary data from WeChat datacube API.
 * Returns per-article stats for the given date range.
 *
 * @param accessToken - Valid WeChat access token.
 * @param beginDate - Start date (YYYY-MM-DD).
 * @param endDate - End date (YYYY-MM-DD).
 * @returns Array of article stat objects.
 */
export async function getArticleSummary(
  accessToken: string,
  beginDate: string,
  endDate: string,
): Promise<Array<{
  msgId: string
  title: string
  readCount: number
  shareCount: number
  likeCount: number
  favoriteCount: number
  publishDate: string
}>> {
  const socksPort = await ensureTunnel()
  const url = `${WECHAT_API}/datacube/getarticlesummary?access_token=${accessToken}`
  const resp = await curlJson(url, { begin_date: beginDate, end_date: endDate }, socksPort)

  if (resp.errcode != null && resp.errcode !== 0) {
    throw new Error(`WeChat API error: ${resp.errmsg} (code ${resp.errcode})`)
  }

  const list = (resp.list as Array<Record<string, unknown>>) ?? []
  return list.map((item) => ({
    msgId: String(item.msgid ?? ''),
    title: String(item.title ?? ''),
    readCount: Number(item.int_page_read_count ?? 0),
    shareCount: Number(item.share_count ?? 0),
    likeCount: Number(item.like_count ?? 0),
    favoriteCount: Number(item.fav_count ?? 0),
    publishDate: String(item.ref_date ?? beginDate),
  }))
}

/**
 * Get total article data from WeChat datacube API.
 * Returns per-article detail including fan read counts.
 *
 * @param accessToken - Valid WeChat access token.
 * @param beginDate - Start date (YYYY-MM-DD).
 * @param endDate - End date (YYYY-MM-DD).
 * @returns Array of article stat objects.
 */
export async function getArticleTotal(
  accessToken: string,
  beginDate: string,
  endDate: string,
): Promise<Array<{
  msgId: string
  title: string
  readCount: number
  shareCount: number
  likeCount: number
  favoriteCount: number
  publishDate: string
}>> {
  const socksPort = await ensureTunnel()
  const url = `${WECHAT_API}/datacube/getarticletotal?access_token=${accessToken}`
  const resp = await curlJson(url, { begin_date: beginDate, end_date: endDate }, socksPort)

  if (resp.errcode != null && resp.errcode !== 0) {
    throw new Error(`WeChat API error: ${resp.errmsg} (code ${resp.errcode})`)
  }

  // getarticletotal returns { list: [{ ref_date, details: [{ ... }] }] }
  const list = (resp.list as Array<Record<string, unknown>>) ?? []
  const results: Array<{
    msgId: string
    title: string
    readCount: number
    shareCount: number
    likeCount: number
    favoriteCount: number
    publishDate: string
  }> = []

  for (const dayEntry of list) {
    const refDate = String(dayEntry.ref_date ?? '')
    const details = (dayEntry.details as Array<Record<string, unknown>>) ?? []
    for (const detail of details) {
      results.push({
        msgId: String(detail.msgid ?? ''),
        title: String(detail.title ?? ''),
        readCount: Number(detail.int_page_read_count ?? 0),
        shareCount: Number(detail.share_count ?? 0),
        likeCount: Number(detail.like_count ?? 0),
        favoriteCount: Number(detail.fav_count ?? 0),
        publishDate: refDate,
      })
    }
  }
  return results
}

/**
 * Get comments for a specific article.
 *
 * @param accessToken - Valid WeChat access token.
 * @param msgId - The message ID (media_id) of the article.
 * @param offset - Pagination offset (0-based).
 * @param limit - Page size (max 50).
 * @returns Array of comment objects and total count.
 */
export async function getComments(
  accessToken: string,
  msgId: string,
  offset: number,
  limit: number,
): Promise<{
  comments: Array<{
    id: string
    content: string
    userNickname: string
    createdAt: number
    replyContent: string | undefined
  }>
  totalCount: number
}> {
  const socksPort = await ensureTunnel()
  const url = `${WECHAT_API}/comment/list?access_token=${accessToken}`
  const resp = await curlJson(url, {
    msg_data_id: msgId,
    index: 0, // first article in the message
    begin: offset,
    count: Math.min(limit, 50),
    type: 0, // all comments (ordinary + reply)
  }, socksPort)

  if (resp.errcode != null && resp.errcode !== 0) {
    throw new Error(`WeChat API error: ${resp.errmsg} (code ${resp.errcode})`)
  }

  const total = Number(resp.total ?? 0)
  const commentList = (resp.comment as Array<Record<string, unknown>>) ?? []
  const comments = commentList.map((c) => ({
    id: String(c.user_comment_id ?? ''),
    content: String(c.content ?? ''),
    userNickname: String(c.openid ?? c.nickname ?? ''),
    createdAt: Number(c.create_time ?? 0),
    replyContent: c.reply != null ? String((c.reply as Record<string, unknown>).content ?? '') : undefined,
  }))

  return { comments, totalCount: total }
}

/**
 * Get article summary data for multiple days (for trend analysis).
 * Queries each day individually to get per-day granularity.
 *
 * @param accessToken - Valid WeChat access token.
 * @param days - Number of days to look back from today.
 * @returns Array of daily aggregated stats.
 */
export async function getMultiDayStats(
  accessToken: string,
  days: number,
): Promise<{
  dailyReads: Array<{ date: string; reads: number }>
  articleReads: Array<{ title: string; reads: number }>
}> {
  const today = new Date()
  // WeChat datacube API has a 1-day delay — yesterday is the latest available.
  const endDate = new Date(today)
  endDate.setDate(endDate.getDate() - 1)
  const startDate = new Date(endDate)
  startDate.setDate(startDate.getDate() - (days - 1))

  const beginDateStr = formatDate(startDate)
  const endDateStr = formatDate(endDate)

  const articles = await getArticleSummary(accessToken, beginDateStr, endDateStr)

  // Aggregate daily reads.
  const dailyMap = new Map<string, number>()
  for (const article of articles) {
    const date = article.publishDate
    dailyMap.set(date, (dailyMap.get(date) ?? 0) + article.readCount)
  }
  const dailyReads = Array.from(dailyMap.entries())
    .map(([date, reads]) => ({ date, reads }))
    .sort((a, b) => a.date.localeCompare(b.date))

  // Deduplicate articles by msgId and aggregate reads.
  const articleMap = new Map<string, { title: string; reads: number }>()
  for (const article of articles) {
    const existing = articleMap.get(article.msgId)
    if (existing) {
      existing.reads += article.readCount
    } else {
      articleMap.set(article.msgId, { title: article.title, reads: article.readCount })
    }
  }
  const articleReads = Array.from(articleMap.values())
    .sort((a, b) => b.reads - a.reads)

  return { dailyReads, articleReads }
}

/**
 * Detect milestones (round-number read thresholds crossed).
 *
 * @param articles - Article stat entries.
 * @returns Array of milestone entries.
 */
export function detectMilestones(
  dailyReads: Array<{ date: string; reads: number }>,
): Array<{ date: string; threshold: number }> {
  const milestones: Array<{ date: string; threshold: number }> = []
  let cumulative = 0
  const thresholds = [1000, 5000, 10000, 50000, 100000]
  let nextThresholdIdx = 0

  for (const day of dailyReads) {
    cumulative += day.reads
    while (nextThresholdIdx < thresholds.length && cumulative >= thresholds[nextThresholdIdx]!) {
      milestones.push({ date: day.date, threshold: thresholds[nextThresholdIdx]! })
      nextThresholdIdx++
    }
  }
  return milestones
}

export { formatDate }
