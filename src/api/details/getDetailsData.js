import client from "../client";


export const getDetailsData = async ({ mecelle_id, start, end }) => {
    return await client(`/enlarge?mecelle_id=${mecelle_id}&start=${start}&end=${end}`);
};