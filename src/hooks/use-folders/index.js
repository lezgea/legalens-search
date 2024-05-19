import { backClient } from "@/api/client";
import { getFolders } from "@/api/folders";
import { useMutation, useQuery } from "react-query";


export const useFoldersMutation = () => {
    return useMutation(data => {
        return backClient.post(`/folders`, data);
    });
};


export const useFoldersData = () => {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['folders'],
        () => getFolders(),
        {
            refetchOnWindowFocus: false,
            enabled: true,
        }
    );

    return { data, refetch, isFetching };
};


