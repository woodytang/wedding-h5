export type OfferKind = 'single' | 'series' | 'package'

export type CatalogItem = {
  id: string
  kind: OfferKind
  title: string
  subtitle?: string
  coverUrl?: string
  priceCents: number
  originalPriceCents?: number
  includedItemIds?: string[]
  isAvailable: boolean
}

export type Catalog = {
  items: CatalogItem[]
  updatedAt: string
}
