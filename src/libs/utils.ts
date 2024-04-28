import api from './api'

const saveTokenOnAuthorizationHeader = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export { saveTokenOnAuthorizationHeader }
