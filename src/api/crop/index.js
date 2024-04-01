import { aiClient } from "../client";


export const getCropData = async ({ position, keyword }) => {
    const { data } = await aiClient.get(`/crops?position=${position}&keyword=${keyword}`);
    return data;
}
