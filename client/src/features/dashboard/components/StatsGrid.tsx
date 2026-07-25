import DashboardCard from "./DashboardCard";
import {
    Briefcase,
    CheckCircle,
    Clock,
    Trophy
} from "lucide-react"

interface Props {
    stats: {
        totalInterviews: number
        completed: number
        inProgress: number
        averageScore: number
    }
}

export default function StatsGrid({ stats }: Props) {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <DashboardCard 
            title="Total Interviews"
            value={stats.totalInterviews}
            icon={<Briefcase />}
            />

            <DashboardCard 
            title="Completed"
            value={stats.completed}
            icon={<CheckCircle />}
            />

            <DashboardCard 
            title="Pending"
            value={stats.inProgress}
            icon={<Clock />}
            />

            <DashboardCard 
            title="Average Score"
            value={`${stats.averageScore}%`}
            icon={<Trophy />}
            />

        </div>
    )
}