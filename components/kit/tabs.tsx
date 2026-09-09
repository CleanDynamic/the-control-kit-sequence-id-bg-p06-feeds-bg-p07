'use client'

import { useState } from 'react'
import { Section } from './section'

const ITEMS = ['Prompt', 'Settings', 'Evidence', 'Reproductions']

export function TabsSection() {
  const [underline, setUnderline] = useState(0)
  const [seg, setSeg] = useState(0)

  return (
    <Section
      n="05"
      title="Tabs"
      note="Recommended: the underline style for navigating a build's sections — it reads as a table of contents and scales past four items, while the segmented style suits a small, mutually-exclusive filter."
    >
      <div className="flex flex-col gap-2">
        <span className="state-label">underline — recommended</span>
        <div className="tabs-underline" role="tablist" aria-label="Build sections">
          {ITEMS.map((label, i) => (
            <button
              key={label}
              role="tab"
              aria-selected={underline === i}
              className="tab ring"
              onClick={() => setUnderline(i)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="state-label">segmented</span>
        <div className="seg" role="tablist" aria-label="View">
          {['All', 'Mine', 'Verified'].map((label, i) => (
            <button
              key={label}
              role="tab"
              aria-selected={seg === i}
              className="seg__item ring"
              onClick={() => setSeg(i)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </Section>
  )
}
