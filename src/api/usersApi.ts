import {instance} from "./instance";
import {UserType} from "./authApi";
import {AxiosResponse} from "axios";

export const usersApi = {
    getUsers() {
        return instance.get<UserType[]>('/users/getUsers')
    },
    deleteUsers(usersId: string[]) {
        return instance.put <{usersId: string[]}, AxiosResponse<UserResponseType>>('/users/delete', usersId)
    },
    blockUsers(usersId: string[]) {
        return instance.put<{usersId: string[]}, AxiosResponse<UserResponseType>>('/users/block', usersId)
    },
    unlockUsers(usersId: string[]) {
        return instance.put<{usersId: string[]}, AxiosResponse<UserResponseType>>('/users/unlock', usersId)
    },
    changeUsersRole(usersId: string[]) {
        return instance.put<{usersId: string[]}, AxiosResponse<UserResponseType>>('/users/changeRole', usersId)
    }
}

type UserResponseType = {
    message: string
    users: UserType[]
}