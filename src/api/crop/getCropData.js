import client from "../client";


export const getCropData = async ({ file_path }) => {
    return await client(`/crops/?file_path=${file_path}`);
};
