import styled from 'styled-components'

interface ButtonProps {
  $variant: 'default' | 'outline'
}

export const ButtonContainer = styled.div<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0.5rem;
  font-size: 0.9rem;
  min-width: 5rem;
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === 'default'
        ? theme.colors['base-background']
        : theme.colors.contrast};
  border-radius: ${({ $variant }) => ($variant === 'outline' ? '16px' : '8px')};
  cursor: pointer;
  background: ${({ theme, $variant }) =>
    $variant === 'default' ? theme.colors.contrast : 'transparent'};
  color: ${({ theme, $variant }) =>
    $variant === 'default'
      ? theme.colors['base-background']
      : theme.colors.contrast};

  &:hover {
    background-color: ${({ theme, $variant }) =>
      $variant === 'default'
        ? theme.colors['strong-contrast']
        : theme.colors.contrast};
    color: ${({ theme }) => theme.colors['base-background']};
  }
`
