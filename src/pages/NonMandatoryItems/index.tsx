import { useNavigate } from 'react-router-dom'
import { ItemsTablePageComponent } from '../../components/ItemsTablePageComponent'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { useToast } from '../../contexts/ToastContext'
import { nonMandatoryItemsClassifications } from '../../utils/constants/classifications'

export function NonMandatoryItems() {
  const { validateChecklist } = useChecklists()
  const { toastError } = useToast()

  const navigate = useNavigate()
  const isMandatory = false

  const validateNonMandatoryItems = () => {
    const messageError = validateChecklist(isMandatory)

    if (!messageError) {
      navigate('/report')
    } else {
      toastError(messageError)
    }
  }

  return (
    <ItemsTablePageComponent
      isMandatory={false}
      text="Itens Não Obrigatórios"
      classifications={nonMandatoryItemsClassifications}
      action={() => validateNonMandatoryItems()}
    />
  )
}
