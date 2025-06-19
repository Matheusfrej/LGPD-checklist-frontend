import { useState } from 'react'
import { SectionWithItemsTableComponent } from '../SectionWithItemsTableComponent'
import { ButtonComponent } from '../ButtonComponent'
import { SectionTitleComponent } from '../SectionTitleComponent'
import { SectionDTO } from '../../dtos/sectionDTO'
import * as S from './styles'

interface ChecklistStepperPageComponentProps {
  isMandatory: boolean
  sections: SectionDTO[]
  action: () => void
  text: string
}

export function ChecklistStepperPageComponent({
  isMandatory,
  sections,
  action,
  text,
}: ChecklistStepperPageComponentProps) {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    if (activeStep < sections.length - 1) setActiveStep((s) => s + 1)
    else action()
  }
  const handleBack = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1)
  }

  return (
    <S.Container>
      <SectionTitleComponent text={text} />
      <S.Stepper>
        {sections.map((section, idx) => (
          <S.Step key={section.id} $active={idx === activeStep}>
            {section.name}
          </S.Step>
        ))}
      </S.Stepper>
      <SectionWithItemsTableComponent
        isMandatory={isMandatory}
        sections={[sections[activeStep]]}
      />
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
    </S.Container>
  )
}
