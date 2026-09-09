'use client'

import { useState } from 'react'
import { Section, Cell, Grid } from './section'
import { Check } from './icons'

function Switch({
  defaultOn = false,
  disabled,
  forceFocus,
}: {
  defaultOn?: boolean
  disabled?: boolean
  forceFocus?: boolean
}) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Toggle"
      disabled={disabled}
      className={`switch ring${forceFocus ? ' is-focus' : ''}`}
      onClick={() => setOn((v) => !v)}
    >
      <span className="switch__thumb" />
    </button>
  )
}

function Checkbox({
  defaultOn = false,
  disabled,
  forceFocus,
}: {
  defaultOn?: boolean
  disabled?: boolean
  forceFocus?: boolean
}) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      aria-label="Toggle"
      disabled={disabled}
      className={`check ring${forceFocus ? ' is-focus' : ''}`}
      onClick={() => setOn((v) => !v)}
    >
      <Check />
    </button>
  )
}

export function TogglesSection() {
  return (
    <Section
      n="06"
      title="Switch & checkbox"
      note="The switch track is a 12px radius, not a pill — deliberate. Only the thumb is circular."
    >
      <div className="flex flex-col gap-2">
        <span className="state-label">switch</span>
        <Grid>
          <Cell label="off">
            <Switch />
          </Cell>
          <Cell label="on">
            <Switch defaultOn />
          </Cell>
          <Cell label="focused">
            <Switch defaultOn forceFocus />
          </Cell>
          <Cell label="disabled">
            <Switch defaultOn disabled />
          </Cell>
        </Grid>
      </div>

      <div className="flex flex-col gap-2">
        <span className="state-label">checkbox</span>
        <Grid>
          <Cell label="off">
            <label className="control-row">
              <Checkbox />
              Include seed
            </label>
          </Cell>
          <Cell label="on">
            <label className="control-row">
              <Checkbox defaultOn />
              Include seed
            </label>
          </Cell>
          <Cell label="focused">
            <Checkbox defaultOn forceFocus />
          </Cell>
          <Cell label="disabled">
            <Checkbox disabled />
          </Cell>
        </Grid>
      </div>
    </Section>
  )
}
