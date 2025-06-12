// src/lib/ask/controller.ts

import { NextRequest, NextResponse } from "next/server";
import { QuestionSchema } from "./schema";
import { generateAnswer } from "./service";

export async function askQuestionHandler(req: NextRequest) {
    try{
        // Parse the request body
        const body = await req.json();
        console.log("Received body:", body); // Debug

        // Validate the input with Zod
        const input = QuestionSchema.safeParse(body);
        if (!input.success) {
            console.log("Validation errors:", input.error.errors);
            return NextResponse.json(
                { error: 'Validation error', details: input.error.errors },
                { status: 400} 
            );
        }

        // Execute business logic
        const answer = generateAnswer(input.data.question);

        return NextResponse.json({ answer });

    } catch (err) {
        console.error('Unexpected error in /api/ask:', err);
        const message =
        err instanceof Error ? err.message : 'An unexpected issue occurred';
        return NextResponse.json(
            { error: 'Internal server error', details: message }, 
            { status: 500 }
        );     
    }
}
