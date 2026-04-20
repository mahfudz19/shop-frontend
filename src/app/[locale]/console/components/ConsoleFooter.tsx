"use client";

import React from "react";

export default function ConsoleFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-6 px-8 border-t border-divider/50 bg-background-paper/50 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success-main animate-pulse" />
          <span className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">
            System_Live: OK
          </span>
        </div>
        <div className="h-3 w-px bg-divider" />
        <span className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">
          v1.0.4-stable
        </span>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-[10px] text-text-disabled font-bold tracking-widest uppercase">
          © {currentYear} ScrapStore INC // Internal Management Console
        </p>
      </div>
    </footer>
  );
}
