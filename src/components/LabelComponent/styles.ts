import styled from 'styled-components'

export const Label = styled.h3`
  width: 100%;
  font-size: 14px;
  padding: 8px 0;
  font-weight: normal;
  display: flex;
  align-items: center;
  gap: 4px;
`

export const After = styled.h3`
  color: ${(props) => props.theme.colors.red};
`
