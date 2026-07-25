import { useQuery } from "@tanstack/react-query";
import { getInterview } from "../api/interview.api";

export function useInterviewPolling(id: string) {
    return useQuery({
        queryKey: ["interview", id],
        queryFn: () => getInterview(id),
        enabled: !!id,
        refetchInterval: (query) => {
            const status = query.state.data?.data?.status

            return status === "GENERATING"
            ? 3000
            : false
        }
    })
}