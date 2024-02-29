import { backClient } from "../client";


export const postSearchHistory = async (data) => {
    return await backClient.post(`/search-histories`, data);
};


// export const getSearchHistory = async ({ mecelle_id, ref_name, qtype }) => {
//     const { data } = await backClient.get(
//         `/get_change_scroll?mecelle_id=${mecelle_id}&ref_name=${ref_name}&qtype=${qtype}`,
//     )
//     return data
// }
