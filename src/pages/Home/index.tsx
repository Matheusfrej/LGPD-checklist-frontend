import { useNavigate } from 'react-router-dom'
import { ButtonComponent } from '../../components/ButtonComponent'
import { MainContainer } from '../../components/MainContainer'
import { Instructions } from './components/Instructions'
import { UserForm } from './components/UserForm'
import { VocabularyTable } from './components/VocabularyTable'
import { ActionsFooterContainer } from '../../components/ActionsFooterContainer'

export function Home() {
  const navigate = useNavigate()

  return (
    <MainContainer>
      <Instructions />
      <UserForm />
      <VocabularyTable />
      <ActionsFooterContainer>
        <div />
        <ButtonComponent
          text="Começar"
          action={() => navigate('/checklist-families')}
        />
      </ActionsFooterContainer>
    </MainContainer>
  )
}
