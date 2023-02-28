import { UserType } from '../authApi'

export type UpdatedUserType = {
  id: string
  isBlocked?: boolean
  role?: string
}
export type UserResponseType = {
  message: string
  users: UserType[]
}
