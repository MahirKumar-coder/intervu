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

        const io = req.app.get('io')
        if (io) {
            io.to(`user_${req.user._id}`).emit('dashboard_update')
        }

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

        if (!req.body) {
            throw new ApiError(400, "Request body is empty")
        }

        const userAnswer = req.body.userAnswer !== undefined ? req.body.userAnswer : req.body.answer

        if (userAnswer === undefined) {
            throw new ApiError(400, "userAnswer or answer is missing in request body")
        }

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

        const io = req.app.get('io')
        if (io) {
            io.to(interviewId).emit('interview_status_update', { status: interview.status })
            io.to(`user_${req.user._id}`).emit('dashboard_update')
        }

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

        const io = req.app.get('io')
        if (io) {
            io.to(interviewId).emit('interview_status_update', { status: interview.status })
            io.to(`user_${req.user._id}`).emit('dashboard_update')
        }

        res.status(200).json(
            new ApiResponse(
                200,
                interview,
                "Questions generated successfully"
            )
        )
    }
)

export const streamInterviewEvents = async (
    req,
    res
) => {
    res.setHeader(
        "Content-Type",
        "text/event-stream"
    )

    res.setHeader(
        "Cache-Control",
        "no-cache"
    )

    res.setHeader(
        "Connection",
        "keep-alive"
    )

    const interviewId = req.params.id
    const send = (payload) => {
        res.write(
            `data: ${JSON.stringify(payload)}\n\n`
        )
    }

    eventBus.on(interviewId, send)

    eventBus.emit(interviewId, {
        status: "READY",
    });

    req.on("close", () => {
        eventBus.off(interviewId, send)
    })
}

export const getEvaluation = asyncHandler(
    async (req, res) => {
        const interview = await InterviewService.getInterview(
            req.user._id,
            req.params.id
        )

        if (interview.status !== "COMPLETED") {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    { evaluationStatus: "PROCESSING" },
                    "Evaluation is processing"
                )
            )
        }

        // Parse feedback into strengths and improvements
        const lines = (interview.feedback || "").split('\n').map(l => l.trim()).filter(Boolean);
        const strengths = [];
        const improvements = [];
        let isSuggestion = false;

        for (const line of lines) {
            if (line.toLowerCase().includes('suggestion') || line.toLowerCase().includes('improvement')) {
                isSuggestion = true;
                continue;
            }
            const cleanLine = line.replace(/^[-*+\d.]\s*/, '');
            if (isSuggestion) {
                improvements.push(cleanLine);
            } else {
                strengths.push(cleanLine);
            }
        }

        if (strengths.length === 0) {
            strengths.push("Good overall performance.");
        }
        if (improvements.length === 0) {
            improvements.push("Review the detailed question feedback below to find areas of improvement.");
        }

        res.status(200).json(
            new ApiResponse(
                200,
                {
                    evaluationStatus: "COMPLETED",
                    score: interview.overallScore,
                    strengths,
                    improvements,
                    questions: interview.questions.map(q => ({
                        _id: q._id,
                        question: q.question,
                        userAnswer: q.userAnswer,
                        feedback: q.feedback,
                        score: q.score
                    }))
                },
                "Evaluation fetched successfully"
            )
        )
    }
)