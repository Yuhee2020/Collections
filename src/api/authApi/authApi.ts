import { AxiosResponse } from 'axios'

import { instance } from '../instance'

import {
  AuthDataType,
  LoginResponseType,
  LogoutResponseType,
  RegistrationResponseType,
} from './index'

export const authApi = {
  login(data: AuthDataType) {
    return instance.post<AuthDataType, AxiosResponse<LoginResponseType>>(
      '/auth/login',
      data,
    )
  },
  logout() {
    return instance.post<AuthDataType, AxiosResponse<LogoutResponseType>>('/auth/logout')
  },
  registration(data: AuthDataType) {
    return instance.post<AuthDataType, AxiosResponse<RegistrationResponseType>>(
      'auth/registration',
      data,
    )
  },
  auth() {
    return instance.post<LoginResponseType>('/auth/refresh')
  },
}
