import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import { LoginForm } from './components/LoginForm'
import styled from 'styled-components'

export function Login() {
  return (
    <MainContainer>
      <LoginContainer>
        <SectionContainer>
          <LoginForm />
        </SectionContainer>
      </LoginContainer>
    </MainContainer>
  )
}

export const LoginContainer = styled.div`
  width: 60%;
  margin: auto;

  @media (max-width: 1000px) {
    width: 80%;
  }
`
