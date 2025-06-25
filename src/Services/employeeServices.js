import axios from 'axios';
import { BASE_URL } from '../Utils/urls';
import { getToken } from '../Utils/StorageHandler';

axios.defaults.withCredentials = true;

export const empprofileAPI = async () => {
    const token = getToken()

        const response = await axios.get(`${BASE_URL}/employee/getemp`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        });        
        return response.data;
};
export const attendencemarkAPI = async (data) => {
    const token = getToken()

    console.log();
    

        const response = await axios.post(`${BASE_URL}/attendence/mark`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
};
export const deliveryupdateAPI = async (data) => {
    const token = getToken()

    console.log();
    

        const response = await axios.put(`${BASE_URL}/delivery/update`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
};

export const deliveryviewAPI = async () => {
    const token = getToken()

        const response = await axios.get(`${BASE_URL}/delivery/get`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        });        
        return response.data;
};
export const getallreservationAPI = async () => {
    
    const token = getToken()

    const response = await axios.get(`${BASE_URL}/reservations/viewall`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        
    });
    return response.data;
};
export const reservationeditAPI =async (data) => {
    const token = getToken()

    console.log(data);
    
    const response = await axios.put(`${BASE_URL}/reservations/edit`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const deletereservationsAPI = async (data) => {
    const token = getToken()

    const response = await axios.delete(`${BASE_URL}/reservations/delete/${data}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }        
    });
    return response.data;
};
export const deliveryotpAPI = async (data) => {
    
    const token = getToken()
console.log(data);

    const response = await axios.post(`${BASE_URL}/delivery/otp`,data ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
        
    });
    return response.data;
};