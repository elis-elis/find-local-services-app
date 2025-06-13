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
