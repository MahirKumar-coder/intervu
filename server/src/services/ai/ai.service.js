export const generateQuestions = async (prompt) => {
    const baseUrl = process.env.OPENROUTER_BASE_URL?.trim();
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();
    const clientUrl = process.env.CLIENT_URL?.trim() || "*";
    const model = process.env.AI_MODEL?.trim();

    const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': clientUrl,
            'X-Title': 'Intervu'
        },
        body: JSON.stringify({
            model: model,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        })
    });

    const statusCode = response.status;
    const body = await response.json();

    if (statusCode >= 400) {
        const error = new Error(body.error?.message || 'AI provider request failed');
        error.status = statusCode;
        throw error;
    }

    const content = body.choices[0].message.content.trim();
    console.log("Raw AI Content:", content);

    const firstBracket = content.indexOf('[');
    const firstBrace = content.indexOf('{');
    let startIndex = -1;
    let endIndex = -1;

    if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
        startIndex = firstBracket;
        endIndex = content.lastIndexOf(']');
    } else if (firstBrace !== -1) {
        startIndex = firstBrace;
        endIndex = content.lastIndexOf('}');
    }

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        return content.substring(startIndex, endIndex + 1);
    }

    return content;
}