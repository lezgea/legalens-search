import client from "../client";


export const getCropData = async ({ position }) => {
    return await client(`/crops/?position=${position}`);
};
