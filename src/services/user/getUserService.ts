import { UserDTO } from '../../dtos/userDTO'
import api from '../../libs/api'

const getUserServiceDefaultErrorMessage =
  'Não foi possível entrar. Tente novamente mais tarde.'

export interface GetUserServiceResponse {
  user: UserDTO
}

async function getUserService(token: string): Promise<GetUserServiceResponse> {
  const { data } = await api.get('/token', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return data
}

export { getUserServiceDefaultErrorMessage, getUserService }
