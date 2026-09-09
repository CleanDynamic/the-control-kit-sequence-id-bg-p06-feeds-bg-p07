import { Section, Cell, Grid } from './section'

export function Spinner({ large }: { large?: boolean }) {
  return <span className={large ? 'spinner spinner--lg' : 'spinner'} role="status" aria-label="Loading" />
}

export function LoadingSection() {
  return (
    <Section n="11" title="Loading" note="A skeleton row and an inline spinner. Opacity pulses; no layout animates.">
      <div className="card" style={{ maxWidth: 420 }}>
        <div className="flex items-center gap-3">
          <span className="sk sk--avatar" />
          <div className="flex flex-1 flex-col gap-2">
            <span className="sk" style={{ height: 12, width: '62%' }} />
            <span className="sk" style={{ height: 12, width: '38%' }} />
          </div>
          <span className="sk sk--media" style={{ height: 40, width: 64 }} />
        </div>
      </div>
      <Grid>
        <Cell label="inline spinner">
          <span className="flex items-center gap-2" style={{ color: 'var(--text2)', fontSize: 14 }}>
            <Spinner />
            Verifying evidence
          </span>
        </Cell>
        <Cell label="spinner · lg">
          <span style={{ color: 'var(--action)' }}>
            <Spinner large />
          </span>
        </Cell>
      </Grid>
    </Section>
  )
}
