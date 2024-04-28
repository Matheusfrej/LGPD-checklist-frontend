import { useNavigate } from 'react-router-dom'
import { MainContainer } from '../../templates/MainContainer'
import { useAuth } from '../../contexts/AuthContext'
import NotFoundImage from '../../assets/404.png'
import * as S from './styles'

export function NotFound() {
  const { isLogged } = useAuth()
  const navigate = useNavigate()

  return (
    <MainContainer>
      <S.NotFoundContainer>
        <div>
          <h2>Opa! Essa página não existe.</h2>

          <div>
            <p>Aqui estão alguns links úteis:</p>

            <div>
              <a onClick={() => navigate('/')}>Nova Checklist</a>
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
