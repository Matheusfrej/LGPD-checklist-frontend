import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import { LoginForm } from './components/LoginForm'
import * as S from './styles'

export function Login() {
  return (
    <MainContainer>
      <S.LoginContainer>
        <SectionContainer>
          <LoginForm />
        </SectionContainer>
      </S.LoginContainer>
    </MainContainer>
  )
}
