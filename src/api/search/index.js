import { aiClient } from "../client";


export const getSearchData = async ({ query_strig, offset }) => {
    const { data } = await aiClient.get(`/v2/cases?query_string=${query_strig}&offset=${offset}`);
    return data;
};