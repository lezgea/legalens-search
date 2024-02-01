import { getSearchData } from "@/api/search/getSearchData";
import { useQuery } from "react-query";


export function useSearch(query, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        'search-data',
        () => getSearchData({ query_strig: query }),
        {
            refetchOnWindowFocus: false,
            enabled: false,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}
