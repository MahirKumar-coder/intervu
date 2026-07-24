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
    .array(z.string())
    .min(1),

    numberOfQuestions: z
    .number()
    .min(5)
    .max(20)
})