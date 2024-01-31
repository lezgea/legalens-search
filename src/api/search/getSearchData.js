import client from "../client";


export const getSearchData = async ({ query_strig }) => {
    return await client(`/search/?query_string=${query_strig}`, true);
};