import type { CSSProperties } from 'react'

/* ------------------------------------------------------------------ *
 * Data shapes
 * ------------------------------------------------------------------ */

export type Category =
  | 'instruction'
  | 'configuration'
  | 'data'
  | 'artefact'
  | 'evidence'
  | 'narrative'
  | 'agents'
  | 'breakage'
  | 'media'

export type Media = {
  src: string
  width: number
  height: number
  alt: string
  video?: { duration: string }
}

export type Build = {
  shape: string
  title: string
  media: Media[]
  rebuiltFrom?: { source: string; author: string; delta: string }
  reproduced: number
  confirmed: { when: string; model: string }
  bounty?: { unsolved: number; amount: string }
  parts: Category[]
}

/* ------------------------------------------------------------------ *
 * Media block — the rebuilt part.
 * Single picture keeps its own shape between the two caps (2:1 wide,
 * 3:4 tall). Groups settle into a fixed block. Grid mode is a fixed
 * slot. Every slot reserves height via aspect-ratio before load.
 * ------------------------------------------------------------------ */

const MAX_WIDE = 2 / 1
const MAX_TALL = 3 / 4

function clampRatio(m: Media) {
  const r = m.width / m.height
  return Math.min(MAX_WIDE, Math.max(MAX_TALL, r))
}

function PlayGlyph({ small }: { small?: boolean }) {
  return (
    <span className="bplay" aria-hidden="true">
      <span className={`bplay__glyph${small ? ' bplay__glyph--sm' : ''}`}>
        <svg viewBox="0 0 24 24">
          <path d="M6 4l14 8-14 8z" />
        </svg>
      </span>
    </span>
  )
}

function Cell({ m, small, loading }: { m: Media; small?: boolean; loading?: boolean }) {
  return (
    <figure className={`bcell${loading ? ' bcell--loading' : ''}`}>
      <img
        src={m.src || '/placeholder.svg'}
        width={m.width}
        height={m.height}
        alt={m.alt}
        loading="lazy"
        decoding="async"
      />
      {m.video && !loading && <PlayGlyph small={small} />}
      {m.video && !small && !loading && (
        <span className="bduration">{m.video.duration}</span>
      )}
    </figure>
  )
}

export type MediaMode = 'feed' | 'grid'

