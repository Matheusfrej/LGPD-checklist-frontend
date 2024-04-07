import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import { RegisterForm } from './components/RegisterForm'
import * as S from './styles'

export function Register() {
  return (
    <MainContainer>
      <S.RegisterContainer>
        <SectionContainer>
          <RegisterForm />
        </SectionContainer>
      </S.RegisterContainer>
    </MainContainer>
  )
}
