import { Route, Routes } from "react-router-dom"
import LoginPage from "../features/auth/pages/LoginPage"
import ProtectedRoute from "./ProtectedRoute"
import DashboardPage from "../features/dashboard/pages/DashboardPage"



export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />}/>

            <Route element={<ProtectedRoute />}>
            
            <Route 
            path="/dashboard"
            element={<DashboardPage />}
            />
            </Route>

        </Routes>
    )
}