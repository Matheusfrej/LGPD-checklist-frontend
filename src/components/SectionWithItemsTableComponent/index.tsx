import { CSSProperties } from 'styled-components'
import { ItemsTableComponent } from '../ItemsTableComponent'
import { SectionContainer } from '../SectionContainer'
import { SectionTitleComponent } from '../SectionTitleComponent'
import * as S from './styles'

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
  return (
    <S.SectionWithItemsTable $isReport={isReport}>
      {title && <SectionTitleComponent text={title} isSecondary />}
      {classifications.map((item) => {
        return (
          <SectionContainer key={item.tag + isMandatory} style={style}>
            <S.ItemsContainer>
              <SectionTitleComponent text={item.name} isSecondary />
              <ItemsTableComponent
                isMandatory={isMandatory}
                tag={item.tag}
                isReport={isReport}
              />
            </S.ItemsContainer>
          </SectionContainer>
        )
      })}
    </S.SectionWithItemsTable>
  )
}
