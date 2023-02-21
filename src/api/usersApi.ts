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
    updateUsers(updatedUsers:UpdatedUserType[]) {
        return instance.put<UpdatedUserType[], AxiosResponse<UserResponseType>>('/users/update', updatedUsers)
    },
}



export  type UpdatedUserType={
    id:string
    isBlocked?:boolean
    role?:string
}

type UserResponseType = {
    message: string
    users: UserType[]
}

