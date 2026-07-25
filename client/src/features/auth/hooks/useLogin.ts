import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYS } from "../../../lib/queryKeys";

export function useLogin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    
    return useMutation({

        mutationFn: login,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ME,
            })
            toast.success("Login Successful")

            navigate("/dashboard")
        },

        onError: (error: any) => {

            toast.error(
                error?.response?.data?.message ||
                "Invalid credentials"
            )
        }
    })
}