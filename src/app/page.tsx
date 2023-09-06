import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { LoginButton, LogoutButton, RegisterButton } from "./auth";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "turbo-typer",
};

export default async function Homepage() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: {
      email: "test@test.com",
    },
  });

  return (
    <main>
      <LoginButton />
      <LogoutButton />
      <RegisterButton />
      <h2>Sever Session</h2>
      <pre>{JSON.stringify(session)}</pre>
    </main>
  );
}
