import $api from ".";
import { IAuth } from "../types/IAuth";


export const registration = async (userData: IAuth) => {
    const {data} = await $api.post('auth/register', userData)
    localStorage.setItem('token', data.token)
    return data
} 

export const login = async (userData: IAuth) => {
    const {data} = await $api.post('auth/login', userData)
    localStorage.setItem('token', data.token)
    return data
} 