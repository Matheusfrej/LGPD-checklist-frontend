import { useNavigate } from 'react-router-dom'
import { ItemsTablePageComponent } from '../../components/ItemsTablePageComponent'

export function NonMandatoryItems() {
  const navigate = useNavigate()

  const nonMandatoryItemsClassifications = [
    {
      name: 'Sobre Segurança de Dados (S)',
      tag: 'S',
    },
    {
      name: 'Sobre Responsabilidade do Controlador (R)',
      tag: 'R',
    },
  ]

  return (
    <ItemsTablePageComponent
      isMandatory={false}
      text="Itens Não Obrigatórios"
      classifications={nonMandatoryItemsClassifications}
      action={() => navigate('/')}
    />
  )
}
