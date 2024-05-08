import api from '../../libs/api'

const updateSystemServiceDefaultErrorMessage =
  'Não foi possível atualizar o sistema. Tente novamente mais tarde'

interface UpdateSystemServiceRequest {
  id: number
  name: string
  description: string
}

const updateSystemService = async (data: UpdateSystemServiceRequest) => {
  await api.put(`/systems/${data.id}`, {
    name: data.name,
    description: data.description,
  })
}

export { updateSystemServiceDefaultErrorMessage, updateSystemService }
