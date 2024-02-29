import client from "../client";
import { apiURL } from "../routes";


export const getSearchData = async ({ query_strig }) => {
    return await client(apiURL, `/search?query_string=${query_strig}`);
};