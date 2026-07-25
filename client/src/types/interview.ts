export type Difficulty =
| "Easy"
| "Medium"
| "Hard"

export interface CreateInterviewPayload {
    role: string
    experience: number
    difficulty: Difficulty
    skills: string[]
    numberOfQuestions: number
}

export interface Interview {
    _id: string
    role: string
    experience: number
    difficulty: Difficulty
    skills: string[]
    numberOfQuestions: number
    status: 
    | "CREATED"
    | "IN_PROGRESS"
    | "COMPLETED"
}