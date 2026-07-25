import api from "../../../lib/api"

export const saveAnswer = async (
    interviewId: string,
    questionId: string,
    answer: string
) => {
    const res = await api.patch(
        `/interviews/${interviewId}/questions/${questionId}`,
        { answer }
    )    

    return res.data
}

export const submitInterview = async (
    interviewId: string
) => {
    const res = await api.post(
        `/interviews/${interviewId}/submit`
    )    
    
    return res.data
}