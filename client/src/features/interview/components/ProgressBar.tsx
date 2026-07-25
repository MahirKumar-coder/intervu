interface Props {
    current: number
    total: number
}

export default function ProgressBar({
    current,
    total,
}: Props) {
    const progress = ((current + 1) / total) * 100

    return (
        <div className="w-full">

            <div className="mb-2 flex justify-between">

                <span>
                    Question {current + 1} / {total}
                </span>

                <span>
                    {Math.round(progress)}%
                </span>
            </div>

            <div className="h-2 rounded bg-zinc-800">

                <div
                className="h-full rounded bg-blue-600 transition-all"
                style={{
                    width: `${progress}%`,
                }}
                >

                </div>
            </div>
        </div>
    )
}