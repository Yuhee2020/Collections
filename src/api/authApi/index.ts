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