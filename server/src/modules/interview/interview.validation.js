import z from "zod";

export  const createInterviewSchema = z.object({

    role: z
    .string()
    .min(2),

    experience: z
    .number()
    .min(0)
    .max(20),


    difficulty: z
    .enum([
        "Easy",
        "Medium",
        "Hard"
    ]),

    skills: z
  .array(
    z.string().min(2)
  )
  .min(1, "Add at least one skill")
  .max(10, "Maximum 10 skills"),

    numberOfQuestions: z
    .number()
    .min(5)
    .max(20)
})