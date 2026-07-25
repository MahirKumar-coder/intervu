import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/queryKeys";
import { getDashboard } from "../api/dashboard.api";

export function useDashboard() {
    return useQuery({
        queryKey: QUERY_KEYS.DASHBOARD,
        queryFn: getDashboard,
    })
}