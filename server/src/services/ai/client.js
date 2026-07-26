import OpenAI from 'openai'

const apiKey = process.env.OPENROUTER_API_KEY?.trim()
const baseURL = process.env.OPENROUTER_BASE_URL?.trim() || "https://openrouter.ai/api/v1"

const client = new OpenAI({
    apiKey,
    baseURL,
    defaultHeaders: {
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.CLIENT_URL?.trim(),
        "X-Title": "Intervu"
    }
})

export default client