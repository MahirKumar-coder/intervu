import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { submitInterview } from "../api/interviewSession.api";
import { toast } from "sonner";
import { QUERY_KEYS } from "../../../lib/queryKeys";

export function useSubmitInterview(id: string) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => submitInterview(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.DASHBOARD
            })
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.INTERVIEWS
            })
            toast.success("Interview submitted successfully!")
            navigate(`/evaluation/${id}`)
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Failed to submit interview"
            )
        }
    })
}
