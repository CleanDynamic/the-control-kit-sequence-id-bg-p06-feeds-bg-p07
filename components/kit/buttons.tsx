import type { ReactNode } from 'react'
import { Section, Cell, Grid } from './section'
import { Spinner } from './loading'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'destructive'

function Btn({
  variant = 'secondary',
  size = 'md',
  state,
  loading,
  children,
}: {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  state?: 'hover' | 'active' | 'focus' | 'disabled'
  loading?: boolean
  children: ReactNode
}) {
  const cls = [
    'btn ring press',
    `btn-${variant}`,
    `btn-${size}`,
    state === 'hover' ? 'is-hover' : '',
    state === 'active' ? 'is-active' : '',
    state === 'focus' ? 'is-focus' : '',
    state === 'disabled' ? 'is-disabled' : '',
    loading ? 'is-loading' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={cls} disabled={state === 'disabled' || loading}>
      {loading ? <Spinner /> : null}
      <span className="btn__label">{children}</span>
    </button>
  )
}

export function ButtonsSection() {
  return (
    <Section
      n="01"
      title="Buttons"
      note="Exactly one primary action per view — it is filled with the action colour; its peers stay neutral. Sizes 32 / 38 / 44px."
    >
      <Grid>
        <Cell label="primary · lg">
          <Btn variant="primary" size="lg">
            Publish build
          </Btn>
        </Cell>
        <Cell label="secondary · md">
          <Btn variant="secondary">Save draft</Btn>
        </Cell>
        <Cell label="tertiary · md">
          <Btn variant="tertiary">Cancel</Btn>
        </Cell>
        <Cell label="destructive · md">
          <Btn variant="destructive">Delete</Btn>
        </Cell>
        <Cell label="small · 32">
          <Btn variant="secondary" size="sm">
            Copy prompt
          </Btn>
        </Cell>
      </Grid>

      <Grid>
        <Cell label="rest">
          <Btn variant="secondary">Reproduce</Btn>
        </Cell>
        <Cell label="hover">
          <Btn variant="secondary" state="hover">
            Reproduce
          </Btn>
        </Cell>
        <Cell label="active">
          <Btn variant="secondary" state="active">
            Reproduce
          </Btn>
        </Cell>
        <Cell label="focus-visible">
          <Btn variant="secondary" state="focus">
            Reproduce
          </Btn>
        </Cell>
        <Cell label="disabled">
          <Btn variant="secondary" state="disabled">
            Reproduce
          </Btn>
        </Cell>
        <Cell label="loading">
          <Btn variant="secondary" loading>
            Reproducing
          </Btn>
        </Cell>
      </Grid>
    </Section>
  )
}

export function FocusSection() {
  return (
    <Section
      n="02"
      title="Focus ring"
      note="2px amber with a 2px offset in the page background — identical in both themes, shown on every control kind a keyboard user meets."
    >
      <Grid>
        <Cell label="button">
          <button type="button" className="btn btn-secondary btn-md is-focus">
            Button
          </button>
        </Cell>
        <Cell label="input">
          <input className="input is-focus" style={{ width: 160 }} defaultValue="settings.json" readOnly />
        </Cell>
        <Cell label="chip">
          <button type="button" className="chip chip--selectable chip--evidence is-focus" aria-pressed="true">
            <span className="chip__dot" />
            evidence
          </button>
        </Cell>
        <Cell label="switch">
          <button type="button" role="switch" aria-checked="true" className="switch is-focus">
            <span className="switch__thumb" />
          </button>
        </Cell>
        <Cell label="checkbox">
          <button type="button" role="checkbox" aria-checked="true" className="check is-focus">
            <svg width={14} height={14} viewBox="0 0 16 16" fill="none" aria-hidden="true" className="check__mark">
              <path
                d="M3.5 8.5l3 3 6-6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Cell>
      </Grid>
    </Section>
  )
}
