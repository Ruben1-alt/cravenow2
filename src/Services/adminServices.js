import axios from 'axios';
import { BASE_URL } from '../Utils/urls';
import { getToken } from '../Utils/StorageHandler';

axios.defaults.withCredentials = true;

export const addemployeeAPI = async (data) => {
    const token = getToken()

        const response = await axios.post(`${BASE_URL}/admin/create`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        });
        return response.data;
};
export const viewemployeeAPI = async () => {
    const token = getToken()

    const response = await axios.get(`${BASE_URL}/employee/get`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        
    });
    return response.data;
};
export const deleteemployeeAPI = async (data) => {
    const token = getToken()

    const response = await axios.delete(`${BASE_URL}/employee/delete/${data}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }        
    });
    return response.data;
};
export const editemployeeAPI = async (data) => {
    const token = getToken()

    console.log(data);
    
    const response = await axios.put(`${BASE_URL}/employee/edit/${data.id}`, data.updatedData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const detailemployeeAPI = async (data) => {
    const token = getToken()

    const response = await axios.get(`${BASE_URL}/employee/search/${data}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }        
    });
    return response.data;
};
export const getCustomersAPI = async () => {
    
    const token = getToken()

    const response = await axios.get(`${BASE_URL}/admin/get`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        
    });
    return response.data;
};
export const deleteCustomerAPI = async (data) => {
    const token = getToken()

    const response = await axios.delete(`${BASE_URL}/employee/delete/${data}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }        
    });
    return response.data;
};
export const complaintviewallAPI =async () => {
    const token = getToken()

    
    const response = await axios.get(`${BASE_URL}/complaint/viewall`,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const reviewviewallAPI =async () => {
    const token = getToken()

    
    const response = await axios.get(`${BASE_URL}/reviews/viewall`,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const orderviewallAPI =async () => {
    const token = getToken()

    
    const response = await axios.get(`${BASE_URL}/order/viewall`,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const paymentviewallAPI =async () => {
    const token = getToken()

    
    const response = await axios.get(`${BASE_URL}/payment/viewall`,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

