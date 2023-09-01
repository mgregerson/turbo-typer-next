import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(req: Request) {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);

  if (!id) return NextResponse.json({ message: "Id required!" });

  const user = await prisma.user.findUnique({ where: { id: Number(id) } });

  if (!user) return NextResponse.json({ message: `${id} not found` });

  return NextResponse.json(user);
}

export async function DELETE(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);

  if (!id) return NextResponse.json({ message: "Id required!" });

  const user = await prisma.user.findUnique({ where: { id: Number(id) } });

  if (!user) return NextResponse.json({ message: `${id} not found` });

  try {
    await prisma.user.delete({ where: { id: Number(id) } });
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json({ message: `User ${id} deleted` });
}

export async function PUT(req: Request) {
  try {
    const { firstName, lastName, email, id } = await req.json();

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) return NextResponse.json({ message: `User ${id} not found` });

    const updateData: {
      firstName?: string;
      lastName?: string;
      email?: string;
    } = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;

    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: Number(id) },
        data: updateData,
      });
    }

    return NextResponse.json({ message: `User ${id} updated` });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.error();
  }
}
