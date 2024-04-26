import { backClient } from "../client";


export const getLoginUser = async (data) => {
    return await backClient.post(`/users/login`, data);
};

export const getUserProfileInfo = async (data) => {
    return await backClient.get(`/users/profile`);
};


export const getRegisterUser = async (data) => {
    return await backClient.post(`/users/register`, data);
};


export const getForgotUser = async (data) => {
    return await backClient.post(`/users/forgot-password`, data);
};


export const activateUser = async (data) => {
    return await backClient.post(`/users/activate?confirmationToken=${data.confirmationToken}&otp=${data.otp}`, data);
};


export const resetPassword = async (data, token) => {
    return await backClient.post(`/users/reset-password?token=${token}`, data);
};
