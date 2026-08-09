import type { Catalog } from './types'

// Replace this empty local source with a CMS or API adapter when content is ready.
export async function getCatalog(): Promise<Catalog> {
  return { items: [], updatedAt: '' }
}
