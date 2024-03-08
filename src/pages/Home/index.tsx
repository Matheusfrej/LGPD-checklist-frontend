import { Instructions } from './components/Instructions'
import { UserForm } from './components/UserForm'
import { VocabularyTable } from './components/VocabularyTable'
import * as S from './styles'

export function Home() {
  return (
    <S.HomeContainer>
      <S.Main>
        <Instructions />
        <UserForm />
        <VocabularyTable />
      </S.Main>
    </S.HomeContainer>
  )
}
