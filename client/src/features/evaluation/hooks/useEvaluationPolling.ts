import { useQuery } from "@tanstack/react-query";
import { getEvaluation } from "../api/evaluation.api";

export function useEvaluationPolling(
    interviewId: string
) {
    
    return useQuery({

        queryKey: [
            "evaluation",
            interviewId,
        ],

        queryFn: () => 
            getEvaluation(interviewId),

        refetchInterval: (query) => {

            const status =
            query.state.data?.data
            ?.evaluationStatus

            return status === "PROCESSING"
            ? 3000
            : false
        }
    })
}