import { aiClient } from "../client";


export const getCropData = async ({ position, keyword, search_as_phrase }) => {
    const { data } = await aiClient.get(`/crops?position=${position}&keyword=${keyword}&search_as_phrase=${search_as_phrase}`);
    return data;
}
