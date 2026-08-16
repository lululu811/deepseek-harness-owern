/**
 * ArticleList — 11 article cards with viewpoint avatars + action buttons.
 *
 * Renders as a `'conversation.view'` tab (full-width center column).
 * Displays articles as lattice-background cards with pixel-art viewpoint avatars.
 * Action buttons are placeholders — actual session.prompt wiring lands in M7 follow-up.
 *
 * @module @personal/publisher-ui/ArticleList
 */

import type { PublisherArticle } from '../types.ts'
import type { SlotStandardProps } from './StatusBoard.tsx'
import css from '../styles.module.css'

/** 9 viewpoints mapped to distinct pixel colors. */
const VIEWPOINT_COLORS: Record<string, string> = {
  fupeng: '#e74c3c',
  changshishan: '#3498db',
  munger: '#9b59b6',
  taleb: '#f39c12',
  naval: '#1abc9c',
  zettaranc: '#e91e63',
  benben: '#00bcd4',
  'boss-mo': '#ff5722',
  serenity: '#8bc34a',
}

/** Pixel-art viewpoint avatar (first letter, distinct color per viewpoint). */
function ViewpointAvatar({ viewpoint }: { viewpoint: string }) {
  const color = VIEWPOINT_COLORS[viewpoint] ?? '#95a5a6'
  return (
    <div className={css.viewpointAvatar} style={{ backgroundColor: color }}>
      {viewpoint[0]?.toUpperCase() ?? '?'}
    </div>
  )
}

interface ArticleCardProps {
  article: PublisherArticle
  onRewrite: (articleId: string) => void
  onPublish: (articleId: string) => void
}

/** Single article card with viewpoint avatar, QC badge, and action buttons. */
function ArticleCard({ article, onRewrite, onPublish }: ArticleCardProps) {
  return (
    <article className={css.card}>
      <ViewpointAvatar viewpoint={article.viewpoint} />

      <div className={css.cardContent}>
        <h4 className={css.cardTitle}>{article.title}</h4>

        {article.qcVerdict && (
          <span className={`${css.qcBadge} ${css[`qc${article.qcVerdict}`]}`}>
            {article.qcVerdict}
          </span>
        )}

        <div className={css.cardMeta}>
          {article.wordCount && <span>{article.wordCount} words</span>}
          {article.published && <span className={css.publishedBadge}>Published</span>}
        </div>
      </div>

      <div className={css.cardActions}>
        <button
          className={css.actionButton}
          onClick={() => onRewrite(article.id)}
          disabled={article.published}
        >
          Rewrite
        </button>
        <button
          className={css.actionButtonPrimary}
          onClick={() => onPublish(article.id)}
          disabled={article.published}
        >
          Publish
        </button>
      </div>
    </article>
  )
}

/**
 * ArticleList — conversation.view tab occupant.
 * Reads `publisher.articles` projection; renders cards.
 *
 * Action buttons are visual placeholders in this MVP — wiring to agent
 * prompts requires the session.prompt/command seat, which surfaces through
 * `useSession().session.prompt(...)` once the runtime exposes it. Follow-up.
 */
export function PublisherArticlesView({ useProjection }: SlotStandardProps) {
  const articles = useProjection('publisher.articles') as PublisherArticle[] | null | undefined

  // Placeholder handlers — wired to agent prompts in a follow-up.
  const handleRewrite = (_articleId: string) => { /* no-op for MVP */ }
  const handlePublish = (_articleId: string) => { /* no-op for MVP */ }

  if (!articles || articles.length === 0) {
    return (
      <div className={css.emptyState}>
        <p>No articles yet</p>
        <p className={css.hint}>Run split_articles to generate articles</p>
      </div>
    )
  }

  return (
    <div className={css.articleGrid}>
      <h3 className={css.viewTitle}>Articles ({articles.length})</h3>
      {articles.map(article => (
        <ArticleCard
          key={article.id}
          article={article}
          onRewrite={handleRewrite}
          onPublish={handlePublish}
        />
      ))}
    </div>
  )
}