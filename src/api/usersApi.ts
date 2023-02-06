import {instance} from "./instance";
import {UserType} from "./authApi";

export const usersApi = {
    getUsers() {
        return instance.get<UserType[]>('/users/getUsers')
    },
    deleteUsers(usersId: string[]) {
        return instance.put('/users/delete', usersId)
    },
    blockUsers(usersId: string[]) {
        return instance.put('/users/block', usersId)
    },
    unlockUsers(usersId: string[]) {
        return instance.put('/users/unlock', usersId)
    },
    changeUsersRole(usersId: string[]) {
        return instance.put('/users/changeRole', usersId)
    }
}