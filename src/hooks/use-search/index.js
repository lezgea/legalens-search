import { getSearchData } from "@/api/search";
import { useQuery } from "react-query";


export function useSearch({ query, offset, search_as_phrase }, onSuccess) {
    const { data, isFetching, error, refetch } = useQuery(
        ['search-data'],
        () => getSearchData({ query_strig: query, offset: offset, search_as_phrase: search_as_phrase }),
        {
            refetchOnWindowFocus: false,
            enabled: false,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}


export function useUpadateSearch(query, onSuccess) {
    const { data, isFetching, error, refetch } = useQuery(
        ['update-search-data', query],
        () => getSearchData({ query_strig: query }),
        {
            refetchOnWindowFocus: false,
            enabled: !!query,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}
