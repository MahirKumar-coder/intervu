import { Route, Routes } from "react-router-dom"
import LoginPage from "../features/auth/pages/LoginPage"
import ProtectedRoute from "./ProtectedRoute"
import DashboardPage from "../features/dashboard/pages/DashboardPage"
import CreateInterviewPage from "../features/interview/Pages/CreateInterviewPage"
import InterviewDetailsPage from "../features/interview/Pages/InterviewDetailPage"



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

            <Route 

            path="/interview/new"

            element={<CreateInterviewPage />}
            />

            <Route 
            path="/interview/:id"
            element={<InterviewDetailsPage />}
            />

        </Routes>
    )
}