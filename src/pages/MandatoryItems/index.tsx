import { useNavigate } from 'react-router-dom'
import { ItemsTablePageComponent } from '../../components/ItemsTablePageComponent'

export function MandatoryItems() {
  const navigate = useNavigate()

  const mandatoryItemsClassifications = [
    {
      name: 'Sobre transparência de Dados (T)',
      tag: 'T',
    },
    {
      name: 'Sobre Consentimento do Titular (C)',
      tag: 'C',
    },
  ]

  return (
    <ItemsTablePageComponent
      isMandatory
      text="Itens Obrigatórios"
      classifications={mandatoryItemsClassifications}
      action={() => navigate('/non-mandatory-items')}
    />
  )
}
