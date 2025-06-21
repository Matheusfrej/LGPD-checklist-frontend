import styled, { CSSProperties } from 'styled-components'
import { ItemsTableComponent } from '../ItemsTableComponent'
import { SectionContainer } from '../../templates/SectionContainer'
import { SectionTitleComponent } from '../SectionTitleComponent'
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
    <SectionWithItemsTable $isReport={isReport}>
      {title && <SectionTitleComponent text={title} isSecondary />}
      {sections.map((item, idx) => {
        return hasAnyItemInSection(item.id) ? (
          <SectionContainer
            key={item.id + String(isMandatory) + idx}
            style={style}
          >
            <SectionTitleComponent text={item.name} isSecondary />
            <ItemsContainer>
              <ItemsTableComponent
                isMandatory={isMandatory}
                sectionId={item.id}
                isReport={isReport}
              />
            </ItemsContainer>
          </SectionContainer>
        ) : (
          <></>
        )
      })}
    </SectionWithItemsTable>
  )
}

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    overflow: scroll;
  }
`

interface SectionWithItemsTableProps {
  $isReport: boolean
}

const SectionWithItemsTable = styled.div<SectionWithItemsTableProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ $isReport }) => ($isReport ? '2rem' : '0')};
`
