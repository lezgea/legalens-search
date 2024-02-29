import client from "../client";
import { apiURL } from "../routes";


export const getDetailsData = async ({ mecelle_id, madde_id, bolme_id, fesil_id, query }) => {
    return await client(
        apiURL,
        `/enlarge?mecelle_id=${mecelle_id}&bolme_id=${bolme_id}&fesil_id=${fesil_id}&madde_id=${madde_id}&query=${query}`,
    );
};


export const getDetailsIndex = async ({ mecelle_id, madde_id, bolme_id, fesil_id }) => {
    return await client(
        apiURL,
        `/get_index?mecelle_id=${mecelle_id}&bolme_id=${bolme_id}&fesil_id=${fesil_id}&madde_id=${madde_id}`,
    );
};


export const getDetailsReferenceIndex = async ({ mecelle_id, ref_name, qtype }) => {
    return await client(
        apiURL,
        `/get_change_scroll?mecelle_id=${mecelle_id}&ref_name=${ref_name}&qtype=${qtype}`,
    );
};
