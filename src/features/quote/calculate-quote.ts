import type { Catalog } from '@/features/catalog/types'
import type { SelectionState } from '@/features/selection/types'

export type Quote = {
  itemCount: number
  totalCents: number
}

export function calculateQuote(catalog: Catalog, selection: SelectionState): Quote {
  const selectedIds = new Set(selection.selectedItemIds)
  const selectedItems = catalog.items.filter((item) => selectedIds.has(item.id))
  return {
    itemCount: selectedItems.length,
    totalCents: selectedItems.reduce((total, item) => total + item.priceCents, 0),
  }
}
