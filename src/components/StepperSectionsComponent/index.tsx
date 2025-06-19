import { SectionDTO } from '../../dtos/sectionDTO'
import * as S from '../ChecklistStepperPageComponent/styles'

interface StepperSectionsComponentProps {
  sections: SectionDTO[]
  activeStep: number
  onStepClick?: (idx: number) => void
}

export function StepperSectionsComponent({ sections, activeStep, onStepClick }: StepperSectionsComponentProps) {
  return (
    <S.Stepper>
      {sections.map((section, idx) => (
        <S.Step
          key={section.id}
          $active={idx === activeStep}
          onClick={onStepClick ? () => onStepClick(idx) : undefined}
          style={{ cursor: onStepClick ? 'pointer' : 'default' }}
        >
          {section.name}
        </S.Step>
      ))}
    </S.Stepper>
  )
}
