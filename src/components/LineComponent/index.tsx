import styled from 'styled-components'

export function LineComponent() {
  return <LineContainer />
}

const LineContainer = styled.div`
  width: 100%;
  margin: auto;
  height: 1px;
  background: ${({ theme }) => theme.colors.span};
`
