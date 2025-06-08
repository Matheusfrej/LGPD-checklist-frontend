export type AnswerType = 'Sim' | 'Não' | 'Não se aplica' | undefined

export type SeverityDegreeType = 'Leve' | 'Grave' | 'Catastrófico' | undefined

export type CategoriesType = {
  ['Sim']: boolean
  ['Não']: boolean
  ['Não se aplica']: boolean
  ['Não Preenchido']: boolean
}
