import { useQuery } from "@tanstack/react-query";
import { getInterview } from "../api/interview.api";

export function useInterview(id: string) {
    return useQuery({
        queryKey: ["interview", id],
        queryFn: () => getInterview(id),
        enabled: !!id,
    })
}