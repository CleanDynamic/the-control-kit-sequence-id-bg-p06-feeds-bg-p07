import { Kit } from '@/components/kit/kit'

export default function Page() {
  return (
    <main>
      {/* Page frame: a neutral gallery wall. The two themes hang on it side by side. */}
      <div
        className="theme-exhibition themed"
        style={{ borderBottom: '1px solid var(--line)' }}
      >
        <div className="mx-auto max-w-2xl px-5 pt-10 md:px-8 md:pt-14">
          <span className="eyebrow">buildgallery.ai</span>
          <h1
            className="text-balance"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 24,
              fontWeight: 600,
              color: 'var(--text)',
              marginTop: 8,
              lineHeight: 1.2,
            }}
          >
            Control kit
          </h1>
          <p
            className="text-pretty"
            style={{ fontSize: 15, color: 'var(--text2)', marginTop: 8, lineHeight: 1.5, maxWidth: '52ch' }}
          >
            Every control, every state, rendered in both themes. Colour lives only in the two variable
            blocks; nothing else differs between them.
          </p>
        </div>
      </div>

      {/* Both themes, stacked on mobile and side by side on wide screens, with a clear divider. */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-b lg:border-b-0 lg:border-r" style={{ borderColor: '#c6cbd1' }}>
          <Kit theme="exhibition" />
        </div>
        <div>
          <Kit theme="dusk" />
        </div>
      </div>
    </main>
  )
}
