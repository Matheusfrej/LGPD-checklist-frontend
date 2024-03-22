import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import * as S from './styles'
import { ToastContainer } from 'react-toastify'

export function DefaultLayout() {
  return (
    <S.DefaultLayoutContainer>
      <Header />
      <Outlet />
      <ToastContainer />
    </S.DefaultLayoutContainer>
  )
}
