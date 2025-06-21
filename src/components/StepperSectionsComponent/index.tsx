import { Check } from 'phosphor-react'
import { SectionDTO } from '../../dtos/sectionDTO'
import * as S from './styles'
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
    <S.StepperContainer>
      <S.Stepper>
        {sections.map((section, idx) => (
          <S.Step
            key={section.id}
            $active={idx === activeStep}
            $completed={completedSteps[idx]}
            onClick={onStepClick ? () => onStepClick(idx) : undefined}
            style={{ cursor: onStepClick ? 'pointer' : 'default' }}
          >
            {completedSteps[idx] ? (
              <S.StepContent>
                <p style={{ margin: 0 }}>{section.name}</p>
                <Check size={24} />
              </S.StepContent>
            ) : (
              <p style={{ margin: 0 }}>{section.name}</p>
            )}
          </S.Step>
        ))}
      </S.Stepper>
      {children}
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
    </S.StepperContainer>
  )
}
