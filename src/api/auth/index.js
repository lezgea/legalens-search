import { backClient } from "../client";


export const getRegisterUser = async (data) => {
    return await backClient.post(`/users/register`, data);
};


export const getForgotUser = async (data) => {
    return await backClient.post(`/users/forgot-password`, data);
};

