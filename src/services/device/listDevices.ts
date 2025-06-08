import { DeviceDTO } from '../../dtos/deviceDTO'
import api from '../../libs/api'

export const listDevicesServiceDefaultErrorMessage =
  'Não foi possível carregar a lista de dispositivos. Tente novamente mais tarde.'

interface listDevicesServiceResponse {
  devices: DeviceDTO[]
}

export const listDevicesService =
  async (): Promise<listDevicesServiceResponse> => {
    const { data } = await api.get(`/devices`)

    return data
  }
