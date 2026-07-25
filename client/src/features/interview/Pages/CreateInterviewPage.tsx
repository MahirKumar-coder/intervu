import { Link } from "react-router-dom";
import Card from "../../../components/ui/Card/Card";
import CreateInterviewForm from "../components/CreateInterviewForm";
import { X } from "lucide-react";

export default function CreateInterviewPage() {
    return (
        <div className="relative min-h-screen flex justify-center items-center bg-zinc-950 p-6 overflow-hidden">
            {/* Glowing background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative w-full max-w-lg z-10">
                <Card>
                    <div className="relative space-y-6">
                        {/* Close Button */}
                        <Link 
                            to="/dashboard" 
                            className="absolute -top-2 -right-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 p-1.5 rounded-lg transition-all"
                            aria-label="Close"
                        >
                            <X size={20} />
                        </Link>

                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                                Create Interview
                            </h1>
                            <p className="text-zinc-400 text-sm mt-1">
                                Set up your AI interview parameters
                            </p>
                        </div>

                        <CreateInterviewForm />
                    </div>
                </Card>
            </div>
        </div>
    )
}