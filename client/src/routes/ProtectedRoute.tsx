import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../features/auth/hooks/useMe";

export default function ProtectedRoute() {
    const { data, isLoading } = useMe();

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!data?.success) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}