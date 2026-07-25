import Interview from "../interview/interview.model.js"
import User from "../auth/auth.model.js"

export const getDashboard = async (userId) => {
    
    const user = await User.findById(userId)
    .select("-password")

    const interviews = await Interview.find({ user: userId })

    const totalInterviews = interviews.length

    const completed = 
    interviews.filter(
        interview => interview.status === "COMPLETED"
    ).length

    const inProgress =
    interviews.filter(
        interview => 
            interview.status === "IN_PROGRESS" || interview.status === "CREATED"
    ).length

    const averageScore = 
    completed === 0
    ? 0
    : interviews.reduce(
        (sum, interview) => 
            sum + (interview.overallScore || 0),
        0
    ) / completed

    const recentInterviews = 
    [...interviews]
    .sort(
        (a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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