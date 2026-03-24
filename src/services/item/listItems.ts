import { ItemDTO } from '../../dtos/itemDTO'
import api from '../../libs/api'

export const listItemsServiceDefaultErrorMessage =
  'Não foi possível carregar os items da checklist. Tente novamente mais tarde.'

interface listItemsServiceResponse {
  items: ItemDTO[]
}

export const listItemsService = async (
  laws?: number[],
  devices?: number[],
): Promise<listItemsServiceResponse> => {
  const params: Record<string, string> = {}
  if (laws && laws.length > 0) {
    params.laws = laws.join(',')
  }
  if (devices && devices.length > 0) {
    params.devices = devices.join(',')
  }
  const { data } = await api.get(`/items`, { params })

  return data
}
