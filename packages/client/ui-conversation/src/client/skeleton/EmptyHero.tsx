// Hero chrome for the blank-draft phase of ConversationRoot: pixel brand
// mark, glow backdrop, and the workspace row. Pure presentation — the resident
// composer is NOT rendered here (it keeps its own stable tree position in
// ConversationRoot so the textarea survives the hero → composer flip); CSS
// positions it over this shell's glow area during the hero phase.

import type { ReactNode, RefObject } from 'react'
import {
  FishLogo, IconChevronDownOutline14, IconFolderClose16, IconFolderOpen16,
} from '@deepseek-ai/dsh-client-ui-primitives'
import { workspaceTitleOf } from '@deepseek-ai/dsh-client-runtime/client'
import type { ConversationSlotProps } from '../contract/slots.ts'
import css from './HeroShell.module.css'

/** The owner's locale seat type, passed to hero chrome as a plain prop. */
type HeroTranslate = ConversationSlotProps['t']

/**
 * Basename label for the workspace chip (the shared derivation);
 * separator-only paths echo the raw cwd.
 * @param cwd - workspace directory path (non-empty).
 * @returns chip label.
 */
export function workspaceLabel(cwd: string): string {
  const base = workspaceTitleOf(cwd)
  return base !== '' ? base : cwd
}

/**
 * The workspace chip (folder + label + chevron), always interactive: before
 * the first message the workspace stays switchable — picking another one
 * moves the New Session flow to that workspace's blank session. Without a
 * label the chip renders its placeholder state: closed folder + the
 * "Choose workspace" call to action.
 * @param props.label - chip label (see {@link workspaceLabel}); omitted → placeholder.
 * @param props.menuOpen - menu expansion echo.
 * @param props.onClick - menu toggle.
 * @returns the chip button element.
 */
export function WorkspaceChip({ buttonRef, label, menuOpen = false, onClick, t }: {
  buttonRef?: RefObject<HTMLButtonElement>
  label?: string | undefined
  menuOpen?: boolean
  onClick?: () => void
  t: HeroTranslate
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={css.workspace}
      aria-label={t('hero.chooseWorkspace')}
      aria-haspopup="menu"
      aria-expanded={menuOpen}
      onClick={onClick}
    >
      {label === undefined
        ? <IconFolderClose16 className={css.folder} size={16} />
        : <IconFolderOpen16 className={css.folder} size={16} />}
      <span className={css.workspaceLabel}>{label ?? t('hero.chooseWorkspace')}</span>
      <IconChevronDownOutline14 className={css.chevron} size={12} />
    </button>
  )
}

/**
 * Pixel particle cluster over the conversation-root grid backdrop: scattered
 * brand-pink, honey-gold, and mint blocks around the composer seat (the full
 * lattice lives on ConversationRoot's root background). Rendered by the hero
 * owner (ConversationRoot), not HeroShell, so it can center on the input
 * card; the owner's className supplies all positioning.
 * @param props.className - positioning class from the owner.
 * @returns the pixel-decor svg element.
 */
export function HeroGlow({ className }: { className?: string | undefined }) {
  return (
    <svg className={className} viewBox="0 0 1051 468" fill="none" aria-hidden="true">
      <g fill="var(--dsw-alias-brand-primary)" opacity="0.5">
        <rect x="96" y="150" width="8" height="8" />
        <rect x="112" y="166" width="8" height="8" />
        <rect x="80" y="174" width="8" height="8" />
        <rect x="852" y="140" width="8" height="8" />
        <rect x="868" y="156" width="8" height="8" />
        <rect x="836" y="164" width="8" height="8" />
        <rect x="880" y="186" width="8" height="8" />
      </g>
      <g fill="var(--dsw-static-amber-500)" opacity="0.5">
        <rect x="470" y="118" width="8" height="8" />
        <rect x="486" y="134" width="8" height="8" />
        <rect x="566" y="122" width="8" height="8" />
      </g>
      <g fill="var(--dsw-static-green-500)" opacity="0.4">
        <rect x="560" y="178" width="8" height="8" />
        <rect x="576" y="194" width="8" height="8" />
        <rect x="466" y="196" width="8" height="8" />
      </g>
    </svg>
  )
}

/** Hero chrome props. The workspace row rides the InputBar accessory hole, not here. */
export interface HeroShellProps {
  /** The owner's locale seat, passed down as a plain prop. */
  t: HeroTranslate
  /** Overlay content after the stack (modals). */
  children?: ReactNode
}

/**
 * Render the hero chrome (headline only; no glow, no composer, no workspace
 * row — the glow is the owner's {@link HeroGlow}).
 * @param props - see {@link HeroShellProps}.
 * @returns the centered hero element tree.
 */
export function HeroShell({ t, children }: HeroShellProps) {
  return (
    <div className={css.root}>
      <div className={css.stack}>
        <div className={css.headline}>
          {/* Studio kitten mark (FishLogo) leading the headline. */}
          <FishLogo size={28} className={css.heroMark} />
          <span className={css.headlineText}>{t('hero.headline')}</span>
        </div>
        <div className={css.body}>
          {/* The resident composer (ConversationRoot's root-owned scrollport;
              the workspace row rides the stack above the card) is CSS-centered
              in that scroll body during hero — see
              ConversationRoot.module.css [data-phase='hero']. */}
        </div>
      </div>
      {children}
    </div>
  )
}
