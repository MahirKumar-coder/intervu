import { Link, useParams } from "react-router-dom";
import { useEvaluationPolling } from "../hooks/useEvaluationPolling";
import ScoreCard from "../components/ScoreCard";
import StrengthsCard from "../components/StrengthsCard";
import ImporvementsCard from "../components/ImprovementsCard";
import QuestionFeedback from "../components/QuestionFeedback";
import { ArrowLeft } from "lucide-react";

export default function EvaluationPage() {
    const { id } = useParams()
    const { data, isLoading } = useEvaluationPolling(id!)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-zinc-400 font-medium">Loading evaluation...</span>
                </div>
            </div>
        )
    }

    if (!data || !data.data) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
                <div className="bg-zinc-900/50 border border-red-500/20 p-6 rounded-xl text-center max-w-md">
                    <p className="text-red-400 font-semibold mb-2">Failed to load evaluation</p>
                    <p className="text-zinc-500 text-sm">Please verify the URL or try reloading the page.</p>
                </div>
            </div>
        )
    }

    const evaluation = data.data

    if (evaluation.evaluationStatus === "PROCESSING") {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4 text-center max-w-md p-6">
                    <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                    <div>
                        <h2 className="text-lg font-bold text-zinc-200">Evaluating Session Answers</h2>
                        <p className="text-zinc-400 text-sm mt-1">Our AI senior interviewer is analyzing your answers, calculating scores, and drafting constructive feedback. Please hold on...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen bg-zinc-950 text-white p-6 md:p-10 overflow-hidden">
            {/* Glowing background blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-5xl space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                    <div>
                        <Link to="/dashboard" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors text-sm font-medium mb-3">
                            <ArrowLeft size={16} />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                            Interview Evaluation
                        </h1>
                        <p className="text-zinc-400 text-sm mt-1">
                            Review your overall performance and feedback below
                        </p>
                    </div>
                </div>

                {/* Score section */}
                <ScoreCard score={evaluation.score} />

                {/* Strengths & Improvements */}
                <div className="grid gap-6 md:grid-cols-2">
                    <StrengthsCard strengths={evaluation.strengths} />
                    <ImporvementsCard imporvements={evaluation.improvements} />
                </div>

                {/* Question level details */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-zinc-200 border-b border-zinc-800 pb-2">Detailed Question Feedback</h2>
                    <QuestionFeedback questions={evaluation.questions} />
                </div>
            </div>
        </div>
    )
}