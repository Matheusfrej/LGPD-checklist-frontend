import { useNavigate } from 'react-router-dom'
import { ItemsTablePageComponent } from '../../components/ItemsTablePageComponent'
import { useChecklists } from '../../contexts/ChecklistsContext'

export function MandatoryItems() {
  const { mandatoryItemsClassifications } = useChecklists()
  const navigate = useNavigate()

  return (
    <ItemsTablePageComponent
      isMandatory
      text="Itens Obrigatórios"
      classifications={mandatoryItemsClassifications}
      action={() => navigate('/non-mandatory-items')}
    />
  )
}
