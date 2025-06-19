import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionsFooterContainer } from '../../templates/ActionsFooterContainer'
import { ButtonComponent } from '../ButtonComponent'
import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import { useTheme } from 'styled-components'
import { ChartsContainer } from '../ChartsContainer'
import { SectionTitleComponent } from '../SectionTitleComponent'
import { SectionWithItemsTableComponent } from '../SectionWithItemsTableComponent'
import { CheckboxesAnswerComponent } from '../CheckboxesAnswerComponent'
import { SectionDTO } from '../../dtos/sectionDTO'
import { StepperSectionsComponent } from '../StepperSectionsComponent'
import * as S from './styles'

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

  const hasSections = sections && sections.length > 0

  return (
    <MainContainer hasTable>
      <CheckboxesAnswerComponent />
      <SectionContainer hasHeader>
        <SectionTitleComponent text={text} />
        {hasSections && <ChartsContainer isMandatory={isMandatory} colors={colors} />}
      </SectionContainer>
      {hasSections && 
      <strong>
        ATENÇÃO: Para todos os itens respondidos com &quot;Não&quot;, é
        obrigatório preencher o grau de severidade e o comentário do avaliador.
      </strong>
      }
      {hasSections ? (
        <>
          <StepperSectionsComponent
            sections={sections}
            activeStep={activeStep}
            onStepClick={setActiveStep}
          />
          {sections[activeStep] && (
            <SectionWithItemsTableComponent
              isMandatory={isMandatory}
              sections={[sections[activeStep]]}
            />
          )}
          <S.StepButtons>
            <ButtonComponent
              text="Voltar"
              action={handleBack}
              disabled={activeStep === 0}
            />
            <ButtonComponent
              text={activeStep === sections.length - 1 ? 'Finalizar' : 'Próximo'}
              action={handleNext}
            />
          </S.StepButtons>
        </>
      ) : (
        <SectionContainer style={{ marginTop: 32, marginBottom: 32 }}>
          <SectionTitleComponent text="Nenhum item disponível para esta etapa." isSecondary />
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
