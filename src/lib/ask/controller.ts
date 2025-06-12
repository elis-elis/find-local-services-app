// src/lib/ask/controller.ts

import { QuestionInput } from "./schema";
import { generateAnswer } from "./service";

export function handleAskQuestion(input: QuestionInput) {
    const answer = generateAnswer(input.question);

    return { answer };
}
