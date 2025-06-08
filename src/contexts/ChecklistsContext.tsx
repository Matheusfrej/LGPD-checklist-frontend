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
  progressData: (isMandatory: boolean) => { name: string; value: number }[]
  distributionData: (isMandatory: boolean) => { name: string; value: number }[]
  progressTableData: (isMandatory: boolean) => { name: string; value: number }[]
  loadChecklist: (id: number) => Promise<void>
  fetchItems: (
    _laws: LawDTO[],
    _devices: DeviceDTO[],
  ) => Promise<ChecklistItemType[] | null>
  setCurrChecklistId: React.Dispatch<React.SetStateAction<number | undefined>>
  onSetDevices: (devices: DeviceDTO[]) => void
  onSetLaws: (laws: LawDTO[]) => void
  removeDisabledItems: () => void
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
    for (const item of checklist) {
      if (
        item.answer === 'Não' &&
        item.item.isMandatory === isMandatory &&
        !(item.severityDegree && item.userComment)
      ) {
        return 'Nos itens respondidos com "Não", preencha o grau de severidade e o comentário'
      }
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

  const progressData = (isMandatory: boolean) => {
    const progress = filteredChecklist().reduce((acc, curr) => {
      if (curr.item.isMandatory === isMandatory) {
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
            filteredChecklist().reduce((acc, curr) => {
              if (curr.item.isMandatory === isMandatory) {
                return acc + 1
              }
              return acc
            }, 0)) *
          100,
      },
    ]
  }

  const distributionData = (isMandatory: boolean) => {
    const distribution = filteredChecklist().reduce(
      (acc, curr) => {
        if (curr.item.isMandatory === isMandatory) {
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

    return filteredChecklist().reduce(
      (acc, curr) => {
        if (curr.item.isMandatory === isMandatory) {
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
        progressData,
        distributionData,
        progressTableData,
        findIndexByIsMandatoryAndCode,
        loadChecklist,
        fetchItems,
        setCurrChecklistId,
        onSetLaws,
        onSetDevices,
        removeDisabledItems,
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
