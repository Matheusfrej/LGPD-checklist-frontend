import { useEffect } from 'react'
import { useChecklists } from '../contexts/ChecklistsContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  getChecklistService,
  getChecklistServiceDefaultErrorMessage,
} from '../services/checklist/getChecklistService'
import { AppError } from '../utils/AppError'
import { useToast } from '../contexts/ToastContext'

function useLoadChecklist() {
  const { id } = useParams()
  const { isLogged } = useAuth()
  const { loadChecklist, currChecklistId, setCurrChecklistId, resetChecklist } =
    useChecklists()
  const { toastError } = useToast()
  const navigate = useNavigate()

  const checkIfChecklistExists = async (id: number) => {
    try {
      await getChecklistService(id)
    } catch (error) {
      resetChecklist()
      navigate('/')
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : getChecklistServiceDefaultErrorMessage
      toastError(title)
    }
  }

  useEffect(() => {
    if (!id) {
      setCurrChecklistId(undefined)
    }
    if (id && isLogged) {
      checkIfChecklistExists(+id)
    }

    if (id && isLogged && +id !== currChecklistId) {
      loadChecklist(+id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged])

  const idAsNumber = id ? +id : undefined

  return { id: idAsNumber }
}

export { useLoadChecklist }
