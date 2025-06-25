import axios from 'axios';
import { BASE_URL } from '../Utils/urls';
import { getToken } from '../Utils/StorageHandler';

axios.defaults.withCredentials = true;

export const addmenuAPI = async (data) => {
    const token = getToken()

        const response = await axios.post(`${BASE_URL}/admin/add`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":"multipart/form-data"
            }
        });
        return response.data;
};
export const menuviewAPI = async () => {
    const token = getToken()


    const response = await axios.get(`${BASE_URL}/menu/viewall`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        
    });
    console.log(response);
    
    return response.data;
};
export const detailmenuAPI = async (data) => {
    const token = getToken()

    const response = await axios.get(`${BASE_URL}/menu/search/${data}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }        
    });
    return response.data;
};
export const menueditAPI =async (data) => {
    const token = getToken()

    console.log(data);
    
    const response = await axios.put(`${BASE_URL}/menu/edit`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"multipart/form-data"

        }
    });
    return response.data;
};