import api from '../../libs/api'

const registerServiceDefaultErrorMessage =
  'Não foi possível criar a conta. Tente novamente mais tarde.'

export interface RegisterServiceRequest {
  name: string
  office: string
  email: string
  password: string
}

async function registerService(data: RegisterServiceRequest): Promise<void> {
  await api.post('/users', {
    name: data.name,
    office: data.office,
    email: data.email,
    password: data.password,
  })
}

export { registerServiceDefaultErrorMessage, registerService }
