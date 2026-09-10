import type { Metadata } from 'next'
import Link from 'next/link'
import { BuildCardShowcase } from '@/components/build-card'

export const metadata: Metadata = {
  title: 'Build card — buildgallery.ai',
  description:
    'The build card repainted for Exhibition and Dusk, with a rebuilt media block that keeps each picture its own shape.',
}

function ThemeBlock({ theme, name }: { theme: string; name: string }) {
  return (
    <section className={`${theme} themed`} aria-label={`${name} theme`}>
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 py-10 sm:px-8">
        <header className="flex flex-col gap-2">
          <p className="eyebrow">Theme · {name}</p>
          <h2 className="text-[20px] font-medium leading-snug">Build card</h2>
          <p className="max-w-[60ch] text-[16px] leading-relaxed" style={{ color: 'var(--text2)' }}>
            One component, two modes. The feed lets a picture keep its own shape between the
            2:1 and 3:4 caps; the grid gives every card a fixed slot. Every slot reserves its
            height before the picture loads.
          </p>
        </header>
        <BuildCardShowcase />
      </div>
    </section>
  )
}

export default function CardPage() {
  return (
    <main className="flex flex-col">
      <div className="theme-exhibition themed">
        <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-4 pt-6 sm:px-8">
          <p className="eyebrow">buildgallery.ai · card</p>
          <Link href="/" className="mono text-[13px] underline-offset-4 hover:underline" style={{ color: 'var(--text2)' }}>
            ← control kit
          </Link>
        </div>
      </div>
      <ThemeBlock theme="theme-exhibition" name="Exhibition" />
      <div className="theme-dusk themed" aria-hidden="true">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-8">
          <div style={{ height: 1, background: 'var(--line)' }} />
        </div>
      </div>
      <ThemeBlock theme="theme-dusk" name="Dusk" />
    </main>
  )
}
