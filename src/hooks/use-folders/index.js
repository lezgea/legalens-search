import { backClient } from "@/api/client";
import { getFolderInfo, getFolders } from "@/api/folders";
import { useMutation, useQuery } from "react-query";


export const useFoldersMutation = () => {
    return useMutation(data => {
        return backClient.post(`/folders`, data);
    });
};


export const useFoldersUpdate = ({ id }) => {
    return useMutation((data) => {
        return backClient.put(`/folders/${id}`, data);
    });
};


export const useFoldersDelete = () => {
    return useMutation(({ id }) => {
        return backClient.delete(`/folders/${id}`);
    });
};


export const useFolderInfo = ({ id }) => {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['folder-info', id],
        () => getFolderInfo({ id }),
        {
            refetchOnWindowFocus: false,
            enabled: true,
        }
    );

    return { data, refetch, isFetching };
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


