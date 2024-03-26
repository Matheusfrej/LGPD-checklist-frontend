import { CSSProperties } from 'styled-components'
import { ItemsTableComponent } from '../ItemsTableComponent'
import { SectionContainer } from '../SectionContainer'
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
  const { checklist, familiesSelected } = useChecklists()

  const hasAnyItemInClassification = (tag: string) => {
    return (
      checklist.filter(
        (item) =>
          item.mandatory === isMandatory &&
          item.code.startsWith(tag) &&
          familiesSelected[item.type],
      ).length > 0
    )
  }

  return (
    <S.SectionWithItemsTable $isReport={isReport}>
      {title && <SectionTitleComponent text={title} isSecondary />}
      {classifications.map((item) => {
        return hasAnyItemInClassification(item.tag) ? (
          <SectionContainer key={item.tag + isMandatory} style={style}>
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
