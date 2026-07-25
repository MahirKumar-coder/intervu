import { useDashboard } from "../hooks/useDashboard";
import DashboardHeader from "../components/DashboardHeader"
import StatsGrid from "../components/StatsGrid";
import RecentInterviews from "../components/RecentInterviews"

export default function DashboardPage() {
    
    const { data, isLoading } = 
    useDashboard()

    if (isLoading) {
        return (
            <div className="p-10">
                Loading...
            </div>
        )
    }

    if (!data || !data.data) {
        return (
            <div className="p-10 text-red-500">
                Failed to load dashboard data.
            </div>
        )
    }

    const dashboard = data.data

    return (

        <div className="min-h-screen bg-zinc-950 p-10 text-white">

            <DashboardHeader 
            name={dashboard.profile.fullName}
            />

            <StatsGrid 
            stats={dashboard.stats}
            />

            <div className="mt-8">

                <RecentInterviews 
                interviews={
                    dashboard.recentInterviews
                }
                />
            </div>
        </div>
    )
}