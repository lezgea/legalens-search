import { useMutation } from "react-query";
import { aiClient } from "../client";



export const useSearchFilters = async () => {
    return useMutation(data => {
        return aiClient.post(`/filter`, data);
    })
}