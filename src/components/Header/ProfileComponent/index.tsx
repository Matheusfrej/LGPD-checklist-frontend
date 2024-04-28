import { useEffect, useRef, useState } from 'react'
import * as S from './styles'
import { useAuth } from '../../../contexts/AuthContext'
import { LineComponent } from '../../LineComponent'
import { useOutsideAlerter } from '../../../hooks/clickedOutside'
import { useNavigate } from 'react-router-dom'

type ActionOptionType = 'checklists' | 'systems' | 'profile' | 'signOut'

export function ProfileComponent() {
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const wrapperRef = useRef(null)
  const { clickedOutside } = useOutsideAlerter(wrapperRef)
  const navigate = useNavigate()

  const getUserNameFirstLetter = () => {
    return user?.name[0].toUpperCase()
  }

  const handleAction = (option: ActionOptionType) => {
    if (option === 'checklists') {
      navigate('/checklists')
    } else if (option === 'systems') {
      navigate('/systems')
    } else if (option === 'profile') {
      navigate('/profile')
    } else if (option === 'signOut') {
      setIsOpen(false)
      signOut(true)
      navigate('/')
    }
    setIsOpen(false)
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
          <S.Option onClick={() => handleAction('checklists')}>
            Minhas checklists
          </S.Option>
          <S.Option onClick={() => handleAction('systems')}>
            Meus sistemas
          </S.Option>
          <S.Option onClick={() => handleAction('profile')}>
            Gerenciar Perfil
          </S.Option>
          <LineComponent />
          <S.Option onClick={() => handleAction('signOut')}>Sair</S.Option>
        </S.ProfileOpenedContainer>
      )}
    </S.ProfileContainer>
  )
}
