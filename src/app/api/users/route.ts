import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: Request) {
  const res = await prisma.user.findMany();
  return NextResponse.json(res);
}

export async function POST(req: Request) {
  const { email, username, password, firstName, lastName } = await req.json();

  if (!email || !username || !password || !firstName || !lastName)
    return NextResponse.json({ message: "Missing required fields" });

  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      password,
      firstName,
      lastName,
    },
  });

  return NextResponse.json(`New User created with id of ${newUser.id}`);
}
