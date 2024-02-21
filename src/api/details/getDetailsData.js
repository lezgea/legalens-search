import client from "../client";


export const getDetailsData = async ({ mecelle_id, madde_id, bolme_id, fesil_id }) => {
    return await client(`/enlarge?mecelle_id=${mecelle_id}&bolme_id=${bolme_id}&fesil_id=${fesil_id}&madde_id=${madde_id}`);
};


export const getDetailsIndex = async ({ mecelle_id, madde_id, bolme_id, fesil_id }) => {
    return await client(`/get_index?mecelle_id=${mecelle_id}&bolme_id=${bolme_id}&fesil_id=${fesil_id}&madde_id=${madde_id}`);
};


export const getDetailsReferenceIndex = async ({ mecelle_id, ref_name }) => {
    console.log('-------------', ref_name)
    return await client(`/get_change_scroll?mecelle_id=${mecelle_id}&ref_name=${ref_name}`);
};
