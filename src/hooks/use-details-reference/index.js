import { getDetailsReferenceIndex } from "@/api/details";
import { useQuery } from "react-query";


export function useDetailsReference({ mecelle_id, ref_name, qtype }, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['details-data-reference', mecelle_id, ref_name, qtype],
        () => getDetailsReferenceIndex({ mecelle_id, ref_name, qtype }),
        {
            refetchOnWindowFocus: false,
            enabled: !!ref_name || !!qtype,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}
