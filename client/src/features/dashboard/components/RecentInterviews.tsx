import { Link } from "react-router-dom"
import Card from "../../../components/ui/Card/Card"
import StatusBadge from "../../interview/components/StatusBadge"

interface Props {
    interviews: any[]
}

export default function RecentInterviews({
    interviews,
}: Props) {
    return (
        <Card>

            <h2 className="mb-5 text-xl font-semibold">
                Recent Interviews
            </h2>

            <div className="space-y-4">
                {interviews.length === 0 ? (
                    <p className="text-zinc-500 text-sm">No interviews created yet. Click "New Interview" above to start!</p>
                ) : (
                    interviews.map((interview) => {
                        const targetPath = interview.status === "COMPLETED"
                            ? `/evaluation/${interview._id}`
                            : `/interview/${interview._id}`

                        return (
                            <Link
                            key={interview._id}
                            to={targetPath}
                            className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:bg-zinc-800/30 p-4 transition-all duration-200 group hover:border-zinc-700/80 block"
                            >
                                <div>

                                    <h3 className="font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors">
                                        {interview.role}
                                    </h3>

                                    <p className="text-sm text-zinc-500 mt-1">
                                        {interview.difficulty} • {interview.experience} Years Exp
                                    </p>
                                </div>

                                <StatusBadge status={interview.status} />
                            </Link>
                        )
                    })
                )}
            </div>
        </Card>
    )
}