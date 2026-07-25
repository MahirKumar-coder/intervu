import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        question: String,

        expectedAnswer: String,
            

        userAnswer: {
            type: String,
            default: "",
        },

        feedback: {
            type: String,
            default: "",
        },

        score: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "ANSWERED",
                "EVALUATED"
            ],
            default: "PENDING"
        }
    },
    {
        _id: true
    }
)

const interviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        role: {
            type: String,
            required: true,
        },

        experience: {
            type: Number,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },

        skills: [{
            type: String,
        }],

        numberOfQuestions: {
            type: Number,
            default: 10,
        },

        questions: [questionSchema],

        overallScore: {
            type: Number,
            default: 0,
        },

        feedback: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "CREATED",
                "GENERATING",
                "READY",
                "IN_PROGRESS",
                "COMPLETED",
                "FAILED"
            ],
            default: "CREATED",
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model(
    "Interview",
    interviewSchema
)