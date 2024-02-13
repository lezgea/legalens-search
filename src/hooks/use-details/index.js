import { getDetailsData } from "@/api/details/getDetailsData";
import { useQuery } from "react-query";


export function useDetails({ mecelle_id, start }, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['details-data', mecelle_id, start],
        () => getDetailsData({ mecelle_id: mecelle_id, start: start, end: start + 1 }),
        {
            refetchOnWindowFocus: false,
            enabled: false,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}
