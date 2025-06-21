import styled from 'styled-components'

export const StepperContainer = styled.div`
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors['header-background']};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 1rem 2rem;
  border: 1px solid ${({ theme }) => theme.colors.span};
`

export const Stepper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  justify-content: center;
`

export const Step = styled.div<{ $active: boolean; $completed?: boolean }>`
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.contrast : theme.colors['header-background']};
  color: ${({ theme, $active }) =>
    $active ? theme.colors['header-background'] : theme.colors['base-text']};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  border: 2px solid
    ${({ theme, $active, $completed }) =>
      $active
        ? theme.colors.contrast
        : $completed
          ? theme.colors['strong-contrast']
          : theme.colors.span};
  transition:
    background 0.2s,
    color 0.2s,
    border 0.2s;
  position: relative;
`

export const StepContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const StepButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem 2rem;
`
