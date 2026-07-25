import asyncHandler from '../../utils/asyncHandler.js'
import ApiResponse from '../../utils/ApiResponse.js'
import ApiError from '../../utils/ApiError.js'
import * as InterviewService from './interview.service.js'

export const createInterview = asyncHandler(
    async (req, res) => {
        
        const interview = 
        await InterviewService.createInterview(
            req.user._id,
            req.body
        )

        res.status(201).json(
            new ApiResponse(
                201,
                interview,
                "Interview created successfully"
            )
        )
    }
)

export const getInterview = asyncHandler(
    async (req, res) => {
        const interview =
        await InterviewService.getInterview(
            req.user._id,
            req.params.id
        )

        res.status(200).json(
            new ApiResponse(
                200,
                interview,
                "Interview fetched successfully"
            )
        )
    }
)

export const updateQuestionAnswer = asyncHandler(
    async (req, res) => {
        const { id: interviewId, questionId } = req.params
        
        if (!req.body || req.body.userAnswer === undefined) {
            throw new ApiError(400, "Request body is empty or userAnswer is missing")
        }

        const { userAnswer } = req.body

        const interview = await InterviewService.updateQuestionAnswer(
            req.user._id,
            interviewId,
            questionId,
            userAnswer
        )

        res.status(200).json(
            new ApiResponse(
                200,
                interview,
                "Answer updated successfully"
            )
        )
    }
)

export const saveAnswer =
asyncHandler(async (req, res) => {
    
    const interview = 
    await InterviewService.saveAnswer(

        req.params.id,

        req.params.questionId,

        req.body.answer
    )

    res.status(200).json(

        new ApiResponse(

            200,

            interview,

            "Answer saved"
        )
    )
})

export const submitInterview = asyncHandler(
    async (req, res) => {
        const { id: interviewId } = req.params

        const interview = await InterviewService.submitInterview(
            req.user._id,
            interviewId
        )

        res.status(200).json(
            new ApiResponse(
                200,
                interview,
                "Interview submitted and evaluated successfully"
            )
        )
    }
)

export const getUserInterviews = asyncHandler(async (req, res) => {

    const interviews = 
    await InterviewService.getUserInterviews(
        req.user._id
    )

    res.status(200).json(
        new ApiResponse(
            200,
            interviews,
            "Interviews fetched successfully"
        )
    )
    
})

export const getInterviewById = 
asyncHandler(async (req, res) => {
    
    const interview = 
    await InterviewService.getInterviewById(
        req.params.id,
        req.user._id
    )

    req.status(200).json(
        new ApiResponse(
            200,
            interview,
            "Interview fetched successfully"
        )
    )

})

export const deleteInterview =
asyncHandler(async (req, res) => {

    await InterviewService.deleteInterview(
        req.params.id,
        req.user._id
    )

    res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Interview deleted successfully"
        )
    )
    
})

export const generateQuestions = asyncHandler(
    async (req, res) => {
        const { id: interviewId } = req.params

        const interview = await InterviewService.generateInterviewQuestions(
            interviewId,
            req.user._id
        )

        res.status(200).json(
            new ApiResponse(
                200,
                interview,
                "Questions generated successfully"
            )
        )
    }
)