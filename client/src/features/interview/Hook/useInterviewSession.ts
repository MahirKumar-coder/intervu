import { useState } from "react";

export function useInterviewSession(
    total: number
) {
    
    const [currentQuestion,
        setCurrentQuestion
    ] = 
    useState(0)

    const next = () => {

        if (
            currentQuestion < 
            total - 1
        ) {

            setCurrentQuestion(
                (prev) => prev + 1
            )
        }
    }

    const previous = () => {

        if (currentQuestion > 0) {

            setCurrentQuestion(
                (prev) => prev - 1
            )
        }
    }

    return {

        currentQuestion,

        next,

        previous,
    }
}