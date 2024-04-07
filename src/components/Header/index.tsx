import { Moon, Sun, User } from 'phosphor-react'
import * as S from './styles'
import { ButtonComponent } from '../ButtonComponent'
import { useTheme } from '../../contexts/ThemeContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export function Header() {
  const { isLogged } = useAuth()

  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  const location = useLocation()

  const pathNamesToExclude = ['/login', '/register']

  return (
    <S.HeaderContainer>
      <h2 onClick={() => navigate('/')}>Checklist LGPD</h2>
      <div>
        <ButtonComponent
          icon={theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
          action={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          variant="outline"
          style={{ minWidth: 0, padding: '0.25rem 0.5rem' }}
        />
        {!isLogged && !pathNamesToExclude.includes(location.pathname) && (
          <ButtonComponent
            icon={<User size={24} />}
            action={() => navigate('/login')}
            text="Entrar"
            style={{ border: 0, gap: 4 }}
            variant="outline"
          />
        )}
      </div>
    </S.HeaderContainer>
  )
}
