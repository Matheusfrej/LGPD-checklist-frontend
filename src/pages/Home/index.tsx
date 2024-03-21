import { ButtonComponent } from '../../components/ButtonComponent'
import { MainContainer } from '../../components/MainContainer'
import { Instructions } from './components/Instructions'
import { UserForm } from './components/UserForm'
import { VocabularyTable } from './components/VocabularyTable'
import { ActionsFooterContainer } from '../../components/ActionsFooterContainer'
import { useState } from 'react'

export function Home() {
  const [pressed, setPressed] = useState(0)

  return (
    <MainContainer>
      <Instructions />
      <UserForm submitted={pressed} />
      <VocabularyTable />
      <ActionsFooterContainer>
        <div />
        <ButtonComponent
          text="Começar"
          action={() => {
            setPressed((state) => state + 1)
          }}
        />
      </ActionsFooterContainer>
    </MainContainer>
  )
}
