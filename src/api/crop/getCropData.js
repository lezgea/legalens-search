import client from "../client";
import { apiURL } from "../routes";


export const getCropData = async ({ position }) => {
    return await client(apiURL, `/crops?position=${position}`);
};
