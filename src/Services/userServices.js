import axios from 'axios';
import { BASE_URL } from '../Utils/urls';
import { getToken } from '../Utils/StorageHandler';


export const loginAPI=async(data)=>{
    const token = getToken()

    const response = await axios.post(`${BASE_URL}/users/login`,data)
    return response.data
    }
    
    export const registerAPI=async(data)=>{
        const token = getToken()

        const response = await axios.post(`${BASE_URL}/users/register`,data)
        return response.data
    }
    export const forgotAPI=async(data)=>{
        const response=await axios.post(`${BASE_URL}/users/forgot`,data, {
        withCredentials: true, 
        })
        return response.data
        }
        export const resetAPI=async(data)=>{
        const response=await axios.put(`${BASE_URL}/users/reset`,data, {
        withCredentials: true, 
        })
        return response.data
        }
        

 