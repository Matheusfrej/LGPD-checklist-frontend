import { LawDTO } from '../../dtos/lawDTO'
import api from '../../libs/api'

export const listLawsServiceDefaultErrorMessage =
  'Não foi possível carregar a lista de leis. Tente novamente mais tarde.'

interface listLawsServiceResponse {
  laws: LawDTO[]
}

export const listLawsService = async (): Promise<listLawsServiceResponse> => {
  const { data } = await api.get(`/laws`)

  return data
}
