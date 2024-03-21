import { useNavigate } from 'react-router-dom'
import { ItemsTablePageComponent } from '../../components/ItemsTablePageComponent'
import { useChecklists } from '../../contexts/ChecklistsContext'

export function NonMandatoryItems() {
  const { nonMandatoryItemsClassifications } = useChecklists()
  const navigate = useNavigate()

  return (
    <ItemsTablePageComponent
      isMandatory={false}
      text="Itens Não Obrigatórios"
      classifications={nonMandatoryItemsClassifications}
      action={() => navigate('/report')}
    />
  )
}
