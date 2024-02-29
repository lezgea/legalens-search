import { getDetailsIndex } from "@/api/details";
import { useQuery } from "react-query";


export function useDetailsIndex({ mecelle_id, bolme_id, fesil_id, madde_id, }, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['details-data-index', mecelle_id, bolme_id, fesil_id, madde_id,],
        () => getDetailsIndex({ mecelle_id, bolme_id, fesil_id, madde_id, }),
        {
            refetchOnWindowFocus: false,
            enabled: !!bolme_id || !!bolme_id || !!madde_id,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}
