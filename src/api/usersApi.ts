import {instance} from "./instance";
import {UserType} from "./authApi";

export const usersApi = {
    getUsers() {
        return instance.get<UserType[]>('/users/getUsers')
    },
    deleteUsers(usersId: any) {
        return instance.put('/delete', {usersId})
    },
    blockUsers(usersId: any) {
        return instance.put('/block', {usersId})
    },
    unlockUsers(usersId: any) {
        return instance.put('/unlock', {usersId})
    }
}