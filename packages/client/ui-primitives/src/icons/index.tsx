/**
 * ic_ds_* icon set for the dsh web UI. All glyphs render fill="currentColor"
 * and take {size, className}. Batch A mirrors the deepsuite icon library
 * (same figma source); batch B glyphs are harness-only figma extracts.
 */
import type { IconProps } from './props.ts'

export type { IconProps } from './props.ts'

/** ic_ds_new_chat_outline_16 */
/** ic_ds_pixel_IconNewChatOutline16 — 小陈的工作室 pixel icon */
export const IconNewChatOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2h10v2h2v6h-2v2H8v2H6v-2H2V2zm2 2v6h5v-2h3V4H4zm7 8v2H8v-2h3zM6 6h2v2H6V6zm4 0h-2v2h2V6z" fill="currentColor" />
  </svg>
)

/** ic_ds_search_outline_16 */
/** ic_ds_pixel_IconSearchOutline16 — 小陈的工作室 pixel icon */
export const IconSearchOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2h7v2h2v5H9v2H2V2zm2 2v5h5V4H4zm7 7h2v2h-2v-2zm2 2h2v2h-2v-2z" fill="currentColor" />
  </svg>
)

/** ic_ds_globe_outline_14 — meridian globe (harness-only figma extract). */
/** ic_ds_pixel_IconGlobeOutline14 — 小陈的工作室 pixel icon */
export const IconGlobeOutline14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 1h4v1h2v2h2v2h1v4h-1v2h-2v2h-2v1H6v-1H4v-2H2v-2H1V6h1V4h2V2h2V1zm0 2H4v2h2V3zm4 0H8v3h4V4h-2V3zm2 5H8v3h4v-1h1V8h-1zm-6 3v2h2v-2H6zm-3-1v2h2v-2H3zm-1-3h2v2H2V7zm0-2h2V4H3v1H2z" fill="currentColor" />
  </svg>
)

/** ic_ds_settings_outline_14 */
/** ic_ds_pixel_IconSettingsOutline14 — 小陈的工作室 pixel icon */
export const IconSettingsOutline14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 1h4v2h1l2 1 1 2v2l-1 2-2 1h-1v2H6v-2H5l-2-1-1-2V6l1-2 2-1h1V1zm1 4v4h2V5H7z" fill="currentColor" />
  </svg>
)

/** ic_ds_settings_outline_16 */
export const IconSettingsOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1450_63327)">
      <path
        d="M14.0861 5.51366C13.8717 5.0575 13.588 4.58542 13.2889 4.18108C13.208 4.07172 13.1596 4.04373 13.0243 4.03054C12.4277 3.97255 11.8245 4.05527 11.2269 3.9972C10.7224 3.94816 10.3133 3.71661 10.0115 3.30919C9.66986 2.84777 9.43973 2.31343 9.09824 1.85234C9.01771 1.74365 8.96805 1.71589 8.83354 1.70282C8.29432 1.65044 7.70402 1.65061 7.16656 1.70282C7.03205 1.71589 6.98239 1.74365 6.90186 1.85234C6.56067 2.31303 6.33025 2.84774 5.98855 3.30919C5.68681 3.71661 5.27774 3.94816 4.77317 3.9972C4.17564 4.05527 3.57239 3.97255 2.97585 4.03054C2.84046 4.04373 2.79208 4.07172 2.71115 4.18108C2.41212 4.58542 2.12835 5.0575 1.91403 5.51366C1.85299 5.64359 1.85286 5.7018 1.91403 5.8319C2.14865 6.33077 2.49748 6.76892 2.73237 7.26854C2.9594 7.7515 2.96041 8.24717 2.73338 8.73044C2.49837 9.23061 2.14891 9.66837 1.91403 10.1681C1.85291 10.2982 1.85299 10.3564 1.91403 10.4863C2.12856 10.9429 2.41185 11.4142 2.71115 11.8189C2.79208 11.9283 2.84046 11.9563 2.97585 11.9694C3.57239 12.0274 4.17564 11.9447 4.77317 12.0028C5.27774 12.0518 5.68681 12.2834 5.98855 12.6908C6.33024 13.1522 6.56037 13.6866 6.90186 14.1476C6.98239 14.2563 7.03205 14.2841 7.16656 14.2972C7.70402 14.3494 8.29432 14.3495 8.83354 14.2972C8.96805 14.2841 9.01771 14.2563 9.09824 14.1476C9.43944 13.687 9.66985 13.1522 10.0115 12.6908C10.3133 12.2834 10.7224 12.0518 11.2269 12.0028C11.8244 11.9447 12.4271 12.0275 13.0243 11.9694C13.1596 11.9563 13.208 11.9283 13.2889 11.8189C13.5891 11.4131 13.872 10.942 14.0861 10.4863C14.1471 10.3564 14.1472 10.2982 14.0861 10.1681C13.8513 9.66861 13.5017 9.23061 13.2667 8.73044C13.0397 8.24717 13.0407 7.7515 13.2677 7.26854C13.5026 6.7689 13.8513 6.33106 14.0861 5.8319C14.1472 5.7018 14.1471 5.64359 14.0861 5.51366ZM15.3035 6.40373C15.0685 6.90359 14.7188 7.34119 14.4841 7.84037C14.4231 7.97025 14.423 8.02855 14.4841 8.15861C14.7189 8.65833 15.0685 9.09611 15.3035 9.59626C15.5308 10.0801 15.5308 10.5744 15.3035 11.0582C15.052 11.5933 14.7225 12.1426 14.37 12.6191C14.0685 13.0265 13.6581 13.259 13.1536 13.3081C12.5566 13.366 11.9541 13.2835 11.3573 13.3414C11.2228 13.3545 11.1731 13.3823 11.0926 13.491C10.7511 13.9521 10.521 14.4864 10.1793 14.9478C9.87828 15.3542 9.46719 15.5869 8.96387 15.6358C8.34008 15.6964 7.66194 15.6966 7.03623 15.6358C6.53291 15.5869 6.12182 15.3542 5.82084 14.9478C5.47911 14.4863 5.24878 13.9517 4.90753 13.491C4.82701 13.3823 4.77734 13.3545 4.64284 13.3414C4.04647 13.2835 3.44373 13.366 2.84653 13.3081C2.34201 13.259 1.93164 13.0265 1.63013 12.6191C1.27867 12.144 0.948453 11.5941 0.696621 11.0582C0.469315 10.5744 0.469279 10.0801 0.696621 9.59626C0.931628 9.09613 1.2813 8.65807 1.51597 8.15861C1.57708 8.02855 1.57702 7.97025 1.51597 7.84037C1.28117 7.34095 0.931635 6.9036 0.696621 6.40373C0.469213 5.91992 0.469367 5.42562 0.696621 4.94183C0.948441 4.40587 1.27868 3.85598 1.63013 3.38092C1.93164 2.97349 2.34201 2.74095 2.84653 2.6919C3.44353 2.63397 4.04599 2.71649 4.64284 2.65856C4.77734 2.64549 4.82701 2.61774 4.90753 2.50904C5.24905 2.04792 5.47913 1.51362 5.82084 1.05219C6.12182 0.645806 6.53291 0.413119 7.03623 0.364178C7.66002 0.303556 8.33816 0.303369 8.96387 0.364178C9.46719 0.413119 9.87828 0.645806 10.1793 1.05219C10.521 1.51365 10.7513 2.04828 11.0926 2.50904C11.1731 2.61774 11.2228 2.64549 11.3573 2.65856C11.9541 2.71649 12.5566 2.63397 13.1536 2.6919C13.6581 2.74095 14.0685 2.97349 14.37 3.38092C14.7214 3.85598 15.0517 4.40587 15.3035 4.94183C15.5307 5.42562 15.5309 5.91992 15.3035 6.40373Z"
        fill="currentColor"
      />
      <path
        d="M9.13764 7.99999C9.13764 7.3715 8.62855 6.8624 8.00005 6.8624C7.37155 6.8624 6.86246 7.3715 6.86246 7.99999C6.86246 8.62849 7.37155 9.13759 8.00005 9.13759C8.62855 9.13759 9.13764 8.62849 9.13764 7.99999ZM10.4834 7.99999C10.4834 9.37126 9.37132 10.4833 8.00005 10.4833C6.62878 10.4833 5.51674 9.37126 5.51674 7.99999C5.51674 6.62873 6.62878 5.51669 8.00005 5.51669C9.37132 5.51669 10.4834 6.62873 10.4834 7.99999Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_1450_63327">
        <rect width={16} height={16} fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
)

