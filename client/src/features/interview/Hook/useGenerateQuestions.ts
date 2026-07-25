import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateQuestions } from "../api/interview.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYS } from "../../../lib/queryKeys";

export function useGenerateQuestions(id: string) {
    
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({

        mutationFn: () => generateQuestions(id),

        onSuccess: () => {

            toast.success("Questions generated successfully")

            queryClient.invalidateQueries({
                queryKey: ["interview", id],
            })
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.DASHBOARD
            })
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.INTERVIEWS
            })

            navigate("/dashboard")
        },

        onError: () => {

            toast.error("Generation failed")
        }
    })
}