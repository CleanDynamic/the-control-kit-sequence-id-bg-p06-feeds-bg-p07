import { Section, Cell, Grid } from './section'

export function BadgesSection() {
  return (
    <Section
      n="07"
      title="Badge & counter"
      note="A small number badge and a status badge in the evidence colour. The amber lamp shows the only sanctioned use of amber — a lit fill with dark text, never lettering."
    >
      <Grid>
        <Cell label="number badge">
          <span className="flex items-center gap-2" style={{ fontSize: 14, color: 'var(--text)' }}>
            Reproductions
            <span className="badge-num">7</span>
          </span>
        </Cell>
        <Cell label="number · large count">
          <span className="badge-num">128</span>
        </Cell>
        <Cell label="status · evidence">
          <span className="badge-status">
            <span className="badge-status__dot" />
            41 reproduced
          </span>
        </Cell>
        <Cell label="amber lamp">
          <span className="lamp">Featured</span>
        </Cell>
      </Grid>
    </Section>
  )
}