/** ic_ds_panel_left_outline_16 */
/** ic_ds_pixel_IconPanelLeftOutline16 — 小陈的工作室 pixel icon */
export const IconPanelLeftOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 2h14v12H1V2zm2 2v8h3V4H3zm5 0v8h6V4H8z" fill="currentColor" />
  </svg>
)

/** ic_ds_ellipsis_outline_16 */
/** ic_ds_pixel_IconEllipsisOutline16 — 小陈的工作室 pixel icon */
export const IconEllipsisOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 7h2v2H2V7zm5 0h2v2H7V7zm5 0h2v2h-2V7z" fill="currentColor" />
  </svg>
)

/** ic_ds_plus_outline_16 */
/** ic_ds_pixel_IconPlusOutline16 — 小陈的工作室 pixel icon */
export const IconPlusOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 2h2v4h4v2H9v4H7V8H3V6h4V2z" fill="currentColor" />
  </svg>
)

/** ic_ds_check_outline_16 */
/** ic_ds_pixel_IconCheckOutline16 — 小陈的工作室 pixel icon */
export const IconCheckOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 3h2v2h-2v2h-2v2H9v2H7v-2H5V7H3V5h2v2h2v2h2V7h2V5h2V3z" fill="currentColor" />
  </svg>
)

/** ic_ds_check_outline_14 */
export const IconCheckOutline14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.5635 4.58984L7.61426 9.07715C7.35154 9.37561 7.11346 9.64812 6.89453 9.84668C6.66593 10.054 6.38519 10.2506 6.01465 10.3164C5.82079 10.3508 5.62207 10.3529 5.42773 10.3213C5.0561 10.2609 4.77266 10.0674 4.54102 9.86328C4.31926 9.66791 4.07752 9.39911 3.81055 9.10449L2.44531 7.59863L3.55664 6.59082L4.92188 8.09766C5.21256 8.41844 5.38878 8.61191 5.53223 8.73828C5.61022 8.80699 5.65253 8.83192 5.66895 8.83984C5.69648 8.84429 5.72449 8.84467 5.75195 8.83984C5.72657 8.84451 5.75564 8.85422 5.88672 8.73535C6.02833 8.60692 6.20225 8.41088 6.48828 8.08594L10.4385 3.59961L11.5635 4.58984Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_branch_outline_16 */
/** ic_ds_pixel_IconBranchOutline16 — 小陈的工作室 pixel icon */
export const IconBranchOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 1h3v3H3V1zm0 5h3v3H3V6zm0 5h3v3H3v-3zm7-6h3v3h-3V5zm-2 2h2v2H8V7zM4 4v2h1V4H4zm0 5v2h1V9H4z" fill="currentColor" />
  </svg>
)

/** ic_ds_chevron_down_outline_14 */
/** ic_ds_pixel_IconChevronDownOutline14 — 小陈的工作室 pixel icon */
export const IconChevronDownOutline14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5h2v2h2v2h4V7h2V5h2v2h-2v2h-2v2H6V9H4V7H2V5z" fill="currentColor" />
  </svg>
)

/** ic_ds_chevron_left_outline_14 */
/** ic_ds_pixel_IconChevronLeftOutline14 — 小陈的工作室 pixel icon */
export const IconChevronLeftOutline14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 2v2H9v2H7v4h2v2h2v2H9v-2H7v-2H5V6h2V4h2V2h2z" fill="currentColor" />
  </svg>
)

/** ic_ds_chevron_right_outline_14 */
/** ic_ds_pixel_IconChevronRightOutline14 — 小陈的工作室 pixel icon */
export const IconChevronRightOutline14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2v2h2v2h2v4H7v2H5v2h2v-2h2v-2h2V6H9V4H7V2H5z" fill="currentColor" />
  </svg>
)

/** ic_ds_triangle_right_fill_14 — tree expand arrow; points right, consumers rotate it 90° for the open state. */
export const IconTriangleRightFill14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.25 2.82782L4.25 11.1722C4.25 11.6622 4.84243 11.9076 5.18891 11.5611L9.36109 7.38891C9.57588 7.17412 9.57588 6.82588 9.36109 6.61109L5.18891 2.43891C4.84243 2.09243 4.25 2.33782 4.25 2.82782Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_chevron_up_outline_14 */
/** ic_ds_pixel_IconChevronUpOutline14 — 小陈的工作室 pixel icon */
export const IconChevronUpOutline14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11h2V9h2V7h4v2h2v2h2V9h-2V7h-2V5H6v2H4v2H2v2z" fill="currentColor" />
  </svg>
)

/** ic_ds_close_outline_16 */
/** ic_ds_pixel_IconCloseOutline16 — 小陈的工作室 pixel icon */
export const IconCloseOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2h2v2h2v2h4V4h2V2h2v2h-2v2h-2v2h2v2h2v2h-2v-2h-2v-2H6v2H4v2H2v-2h2v-2h2V8H4V6H2V2z" fill="currentColor" />
  </svg>
)

/** ic_ds_close_fill_14 */
export const IconCloseFill14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.6074 4.40278L8.00975 6.99973L10.6074 9.59739L9.59736 10.6074L6.9997 8.00978L4.40274 10.6074L3.3927 9.59739L5.98966 6.99973L3.3927 4.40278L4.40274 3.39273L6.9997 5.98969L9.59736 3.39273L10.6074 4.40278Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_copy_outline_16 */
/** ic_ds_pixel_IconCopyOutline16 — 小陈的工作室 pixel icon */
export const IconCopyOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 1h8v2H4V1zm-2 3h8v2H2V4zm0 3h10v9H2V7zm2 2v5h6V9H4z" fill="currentColor" />
  </svg>
)

/** ic_ds_refresh_outline_16 */
/** ic_ds_pixel_IconRefreshOutline16 — 小陈的工作室 pixel icon */
export const IconRefreshOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1h6v6h-2V4h-2V3H7v2H5v2H3v2H1V7h2V5h2V3h2V1zm2 14H3V9h2v3h2v1h2v-2h2v-2h2v-2h2v2h-2v2h-2v2h-2v1z" fill="currentColor" />
  </svg>
)

/** ic_ds_refresh_outline_14 — 14px seat of the shared pixel glyph. */
/** ic_ds_pixel_IconRefreshOutline14 — 小陈的工作室 pixel icon */
export const IconRefreshOutline14 = ({ size = 14, className }: IconProps) => (
  <IconRefreshOutline16 size={size} className={className} />
)

