import express from 'express'

import verifyJWT from '../../middlewares/auth.middleware.js'
import validate from '../../middlewares/validate.middleware.js'

import { createInterviewSchema } from './interview.validation.js'

import * as InterviewController from './interview.controller.js'

const router = express.Router()

router.post(
    "/",
    verifyJWT,
    validate(createInterviewSchema),
    InterviewController.createInterview
)

router.get(
    "/:id",
    verifyJWT,
    InterviewController.getInterview
)

router.patch(
    "/:id/questions/:questionId",
    verifyJWT,
    InterviewController.updateQuestionAnswer
)

router.patch(

    "/:id/questions/:questionId",

    InterviewController.saveAnswer
)

router.post(
    "/:id/submit",
    verifyJWT,
    InterviewController.submitInterview
)

router.get(
    "/:id/evaluation",
    verifyJWT,
    InterviewController.getEvaluation
)

router.get(
    "/",
    verifyJWT,
    InterviewController.getUserInterviews
)

router.delete(
    "/:id",
    verifyJWT,
    InterviewController.deleteInterview
)

router.post(
    "/:id/generate",
    verifyJWT,
    InterviewController.generateQuestions
)

router.get(
    "/:id/events",
    verifyJWT,
    InterviewController.streamInterviewEvents
)

export default router