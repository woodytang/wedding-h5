import { demoSlides, type DemoSlide } from './demo-slides'

export type AlbumTheme = {
  id: string
  name: string
  description: string
  cover?: DemoSlide
  slides: readonly DemoSlide[]
}

// Existing images stay unclassified until the user assigns them to a theme.
// New themes can receive images later without changing the album player.
export const albumThemes: readonly AlbumTheme[] = [
  {
    id: 'uncategorized',
    name: '未归类',
    description: '现有样片',
    cover: demoSlides[0],
    slides: demoSlides,
  },
  {
    id: 'zhoushan-sunset',
    name: '舟山晚霞',
    description: '主题图片待添加',
    slides: [],
  },
]
