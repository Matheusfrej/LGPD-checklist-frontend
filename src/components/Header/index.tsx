import { Palette } from 'phosphor-react'
import * as S from './styles'
import { ButtonComponent } from '../ButtonComponent'

interface HeaderProps {
  changeTheme: () => void
}

export function Header({ changeTheme }: HeaderProps) {
  return (
    <S.HeaderContainer>
      <h2>Checklist LGPD</h2>
      <ButtonComponent
        icon={<Palette size={24} />}
        action={() => changeTheme()}
        text="Mudar tema"
        variant="outline"
      />
    </S.HeaderContainer>
  )
}
