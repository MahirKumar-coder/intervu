export const buildInterviewPrompt = ({
    role,
    experience,
    difficulty,
    skills,
    numberOfQuestions
}) => {

    return `
    You are a senior technical interviewer.

    Generate exactly ${numberOfQuestions} interview questions.
    For the "expectedAnswer", provide a concise, clear technical explanation (under 100-150 words). Avoid writing long code blocks or deep nested code in the expectedAnswer; keep it focused on the conceptual and implementation overview.

    Role: 
    ${role}

    Experience:
    ${experience} years

    Difficulty:
    ${difficulty}

    Skills:
    ${skills.join(", ")}

    Return ONLY valid JSON.

    Format:

    [
    {
    "question":"...",
    "expectedAnswer":"..."
    }
    ]
    `
}

export const buildEvaluationPrompt = (questions) => {
    return `
    You are a senior technical interviewer. Evaluate the user's answers to the following questions.

    Questions and Answers:
    ${JSON.stringify(questions.map((q, idx) => ({
        index: idx,
        id: q._id,
        question: q.question,
        expectedAnswer: q.expectedAnswer,
        userAnswer: q.userAnswer || ""
    })), null, 2)}

    For each question, provide a score (0 to 10) and construct constructive feedback (under 80 words).
    Also compute an overallScore (0 to 100) and provide overall feedback (under 150 words) summarizing:
    - Communication
    - Technical
    - Confidence
    - Suggestions

    Return ONLY valid JSON in the following format:
    {
      "questions": [
        {
          "id": "question_id_here",
          "score": 8,
          "feedback": "..."
        }
      ],
      "overallScore": 85,
      "feedback": "Communication: 8/10\\nTechnical: 9/10\\nConfidence: 7/10\\n\\nSuggestions: ..."
    }
    `
}