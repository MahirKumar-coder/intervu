import { useRegister } from "../hooks/useRegister";
import { registerSchema, type RegisterFormData } from "../schemas/register.schema";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    })

    const registerMutation = useRegister()

    const onSubmit = (data: RegisterFormData) => {
        registerMutation.mutate(data)
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Full Name"
                placeholder="Enter full name"
                {...register("fullName")}
                error={errors.fullName?.message}
            />

            <Input
                label="Email"
                placeholder="Enter email"
                {...register("email")}
                error={errors.email?.message}
            />

            <Input 
                label="Password"
                type="password"
                placeholder="Enter password"
                {...register("password")}
                error={errors.password?.message}
            />

            <Button
                type="submit"
                loading={registerMutation.isPending}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg"
            >
                Create Account
            </Button>
        </form>
    )
}
