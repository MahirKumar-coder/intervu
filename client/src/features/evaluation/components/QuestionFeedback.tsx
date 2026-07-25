interface Props {
    questions: any[]
}

export default function QuestionFeedback({
    questions,
}: Props) {
    
    return (

        <div className="space-y-6">

            {questions.map((q, idx) => {
                const scoreColor = q.score >= 8 
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : q.score >= 5
                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20";

                return (
                    <div
                    key={q._id || idx}
                    className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-6 space-y-4"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="font-bold text-zinc-100 text-base flex-1">
                                <span className="text-blue-500 mr-2">Q{idx + 1}.</span>
                                {q.question}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${scoreColor}`}>
                                Score: {q.score}/10
                            </span>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 mt-2">
                            <div className="bg-zinc-950/40 border border-zinc-800/60 p-4 rounded-xl">
                                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Your Answer</span>
                                <p className="text-zinc-300 text-sm mt-1.5 leading-relaxed italic">
                                    "{q.userAnswer || "(No response provided)"}"
                                </p>
                            </div>

                            <div className="bg-blue-950/5 border border-blue-900/10 p-4 rounded-xl">
                                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Feedback</span>
                                <p className="text-zinc-300 text-sm mt-1.5 leading-relaxed">
                                    {q.feedback || "No feedback available."}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}