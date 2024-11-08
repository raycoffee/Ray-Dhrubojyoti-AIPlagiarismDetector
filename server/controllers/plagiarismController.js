import OpenAI from 'openai';
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const WORD_LIMIT = 1000;
const SYSTEM_PROMPT = `You are an expert at detecting AI-generated content using perplexity and burstiness patterns. Return ONLY the following JSON structure with no additional metadata:

{
    "success": true,
    "data": {
        "analysis": {
            "result": [
                {
                    "sentence": "Text of the sentence here",
                    "aiProbability": 85
                }
            ]
        },
        "summary": {
            "averageProbability": 85.00,
            "totalWords": 150
        },
        "originalText": "Complete original text here"
    }
}

Scoring Rules:
1. Perplexity (Unexpectedness):
   - Low perplexity (predictable patterns) = AI (90-100)
   - High perplexity (surprising patterns) = Human (0-10)

2. Burstiness:
   - Low burstiness (consistent complexity) = AI (90-100)
   - High burstiness (varied complexity) = Human (0-10)

3. "Too Perfect" Indicators (Score 90-100):
   - Flawless grammar
   - Perfect structure
   - Consistent tone
   - Methodical progression
   - Generic phrasing

4. Human Markers (Score 0-10):
   - Slang/informal language
   - Unexpected transitions
   - Personal opinions
   - Unique comparisons
   - Natural imperfections
   - Spelling or grammatical mistakes

CRITICAL:
- Return ONLY the JSON structure above
- No additional metadata or wrapping
- No explanation text
- Must be valid JSON
- Use double quotes for strings
- Numbers must not be quoted
- Round averageProbability to 2 decimal places
- Include exact sentence text
- Calculate accurate word count
- Don't give same aiProbability for different sentences. It's impossible that two sentences have the same aiProbability, unless they are the exact same sentences.

Example:
Input: "bruh this is wild. The system works perfectly."
Output:
{
    "success": true,
    "data": {
        "analysis": {
            "result": [
                {
                    "sentence": "bruh this is wild",
                    "aiProbability": 5
                },
                {"sentence": "omfg, this too funny",
                    "aiProbability": 5}
                {
                    "sentence": "The system works perfectly",
                    "aiProbability": 50
                },
                {
                    "sentence": "The system works perfectly",
                    "aiProbability": 50
                },
                {
                    "sentence": "The Vietnam War (1955-1975) emerged as one of the most significant conflicts of the 20th century, profoundly shaping both international relations and American society. What began as a struggle between French colonial forces and Vietnamese independence fighters evolved into a symbol of Cold War tensions and the limits of military power.",
                    "aiProbability": 95
                }
            ]
        },
        "summary": {
            "averageProbability": 50.00,
            "totalWords": 7
        },
        "originalText": "bruh this is wild. The system works perfectly."
    }
}`;

const findAISentences = async (text) => {

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: `Analyze this text for AI authorship likelihood: 
  
  ${text}`
                }
            ],
            temperature: 0.1,
            response_format: { type: "json_object" }
        });



        const cleanContent = completion.choices[0].message.content
            .replace(/```json\n?|\n```/g, '')
            .trim();

        const parsedContent = JSON.parse(cleanContent);

        return {
            result: parsedContent.data.analysis.result
        };
    } catch (error) {
        console.error('Error in findAISentences:', error);
        throw error;
    }
};

const calculateProbability = (aiSentences) => {
    let totalWords = 0;
    let weightedProbabilitySum = 0;

    aiSentences.forEach(item => {
        const wordCount = item.sentence.trim().split(/\s+/).length;
        const probability = parseFloat(item.aiProbability);

        totalWords += wordCount;
        weightedProbabilitySum += wordCount * probability;
    });

    const weightedAverage = totalWords > 0
        ? (weightedProbabilitySum / totalWords).toFixed(2)
        : 0;

    return {
        averageProbability: parseFloat(weightedAverage),
        totalWords: totalWords
    };
}

export const checkPlagiarism = async (req, res) => {

    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: 'No text provided'
            });
        }

        const wordCount = text.trim().split(/\s+/).length;

        if (wordCount > WORD_LIMIT) {
            return res.status(400).json({
                success: false,
                message: `Text exceeds ${WORD_LIMIT} word limit`
            });
        }

        const aiSentences = await findAISentences(text);

        const probability = calculateProbability(aiSentences.result);

        return res.status(200).json({
            success: true,
            data: {
                analysis: aiSentences,
                summary: {
                    averageProbability: probability.averageProbability,
                    totalWords: probability.totalWords,
                },
                originalText: text
            }
        });

    } catch (error) {
        console.error('Error in checkPlagiarism:', error);
        return res.status(500).json({
            success: false,
            message: 'Error processing text',
            error: error.message
        });
    }
};