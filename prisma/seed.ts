import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { username: "testuser" },
  });

  if (existingUser) {
    // User with the username already exists; you can update here if needed
    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        email: "newemail@test.com",
        firstName: "newfirstname",
        lastName: "newlastname",
      },
    });

    console.log("User updated:", updatedUser);
  } else {
    // User with the username doesn't exist; you can create here
    const newUser = await prisma.user.create({
      data: {
        email: "test@test.com",
        username: "testuser",
        password: "password",
        firstName: "test",
        lastName: "user",
      },
    });
    console.log("User created:", newUser);
  }
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
