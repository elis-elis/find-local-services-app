// src/app/api/ask/route.ts

import { NextRequest, NextResponse } from "next/server";
import { handleAskQuestion } from "@/lib/ask/controller";
import { QuestionSchema } from "@/lib/ask/schema";
import { error } from "console";

export async function POST (req: NextRequest) {
    try{
        // Parse the request body
        const body = await req.json().catch((err) => {
            throw new Error('Invalid JSON format in request body');
        });

        // Validate the input with Zod
        const input = QuestionSchema.safeParse(body);
        if (!input.success) {
            return NextResponse.json(
                { error: 'Validation error', details: input.error.errors },
                { status: 400} 
            );
        }

        // Execute business logic
        const result = handleAskQuestion(input.data);

        return NextResponse.json(result);
    } catch (err) {
        if (err instanceof Error && 'issues' in err) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}