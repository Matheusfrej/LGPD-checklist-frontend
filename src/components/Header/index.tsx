import { Palette, User } from 'phosphor-react'
import * as S from './styles'
import { ButtonComponent } from '../ButtonComponent'
import { useTheme } from '../../contexts/ThemeContext'

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <S.HeaderContainer>
      <h2>Checklist LGPD</h2>
      <div>
        <ButtonComponent
          icon={<Palette size={24} />}
          action={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          text="Mudar tema"
          variant="outline"
        />
        <ButtonComponent
          icon={<User size={24} />}
          action={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          text="Entrar"
          style={{ border: 0, gap: 4 }}
          variant="outline"
        />
      </div>
    </S.HeaderContainer>
  )
}