function MediaBlock({
  build,
  mode,
  loading,
}: {
  build: Build
  mode: MediaMode
  loading?: boolean
}) {
  const items = build.media.slice(0, 4)
  const count = items.length
  const tag = <span className="bshape">{build.shape}</span>

  if (count === 0) {
    return (
      <div
        className="bmedia bmedia--empty"
        style={mode === 'grid' ? { aspectRatio: '4 / 3' } : undefined}
      >
        {tag}
        <h3>{build.title}</h3>
      </div>
    )
  }

  if (mode === 'grid') {
    return (
      <div className="bmedia bmedia--grid">
        {tag}
        <Cell m={items[0]} loading={loading} />
      </div>
    )
  }

  if (count === 1) {
    const style = { '--ar': String(clampRatio(items[0])) } as CSSProperties
    return (
      <div className="bmedia" style={style}>
        {tag}
        <Cell m={items[0]} loading={loading} />
      </div>
    )
  }

  return (
    <div className={`bmedia bmedia--${count}`}>
      {tag}
      {items.map((m, i) => (
        <Cell key={i} m={m} small loading={loading} />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * The card. Content order below the media is fixed.
 * ------------------------------------------------------------------ */

export function BuildCard({
  build,
  mode = 'feed',
  hover,
  loading,
}: {
  build: Build
  mode?: MediaMode
  hover?: boolean
  loading?: boolean
}) {
  const hasMedia = build.media.length > 0
  const shown = build.parts.slice(0, 5)
  const more = build.parts.length - shown.length
  const cls = ['bcard', build.bounty && 'bcard--bounty', hover && 'is-hover']
    .filter(Boolean)
    .join(' ')

  return (
    <article className={cls}>
      <MediaBlock build={build} mode={mode} loading={loading} />

      <div className="bbody">
        {hasMedia && <h3 className="btitle">{build.title}</h3>}

        {build.rebuiltFrom && (
          <div className="bcredit">
            <p>
              Rebuilt from <b>{build.rebuiltFrom.source}</b> by{' '}
              <b>{build.rebuiltFrom.author}</b>
            </p>
            <p className="bdelta">{build.rebuiltFrom.delta}</p>
          </div>
        )}

        <div className="bplaque">
          <span className="brepro">{build.reproduced} reproduced</span>
          <span className="bfresh">
            <span className="bfresh__lamp" aria-hidden="true" />
            <span>
              confirmed {build.confirmed.when}, on {build.confirmed.model}
            </span>
          </span>
          {build.bounty && (
            <span className="bbounty">
              {build.bounty.unsolved} part unsolved · {build.bounty.amount}
            </span>
          )}
        </div>

        <div className="bchips" aria-label="Part categories">
          {shown.map((p) => (
            <span key={p} className={`bchip chip--${p}`}>
              {p}
            </span>
          ))}
          {more > 0 && <span className="bchip bchip--more">+{more}</span>}
        </div>
      </div>
    </article>
  )
}

export function BuildCardSkeleton({ ratio = 16 / 9 }: { ratio?: number }) {
  const style = { '--ar': String(ratio) } as CSSProperties
  return (
    <article className="bcard bcard--skeleton" aria-busy="true" aria-label="Loading build">
      <div className="bmedia" style={style} />
      <div className="bbody">
        <div className="bsk" style={{ height: 20, width: '82%' }} />
        <div className="bsk" style={{ height: 20, width: '48%' }} />
        <div className="bplaque">
          <div className="bsk" style={{ height: 26, width: 112 }} />
          <div className="bsk" style={{ width: '46%' }} />
        </div>
        <div className="bchips">
          <div className="bsk" style={{ height: 24, width: 84 }} />
          <div className="bsk" style={{ height: 24, width: 96 }} />
          <div className="bsk" style={{ height: 24, width: 60 }} />
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ *
 * Sample data — real dimensions, so aspect-ratio is honest.
 * ------------------------------------------------------------------ */

const phone: Media = { src: '/media/phone-intake.png', width: 576, height: 1024, alt: 'Intake agent on a phone' }
const wide: Media = { src: '/media/dashboard-wide.png', width: 1024, height: 300, alt: 'Wide analytics dashboard' }
const square: Media = { src: '/media/square-diagram.png', width: 1024, height: 1024, alt: 'Retrieval pipeline diagram' }
const landscape: Media = { src: '/media/landscape-editor.png', width: 1024, height: 576, alt: 'Prompt editor' }
const tall: Media = { src: '/media/fullpage-tall.png', width: 320, height: 1024, alt: 'Full-page documentation screenshot' }
const video: Media = { src: '/media/video-poster.png', width: 1024, height: 576, alt: 'Workflow canvas recording', video: { duration: '1:42' } }

const base: Build = {
  shape: 'agent',
  title: 'Intake agent that triages support mail into Linear with sources attached',
  media: [phone],
  rebuiltFrom: {
    source: "Ayo's intake agent",
    author: '@ayo',
    delta: 'Δ model → llama-3-70b · +1 retrieval step · cost £42/mo → £0',
  },
  reproduced: 41,
  confirmed: { when: '3 days ago', model: 'sonnet-4.5' },
  parts: ['instruction', 'configuration', 'data', 'artefact', 'evidence', 'narrative', 'agents', 'media'],
}

const variants: { label: string; build: Build; hover?: boolean; skeleton?: number }[] = [
  { label: 'one · tall phone screenshot keeps its shape (capped at 3:4)', build: base },
  { label: 'one · wide dashboard, cropped centred to the 2:1 cap', build: { ...base, shape: 'workflow', title: 'Weekly cost dashboard that reconciles gateway spend against invoices', media: [wide], rebuiltFrom: undefined, reproduced: 128 } },
  { label: 'one · full-page screenshot, cropped centred to the 3:4 cap', build: { ...base, shape: 'prompt', title: 'Docs writer prompt with a structure it will not drift from', media: [tall], rebuiltFrom: undefined, reproduced: 9, confirmed: { when: 'yesterday', model: 'gpt-5' } } },
  { label: 'one · square renders square', build: { ...base, shape: 'pipeline', title: 'Retrieval pipeline with a re-ranker', media: [square], rebuiltFrom: undefined, reproduced: 63, parts: ['data', 'configuration', 'evidence'] } },
  { label: 'one · video, poster at its own shape, never autoplaying', build: { ...base, shape: 'workflow', title: 'Canvas workflow that drafts release notes from merged PRs', media: [video], rebuiltFrom: undefined, reproduced: 17, parts: ['agents', 'instruction', 'media'] } },
  { label: 'two · mixed landscape + portrait, equal halves, each crops', build: { ...base, media: [landscape, phone], reproduced: 22 } },
  { label: 'three · one large, two stacked (one is a video)', build: { ...base, shape: 'agent', media: [square, video, wide], rebuiltFrom: undefined, reproduced: 5 } },
  { label: 'four · 2×2 grid', build: { ...base, media: [landscape, phone, square, tall], rebuiltFrom: undefined, reproduced: 204 } },
  { label: 'no picture · inset fill, title enlarged', build: { ...base, media: [], rebuiltFrom: undefined, reproduced: 12, parts: ['instruction', 'narrative'] } },
  { label: 'open bounty · dashed breakage edge, everything else normal', build: { ...base, media: [landscape], rebuiltFrom: undefined, reproduced: 31, bounty: { unsolved: 1, amount: '£150' }, parts: ['instruction', 'breakage', 'configuration', 'data'] } },
  { label: 'hover · 1px lift, stronger border', build: { ...base, media: [square], rebuiltFrom: undefined, reproduced: 41 }, hover: true },
  { label: 'loading · reserved media height, no spinner', build: base, skeleton: 9 / 16 * 1 },
]

/* ------------------------------------------------------------------ *
 * Showcase: feed mode (natural shapes) next to grid mode (fixed slot).
 * ------------------------------------------------------------------ */

export function BuildCardShowcase() {
  const gridSet = [variants[0], variants[1], variants[5]]
  return (
    <div className="bshow">
      <div className="bcontexts">
        <section className="bcontext">
          <p className="eyebrow">Feed · single column · natural shapes</p>
          <div className="bfeed">
            {variants.map((v) =>
              v.skeleton ? (
                <div key={v.label} className="bcontext">
                  <p className="state-label">{v.label}</p>
                  <BuildCardSkeleton ratio={MAX_TALL} />
                </div>
              ) : (
                <div key={v.label} className="bcontext">
                  <p className="state-label">{v.label}</p>
                  <BuildCard build={v.build} hover={v.hover} />
                </div>
              ),
            )}
          </div>
        </section>

        <section className="bcontext">
          <p className="eyebrow">Grid · three across · fixed 4:3 slot, pictures fill and crop</p>
          <div className="bgrid">
            {gridSet.map((v) => (
              <BuildCard key={v.label} build={v.build} mode="grid" />
            ))}
          </div>
          <p className="state-label">Same component, mode=&quot;grid&quot;. Same skeleton, same reserved height.</p>
          <div className="bgrid">
            <BuildCardSkeleton ratio={4 / 3} />
            <BuildCard build={{ ...base, media: [], rebuiltFrom: undefined, reproduced: 12, parts: ['instruction', 'narrative'] }} mode="grid" />
            <BuildCard build={variants[9].build} mode="grid" />
          </div>
        </section>
      </div>
    </div>
  )
}
