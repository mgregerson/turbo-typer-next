import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: Request) {
  const res = await prisma.score.findMany();
  return NextResponse.json(res);
}

export async function POST(req: Request) {
  const {
    wpm,
    accuracy,
    userId,
    typingTestId,
    timeTaken,
    mistakes,
    wordsCorrect,
    totalWords,
  } = await req.json();

  if (
    !wpm ||
    !accuracy ||
    !userId ||
    !typingTestId ||
    !timeTaken ||
    !mistakes ||
    !wordsCorrect ||
    !totalWords
  )
    return NextResponse.json({ message: "Missing required fields" });

  const newScore = await prisma.score.create({
    data: {
      wpm,
      accuracy,
      userId,
      typingTestId,
      timeTaken,
      mistakes,
      wordsCorrect,
      totalWords,
    },
  });

  return NextResponse.json(newScore);
}
