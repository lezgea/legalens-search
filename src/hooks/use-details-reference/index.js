import { getDetailsReferences } from "@/api/details";
import { useQuery } from "react-query";


export function useDetailsReference({ mecelle_id }, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['details-reference-data', mecelle_id],
        () => getDetailsReferences({ mecelle_id }),
        {
            refetchOnWindowFocus: false,
            enabled: !!mecelle_id,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}
