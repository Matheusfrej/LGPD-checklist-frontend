export type AnswerType = 'Sim' | 'Não' | 'Não se aplica' | undefined

export type SeverityDegreeType = 'Leve' | 'Grave' | 'Catastrófico' | undefined

export type ChecklistFamiliesOptions = {
  general: boolean
  IoT: boolean
}

export type ItemClassification = {
  name: string
  tag: string
}

export type ChecklistItemType = {
  mandatory: boolean
  type: keyof ChecklistFamiliesOptions
  code: string
  itemDesc: string
  answer?: AnswerType
  severityDegree?: SeverityDegreeType
  userComment: string
  recomendations: string
}

export type CategoriesType = {
  ['Sim']: boolean
  ['Não']: boolean
  ['Não se aplica']: boolean
  ['Não Preenchido']: boolean
}
