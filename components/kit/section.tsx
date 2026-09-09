import type { ReactNode } from 'react'

export function Section({
  n,
  title,
  note,
  children,
}: {
  n: string
  title: string
  note?: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <span className="eyebrow">
          {n} · {title}
        </span>
        {note ? (
          <p className="text-pretty" style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
            {note}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  )
}

/* A labelled specimen: a single state with its name underneath. */
export function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex min-h-11 items-center">{children}</div>
      <span className="state-label">{label}</span>
    </div>
  )
}

export function Grid({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-end gap-x-6 gap-y-5">{children}</div>
}
