import styled from 'styled-components'

export const Stepper = styled.div`
  display: flex;
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
          ? theme.colors.green
          : theme.colors.span};
  transition:
    background 0.2s,
    color 0.2s,
    border 0.2s;
  position: relative;
`

// Adiciona um container estilizado para alinhar texto e ícone
export const StepContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
