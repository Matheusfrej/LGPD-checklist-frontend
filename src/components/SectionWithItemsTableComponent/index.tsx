import { CSSProperties } from 'styled-components'
import { ItemsTableComponent } from '../ItemsTableComponent'
import { SectionContainer } from '../../templates/SectionContainer'
import { SectionTitleComponent } from '../SectionTitleComponent'
import * as S from './styles'
import { useChecklists } from '../../contexts/ChecklistsContext'

interface SectionWithItemsTableComponentProps {
  isMandatory: boolean
  classifications: {
    name: string
    tag: string
  }[]
  style?: CSSProperties
  title?: string
  isReport?: boolean
}

export function SectionWithItemsTableComponent({
  isMandatory,
  classifications,
  style,
  title,
  isReport = false,
}: SectionWithItemsTableComponentProps) {
  const { filteredChecklist } = useChecklists()

  const hasAnyItemInClassification = (tag: string) => {
    return filteredChecklist(isMandatory, tag).length > 0
  }

  return (
    <S.SectionWithItemsTable $isReport={isReport}>
      {title && <SectionTitleComponent text={title} isSecondary />}
      {classifications.map((item, idx) => {
        return hasAnyItemInClassification(item.tag) ? (
          <SectionContainer key={item.tag + isMandatory + idx} style={style}>
            <SectionTitleComponent text={item.name} isSecondary />
            <S.ItemsContainer>
              <ItemsTableComponent
                isMandatory={isMandatory}
                tag={item.tag}
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
