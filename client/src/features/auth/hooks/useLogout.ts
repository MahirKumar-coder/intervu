import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { logout } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: logout,

        onSuccess: () => {
            queryClient.removeQueries()

            toast.success("Logged out")
            navigate("/")
        }
    })
}