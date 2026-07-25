import api from "../../../lib/api";
import type { CreateInterviewPayload } from "../../../types/interview";

export const createInterview = async (
    data: CreateInterviewPayload
) => {
    const res = await api.post("/interviews", data)
    return res.data    
}

export const generateQuestions = async (
    interviewId: string
) => {
    const res = await api.post(
        `/interviews/${interviewId}/generate`
    )    

    return res.data
}

export const getInterview = async (
    interviewId: string
) => {
    const res = await api.get(
        `/interviews/${interviewId}`
    )    

    return res.data
}