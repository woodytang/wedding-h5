import type { OfferKind } from '@/features/catalog/types'

const options: Array<{ value: OfferKind; label: string }> = [
  { value: 'single', label: '单张' },
  { value: 'series', label: '系列' },
  { value: 'package', label: '套餐' },
]

type OfferModeTabsProps = {
  value: OfferKind
  onChange: (kind: OfferKind) => void
}

export function OfferModeTabs({ value, onChange }: OfferModeTabsProps) {
  return (
    <div className="offer-tabs" role="tablist" aria-label="选购方式">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          className={value === option.value ? 'is-active' : ''}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
