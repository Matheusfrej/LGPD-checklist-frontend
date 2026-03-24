import { ReactNode, createContext, useContext, useState } from 'react'
import { CategoriesType } from '../@types'
import { useUsers } from './UsersContext'
import { useAuth } from './AuthContext'
import {
  getChecklistService,
  getChecklistServiceDefaultErrorMessage,
} from '../services/checklist/getChecklistService'
import { ChecklistDTO, ChecklistItemType } from '../dtos/checklistDTO'
import { AppError } from '../utils/AppError'
import { useToast } from './ToastContext'
import { DeviceDTO } from '../dtos/deviceDTO'
import { LawDTO } from '../dtos/lawDTO'
import {
  listItemsService,
  listItemsServiceDefaultErrorMessage,
} from '../services/item/listItems'
import { SectionDTO } from '../dtos/sectionDTO'
import { getItemValidationMessage } from '../libs/business'

export interface ChecklistsContextType {
  devices: DeviceDTO[]
  laws: LawDTO[]
  categoriesSelected: CategoriesType
  currChecklistId: number | undefined
  filteredChecklist: (
    isMandatory?: boolean,
    sectionId?: number,
  ) => ChecklistItemType[]
  validateChecklist: (isMandatory: boolean) => string | null
  resetChecklist: () => void
  findIndexByIsMandatoryAndCode: (isMandatory: boolean, code: string) => number
  onChecklistUpdate: (checklist: ChecklistItemType[]) => void
  updateChecklistRow: (checklist: ChecklistItemType, index: number) => void
  onCategoriesSelectedUpdate: (categoriesSelected: CategoriesType) => void
  loadChecklist: (id: number) => Promise<void>
  fetchItems: (
    _laws: LawDTO[],
    _devices: DeviceDTO[],
  ) => Promise<ChecklistItemType[] | null>
  setCurrChecklistId: React.Dispatch<React.SetStateAction<number | undefined>>
  onSetDevices: (devices: DeviceDTO[]) => void
  onSetLaws: (laws: LawDTO[]) => void
  removeDisabledItems: () => void
  uniqueSections: (isMandatory?: boolean) => SectionDTO[]
}

const ChecklistsContext = createContext({} as ChecklistsContextType)

interface ChecklistsContextProviderProps {
  children: ReactNode
}

export function ChecklistsContextProvider({
  children,
}: ChecklistsContextProviderProps) {
  const [checklist, setChecklist] = useState<ChecklistItemType[]>([])
  const { user, onUserUpdate, setUserSystemId } = useUsers()
  const { toastError } = useToast()
  const { isLogged } = useAuth()

  const [categoriesSelected, setCategoriesSelected] = useState<CategoriesType>({
    Sim: true,
    Não: true,
    'Não se aplica': true,
    'Não Preenchido': true,
  })
  const [devices, setDevices] = useState<DeviceDTO[]>([])
  const [laws, setLaws] = useState<LawDTO[]>([])
  const [currChecklistId, setCurrChecklistId] = useState<number | undefined>()

  const findIndexByIsMandatoryAndCode = (
    isMandatory: boolean,
    code: string,
  ) => {
    return checklist.findIndex(
      (item) =>
        item.item.isMandatory === isMandatory && item.item.code === code,
    )
  }

  const filteredChecklist = (isMandatory?: boolean, sectionId?: number) => {
    const filtered = checklist.filter(
      (row) =>
        !row.disabled &&
        (isMandatory === undefined || row.item.isMandatory === isMandatory) &&
        (sectionId === undefined || row.item.section?.id === sectionId) &&
        categoriesSelected[row.answer ? row.answer : 'Não Preenchido'],
    )

    return filtered
  }

  const onChecklistUpdate = (checklist: ChecklistItemType[]) => {
    setChecklist(checklist)
  }

  const updateChecklistRow = (row: ChecklistItemType, index: number) => {
    const checklistCopy = [...checklist]
    if (row.answer !== 'Não') {
      row.severityDegree = undefined
    }
    checklistCopy[index] = row
    setChecklist(checklistCopy)
  }

  const validateChecklist = (isMandatory: boolean): string | null => {
    for (const item of filteredChecklist(isMandatory)) {
      const msg = getItemValidationMessage(item)
      if (msg) return msg
    }
    return null
  }

  const resetChecklist = () => {
    setChecklist([])
    setCategoriesSelected({
      Sim: true,
      Não: true,
      'Não se aplica': true,
      'Não Preenchido': true,
    })
    setLaws([])
    setDevices([])
    onUserUpdate({
      ...user,
      name: isLogged ? user.name : '',
      office: isLogged ? user.office : '',
      systemName: undefined,
      systemDesc: undefined,
      system: undefined,
    })
  }

  const onCategoriesSelectedUpdate = (categoriesSelected: CategoriesType) => {
    setCategoriesSelected(categoriesSelected)
  }

  const onSetDevices = (devices: DeviceDTO[]) => {
    setDevices(devices)
  }

  const onSetLaws = (laws: LawDTO[]) => {
    setLaws(laws)
  }

  const setChecklistLoaded = (checklist: ChecklistDTO) => {
    setChecklist(checklist.checklistItems)
    setUserSystemId(checklist.systemId)
    setLaws(checklist.laws ?? [])
    setDevices(checklist.devices ?? [])
  }

  const removeDisabledItems = () => {
    setChecklist((prev) => prev.filter((item) => !item.disabled))
  }

  // Função para retornar seções únicas do checklist filtrado
  const uniqueSections = (isMandatory?: boolean) => {
    return Array.from(
      new Map(
        filteredChecklist(isMandatory).map((item) => [
          item.item.section.id,
          item.item.section,
        ]),
      ).values(),
    )
  }

  const loadChecklist = async (id: number) => {
    try {
      setCurrChecklistId(id)
      const data = await getChecklistService(id)

      setChecklistLoaded(data.checklist)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : getChecklistServiceDefaultErrorMessage
      toastError(title)
    }
  }

  const fetchItems = async (_laws = laws, _devices = devices) => {
    try {
      const data = await listItemsService(
        _laws.map((l) => l.id),
        _devices.map((d) => d.id),
      )

      // IDs of items that should be enabled (from API)
      const enabledIds = data.items.map((item) => item.id)

      // 1. Items from API, enabled (merge with previous answers if exist)
      const enabledItems = data.items.map((item) => {
        const existing = checklist.find((c) => c.item.id === item.id)
        return {
          item,
          answer: existing?.answer,
          severityDegree: existing?.severityDegree,
          userComment: existing?.userComment,
          disabled: false,
        }
      })

      // 2. Items that were in checklist but not in API, keep as disabled
      const disabledItems = checklist
        .filter((c) => !enabledIds.includes(c.item.id))
        .map((c) => ({
          ...c,
          disabled: true,
        }))

      // 3. Merge and set
      const merged = [...enabledItems, ...disabledItems]
      setChecklist(merged)
      return merged
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : listItemsServiceDefaultErrorMessage
      toastError(title)
      return null
    }
  }

  return (
    <ChecklistsContext.Provider
      value={{
        devices,
        laws,
        categoriesSelected,
        currChecklistId,
        filteredChecklist,
        validateChecklist,
        resetChecklist,
        onChecklistUpdate,
        updateChecklistRow,
        onCategoriesSelectedUpdate,
        findIndexByIsMandatoryAndCode,
        loadChecklist,
        fetchItems,
        setCurrChecklistId,
        onSetLaws,
        onSetDevices,
        removeDisabledItems,
        uniqueSections, // <-- adiciona ao contexto
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