/** ic_ds_like_outline_16 */
export const IconLikeOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.27868 0.811572C8.81991 0.142194 9.79022 0.0421835 10.4538 0.557601L10.5823 0.669306L10.6066 0.693544L10.6097 0.695652L10.6392 0.725159C11.355 1.44679 11.6337 2.49468 11.3716 3.47669L11.3706 3.48091L11.3611 3.51674L11.3601 3.51885L10.889 5.22604C10.8796 5.25997 10.8707 5.29157 10.8627 5.32088C10.8934 5.32095 10.927 5.32194 10.9628 5.32194H11.9007C12.4264 5.32194 12.7831 5.319 13.0651 5.36725C14.8182 5.66719 15.9851 7.34568 15.6565 9.09357C15.6036 9.37487 15.477 9.7092 15.294 10.2022L14.3371 12.7798C14.1402 13.3104 13.9774 13.7518 13.8102 14.1024C13.6376 14.4645 13.4386 14.7793 13.1442 15.0424C12.9712 15.197 12.7802 15.3303 12.5751 15.4386C12.226 15.6231 11.8608 15.7 11.4612 15.7358C11.0743 15.7705 10.6035 15.7695 10.0375 15.7695H4.87377C4.08053 15.7695 3.42928 15.7702 2.90734 15.7137C2.37212 15.6557 1.88991 15.5311 1.46676 15.2237C1.22415 15.0474 1.01078 14.8339 0.834466 14.5914C0.527021 14.1682 0.401373 13.686 0.343384 13.1508C0.286822 12.6287 0.287531 11.9769 0.287531 11.1833V9.51405C0.287531 8.84778 0.281347 8.36714 0.399237 7.9565C0.671152 7.00935 1.41115 6.26832 2.35829 5.99638C2.76894 5.87849 3.24958 5.88573 3.91585 5.88573C4.11983 5.88573 4.14548 5.88319 4.16244 5.88046C4.23532 5.86863 4.30409 5.83663 4.35845 5.78667C4.3711 5.77504 4.38761 5.75604 4.51442 5.59488L8.25655 0.838972L8.2576 0.837918L8.27868 0.811572ZM1.69122 11.1833C1.69122 12.0082 1.69217 12.5711 1.73865 13.0001C1.78371 13.4157 1.86473 13.6221 1.96943 13.7662C2.0592 13.8898 2.16733 13.9989 2.29085 14.0887C2.43501 14.1934 2.64216 14.2744 3.05803 14.3195C3.45897 14.3629 3.97637 14.3656 4.7157 14.3659C4.30801 13.8053 4.06453 13.1171 4.06444 12.371V8.59406H5.46813V12.371C5.46838 13.4733 6.36166 14.3669 7.46407 14.3669H10.0375C10.6286 14.3669 11.0269 14.3663 11.3369 14.3385C11.6339 14.3118 11.7956 14.2638 11.9196 14.1983C12.0241 14.1431 12.1213 14.0747 12.2094 13.996C12.314 13.9025 12.4151 13.7678 12.5435 13.4986C12.6774 13.2176 12.8162 12.845 13.0219 12.2909L13.9788 9.71322C14.1848 9.15816 14.2531 8.96731 14.2781 8.83433C14.4618 7.85692 13.8093 6.91895 12.8291 6.75092C12.6957 6.7281 12.4928 6.72458 11.9007 6.72458H10.9628C10.7737 6.72458 10.5693 6.72657 10.4 6.70666C10.2211 6.68562 9.96702 6.63024 9.74771 6.43161C9.64454 6.33811 9.55957 6.2261 9.4969 6.10177C9.3639 5.83784 9.37799 5.57899 9.40521 5.40097C9.431 5.23261 9.48672 5.03616 9.53694 4.85404L10.008 3.14579L10.0175 3.11102C10.1488 2.61338 10.0078 2.08338 9.64654 1.71681L9.6086 1.67887L9.55064 1.64304C9.48795 1.62043 9.41425 1.63814 9.36938 1.69362L9.35779 1.70627L9.35884 1.70732L5.61672 6.46217C5.51822 6.58735 5.42237 6.7133 5.30689 6.81942C5.05075 7.05471 4.73126 7.20939 4.38796 7.26519C4.23315 7.29032 4.07513 7.28837 3.91585 7.28837C3.15356 7.28837 2.91916 7.2957 2.7461 7.34528C2.26364 7.48379 1.88564 7.86081 1.74708 8.34325C1.69738 8.51636 1.69122 8.7511 1.69122 9.51405V11.1833Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_like_fill_16 */
export const IconLikeFill16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.0593 12.922L15.0976 10.1247C15.3087 9.5559 15.4143 9.27138 15.4566 9.04658C15.7349 7.56751 14.7472 6.14737 13.2637 5.89357C13.0382 5.85499 12.7348 5.85499 12.1281 5.85499H11.1099C10.6615 5.85499 10.4372 5.85499 10.3034 5.73376C10.2607 5.69508 10.2255 5.64885 10.1995 5.5974C10.1182 5.43613 10.1778 5.21997 10.297 4.78765L10.8081 2.93419L10.819 2.89456C11.0336 2.09024 10.8051 1.23244 10.2189 0.64139L10.1898 0.612405L10.1692 0.592068C9.77357 0.210076 9.13559 0.249344 8.78983 0.676966L8.77186 0.699678L4.71076 5.86083C4.52965 6.09101 4.38573 6.35138 4.38573 6.64427V12.7431C4.38573 14.3601 5.69654 15.6709 7.31351 15.6709L10.1068 15.6709C11.3628 15.6709 11.9908 15.6709 12.5043 15.3995C12.6723 15.3107 12.8289 15.2018 12.9706 15.0752C13.4037 14.6882 13.6222 14.0995 14.0593 12.922Z"
      fill="currentColor"
    />
    <path
      d="M2.91388 13.2113C2.91388 14.6907 4.08499 15.5536 4.08499 15.5536H2.65606C1.46328 15.5536 0.496338 14.5866 0.496338 13.3938V8.34439C0.496338 7.15161 1.46328 6.18467 2.65606 6.18467H2.91388V13.2113Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_dislike_outline_16 */
