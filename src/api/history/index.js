import { backClient } from "../client";


export const postSearchHistory = async (data) => {
    return await backClient.post(`/search-histories`, data);
};


export const getSearchHistory = async () => {
    const { data } = await backClient.get("/search-histories")
    return data
}
