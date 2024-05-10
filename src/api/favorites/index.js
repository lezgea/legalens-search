import { backClient } from "../client";


export const postFavorites = async (data) => {
    return await backClient.post(`/favorites`, data);
};


export const getFavoritesList = async () => {
    const { data } = await backClient.get("/favorites")
    return data
}
