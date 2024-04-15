import { getFiltersData } from "@/api/filters";
import { useQuery } from "react-query";


export function useFilters({ query_string }, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['filters-data'],
        () => getFiltersData({ query_string }),
        {
            refetchOnWindowFocus: false,
            // enabled: !!query_string,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}
