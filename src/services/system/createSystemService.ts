import api from '../../libs/api'

const createSystemServiceDefaultErrorMessage =
  'Não foi possível editar o sistema. Tente novamente mais tarde.'

interface CreateSystemServiceRequest {
  name: string
  description: string
  userId: number
}

const createSystemService = async (data: CreateSystemServiceRequest) => {
  await api.post('/systems', {
    name: data.name,
    description: data.description,
    userId: data.userId,
  })
}

export { createSystemServiceDefaultErrorMessage, createSystemService }
