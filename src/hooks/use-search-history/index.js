import { backClient } from "@/api/client";
import { getSearchHistory } from "@/api/history";
import { useMutation, useQuery } from "react-query";


export const useSearchHistoryMutation = () => {
    return useMutation(data => {
        return backClient.post(`/search-histories`, data);
    });
};


export const useSearchHistoryDelete = () => {
    return useMutation(data => {
        return backClient.delete(`/search-histories`, data);
    });
};


export const useSearchHistoryData = () => {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['search-history-data'],
        () => getSearchHistory(),
        {
            refetchOnWindowFocus: false,
            enabled: true,
        }
    );

    return { data, refetch, isFetching };
};


