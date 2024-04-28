import { UserDTO } from '../../dtos/userDTO'
import api from '../../libs/api'

const signInServiceDefaultErrorMessage =
  'Não foi possível entrar. Tente novamente mais tarde.'

interface SignInServiceResponse {
  user: UserDTO
  token: string
}

async function signInService(
  email: string,
  password: string,
): Promise<SignInServiceResponse> {
  const { data } = await api.post('/login', {
    email,
    password,
  })

  return data
}

export { signInServiceDefaultErrorMessage, signInService }
