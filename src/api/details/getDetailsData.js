import client from "../client";


export const getDetailsData = async ({ id }) => {
    return await client(`/enlarge?mecelle_id=${id}`);
};