import { useMutation } from "react-query";
import { aiClient } from "../client";



export const useSearchFilters = async () => {
    return useMutation(data => {
        return aiClient.post(`/filter`, data);
    })
}


export const getFiltersData = async ({ query_string }) => {
    const { data } = await aiClient.get(`/statistics?query_string=${query_string}`)
    return data
}