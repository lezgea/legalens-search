import { aiClient } from "../client";


export const getDetailsData = async ({ mecelle_id, madde_id, bolme_id, fesil_id, query }) => {
    const { data } = await aiClient.get(
        `/v1/enlarge/mecelles?mecelle_id=${mecelle_id}&bolme_id=${bolme_id}&fesil_id=${fesil_id}&madde_id=${madde_id}&query=${query}`,
    )
    return data
}


export const getDetailsKmq = async ({ mecelle_id }) => {
    const { data } = await aiClient.get(`/v1/kmqs?mecelle_id=${mecelle_id}`)
    return data
}


export const getDetailsReferences = async ({ mecelle_id }) => {
    const { data } = await aiClient.get(`/v1/references?mecelle_id=${mecelle_id}`)
    return data
}



export const getDetailsIndex = async ({ mecelle_id, madde_id, bolme_id, fesil_id }) => {
    const { data } = await aiClient.get(
        `/v1/get_indexes?mecelle_id=${mecelle_id}&bolme_id=${bolme_id}&fesil_id=${fesil_id}&madde_id=${madde_id}`,
    )
    return data
}


export const getDetailsReferenceIndex = async ({ mecelle_id, ref_name, qtype }) => {
    const { data } = await aiClient.get(
        `/v1/get_scroll_indexes?mecelle_id=${mecelle_id}&ref_name=${ref_name}&qtype=${qtype}`,
    )
    return data
}


export const getDetailsAdds = async ({ mecelle_id }) => {
    const { data } = await aiClient.get(`/v1/adds?mecelle_id=${mecelle_id}`)
    return data
}