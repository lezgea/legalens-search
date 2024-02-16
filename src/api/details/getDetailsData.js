import client from "../client";


export const getDetailsData = async ({ mecelle_id, madde_id, bolme_id, fesil_id }) => {
    return await client(`/enlarge?mecelle_id=${mecelle_id}&bolme_id=${bolme_id}&fesil_id=${fesil_id}&madde_id=${madde_id}`);
};