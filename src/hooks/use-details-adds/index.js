import { getDetailsAdds, getDetailsKmq } from "@/api/details";
import { useQuery } from "react-query";


export function useDetailsAdds({ mecelle_id }, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['details-adds-data', mecelle_id],
        () => getDetailsAdds({ mecelle_id }),
        {
            refetchOnWindowFocus: false,
            enabled: !!mecelle_id,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}
