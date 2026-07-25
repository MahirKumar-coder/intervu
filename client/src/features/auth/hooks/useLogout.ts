import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { logout } from "../api/auth.api";

export function useLogout() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: logout,

        onSuccess: () => {
            queryClient.removeQueries()

            toast.success("Logged out")
        }
    })
}