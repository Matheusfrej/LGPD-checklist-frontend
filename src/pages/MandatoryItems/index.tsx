import { useNavigate } from 'react-router-dom'
import { ItemsTablePageComponent } from '../../components/ItemsTablePageComponent'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { useToast } from '../../contexts/ToastContext'
import { mandatoryItemsClassifications } from '../../utils/constants/classifications'
import { useLoadChecklist } from '../../hooks/loadChecklist'

export function MandatoryItems() {
  const { validateChecklist } = useChecklists()
  const { toastError } = useToast()
  const navigate = useNavigate()
  const { id } = useLoadChecklist()

  const isMandatory = true

  const validateMandatoryItems = () => {
    const messageError = validateChecklist(isMandatory)

    if (!messageError) {
      if (id) {
        navigate(`/non-mandatory-items/${id}`)
      } else {
        navigate('/non-mandatory-items')
      }
    } else {
      toastError(messageError)
    }
  }

  return (
    <ItemsTablePageComponent
      isMandatory
      text="Itens Obrigatórios"
      classifications={mandatoryItemsClassifications}
      action={() => validateMandatoryItems()}
    />
  )
}
