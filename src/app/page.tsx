import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "turbo-typer",
};

export default async function Homepage() {
  const user = await prisma.user.findFirst({
    where: {
      email: "test@test.com",
    },
  });

  return <h1>Hello, {user?.username}</h1>;
}
