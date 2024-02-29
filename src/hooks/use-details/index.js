import { getDetailsData } from "@/api/details";
import { useQuery } from "react-query";


export function useDetails({ mecelle_id, bolme_id, fesil_id, madde_id, query, }, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['details-data', mecelle_id, bolme_id, fesil_id, madde_id],
        () => getDetailsData({ mecelle_id, bolme_id, fesil_id, madde_id, query }),
        {
            refetchOnWindowFocus: false,
            enabled: false,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}
