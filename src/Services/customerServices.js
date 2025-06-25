import axios from 'axios';
import { BASE_URL } from '../Utils/urls';
import { getToken } from '../Utils/StorageHandler';

axios.defaults.withCredentials = true;

export const custprofileAPI = async () => {
    const token = getToken()
        const response = await axios.get(`${BASE_URL}/users/view`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        });        
        return response.data;
};
export const custeditAPI =async (data) => {
    const token = getToken()

    console.log(data);
    
    const response = await axios.put(`${BASE_URL}/users/edit`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const changepasswordAPI =async (data) => {
    const token = getToken()

    console.log(data);
    
    const response = await axios.put(`${BASE_URL}/users/change`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const addtocartAPI =async (data) => {
    const token = getToken()

    console.log(data);
    
    const response = await axios.post(`${BASE_URL}/cart/add`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const cartviewAPI = async () => {
    const token = getToken()


    const response = await axios.get(`${BASE_URL}/cart/get`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        
    });
    return response.data;
};
export const removecartAPI =async (data) => {
    const token = getToken()

    const response = await axios.delete(`${BASE_URL}/cart/del/${data}`,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};
export const clearcartAPI = async () => {
    const token = getToken()


    const response = await axios.delete(`${BASE_URL}/cart/clr`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        
    });
    return response.data;
};
export const complaintregAPI =async (data) => {
    const token = getToken()

    console.log(data);
    
    const response = await axios.post(`${BASE_URL}/complaint/add`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const reserveregAPI =async (data) => {
    const token = getToken()

    console.log(data);
    
    const response = await axios.post(`${BASE_URL}/reservations/add`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const reviewregAPI =async (data) => {
    const token = getToken()

    console.log(data);
    
    const response = await axios.post(`${BASE_URL}/reviews/new`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const orderAPI =async (data) => {
    const token = getToken()

    console.log(data);
    
    const response = await axios.post(`${BASE_URL}/order/add`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const paymentAPI = async (data) => {
    const token = getToken();
  console.log(data);
  
    const response = await axios.post(
      `${BASE_URL}/payment/checkout/${data}`,{},  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response.data; 
  };
  export const ordershowAPI =async (data) => {
    const token = getToken()
console.log(data);

    const response = await axios.get(`${BASE_URL}/order/show/${data}`,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};
export const orderviewAPI = async () => {
    const token = getToken()
        const response = await axios.get(`${BASE_URL}/order/view`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        });        
        return response.data;
};
export const reviewmenuAPI =async (data) => {
    const token = getToken()
console.log(data);

    const response = await axios.get(`${BASE_URL}/reviews/menu/${data}`,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};
export const notificationviewallAPI =async () => {
    const token = getToken()

    
    const response = await axios.get(`${BASE_URL}/notifications/viewall`,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const notificationmarkasreadAPI =async (data) => {
    const token = getToken()

    
    const response = await axios.put(`${BASE_URL}/notifications/update`,data,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
export const cancelorderAPI = async (data) => {
    const token = getToken()

    console.log();
    

        const response = await axios.post(`${BASE_URL}/order/cancel`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
};
export const reservationviewAPI = async () => {
    const token = getToken()
        const response = await axios.get(`${BASE_URL}/reservations/view`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        });        
        return response.data;
};
