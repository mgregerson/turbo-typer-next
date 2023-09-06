"use client";

import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();

  return (
    <main>
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
    </main>
  );
};