export const IconDislikeOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.72451 15.1086C7.18929 15.7705 6.22975 15.8694 5.57357 15.3597L5.44643 15.2492L5.42247 15.2253L5.41934 15.2232L5.39016 15.194C4.68239 14.4804 4.40679 13.4441 4.66589 12.473L4.66693 12.4689L4.67631 12.4334L4.67735 12.4314L5.14318 10.7431C5.15243 10.7096 5.1613 10.6783 5.16923 10.6493C5.13878 10.6493 5.10558 10.6483 5.07023 10.6483H4.14274C3.62288 10.6483 3.27015 10.6512 2.9912 10.6035C1.25757 10.3069 0.103662 8.64702 0.42863 6.91854C0.480965 6.64037 0.606164 6.30975 0.787119 5.82223L1.73336 3.27321C1.92812 2.74852 2.08912 2.31209 2.25442 1.96535C2.42515 1.60724 2.62191 1.29594 2.91304 1.03578C3.08408 0.882951 3.273 0.751121 3.47579 0.643944C3.82102 0.461504 4.18214 0.38551 4.57731 0.350066C4.95993 0.315784 5.42553 0.316718 5.98521 0.316718H11.0916C11.876 0.316718 12.52 0.31607 13.0362 0.37195C13.5655 0.429293 14.0423 0.552534 14.4608 0.856536C14.7007 1.03085 14.9117 1.24193 15.086 1.48181C15.3901 1.90027 15.5143 2.37709 15.5717 2.90638C15.6276 3.42269 15.6269 4.06721 15.6269 4.85202V6.50274C15.6269 7.1616 15.633 7.6369 15.5164 8.04299C15.2475 8.97962 14.5158 9.71242 13.5791 9.98133C13.173 10.0979 12.6977 10.0908 12.0389 10.0908C11.8372 10.0908 11.8118 10.0933 11.795 10.096C11.723 10.1077 11.6549 10.1393 11.6012 10.1887C11.5887 10.2002 11.5724 10.219 11.447 10.3784L7.74639 15.0815L7.74535 15.0825L7.72451 15.1086ZM14.2388 4.85202C14.2388 4.03628 14.2379 3.47965 14.1919 3.05541C14.1473 2.64443 14.0672 2.4403 13.9637 2.29779C13.8749 2.17562 13.768 2.06769 13.6458 1.9789C13.5033 1.87532 13.2984 1.79523 12.8872 1.75067C12.4907 1.70773 11.979 1.70511 11.2479 1.70482C11.6511 2.25917 11.8918 2.93968 11.8919 3.67755V7.41251H10.5038V3.67755C10.5036 2.58745 9.62023 1.70378 8.53007 1.70378H5.98521C5.40065 1.70378 5.00679 1.70442 4.70028 1.73192C4.40651 1.7583 4.24662 1.80571 4.12399 1.87052C4.02069 1.92511 3.92452 1.99276 3.8374 2.07061C3.73401 2.16306 3.634 2.2962 3.50705 2.56249C3.37462 2.84027 3.23734 3.20873 3.03393 3.75675L2.08768 6.30578C1.88395 6.85467 1.81646 7.0434 1.79172 7.1749C1.61005 8.14146 2.25533 9.06902 3.22464 9.23517C3.35654 9.25774 3.55717 9.26123 4.14274 9.26123H5.07023C5.25717 9.26123 5.4593 9.25926 5.62672 9.27894C5.80364 9.29975 6.05492 9.35452 6.27179 9.55094C6.37381 9.6434 6.45784 9.75417 6.51982 9.87712C6.65133 10.1381 6.6374 10.3941 6.61048 10.5701C6.58498 10.7366 6.52988 10.9309 6.48022 11.111L6.01439 12.8003L6.00501 12.8347C5.87513 13.3268 6.01464 13.8509 6.37184 14.2134L6.40935 14.2509L6.46667 14.2863C6.52866 14.3087 6.60155 14.2912 6.64591 14.2363L6.65738 14.2238L6.65633 14.2228L10.3569 9.52072C10.4543 9.39693 10.5491 9.27238 10.6633 9.16744C10.9166 8.93476 11.2325 8.7818 11.572 8.72662C11.7251 8.70177 11.8814 8.70369 12.0389 8.70369C12.7927 8.70369 13.0245 8.69645 13.1956 8.64742C13.6727 8.51045 14.0465 8.13761 14.1836 7.66053C14.2327 7.48935 14.2388 7.25721 14.2388 6.50274V4.85202Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_dislike_fill_16 */
export const IconDislikeFill16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.92838 3.06811L0.88799 5.87104C0.676449 6.44097 0.570628 6.72606 0.52825 6.95131C0.249414 8.43336 1.2391 9.85637 2.72555 10.1107C2.95149 10.1493 3.25549 10.1493 3.86348 10.1493H4.88371C5.33306 10.1493 5.55774 10.1493 5.69187 10.2708C5.73467 10.3096 5.76994 10.3559 5.79593 10.4074C5.87738 10.569 5.81766 10.7856 5.69821 11.2188L5.18609 13.076L5.17522 13.1157C4.9602 13.9217 5.1891 14.7812 5.7765 15.3735L5.80568 15.4025L5.82635 15.4229C6.22273 15.8056 6.862 15.7663 7.20846 15.3378L7.22647 15.315L11.2958 10.1435C11.4772 9.91284 11.6214 9.65195 11.6214 9.35847V3.24734C11.6214 1.62711 10.308 0.313655 8.68776 0.313655L5.88886 0.313654C4.63032 0.313654 4.00105 0.313654 3.48649 0.585577C3.31815 0.674536 3.16127 0.783647 3.01929 0.910507C2.58531 1.29828 2.36633 1.88824 1.92838 3.06811Z"
      fill="currentColor"
    />
    <path
      d="M13.0963 2.77815C13.0963 1.29585 11.9228 0.431205 11.9228 0.431205H13.3546C14.5498 0.431205 15.5187 1.4001 15.5187 2.59529V7.65491C15.5187 8.8501 14.5498 9.81899 13.3546 9.81899H13.0963V2.77815Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_share_outline_16 */
export const IconShareOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.95889 1.52285C7.95888 0.826234 8.76055 0.467983 9.27669 0.875208L9.37524 0.967191L15.1317 7.18358C15.5582 7.64419 15.5582 8.35614 15.1317 8.81676L9.37524 15.0331C8.87034 15.578 7.95888 15.2205 7.95889 14.4775V10.8207C7.10614 10.8432 6.31361 10.9316 5.45468 11.2515C4.39484 11.6463 3.18248 12.413 1.64676 13.9425C1.4533 14.135 1.18329 14.1696 0.969086 14.0908C0.74748 14.0091 0.547307 13.7879 0.54859 13.4844L0.55516 13.1315C0.618924 11.3494 1.11153 9.29838 2.27656 7.63787C3.45289 5.96147 5.29554 4.71635 7.95889 4.54797V1.52285ZM9.20911 5.13366C9.20899 5.50567 8.9031 5.77687 8.56523 5.77755C5.99383 5.78282 4.33736 6.8762 3.29964 8.35496C2.54519 9.43014 2.10739 10.7283 1.9152 11.9939C3.04749 11.0323 4.0569 10.4385 5.01917 10.0801C6.29638 9.60449 7.4406 9.56343 8.56429 9.56295C8.9178 9.5628 9.20894 9.84909 9.20911 10.2068L9.20817 13.3737L14.1837 8.00017L9.20817 2.62571L9.20911 5.13366Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_edit_outline_16 */
/** ic_ds_pixel_IconEditOutline16 — 小陈的工作室 pixel icon */
export const IconEditOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 1h4v4l-8 8H3v-4l8-8zm1 3l1-1-1-1-1 1 1 1zM5 11h2l5-5-2-2-5 5v2z" fill="currentColor" />
  </svg>
)

/** ic_ds_think_outline_14 — 14px seat of the shared pixel glyph. */
/** ic_ds_pixel_IconThinkOutline14 — 小陈的工作室 pixel icon */
export const IconThinkOutline14 = ({ size = 14, className }: IconProps) => (
  <IconThinkOutline16 size={size} className={className} />
)

/** ic_ds_think_outline_16 */
/** ic_ds_pixel_IconThinkOutline16 — 小陈的工作室 pixel icon */
export const IconThinkOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2h8v2h2v4h-2v2H9v2H7v-2H4V8H2V4h2V2zm2 4h1v2H6V6zm3 0h1v2H9V6zm-4 7h2v2H5v-2z" fill="currentColor" />
  </svg>
)

/** ic_ds_agent_preset_outline_16 (figma extract): node interiors knock out to transparency via mask, so the glyph sits on any fill. */
/** ic_ds_pixel_IconAgentPresetOutline16 — 小陈的工作室 pixel icon */
export const IconAgentPresetOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 1h8v2h2v4h-2v2h-1v2h2v3H3v-3h2v-2H4V7H2V3h2V1zm2 4h1v2H6V5zm3 0h1v2H9V5z" fill="currentColor" />
  </svg>
)

