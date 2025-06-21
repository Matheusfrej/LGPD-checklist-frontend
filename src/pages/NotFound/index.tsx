import { useNavigate } from 'react-router-dom'
import { MainContainer } from '../../templates/MainContainer'
import { useAuth } from '../../contexts/AuthContext'
import NotFoundImage from '../../assets/404.png'
import { useChecklists } from '../../contexts/ChecklistsContext'
import styled from 'styled-components'

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
      <NotFoundContainer>
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
      </NotFoundContainer>
    </MainContainer>
  )
}

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1000px) {
    flex-direction: column;
    text-align: center;
  }
  gap: 3rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 4rem;

    > div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      > div {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        a {
          color: ${({ theme }) => theme.colors.contrast};
          font-weight: 500;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }

  img {
    width: 25rem;

    @media (max-width: 1000px) {
      width: 100%;
    }
  }
`
