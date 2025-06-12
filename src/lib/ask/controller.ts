// src/lib/ask/controller.ts

import { NextRequest, NextResponse } from "next/server";
import { QuestionSchema } from "./schema";
import { generateAnswer } from "./service";
import { ZodError } from "zod";

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
                { error: 'oh but question must be at least five characters long. try again :)' },
                { status: 400} 
            );
        }

        // Execute business logic
        const answer = generateAnswer(input.data.question);

        return NextResponse.json({ answer });

    } catch (err) {
        if (err instanceof ZodError) {
            return NextResponse.json(
                { error: 'Invalid input' },
                { status: 400 }
            );
            }

            // fallback for any other unknown errors
            console.error('Internal error:', err);

            return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        ); 
    }
}
