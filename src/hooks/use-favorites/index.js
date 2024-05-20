import { backClient } from "@/api/client";
import { getFavoritesList } from "@/api/favorites";
import { useMutation, useQuery } from "react-query";


export const useFavoritesMutation = () => {
    return useMutation(data => {
        return backClient.post(`/favorites`, data);
    });
};


export const useFavoritesData = () => {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['favorites'],
        () => getFavoritesList(),
        {
            refetchOnWindowFocus: false,
            enabled: true,
        }
    );

    return { data, refetch, isFetching };
};


