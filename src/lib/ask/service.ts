// src/lib/ask/service.ts

import type { SourceData } from "./types";

export function generateAnswer(question: string): { 
    summary: string; 
    sources: SourceData[] 
} {
    return {
        summary: "Here are top-rated cat groomers in San Francisco, along with a Neptune Score based on price, convenience, and service quality.",
        sources: [
        {
            name: "San Francisco Pet Grooming",
            price: "$60/session",
            notes: "Basic grooming for cats",
            source: "https://happytails.com",
            neptuneScore: 78, // Decent price, basic service

        },
        {
            name: "maxwell's pet bar",
            price: "$55/session",
            notes: "Online booking available",
            source: "https://www.maxwellspetbar.com/",
            neptuneScore: 85, // Affordable + online booking = higher score
        },
        {
            name: "Alpha Grooming Pet Salon",
            price: "$70/session",
            notes: "Luxury cat spa services",
            source: "https://www.alphagroomingpetsalon.com/san-francisco-county/",
            neptuneScore: 72, // Higher cost lowers score despite luxury
        },
        ],
    };
}


// Replace mock data with real LLM response in production

// import OpenAI from 'openai';
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function generateAnswer(question: string): Promise<{ 
//     summary: string; 
//     sources: SourceData[] 
// }> {
//     const response = await openai.chat.completions.create({
//         model: 'gpt-4',
//         messages: [{ role: 'user', content: question }],
//     });

//     // TODO: parse the LLM response to match the return shape
//     const parsed = JSON.parse(response.choices[0].message.content || '{}');

//     return {
//         summary: parsed.summary || '',
//         sources: parsed.sources || [],
//     };
// }
