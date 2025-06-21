import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'

export function DefaultLayout() {
  return (
    <DefaultLayoutContainer>
      <Header />
      <Outlet />
      <ToastContainer />
    </DefaultLayoutContainer>
  )
}

const DefaultLayoutContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`
