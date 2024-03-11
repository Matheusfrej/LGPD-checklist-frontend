import styled from 'styled-components'

interface MainProps {
  hasTable: boolean
}

export const Main = styled.div<MainProps>`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: ${(props) => (props.hasTable ? '2rem' : '2rem 10rem')};
`
