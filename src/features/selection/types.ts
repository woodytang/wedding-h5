import type { OfferKind } from '@/features/catalog/types'

export type SelectionState = {
  activeKind: OfferKind
  selectedItemIds: string[]
}

export type SelectionAction =
  | { type: 'set-kind'; kind: OfferKind }
  | { type: 'toggle-item'; itemId: string }
  | { type: 'clear' }
