// 由 scripts/optimize-images.mjs 生成，请勿手改。

export type ResponsiveImage = {
  widths: readonly number[]
  width: number
  height: number
  blur: string
}

export const images = {
  'daily-headshots': {
    widths: [576, 1152, 1728],
    width: 1728,
    height: 1145,
    blur: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAQAgCdASoQAAsABUB8JZwAAuySKy2RtS7gAP7ypAsopMroiYTBgXD86DhQX4suJXYxfPWSwlgYH5Z5i7/xf9rYiGxSRsAA',
  },
  'land-image-3': {
    widths: [576, 1152],
    width: 1152,
    height: 2048,
    blur: 'data:image/webp;base64,UklGRqgAAABXRUJQVlA4IJwAAADwAwCdASoQABwAPzmGuVOvKSWisAgB4CcJQBOgAlZnmgW29/bzdfeAAP58BDk07TXm3tMzDakNJlMFMgSKVZXZnwKKq7oUQ3QXIdwL/B96XJqH3SMjW481jYevKVsgzt6a+/5S2wfVN2UIQl1gVF7pqKwnHYRF0vLOtas+wH5w90U+RpBNxAJradgWM53dCl3ktnjhKMQ3cHIAAAA=',
  },
  'land-image-4': {
    widths: [576, 1152, 1728],
    width: 1728,
    height: 3070,
    blur: 'data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAAAQBACdASoQABwAPzmEuVOvKKWisAgB4CcJYwAD5UGm72XGhNXWSM7OAAD+r5MUj6Hrsi2q0p4sy6deh4T08nmEkq3KBteeVwGDK+0x4LlJreyahqyleGtaSHjXVr8UROtpRYm06PT5i6FbMl2mz50fvz/JCiz8oLzdfOFueOQjA/ImvsyKwfK5zQVqg0AA',
  },
  'land-image-5': {
    widths: [576, 1152, 1728],
    width: 1728,
    height: 3070,
    blur: 'data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAADQAwCdASoQABwAPzmEuVOvKKWisAgB4CcJZQCw7BI0v+mZba766fgA/F1UiJC9PE6c9EU8fE1sPKZ2uj3tXMY7NbGya6CjhMyD54EGKqvzFrVXBuGd4b9iFrrtrguO7IeJLaKk8TiK1lpJJ3j0CQQA',
  },
  'land-image-6': {
    widths: [576, 1152, 1728],
    width: 1728,
    height: 3072,
    blur: 'data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAAAwBACdASoQABwAPzmGulQvKSWjMAgB4CcJYwC7AGbENbt7gGD0UGeKyUAA/rNpsfDYOWsCQalPL1aSMDbEz+yf/8dk6QUNhFpya2Z4HhSQymT5VlxOa2cB7+ftVFyaE9myRbw73ejeEiEa2IU2n0Y1hxICAoh3xRIGuQq2+w6UnwiSVh+COn7eQzwAAA==',
  },
  'land-image-7': {
    widths: [576, 1152, 1728],
    width: 1728,
    height: 3072,
    blur: 'data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAACQBACdASoQABwAPzmEuVOvKKWisAgB4CcJbACdMoACtF9/RohHH/TWX9gpEcAA/nFN88VuND2gjKgcaqo6C2q0g0G1RKIIKMjb9drISv7BTI4CW44ZwumZnY+Q2a/TV9SD7r8+6WjvGHa1Momq4iEIEQnzPHXR5kJxrOURvKRQ8z30nDtWJAAA',
  },
  'land-image-8': {
    widths: [576, 1152, 1728],
    width: 1728,
    height: 3072,
    blur: 'data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAADwAwCdASoQABwAPzmEuVOvKKWisAgB4CcJZwAATrZ0+juIht2hUeqAAPw0oIthMT3OOCL5VU8gIeFK8ltBnIgu5OkfWZ/O1aN9sc2Il9Fxtp2L9znMm6TBrdO13UYKyutqShFDuQJws3lj152YYjrYlMyzHgZ6Krg9svAA',
  },
  'landing-cover': {
    widths: [576, 1152, 1728],
    width: 1728,
    height: 3072,
    blur: 'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAADwAwCdASoQABwAPzmEuVOvKKWisAgB4CcJQBUehApCy+RPizU+3riQANrDma2ijzC1Xlv3NAQkVpQCrG4kIS8ZoMIC7wXUzhaNH45X1SutVk2FSUFSiT87Qgv2I0fUv5SBMVhfiKTaqKmC3lUZgjVKT3T7GWS6M9gAAA==',
  },
} as const satisfies Record<string, ResponsiveImage>

export type ImageName = keyof typeof images
