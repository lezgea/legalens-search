import { aiClient } from "../client";


export const getSearchData = async ({ query_strig, offset, search_as_phrase = false }) => {
    try {
        const { data } = await aiClient.get(`/v2/cases?query_string=${query_strig}&offset=${offset}&search_as_phrase=${search_as_phrase}`);
        return data;
    } catch (err) {
        console.log('ERR', err)
    }
};