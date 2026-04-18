"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  anchor?: "left" | "right" | "top" | "bottom";
  className?: string; // Additional classes for the panel
  children: React.ReactNode;
}

export default function Drawer({
  isOpen,
  onClose,
  anchor = "right",
  className,
  children,
}: DrawerProps) {
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Consolidated hook for DOM mutations and Event Listeners
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEscape);

      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!mounted) return null;

  // Determine transition animations based on anchor
  const transitionClasses = {
    left: `top-0 left-0 h-full w-64 md:w-80 border-r ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    }`,
    right: `top-0 right-0 h-full w-64 md:w-80 border-l ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`,
    top: `top-0 left-0 w-full h-auto max-h-[80vh] border-b ${
      isOpen ? "translate-y-0" : "-translate-y-full"
    }`,
    bottom: `bottom-0 left-0 w-full h-auto max-h-[80vh] border-t rounded-t-2xl ${
      isOpen ? "translate-y-0" : "translate-y-full"
    }`,
  };

  const portalContent = (
    <>
      <div
        className={twMerge(
          "fixed inset-0 z-[100] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background-default/80 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Drawer Panel */}
        <div
          className={twMerge(
            "absolute bg-background-paper border-divider/50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col",
            transitionClasses[anchor],
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    </>
  );

  return createPortal(portalContent, document.body);
}
