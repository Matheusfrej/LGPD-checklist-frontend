import { ReactNode, createContext, useContext, useState } from 'react'
import { initialItems } from '../utils/constants'

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

export interface ChecklistsContextType {
  checklist: ChecklistItemType[]
  familiesSelected: ChecklistFamiliesOptions
  mandatoryItemsClassifications: ItemClassification[]
  nonMandatoryItemsClassifications: ItemClassification[]
  onChecklistUpdate: (checklist: ChecklistItemType[]) => void
  updateChecklistRow: (checklist: ChecklistItemType, index: number) => void
  onFamiliesSelectedUpdate: (familiesSelected: ChecklistFamiliesOptions) => void
  progressData: (isMandatory: boolean) => { name: string; value: number }[]
  distributionData: (isMandatory: boolean) => { name: string; value: number }[]
  progressTableData: (isMandatory: boolean) => { name: string; value: number }[]
}

const ChecklistsContext = createContext({} as ChecklistsContextType)

interface ChecklistsContextProviderProps {
  children: ReactNode
}

export function ChecklistsContextProvider({
  children,
}: ChecklistsContextProviderProps) {
  const [checklist, setChecklist] = useState<ChecklistItemType[]>(initialItems)
  const [familiesSelected, setFamiliesSelected] =
    useState<ChecklistFamiliesOptions>({
      general: true,
      IoT: false,
    })

  const mandatoryItemsClassifications: ItemClassification[] = [
    {
      name: 'Sobre transparência de Dados (T)',
      tag: 'T-',
    },
    {
      name: 'Sobre Consentimento do Titular (C)',
      tag: 'C-',
    },
    {
      name: 'Sobre os Direitos do Titular (D)',
      tag: 'D-',
    },
    {
      name: 'Sobre Segurança de Dados (S)',
      tag: 'S-',
    },
    {
      name: 'Sobre Responsabilidade do Controlador   (R)',
      tag: 'R-',
    },
  ]

  const nonMandatoryItemsClassifications: ItemClassification[] = [
    {
      name: 'Sobre Segurança de Dados (S)',
      tag: 'S-',
    },
    {
      name: 'Sobre Responsabilidade do Controlador   (R)',
      tag: 'R-',
    },
    {
      name: 'Acesso ao Dispositivo (A)',
      tag: 'A-',
    },
    {
      name: 'Segurança Física (SF)',
      tag: 'SF-',
    },
  ]

  const onChecklistUpdate = (checklist: ChecklistItemType[]) => {
    setChecklist(checklist)
  }

  const updateChecklistRow = (row: ChecklistItemType, index: number) => {
    const checklistCopy = [...checklist]
    checklistCopy[index] = row
    setChecklist(checklistCopy)
  }

  const progressData = (isMandatory: boolean) => {
    const progress = checklist.reduce((acc, curr) => {
      if (curr.mandatory === isMandatory && familiesSelected[curr.type]) {
        if (curr.answer) {
          return acc + 1
        }
      }
      return acc
    }, 0)

    return [
      {
        name: '',
        value:
          (progress /
            checklist.reduce((acc, curr) => {
              if (
                curr.mandatory === isMandatory &&
                familiesSelected[curr.type]
              ) {
                return acc + 1
              }
              return acc
            }, 0)) *
          100,
      },
    ]
  }

  const distributionData = (isMandatory: boolean) => {
    const distribution = checklist.reduce(
      (acc, curr) => {
        if (curr.mandatory === isMandatory && familiesSelected[curr.type]) {
          if (curr.answer === 'Sim') {
            const index = acc.findIndex(
              (obj) => obj.name === 'Taxa de Adequação',
            )
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          } else if (curr.answer === 'Não') {
            const index = acc.findIndex(
              (obj) => obj.name === 'Defeito/Problema',
            )
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          } else if (curr.answer === 'Não se aplica') {
            const index = acc.findIndex((obj) => obj.name === 'Não se aplica')
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          } else {
            const index = acc.findIndex((obj) => obj.name === 'Não preenchido')
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          }
        }
        return acc
      },
      [
        { name: 'Taxa de Adequação', value: 0 },
        { name: 'Defeito/Problema', value: 0 },
        { name: 'Não se aplica', value: 0 },
        { name: 'Não preenchido', value: 0 },
      ],
    )

    return [
      {
        name: 'Taxa de Adequação',
        value:
          (distribution[
            distribution.findIndex((obj) => obj.name === 'Taxa de Adequação')
          ].value /
            distribution.reduce((acc, curr) => acc + curr.value, 0)) *
          100,
      },
      {
        name: 'Defeito/Problema',
        value:
          (distribution[
            distribution.findIndex((obj) => obj.name === 'Defeito/Problema')
          ].value /
            distribution.reduce((acc, curr) => acc + curr.value, 0)) *
          100,
      },
      {
        name: 'Não se aplica',
        value:
          (distribution[
            distribution.findIndex((obj) => obj.name === 'Não se aplica')
          ].value /
            distribution.reduce((acc, curr) => acc + curr.value, 0)) *
          100,
      },
      {
        name: 'Não preenchido',
        value:
          (distribution[
            distribution.findIndex((obj) => obj.name === 'Não preenchido')
          ].value /
            distribution.reduce((acc, curr) => acc + curr.value, 0)) *
          100,
      },
    ]
  }

  const progressTableData = (isMandatory: boolean) => {
    const columnText = isMandatory
      ? 'Itens Obrigatórios'
      : 'Itens Não Obrigatórios'

    const rowsNames = [
      `${columnText} Adequados:`,
      `${columnText} Não Adequados:`,
      `${columnText} Não Aplicado:`,
      `${columnText} Não Preenchidos:`,
      'Total:',
    ]

    return checklist.reduce(
      (acc, curr) => {
        if (curr.mandatory === isMandatory && familiesSelected[curr.type]) {
          if (curr.answer === 'Sim') {
            const index = acc.findIndex((obj) => obj.name === rowsNames[0])
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          } else if (curr.answer === 'Não') {
            const index = acc.findIndex((obj) => obj.name === rowsNames[1])
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          } else if (curr.answer === 'Não se aplica') {
            const index = acc.findIndex((obj) => obj.name === rowsNames[2])
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          } else {
            const index = acc.findIndex((obj) => obj.name === rowsNames[3])
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          }
          const index = acc.findIndex((obj) => obj.name === rowsNames[4])
          acc[index] = { ...acc[index], value: acc[index].value + 1 }
        }
        return acc
      },
      [
        { name: rowsNames[0], value: 0 },
        { name: rowsNames[1], value: 0 },
        { name: rowsNames[2], value: 0 },
        { name: rowsNames[3], value: 0 },
        { name: rowsNames[4], value: 0 },
      ],
    )
  }

  const onFamiliesSelectedUpdate = (
    familiesSelected: ChecklistFamiliesOptions,
  ) => {
    setFamiliesSelected(familiesSelected)
  }

  return (
    <ChecklistsContext.Provider
      value={{
        checklist,
        familiesSelected,
        mandatoryItemsClassifications,
        nonMandatoryItemsClassifications,
        onChecklistUpdate,
        updateChecklistRow,
        onFamiliesSelectedUpdate,
        progressData,
        distributionData,
        progressTableData,
      }}
    >
      {children}
    </ChecklistsContext.Provider>
  )
}

export function useChecklists(): ChecklistsContextType {
  const context = useContext(ChecklistsContext)

  return context
}
