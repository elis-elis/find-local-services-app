// src/lib/ask/service.ts

export function generateAnswer(question: string): string {
    const sources = [
        'Happy Tails Grooming - $60/session',
        'Purrfect Cuts SF - $55/session + online booking',
        'Whisker Spa - $70/session, luxury service'
    ];

    return `Top-rated cat groomers in San Francisco:\n\n- ${sources.join(
        '\n- '
        )}\n\nYou can book via their websites or call directly.`;
}
