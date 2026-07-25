import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { submitInterview } from "../api/evaluation.api";

export function useSubmitInrerview(
    interviewId: string
) {

    const navigate = useNavigate()

    return useMutation({

        mutationFn: () => 
            submitInterview(interviewId),

        onSuccess: () => {

            navigate(
                `/evaluation/${interviewId}`
            )
        }
    })
}