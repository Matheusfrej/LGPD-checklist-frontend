import { CSSProperties } from 'styled-components'
import { ItemsTableComponent } from '../ItemsTableComponent'
import { SectionContainer } from '../../templates/SectionContainer'
import { SectionTitleComponent } from '../SectionTitleComponent'
import * as S from './styles'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { SectionDTO } from '../../dtos/sectionDTO'

interface SectionWithItemsTableComponentProps {
  isMandatory: boolean
  sections: SectionDTO[]
  style?: CSSProperties
  title?: string
  isReport?: boolean
}

export function SectionWithItemsTableComponent({
  isMandatory,
  sections,
  style,
  title,
  isReport = false,
}: SectionWithItemsTableComponentProps) {
  const { filteredChecklist } = useChecklists()

  const hasAnyItemInSection = (sectionId: number) => {
    return filteredChecklist(isMandatory, sectionId).length > 0
  }

  return (
    <S.SectionWithItemsTable $isReport={isReport}>
      {title && <SectionTitleComponent text={title} isSecondary />}
      {sections.map((item, idx) => {
        return hasAnyItemInSection(item.id) ? (
          <SectionContainer
            key={item.id + String(isMandatory) + idx}
            style={style}
          >
            <SectionTitleComponent text={item.name} isSecondary />
            <S.ItemsContainer>
              <ItemsTableComponent
                isMandatory={isMandatory}
                sectionId={item.id}
                isReport={isReport}
              />
            </S.ItemsContainer>
          </SectionContainer>
        ) : (
          <></>
        )
      })}
    </S.SectionWithItemsTable>
  )
}