/** ic_ds_browse_outline_16 */
export const IconBrowseOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.2426 4.80473V6.10551H4.75819V4.80473H11.2426Z" fill="currentColor" />
    <path d="M9.40858 7.84478V9.14557H4.75819V7.84478H9.40858Z" fill="currentColor" />
    <path
      d="M9.23438 0.546389C10.1941 0.546389 10.9683 0.544914 11.5859 0.611819C12.2161 0.680096 12.7634 0.825745 13.2393 1.17139C13.5172 1.3733 13.7619 1.61812 13.9639 1.896C14.3096 2.37183 14.4551 2.91922 14.5234 3.54932C14.5903 4.16686 14.5889 4.94133 14.5889 5.90088V10.0981C14.5889 11.0576 14.5903 11.8321 14.5234 12.4497C14.4552 13.0798 14.3094 13.6272 13.9639 14.103C13.7619 14.381 13.5172 14.6257 13.2393 14.8276C12.7633 15.1734 12.2163 15.3189 11.5859 15.3872C10.9683 15.4541 10.1942 15.4536 9.23438 15.4536H6.76563C5.80591 15.4536 5.03168 15.4541 4.41407 15.3872C3.78385 15.3189 3.23665 15.1734 2.76074 14.8276C2.48291 14.6257 2.23802 14.3809 2.03614 14.103C1.69066 13.6272 1.54483 13.0798 1.47657 12.4497C1.40973 11.8321 1.41114 11.0576 1.41114 10.0981V5.90088C1.41113 4.94132 1.40966 4.16686 1.47657 3.54932C1.54488 2.91921 1.69042 2.37184 2.03614 1.896C2.2381 1.61807 2.4828 1.37333 2.76074 1.17139C3.23665 0.825682 3.78386 0.680109 4.41407 0.611819C5.03168 0.544905 5.80591 0.546389 6.76563 0.546389H9.23438ZM6.76563 1.896C5.77586 1.896 5.0876 1.89738 4.55957 1.95459C4.0443 2.01043 3.76214 2.11349 3.55469 2.26416C3.39135 2.38284 3.24761 2.52662 3.12891 2.68994C2.97821 2.89736 2.8752 3.17967 2.81934 3.69483C2.76214 4.22279 2.76075 4.91131 2.76074 5.90088V10.0981C2.76074 11.0876 2.76221 11.7762 2.81934 12.3042C2.87516 12.8194 2.97829 13.1026 3.12891 13.3101C3.24754 13.4733 3.39147 13.6172 3.55469 13.7358C3.76213 13.8865 4.04438 13.9896 4.55957 14.0454C5.0876 14.1026 5.77586 14.103 6.76563 14.103H9.23438C10.2242 14.103 10.9124 14.1026 11.4404 14.0454C11.9556 13.9896 12.2379 13.8865 12.4453 13.7358C12.6086 13.6172 12.7525 13.4733 12.8711 13.3101C13.0217 13.1026 13.1248 12.8195 13.1807 12.3042C13.2378 11.7762 13.2393 11.0876 13.2393 10.0981V5.90088C13.2393 4.91131 13.2379 4.22279 13.1807 3.69483C13.1248 3.17969 13.0218 2.89736 12.8711 2.68994C12.7524 2.52667 12.6086 2.38281 12.4453 2.26416C12.2379 2.11355 11.9556 2.01041 11.4404 1.95459C10.9124 1.8974 10.2241 1.896 9.23438 1.896H6.76563Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_link_outline_14 — 14px seat of the shared pixel glyph. */
/** ic_ds_pixel_IconLinkOutline14 — 小陈的工作室 pixel icon */
export const IconLinkOutline14 = ({ size = 14, className }: IconProps) => (
  <IconLinkOutline16 size={size} className={className} />
)

/** ic_ds_link_outline_16 */
/** ic_ds_pixel_IconLinkOutline16 — 小陈的工作室 pixel icon */
export const IconLinkOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 7h4v2H2V7zm8 0h4v2h-4V7zm-3-1h2v4H7V6zm-4 4h2v2H3v-2zm8 0h2v2h-2v-2zm-8-6h2V2H3v2zm8 0h2V2h-2v2z" fill="currentColor" />
  </svg>
)

/** ic_ds_right_up_outline_14 */
export const IconRightUpOutline14 = ({ size = 8, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.54199 8.62824C6.54199 8.44193 6.54146 8.28829 6.53906 8.15851L1.11719 13.5814L0.728516 13.1927L0.339844 12.803L5.76172 7.38019C5.63201 7.3778 5.47812 7.37824 5.29199 7.37824H1.43555V6.27863H5.29199C5.65471 6.27863 5.97167 6.27814 6.22852 6.30597C6.49541 6.33493 6.76232 6.3998 7.00293 6.57452C7.13452 6.67013 7.25108 6.78571 7.34668 6.9173C7.52157 7.15808 7.5863 7.4256 7.61523 7.69269C7.64305 7.94948 7.64258 8.26562 7.64258 8.62824V12.4857H6.54199V8.62824Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_right_up_outline_16 */
export const IconRightUpOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.588429 5.147807C13.588429 4.739638 13.587271 4.403003 13.582013 4.118684L1.703098 15.99968L0.85155 15.148178L0 14.294485L11.878915 2.413442C11.594721 2.408199 11.257569 2.409154 10.849776 2.409154H2.400594V0.000001H10.849776C11.644471 0.000001 12.338899 -0.001059 12.901622 0.059909C13.486363 0.123352 14.071136 0.265493 14.598303 0.648292C14.886598 0.857751 15.141981 1.110984 15.351433 1.399281C15.734578 1.926807 15.876362 2.512925 15.939743 3.098105C16.000775 3.660718 15.99968 4.353347 15.99968 5.147807V13.599133H13.588429V5.147807Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_enhance_outline_16 */
/** ic_ds_pixel_IconEnhanceOutline16 — 小陈的工作室 pixel icon */
export const IconEnhanceOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1h2v3h2v2h3v2h-3v2H9v3H7v-3H4V8H1V6h3V4h3V1z" fill="currentColor" />
  </svg>
)

/** ic_ds_trash_outline_16 */
/** ic_ds_pixel_IconTrashOutline16 — 小陈的工作室 pixel icon */
export const IconTrashOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 1h6v2h4v2h-2v9H3V5H1V3h4V1zm6 4H5v7h6V5zM6 7h1v4H6V7zm3 0h1v4H9V7z" fill="currentColor" />
  </svg>
)

/** ic_ds_warning_outline_16 */
export const IconWarningOutline16 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.3002 3.32843L7.69986 3.32843L7.69986 7.79657H6.3002L6.3002 3.32843Z"
      fill="currentColor"
    />
    <path d="M6.3002 9.01935H7.69986V10.6711H6.3002V9.01935Z" fill="currentColor" />
    <path
      d="M12.6328 6.99976C12.6328 3.88874 10.111 1.36694 7 1.36694C3.88899 1.36695 1.3672 3.88875 1.36719 6.99976C1.36719 10.1108 3.88899 12.6326 7 12.6326C10.111 12.6326 12.6328 10.1108 12.6328 6.99976ZM13.8582 6.99976C13.8582 10.7873 10.7876 13.8579 7 13.8579C3.21244 13.8579 0.141846 10.7873 0.141846 6.99976C0.141857 3.2122 3.21245 0.141612 7 0.141602C10.7876 0.141602 13.8581 3.21219 13.8582 6.99976Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_user_outline_16 */
/** ic_ds_pixel_IconUserOutline16 — 小陈的工作室 pixel icon */
export const IconUserOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2h6v5H5V2zm-3 8h12v4H2v-4zm2 2h8v-1H4v1z" fill="currentColor" />
  </svg>
)

/** ic_ds_send_outline_16 */
/** ic_ds_pixel_IconSendOutline16 — 小陈的工作室 pixel icon */
export const IconSendOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 2h3v2h2v2h2v2h2v-2h2V4h3V2h-3v2h-2v2H7V4H4V2H1zm0 12l14-6H9V6H7v2H1v6zm3-2v-2h3v2H4z" fill="currentColor" />
  </svg>
)

/** ic_ds_stop_fill_16 */
/** ic_ds_pixel_IconStopFill16 — 小陈的工作室 pixel icon */
export const IconStopFill16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3h10v10H3V3zm2 2v6h6V5H5z" fill="currentColor" />
  </svg>
)

/** ic_ds_paperclip_outline_16 */
/** ic_ds_pixel_IconPaperclipOutline16 — 小陈的工作室 pixel icon */
export const IconPaperclipOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 1h5v2H5v8h6V5H9v4H7V3h5v9H4V3h2V1z" fill="currentColor" />
  </svg>
)

/** ic_ds_loading_outline_16 */
/** ic_ds_pixel_IconLoadingOutline16 — 小陈的工作室 pixel icon */
export const IconLoadingOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1h2v3H7V1zm5 2h2v2h-2V3zm2 5h-3v2h3V8zm-2 5h2v-2h-2v2zm-5 2h2v-3H7v3zm-5-2h2v-2H2v2zm-2-5h3V8H0v2zm2-5h2V3H2v2z" fill="currentColor" />
  </svg>
)

