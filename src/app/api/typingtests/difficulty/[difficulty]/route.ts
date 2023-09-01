import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import type { Difficulty } from "@prisma/client";

export async function GET(req: Request) {
  const difficulty = req.url.slice(req.url.lastIndexOf("/") + 1);

  if (!difficulty)
    return NextResponse.json({ message: "Difficulty is required" });

  // Convert the string to the enum type
  const enumDifficulty = difficulty.toLowerCase() as Difficulty;

  const tests = await prisma.typingTest.findMany({
    where: { difficulty: enumDifficulty },
  });

  if (tests.length === 0) {
    return NextResponse.json({
      message: "No tests found for the specified difficulty",
    });
  }

  return NextResponse.json(tests);
}
