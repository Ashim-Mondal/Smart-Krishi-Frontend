import { type ReactNode } from "react";
import { Link } from "react-router-dom";

interface SectionTitleProps {
  title: string;
  actionLabel?: string;
  actionTo?: string;
  icon?: ReactNode;
}

export default function SectionTitle({ title, actionLabel, actionTo }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg sm:text-xl font-bold text-ink">{title}</h2>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
