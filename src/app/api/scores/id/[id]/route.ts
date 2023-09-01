import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: Request) {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);

  if (!id) return NextResponse.json({ message: "ID is required" });

  const score = await prisma.score.findUnique({
    where: { id: Number(id) },
  });

  if (!score) return NextResponse.json({ message: "Score not found" });

  return NextResponse.json(score);
}
