import styled from 'styled-components'

interface SelectProps {
  $error?: string
}

export const Select = styled.select<SelectProps>`
  padding: 0.5rem;
  width: 60%;
  font-size: 1rem;
  border-color: ${({ theme, $error }) =>
    $error ? theme.colors.red : theme.colors.span};
`

export const ErrorMessageText = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.red};
  margin-top: 4px;
  font-weight: bold;
`
