import React from "react";
import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "gray";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  className,
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg whitespace-nowrap";

  const variantStyles = {
    primary: "bg-primary-50 text-primary-700 border border-primary-200",
    secondary: "bg-secondary-50 text-secondary-700 border border-secondary-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    error: "bg-red-50 text-red-700 border border-red-200",
    gray: "bg-gray-50 text-gray-700 border border-gray-200",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

