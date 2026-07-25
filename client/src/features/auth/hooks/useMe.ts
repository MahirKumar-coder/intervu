import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/queryKeys";
import { me } from "../api/auth.api";

export function useMe() {
    return useQuery({
        queryKey: QUERY_KEYS.ME,
        queryFn: me,
        retry: false,
    })
}