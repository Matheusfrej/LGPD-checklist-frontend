import { CategoriesType, useChecklists } from '../../contexts/ChecklistsContext'
import { CheckboxComponent } from '../CheckboxComponent'
import * as S from './styles'

export function CheckboxesAnswerComponent() {
  const { categoriesSelected, onCategoriesSelectedUpdate } = useChecklists()

  const updateCategoriesSelected = (val: keyof CategoriesType) => {
    onCategoriesSelectedUpdate({
      ...categoriesSelected,
      [val]: !categoriesSelected[val],
    })
  }

  return (
    <div>
      <p>Mostrar itens com resposta:</p>
      <S.CheckboxesForm>
        <CheckboxComponent
          value={'Sim'}
          checked={categoriesSelected.Sim}
          labelText="Sim"
          onChange={(e) =>
            updateCategoriesSelected(e.target.value as keyof CategoriesType)
          }
        />
        <CheckboxComponent
          value={'Não'}
          checked={categoriesSelected.Não}
          labelText="Não"
          onChange={(e) =>
            updateCategoriesSelected(e.target.value as keyof CategoriesType)
          }
        />
        <CheckboxComponent
          value={'Não se aplica'}
          checked={categoriesSelected['Não se aplica']}
          labelText="Não se aplica"
          onChange={(e) =>
            updateCategoriesSelected(e.target.value as keyof CategoriesType)
          }
        />
        <CheckboxComponent
          value={'Não Preenchido'}
          checked={categoriesSelected['Não Preenchido']}
          labelText="Não Preenchido"
          onChange={(e) =>
            updateCategoriesSelected(e.target.value as keyof CategoriesType)
          }
        />
      </S.CheckboxesForm>
    </div>
  )
}
