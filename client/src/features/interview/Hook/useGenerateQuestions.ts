import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateQuestions } from "../api/interview.api";
import { toast } from "sonner";

export function useGenerateQuestions(id: string) {
    
    const queryClient = useQueryClient()

    return useMutation({

        mutationFn: () => generateQuestions(id),

        onSuccess: () => {

            toast.success("Question generation started")

            queryClient.invalidateQueries({
                queryKey: ["interview", id],
            })
        },

        onError: () => {

            toast.error("Generation failed")
        }
    })
}