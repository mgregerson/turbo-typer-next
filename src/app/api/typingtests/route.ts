import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: Request) {
  const res = await prisma.typingTest.findMany();
  return NextResponse.json(res);
}

export async function POST(req: Request) {
  const { title, text, difficulty } = await req.json();

  if (!title || !text || !difficulty)
    return NextResponse.json({ message: "Missing required fields" });

  const newTypingTest = await prisma.typingTest.create({
    data: {
      title,
      text,
      difficulty,
    },
  });

  return NextResponse.json(newTypingTest);
}
