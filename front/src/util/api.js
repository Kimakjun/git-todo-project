import axios from 'axios';


const url = 'api/v1/';

const instance = axios.create({
    baseURL: url,
    timeout: 3000,
    // withCredentials: true,
})

export const getData = (restUrl = '')=>{
    return instance.get(restUrl);
}

export const postData = (restUrl = '', data={})=>{
    return instance.post(restUrl, data);
}

export const patchData = (restUrl = '', data = {}) => {
    return instance.patch(restUrl, data);
};

export const putData = (restUrl = '', data = {}) => {
    return instance.put(restUrl, data);
};
  
export const deleteData = (restUrl = '', data = {}) => {
    return instance.delete(restUrl, data);
};

