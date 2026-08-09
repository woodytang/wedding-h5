import type { ReactNode } from 'react'
import type { H5SectionDefinition } from '@/config/h5-sections'

type H5SectionProps = {
  section: H5SectionDefinition
  children?: ReactNode
}

export function H5Section({ section, children }: H5SectionProps) {
  return (
    <section id={section.id} className="h5-section">
      <div className="section-heading">
        <span>{section.label}</span>
        <p>{section.note}</p>
      </div>
      <div className="section-canvas">{children ?? <span>内容待配置</span>}</div>
    </section>
  )
}
