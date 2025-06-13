const WEIGHTS = {
    // This defines how important each factor is:
    //price is 40% of the score, convenience is 30%, and quality is 30%
    price: 0.4,
    convenience: 0.3,
    quality: 0.3,
};

function scorePrice(value: string): number {
    // Extracts the number from a price string like "$60/session" using .replace(/\D/g, ''), which removes all non-digit characters
    const priceNum = parseInt(value.replace(/\D/g, '')) || 100;
    // then maps the price to a score
    if (priceNum <= 50) return 100;
    if (priceNum <= 60) return 85;
    if (priceNum <= 70) return 70;
    return 50;
}

function scoreConvenience(notes: string): number {
    return notes.toLowerCase().includes("online booking") ? 100 : 50;
}

function scoreQuality(notes: string): number {
    if (notes.toLowerCase().includes("luxury")) return 90;
    if (notes.toLowerCase().includes("basic")) return 60;
    return 75;
}

export function calculateNeptuneScore(price: string, notes: string): number {
    // Calls the above 3 scoring functions, Applies the weights
    const p = scorePrice(price);
    const c = scoreConvenience(notes);
    const q = scoreQuality(notes);

    // Round the result to a whole number
    return Math.round(
        p * WEIGHTS.price +
        c * WEIGHTS.convenience +
        q * WEIGHTS.quality
    );
}
