import { demoSlides, type DemoSlide } from './demo-slides'

export type AlbumTheme = {
  id: string
  name: string
  description: string
  cover?: DemoSlide
  slides: readonly DemoSlide[]
}

const zhoushanSunsetSlides: readonly DemoSlide[] = Array.from({ length: 7 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0')
  return {
    id: `zhoushan-sunset-${number}`,
    src: `/img/album/zhoushan-sunset/zhoushan-sunset-${number}-1152.webp`,
    width: 1360,
    height: 2048,
  }
})

const jiuzhaigouReedMarshSlides: readonly DemoSlide[] = [
  { id: 'jiuzhaigou-reed-marsh-01', src: '/img/album/jiuzhaigou-reed-marsh/jiuzhaigou-reed-marsh-01-1152.webp', width: 1152, height: 1735 },
  { id: 'jiuzhaigou-reed-marsh-02', src: '/img/album/jiuzhaigou-reed-marsh/jiuzhaigou-reed-marsh-02-1152.webp', width: 1152, height: 1735 },
  { id: 'jiuzhaigou-reed-marsh-03', src: '/img/album/jiuzhaigou-reed-marsh/jiuzhaigou-reed-marsh-03-1152.webp', width: 1152, height: 1735 },
  { id: 'jiuzhaigou-reed-marsh-04', src: '/img/album/jiuzhaigou-reed-marsh/jiuzhaigou-reed-marsh-04-1152.webp', width: 1152, height: 1735 },
  { id: 'jiuzhaigou-reed-marsh-05', src: '/img/album/jiuzhaigou-reed-marsh/jiuzhaigou-reed-marsh-05-1152.webp', width: 1152, height: 1536 },
]

const southItalyCapriSlides: readonly DemoSlide[] = [
  { id: 'south-italy-capri-01', src: '/img/album/south-italy-capri/south-italy-capri-01-1152.webp', width: 1152, height: 1735 },
]

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
    description: '海岛晚霞与海岸婚礼',
    cover: zhoushanSunsetSlides[0],
    slides: zhoushanSunsetSlides,
  },
  {
    id: 'jiuzhaigou-reed-marsh',
    name: '九寨沟-荻野',
    description: '碧蓝溪流与荻野婚礼',
    cover: jiuzhaigouReedMarshSlides[0],
    slides: jiuzhaigouReedMarshSlides,
  },
  {
    id: 'south-italy-capri',
    name: '南意-Capri岛',
    description: '卡普里海岸与蔚蓝夏日婚礼',
    cover: southItalyCapriSlides[0],
    slides: southItalyCapriSlides,
  },
]

export const allAlbumSlides: readonly DemoSlide[] = Array.from(
  new Map(albumThemes.flatMap((theme) => theme.slides).map((slide) => [slide.id, slide])).values(),
)
