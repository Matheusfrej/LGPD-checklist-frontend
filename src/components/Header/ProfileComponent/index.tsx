import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { LineComponent } from '../../LineComponent'
import { useOutsideAlerter } from '../../../hooks/clickedOutside'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useChecklists } from '../../../contexts/ChecklistsContext'
import { useUsers } from '../../../contexts/UsersContext'
import styled from 'styled-components'

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
    <ProfileContainer ref={wrapperRef}>
      <Avatar onClick={() => setIsOpen((state) => !state)}>
        {getUserNameFirstLetter()}
      </Avatar>
      {isOpen && (
        <ProfileOpenedContainer>
          <Option onClick={() => handleAction('checklists')}>
            Minhas checklists
          </Option>
          <Option onClick={() => handleAction('systems')}>Meus sistemas</Option>
          <Option onClick={() => handleAction('profile')}>
            Gerenciar Perfil
          </Option>
          <LineComponent />
          <Option onClick={() => handleAction('signOut')}>Sair</Option>
        </ProfileOpenedContainer>
      )}
    </ProfileContainer>
  )
}

const ProfileContainer = styled.div``

const Avatar = styled.div`
  border-radius: 10px;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.contrast};
  color: ${({ theme }) => theme.colors['base-background']};
  font-weight: bold;
  font-size: 1.25rem;
  cursor: pointer;
`

const ProfileOpenedContainer = styled.div`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 1rem;
  margin-left: -8.5rem;
  border-radius: 6px;
  gap: 0.5rem;
  box-shadow: 1px 1px 1px 1px ${({ theme }) => theme.colors.span};
  padding: 1rem;

  background: ${({ theme }) => theme.colors['header-background']};
`

const Option = styled.div`
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors['base-background']};
  }
`
