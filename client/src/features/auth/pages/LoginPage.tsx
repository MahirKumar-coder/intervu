import LoginForm from "../components/LoginForm";
import Card from "../../../components/ui/Card/Card";
import { Link } from "react-router-dom";

export default function LoginPage() {
    return(
        <div className="relative min-h-screen flex justify-center items-center bg-zinc-950 p-6 overflow-hidden">
            {/* Glowing background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative w-full max-w-md z-10">
                <Card>
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                                Welcome Back
                            </h1>

                            <p className="text-zinc-400 text-sm mt-1">
                                Login to continue your interview prep
                            </p>
                        </div>
                        <LoginForm />

                        <p className="text-center text-sm text-zinc-500 mt-4">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-blue-500 hover:text-blue-400 hover:underline font-semibold transition-all">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}