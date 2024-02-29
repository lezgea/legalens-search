import { aiClient } from "../client";


export const getSearchData = async ({ query_strig }) => {
    const { data } = await aiClient.get(`/search?query_string=${query_strig}`);
    return data;
};