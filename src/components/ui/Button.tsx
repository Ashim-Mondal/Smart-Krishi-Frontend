import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary: "bg-primary text-white hover:bg-primary-dark hover:scale-[1.02] shadow-sm",
    outline: "border border-border bg-white text-ink hover:border-primary hover:text-primary",
    ghost: "text-ink hover:bg-slate-100",
    danger: "bg-danger text-white hover:bg-red-700 hover:scale-[1.02]",
  };

  const sizes: Record<string, string> = {
    sm: "px-3.5 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
