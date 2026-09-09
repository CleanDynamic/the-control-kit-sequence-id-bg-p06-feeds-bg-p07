'use client'

import { useState } from 'react'
import { Section, Cell, Grid } from './section'

const CATEGORIES = [
  'instruction',
  'configuration',
  'data',
  'artefact',
  'evidence',
  'breakage',
] as const

type Category = (typeof CATEGORIES)[number]

function SelectableChip({ category }: { category: Category }) {
  const [on, setOn] = useState(true)
  return (
    <button
      type="button"
      className={`chip chip--selectable chip--${category} ring`}
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
    >
      <span className="chip__dot" />
      {category}
    </button>
  )
}

export function ChipsSection() {
  return (
    <Section
      n="04"
      title="Chips"
      note="Six part categories. Each chip is its hue as text on a low-alpha fill of the same hue — radius 8px, never a pill. Selectable chips toggle; static chips are labels."
    >
      <div className="flex flex-col gap-2">
        <span className="state-label">selectable — click to toggle</span>
        <Grid>
          {CATEGORIES.map((c) => (
            <SelectableChip key={c} category={c} />
          ))}
        </Grid>
      </div>

      <div className="flex flex-col gap-2">
        <span className="state-label">static labels</span>
        <div className="flex flex-wrap items-center gap-3">
          {CATEGORIES.map((c) => (
            <span key={c} className={`chip chip--${c}`}>
              <span className="chip__dot" />
              {c}
            </span>
          ))}
        </div>
      </div>

      <Grid>
        <Cell label="unselected">
          <button type="button" className="chip chip--selectable chip--data ring" aria-pressed="false">
            <span className="chip__dot" />
            data
          </button>
        </Cell>
        <Cell label="selected">
          <button type="button" className="chip chip--selectable chip--data ring" aria-pressed="true">
            <span className="chip__dot" />
            data
          </button>
        </Cell>
        <Cell label="focus-visible">
          <button type="button" className="chip chip--selectable chip--data is-focus" aria-pressed="true">
            <span className="chip__dot" />
            data
          </button>
        </Cell>
      </Grid>
    </Section>
  )
}
