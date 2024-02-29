import client from "../client";
import { backURL } from "../routes";


export const getHistoryData = async ({ position }) => {
    return await client(backURL, `/v1/search-histories`);
};
