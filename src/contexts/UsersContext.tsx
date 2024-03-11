import { ReactNode, createContext, useContext, useState } from 'react'

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
  const [user, setUser] = useState<UserType>({
    name: '',
    office: '',
    systemName: '',
    systemDesc: '',
  })

  const onUserUpdate = (user: UserType) => {
    setUser(user)
  }

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
