'use client'

import { useState } from 'react'
import { Section } from './section'
import { Sun, Moon, Monitor } from './icons'

const OPTIONS = [
  { id: 'exhibition', label: 'Exhibition', icon: Sun },
  { id: 'dusk', label: 'Dusk', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor },
] as const

export function ThemeToggleSection({ initial }: { initial: 'exhibition' | 'dusk' | 'system' }) {
  const [value, setValue] = useState<string>(initial)

  return (
    <Section
      n="12"
      title="Theme toggle"
      note="A three-state control — Exhibition, Dusk, or follow the System. Built on the segmented style, so nothing here is a pill."
    >
      <div className="seg" role="radiogroup" aria-label="Theme">
        {OPTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={value === id}
            className="seg__item ring"
            onClick={() => setValue(id)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>
    </Section>
  )
}
