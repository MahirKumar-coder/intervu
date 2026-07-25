import { useState } from "react"

export interface AnswerMap {
    [questionId: string]: string
}

export function useInterviewStore() {
    
    const [answers, setAnswers] = 
    useState<AnswerMap>({})

    const updateAnswer = (
        questionId: string,
        answer: string
    ) => {

        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }))
    }

    const getAnswer = (
        questionId: string
    ) => {

        return answers[questionId] ?? ""
    }

    return {

        answers,

        setAnswers,

        updateAnswer,

        getAnswer
    }
}