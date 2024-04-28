import { useNavigate } from 'react-router-dom'
import { ActionsFooterContainer } from '../../../../templates/ActionsFooterContainer'
import { ButtonComponent } from '../../../../components/ButtonComponent'
import * as S from './styles'
import { CheckboxComponent } from '../../../../components/CheckboxComponent'
import {
  CategoriesType,
  useChecklists,
} from '../../../../contexts/ChecklistsContext'

interface ReportActionsProps {
  action: () => void
}

export function ReportActions({ action }: ReportActionsProps) {
  const { categoriesSelected, onCategoriesSelectedUpdate } = useChecklists()
  const navigate = useNavigate()

  const updateFamiliesSelected = (val: keyof CategoriesType) => {
    onCategoriesSelectedUpdate({
      ...categoriesSelected,
      [val]: !categoriesSelected[val],
    })
  }

  return (
    <S.ReportActionsContainer>
      <div>
        <p>Mostrar itens com resposta:</p>
        <S.CheckboxesForm>
          <CheckboxComponent
            value={'Sim'}
            checked={categoriesSelected.Sim}
            labelText="Sim"
            onChange={(e) =>
              updateFamiliesSelected(e.target.value as keyof CategoriesType)
            }
          />
          <CheckboxComponent
            value={'Não'}
            checked={categoriesSelected.Não}
            labelText="Não"
            onChange={(e) =>
              updateFamiliesSelected(e.target.value as keyof CategoriesType)
            }
          />
          <CheckboxComponent
            value={'Não se aplica'}
            checked={categoriesSelected['Não se aplica']}
            labelText="Não se aplica"
            onChange={(e) =>
              updateFamiliesSelected(e.target.value as keyof CategoriesType)
            }
          />
          <CheckboxComponent
            value={'Não Preenchido'}
            checked={categoriesSelected['Não Preenchido']}
            labelText="Não Preenchido"
            onChange={(e) =>
              updateFamiliesSelected(e.target.value as keyof CategoriesType)
            }
          />
        </S.CheckboxesForm>
      </div>
      <ActionsFooterContainer hasMessage inverted>
        <ButtonComponent text="Voltar" action={() => navigate(-1)} />
        <ButtonComponent text="Baixar PDF" action={() => action()} />
      </ActionsFooterContainer>
    </S.ReportActionsContainer>
  )
}
