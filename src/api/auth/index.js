import { backClient } from "../client";


export const getRegisterUser = async (data) => {
    return await backClient.post(`/users/register`, data);
};

