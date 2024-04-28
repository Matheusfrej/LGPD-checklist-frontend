import { SystemDTO } from '../../dtos/systemDTO'
import api from '../../libs/api'

const listSystemsByUserIdServiceDefaultErrorMessage =
  'Não foi possível carregar os seus sistemas. Tente novamente mais tarde.'

interface ListSystemsByUserIdServiceResponse {
  systems: SystemDTO
}

const listSystemsByUserIdService = async (
  userId: number,
): Promise<ListSystemsByUserIdServiceResponse> => {
  const { data } = await api.get(`/systemsByUserId/${userId}`)

  return data
}

export {
  listSystemsByUserIdServiceDefaultErrorMessage,
  listSystemsByUserIdService,
}
