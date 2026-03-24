import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionsFooterContainer } from '../../templates/ActionsFooterContainer'
import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import { useTheme } from 'styled-components'
import { ChartsContainer } from '../ChartsContainer'
import { SectionTitleComponent } from '../SectionTitleComponent'
import { SectionWithItemsTableComponent } from '../SectionWithItemsTableComponent'
import { CheckboxesAnswerComponent } from '../CheckboxesAnswerComponent'
import { SectionDTO } from '../../dtos/sectionDTO'
import { StepperSectionsComponent } from '../StepperSectionsComponent'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { getItemValidationMessage } from '../../libs/business'
import { ButtonComponent } from '../ButtonComponent'

interface ItemsTablePageComponentProps {
  text: string
  isMandatory: boolean
  sections: SectionDTO[]
  action: () => void
}

export function ItemsTablePageComponent({
  text,
  isMandatory,
  sections,
  action,
}: ItemsTablePageComponentProps) {
  const navigate = useNavigate()
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const { filteredChecklist } = useChecklists()

  const colors = [
    theme.colors.green,
    theme.colors.red,
    theme.colors.wheat,
    theme.colors.contrast,
  ]

  const handleNext = () => {
    if (activeStep < sections.length - 1) setActiveStep((s) => s + 1)
    else action()
  }
  const handleBack = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1)
  }

  // Função para checar se todos os itens de uma seção estão preenchidos
  function isSectionComplete(sectionId: number) {
    const items = filteredChecklist(isMandatory, sectionId)
    if (items.length === 0) return false
    return items.every((item) => {
      return item.answer && !getItemValidationMessage(item)
    })
  }

  // Array indicando se cada seção está completa
  const completedSteps = sections.map((section) =>
    isSectionComplete(section.id),
  )

  const hasSections = sections && sections.length > 0

  return (
    <MainContainer hasTable>
      <CheckboxesAnswerComponent />
      <SectionContainer hasHeader>
        <SectionTitleComponent text={text} />
        {hasSections && (
          <ChartsContainer isMandatory={isMandatory} colors={colors} />
        )}
      </SectionContainer>
      {hasSections && (
        <strong>
          ATENÇÃO: Para todos os itens respondidos com &quot;Não&quot;, é
          obrigatório preencher o grau de severidade e o comentário do
          avaliador.
        </strong>
      )}
      {hasSections ? (
        <>
          <StepperSectionsComponent
            sections={sections}
            activeStep={activeStep}
            onStepClick={setActiveStep}
            completedSteps={completedSteps}
            handleNext={handleNext}
            handleBack={handleBack}
          >
            {sections[activeStep] && (
              <SectionWithItemsTableComponent
                isMandatory={isMandatory}
                sections={[sections[activeStep]]}
              />
            )}
          </StepperSectionsComponent>
        </>
      ) : (
        <SectionContainer style={{ marginTop: 32, marginBottom: 32 }}>
          <SectionTitleComponent
            text="Nenhum item disponível para esta etapa."
            isSecondary
          />
          <p style={{ textAlign: 'center', margin: '24px 0' }}>
            Não há itens para serem preenchidos nesta etapa.
          </p>
        </SectionContainer>
      )}
      <ActionsFooterContainer hasMessage>
        <ButtonComponent text="Voltar" action={() => navigate(-1)} />
        <ButtonComponent text="Continuar" action={action} />
      </ActionsFooterContainer>
    </MainContainer>
  )
}
