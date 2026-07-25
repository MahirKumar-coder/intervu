interface Props {
    name: string
}

export default function DashboardHeader({
    name,
}: Props) {
    return (
        <div className="mb-8">

            <h1 className="text-4xl font-bold">
                Welcome back, {name} 👋
            </h1>

            <p className="mt-2 text-zinc-400">
                Track your AI interview progress.
            </p>
        </div>
    )
}