import { ReactNode, createContext, useContext, useState } from 'react'
import { initialItems } from '../utils/constants'

export type AnswerType = 'Sim' | 'Não' | 'Não se aplica'

export type SeverityDegreeType = 'Leve' | 'Grave' | 'Catastrófico'

export type ChecklistItemType = {
  mandatory: boolean
  type: 'general' | 'IoT'
  code: string
  itemDesc: string
  answer?: AnswerType
  severityDegree?: SeverityDegreeType
  userComment: string
  recomendations: string
}

type ChecklistFamiliesOptions = 'IoT'

export interface ChecklistsContextType {
  checklist: ChecklistItemType[]
  familiesSelected: ChecklistFamiliesOptions[]
  onChecklistUpdate: (checklist: ChecklistItemType[]) => void
  updateChecklistRow: (checklist: ChecklistItemType, index: number) => void
  onFamiliesSelectedUpdate: (
    familiesSelected: ChecklistFamiliesOptions[],
  ) => void
}

const ChecklistsContext = createContext({} as ChecklistsContextType)

interface ChecklistsContextProviderProps {
  children: ReactNode
}

export function ChecklistsContextProvider({
  children,
}: ChecklistsContextProviderProps) {
  const [checklist, setChecklist] = useState<ChecklistItemType[]>(initialItems)
  const [familiesSelected, setFamiliesSelected] = useState<
    ChecklistFamiliesOptions[]
  >([])

  const onChecklistUpdate = (checklist: ChecklistItemType[]) => {
    setChecklist(checklist)
  }

  const updateChecklistRow = (row: ChecklistItemType, index: number) => {
    const checklistCopy = [...checklist]
    checklistCopy[index] = row
    setChecklist(checklistCopy)
  }

  const onFamiliesSelectedUpdate = (
    familiesSelected: ChecklistFamiliesOptions[],
  ) => {
    setFamiliesSelected(familiesSelected)
  }

  return (
    <ChecklistsContext.Provider
      value={{
        checklist,
        familiesSelected,
        onChecklistUpdate,
        updateChecklistRow,
        onFamiliesSelectedUpdate,
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
