import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useAuth } from './AuthContext'

export type UserType = {
  name: string
  office: string
  systemName: string
  systemDesc: string
}

interface UsersContextType {
  user: UserType
  onUserUpdate: (user: UserType) => void
}

const UsersContext = createContext({} as UsersContextType)

interface UsersContextProviderProps {
  children: ReactNode
}

export function UsersContextProvider({ children }: UsersContextProviderProps) {
  const { user: userLogged, isLogged } = useAuth()

  const [user, setUser] = useState<UserType>({
    name: '',
    office: '',
    systemName: '',
    systemDesc: '',
  })

  const onUserUpdate = (user: UserType) => {
    setUser(user)
  }

  useEffect(() => {
    if (isLogged && userLogged) {
      onUserUpdate({
        ...user,
        name: userLogged?.name,
        office: userLogged?.office,
      })
    } else {
      onUserUpdate({
        name: '',
        office: '',
        systemName: '',
        systemDesc: '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged])

  return (
    <UsersContext.Provider
      value={{
        user,
        onUserUpdate,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers(): UsersContextType {
  const context = useContext(UsersContext)

  return context
}
