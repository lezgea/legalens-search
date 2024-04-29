import { getCropData } from "@/api/crop";
import { useQuery } from "react-query";


export function useCrop({ position, keyword, search_as_phrase }, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        ['crop-data', position, keyword],
        () => getCropData({ position, keyword, search_as_phrase: search_as_phrase }),
        {
            refetchOnWindowFocus: false,
            enabled: !!position,
            onSuccess: onSuccess,
        }
    );


    return { data, refetch, isFetching };
}
