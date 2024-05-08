import { Moon, Sun, User } from 'phosphor-react'
import * as S from './styles'
import { ButtonComponent } from '../ButtonComponent'
import { useTheme } from '../../contexts/ThemeContext'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { ProfileComponent } from './ProfileComponent'

export function Header() {
  const { isLogged } = useAuth()
  const { id } = useParams()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const { pathname, state } = useLocation()

  const pathNamesToExclude = ['/login', '/register']

  const navigateToHome = () => {
    if (id) {
      navigate(`/checklist/${id}`)
    } else if (state && state.id) {
      navigate(`/checklist/${state.id}`)
    } else {
      navigate('/')
    }
  }

  return (
    <S.HeaderContainer>
      <h2 onClick={() => navigateToHome()}>Checklist LGPD</h2>
      <div>
        <ButtonComponent
          icon={theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
          action={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          variant="outline"
          style={{ minWidth: 0, padding: '0.25rem 0.5rem' }}
        />
        {!isLogged && !pathNamesToExclude.includes(pathname) ? (
          <ButtonComponent
            icon={<User size={24} />}
            action={() => navigate('/login')}
            text="Entrar"
            style={{ border: 0, gap: 4 }}
            variant="outline"
          />
        ) : (
          isLogged && <ProfileComponent />
        )}
      </div>
    </S.HeaderContainer>
  )
}
