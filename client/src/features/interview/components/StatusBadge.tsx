interface Props {
    status: string
}

const colors = {
    CREATED: "bg-zinc-800 text-zinc-400 border border-zinc-700/50",
    IN_PROGRESS: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
    GENERATING: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 animate-pulse",
    READY: "bg-green-500/10 text-green-500 border border-green-500/20",
    FAILED: "bg-red-500/10 text-red-500 border border-red-500/20",
    COMPLETED: "bg-blue-500/10 text-blue-500 border border-blue-500/20"
}

export default function StatusBadge({
    status,
}: Props) {
    return (
        <span
        className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase ${colors[status as keyof typeof colors]}`}
        >
        {status}
        </span>
    )
}