import styled from 'styled-components'

interface SectionTitleComponentProps {
  isSecondary?: boolean
  text: string
}

export function SectionTitleComponent({
  isSecondary = false,
  text,
}: SectionTitleComponentProps) {
  return (
    <ItemsContainer>
      {isSecondary ? (
        <ItemsSubtitle>{text}</ItemsSubtitle>
      ) : (
        <ItemsTitle>{text}</ItemsTitle>
      )}
    </ItemsContainer>
  )
}

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ItemsTitle = styled.h2`
  padding: 8px 0;
  font-weight: 500;
`

const ItemsSubtitle = styled.h3`
  padding: 8px 0;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.title};
`
