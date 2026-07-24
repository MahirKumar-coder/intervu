import Interview from "../interview/interview.model.js"
import User from "../auth/auth.model.js"

export const getDashboard = async (userId) => {
    
    const user = await User.findById(userId)
    .select("-password")

    Interview.aggregate([
        {
            $match: {
                user: userId
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                averageScore: { $avg: "$overallScore" }
            }
        }
    ])

    const totalInterviews = interviews.length

    const completed = 
    interviews.filter(
        interview => interview.status === "COMPLETED"
    ).length

    const inProgress =
    interviews.filter(
        interview => 
            interview.status === "IN_PROGRESS"
    ).length

    const averageScore = 
    completed === 0
    ? 0
    : interview.reduce(
        (sum, interview) => 
            sum + interview.overallScore,
        0
    ) / completed

    const recentInterviews = 
    interviews
    .sort(
        (a, b) => 
            b.createdAt - a.createdAt
    )
    .slice(0, 5)

    return {

        profile: user,

        stats: {
            
            totalInterviews,

            completed,

            inProgress,

            averageScore:
            Math.round(averageScore)
        },

        recentInterviews
    }
}