import { Check } from 'phosphor-react'
import { SectionDTO } from '../../dtos/sectionDTO'
import styled from 'styled-components'
import { ReactNode } from 'react'
import { ButtonComponent } from '../ButtonComponent'

interface StepperSectionsComponentProps {
  sections: SectionDTO[]
  activeStep: number
  onStepClick?: (idx: number) => void
  completedSteps?: boolean[]
  children: ReactNode
  handleNext: () => void
  handleBack: () => void
}

export function StepperSectionsComponent({
  sections,
  activeStep,
  onStepClick,
  completedSteps = [],
  children,
  handleNext,
  handleBack,
}: StepperSectionsComponentProps) {
  return (
    <StepperContainer>
      <Stepper>
        {sections.map((section, idx) => (
          <Step
            key={section.id}
            $active={idx === activeStep}
            $completed={completedSteps[idx]}
            onClick={onStepClick ? () => onStepClick(idx) : undefined}
            style={{ cursor: onStepClick ? 'pointer' : 'default' }}
          >
            {completedSteps[idx] ? (
              <StepContent>
                <p style={{ margin: 0 }}>{section.name}</p>
                <Check size={24} alt="Seção totalmente preenchida" />
              </StepContent>
            ) : (
              <p style={{ margin: 0 }}>{section.name}</p>
            )}
          </Step>
        ))}
      </Stepper>
      {children}
      <StepButtons>
        <ButtonComponent
          text="Voltar"
          action={handleBack}
          disabled={activeStep === 0}
        />
        <ButtonComponent
          text={activeStep === sections.length - 1 ? 'Finalizar' : 'Próximo'}
          action={handleNext}
        />
      </StepButtons>
    </StepperContainer>
  )
}

const StepperContainer = styled.div`
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors['header-background']};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 1rem 2rem;
  border: 1px solid ${({ theme }) => theme.colors.span};
`

const Stepper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  justify-content: center;
`

const Step = styled.div<{ $active: boolean; $completed?: boolean }>`
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.contrast : theme.colors['header-background']};
  color: ${({ theme, $active }) =>
    $active ? theme.colors['header-background'] : theme.colors['base-text']};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  border: 2px solid
    ${({ theme, $active, $completed }) =>
      $active
        ? theme.colors.contrast
        : $completed
          ? theme.colors['strong-contrast']
          : theme.colors.span};
  transition:
    background 0.2s,
    color 0.2s,
    border 0.2s;
  position: relative;
`

const StepContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StepButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem 2rem;
`
