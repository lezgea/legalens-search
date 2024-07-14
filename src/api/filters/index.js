import { useMutation } from "react-query";
import { aiClient } from "../client";



export const useSearchFilters = (query_string) => {
    return useMutation(data => {
        return aiClient.post(`/v1/filter?query_string=${query_string}&offset=0`, data);
    })
}

// export const useAddFile = () => {
//     return useMutation(data => {
//         return axiosInstance.post(v1 + documents, data);
//     });
// };

export const getFiltersData = async ({ query_string }) => {
    const { data } = await aiClient.get(`/v1/statistics?query_string=${query_string}`)
    return data
}