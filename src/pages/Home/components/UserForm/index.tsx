import { InputComponent } from '../../../../components/InputComponent'
import * as S from './styles'
import { UserType, useUsers } from '../../../../contexts/UsersContext'

export function UserForm() {
  const { user, onUserUpdate } = useUsers()

  const onChangeUser = (value: string, key: keyof UserType) => {
    onUserUpdate({ ...user, [key]: value })
  }

  return (
    <S.FormContainer>
      <InputComponent
        labelText="Nome do avaliador"
        isRequired
        value={user.name}
        onChangeValue={(val) => onChangeUser(val, 'name')}
      />
      <InputComponent
        labelText="Cargo ou função"
        isRequired
        value={user.office}
        onChangeValue={(val) => onChangeUser(val, 'office')}
      />
      <InputComponent
        labelText="Nome do sistema"
        isRequired
        value={user.systemName}
        onChangeValue={(val) => onChangeUser(val, 'systemName')}
      />
      <InputComponent
        labelText="Descrição do sistema"
        isRequired
        isTextArea
        value={user.systemDesc}
        onChangeValue={(val) => onChangeUser(val, 'systemDesc')}
      />
    </S.FormContainer>
  )
}
