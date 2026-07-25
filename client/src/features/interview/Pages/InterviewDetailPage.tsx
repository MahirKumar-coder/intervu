import { useParams } from "react-router-dom";
import { useInterviewPolling } from "../Hook/useInterviewPolling";
import StatusBadge from "../components/StatusBadge";
import GenerateButton from "../components/GenerateButton";

export default function InterviewDetailsPage() {
    const { id } = useParams()
    const { data, isLoading } = useInterviewPolling(id!);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-zinc-400 font-medium">Loading interview details...</span>
                </div>
            </div>
        )
    }

    if (!data || !data.data) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
                <div className="bg-zinc-900/50 border border-red-500/20 p-6 rounded-xl text-center max-w-md">
                    <p className="text-red-400 font-semibold mb-2">Failed to load interview details</p>
                    <p className="text-zinc-500 text-sm">Please verify the URL or try reloading the page.</p>
                </div>
            </div>
        )
    }

    const interview = data.data

    return (
        <div className="relative min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6 overflow-hidden">
            {/* Glowing background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-2xl bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-8 backdrop-blur-md shadow-2xl shadow-blue-900/5 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800/80 pb-6">
                    <div>
                        <span className="text-xs font-bold tracking-wider text-blue-500 uppercase">AI Interview Session</span>
                        <h1 className="text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                            {interview.role}
                        </h1>
                        <p className="mt-2 text-zinc-400 text-sm">
                            Created to evaluate candidate profile specs
                        </p>
                    </div>
                    <div>
                        <StatusBadge status={interview.status} />
                    </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-zinc-800/30 border border-zinc-800/50 rounded-xl p-4 flex flex-col justify-center">
                        <span className="text-xs text-zinc-500 uppercase font-semibold">Experience</span>
                        <span className="text-lg font-bold mt-1 text-zinc-200">{interview.experience} Years</span>
                    </div>
                    <div className="bg-zinc-800/30 border border-zinc-800/50 rounded-xl p-4 flex flex-col justify-center">
                        <span className="text-xs text-zinc-500 uppercase font-semibold">Difficulty</span>
                        <span className="text-lg font-bold mt-1 text-zinc-200">{interview.difficulty}</span>
                    </div>
                    <div className="bg-zinc-800/30 border border-zinc-800/50 rounded-xl p-4 flex flex-col justify-center">
                        <span className="text-xs text-zinc-500 uppercase font-semibold">Questions</span>
                        <span className="text-lg font-bold mt-1 text-zinc-200">{interview.numberOfQuestions} Qs</span>
                    </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">Core Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {interview.skills.map((skill) => (
                            <span key={skill} className="bg-blue-600/10 border border-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg text-sm font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Questions List (if generated) */}
                {interview.questions && interview.questions.length > 0 && (
                    <div className="space-y-4 border-t border-zinc-800/80 pt-6">
                        <h3 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">Generated Questions</h3>
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {interview.questions.map((q, idx) => (
                                <div key={q._id || idx} className="bg-zinc-800/20 border border-zinc-800/40 rounded-xl p-4 hover:border-zinc-700/50 transition-all">
                                    <div className="flex items-start justify-between gap-3">
                                        <span className="text-xs font-semibold text-zinc-500 mt-0.5">Q{idx + 1}</span>
                                        <p className="text-sm font-medium text-zinc-300 flex-1">{q.question}</p>
                                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                                            q.status === 'EVALUATED' ? 'bg-green-500/10 text-green-400' :
                                            q.status === 'ANSWERED' ? 'bg-blue-500/10 text-blue-400' :
                                            'bg-zinc-500/10 text-zinc-400'
                                        }`}>
                                            {q.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA Action */}
                <div className="pt-4 border-t border-zinc-800/80 flex justify-end">
                    {interview.questions && interview.questions.length > 0 ? (
                        <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-green-950/20 transform hover:-translate-y-0.5 transition-all">
                            Start Interview Room
                        </button>
                    ) : (
                        <GenerateButton 
                            interviewId={interview._id}
                            status={interview.status}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}