/** ic_ds_download_outline_16 */
/** ic_ds_pixel_IconDownloadOutline16 — 小陈的工作室 pixel icon */
export const IconDownloadOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1h2v6h3v2h-2v2H9v-2H7v2H5V9h-2V7h3V1h1zm-5 11h12v3H2v-3z" fill="currentColor" />
  </svg>
)

/** ic_ds_play_outline_16 */
/** ic_ds_pixel_IconPlayOutline16 — 小陈的工作室 pixel icon */
export const IconPlayOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2h3v2h2v2h2v2h2v2h-2v2H9v2H7v2H4V2zm2 3v6l5-3-5-3z" fill="currentColor" />
  </svg>
)

/** ic_ds_pause_outline_16 */
/** ic_ds_pixel_IconPauseOutline16 — 小陈的工作室 pixel icon */
export const IconPauseOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 2h4v12H3V2zm6 0h4v12H9V2z" fill="currentColor" />
  </svg>
)

/** ic_ds_fullscreen_outline_16 */
export const IconFullscreenOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.58875 12.3407L6.59167 8.33777L7.66296 9.40808L3.66003 13.411H7.99988V14.8065H3.05457C2.02633 14.8065 1.19324 13.9734 1.19324 12.9452V7.99988H2.58875V12.3407Z"
      fill="currentColor"
    />
    <path
      d="M12.9452 1.19324C13.9734 1.19324 14.8065 2.02633 14.8065 3.05457V7.99988H13.411V3.66003L9.40808 7.66296L8.33777 6.59167L12.3407 2.58875H7.99988V1.19324H12.9452Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_code_outline_16 */
/** ic_ds_pixel_IconCodeOutline16 — 小陈的工作室 pixel icon */
export const IconCodeOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3H3v2H1v6h2v2h2v-2H3V5h2V3zm6 0h2v2h2v6h-2v2h-2v-2h2V5h-2V3zm-3 0h2v2H9l-2 8H5l2-8h1V3z" fill="currentColor" />
  </svg>
)

/** ic_ds_cordis_plugin_outline_14 */
export const IconCordisPluginOutline14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1840_45990)">
      <path
        d="M3.03426 5.66661L1.70084 7.00003L3.0315 8.33069L2.14762 9.21457L-0.0669245 7.00003L2.15038 4.78273L3.03426 5.66661ZM7 14.067L4.77924 11.8462L5.66313 10.9623L7 12.2992L8.33342 10.9658L9.2173 11.8496L7 14.067ZM11.8489 9.21803L10.965 8.33414L12.2992 7.00003L10.9623 5.66316L11.8462 4.77927L14.0669 7.00003L11.8489 9.21803ZM8.33066 3.03153L7 1.70087L5.66589 3.03498L4.782 2.1511L7 -0.0668945L9.21454 2.14765L8.33066 3.03153Z"
        fill="currentColor"
      />
      <rect x="5.98535" y="5.98535" width="2.02942" height="2.02942" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="clip0_1840_45990">
        <rect width="14" height="14" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
)

/** ic_ds_api_outline (figma extract) */
/** ic_ds_pixel_IconApiOutline14 — 小陈的工作室 pixel icon */
export const IconApiOutline14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 3h4v4H2V3zm8 0h4v4h-4V3zm-4 6h4v4H6V9zM4 7h2v2H4V7zm6 0h2v2h-2V7z" fill="currentColor" />
  </svg>
)

/** ic_ds_personalization_outline_16 (figma extract) */
/** ic_ds_pixel_IconPersonalizationOutline16 — 小陈的工作室 pixel icon */
export const IconPersonalizationOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2h4v4H6V2zm-4 7h12v5H2V9zm5-7h2v2H7V2zm-3 9v2h8v-2H4z" fill="currentColor" />
  </svg>
)

/** ic_ds_project_add_outline_16 (figma extract) */
export const IconProjectAddOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none">
    <path transform="translate(9.52 2.52)" d="M3.55246 0L3.55246 2.44252L6 2.44252L6 3.55748L3.55246 3.55748L3.55246 6L2.43834 6L2.43834 3.55748L0 3.55748L0 2.44252L2.43834 2.44252L2.43834 0L3.55246 0Z" fill="currentColor"/>
    <path transform="translate(0.3496 2.35)" d="M4.76367 0C5.36861 1.80598e-05 5.93113 0.310294 6.25488 0.821289L6.78027 1.64941C6.79685 1.67558 6.81791 1.69775 6.83887 1.71973C6.72186 2.15521 6.65702 2.61192 6.65137 3.08301C6.25601 2.96045 5.90909 2.70478 5.68164 2.3457L5.15723 1.5166C5.07183 1.38189 4.92318 1.3008 4.76367 1.30078L2.32422 1.30078C1.7589 1.30078 1.30078 1.7589 1.30078 2.32422L1.30078 10.1338C1.30078 10.6991 1.7589 11.1572 2.32422 11.1572L11.9766 11.1572C12.5419 11.1572 13 10.6991 13 10.1338L13 8.58398C13.4545 8.5135 13.8903 8.38748 14.3008 8.21289L14.3008 10.1338C14.3008 11.4171 13.2598 12.458 11.9766 12.458L2.32422 12.458C1.04093 12.458 0 11.4171 0 10.1338L0 2.32422C0 1.04093 1.04093 0 2.32422 0L4.76367 0Z" fill="currentColor"/>
  </svg>
)

/**
 * folder_open_16, outline layer only: the duotone original above reads a rung
 * heavier than the …Outline16 family, so an icon-button row mixing them looks
 * mismatched — this is the same geometry without the 20%-opacity inner fill.
 */
/** ic_ds_pixel_IconFolderOpenOutline16 — 小陈的工作室 pixel icon */
export const IconFolderOpenOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 2h5v2h8v2H1V2zm1 4h13l-2 8H1l2-8zm2 2l-1 4h9l1-4H4z" fill="currentColor" />
  </svg>
)

/** folder_open_16 (figma extract): outline at full ink + 20%-opacity inner fill riding the same currentColor. */
export const IconFolderOpen16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none">
    <path d="M5.19629 1.57104C5.81144 1.5711 6.38623 1.8786 6.72754 2.39038L7.19922 3.09839C7.28454 3.22635 7.42824 3.30344 7.58203 3.30347H12.1699C13.5039 3.30348 14.5859 4.38548 14.5859 5.71948V6.62671C15.2694 7.02689 15.6605 7.85012 15.4385 8.68726L14.3848 12.658C14.1037 13.7164 13.1449 14.4527 12.0498 14.4529H2.91699C1.51651 14.4529 0.451662 13.2814 0.501954 11.9519V3.98706C0.501954 2.65305 1.58396 1.57104 2.91797 1.57104H5.19629ZM3.7793 7.75562C3.30994 7.75562 2.89883 8.07153 2.77832 8.52515L1.91602 11.7722C1.74167 12.4291 2.23734 13.073 2.91699 13.073H12.0498C12.5191 13.0728 12.9304 12.757 13.0508 12.3035L14.1045 8.33374C14.1819 8.04202 13.9619 7.756 13.6602 7.75562H3.7793ZM2.91797 2.9519C2.34625 2.9519 1.88281 3.41534 1.88281 3.98706V7.2937C2.33068 6.7269 3.02249 6.37476 3.7793 6.37476H13.2051V5.71948C13.2051 5.14777 12.7416 4.68434 12.1699 4.68433H7.58203C6.96675 4.6843 6.39209 4.37595 6.05078 3.86401L5.5791 3.15601C5.49379 3.02821 5.34995 2.95196 5.19629 2.9519H2.91797Z" fill="currentColor"/>
    <path opacity="0.2" d="M13.6602 7.75525C13.9618 7.7556 14.1815 8.04179 14.1045 8.33337L13.0508 12.3031C12.9304 12.7567 12.5191 13.0725 12.0498 13.0726H2.91701C2.23744 13.0725 1.7417 12.4287 1.91603 11.7719L2.77834 8.52478C2.89898 8.07146 3.31018 7.75532 3.77931 7.75525H13.6602ZM5.1963 2.95154C5.34985 2.95159 5.49377 3.02803 5.57912 3.15564L6.0508 3.86365C6.39205 4.37553 6.96685 4.68385 7.58205 4.68396H12.1699C12.7416 4.68396 13.2049 5.14754 13.2051 5.71912V6.37439H3.77931C3.02267 6.37444 2.33067 6.72671 1.88283 7.29333V3.98669C1.88299 3.4152 2.34649 2.95168 2.91798 2.95154H5.1963Z" fill="currentColor"/>
  </svg>
)

