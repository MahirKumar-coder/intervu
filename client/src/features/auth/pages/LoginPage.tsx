import LoginForm from "../components/LoginForm";
import Card from "../../../components/ui/Card/Card";

export default function LoginPage() {
    return(
        <div className="min-h-screen flex justify-center items-center bg-zinc-950">
            <Card>

                <div className="w-96 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Welcome Back
                        </h1>

                        <p className="text-zinc-400">

                            Login to continue
                        </p>
                    </div>
                    <LoginForm />
                </div>
            </Card>
        </div>
    )
}