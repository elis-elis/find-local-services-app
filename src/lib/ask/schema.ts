import { z } from "zod";

export const QuestionSchema = z.object({
    question: z.string().min(5, 'Question must be at least five characters long'),
});

export type QuestionInput = z.infer<typeof QuestionSchema>;
