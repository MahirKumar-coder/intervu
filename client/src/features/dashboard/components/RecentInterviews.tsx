import Card from "../../../components/ui/Card/Card"

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

                {interviews.map((interviews) => (
                    <div
                    key={interviews._id}
                    className="flex items-center justify-between rounded-lg border border-zinc-800 p-4"
                    >
                        <div>

                            <h3 className="font-semibold">
                                {interviews.role}
                            </h3>

                            <p className="text-sm text-zinc-400">
                                {interviews.difficulty}
                            </p>
                        </div>

                        <span className="rounded bg-blue-600 px-3 py-1 text-sm">
                            {interviews.status}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    )
}