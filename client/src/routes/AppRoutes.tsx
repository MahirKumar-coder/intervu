import { Route, Routes } from "react-router-dom"
import LoginPage from "../features/auth/pages/LoginPage"
import ProtectedRoute from "./ProtectedRoute"
import Dashboard from "../pages/Dashboard"



export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />}/>

            <Route element={<ProtectedRoute />}>
            
            <Route 
            path="/dashboard"
            element={<Dashboard />}
            />
            </Route>
        </Routes>
    )
}