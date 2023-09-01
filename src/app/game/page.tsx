import { prisma } from "@/lib/prisma";

export default async function Game() {
  const user = await prisma.user.findFirst({
    where: {
      email: "test@test.com",
    },
  });

  return <h1>Hello, {user?.username}</h1>;
}
