// src/app/api/ask/route.ts

import { NextRequest } from "next/server";
import { askQuestionHandler } from "@/lib/ask/controller";

export async function POST (req: NextRequest) {
    return askQuestionHandler(req);
}