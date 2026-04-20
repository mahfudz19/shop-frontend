import React, { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  badgeContent?: string | number;
  color?: "primary" | "secondary" | "error" | "success" | "warning";
  invisible?: boolean;
}

export default function Badge({
  children,
  badgeContent,
  color = "error",
  invisible = false,
}: BadgeProps) {
  const colorClasses = {
    primary: "bg-primary-main text-primary-contrast",
    secondary: "bg-secondary-main text-secondary-contrast",
    error: "bg-error-main text-white",
    success: "bg-success-main text-white",
    warning: "bg-warning-main text-text-primary",
  };

  return (
    <div className="relative inline-flex align-middle">
      {children}
      {badgeContent !== undefined && badgeContent !== null && !invisible && (
        <span
          className={`absolute -top-1.5 -right-1.5 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold shadow-sm ring-2 ring-background-paper transition-transform duration-300 ${colorClasses[color]}`}
        >
          {badgeContent}
        </span>
      )}
    </div>
  );
}
