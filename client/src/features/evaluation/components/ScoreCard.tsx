interface Props {
    score: number
}

export default function ScoreCard({
    score,
}: Props) {
    return (
        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm shadow-xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
                <p className="text-sm font-semibold tracking-wider text-blue-500 uppercase">Overall Performance</p>
                <h2 className="text-xl font-bold text-zinc-200">
                    {score >= 80 ? "Excellent Job! You are ready for the interview." :
                     score >= 60 ? "Good Performance! Focus on the suggested improvements." :
                     "Keep practicing. Focus on the detailed feedback below."}
                </h2>
                <p className="text-zinc-400 text-sm max-w-lg">
                    This score is based on technical depth, communication clarity, confidence level, and correct expected output answers.
                </p>
            </div>
            
            <div className="flex items-center gap-4 shrink-0 bg-blue-600/10 border border-blue-500/20 px-8 py-6 rounded-2xl">
                <div className="text-center">
                    <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{score}</span>
                    <span className="text-zinc-400 text-sm font-medium ml-1">/100</span>
                    <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mt-1">Grade Score</p>
                </div>
            </div>
        </div>
    )
}