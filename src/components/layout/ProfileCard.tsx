import { BadgeCheck, Star } from "lucide-react";
import type { Wholesaler } from "../../types";

export default function ProfileCard({ wholesaler }: { wholesaler: Wholesaler }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-extrabold text-xs text-center leading-tight shrink-0"
        style={{ backgroundColor: wholesaler.logoColor }}
      >
        {wholesaler.logoInitials}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-ink">{wholesaler.businessName}</h3>
          {wholesaler.verified && <BadgeCheck size={16} className="text-primary" />}
        </div>
        <p className="text-xs text-muted mt-0.5">{wholesaler.village}, {wholesaler.district}</p>
        <div className="flex items-center gap-1 mt-1 text-xs text-warning">
          <Star size={12} className="fill-warning" />
          <span className="font-semibold text-ink">{wholesaler.rating}</span>
          <span className="text-muted">({wholesaler.reviews} Reviews)</span>
        </div>
      </div>
    </div>
  );
}
