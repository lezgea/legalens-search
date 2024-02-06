import { getDetailsData } from "@/api/details/getDetailsData";
import { useQuery } from "react-query";


export function useDetails(query, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        'details-data',
        () => getDetailsData({ id: query }),
        {
            refetchOnWindowFocus: false,
            enabled: false,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}
