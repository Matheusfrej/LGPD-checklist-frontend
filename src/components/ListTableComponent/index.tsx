/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { SectionContainer } from '../../templates/SectionContainer'
import * as S from './styles'
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
    <S.ListTableContainer>
      <S.TableHeader>
        <SectionTitleComponent text={title} />
        <ButtonComponent
          icon={<Plus size={16} />}
          text={addButtonLabel}
          action={() => handleCreateNewItem()}
        />
      </S.TableHeader>
      <SectionContainer hasHeader>
        <S.Table>
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
                    <S.ActionsContainer>
                      <ButtonComponent
                        icon={<Pencil size={16} />}
                        variant="outline"
                        action={() => handleEditItem(row)}
                      />
                      <ButtonComponent
                        icon={<Trash size={16} />}
                        action={() => handleDeleteItem(row)}
                        variant="outline"
                      />
                    </S.ActionsContainer>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </S.Table>
      </SectionContainer>
    </S.ListTableContainer>
  )
}
