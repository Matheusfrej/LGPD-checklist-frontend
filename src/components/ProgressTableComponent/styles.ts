import styled from 'styled-components'

export const ProgressTableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 2%;

  table {
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
      }

      tr {
        color: ${({ theme }) => theme.colors.white};
      }

      tr:first-child {
        background: ${({ theme }) => theme.colors.green};
      }

      tr:nth-child(2) {
        background: ${({ theme }) => theme.colors.red};
      }

      tr:nth-child(3) {
        background: ${({ theme }) => theme.colors.wheat};
        color: ${({ theme }) => theme.colors.black};
      }

      tr:nth-child(4) {
        background: ${({ theme }) => theme.colors.contrast};
        color: ${({ theme }) => theme.colors['header-background']};
      }

      tr:nth-child(5) {
        font-weight: bold;
      }

      tr:last-child {
        color: ${({ theme }) => theme.colors['base-text']};
      }

      td:first-child {
        padding: 0.25rem;
      }

      td:nth-child(2) {
        width: 15%;
        text-align: right;
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
      }
    }
  }
`
