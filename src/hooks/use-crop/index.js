import { getCropData } from "@/api/crop";
import { useQuery } from "react-query";


export function useCrop({ position, keyword }, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['crop-data', position, keyword],
        () => getCropData({ position, keyword }),
        {
            refetchOnWindowFocus: false,
            enabled: !!position || !!keyword,
            onSuccess: onSuccess,
        }
    );


    return { data, refetch, isFetching };
}
