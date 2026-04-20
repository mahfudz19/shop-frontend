import React from "react";
import { getUserFromToken } from "@/lib/auth";
import ConsoleShell from "./components/ConsoleShell";

async function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromToken();
  const userRole = user?.role || "GUEST";

  return (
    <ConsoleShell userRole={userRole}>
      {children}
    </ConsoleShell>
  );
}

export default ConsoleLayout;
