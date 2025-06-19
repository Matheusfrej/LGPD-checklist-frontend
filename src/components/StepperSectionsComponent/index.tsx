import { Check } from 'phosphor-react'
import { SectionDTO } from '../../dtos/sectionDTO'
import * as S from './styles'

interface StepperSectionsComponentProps {
  sections: SectionDTO[]
  activeStep: number
  onStepClick?: (idx: number) => void
  completedSteps?: boolean[]
}

export function StepperSectionsComponent({
  sections,
  activeStep,
  onStepClick,
  completedSteps = [],
}: StepperSectionsComponentProps) {
  return (
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
  )
}
