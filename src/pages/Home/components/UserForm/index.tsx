import { InputComponent } from '../../../../components/InputComponent'
import * as S from './styles'

export function UserForm() {
  return (
    <S.FormContainer>
      <InputComponent labelText="Nome do avaliador" isRequired />
      <InputComponent labelText="Cargo ou função" isRequired />
      <InputComponent labelText="Nome do sistema" isRequired />
      <InputComponent labelText="Descrição do sistema" isRequired isTextArea />
    </S.FormContainer>
  )
}
