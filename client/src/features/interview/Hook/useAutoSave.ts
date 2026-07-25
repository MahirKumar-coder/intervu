import { saveAnswer } from "../api/interviewSession.api"
import { useDebouncedCallback } from "use-debounce"

export function useAutoSave(
    interviewId: string
) {
    
    const save =
    useDebouncedCallback(

        (
            questionId: string,
            answer: string
        ) => {

            saveAnswer(
                interviewId,
                questionId,
                answer
            )
        },

        1000
    )

    return save
}