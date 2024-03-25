import styled from 'styled-components'

export const Table = styled.table`
  border-collapse: collapse;
  tbody {
    td {
      padding: 0.5rem;
      border: 1px solid ${({ theme }) => theme.colors['base-text']};
      height: 1rem;

      textarea {
        width: 100%;
        height: 100%;
        resize: none;
        padding: 0.1rem;
        background: ${(props) => props.theme.colors['header-background']};
      }

      p {
        white-space: pre-line;
      }
    }

    td:first-child {
      text-align: center;
      padding: 0;
    }

    td:nth-child(2) {
      width: 15%;
    }

    td:last-child {
      width: 25%;
    }
  }

  thead {
    background: ${({ theme }) => theme.colors.contrast};
    color: ${({ theme }) => theme.colors['header-background']};
    border: 1px solid ${({ theme }) => theme.colors.contrast};

    th {
      padding: 4px;
      font-size: 1rem;
      font-weight: bold;
      border: 1px solid ${({ theme }) => theme.colors['base-text']};
    }
  }
`

interface SelectProps {
  $variant?: 'Sim' | 'Não' | 'Não se aplica'
}

export const Select = styled.select<SelectProps>`
  height: 10rem;
  text-align: center;
  min-width: 10rem;
  width: 100%;
  background: ${({ theme, $variant }) =>
    $variant === 'Sim'
      ? theme.colors.green
      : $variant === 'Não'
        ? theme.colors.red
        : $variant === 'Não se aplica'
          ? theme.colors.wheat
          : theme.colors['header-background']};
  color: ${({ theme, $variant }) =>
    !$variant
      ? theme.colors['base-text']
      : $variant === 'Não se aplica'
        ? theme.colors.black
        : theme.colors.white};

  &:disabled {
    cursor: no-drop;
  }
`

export const AnswerInReport = styled.div<SelectProps>`
  width: 100%;
  height: 100%;
  padding: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme, $variant }) =>
    $variant === 'Sim'
      ? theme.colors.green
      : $variant === 'Não'
        ? theme.colors.red
        : $variant === 'Não se aplica'
          ? theme.colors.wheat
          : theme.colors['header-background']};
  color: ${({ theme, $variant }) =>
    !$variant
      ? theme.colors['base-text']
      : $variant === 'Não se aplica'
        ? theme.colors.black
        : theme.colors.white};
`
