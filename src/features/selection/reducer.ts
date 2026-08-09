import type { SelectionAction, SelectionState } from './types'

export const initialSelection: SelectionState = {
  activeKind: 'single',
  selectedItemIds: [],
}

export function selectionReducer(state: SelectionState, action: SelectionAction): SelectionState {
  if (action.type === 'set-kind') return { ...state, activeKind: action.kind }
  if (action.type === 'clear') return { ...state, selectedItemIds: [] }
  const selectedItemIds = state.selectedItemIds.includes(action.itemId)
    ? state.selectedItemIds.filter((id) => id !== action.itemId)
    : [...state.selectedItemIds, action.itemId]
  return { ...state, selectedItemIds }
}
