import styled from 'styled-components'

export const TextArea = styled.textarea`
  background: ${({ theme }) => theme.colors['header-background']};
  border-width: 0;
  border-bottom-width: 1px;
  width: 60%;
  padding: 0.1rem;
  resize: none;
  overflow: hidden;

  &:focus {
    border: none;
  }
`

export const Input = styled.input`
  background: ${({ theme }) => theme.colors['header-background']};
  border-width: 0;
  border-bottom-width: 1px;
  width: 60%;
  padding: 2px;

  &:focus {
    border: none;
  }
`

export const ErrorMessageText = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.red};
  margin-top: 4px;
  font-weight: bold;
`
