import { useEffect, useRef, useState } from 'react'
import * as S from './styles'
import { useAuth } from '../../../contexts/AuthContext'
import { LineComponent } from '../../LineComponent'
import { useOutsideAlerter } from '../../../hooks/clickedOutside'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useChecklists } from '../../../contexts/ChecklistsContext'
import { useUsers } from '../../../contexts/UsersContext'

type ActionOptionType = 'checklists' | 'systems' | 'profile' | 'signOut'

export function ProfileComponent() {
  const { user: userLogged, signOut } = useAuth()
  const { onUserUpdate } = useUsers()
  const { resetChecklist } = useChecklists()
  const navigate = useNavigate()
  const wrapperRef = useRef(null)
  const { clickedOutside } = useOutsideAlerter(wrapperRef)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { id } = useParams()
  const { state } = useLocation()

  const getUserNameFirstLetter = () => {
    return userLogged?.name[0].toUpperCase()
  }

  const handleAction = (option: ActionOptionType) => {
    let stateId
    if (state && state.id) {
      stateId = state.id
    }

    if (option === 'checklists') {
      navigate('/checklists', { state: { id: id || stateId } })
    } else if (option === 'systems') {
      navigate('/systems', { state: { id: id || stateId } })
    } else if (option === 'profile') {
      navigate('/profile', { state: { id: id || stateId } })
    } else if (option === 'signOut') {
      setIsOpen(false)
      signOut(true)
      resetChecklist()
      onUserUpdate({
        name: '',
        office: '',
        system: undefined,
        systemDesc: undefined,
        systemName: undefined,
      })
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
