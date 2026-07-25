// import { data } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

export default function LoginForm() {
    
    const {
        
        register,

        handleSubmit,

        formState:{errors}
    } = useForm<LoginFormData>({

        resolver:zodResolver(loginSchema)
    })

    const loginMutation = useLogin()

    const onSubmit = (data:LoginFormData)=>{

        loginMutation.mutate(data)
    }

    return(

        <form

        className="space-y-5"
        
        onSubmit={handleSubmit(onSubmit)}
        >
            <Input

            label="Email"

            placeholder="Enter email"

            {
                ...register("email")
            }

            error={errors.email?.message}
             />

             <Input 
             label="Password"

             type="password"

             {

                ...register("password")
             }

             error={errors.password?.message}
             />

             <Button

             type="submit"

             loading={loginMutation.isPending}

             className="w-full"
             >
                Login
             </Button>
        </form>
    )
}