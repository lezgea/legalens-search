import { getCropData } from "@/api/crop/getCropData";
import { useQuery } from "react-query";


export function useCrop(query, onSuccess) {
    const { data = [], isFetching, error, refetch } = useQuery(
        'crop-data',
        () => getCropData({ file_path: query }),
        {
            refetchOnWindowFocus: false,
            enabled: false,
            onSuccess: onSuccess,
        }
    );

    return { data, refetch, isFetching };
}
