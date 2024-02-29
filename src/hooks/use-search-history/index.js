import { backClient } from "@/api/client";
import { useMutation, useQuery } from "react-query";


export const useSearchHistoryMutation = () => {
    return useMutation(data => {
        return backClient.post(`/search-histories`, data);
    });
};