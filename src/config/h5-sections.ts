export type H5SectionId = 'hero' | 'portfolio' | 'service' | 'purchase' | 'contact'

export type H5SectionDefinition = {
  id: H5SectionId
  label: string
  note: string
}

// Keep the H5's information architecture separate from future editorial copy.
export const h5Sections: H5SectionDefinition[] = [
  { id: 'hero', label: '首屏', note: '品牌定位、主视觉与主行动入口' },
  { id: 'portfolio', label: '作品展示', note: '系列、样片和单张素材入口' },
  { id: 'service', label: '服务介绍', note: '服务范围、交付与流程说明' },
  { id: 'purchase', label: '自主选择', note: '单张、系列、套餐的选择与报价' },
  { id: 'contact', label: '咨询预约', note: '微信承接、预约与后续转化' },
]
