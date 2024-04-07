import { useEffect, useRef, useState } from 'react'
import * as S from './styles'
import { useAuth } from '../../../contexts/AuthContext'
import { LineComponent } from '../../LineComponent'
import { useOutsideAlerter } from '../../../hooks/clickedOutside'
import { useNavigate } from 'react-router-dom'

export function ProfileComponent() {
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const wrapperRef = useRef(null)
  const { clickedOutside } = useOutsideAlerter(wrapperRef)
  const navigate = useNavigate()

  const getUserNameFirstLetter = () => {
    return user?.name[0]
  }

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  useEffect(() => {
    setIsOpen(false)
  }, [clickedOutside])

  return (
    <S.ProfileContainer ref={wrapperRef}>
      <S.Avatar onClick={() => setIsOpen((state) => !state)}>
        {getUserNameFirstLetter()}
      </S.Avatar>
      {isOpen && (
        <S.ProfileOpenedContainer>
          <S.Option>Minhas checklists</S.Option>
          <S.Option>Meus sistemas</S.Option>
          <S.Option onClick={() => navigate('/profile')}>
            Gerenciar Perfil
          </S.Option>
          <LineComponent />
          <S.Option onClick={() => handleSignOut()}>Sair</S.Option>
        </S.ProfileOpenedContainer>
      )}
    </S.ProfileContainer>
  )
}
