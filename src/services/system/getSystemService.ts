import { SystemDTO } from '../../dtos/systemDTO'
import api from '../../libs/api'

const getSystemServiceDefaultErrorMessage =
  'Não foi possível carregar o sistema. Tente novamente mais tarde.'

interface GetSystemServiceResponse {
  system: SystemDTO
}

const getSystemService = async (
  id: number,
): Promise<GetSystemServiceResponse> => {
  const { data } = await api.get(`/systems/${id}`)
  return data
}

export { getSystemServiceDefaultErrorMessage, getSystemService }
