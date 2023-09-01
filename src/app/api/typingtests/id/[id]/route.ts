import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { Difficulty } from "@prisma/client";

function mapStringToDifficulty(
  value: string | undefined
): Difficulty | undefined {
  if (value === undefined) return undefined;

  switch (value.toLowerCase()) {
    case "easy":
      return Difficulty.easy;
    case "medium":
      return Difficulty.medium;
    case "hard":
      return Difficulty.hard;
    default:
      return undefined;
  }
}

export async function GET(req: Request) {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);

  if (!id) return NextResponse.json({ message: "Id required!" });

  const typingTest = await prisma.typingTest.findUnique({
    where: { id: Number(id) },
  });

  if (!typingTest) return NextResponse.json({ message: `${id} not found` });

  return NextResponse.json(typingTest);
}

export async function PUT(req: Request) {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);
  const { title, text, difficulty } = await req.json();

  if (!id) return NextResponse.json({ message: "Id required!" });

  const typingTest = await prisma.typingTest.findUnique({
    where: { id: Number(id) },
  });

  if (!typingTest) return NextResponse.json({ message: `${id} not found` });

  const enumDifficulty = mapStringToDifficulty(difficulty);

  const updateData: {
    title?: string;
    text?: string;
    difficulty?: Difficulty;
  } = {};

  if (title) updateData.title = title;
  if (text) updateData.text = text;
  if (enumDifficulty !== undefined) updateData.difficulty = enumDifficulty;

  if (Object.keys(updateData).length > 0) {
    try {
      await prisma.typingTest.update({
        where: { id: Number(id) },
        data: updateData,
      });

      // Return a success response with a 200 status code
      return NextResponse.json({ message: `Test ${id} updated` });
    } catch (error) {
      console.error("Error updating test:", error);
      // Return an error response with a 500 status code
      return NextResponse.error();
    }
  }

  // If no updates were made, return a success response with a 200 status code
  return NextResponse.json({ message: `No updates were made to test ${id}` });
}

export async function DELETE(req: Request) {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);

  if (!id) return NextResponse.json({ message: "Id required!" });

  const typingTest = await prisma.typingTest.findUnique({
    where: { id: Number(id) },
  });

  if (!typingTest) return NextResponse.json({ message: `${id} not found` });

  try {
    await prisma.typingTest.delete({ where: { id: Number(id) } });
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json({ message: `Typing test ${id} deleted` });
}
