import * as S from './styles'

interface HeaderProps {
  changeTheme: () => void
}

export function Header({ changeTheme }: HeaderProps) {
  return (
    <S.HeaderContainer>
      <span>Header</span>
      <button onClick={() => changeTheme()}>Change Theme</button>
    </S.HeaderContainer>
  )
}
