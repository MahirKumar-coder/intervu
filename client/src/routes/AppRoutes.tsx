import { Route, Routes } from "react-router-dom"
import LoginPage from "../features/auth/pages/LoginPage"
import RegisterPage from "../features/auth/pages/RegisterPage"
import ProtectedRoute from "./ProtectedRoute"
import DashboardPage from "../features/dashboard/pages/DashboardPage"
import CreateInterviewPage from "../features/interview/Pages/CreateInterviewPage"
import InterviewDetailsPage from "../features/interview/Pages/InterviewDetailPage"
import InterviewSessionPage from "../features/interview/Pages/InterviewSessionPage"
import EvaluationPage from "../features/evaluation/pages/EvaluationPage"



export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>

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

            <Route 
            path="/interview/:id/start"
            element={<InterviewSessionPage />}
            />

            <Route 
            path="/evaluation/:id"
            element={<EvaluationPage />}
            />

        </Routes>
    )
}