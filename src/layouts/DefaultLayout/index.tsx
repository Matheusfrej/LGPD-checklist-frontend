import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import * as S from './styles'

interface DefaultLayoutProps {
  changeTheme: () => void
}

export function DefaultLayout({ changeTheme }: DefaultLayoutProps) {
  return (
    <S.DefaultLayoutContainer>
      <Header changeTheme={changeTheme} />
      <Outlet />
    </S.DefaultLayoutContainer>
  )
}
