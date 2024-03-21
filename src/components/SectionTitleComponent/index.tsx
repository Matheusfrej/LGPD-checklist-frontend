import * as S from './styles'

interface SectionTitleComponentProps {
  isSecondary?: boolean
  text: string
}

export function SectionTitleComponent({
  isSecondary = false,
  text,
}: SectionTitleComponentProps) {
  return (
    <S.ItemsContainer>
      {isSecondary ? (
        <S.ItemsSubtitle>{text}</S.ItemsSubtitle>
      ) : (
        <S.ItemsTitle>{text}</S.ItemsTitle>
      )}
    </S.ItemsContainer>
  )
}
