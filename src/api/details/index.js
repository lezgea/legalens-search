import { aiClient } from "../client";


export const getDetailsData = async ({ mecelle_id, madde_id, bolme_id, fesil_id, query }) => {
    const { data } = await aiClient.get(
        `/v3/enlarge?mecelle_id=${mecelle_id}&bolme_id=${bolme_id}&fesil_id=${fesil_id}&madde_id=${madde_id}&query=${query}`,
    )
    return data
}


export const getDetailsIndex = async ({ mecelle_id, madde_id, bolme_id, fesil_id }) => {
    const { data } = await aiClient.get(
        `/get_index?mecelle_id=${mecelle_id}&bolme_id=${bolme_id}&fesil_id=${fesil_id}&madde_id=${madde_id}`,
    )
    return data
}


export const getDetailsReferenceIndex = async ({ mecelle_id, ref_name, qtype }) => {
    const { data } = await aiClient.get(
        `/get_change_scroll?mecelle_id=${mecelle_id}&ref_name=${ref_name}&qtype=${qtype}`,
    )
    return data
}
