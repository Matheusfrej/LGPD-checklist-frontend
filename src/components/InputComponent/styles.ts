import styled from 'styled-components'

interface InputProps {
  $error?: string
  $isNormal: boolean
}

export const TextArea = styled.textarea<InputProps>`
  background: ${({ theme }) => theme.colors['header-background']};
  border-width: 0;
  border-bottom-width: 1px;
  width: 60%;
  padding: 0.1rem;
  resize: none;
  overflow: hidden;

  border-color: ${({ theme, $error }) =>
    $error ? theme.colors.red : theme.colors.span};

  &:focus {
    border: none;
  }
`

export const Input = styled.input<InputProps>`
  background: ${({ theme }) => theme.colors['header-background']};
  border-width: 0;
  border-bottom-width: 1px;
  width: ${({ $isNormal }) => ($isNormal ? '100%' : '60%')};
  padding: 0.5rem;

  border-color: ${({ theme, $error }) =>
    $error ? theme.colors.red : theme.colors.black};

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

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputWithEye = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: -1.5rem;
    cursor: pointer;
  }
`
