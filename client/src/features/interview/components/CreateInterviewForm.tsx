import { useForm } from "react-hook-form";
import { useCreateInterview } from "../Hook/useCreateInterview";
import {
    type CreateInterviewForm,
  type CreateInterviewForm as CreateInterviewFormData,
  createInterviewSchema,
} from "../schemas/createInterview.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { data } from "react-router-dom";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";

export default function CreateInterviewForm() {
  const mutation = useCreateInterview();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateInterviewForm>({
    resolver: zodResolver(createInterviewSchema),
    defaultValues: {
      role: "",
      experience: 0,
      difficulty: "MEDIUM",
      numberOfQuestions: 10,
      skills: [],
    },
  });

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
    >
      <Input
        label="Job Role"
        placeholder="Frontend Developer"
        {...register("role")}
        error={errors.role?.message}
      />

      <Input
        label="Experience"
        type="number"
        {...register("experience", {
          valueAsNumber: true,
        })}
      />

      <select
        {...register("difficulty")}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
      >
        <option value="EASY">Easy</option>

        <option value="MEDIUM">Medium</option>
        <option value="HARD">Hard</option>
      </select>

      <Input
        label="Skills"
        placeholder="React,Node,MongoDB"
        onChange={() => {}}
      />

      <Input
        label="Questions"
        type="number"
        {...register(
          "numberOfQuestions",

          {
            valueAsNumber: true,
          },
        )}
      />

      <Button loading={mutation.isPending} className="w-full">
        Create Interview
      </Button>
    </form>
  );
}
