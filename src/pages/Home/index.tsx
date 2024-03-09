import { ButtonComponent } from '../../components/ButtonComponent'
import { MainContainer } from '../../components/MainContainer'
import { Instructions } from './components/Instructions'
import { UserForm } from './components/UserForm'
import { VocabularyTable } from './components/VocabularyTable'
import * as S from './styles'

export function Home() {
  return (
    <S.HomeContainer>
      <MainContainer>
        <Instructions />
        <UserForm />
        <VocabularyTable />
        <S.MainFooter>
          <ButtonComponent
            text="Começar"
            action={() => console.log('clicou')}
          />
        </S.MainFooter>
      </MainContainer>
    </S.HomeContainer>
  )
}
