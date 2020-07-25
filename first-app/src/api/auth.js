import axios from 'axios';

export const signup=async (data)=>{
    const config={
        headers:{
            'Content-Type':'application/json',
        },
    };
    const response=await axios.post('/api/auth/signup',data,config);
    return response;
};

export const login=async(data)=>{
    const config={
        header:{
            'Content-Type':'application/json',
        },
    };
    const response=await axios.post('/api/auth/login',data,config);
    return response;
};

export const uploadItem=async(data)=>{
    const config={
        header:{
            'Content-Type':'application/json',
        },
    };
    const response=await axios.post('/api/auth/uploadItem',data,config);
    return response;
};
