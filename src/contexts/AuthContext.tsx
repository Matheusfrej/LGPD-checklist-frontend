import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '../storage/storageAuthToken'
import { UserDTO } from '../dtos/userDTO'
import { useToast } from './ToastContext'
import { AppError } from '../utils/AppError'
import {
  signInService,
  signInServiceDefaultErrorMessage,
} from '../services/user/signInService'
import {
  RegisterServiceRequest,
  registerService,
  registerServiceDefaultErrorMessage,
} from '../services/user/registerService'
import {
  getUserService,
  getUserServiceDefaultErrorMessage,
} from '../services/user/getUserService'
import { saveTokenOnAuthorizationHeader } from '../libs/utils'

interface AuthContextProviderProps {
  children: ReactNode
}

interface AuthContextType {
  user: UserDTO | undefined
  isLogged: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  register: (data: RegisterServiceRequest) => Promise<boolean>
  signOut: (showToast?: boolean) => void
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
    saveTokenOnAuthorizationHeader(token)
    setUser(user)
  }

  async function signIn(email: string, password: string) {
    try {
      const data = await signInService(email, password)

      if (data.user && data.token) {
        setUser(data.user)
        storageAuthTokenSave(data.token)
        userAndTokenUpdate(data.user, data.token)
        toastSuccess('Logado com sucesso!')
        return true
      }
      return false
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : signInServiceDefaultErrorMessage
      toastError(title)
      return false
    }
  }

  async function register(data: RegisterServiceRequest) {
    try {
      await registerService(data)

      toastSuccess('Conta criada com sucesso!')
      return true
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : registerServiceDefaultErrorMessage
      toastError(title)
      return false
    }
  }

  async function getUserData(token: string) {
    try {
      const data = await getUserService(token)

      return data.user
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : getUserServiceDefaultErrorMessage
      toastError(title)
      return undefined
    }
  }

  function signOut(showToast?: boolean) {
    setUser(undefined)
    storageAuthTokenRemove()
    if (showToast) toastSuccess('Saiu com sucesso')
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged,
        signIn,
        register,
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
