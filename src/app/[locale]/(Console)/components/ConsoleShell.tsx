"use client";

import React, { useState, useEffect } from "react";
import ConsoleHeader from "./ConsoleHeader";
import ConsoleSidebar from "./ConsoleSidebar";
import ConsoleFooter from "./ConsoleFooter";
import Drawer from "@/components/ui/Drawer";
import { usePathname } from "@/i18n/routing";

interface ConsoleShellProps {
  children: React.ReactNode;
  userRole: string;
}

export default function ConsoleShell({ children, userRole }: ConsoleShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer when pathname changes (navigation occurs)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-background-default">
      {/* Sidebar Desktop (>= 1024px) */}
      <aside className="hidden lg:block shrink-0 h-screen sticky top-0 overflow-hidden">
        <ConsoleSidebar />
      </aside>

      {/* Sidebar Mobile (< 1024px) via Drawer */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        anchor="left"
        className="w-64 p-0 bg-background-paper border-none shadow-2xl"
      >
        <ConsoleSidebar onItemClick={() => setIsMobileMenuOpen(false)} />
      </Drawer>

      {/* Main Shell Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ConsoleHeader 
          userRole={userRole} 
          onMenuClick={() => setIsMobileMenuOpen(true)} 
        />
        
        <main className="flex-1 p-4 md:p-8 bg-background-default/50">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>

        <ConsoleFooter />
      </div>
    </div>
  );
}
