import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createInterview } from "../api/interview.api";
import { toast } from "sonner";

export function useCreateInterview() {
    
    const navigate = useNavigate()

    return useMutation({

        mutationFn: createInterview,

        onSuccess: (data) => {

            toast.success(
                "Interview created"
            )

            navigate(
                `/interview/${data.data._id}`
            )
        },

        onError: () => {

            toast.error(
                "Failed to create interview"
            )
        }
    })
}