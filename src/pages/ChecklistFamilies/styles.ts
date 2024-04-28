import styled from 'styled-components'

export const ChecklistFamiliesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input[type='checkbox'] {
      width: 1.25rem;
      height: 1.25rem;
      accent-color: ${({ theme }) => theme.colors.contrast};
    }
  }
`
