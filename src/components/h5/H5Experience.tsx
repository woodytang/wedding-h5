'use client'

import { useReducer } from 'react'
import { h5Sections } from '@/config/h5-sections'
import { initialSelection, selectionReducer } from '@/features/selection/reducer'
import { H5Section } from './H5Section'
import { OfferModeTabs } from './OfferModeTabs'

export function H5Experience() {
  const [selection, dispatch] = useReducer(selectionReducer, initialSelection)

  return (
    <main className="h5-page">
      <header className="h5-header">
        <span className="h5-brand">WEDDING H5</span>
        <a href="#contact">预约入口</a>
      </header>

      {h5Sections.map((section) => (
        <H5Section key={section.id} section={section}>
          {section.id === 'purchase' && (
            <OfferModeTabs
              value={selection.activeKind}
              onChange={(kind) => dispatch({ type: 'set-kind', kind })}
            />
          )}
        </H5Section>
      ))}

      <aside className="selection-dock" aria-live="polite">
        <span>已选 {selection.selectedItemIds.length} 项</span>
        <button type="button" disabled>报价待接入</button>
      </aside>
    </main>
  )
}
