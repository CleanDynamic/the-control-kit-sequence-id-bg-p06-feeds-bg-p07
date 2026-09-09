import type { ReactNode } from 'react'
import { Section } from './section'
import { Chevron } from './icons'

function Field({
  label,
  help,
  error,
  children,
}: {
  label: string
  help?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="field" style={{ minWidth: 220, flex: '1 1 220px', maxWidth: 300 }}>
      <span className="field__label">{label}</span>
      {children}
      {error ? (
        <span className="field__help field__help--error">{error}</span>
      ) : help ? (
        <span className="field__help">{help}</span>
      ) : null}
    </div>
  )
}

export function FieldsSection() {
  return (
    <Section
      n="03"
      title="Text input · textarea · select"
      note="Every field carries a label above and helper text below. Errors sit beneath the field, never only in a toast. Inputs are 16px so iOS never zooms on focus."
    >
      <div className="flex flex-wrap gap-x-6 gap-y-6">
        <Field label="Model name" help="As reported by the provider.">
          <input className="input ring" placeholder="e.g. claude-sonnet" />
        </Field>

        <Field label="Model name" help="Hover state — hairline lifts to secondary text.">
          <input className="input is-hover" defaultValue="gpt-image-1" readOnly />
        </Field>

        <Field label="Model name" help="Focused with the amber ring.">
          <input className="input is-focus" defaultValue="claude-sonnet-4" readOnly />
        </Field>

        <Field label="Temperature" error="Temperature must be between 0 and 2.">
          <input className="input is-error ring" defaultValue="4.0" readOnly />
        </Field>

        <Field label="Seed" help="Locked for this published build.">
          <input className="input is-disabled" disabled defaultValue="1743029" />
        </Field>

        <Field label="System prompt" help="Filled — the exact text used.">
          <textarea
            className="textarea ring"
            defaultValue={'You are a meticulous archivist. Cite every source you rely on.'}
          />
        </Field>

        <Field label="Category" help="Rest.">
          <div className="select__wrap">
            <select className="select ring" defaultValue="instruction">
              <option value="instruction">Instruction</option>
              <option value="configuration">Configuration</option>
              <option value="data">Data</option>
              <option value="evidence">Evidence</option>
            </select>
            <span className="select__chevron">
              <Chevron />
            </span>
          </div>
        </Field>

        <Field label="Category" error="Choose a category to continue.">
          <div className="select__wrap">
            <select className="select is-error ring" defaultValue="">
              <option value="" disabled>
                Select…
              </option>
              <option value="artefact">Artefact</option>
            </select>
            <span className="select__chevron">
              <Chevron />
            </span>
          </div>
        </Field>
      </div>
    </Section>
  )
}
