import { Link } from "react-router-dom"
import Button from "../../../components/ui/Button/Button"
import { Plus, LogOut } from "lucide-react"
import { useLogout } from "../../auth/hooks/useLogout"

interface Props {
    name: string
}

export default function DashboardHeader({
    name,
}: Props) {
    const logoutMutation = useLogout()

    return (
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    Welcome back, {name} 👋
                </h1>
                <p className="mt-2 text-zinc-400">
                    Track your AI interview progress.
                </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
                <Link to="/interview/new">
                    <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-2.5 px-5 rounded-xl shadow-lg shadow-blue-950/20 transform hover:-translate-y-0.5 transition-all">
                        <Plus size={18} />
                        New Interview
                    </Button>
                </Link>
                <Button 
                    variant="secondary" 
                    onClick={() => logoutMutation.mutate()}
                    loading={logoutMutation.isPending}
                    className="flex items-center gap-2 py-2.5 px-4 rounded-xl border border-zinc-800 hover:bg-zinc-800/80 transition-all text-zinc-400 hover:text-zinc-200"
                >
                    <LogOut size={16} />
                    Logout
                </Button>
            </div>
        </div>
    )
}