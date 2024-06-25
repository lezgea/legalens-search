import { getSearchData, getSearchDataDocuments, getSearchDataMecelles } from "@/api/search";
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


export function useSearchMecelles({ query, offset, search_as_phrase }, onSuccess) {
    const { data, isFetching, error, refetch } = useQuery(
        ['search-data-mecelles'],
        () => getSearchDataMecelles({ query_strig: query, offset: offset, search_as_phrase: search_as_phrase }),
        {
            refetchOnWindowFocus: false,
            enabled: false,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}


export function useSearchDocuments({ query, offset, search_as_phrase }, onSuccess) {
    const { data, isFetching, error, refetch } = useQuery(
        ['search-data-documents'],
        () => getSearchDataDocuments({ query_strig: query, offset: offset, search_as_phrase: search_as_phrase }),
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
