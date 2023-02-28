import { AxiosResponse } from 'axios'

import { UserType } from '../authApi'
import { instance } from '../instance'

import { UpdatedUserType, UserResponseType } from './index'

export const usersApi = {
  getUsers() {
    return instance.get<UserType[]>('/users/getUsers')
  },
  deleteUsers(usersId: string[]) {
    return instance.put<{ usersId: string[] }, AxiosResponse<UserResponseType>>(
      '/users/delete',
      usersId,
    )
  },
  updateUsers(updatedUsers: UpdatedUserType[]) {
    return instance.put<UpdatedUserType[], AxiosResponse<UserResponseType>>(
      '/users/update',
      updatedUsers,
    )
  },
}
