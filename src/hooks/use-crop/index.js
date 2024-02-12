import { getCropData } from "@/api/crop/getCropData";
import { useQuery } from "react-query";


export function useCrop(query, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['crop-data', query],
        () => getCropData({ position: query }),
        {
            refetchOnWindowFocus: false,
            enabled: !!query,
            onSuccess: onSuccess,
        }
    );


    return { data, refetch, isFetching };
}
