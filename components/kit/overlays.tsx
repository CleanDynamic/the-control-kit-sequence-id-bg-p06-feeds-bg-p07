import { Section, Cell, Grid } from './section'

export function TooltipSection() {
  return (
    <Section
      n="09"
      title="Tooltip"
      note="Inverted per theme — dark on Exhibition, light on Dusk — so it always reads as a layer above the room."
    >
      <Grid>
        <Cell label="tooltip">
          <span className="tooltip" role="tooltip">
            Seed locks the sampler for exact reproduction
          </span>
        </Cell>
      </Grid>
    </Section>
  )
}

export function EmptySection() {
  return (
    <Section n="10" title="Empty state" note="No icon, no emoji. A heading, one sentence, one action.">
      <div className="card" style={{ maxWidth: 420 }}>
        <div className="empty">
          <span className="empty__title">No reproductions yet</span>
          <p className="empty__body text-pretty">
            When someone rebuilds this from the published prompt and settings, their attempt will appear here.
          </p>
          <button type="button" className="btn btn-primary btn-md ring press" style={{ marginTop: 4 }}>
            <span className="btn__label">Reproduce this build</span>
          </button>
        </div>
      </div>
    </Section>
  )
}
