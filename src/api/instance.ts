import axios from 'axios'

import { unauthorized } from '../constants'

import { authApi } from './authApi/authApi'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

  return config
})

instance.interceptors.response.use(
  config => {
    return config
  },
  async error => {
    const originalRequest = error.config

    if (
      error.response.status === unauthorized &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await authApi.auth()

        localStorage.setItem('token', response.data.loggedUser.accessToken)

        return instance.request(originalRequest)
      } catch (e) {
        console.log('Unauthorized')
      }
    }
    throw error
  },
)
