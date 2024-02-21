import { getDetailsReferenceIndex } from "@/api/details/getDetailsData";
import { useQuery } from "react-query";


export function useDetailsReference({ mecelle_id, ref_name }, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['details-data-reference', mecelle_id, ref_name],
        () => getDetailsReferenceIndex({ mecelle_id, ref_name }),
        {
            refetchOnWindowFocus: false,
            enabled: !!ref_name,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}
