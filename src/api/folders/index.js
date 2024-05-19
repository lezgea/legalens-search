import { backClient } from "../client";


export const postFolder = async (data) => {
    return await backClient.post(`/folders`, data);
};


export const getFolders = async () => {
    const { data } = await backClient.get("/folders")
    return data
}
