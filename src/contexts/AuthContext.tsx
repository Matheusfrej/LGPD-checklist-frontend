import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import api from '../libs/api'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '../storage/storageAuthToken'
import { UserDTO } from '../dtos/userDTO'
import { useToast } from './ToastContext'
import { AppError } from '../utils/AppError'

interface AuthContextProviderProps {
  children: ReactNode
}

interface AuthContextType {
  user: UserDTO | undefined
  isLogged: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
  userUpdate: (user: UserDTO) => void
}

const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { toastSuccess, toastError } = useToast()
  const [user, setUser] = useState<UserDTO | undefined>()
  const isLogged = user !== undefined

  function userUpdate(user: UserDTO) {
    setUser(user)
  }

  async function userAndTokenUpdate(user: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(user)
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/login', {
        email,
        password,
      })
      console.log(data)

      if (data.user && data.token) {
        console.log(data.user)

        setUser(data.user)
        storageAuthTokenSave(data.token)
        userAndTokenUpdate(data.user, data.token)
        toastSuccess('Logado com sucesso!')
        return true
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'
      toastError(title)
      return false
    }
    return false
  }

  async function getUserData(token: string) {
    try {
      const { data } = await api.post('/token', {
        headers: { Authorization: `Bearer ${token}` },
      })

      return data.user
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'
      toastError(title)
      return undefined
    }
  }

  async function signOut() {
    setUser(undefined)
    storageAuthTokenRemove()
    localStorage.clear()
  }

  async function loadUserData() {
    const token = storageAuthTokenGet()

    if (token) {
      const userLogged = await getUserData(token)
      if (userLogged) {
        userAndTokenUpdate(userLogged, token)
      } else {
        signOut()
      }
    }
  }

  useEffect(() => {
    loadUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   const subscribe = api.registerInterceptTokenManager(signOut)

  //   return () => {
  //     subscribe()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged,
        signIn,
        signOut,
        userUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext)
}
