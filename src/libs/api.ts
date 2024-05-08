import axios from 'axios'
import { AppError } from '../utils/AppError'
import { BASE_URL } from './config'

const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.error.message))
    } else {
      return Promise.reject(error)
    }
  },
)

export default api
