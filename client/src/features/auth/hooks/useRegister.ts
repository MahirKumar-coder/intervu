import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useRegister() {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: register,

        onSuccess: () => {
            toast.success("Account created successfully! Please log in.")
            navigate("/")
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                "Failed to create account"
            )
        }
    })
}
