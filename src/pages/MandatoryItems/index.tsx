import { useNavigate } from 'react-router-dom'
import { ItemsTablePageComponent } from '../../components/ItemsTablePageComponent'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { useToast } from '../../contexts/ToastContext'
import { mandatoryItemsClassifications } from '../../utils/constants/classifications'

export function MandatoryItems() {
  const { validateChecklist } = useChecklists()
  const { toastError } = useToast()
  const navigate = useNavigate()
  const isMandatory = true

  const validateMandatoryItems = () => {
    const messageError = validateChecklist(isMandatory)

    if (!messageError) {
      navigate('/non-mandatory-items')
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
