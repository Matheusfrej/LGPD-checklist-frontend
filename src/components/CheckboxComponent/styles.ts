import styled from 'styled-components'

export const CheckboxComponentContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;

  input[type='checkbox'] {
    width: 1.25rem;
    height: 1.25rem;
    accent-color: ${({ theme }) => theme.colors.contrast};
  }
`
