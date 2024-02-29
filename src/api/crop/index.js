import { aiClient } from "../client";


export const getCropData = async ({ position }) => {
    const { data } = await aiClient.get(`/crops?position=${position}`);
    return data;
};
