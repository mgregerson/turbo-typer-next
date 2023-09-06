"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function ClientSideRoot(): any {
  const { data: session } = useSession();

  const [shown, setShown] = useState<boolean>(false);

  console.log(session, "session in game");

  return <div>Protected Client Page: {session?.user?.email}</div>;
}