/** folder_close_16 (figma extract) */
/** ic_ds_pixel_IconFolderClose16 — 小陈的工作室 pixel icon */
export const IconFolderClose16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 2h5v2h9v10H1V2zm2 4v6h10V6H3z" fill="currentColor" />
  </svg>
)

/** tree_corner_8x10 (figma extract; session-tree "L" connector, stroke geometry pre-expanded) */
export const IconTreeCorner8x10 = ({ size = 10, className }: IconProps) => (
  <svg width={(size * 8) / 10} height={size} className={className} viewBox="-0.5 0 8.5 10.5" fill="none">
    <path d="M0 0L-0.5 0L-0.5 7L0 7L0.5 7L0.5 0L0 0ZM3 10L3 10.5L8 10.5L8 10L8 9.5L3 9.5L3 10ZM0 7L-0.5 7C-0.5 8.933 1.067 10.5 3 10.5L3 10L3 9.5C1.61929 9.5 0.5 8.38071 0.5 7L0 7Z" fill="currentColor"/>
  </svg>
)

/** ic_ds_light_outline_16 */
/** ic_ds_pixel_IconLightOutline16 — 小陈的工作室 pixel icon */
export const IconLightOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1h2v2H7V1zm-4 3h2v2H3V4zm10 0h2v2h-2V4zM1 7h2v2H1V7zm12 0h2v2h-2V7zM3 10h2v2H3v-2zm10 0h2v2h-2v-2zM7 13h2v2H7v-2zm-2-7h6v4H5V6z" fill="currentColor" />
  </svg>
)

/** ic_ds_dark_outline_16 */
/** ic_ds_pixel_IconDarkOutline16 — 小陈的工作室 pixel icon */
export const IconDarkOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2h4v2h2v2h2v4h-2v2H9v2H5V2zm2 2v8h2v-2h2V6H9V4H7z" fill="currentColor" />
  </svg>
)

/** ic_ds_followsystem_outline_16 */
export const IconFollowsystemOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.1665 13.5811V14.7803H3.66651V13.5811H12.1665Z" fill="currentColor" />
    <path
      d="M13.4453 7.02379C13.4453 6.04702 13.4452 5.3616 13.3887 4.83434C13.3333 4.31828 13.2302 4.02378 13.0723 3.80309C12.9446 3.62475 12.7877 3.46883 12.6094 3.34117C12.3887 3.18328 12.0942 3.08007 11.5781 3.02477C11.0508 2.96829 10.3655 2.96715 9.38867 2.96715H6.61035C5.63359 2.96715 4.94816 2.96827 4.4209 3.02477C3.90486 3.0801 3.61034 3.18321 3.38965 3.34117C3.21143 3.46878 3.05534 3.62487 2.92774 3.80309C2.76977 4.02377 2.66667 4.3183 2.61133 4.83434C2.55483 5.3616 2.55371 6.04702 2.55371 7.02379C2.55371 8.0006 2.55485 8.68596 2.61133 9.21324C2.66663 9.72936 2.76983 10.0238 2.92774 10.2445C3.0554 10.4228 3.21131 10.5797 3.38965 10.7074C3.61034 10.8654 3.90484 10.9685 4.4209 11.0238C4.94816 11.0803 5.63359 11.0804 6.61035 11.0804H9.38867C10.3654 11.0804 11.0508 11.0803 11.5781 11.0238C12.0941 10.9685 12.3887 10.8652 12.6094 10.7074C12.7877 10.5797 12.9446 10.4229 13.0723 10.2445C13.2301 10.0238 13.3334 9.72927 13.3887 9.21324C13.4452 8.68596 13.4453 8.00058 13.4453 7.02379ZM14.6455 7.02379C14.6455 7.97428 14.646 8.73509 14.5811 9.34117C14.5149 9.95828 14.3756 10.4858 14.0479 10.9437C13.8436 11.229 13.5938 11.4788 13.3086 11.683C12.8507 12.0108 12.3232 12.15 11.7061 12.2162C11.1 12.2811 10.3391 12.2806 9.38867 12.2806H6.61035C5.66018 12.2806 4.89991 12.2811 4.29395 12.2162C3.67684 12.15 3.14935 12.0108 2.69141 11.683C2.40613 11.4788 2.15639 11.229 1.95215 10.9437C1.62436 10.4858 1.4841 9.95828 1.41797 9.34117C1.35305 8.73511 1.35449 7.97424 1.35449 7.02379C1.35449 6.07366 1.35308 5.31333 1.41797 4.70738C1.4841 4.09028 1.62436 3.56279 1.95215 3.10485C2.15638 2.81956 2.40613 2.56982 2.69141 2.36559C3.14935 2.03779 3.67684 1.89753 4.29395 1.83141C4.8999 1.76652 5.66022 1.76793 6.61035 1.76793H9.38867C10.3391 1.76793 11.1 1.76649 11.7061 1.83141C12.3232 1.89753 12.8507 2.03779 13.3086 2.36559C13.5939 2.56982 13.8436 2.81957 14.0479 3.10485C14.3756 3.56279 14.5149 4.09028 14.5811 4.70738C14.646 5.31335 14.6455 6.07362 14.6455 7.02379Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_ds_data_outline_16 */
/** ic_ds_pixel_IconDataOutline16 — 小陈的工作室 pixel icon */
export const IconDataOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 2h14v3H1V2zm0 5h14v3H1V7zm0 5h14v3H1v-3zm2-8h2V3H3v1zm0 5h2V8H3v1zm0 5h2v-1H3v1z" fill="currentColor" />
  </svg>
)

/** ic_send_outline_14 — 14px seat of the shared pixel glyph. */
/** ic_ds_pixel_IconSendOutline14 — 小陈的工作室 pixel icon */
export const IconSendOutline14 = ({ size = 14, className }: IconProps) => (
  <IconSendOutline16 size={size} className={className} />
)

/** ic_queue_outline_14 (figma extract): open chat bubble with two queued lines. */
export const IconQueueOutline14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.00049 0.199829C3.24488 0.199829 0.199952 3.24408 0.199707 6.99963C0.199707 8.0414 0.434087 9.03061 0.854004 9.91467L1.11279 10.4576L2.19775 9.94202L1.94092 9.39905L1.81787 9.12268C1.5498 8.46885 1.40186 7.75171 1.40186 6.99963C1.4021 3.90808 3.90888 1.40198 7.00049 1.40198C10.0919 1.40219 12.5979 3.90821 12.5981 6.99963C12.5981 10.0913 10.0921 12.5981 7.00049 12.5983C6.36734 12.5983 5.90348 12.5535 5.49268 12.4401C5.08803 12.3283 4.7041 12.1414 4.24463 11.8209C3.57111 11.3511 2.60588 11.1855 1.81006 11.6881L1.79736 11.6959L1.78467 11.7047L1.25537 12.0778L1.65381 13.2672L2.46045 12.6989C2.75029 12.5214 3.18004 12.5442 3.55615 12.8063C4.10063 13.1861 4.60863 13.4423 5.17334 13.5983C5.73194 13.7525 6.31665 13.8004 7.00049 13.8004C10.7561 13.8002 13.8003 10.7553 13.8003 6.99963C13.8 3.24421 10.7559 0.200041 7.00049 0.199829ZM3.81201 7.47327V8.67542H7.11572V7.47327H3.81201ZM3.81201 6.34924H10.2173V5.14709H3.81201V6.34924Z"
      fill="currentColor"
    />
  </svg>
)

