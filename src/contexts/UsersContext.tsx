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
  systemName?: string
  systemDesc?: string
  system?: number
}

interface UsersContextType {
  user: UserType
  onUserUpdate: (user: UserType) => void
  setUserSystemId: (systemId: number) => void
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
    systemName: undefined,
    systemDesc: undefined,
    system: undefined,
  })

  const onUserUpdate = (userUpdate: UserType) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...userUpdate,
    }))
  }

  const setUserSystemId = (systemId: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      system: systemId,
    }))
  }

  useEffect(() => {
    if (isLogged && userLogged) {
      onUserUpdate({
        name: userLogged.name,
        office: userLogged.office,
        systemName: undefined,
        systemDesc: undefined,
      })
    }
  }, [isLogged, userLogged])

  return (
    <UsersContext.Provider
      value={{
        user,
        onUserUpdate,
        setUserSystemId,
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
