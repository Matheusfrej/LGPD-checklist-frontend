import styled from 'styled-components'

interface ButtonProps {
  $variant: 'default' | 'outline' | 'danger'
}

export const ButtonContainer = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.5rem;
  font-size: 0.9rem;
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === 'default'
        ? theme.colors['base-background']
        : $variant === 'outline'
          ? theme.colors.contrast
          : theme.colors.red};
  border-radius: 8px;
  cursor: pointer;
  background: ${({ theme, $variant }) =>
    $variant === 'default' ? theme.colors.contrast : 'transparent'};
  color: ${({ theme, $variant }) =>
    $variant === 'default'
      ? theme.colors['base-background']
      : $variant === 'outline'
        ? theme.colors.contrast
        : theme.colors.red};

  &:hover {
    background-color: ${({ theme, $variant }) =>
      $variant === 'default'
        ? theme.colors['strong-contrast']
        : $variant === 'outline'
          ? theme.colors.contrast
          : theme.colors.red};
    color: ${({ theme, $variant }) =>
      $variant === 'danger'
        ? theme.colors.white
        : theme.colors['base-background']};
  }
`
