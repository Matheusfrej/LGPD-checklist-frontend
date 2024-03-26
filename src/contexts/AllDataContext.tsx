import { ReactNode, createContext, useContext } from 'react'
import { UserType, useUsers } from './UsersContext'
import {
  ChecklistFamiliesOptions,
  ChecklistItemType,
  useChecklists,
} from './ChecklistsContext'
import { useToast } from './ToastContext'
import { initialItems } from '../utils/checklistInitial'

export type AllDataType = {
  user: UserType
  checklist: ChecklistItemType[]
  familiesSelected: ChecklistFamiliesOptions
}

interface AllDataContextType {
  importJson: () => void
  exportJson: () => void
}

const AllDataContext = createContext({} as AllDataContextType)

interface AllDataContextProviderProps {
  children: ReactNode
}

export function AllDataContextProvider({
  children,
}: AllDataContextProviderProps) {
  const { user, onUserUpdate } = useUsers()
  const {
    checklist,
    familiesSelected,
    onChecklistUpdate,
    onFamiliesSelectedUpdate,
  } = useChecklists()
  const { toastError, toastSuccess } = useToast()

  const allData: AllDataType = {
    user,
    checklist,
    familiesSelected,
  }

  const setAllData = (data: AllDataType) => {
    onUserUpdate(data.user)
    onChecklistUpdate(data.checklist)
    onFamiliesSelectedUpdate(data.familiesSelected)
  }

  const isAllDataType = (data: object): data is AllDataType => {
    return 'user' in data && 'checklist' in data && 'familiesSelected' in data
  }

  const validateFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsedData = JSON.parse(reader.result as string)
        if (
          typeof parsedData === 'object' &&
          isAllDataType(parsedData) &&
          parsedData.checklist.length === initialItems.length
        ) {
          setAllData(parsedData)
          toastSuccess('Dados importados com sucesso')
        } else {
          toastError('JSON modificado ou inválido')
        }
      } catch (error) {
        toastError('O arquivo não é do tipo JSON ou é inválido')
      }
    }
    reader.readAsText(file)
  }

  const importJson = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement
      const file = target.files && target.files[0]
      if (file) {
        validateFile(file)
      }
    }
    input.click()
  }

  const exportJson = () => {
    const jsonData = JSON.stringify(allData, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'checklist-form-data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <AllDataContext.Provider value={{ importJson, exportJson }}>
      {children}
    </AllDataContext.Provider>
  )
}

export function useAllData(): AllDataContextType {
  const context = useContext(AllDataContext)

  return context
}
