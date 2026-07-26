import Interview from './interview.model.js'
import mongoose from 'mongoose'
import ApiError from '../../utils/ApiError.js'

import {
    buildInterviewPrompt,
    buildEvaluationPrompt
} from "../../services/ai/prompt.service.js"

import {
    generateQuestions
} from "../../services/ai/ai.service.js"

export const createInterview = async (
    userId,
    payload
) => {
    
    const interview = 
    await Interview.create({
        user: userId,
        ...payload
    })

    const prompt =
    buildInterviewPrompt(payload)

    const response = 
    await generateQuestions(prompt)

    let parsedQuestions
    try {
        parsedQuestions = JSON.parse(response)
    } catch (error) {
        await Interview.findByIdAndDelete(interview._id)
        throw new ApiError(
            400,
            "AI generation failed due to safety filters or malformed response. Please try professional, non-suggestive keywords."
        )
    }

    let questionsArray = []
    if (Array.isArray(parsedQuestions)) {
        questionsArray = parsedQuestions
    } else if (parsedQuestions && Array.isArray(parsedQuestions.questions)) {
        questionsArray = parsedQuestions.questions
    } else {
        await Interview.findByIdAndDelete(interview._id)
        throw new ApiError(
            400,
            "AI response format is invalid. Expected an array of questions."
        )
    }

    interview.questions =
    questionsArray.map(q => ({
        question: q.question ?? q.questions,
        expectedAnswer: q.expectedAnswer,
        userAnswer: "",
        feedback: "",
        score: 0,
        status: "PENDING"
    }))

    await interview.save()

    return interview
}

export const getInterview = async (userId, interviewId) => {
    if (!mongoose.isValidObjectId(interviewId)) {
        throw new ApiError(400, "Invalid interview id")
    }

    const interview = await Interview.findOne({
        _id: interviewId,
        user: userId
    })

    if (!interview) {
        throw new ApiError(404, "Interview not found")
    }

    return interview
}

export const updateQuestionAnswer = async (
    userId,
    interviewId,
    questionId,
    userAnswer
) => {
    if (!mongoose.isValidObjectId(interviewId) || !mongoose.isValidObjectId(questionId)) {
        throw new ApiError(400, "Invalid interview or question id")
    }

    const interview = await Interview.findOne({
        _id: interviewId,
        user: userId
    })

    if (!interview) {
        throw new ApiError(404, "Interview not found")
    }

    const question = interview.questions.id(questionId)
    if (!question) {
        throw new ApiError(404, "Question not found")
    }

    question.userAnswer = userAnswer
    question.status = "ANSWERED"

    await interview.save()

    return interview
}

export const saveAnswer = async (
    
    interviewId,

    questionId,

    answer
) => {
    
    const interview = 
    await Interview.findById(interviewId)

    if(!interview){

        throw new ApiError(404, "Interview not found");
        
    }

    const question = 
    interview.questions.find(

        q=>q.id===questionId
    )

    if (!question){

        throw new ApiError(404, "Question not found");
        
    }

    question.userAnswer = answer

    question.status = "ANSWERED"

    await interview.save()

    return interview
}

export const submitInterview = async (userId, interviewId) => {
    if (!mongoose.isValidObjectId(interviewId)) {
        throw new ApiError(400, "Invalid interview id")
    }

    const interview = await Interview.findOne({
        _id: interviewId,
        user: userId
    })

    if (!interview) {
        throw new ApiError(404, "Interview not found")
    }

    const prompt = buildEvaluationPrompt(interview.questions)
    
    const aiResponse = await generateQuestions(prompt)
    
    let evaluation
    try {
        evaluation = JSON.parse(aiResponse)
    } catch (error) {
        console.error("Failed to parse AI evaluation response:", aiResponse, error)
        throw new ApiError(500, "AI evaluation failed to generate valid JSON")
    }

    if (evaluation.questions && Array.isArray(evaluation.questions)) {
        evaluation.questions.forEach((eq) => {
            const question = interview.questions.id(eq.id)
            if (question) {
                question.score = eq.score ?? 0
                question.feedback = eq.feedback ?? ""
                question.status = "EVALUATED"
            }
        })
    }

    interview.overallScore = evaluation.overallScore ?? 0
    interview.feedback = evaluation.feedback ?? ""
    interview.status = "COMPLETED"

    await interview.save()

    return interview
}

export const getUserInterviews = async (userId) => {
    
    return await Interview
    .find({ user: userId})
    .sort({ createdAt: -1 })
}

export const getInterviewById = async (
    interviewId,
    userID
) => {
    
    const interview = 
    await Interview.findOne({
        _id: interviewId,
        user: userId
    })

    if (!interview) {
        throw new ApiError(
            404, 
            "Interview not found");
        
    }

    return interview
}

export const deleteInterview = async (
    interviewId,
    userId
) => {
    
    const interview = 
    await Interview.findOneAndDelete({
        _id: interviewId,
        user: userId
    })

    if (!interview) {
        throw new ApiError(
            404,
            "Interview not found");
        
    }
    
    return interview
}

export const generateInterviewQuestions = async (
    interviewId,
    userId
) => {
    
    const interview = await Interview.findOne({
        _id: interviewId,
        user: userId
    })

    if (!interview) {
        throw new ApiError(404, "Interview not found");
    }

    const prompt = buildInterviewPrompt({
        role: interview.role,
        experience: interview.experience,
        difficulty: interview.difficulty,
        skills: interview.skills,
        numberOfQuestions: interview.numberOfQuestions
    })

    const response = await generateQuestions(prompt)
    let parsedQuestions
    try {
        parsedQuestions = JSON.parse(response)
    } catch (error) {
        throw new ApiError(
            400,
            "AI regeneration failed due to safety filters or malformed response. Please try professional, non-suggestive keywords."
        )
    }

    let questionsArray = []
    if (Array.isArray(parsedQuestions)) {
        questionsArray = parsedQuestions
    } else if (parsedQuestions && Array.isArray(parsedQuestions.questions)) {
        questionsArray = parsedQuestions.questions
    } else {
        throw new ApiError(
            400,
            "AI response format is invalid. Expected an array of questions."
        )
    }

    interview.questions = questionsArray.map(q => ({
        question: q.question ?? q.questions,
        expectedAnswer: q.expectedAnswer,
        userAnswer: "",
        feedback: "",
        score: 0,
        status: "PENDING"
    }))

    await interview.save()

    return interview
}