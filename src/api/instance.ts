import axios from "axios";
import {authApi} from "./authApi";

export const instance = axios.create({
    // baseURL: "http://localhost:7000",
    baseURL: "https://course-project-back.vercel.app",
    // baseURL: "https://course-project-back.onrender.com",
    withCredentials: true
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

instance.interceptors.response.use((config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry= true
            try {
                const response = await authApi.auth()
                localStorage.setItem("token", response.data.loggedUser.accessToken)
                return instance.request(originalRequest)
            }catch (e){
                console.log('Unauthorized')
            }
        }
        throw error
    })