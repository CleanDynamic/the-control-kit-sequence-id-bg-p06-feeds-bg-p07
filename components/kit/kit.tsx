import { ButtonsSection, FocusSection } from './buttons'
import { FieldsSection } from './fields'
import { ChipsSection } from './chips'
import { TabsSection } from './tabs'
import { TogglesSection } from './toggles'
import { BadgesSection } from './badges'
import { DropdownSection } from './dropdown'
import { TooltipSection, EmptySection } from './overlays'
import { LoadingSection } from './loading'
import { ThemeToggleSection } from './theme-toggle'

export function Kit({ theme }: { theme: 'exhibition' | 'dusk' }) {
  return (
    <div className={`themed theme-${theme}`}>
      <div className="mx-auto flex max-w-2xl flex-col gap-12 px-5 py-10 md:px-8 md:py-14">
        <header className="flex flex-col gap-2">
          <span className="eyebrow">{theme === 'exhibition' ? 'Theme A · Light' : 'Theme B · Dark'}</span>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 19, fontWeight: 600, color: 'var(--text)' }}>
            {theme === 'exhibition' ? 'Exhibition' : 'Dusk'}
          </h2>
          <p className="text-pretty" style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.5 }}>
            {theme === 'exhibition'
              ? 'A cool, luminous grey gallery — considered and quiet, made of good materials.'
              : 'Lavender stone at dusk — the same room after the lights come down.'}
          </p>
        </header>

        <ButtonsSection />
        <FocusSection />
        <FieldsSection />
        <ChipsSection />
        <TabsSection />
        <TogglesSection />
        <BadgesSection />
        <DropdownSection />
        <TooltipSection />
        <EmptySection />
        <LoadingSection />
        <ThemeToggleSection initial={theme === 'exhibition' ? 'exhibition' : 'dusk'} />
      </div>
    </div>
  )
}
