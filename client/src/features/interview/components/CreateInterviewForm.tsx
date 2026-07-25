import { useForm, Controller } from "react-hook-form";
import { useCreateInterview } from "../Hook/useCreateInterview";
import { type CreateInterviewForm as CreateInterviewFormData, createInterviewSchema } from "../schemas/createInterview.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import TagInput from "../../../components/ui/TagInput/TagInput";

export default function CreateInterviewForm() {
    const mutation = useCreateInterview()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<CreateInterviewFormData>({
        resolver: zodResolver(createInterviewSchema),
        defaultValues: {
            experience: 0,
            difficulty: "Medium",
            numberOfQuestions: 10,
            skills: []
        }
    })

    return (
        <form
            className="space-y-5"
            onSubmit={handleSubmit((data) => mutation.mutate(data))}
        >
            <Input 
                label="Job Role"
                placeholder="e.g. Frontend Developer"
                {...register("role")}
                error={errors.role?.message}
            />

            <Input 
                label="Experience (Years)"
                type="number"
                min={0}
                {...register("experience", { valueAsNumber: true })}
                error={errors.experience?.message}
            />

            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                    Difficulty Level
                </label>
                <select
                    {...register("difficulty")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-zinc-100 focus:border-blue-500 focus:outline-none"
                >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                {errors.difficulty && (
                    <p className="text-sm text-red-500">{errors.difficulty.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                    Skills Required
                </label>
                <Controller
                    control={control}
                    name="skills"
                    render={({ field }) => (
                        <TagInput
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Type a skill and press Enter..."
                        />
                    )}
                />
                {errors.skills && (
                    <p className="text-sm text-red-500">
                        {errors.skills.message || "At least one skill is required"}
                    </p>
                )}
            </div>

            <Input 
                label="Number of Questions"
                type="number"
                min={5}
                {...register("numberOfQuestions", { valueAsNumber: true })}
                error={errors.numberOfQuestions?.message}
            />

            <Button
                loading={mutation.isPending}
                className="w-full"
            >
                Create Interview
            </Button>
        </form>
    )
}
