import { useNavigate } from 'react-router-dom'
import { ItemsTablePageComponent } from '../../components/ItemsTablePageComponent'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { useToast } from '../../contexts/ToastContext'
import { useLoadChecklist } from '../../hooks/loadChecklist'

export function NonMandatoryItems() {
  const { validateChecklist, filteredChecklist } = useChecklists()
  const { toastError } = useToast()
  const navigate = useNavigate()
  const { id } = useLoadChecklist()

  const isMandatory = false

  const validateNonMandatoryItems = () => {
    const messageError = validateChecklist(isMandatory)

    if (!messageError) {
      if (id) {
        navigate(`/report/${id}`)
      } else {
        navigate('/report')
      }
    } else {
      toastError(messageError)
    }
  }

  return (
    filteredChecklist() && (
      <ItemsTablePageComponent
        isMandatory={false}
        text="Itens Não Obrigatórios"
        sections={filteredChecklist().map((item) => item.item.section)}
        action={() => validateNonMandatoryItems()}
      />
    )
  )
}
