import { useNavigate } from 'react-router-dom'
import { MainContainer } from '../../templates/MainContainer'
import { useAuth } from '../../contexts/AuthContext'
import NotFoundImage from '../../assets/404.png'
import * as S from './styles'
import { useChecklists } from '../../contexts/ChecklistsContext'

export function NotFound() {
  const { isLogged } = useAuth()
  const { resetChecklist } = useChecklists()
  const navigate = useNavigate()

  const handleNewChecklist = () => {
    resetChecklist()
    navigate('/')
  }

  return (
    <MainContainer>
      <S.NotFoundContainer>
        <div>
          <h2>Opa! Essa página não existe.</h2>

          <div>
            <p>Aqui estão alguns links úteis:</p>

            <div>
              <a onClick={() => handleNewChecklist()}>Nova Checklist</a>
              {!isLogged && <a onClick={() => navigate('/login')}>Login</a>}
            </div>
          </div>
        </div>

        <img
          src={NotFoundImage}
          alt="Astronauta com o número 404 que representa não encontrado"
        />
      </S.NotFoundContainer>
    </MainContainer>
  )
}
