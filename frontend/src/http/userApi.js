import {$authHost,$host} from "./index";
import jwt_decode from "jwt-decode"


export const registration = async (email,password)=>{
    const {data} = await $host.post('/user/registration',{email,password,role:"ADMIN"})
    localStorage.setItem('token',data.accessToken)
    return jwt_decode(data.accessToken);
}

export const login = async (email,password)=>{
    const {data} = await $host.post('/user/login',{email,password})
    localStorage.setItem('token',data.accessToken)
    return jwt_decode(data.accessToken);
}

export const check = async ()=>{
    const {data} = await $authHost.get('/user/auth')
    localStorage.setItem('token',data.accessToken)
    return jwt_decode(data.accessToken);
}