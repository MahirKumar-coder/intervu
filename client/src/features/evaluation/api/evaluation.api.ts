import api from "../../../lib/api"

export const submitInterview = async (
    interviewId: string
) => {
    const res = await api.post(
        `/interviews/${interviewId}/submit`
    )    

    return res.data
}

export const getEvaluation = async (
    interviewId: string
) => {
    const res = await api.get(
        `/interviews/${interviewId}/evaluation`
    )    

    return res.data
}