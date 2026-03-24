import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import { RegisterForm } from './components/RegisterForm'
import styled from 'styled-components'

export function Register() {
  return (
    <MainContainer>
      <RegisterContainer>
        <SectionContainer>
          <RegisterForm />
        </SectionContainer>
      </RegisterContainer>
    </MainContainer>
  )
}

const RegisterContainer = styled.div`
  width: 60%;
  margin: auto;

  @media (max-width: 1000px) {
    width: 80%;
  }
`
