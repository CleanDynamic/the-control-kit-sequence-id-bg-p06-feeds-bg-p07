'use client'

import { useState } from 'react'
import { Section } from './section'
import { Chevron } from './icons'

export function DropdownSection() {
  const [open, setOpen] = useState(true)

  return (
    <Section
      n="08"
      title="Dropdown menu"
      note="The panel is glass; the items inside are not, because blurred surfaces never nest. One item is destructive, one carries a keyboard shortcut in DM Mono."
    >
      <div className="relative" style={{ width: 244 }}>
        <button
          type="button"
          className="btn btn-secondary btn-md ring press"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{ width: '100%', justifyContent: 'space-between' }}
        >
          <span className="btn__label">Build actions</span>
          <Chevron />
        </button>

        {open ? (
          <div className="menu" role="menu" style={{ marginTop: 8 }}>
            <button type="button" role="menuitem" className="menu__item is-hover">
              Open build
            </button>
            <button type="button" role="menuitem" className="menu__item">
              Fork &amp; reproduce
            </button>
            <button type="button" role="menuitem" className="menu__item">
              <span>Copy prompt</span>
              <span className="menu__shortcut">⌘ C</span>
            </button>
            <button type="button" role="menuitem" className="menu__item">
              Export evidence
            </button>
            <div className="menu__sep" role="separator" />
            <button type="button" role="menuitem" className="menu__item menu__item--danger">
              Delete build
            </button>
          </div>
        ) : null}
      </div>
    </Section>
  )
}