/** ic_checklist_outline_14 (figma extract): two rings + two list bars. */
export const IconChecklistOutline14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3277 9.69629V10.976H7.28086V9.69629H13.3277Z" fill="currentColor" />
    <path d="M13.3277 2.97256V4.25225H7.28086V2.97256H13.3277Z" fill="currentColor" />
    <path d="M4.64512 10.336C4.64505 9.62755 4.07081 9.05322 3.3623 9.05322C2.65386 9.05329 2.07956 9.62759 2.07949 10.336C2.07949 11.0445 2.65382 11.6188 3.3623 11.6188C4.07085 11.6188 4.64512 11.0446 4.64512 10.336ZM5.92559 10.336C5.92559 11.7515 4.77777 12.8993 3.3623 12.8993C1.94689 12.8993 0.799805 11.7515 0.799805 10.336C0.799871 8.92066 1.94693 7.7736 3.3623 7.77354C4.77773 7.77354 5.92552 8.92062 5.92559 10.336Z" fill="currentColor" />
    <path d="M4.64531 3.6123C4.6453 2.90382 4.07098 2.32949 3.3625 2.32949C2.65403 2.32951 2.0797 2.90383 2.07969 3.6123C2.07969 4.32079 2.65402 4.8951 3.3625 4.89512C4.07099 4.89512 4.64531 4.3208 4.64531 3.6123ZM5.925 3.6123C5.925 5.02772 4.77792 6.1748 3.3625 6.1748C1.9471 6.17479 0.8 5.02771 0.8 3.6123C0.800013 2.19691 1.9471 1.04982 3.3625 1.0498C4.77791 1.0498 5.92499 2.1969 5.925 3.6123Z" fill="currentColor" />
  </svg>
)

/** ic_ds_List_Pen_outline_16 */
/** ic_ds_pixel_IconListPenOutline16 — 小陈的工作室 pixel icon */
export const IconListPenOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 3h6v2H1V3zm0 4h5v2H1V7zm0 4h4v2H1v-2zm9-7h4v2h-4V4zm2 3h3v2h-3V7zm-1 3h4v4h-4v-4z" fill="currentColor" />
  </svg>
)

/** ic_ds_goal_outline_16 (goal strip leading glyph: dartboard with a landed arrow) */
/** ic_ds_pixel_IconGoalOutline16 — 小陈的工作室 pixel icon */
export const IconGoalOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 1h4v2h2v2h2v4h-2v2h-2v2H6v-2H4v-2H2V5h2V3h2V1zm0 4h4v4H6V5z" fill="currentColor" />
  </svg>
)

/** sparkle_16 (Others tool-row leading glyph; hand-authored three-star
 *  approximation — the figma 43:31850 glyph is an SF Symbols "sparkles" text glyph,
 *  not extractable as vector data) */
/** ic_ds_pixel_IconSparkle16 — 小陈的工作室 pixel icon */
export const IconSparkle16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1h2v4h4v2H9v4H7V7H3V5h4V1zm-4 8h2v2h2v1H5v2H3v-2H1v-1h2V9zm9 0h2v2h2v1h-2v2h-2v-2h-2v-1h2V9z" fill="currentColor" />
  </svg>
)

/** inspect_outline_12 (shared tool-row trajectory affordance glyph) */
export const IconInspectOutline12 = ({ size = 12, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M16 8L10.8571 12V10.552L14.1383 8L10.8571 5.448V4L16 8ZM5.14286 10.552L1.86171 8L5.14286 5.448V4L0 8L5.14286 12V10.552ZM9.02514 4L5.59657 12H6.84057L10.2691 4H9.02514Z" fill="currentColor" />
  </svg>
)

/** skill_outline_16 (skill tool-row glyph; document instructions + sparkle) */
/** ic_ds_pixel_IconSkillOutline16 — 小陈的工作室 pixel icon */
export const IconSkillOutline16 = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1h2v3h3v2h-3v3H7V6H4V4h3V1zM2 10h4v4H2v-4zm8 0h4v4h-4v-4z" fill="currentColor" />
  </svg>
)

/** ic_ds_question_outline_14 (figma extract): ring + question glyph. */
/** ic_ds_pixel_IconQuestionOutline14 — 小陈的工作室 pixel icon */
export const IconQuestionOutline14 = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2h8v2h2v3h-3v2H7V8h2V6h3V4H4v4H2V4h2V2zm3 9h2v2H7v-2z" fill="currentColor" />
  </svg>
)

/** ic_ds_archive_outline_20 (figma extract): lidded box + label slot. The export's
 *  0.11px stroke ring around the box contour is dropped — it restates the same
 *  contour in the same ink, which currentColor already carries. */
export const IconArchiveOutline20 = ({ size = 20, className }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.8659 2.05975C17.2603 2.05995 18.3913 3.19096 18.3914 4.58527V5.4874C18.3914 6.02747 18.2192 6.52672 17.9303 6.93735C17.9336 6.96524 17.9388 6.99318 17.9388 7.02195V12.8884C17.9388 13.6345 17.9395 14.2379 17.8996 14.7254C17.8642 15.1593 17.7936 15.5499 17.6373 15.9141L17.5654 16.0685C17.278 16.6328 16.8405 17.1046 16.3038 17.434L16.0679 17.5661C15.66 17.7739 15.2196 17.8598 14.7237 17.9003C14.2362 17.9401 13.6327 17.9405 12.8867 17.9405H7.11122C6.36511 17.9405 5.76171 17.9401 5.27418 17.9003C4.84051 17.8649 4.44949 17.7952 4.08545 17.6391L3.93104 17.5661C3.36673 17.2785 2.89392 16.8414 2.56465 16.3044L2.43245 16.0685C2.22473 15.6608 2.13878 15.2211 2.09825 14.7254C2.05841 14.2379 2.05912 13.6345 2.05912 12.8884V7.02195C2.05912 6.99284 2.06422 6.96449 2.06758 6.93629C1.77931 6.52592 1.60858 6.02687 1.60858 5.4874V4.58527C1.60876 3.19084 2.73962 2.05975 4.1341 2.05975H15.8659ZM16.4984 7.92936C16.296 7.98169 16.0847 8.01288 15.8659 8.01291H4.1341C3.91478 8.01291 3.70246 7.98194 3.49955 7.92936V12.8884C3.49955 13.6582 3.50053 14.1927 3.53445 14.608C3.56769 15.0146 3.62923 15.244 3.71635 15.415L3.7925 15.5514C3.98339 15.8627 4.25749 16.1165 4.58464 16.2833L4.72529 16.3435C4.88095 16.3993 5.08638 16.4402 5.39158 16.4651C5.80685 16.4991 6.34138 16.5001 7.11122 16.5001H12.8867C13.6564 16.5001 14.1911 16.499 14.6063 16.4651C15.0128 16.432 15.2423 16.3703 15.4133 16.2833L15.5508 16.2061C15.8618 16.0152 16.116 15.7419 16.2827 15.415L16.3429 15.2732C16.3985 15.1177 16.4396 14.9128 16.4645 14.608C16.4985 14.1927 16.4984 13.6583 16.4984 12.8884V7.92936ZM4.1341 3.50019C3.53511 3.50019 3.0492 3.98631 3.04902 4.58527V5.4874C3.04902 6.08649 3.535 6.57248 4.1341 6.57248H15.8659C16.4648 6.57228 16.951 6.08638 16.951 5.4874V4.58527C16.9509 3.98644 16.4647 3.50038 15.8659 3.50019H4.1341Z"
      fill="currentColor"
    />
    <path d="M12.7962 12.5661V11.0832H7.20548V12.5661L12.7962 12.5661Z" fill="currentColor" />
  </svg>
)
