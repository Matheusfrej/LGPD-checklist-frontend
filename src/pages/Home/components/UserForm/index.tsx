import { useState } from 'react'
import { InputComponent } from '../../../../components/InputComponent'
import * as S from './styles'

export function UserForm() {
  const [name, setName] = useState<string>('')
  const [office, setOffice] = useState<string>('')
  const [systemName, setSystemName] = useState<string>('')
  const [systemDesc, setSystemDesc] = useState<string>('')

  const onChangeName = (value: string) => {
    setName(value)
  }

  const onChangeOffice = (value: string) => {
    setOffice(value)
  }

  const onChangeSystemName = (value: string) => {
    setSystemName(value)
  }

  const onChangeSystemDesc = (value: string) => {
    setSystemDesc(value)
  }

  return (
    <S.FormContainer>
      <InputComponent
        labelText="Nome do avaliador"
        isRequired
        value={name}
        onChangeValue={onChangeName}
      />
      <InputComponent
        labelText="Cargo ou função"
        isRequired
        value={office}
        onChangeValue={onChangeOffice}
      />
      <InputComponent
        labelText="Nome do sistema"
        isRequired
        value={systemName}
        onChangeValue={onChangeSystemName}
      />
      <InputComponent
        labelText="Descrição do sistema"
        isRequired
        isTextArea
        value={systemDesc}
        onChangeValue={onChangeSystemDesc}
      />
    </S.FormContainer>
  )
}
