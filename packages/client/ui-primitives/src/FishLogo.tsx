// 小陈的工作室 pixel mark (Z 家军 pixel grammar): a silver-chinchilla
// kitten head — round face, emerald eyes with honey-gold catchlights, pink
// collar, gold tag dot — built from pixel-step rects on a transparent
// plate. Fur silver rides the fixed --dsw-static-silver-* scale; the pink
// collar and nose follow the theme's brand alias. Native 16x16. The
// FishLogo name is retained for call-site stability; the glyph is the
// studio's kitten mark.

import type { IconProps } from './icons/props.ts'

/**
 * Render the studio pixel kitten mark.
 * @param props.size - width in px (default 24; height keeps the 1:1 ratio).
 * @param props.className - extra class for layout placement.
 * @returns the mark svg (aria-hidden; pair with the wordmark for accessibility).
 */
export function FishLogo({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      {/* Ears: deep-silver shells with silver-light inner pixels. */}
      <path d="M2 1h3v3H2zM11 1h3v3h-3z" fill="var(--dsw-static-silver-300)" />
      <path d="M3 2h1v1H3zM12 2h1v1h-1z" fill="var(--dsw-static-silver-100)" />
      {/* Head. */}
      <path d="M3 3h10v9H3z" fill="var(--dsw-static-silver-100)" />
      {/* Eyes: emerald, one honey-gold catchlight each. */}
      <path d="M4 5h2v3H4zM10 5h2v3h-2z" fill="var(--dsw-static-green-500)" />
      <path d="M4 5h1v1H4zM10 5h1v1h-1z" fill="var(--dsw-static-amber-500)" />
      {/* Nose and mouth. */}
      <path d="M7 7h2v1H7z" fill="var(--dsw-alias-brand-primary)" />
      <path d="M6 9h4v1H6z" fill="var(--dsw-static-silver-300)" />
      {/* Collar with a gold tag dot. */}
      <path d="M4 12h8v2H4z" fill="var(--dsw-alias-brand-primary)" />
      <path d="M7 14h2v1H7z" fill="var(--dsw-static-amber-500)" />
    </svg>
  )
}
