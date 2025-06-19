import styled from 'styled-components'

export const Stepper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  justify-content: flex-start;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.span} transparent;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.span};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`

export const Step = styled.div<{ $active: boolean }>`
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.contrast : theme.colors['header-background']};
  color: ${({ theme, $active }) =>
    $active ? theme.colors['header-background'] : theme.colors['base-text']};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  border: 2px solid ${({ theme, $active }) =>
    $active ? theme.colors.contrast : theme.colors.span};
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  position: relative;

  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 50%;
    bottom: -2.2rem;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.colors['header-background']};
    color: ${({ theme }) => theme.colors['base-text']};
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.9rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    z-index: 10;
    white-space: pre-line;
    min-width: 80px;
    max-width: 300px;
    pointer-events: none;
  }
`
