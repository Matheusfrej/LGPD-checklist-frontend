/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { SectionContainer } from '../../templates/SectionContainer'
import styled from 'styled-components'
import { useAuth } from '../../contexts/AuthContext'
import { ButtonComponent } from '../ButtonComponent'
import { Pencil, Plus, Trash } from 'phosphor-react'
import { SectionTitleComponent } from '../SectionTitleComponent'

interface ColumnType {
  key: string
  value: string
}

interface ListTableComponentProps {
  columns: ColumnType[]
  title?: string
  addButtonLabel?: string
  listService?: () => any
  createService?: () => void
  editService?: (item: any) => void
  deleteService?: (item: any) => void
  updateListTrigger?: () => void
}

export function ListTableComponent({
  columns,
  title = '',
  addButtonLabel,
  listService,
  createService,
  editService,
  deleteService,
  updateListTrigger,
}: ListTableComponentProps) {
  const { user } = useAuth()
  const [data, setData] = useState<any[]>([])

  const fetchItems = async () => {
    if (listService) {
      const response = await listService()
      setData(response)
    }
  }

  const handleEditItem = (item: any) => {
    if (editService) {
      editService(item)
    }
  }

  const handleDeleteItem = (item: any) => {
    if (deleteService) {
      deleteService(item)
    }
  }

  const handleCreateNewItem = async () => {
    if (createService) {
      await createService()
    }
  }

  useEffect(() => {
    if (user) {
      fetchItems()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, updateListTrigger])

  return (
    <ListTableContainer>
      <TableHeader>
        <SectionTitleComponent text={title} />
        <ButtonComponent
          icon={<Plus size={16} aria-hidden />}
          text={addButtonLabel}
          action={() => handleCreateNewItem()}
        />
      </TableHeader>
      <SectionContainer hasHeader style={{ overflow: 'auto' }}>
        <Table>
          <thead>
            <tr>
              {columns.map((h, idx) => {
                return <th key={idx}>{h.value}</th>
              })}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              return (
                <tr key={idx}>
                  {columns.map((column, idx2) => {
                    return <td key={idx + idx2}>{row[column.key]}</td>
                  })}
                  <td>
                    <ActionsContainer>
                      <ButtonComponent
                        icon={<Pencil size={16} alt="Editar" />}
                        variant="outline"
                        action={() => handleEditItem(row)}
                      />
                      <ButtonComponent
                        icon={<Trash size={16} alt="Excluir" />}
                        action={() => handleDeleteItem(row)}
                        variant="outline"
                      />
                    </ActionsContainer>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </SectionContainer>
    </ListTableContainer>
  )
}

const ListTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Table = styled.table`
  padding: 8px 16px;
  padding-bottom: 16px;
  border-collapse: collapse;
  border-radius: 10px;

  tbody {
    td {
      padding: 0.75rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.span};
      white-space: pre-line;
    }
  }

  thead {
    color: ${({ theme }) => theme.colors['base-text']};

    th {
      padding: 0.5rem;
      font-weight: bold;
      border-bottom: 1px solid ${({ theme }) => theme.colors['base-text']};
    }
  }
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const TableHeader = styled.header`
  display: flex;
  justify-content: space-between;
`
