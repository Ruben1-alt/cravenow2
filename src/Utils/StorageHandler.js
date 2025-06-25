import {jwtDecode} from 'jwt-decode'


export const getToken = ()=>{
    console.log("hihi",sessionStorage.getItem("userToken"));
    return sessionStorage.getItem("userToken") || null
}

export const decodedData = ()=>{
    return getToken() ? jwtDecode(getToken()) : null
}