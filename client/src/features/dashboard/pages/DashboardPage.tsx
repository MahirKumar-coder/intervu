import { useDashboard } from "../hooks/useDashboard";
import DashboardHeader from "../components/DashboardHeader"
import StatsGrid from "../components/StatsGrid";
import RecentInterviews from "../components/RecentInterviews"
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from "../../auth/hooks/useMe";
import { socket } from "../../../lib/socket";
import { QUERY_KEYS } from "../../../lib/queryKeys";

export default function DashboardPage() {
    const { data, isLoading } = useDashboard()
    const { data: meData } = useMe()
    const queryClient = useQueryClient()

    useEffect(() => {
        const userId = meData?.data?._id
        if (userId) {
            socket.emit("join_dashboard", userId)
        }

        socket.on("dashboard_update", () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INTERVIEWS })
        })

        return () => {
            socket.off("dashboard_update")
        }
    }, [meData, queryClient])

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