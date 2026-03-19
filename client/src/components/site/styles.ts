export const siteContainerClass = 'mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10'

export const sectionToneClasses = {
  default: 'py-16 sm:py-20 lg:py-24',
  compact: 'py-10 sm:py-14 lg:py-16',
} as const

export const surfaceToneClasses = {
  default:
    'rounded-3xl border border-line/60 bg-white shadow-card',
  subdued:
    'rounded-3xl border border-line/60 bg-surface-tinted shadow-card',
  accent:
    'rounded-3xl border border-accent/10 bg-gradient-to-b from-accent-soft/60 to-white shadow-card',
  contrast:
    'rounded-3xl border border-ink/10 bg-ink text-white shadow-panel',
  warm:
    'rounded-3xl border border-warm/10 bg-gradient-to-b from-warm-soft/50 to-white shadow-card',
} as const

export const surfacePaddingClasses = {
  compact: 'p-5 sm:p-6',
  default: 'p-6 sm:p-8',
  roomy: 'p-8 sm:p-10',
  flush: 'p-0',
} as const

export const headingClasses = {
  display:
    'max-w-5xl font-display text-[clamp(2.8rem,5.5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-ink',
  page:
    'max-w-4xl font-display text-[clamp(2.4rem,4.5vw,4.2rem)] font-semibold leading-[0.97] tracking-[-0.025em] text-ink',
  section:
    'max-w-3xl font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink',
  card: 'font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.015em] text-ink sm:text-[1.55rem]',
} as const

export const eyebrowClass =
  'inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-accent-deep'

export const eyebrowLineClass = 'h-px w-8 bg-accent/25'

export const leadClass =
  'max-w-3xl text-[1.05rem] leading-8 text-muted sm:text-lg'

export const bodyClass =
  'text-[0.95rem] leading-7 text-muted sm:text-base'

export const metaClass = 'text-sm font-medium text-muted'

export const finePrintClass =
  'text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-400'

export const tagClass =
  'inline-flex items-center rounded-full border border-line/80 bg-surface-tinted px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:border-accent/20 hover:text-accent-deep'

export const metricBadgeClass =
  'rounded-2xl border border-line/60 bg-white px-4 py-3.5'

export const navShellClass =
  'flex items-center gap-0.5 rounded-full border border-line/80 bg-white/90 px-1 py-1 shadow-soft backdrop-blur-lg'

export const navLinkClass =
  'inline-flex items-center rounded-full px-4 py-2 text-[0.82rem] font-medium text-muted transition duration-200 hover:bg-surface-tinted hover:text-ink'

export const navLinkActiveClass =
  'bg-ink text-white shadow-soft hover:bg-ink hover:text-white'

export const buttonToneClasses = {
  primary:
    'inline-flex items-center justify-center rounded-full border border-transparent bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-card-hover focus:outline-none focus:ring-4 focus:ring-accent/10',
  secondary:
    'inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:border-accent/25 hover:text-accent-deep hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-accent/10',
  ghost:
    'inline-flex items-center justify-center rounded-full border border-transparent px-4 py-3 text-sm font-semibold text-muted transition duration-200 hover:text-ink focus:outline-none focus:ring-4 focus:ring-accent/10',
} as const

export const textLinkClass =
  'inline-flex items-center gap-2 text-sm font-semibold text-accent-deep transition duration-200 hover:text-ink'

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
