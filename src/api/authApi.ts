import {AxiosResponse} from "axios";
import {instance} from "./instance";


export const authApi = {
    login(data: AuthDataType) {
        return instance.post<AuthDataType, AxiosResponse<LoginResponseType>>('/auth/login', data)
    },
    logout() {
        return instance.post<AuthDataType, AxiosResponse<LogoutResponseType>>('/auth/logout')
    },
    registration(data: AuthDataType) {
        return instance.post<AuthDataType, AxiosResponse<RegistrationResponseType>>('auth/registration', data)
    },
    auth() {
        return instance.post<LoginResponseType>('/auth/refresh')
    },
}

export type AuthDataType = {
    email: string
    password: string
}

export type LoginResponseType = {
	loggedUser: UserType;
}
export type UserType = {
	_id: string;
	email: string;
	password: string;
	userName: string;
	avatar: string;
	role: string;
	isBlocked: boolean;
	registrationDate: string;
	lastLoginDate: string;
	accessToken: string;
	refreshToken: string;
	reviewsCount: number;
	likes: number;
	__v: number;
}

export type RegistrationResponseType = {
	message: string;
	user: UserType;
}

export type LogoutResponseType = {
	message: string;
	outUser: UserType;
}
