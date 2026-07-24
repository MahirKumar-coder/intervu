import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

export const generateQuestions = async (prompt) => {
    const response = await execFileAsync(
        'curl',
        [
            '--silent',
            '--show-error',
            '--request',
            'POST',
            `${process.env.OPENROUTER_BASE_URL?.trim()}/chat/completions`,
            '--header',
            `Authorization: Bearer ${process.env.OPENROUTER_API_KEY?.trim()}`,
            '--header',
            'Content-Type: application/json',
            '--header',
            `HTTP-Referer: ${process.env.CLIENT_URL?.trim()}`,
            '--header',
            'X-Title: Intervu',
            '--data-raw',
            JSON.stringify({
                model: process.env.AI_MODEL?.trim(),
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 4096
            }),
            '--write-out',
            '\n%{http_code}'
        ],
        {
            maxBuffer: 1024 * 1024
        }
    )

    const outputLines = response.stdout.trimEnd().split('\n')
    const statusCode = Number(outputLines.pop())
    const body = JSON.parse(outputLines.join('\n'))

    if (statusCode >= 400) {
        const error = new Error(body.error?.message || 'AI provider request failed')
        error.status = statusCode
        throw error
    }

    console.log("Raw AI Content:", body.choices[0].message.content)

    return body.choices[0].message.content
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```$/, '')
        .trim()
}